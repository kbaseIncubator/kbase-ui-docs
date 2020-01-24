# Test Scripts

In the kbase-ui integration test system, tests are provided as _test scripts_. A test script is not a programmatic script (javascript, python, etc.) but rather a set of testing instructions provided in a yaml formatted file.

Testing scripts are provided in three basic forms: ui tests, plugin tests and predefined subtasks. All of these test scripts adhere to the format described in the next few chapters. In future chapters we'll describe how these types of tests differ.

A set of test scripts can be referred to as a test suite.

## Test Script Format

The basic structure of a test script file is:

- test
  - case 1
    - task 1
    - task 2
    - task 3
  - case 2
    - task 1
    - task 2

A test script is a hierarchical structure. The top level of the test script is referred to as a _test_. There is a 1-1 relationship between a test file and the test it contains. A test should be dedicated to one major feature or set of concerns. For instance, a plugin may dedicate one test script per route.

Within a test one or more test cases may be defined. A test case is essentially a scenario or situation. It may correspond to a particular use case of a feature, a bug case, etc.

A test case is primarily a container for test tasks or steps. However, a test case can also be enabled or disabled for a given deployment environment, and also establish behavior for the test case such as the root DOM path.

Finally, a test case is populated with one or more tasks. Each task describes a test action, navigation, or assertion (expectation) which are executed from top to bottom. If any task fails, due to an unmet assertion or exception, the test case is considered to have failed.

### Example 1: simple test script

This example is drawn from the `data-search` plugin.

{% include_relative code-samples/test-script-example-1.md %}

Notable features of this simple test script:

- The top level description should describe the purpose of the test script
- Each test script can have one or more test cases (in this example there is only one test case)
- Each test case has a description which should describe the purpose of the case
- Each test case has one or more test tasks
- one type of task is an `action`. An action may require task properties. 
  - The `navigate` action initiates a change in the `hash` property of the browser; the value of the hash is provided by the `path` property
- another type of task is the `subtask`. Think of subtasks as canned sets of tasks which are inserted into the test script. Subtasks are handy for supporting DRY tests -- sequences of oft-used or obscure script steps can be captured and stored with kbase-ui for all integration test scripts to us (they can also be defined in the test script itself)
  - In this case the subtask is `plugin`, a built-in task which will select the plugin wrapper iframe.
- finally we see a `wait` script task. The wait script task will both navigate to a specific node or set of nodes via the `selector` property, and test an assertion about that node. Wait tasks have a default timeout of 10 seconds, which can be overridden in the task, and may take other properties to help define what is to be tested.

## Concepts

Before laying out all of the elements of a test script, it would be most useful to describe the overall strategy for test scripts.

The basic task of ui integration testing is to

1. launch a browser,
2. point it to some instance of kbase-ui, and then
3. sign in
4. navigate to a path
5. execute a series of tasks which typically
   1. locate elements,
   2. evaluate the state of elements, and
   3. interact with elements.

All of this is to simulate the interaction of a user with the web app, and then to observe it to ensure that it behaves as expected.

Steps 1 and 2 are taken care of automatically by the integration test running code itself.

Steps 3 and 4 are usually placed at the top of the test tasks for a given case. Sign in is accomplished by a _subtask_ named "login". The login subtask is predefined by kbase-ui. It sets a kbase session cookie (as defined in the config file), and then waits until the login widget displays the associated username.

Navigation to a path is conducted by an _action_ of type _navigate_. Most tasks which interact with the browser (change the state of the browser) are provided by an _action_ task. Each task may require addition information, provided as properties of the task. The _navigate_ action requires a _path_ property which provides the path that would be provided in the hash element of the url. This is approximately the same action as typical ui navigation actions.

Step 5.1, location of elements, involves describing a path in the DOM hierarchy. A task which locates an element usually includes an assertion. The path is essentially a selector, which describes document nodes with certain attributes. The property name is `selector`.

Although any attribute may be used, we have a strong preference for special _testhook_ attributes. Testhook attributes are specially formatted `data-` attributes embedded in the markup of kbase-ui and plugins. By using special `data-` attributes, the test selectors are protected from the changes that might otherwise cause them to break. To wit, the common practice of using classnames for DOM selection is dangerous for test scripts because the classnames may change due to styling requirements which are often orthogonal to the overall architecture. For instance, tabs may be provided with testhooks so that no matter the tab implementation, the individual tabs (and tab content containers) may be selected.

An important aspect of element selection is that when a selector is used, it sets the current path. Any actions will be conducted on the node or nodes found at the current selection path.

In Step 5.2 we evaluate the state of elements. Currently supported inspection includes existence, a text value, a numeric value, and a count of nodes. For instance, a button can be located via a selector, and then the label on the button inspected to ensure that it is the correct label.

Steps 5.1 and 5.2 are typically combined with the `wait` task type.

In Step 5.3 we can interact with a dom node. The most common action is to click the element. Some actions interact with predefined DOM elements. E.g. setting a cookie is applied to the browser.

A test case, dedicated to testing a specific feature, will typically utilize a sequence of steps 5.1, 5.2, and 5.3 to walk through the interface, interact with it, and observe how it responds.

## Test

Each test script has a single top level node which describes the test. 

### `description`

The most important aspect of it is the `description` field. This field should briefly describe the test. It will be printed in the test results, so should be descriptive enough to distinguish the test amongst many. It should mention the area of functionality it applies to (e.g. plugin) and the overall purpose of the test.

### `baseSelector`

A `baseSelector` may be defined, which will be applied to all test case tasks which specify document navigation with a selector and are not set to be absolute. It can be handy to avoid boilerplate in selectors, since a set of test cases may apply to the same DOM subtree.

> Note that base selectors are not useful for external plugins since they have been migrated to the plugin architecture. Navigation into iframes is handled differently than simple DOM node navigation.

To find out more about selectors, please see the section below.

#### `cases`

Each test provides one or more test cases. A test case is really a test instance, and the test case provides a set of instructions called _tasks_. These tasks are typically composed of _subtasks_, _actions_, and _observations_.

Almost every test begins with a `login` subtask followed by a `navigation` action. This is the equivalent of a user opening a browser, putting in the top level kbase url, logging in, and then navigating to a ui feature, typically provided by a plugin.

> NOTE: The older term for a test case is a test _spec_. The terms are synonymous within test scripts.

#### `description`

[ to be done ]

#### `enable`

A test case may be enabled for one or more environments using this syntax:

```yaml
enable:
    env: [ci, next]
```

Tests which are enabled for one or more environments are disabled for the rest.

This is handy when a plugin includes a feature which is only applicable to a subset of deployment environments.

#### `disable`

Test case disabling is the converse of enabling - a case will not be run for disabled environments, but will be run for all others.

#### `tasks`

The main purpose of a test case is to provide a set of instructions for poking at and inspecting our web app. These instructions are provided as a sequence of _tasks_.

Test tasks are executed from top to bottom. Any task which fails, for whatever reason, causes the entire test case to fail.

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

See the chapter [Actions](./5-actions) for descriptions of all available actions.

###### `navigate`



###### `click`



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

[5. Actions](./5-actions)