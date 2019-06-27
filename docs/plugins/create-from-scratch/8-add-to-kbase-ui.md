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
            url: https://github.com/eapearson/kbase-ui-plugin-example-hello
    ```

2. rebuild the ui

    ```bash
    make dev-start env=dev build=dev build-image=t
    ```

3. rewire ci host

     - edit `/etc/hosts`

     - add the following line:

        ```bash
        127.0.0.1   ci.kbase.us
        ```

4. Pull up the ui in your browser at `https://ci.kbase.us`.

5. Iterating on plugin

    - Start the ui with:

      ```bash
      make dev-start env=dev build=dev build-image=f plugins="my-plugin"
      ```

    - After changes to the plugin, you will need to do a full build. From the top level of the repo:

      ```bash
      npm install
      ```

    - This installs top level dependencies (not necessary here) and more importantly runs the post install script, which both builds the plugin and moves it into the correct location for the ui.

6. Add to ui menu:

  > to be written - until then, after the above 

## Next Step

[Step 9. Add Testing](./9-add-testing)

\---
