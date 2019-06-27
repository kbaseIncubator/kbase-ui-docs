---
---

# Step 6. Setup as Plugin

So far we have managed to create a simple CRA-based web app, with a few tweaks. Now we will install the machinery needed to run this web app as a kbase-ui plugin.

1. Set the target JS language

    By default a CRA app is configured to target ES5. This gives the broadest browser coverage. However, since we already require ES6 browser compatibility, the generated code will be more compact and understandable if we target ES6.

    Edit `react-app/tsconfig.json` to set the property `compilerOptions.target` to `"ES6"`.

2. Set the homepage property

    By default the CRA does not set the `"homepage"` property. The default behavior does not work well for our app, since it assumes the app path is at the url root `/`. The plugin react app will operate at a url path that looks like `/modules/plugins/PLUGIN/iframe_root`. We don't want to hard-code that value in our app, if we can.

    What we can do is set the homepage property to `./`.

    Edit the file `src/react-app/project.json` to add the top level property:

    ```json
    "homepage": "./",
    ```

3. Set up Proxy

    For local development with `npm run start`, let's make the built-in proxy work with KBase's CI environment. This will proxy requests from `http://localhost:3000` (or wherever the local dev server is running, this is the default url) to `https://ci.kbase.us`.

    Add the `proxy` property to `package.json` like so:

    ```json
    "proxy": "https://ci.kbase.us"
    ```

    > TODO: We should probably support proxying against any kbase deployment without having to tweak package.json, which might be accidentally checked in with a dev change.

4. Set up the KBase integration dependency

    Integration into kbase-ui depends on a KBase npm package called _kbase-ui-lib_.

    - Install the _kbase-ui-lib_ package.

      ```bash
      npm install --save @kbase/ui-lib
      ```

5. Fix new dependency

    After installing any new dependencies, it is a good idea to update `package.json` to ensure that the dependency version expressions are absolute. We do that by editing `package.json`.

    - edit `package.json`
    - note the new dependencies:

      ```json
      "@kbase/ui-lib": "^1.0.0",
      ```

      The `^` prefix to the dependency versions means that npm is allowed to install the most recent version of the package with the same major version number. Thus a version expression of `^1.0.0` may result in version `1.5.13` being installed.

      We would rather our builds be deterministic and repeatable, so we want to simply remove the `^` prefix. npm will have installed the most recent versions of the packages, so we don't have to inspect the versions to ensure we have the most recent one.

      > Note that as this documentation is being written, this dependency expression actually looks like the following, and does not need editing.

      ```json
      "@kbase/ui-lib": "0.1.0-alpha.3",
      ```

6. Install redux:

    The KBase integration requires the usage of Redux in the react app. Even if the app itself does not need to manage app state (although it is hard to imagine a kbase-ui plugin worth creating without significant state!), the integration requires the usage of Redux as the storage location for data sent from kbase-ui when the plugin is loaded.

    - install redux packages

      ```bash
      npm install --save redux react-redux @types/react-redux redux-thunk
      ```

    - fix up the dependencies to remove the `^` as described above.

7. Create redux implementation files

    First we'll put the redux pieces in place, without any functionality. In this step we are going to create files with this structure:

    ```text
    redux
        actions.ts
        reducers.ts
        store.ts
    ```

    - create the top level `redux` directory within `react-app/src`.

      ```bash
      mkdir redux
      ```

    - within `redux`, create `actions.ts` with the following code

      ```typescript
      import { Action } from "redux";
      ```

    - within `redux`, create `store.ts` with the following code.

      ```typescript
      import { BaseStoreState, makeBaseStoreState } from "@kbase/ui-lib";
      import { createStore, compose, applyMiddleware } from "redux";
      import thunk from "redux-thunk";
      import reducer from "./reducers";

      export interface StoreState extends BaseStoreState {}

      export function makeInitialStoreState(): StoreState {
        const baseStoreState = makeBaseStoreState();
        return {
          ...baseStoreState
        };
      }

      export function createReduxStore() {
        return createStore(reducer, makeInitialStoreState(), compose(applyMiddleware(thunk)));
      }
      ```

    - within `redux`, create `reducers.ts` with the following code

      ```typescript
      import { Action, Reducer } from "redux";
      import { baseReducer } from "@kbase/ui-lib";
      import { BaseStoreState } from "@kbase/ui-lib";
      import { StoreState } from "./store";

      const reducer: Reducer<StoreState | undefined, Action> = (state: StoreState | undefined, action: Action) => {
        const baseState = baseReducer(state as BaseStoreState, action);
        if (baseState) {
          return baseState as StoreState;
        }
        return state;
      };

      export default reducer;
      ```

8. Add integration component to App.tsx

    Now that redux is set up, including integration into the core kbase-ui integration, we need to add a special integration component to our app to active it.

    - update `App.tsx` so that it looks like this:

      ```typescript
      import React from "react";
      import { Provider } from "react-redux";
      import { createReduxStore } from "./redux/store";
      import "./App.css";

      const store = createReduxStore();

      interface AppProps {}

      interface AppState {}

      export default class App<AppProps, AppState> extends React.Component {
        render() {
          return (
            <Provider store={store}>
              <div className="App">
                <p>Hello!</p>
              </div>
            </Provider>
          );
        }
      }
      ```

    - note the updates:
      - we added two new imports for `Provider` and `createReduxStore`
      - we used `createReduxStore` to create our initial redux store, which is stored in the top level App component's namespace.
      - we wrapped our app content in a `Provider` component, which ensures that our app has access to redux.

9. Test it

    After a major set of changes like this, it is prudent to run the tests, and to exercise the web app, to ensure we didn't introduce bugs.

    ```bash
    npm run test
    npm run start
    ```

    The first thing you should notice is that instead of "Hello" and "Hi!", you now are confronted with a dialog box

    ![Dev Authorization Form](./images/authorization-form.png)

    This is the "Developer Authorization Form". Essentially it allows you to add a KBase auth cookie to the browser, and remove it.

    To proceed to the App, you should enter a CI login token into the **Token:** field and click the **Assign Token** button.

    You should now see the token user's real and user name displayed, and a logout button:

    ![Dev Authorization Form - Authorized](./images/authorized-form.png)

10. Walk like a Duck

    Now we need to add the files kbase-ui expects in order to load this web app as a plugin.

    - Add plugin config directory:

      ```text
      src
        plugin
          iframe_root
      ```

      ```bash
      mkdir -p plugin/iframe_root
      ```

    - Add a `README.md` file to this folder:

      ```markdown
      # iframe_root

      This is where the built app will be installed for the plugin.
      ```

      > The content is not important; this file serves as a placeholder so that the `iframe_root` directory is retained by git (this is ensured in `.gitignore`)

    - Add the plugin config file `config.yml` in `plugin`:

      ```yaml
      ## Plugin Configuration
      ---
      package:
        author: KBase Developer
        name: example-hello
        description: An example plugin which says "hello"
        type: iframe
      install:
        routes:
          - path: ["example-hello"]
            queryParams:
              path: { literal: ["main"] }
            widget: kb_iframe_loader
            authorization: true 
            # TODO: get rid of this!!
            params:
              plugin: example-hello
        menu:
          - name: example-hello
            definition:
              path: ["example-hello"]
              label: Example Hello
              icon: flask
      ```

      [ discuss it here ]

11. Adjust CRA build

    Now that we have a "home" for the plugin, we need to ensure that the web app is available within the plugin. 

    We accomplish this simply by copying the static build into the `iframe_root` directory.

    - Create a `scripts` directory in the `react-app` directory:

        ```bash
        mkdir react-app/scripts
        ```

    - Create a `install-plugin.bash` file in the `scripts` directory with the following content:

      ```bash
      rm -rf ../plugin/iframe_root/*
      cp -pr build/* ../plugin/iframe_root
      ```

    - Add a this as a npm script `install-plugin` to `package.json` in `react-app`:
  
      ```json
      "scripts": {
          "start": "nodemon -w ./craco.config.js -w ./src/custom/style/antd/theme.less --exec 'craco start'",
          "build": "craco build",
          "test": "react-scripts test",
          "install-plugin": "bash scripts/install-plugin.bash"
        }
      ```

12. Add new top level support:

    - Create the file `LICENSE.md` at the top level of your repo, with the following content:

      ```markdown
      Copyright (c) 2019 The KBase Project and its Contributors

      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      ```

    - Fluff up the `README.md` file

      We created a README.md file when the repo was created at github, but we need to utilize the common readme format.

      The recommended template is based on  [common-readme](https://github.com/noffle/common-readme) with some minor modifications.

        - **Title** as the first level header
        - **One line description** as quoted text
        - **Longer description**
        - All sections below as second level header
        - **Usage**: describe how to use it
        - **Background**: (recommended) the plugin is probably the front end for an area of complex of KBase functionality, which should be the subject of the background.
        - **API**: (optional) for a library, describe the api or link to the docs
        - **Install**: (optional) if the repo has some installation aspect, describe or reference it here
        - **Acknowlegements**: a list of major contributors to code, architectural design, and so forth; (optional) link to their GitHub profile or other home page.
        - **See Also**: a list of related projects, linked.
        - **License**: Will always be "SEE LICENSE IN LICENSE", since the KBase open source license is contained within the separate LICENSE file.

    - Copy the following sample into `README.md` and complete each relevant section. Unnecessary sections may be removed.

      ```markdown
      # TITLE

      > SINGLE SENTENCE

      BRIEF DESCRIPTION

      ## Usage
      HOW TO GET STARTED and USE IT

      ## Install
      INSTALLATION OF DEPENDENCIES, THE THING ITSELF

      ## Background
      HOW THIS FITS INTO KBASE

      ## API
      IF IT IS A LIBRARY OR SERVICE

      ## Acknowledgments
      - NAME - COMMENT

      ## See Also
      -  [TITLE](URL)

      ## License
      SEE LICENSE IN LICENSE.md
      ```

      - Refs
        - [Awesome README](https://github.com/matiassingers/awesome-readme) 
        - collection links to examples, specs, articles, tools.

      - Tooling
        - [common-readme](https://github.com/noffle/common-readme) - an effort to, er, create a standard readme

      ```markdown
      ```

    - We also need to add a top level `package.json`.

      ```json
      {
        "name": "kbase-ui-plugin-{PLUGIN}",
        "version": "1.0.0",
        "description": "description of your plugin",
        "main": "index.js",
        "devDependencies": {
          "common-readme": "^1.1.0"
        },
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "postinstall": "bash scripts/postinstall.bash"
        },
        "repository": {
          "type": "git",
          "url": "git+https://github.com/kbase/kbase-ui-plugin-{PLUGIN}.git"
        },
        "author": "KBase Developers",
        "license": "SEE LICENSE IN LICENSE.md",
        "bugs": {
          "url": "https://github.com/kbase/kbase-ui-plugin-{PLUGIN}/issues"
        },
        "homepage": "https://github.com/kbase/kbase-ui-plugin-{PLUGIN}#readme"
      }
      ```

    - Create the `scripts` directory at the top level

      ```bash
      mkdir scripts
      ```

    - Create the `postinstall.bash` script in the `scripts` directory:

      ```bash
      echo "Running plugin post install script"
      cd react-app && \
      npm install && \
      echo "✓ dependencies installed successfully" && \
      npm run build && \
      echo "✓ built successfully" && \
      npm run test -- --watchAll=false && \
      echo "✓ tests run successfully" && \
      npm run install-plugin && \
      echo "✓ plugin setup successfully" && \
      echo "✓ plugin installed successfully"
      ```

    - Try out the script

      ```bash
      npm run postinstall
      ```

13. Push up plugin repo

    We are about to add the plugin to the kbase-ui build config. When we do this there are two methods available - bower (deprecated) and git. We'll use the git method.

    - perform a final dev start, build, and test cycle.

    - commit all changes and push up the new plugin repo to your personal account at github.

      ```bash
      git add .
      git commit -m "my great changes"
      git push origin master
      ```

## References

- https://redux.js.org/recipes/migrating-to-redux

## Next Step

[Step 7. Add Ant Design](./7-add-ant-design)

\---
