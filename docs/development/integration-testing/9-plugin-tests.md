# Plugin Tests


A plugin can have one or more test scripts. Each script should be dedicated to a set of concerns, such as a route. Each plugin should have a test script for each route.

A test script may contain one or more test specs. Each spec is composed of one or more test tasks. Any task may cause a test spec failure.

Each plugin should have a directory `src/plugin/test` which contains one or YAML files containing test scripts.

> NOTE: The plugin directory may be in a different location, as specified by the plugin's configuration file.

[10. Predefined Subtasks](./10-predefined-subtasks)
