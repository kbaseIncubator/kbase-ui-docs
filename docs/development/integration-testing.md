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

The integration tests require that an instance of kbase-ui be available at at a X.kbase.us host (where X is typically ci, next, appdev, narrative). The tests work by controlling a browser to invoke urls, click on buttons, fill in inputs, and then watching the actual browser to make sure "the right thing happens". For example, the tests select menu items, conduct searches, log in, and log out. The tests can ensure that the right thing appears when a menu is selected, that the kbase session cookie is available after signin, that a given search resulted in the expected items, and so on.

## Status

The integration testing tools are under active development. They do indeed work, and should be conducted prior to any release.

> At present (1/7/20), Safari 13 (the current release) is broken with respect to webdriver - button and/or key presses don't work, and this breaks many of our tests. Firefox support is unreliable - selenium sometimes can't find the browser session (there may be a workaround, but haven't had time.)

## Testing Stack

The integration testing utilizes Selenium, WebdriverIO, Firefox, Chrome, and Safari browsers, and our own integration library. Since most user functionality in the UI is provided through plugins, most integration tests reside in plugins as well. Each plugin should contain a testing folder `src/plugin/test`. This folder contains one or more json or yaml files (yaml preferred). Each of these files defines one or more tests. Each test defines 1 or more steps. All of the details will be spilled in sections below. We call these "integration test scripts".

> This is all very new. We may add javascript test scripts later, but for now we have much ground to cover just with simple json scripts.

During the kbase-ui build, all of the plugin testing scripts are placed into a single location `dev/test/integration-tests/specs/plugins`. Also during the build, all of the tools required for integration testing are installed locally. In other words, you need to conduct a local build to use the integration tests, even if you are testing against a remote instance.

> kbase-ui generally tries hard to follow the principle, encouraged by npm, to install all tools locally. The only global dependencies are those described in [Getting Started](../dev/getting-started.md).

Upon invoking the integration tests, all of the test scripts found in `src/plugin/test` are run, and the results printed to the console. When running tests, you can specify the deployment environment (ci, next, prod, narrative-dev) and the browser (chrome, firefox, safari). Without specifying these, the defaults are ci and chrome.

It is even possible to run the tests against a testing service like Sauce Labs which may test against multiple browser models and versions and on multiple operating systems. We have not run such tests in a while, but we did conduct a successful evaluation which proved to us that it was  achievable but not at the time practical -- too many issues with connectivity to the testing service resulted in too many false negatives.

## Getting Started - Running Tests

You can run the integration tests from the basic kbase-ui development environment.

Before running the tests, you must:

- build kbase-ui and run kbase-ui
- edit the test config file

### build kbase-ui

Although integration tests may run against any live instance of kbase-ui (locally or remote), it is still necessary to have a local copy of kbase-ui built and running. This is necessary because kbase-ui gathers the tests together inside the container during the build process, and running the container using the provided script maps the internal test directory into a local directory.

```zsh
git clone https://github.com/kbase/kbase-ui
cd kbase-ui
make dev-start env=ci build=dev build-image=t
```

Note that we've started the ui container with the CI environment. If we want to test against the local kbase-ui, we can control which environment we are testing against by running kbase-ui against that environment and indicating that to the test script (more on that later.)

### edit the test config file

The integration tests consult a single configuration file for information which cannot be included in the codebase itself.

After building and running kbase-ui, a sample configuration file is placed at `dev/test/integration-tests/config.json`. Within this file you must replace token placeholders with the login token for the user `kbaseuitest` for each environment you wish to test against.

You'll need the Globus password for `kbaseuitest`. It is located in the UI Resource document in Google Drive. This document is restricted to current kbase-ui developers only. If you have questions, please ask them on the appropriate channels on KBase Slack (#ui or #kbase_coders are good choices).

Configuration values include core configuration like a user token, the associated username, and associated real name. At present, the only configuration value you need to replace is the `token` for each environment. This token can be obtained by logging into each environment as the user `kbaseuitest` and copying the value of the `kbase_session` cookie field. (E.g. in the browser javascript console, enter `document.cookie` to expose the current cookie.)

{% include_relative code-samples/integration-testing/config-template.md %}


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

Available values for `env` are `ci`, `next`, `narrative-dev`, and `prod`; for `browser` are `chrome`, `firefox` and `safari`.

> NOTE: firefox and safari are currently not supported as their selenium drivers have test-stopping bugs.

> NOTE: Due to the variability in test response times, some tests may time out. If this occurs, run the tests one or more additional times until (and if) they succeed. Common conditions for timeout-based test failures are local machine load (the tests are fairly cpu-intensive), network congestion, kbase service latency, and kbase service maintenance.

As the tests are running, the selected browser will probably appear on your computer's display and you may witness the actions of the test scripts.

After a few moments, the tests will be finished and the results should be similar to what is shown below.

If any tests fail, the test case will indicate as such.

At the time of writing, the test result summary indicates the number of test javascript files which failed, but since we use yaml script files for test cases, and the javascript files don't contain tests but just execute the test scripts, this statistic is misleading.


{% include_relative code-samples/integration-testing/test-run-result.md %}

## Files

Below are directories and files involved in integration testing.

- `dev/test` - placeholder directory for integration test scripts, code, and configuration; this directory is populated when the ui is built; the files are overlaid from the container via a volume mount.
- `test/wdio.conf.integration.js` - webdriver io test configuration file
- `src/test` - location of script runner files, the configuration file, and canned subtasks; these  are copied into the kbase-ui image and subsequently made available locally through a volume mount at `/dev/test`.
- `tools/proxy/contents/ssl` - empty directory which is populated with `test.crt` and `test.key` when `make dev-cert` is run (and emptied by `make rm-dev-cert`).
- `src/client/plugins/PLUGIN/test` - location of internal plugin integration test scripts
- `kbase-ui-plugin-PLUGIN/src/plugin/test` - location of external plugin integration test scripts.
  - or `kbase-ui-plugin-PLUGIN/plugin/test` for newer CRA-TS plugins


## Plugin Testing Script

Each plugin should have a directory `src/plugin/test` which contains one or YAML files containing test scripts.

> NOTE: The plugin directory may be in a different location, as specified by the plugin's configuration file.

### Test Script Format

A plugin can have one or more test scripts. Each script should be dedicated to a set of concerns, such as a route. Each plugin should have a test script for each route.

Of course there may be test scripts dedicated to particular use cases, or to ensure that specific bugs are fixed.

A test script may contain one or more test specs. Each spec is composed of one or more test tasks. Any task may cause a test spec failure.

The basic structure of a test script file is:

- test
  - spec 1
    - task 1
    - task 2
    - task 3
  - spec 2
    - task 1
    - task 2

#### Example 1: simple test script

This example is drawn from the `data-search` plugin.

{% include_relative code-samples/integration-testing/test-script-example-1.md %}

Notable features of this simple test script:

- The top level description should describe the purpose of the test script
- Each test script can have one or more test specs (in this example there is only one test spec)
- Each test spec has a description which should describe the purpose of the spec
- Each test spec has one or more test tasks
- one type of task is an `action`. An action may require task properties. 
  - The `navigate` action initiates a change in the `hash` property of the browser; the value of the hash is provided by the `path` property
- another type of task is the `subtask`. Think of subtasks as canned sets of tasks which are inserted into the test script. Subtasks are handy for supporting DRY tests -- sequences of oft-used or obscure script steps can be captured and stored with kbase-ui for all integration test scripts to us (they can also be defined in the test script itself)
  - In this case the subtask is `plugin`, a built-in task which will select the plugin wrapper iframe.
- finally we see a `wait` script task. The wait script task will both navigate to a specific node or set of nodes via the `selector` property, and test something about that node. Wait tasks have a default timeout of 10 seconds, which can be overridden in the task, and may take other properties to help define what is to be tested.

#### Concepts

Before laying out all of the elements of a test script, it would be most useful to describe the overall strategy for test scripts.

The basic task of ui integration testing is to

1. launch a browser,
2. point it to some instance of kbase-ui, and then
3. sign in
4. navigate to a path
5. execute a series of steps which typically
   1. locate elements,
   2. evaluate the state of elements, and
   3. interact with elements.

All of this is to simulate the interaction of a user with the web app, and then to observe it to ensure that it behaves as expected.

Steps 1 and 2 are taken care of automatically by the integration test running code itself.

Steps 3 and 4 are usually placed at the top of the test tasks. Sign in is accomplished by a _subtask_ named "login". The login subtask is predefined by kbase-ui. It sets a kbase session cookie (as defined in the config file), and then waits until the login widget displays the associated username.

Navigation to a path is conducted by an _action_ of type _navigate_. Most tasks which interact with the browser are provided by an _action_ task. The _navigate_ action requires a path property which provides the path that would be provided in the hash element of the url. This is approximately the same action as typical ui navigation actions.

Step 5.1, location of elements, involves describing a path in the DOM hierarchy. Locating an element may be part of observation or an action. The path is essentially a selector, and consists of document nodes with certain attributes. In fact, when used, the property name is indeed `selector`.

Although any attribute may be used, we have a strong preference for special _testhook_ attributes. Testhook attributes are specially formatted data- attributes embedded in the markup of kbase-ui and plugins. By using special data- attributes, the test selectors are protected from the changes that might otherwise cause them to break. To wit, the common practice of using classnames for DOM selection is dangerous for test scripts because the classnames may change due to styling requirements which usually are orthogonal to the basic architecture. For instance, tabs may be labeled for testing so that the tests do not depend on the tab implementation.

In Step 5.2 we evaluate the state of elements. Currently supported inspection includes existence, a text value, a numeric value, and a count of nodes. For instance, a button can be located via a selector, and then the label on the button inspected to ensure that it is the correct label. 

In Step 5.3 we can interact with a dom node. The most common action is to click the element.

A test spec, dedicated to testing a specific feature, will typically utilize a sequence of steps 5.1, 5.2, and 5.3 to walk through the interface, interact with it, and observe how it responds.

#### Test

Each test script has a single top level node which describes the test. The most important aspect of it is the `description` field. This field should briefly describe the test. It will be printed in the test results, so should be descriptive enough to distinguish the test amongst many. It should mention the plugin name as well as the overall purpose of the test.

##### `description`

Describes the test script; it should mention the plugin name as well as the overall purpose of the test.

##### `baseSelector`

A selector to be applied to all spec tasks which specify document navigation with a selector. It can be handy to avoid boilerplate in selectors, since a plugin's tests should primarily operate within the plugin's dom subtree.

> Note that base selectors are not useful for external plugins since they have been migrated to the plugin architecture. Navigation into iframes is handled differently than simple DOM node navigation.

To find out more about selectors, please see the section below.

#### `specs`

Each test provides one or more test specs. A test spec is really a test instance, and the test spec provides a set of instructions called _tasks_. These tasks are typically composed of _subtasks_, _actions_, and _observations_.

Almost every test begins with a `login` subtask followed by a `navigation` action. This is the equivalent of a user opening a browser, putting in the top level kbase url, logging in, and then navigating to a ui feature, typically provided by a plugin.

#### `description`

[ to be done ]

#### `enable`

A test spec may be enabled for one or more environments using this syntax:

```yaml
enable:
    env: [ci, next]
```

Tests which are enabled for one or more environments are disabled for the rest.

This is handy when a plugin includes a feature which is only applicable to a subset of deployment environments.

#### `disable`

Test spec disabling is the converse of enabling - a spec will not be run for disabled environments, but will be run for all others.

#### `tasks`

The main purpose of a test spec is to provide a set of instructions for poking at and inspecting our web app. These instructions are provided as a sequence of _tasks_.

Test tasks are executed from top to bottom. Any task which fails, for whatever reason, causes the entire test spec to fail.

##### `title`

A description of the step, may be printed in test results. Optional.

##### `action`

The action property causes the test runner to interact with the browser to cause some sort of change.

Actions include:
    - navigate
    - click
    - setSessionCookie
    - deleteSessionCookie
    - keys
    - switchToFrame
    - switchToParent
    - baseSelector
    - pause
    - setValue
    - log

For example:

This task

```yaml
      - action: navigate
        path: search
```

causes the browser to navigate to search, just as if the user had clicked the search menu item on the sidebar menu.

In fact, we can achieve the same thing by selecting and clicking the search menu item in the ui. However, this test step is taken from the search plugin, and a plugin should not assume too much about the architecture of the ui. E.g. a plugin specifies paths by which it can be invoked, which matches the path property of the navigate action, and even menu items which can invoke that path, but does not control where those menu items are displayed, if they are at all.

##### `wait`

A wait task selects a node and waits for some condition about it to be available. A wait task will "wait" for a period of time for the condition to be true. If the condition does not come about within that time period, the task and test spec fails.

The task timeout defaults to 10 seconds, but may also specified by the `timeout` property.

The selection is specified by the `selector` property.

The condition to test is specified by the value of the `wait` property, and also associated properties.

Wait conditions include:
    - existence of the element
    - text value
    - numeric value
    - number of matching elements

[ LEFT OFF HERE ]

##### `subtasks`

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