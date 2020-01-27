# Subtasks

Subtasks are isolated sequences of test tasks, defined either in separate files or within a test file. They are typically used by referencing the name of the subtask, but may also be provided directly. The name of the subtask is the base name of the file, for those defined in files, or the property key, if defined in a test.

Anonymous (un-named), direct subtasks within a test case are not reusable - but do help break a long test script into fewer primary tasks.

When a subtasks is invoked the tasks within it are executed, just as if they had been provided directly in the test case itself.

Subtasks are important for making tests shorter and DRYer.

The basic example test in the previous chapter exemplifies the usage of two subtasks -- one to ensure the browser session is authenticated (`login`) and one to set the browser window context to the plugin iframe (`plugin`).

```yaml
---
description: Accessing data search with authentication
cases:
  - description: should load the data-search plugin
    tasks:
      - subtask: login
      - action: navigate
        path: search
      - subtask: plugin
      - wait: forElement
        selector:
          - type: plugin
            value: data-search
```


## file-based subtasks

kbase-ui provides several subtasks to assist in sets of test tasks which are often repeated. As more such patters are identified, the set of predefined subtasks may grow.

These subtasks are defined in `src/test/integration-tests/specs/subtasks`.

Current predefined subtasks are:

- `login.yaml` - sets the kbase session cookie, as provided by the test config file, and ensures that kbase-ui is authenticated, based on the structure of the signin widget (upper right corner of the ui) and the presence of the username of the test user (kbaseuitest).

- `logout.yaml` - removes the kbase session cookie

- `navigateToDashboard.yaml` - navigates to the Dashboard plugin by using the sidebar menu

- `plugin.yaml` - sets the current browser context to the iframe which embeds a plugin; this subtask is used by most plugin tests to ensure that the test browser context is within the plugin iframe window.

## test-based subtasks

A test file can also define it's own subtasks. This is handy if there are sequences of test tasks shared across multiple test cases.

In this example, taken from the mainwindow plugin, a subtask named `clicks` is defined. This subtask defines a sequence of 5 clicks (on whatever node the current selector path points to). The subtask is used 6 times in the test case, saving a great many lines of script.

```yaml
---
description: Sidebar Nav Navigation Tests without Authentication
subtasks:
  clicks:
    title: 5 clicks
    tasks:
      - action: click
      - action: pause
        for:
          random: [0, 50]
      - action: click
      - action: pause
        for:
          random: [0, 50]
      - action: click
      - action: pause
        for:
          random: [0, 50]
      - action: click
      - action: pause
        for:
          random: [0, 50]
      - action: click

cases:
  - description: Navigation between items with multiple clicks should result in just one instance of a plugin
```


## case-based subtasks

```yaml
      - subtask:
          title: Check the reference tab
          tasks:
            - wait: forElement
              title: select the reference data tab
              selector:
                - type: component
                  value: tabset
                - type: tab
                  value: reference-data
            - action: click
            - wait: forElement
              selector:
                - type: component
                  value: reference-data-main
                - type: component
                  value: results
                - type: alert
                  value: not-found
```


## anatomy of a subtask

[ to be written ]


[11. Development](./11-development)