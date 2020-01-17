---
id: integration-testing
title: Integration Testing
sidebar_label: Integration Testing
---

# Integration Testing

## Prerequisites

To get the most out of this document, you should be familiar with setting up kbase-ui locally for development and/or previewing. See [Getting Started](../dev/getting-started.md).

## Overview

At present, the focus of testing in kbase-ui is integration testing. It gives the most bang for the buck, exercising not only multiple libraries, but plugins, configuration, and building too.

The integration tests require that an instance of kbase-ui be available at at a X.kbase.us host (where X is typically ci, next, appdev, narrative). The tests work by controlling a browser to invoke urls, click on buttons, fill in inputs, and then watches the actual browser to make sure "the right thing happens". For example, the tests select menu items, conduct searches, log in, and log out. The tests can ensure that the right thing appears when a menu is selected, that the kbase session cookies is available after signin, that a given search resulted in the expected items.

## Status

The integration testing tools are under active development. They do indeed work, and should be conducted prior to any release.

> At present (1/7/20), Safari 13 (the current release) is broken with respect to webdriver - button and/or key presses don't work, and this breaks many of our tests. Firefox support is unreliable - selenium sometimes can't find the browser session (there may be a workaround, but haven't had time.)

## Testing Stack

The integration testing utilizes Selenium, WebdriverIO, Firefox, Chrome, and Safari browsers, and our own integration library. Since most user functionality in the UI is provided through plugins, most integration tests reside in plugins as well. Each plugin should contain a testing folder `src/plugin/test`. This folder contains one or more json or yaml files (yaml preferred). Each of these files defines one or more tests. Each test defines 1 or more steps. All of the details will be spilled in sections below. We call these "integration test scripts".

> This is all very new. We may add javascript test scripts later, but for now we have much ground to cover just with simple json scripts.

During the kbase-ui build, all of the plugin testing scripts are placed into a single location `dev/test/integration-tests/specs/plugins`. Also during the build, all of the tools required for integration testing are installed locally. In other words, you need to conduct a local build to use the integration tests, even if you are testing against a remote instance.

> kbase-ui generally tries hard to follow the principle, encouraged by npm, to install all tools locally. The only global dependencies are those described in [Getting Started](../dev/getting-started.md).

Upon invoking the integration tests, all of the test scripts found in `src/plugin/test` are run, and the results printed to the console. When running tests, you can specify the deployment environment (ci, next, prod, narrative-dev) and the browser (chrome, firefox, safari). Without specifying these, the defaults are ci and chrome.

It is even possible to run the tests against a testing service like Sauce Labs which may test against multiple browser models and versions and on multiple operating systems. We have not run such tests in a while, but we did a successful evaluation which proved to us that it was both achievable but not at the time practical -- too many issues with connectivity to the testing service resulted in too many false negatives.

## Getting Started

You can run the integration tests from the basic kbase-ui development environment.

Before running the tests, you must:

- build kbase-ui
- run the kbase-ui container
- edit the test config file

Okay, that last step is a new one. The integration tests consult a single configuration file for information which cannot be included in the codebase itself.

A sample configuration file is placed at `dev/test/config.json`. Withing this file you must substitute token placeholders with the login token for the user "kbaseuitest" for each environment you wish to test against.

Configuration values include core configuration like a user token, the associated username, and associated real name.

```json
{
    "envDefault": {
        "auth": {
            "username": "kbaseuitest",
            "realname": "KBase UI Test User"
        }
    },
    "envs": [
        {
            "env": "next",
            "auth": {
                "token": "LOGIN_TOKEN_HERE"
            }
        },
        {
            "env": "ci",
            "auth": {
                "token": "LOGIN_TOKEN_HERE"
            }
        },
        {
            "env": "prod",
            "hostPrefix": "narrative",
            "aliases": [
                {
                    "env": "narrative-dev"
                }
            ],
            "auth": {
                "token": "LOGIN_TOKEN_HERE"
            }
        }
    ]
}
```

## Running tests

In a separate terminal in the kbase-ui root directory, enter the following command:

```zsh
make integration-tests env=ci browser=chrome
```

or simple

```zsh
make integration-tests
```

to use the default env of `ci` and browser of `chrome`.

The `host` argument is roughly equivalent to the "env" argument used in the build process. At present all this argument does is substitute for the X in X.kbase.us when building the url for the tests scripts.


> NOTE: Due to the variability in test response times, some tests may time out. If this occurs, run the tests one or more additional times until (and if) they succeed. Common conditions for timeout-based test failures are local machine load (the tests are fairly cpu-intensive), network congestion, kbase service latency, and kbase service maintenance.

## Files

- `dev/test` - placeholder directory for integration test scripts, code, and configuration; this directory is populated when the ui is built; the files are overlaid from the container via a volume mount.
- `test/wdio.conf.integration.js` - webdriver io test configuration file
- `src/test` - location of script runner files, which are copied into the kbase-ui image and subsequently made available locally through a volume mount at `/dev/test`.
- `tools/proxy/contents/ssl` - empty directory which is populated with `test.crt` and `test.key` when `make dev-cert` is run (and emptyed by `make rm-dev-cert`).
- `src/client/plugins/PLUGIN/test` - location of internal plugin integration test scripts
- `kbase-ui-plugin-PLUGIN/src/plugin/test` - location of external plugin integration test scripts.

---

> LEFT OFF HERE - stuff below is old and/or unwritten

---

## Plugin Testing Script

Each plugin should have a directory `src/plugin/test` which contains one or YAML files containing test scripts.

> At present the integration test tools support YAML or JSON, but YAML is preferred due the ability to add comments and comment out tests, which are quite handy during testing work.

### Test Script Format

A plugin can have one or more test scripts. Each script should be dedicated to a set of concerns, such as a route. Each plugin should have a test script for each route.

A test script may contain one or more test specs. Each spec is composed of one or more test tasks. Any task may cause a test spec failure.

The basic structure is:

- test
  - spec 1
    - task 1
    - task 2
    - task 3
  - spec 2
    - task 1
    - task 2

```yaml
# Test Script for Dashboard Plugin
---
- description: Dashboard with authentication
  specs:
      - description: Dashboard should appear when the route is navigated to
        tasks:
            - title: login
              subtask: login
            - title: navigate to dashboard
              action: navigate
              path: dashboard
            - subtask: plugin
            - selector:
                  - type: plugin
                    value: dashboard
                  - type: widget
                    value: narratives-widget
                  - type: slider
                    value: your-narratives
              wait: 10000
            - selector:
                  - type: plugin
                    value: dashboard
                  - type: widget
                    value: narratorials-widget
                  - type: slider
                    value: narratorials
              wait: 10000
            - selector:
                  - type: plugin
                    value: dashboard
                  - type: widget
                    value: shared-narratives-widget
                  - type: slider
                    value: shared-narratives
              wait: 10000
            - selector:
                  - type: plugin
                    value: dashboard
                  - type: widget
                    value: public-narratives-widget
                  - type: slider
                    value: public-narratives
              wait: 10000
```

#### Test

Each test script has a single top level node which describes the test. The most important aspect of it is the `description` field. This field should briefly describe the test. It will be printed in the test results, so should be descriptive enough to distinguish the test amongst many. It should mention the plugin name as well as the overall purpose of the test.

##### `description`

Describes the test script; it should mention the plugin name as well as the overall purpose of the test.

##### `baseSelector`

A selector to be applied to all spec tasks which specify document navigation with a selector. It can be handy to avoid boilerplate in selectors, since a plugin's tests should primarily operate within the plugin's dom subtree.

> Note that base selectors are not useful for external plugins since they have been migrated to the plugin architecture. Navigation into iframes is handled differently than simple DOM node navigation.

To find out more about selectors, please see the section below.

#### specs

Each test provides one or more test specs. A test spec is really a test instance, and the test spec provides a set of instructions which. These instructions are typically composed of _subtests_, _navigation_, _selectors_, _actions_, and _observations_.

Almost every test begins with either a `login` subtask followed by a `navigation` or simply a navigation. This is the equivalent of a user opening a browser, putting in the top level kbase url, logging in, and then navigating to a ui feature, typically provided by a plugin.

##### subtasks

Subtasks are very important to creating more compact, _dry_ tests. A subtasks is, literally, a set of test spec steps provided by a separate yaml file and identified by the base name of the file. This allows us to provide commonly repeated steps as subtasks, using only the id of the subtask.

All subtasks are provided by kbase-ui in the folder `src/test/integration-tests/specs/subtasks`. Each subtask is defined in a yaml file, with the base file name (the part before the `.yaml`) becoming the subtask id.

At present, three subtasks are defined - _login_, _logout_, and _plugin_.

For example, the `plugin` subtask is provided by the file `plugin.yaml`, which has the contents:

```yaml
# A subtask to navigate to the iframe containing an external plugin.
---
title: Plugin Task
tasks:
  - wait: forElement
    selector:
      type: absolute
      path:
        - type: iframe
          value: plugin-iframe
  - action: switchToFrame
```

Although we haven't described test spec steps in detail, let's review what this subtask:

1. It has a description provided through a yaml comment. This is only for documentation in the file, it is not used by the integration tests at all.
2. It provides a set of tasks under the `tasks` key.
3. The first step is to wait for an element described by an absolute (starts at document) selector path. The test runner will wait for the specified element to become available, and fail if it is not available within a given amount of time. Since that time is not given (it is the `timeout` key), the default of 10 seconds is used.
4. The selector path has one component, `[[data-k-b-testhook-iframe="plugin-iframe"]`. This testhook attribute is provided by kbase-ui in components which provide iframe support.
5. Finally, an action is executed; in this case causing the browser context to switch to the iframe window within the element found previously. 

#### navigation tasks

The navigation task causes the provided navigation path to be provided to the browser as a url hash (fragment). This is the technique currently utilized to trigger navigation.

> NB this will need updating when we migrate to html5 history paths

A navigation task is typically run at as either the first or second step. Through navigation we are activating some part of the ui as if the user navigated to it.

```yaml
            - title: navigate to dashboard
              action: navigate
              path: dashboard
```

In the example above:

##### title

A description of the step, may be printed in test results. Optional.

##### action

Other than subtasks, very step specifies some sort of action for the test to run. All actions are invoked through the `action` key. The value of the action key is the action id.

All available actions are listed below. [ link here ]

#### selectors

A key concept of the integration test scripts is dom navigation. After all, the primary mechanism of integration tests is to poke at the ui and observe how it changes. Both the actions and observations require that one specify a location within the DOM -- and that location is defined by a DOM selector.

In a test script, the selector is represented as an array of objects - each object describes the next DOM node in the selection path.

There are two basic ways to specify a path node. The preferred way is to use a special _testhook_ embedded in the plugin's markup. Testhook support is built into the test tool, and requires less configuration in the test script. Other than testhooks, any attribute and attribute value can be used as a selector.

##### testhook selectors

A "testhook" is simply a special `data-` prefixed attribute which has been applied to a node. The format is `data-k-b-testhook-type`, where `type` is one of `plugin`, `component`, `widget`, `button`, `element` and so forth.

The testhook type lets us reduce identifier collisions, and improve readability.

The format `k-b-testhook` is driven by the need to namespace the `data-` attribute with some form of `kbase`. In legacy kbase functional html style, this is specified in code as `dataKBTesthookType`. Now, one might think that `data-kbase-testhook-type` is more pleasing on the eyes, but the code form of that is `dataKbaseTexthookType`, which is error-prone since the official form of `kbase` is `KBase`, which would result in `data-k-base-testhook-type`, which does not seem like an improvement.

Here is an example of setting and specifying a testhook:

Using legacy kbase functional html style:

```javascript
div({
    dataKBTesthookPlugin: 'myplugin'
});
```

In the test script:

```yaml
- type: plugin
  value: myplugin
```

##### raw selectors

The usage of raw selectors is frowned upon, but sometimes necessary. The testhook form is preferred because it is orthogonal to all other usage of DOM node attributes. Classes, for instance, are primarily associated with visual concerns through linkage to a stylesheet. A developer may be altering classes to improve appearance, and not realize that it is a critical component of a test. By using a dedicated attribute format for testing, tests are much more stable over time and easier to debug, since the same prefix is used for all testhooks.

However, at times we don't have control over markup. For instance, we may be using components which don't allow custom attributes, or third party components.

In such cases, the test script can use the type `raw`, and specify any arbitrary attribute name and optional value.

E.g.

Using legacy kbase functional html style:

```javascript
div({
    class: 'someclass'
});
```

In the test script:

```yaml
- type: raw
  name: class
  value: someclass
```

#### Spec

## kbase-ui integration test runner

[ describe the test runner scripts ]

## Integration Test Script

Adding Testhooks

## Testing Scenarios

### As you develop

### Before a release

### In Travis

## Browsers

### Firefox

some tests curently fail in FF; probably due to webdriver compat

### Chrome

chrome currently works in normal and headless

### Safari

Safari currently works. Don't know how to run headless yet. A bit finicky though; tends to leave a process behind, sometimes under fail conditions sometimes it just does it, and will refuse to start until the Safari process is killed.

First:

-   Open Safari:

    -   enable developer menu (Preferences > Advanced > Show Developer menu in menu bar)
    -   enable automation (Developer > Allow Remote Automation )

-   From Terminal:

    -   /usr/bin/safaridriver --enable

    ​

## task actions

setSessionCookie
deleteSessionCookie
navigate
keys
switchToFrame
switchToParent
baseSelector
click
setValue
log