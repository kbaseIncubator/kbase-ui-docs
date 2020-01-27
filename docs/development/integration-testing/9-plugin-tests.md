# Plugin Tests

A plugin should have one or more test scripts. Each script should be dedicated to a set of concerns, such as a route. Each plugin should have a test script for each route.

A test script may contain one or more test specs. Each spec is composed of one or more test tasks. Any task may cause a test spec failure.

Each plugin should have a directory `src/plugin/test` which contains one or YAML files containing test scripts.

> NOTE: The plugin directory may be in a different location, as specified by the plugin's configuration file.

## directory structure

Within the plugin repo, the test directory resides within the plugin directory, which is usually either `src/plugin` or simply `plugin`.

- src
  - plugin
    - test
      - data
        - ci
          - data1.json
        - next
          - data1.json
        - narrative-dev
          - data1.json
        - prod
          - data1.json
      - test1.yaml
      - test2.yaml
      - test3.yaml

Directly within the test directory are the test files in yaml format. Each of these test scripts will be run in alphanumeric order by the filename.

The optional `data` directory may be provided within the test directory as well. If there are test data files, they will be located with subdirectories named `ci`, `next`, `narrative-dev` and `prod`.

Test data is described in the [test data](./7-test-data) chapter.

## Writing Tests

Because tests are run by kbase-ui, it is best to write tests within the `dev/test/integration-tests/specs/plugins/PLUGIN-NAME`, where `PLUGIN-NAME` is the name of the plugin.

The basic task for test writing is:

- start with two very basic tests; complete examples will be provided below:
  - unauthenticated, ensuring that plugins requiring authentication trigger the login page
  - basic authenticated, ensuring that the plugin is loaded when authentication is present

- after establishing the two basic tests, additional tests should be added to test each plugin path, and each use case

> Most of our plugins need many more tests!

During test development, it is nearly impossible to avoid a bit of refactoring in the plugin. This ius because most plugins do not have testhooks established until tests are created!

## Example Tests

### Unuathenticated

```yaml
---
description: Accessing data search without authentication
cases:
  - description: should get the signin page
    tasks:
    - action: navigate
      path: search
    - subtask: plugin
    - wait: forText
      selector:
        - type: plugin
          value: auth2-client
        - type: component
          value: login-view
        - type: field
          value: requested-path
      text: search
```

### Authenticated Basic

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

[10. Subtasks](./10-subtasks)
