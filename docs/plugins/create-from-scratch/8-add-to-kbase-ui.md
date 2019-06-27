# Step 8: Add To KBase UI

1. add to plugins.yml

    The kbase-ui configuration file `plugins.yml` located in the `config` directory (of the kbase-ui repo!) lists all kbase-ui plugins which will be included in the kbase-ui build.

    All plugins are contained in a list underneath the `plugins` top level property. Each plugin is represented by a list item:

    ```yaml
    - name: example-hello
      globalName: kbase-ui-plugin-example-hello
      version: kbase-ui-plugin-example-hello#master
      cwd: plugin
      source:
          git: 
            url: https://github.com/kbaseIncubator/kbase-ui-plugin-example-hello
    ```



2. 


## Next Step

[Step 9. Add Testing](./9-add-testing)

\---
