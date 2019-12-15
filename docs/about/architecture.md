---
---


# Architecture

In this section we discuss the current state of the *kbase-ui* architecture. Note that this does not cover the development aspects of that architecture, which is presented in the [development](./development) section.

- kbase-ui
  - startup
  - cut the mustard
  - emergency escape pod
  - boot sequence
  - ui services
  - routing and navigation
  - plugin invocation
  - plugin <-> ui communication
  - ui services for plugins
- plugin configuration
  - routes
  - menu
- plugins
  - boot sequence / lifecycle
  - @kbase/ui-lib integration
    - some hacks
      - pass through clicks
  - 

## Overview

When *kbase-ui* is first loaded in the browser, it initiates a startup sequence, which involves:

- ensuring the browser is **compatible**
- setting up **failsafe error rendering**
- preparing **configuration**
- loading **ui services** and **plugins**
- loading and rendering the **root widget**

Once this startup sequence is completed, the ui itself is in a **responsive** mode. It responds to events issued through its message bus, navigation events, and direct method calls of ui services.

The primary **messages** it responds to are:

- navigation
- setting the title to the header area
- logout detection
- adding and removing buttons from the header area

The navigation events currently correspond to the DOM `hashchange` event, which indicates that a ui navigation has occured in the browser.

**Navigation** events are detected by listening for changes to the *hash* (aka *fragment*) in the browser's current path. If the new hash value corresponds to a registered route, the associated widget is mounted (after unmounting the previous one). Otherwise, an error message is displayed.

The primary programmatic way for plugins to interact with the ui is through **ui services**. These are lightweight javascript modules which implement a component pattern (asynchronous start and stop methods), and can accept configuration from a plugin.

## Startup

1. The root of kbase ui is a single file named *index.html*. This file is served to a web browser through a web server. In both development and production, this web server runs in a Docker container.

    > It is possible, of course, to load `index.html` from the file system, but it will not function correctly due to difference between how web browsers treat http-loaded files and file-system-loaded files.

2. It first asynchronously starts the [Google Tag Manager (gtag)]() in order to provide analytics.

3. It loads the animated KBase logo, which acts as a loading spinner.

4. It contains a `noscript` tag with appropriate content in case the browser has Javascript disabled or in the very rare case it does not support Javascript.

5. The `mustard.js` script is responsible for ensuring that the browser is compatible with *kbase-ui*. 

6. The `fallback.js` script is loaded and executed. This script is responsible for displaying an error message in the case of catastrophic error in the startup process.

7. The `build-info.js` script is run. This script simply makes  basic build information available at `window.global.__kbase__build__`

8. If this is a production build, `moduleVfs.js` is loaded. This file contains most of the kbase-ui code, excluding large dependencies (over 100K).

9. The `require-config.js` file is loaded. This file defines all of thhe modules available to *kbase-ui*, and is critical for providing a mapping from module name, or namespace, to file, or directory.

10. The `require.js` file is loaded. This file provides the AMD system *requirejs*. *requirejs* reads the configuration established by `require-config.js`, and launches the main entry point.

11. *requirejs* loads the main entry point file `startup.js`.

12. The `startup.js` file is the final layer before entering theh realm of AMD.

    1. It sets up global *requirejs* error handling; this is where module loading errors are handled and propagated to the fallback error handler.
    2. It invokes the main entry point defined in `main.js`, and sets up a top level promise error handler, which is in turn propagated to the fallback error handler.

13. Picking up in `main.js`

    1. Configures the promises library `bluebird`.
    2. Merge the app config and deployment config into a single configuration
    3. create the main app object with configuration and the root dom node
    4. store the main app object in an anonymous (uuid) property on the window object
    5. load and configure the `knockout` component system
    6. start the main app provided by `hub.js`.

14. `hub.js` is designed to be an implementation of the capabilities provided by the main app (just a moment on that), but in practice it has never been fully developed.

    1. creates an instance of the app defined in `app.js`
    2. providing the root node on which to render, the plugin configurations, the app configuration.
    3. starts the app.

15. The `start()` method in `app.js` then proceeds:

    > Note: If there are any major problems, such as a missing root node, or misconfiguration, it may throw an exception. (Remember from above, such exceptions propagate through the promise chain to `startup.js`.)

    1. Loads **ui services**; ui services are available through the runtime without needing to load a module; they are generally provided in order to provide access to dynamic runtime features like configuration and authentication.
    2. Loads **plugins**
    3. Checks KBase **core services**; currently it just emits an error message to the console in case a service is either unavailable or the version is incompatible with the configured semver version expression.
    4. Starts **ui services**
    5. Mounts the **root widget**

16. At this point, kbase-ui's startup process is complete. 

## Operation

After successful startup, we can consider *kbase-ui* to be in operational mode.

Almost all functionality in the ui is provided by the runtime object, ui services, widgets, and plugins.

### Runtime Object

The primary job of the **runtime object** is to provide access to configuration, authentication, and messaging.

The runtime object is passed to the constructor for every ui service and widget. a characteristic which  helps it glue the ui together as a system.

For example, the `route` ui service listens for the *hashchange* DOM event. Upon detecting a change, it parses the browser location, attempts to lookup a route handler which matches the browser location, and then emits a navigation event through the runtime.

### UI Services

The job of a ui service is to handle some domain of ui concern. They are essentially a structured way of namespacing ui functionality, and operate in a manner similar to widgets -- i.e. they implement a component api pattern.

> The component pattern requires a constructor, an asynchronous start method, and an async stop method. This allows for the services to be started and stopped in a regularized manner, and in parallel.

Another important feature of ui services is that they are configurable via the static ui configuration located at `config/ui.yml`, the deployment configuration located at `deployment/templates/config.json.templ`, as well as the `install` key of any plugin's `config.yml` (where the key under *install* is the service id).

Since *kbase-ui* is presently under active development and refactoring, the array of services may change over the next few weeks and months (or disappear completely). However, here are a few key services as of now:

- **session**: monitors kbase session state and issues *loggedin*, *loggedout*, and *change* events in response to changes in the kbase session; it also provides method which support querying session state as well as logging in and out via the auth2 service.

- **heartbeat**: a trivial service which issues a runtime message every 0.1 second unless otherwise configured. This is useful for monitoring or polling services, since it does not require code wishing to implement such features from creating and managing their own timers.

- **menu**: The menu service provides a database of available menu items, primarily provided by plugins. It is the primary mechanism by which a plugin can register its own widgets as navigation endpoints.
  
    Note that a menu item will not actually appear on either the sidebar or hamburger menu unless configured in the ui's `config/ui.yml`.

- **connection**: The connection service monitors the network connection to the host serving kbase-ui by periodically fetching a small file named `ping.txt`. If the connection fails, a notification is displayed; when (if) it recovers a recovery message is displayed.

- **analytics**: currently unused; provides integration with Google Analytics

- **coreService**: unimplemented; will monitor core service availability and performance

- **data**: a simple service to provide asynchronous fetch of json data sources located within the `/data` directory.

- **feeds**: monitors the current user's feed and updates the sidebar nav badge with the number of unread feed items.

- **instrumentation**: unimplemented; a shell service (methods which do nothing) to provide for widgets and plugins to send instrumentation data to an (unimplemented or designed) service.

**notification**: incomplete; meant to allow a plugin to register and send notifications to the notification widget.

**route**: provides an interface for plugins to register routes; and also publishes messaging endpoints for navigation to these routes.

**rpc**: little used wrapper around an rpc library provided by the ui; intended to be useful in that it wraps defaults, like the runtime object, making rpc calls more lightweight in usage.

**schema**: little used json schema integration, allowing a plugin to register a schema and validate data against it.

**service**: ??

**type**: a kbase data type registry, for mapping kbase workspace types to visualization widgets and icons.

**userprofile**: a simple service which maintains the current user's profile upon request (runtime messages) or in response to login and logout events.

**widget**: a simple service to allow plugins to register kbase zero-dep widgets, with methods for fetching and creating widgets.



In operational mode, kbase-ui will take action in  response to a set of events of different types.




