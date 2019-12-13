# Step 7. Add Ant Design

Modern KBase user interfaces utilize [Ant Design](https://ant.design) as the base component library.

1. Add Component Library Support

   ```bash
   yarn add antd @craco/craco craco-antd nodemon
   ```

   > Don't forget to clean up `package.json`.

2. Set up craco

   `craco` is a Create React App (CRA) customization tool. We are using it for now to allow us to integrate Ant Design theming, which is implemented as LESS variable overrides.

   Replace the CRA script calls with craco script calls in package.json:

   ```json
   "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "install-plugin": "bash scripts/install-plugin.bash"
   },
   ```

   becomes

   ```json
   "scripts": {
        "start": "nodemon -w ./craco.config.js -w ./src/custom/style/antd/theme.less --exec 'craco start'",
        "build": "craco build",
        "test": "react-scripts test",
        "install-plugin": "bash scripts/install-plugin.bash"
   },
   ```

   > Note that we are changing the definitions of the scripts. We can still use all of the standard CRA npm script commands start, build, and test.

   > Note that the `test` script is using the `react-scripts` script rather than the `craco` script -- `craco test` current does not work (well) with the Ant Design less overrides.

3. Set up craco antd plugin

   - Add the `craco` customization file `craco.config.js` in the top level `react-app` directory:

   ```typescript
   const path = require('path');
    const CracoAntDesignPlugin = require('craco-antd');

    const esModules = ['kbase-ui-lib'].join('|');

    module.exports = {
        jest: {
            babel: {
                addPresets: true,
                addPlugins: true,
                configure: (jestConfig, { env, paths, resolve, rootDir }) => {
                    // jestConfig.transformIgnorePatterns = [`<rootDir>/node_modules/(?!${esModules})`];
                    jestConfig.transformIgnorePatterns = ['[/\\\\]node_modules[/\\\\](?!kbase-ui-lib|kbase-ui-components|antd/).+\\.js$'];
                    jestConfig.rootDir = './src';
                    jestConfig.moduleFileExtensions = ['ts', 'tsx', 'json', 'js'];

                    return jestConfig;
                }
            }
        },
        // jest: {
        //     configure: {
        //         globals: {
        //             "CONFIG": true
        //         }
        //     }
        // },
        plugins: [
            {
                plugin: CracoAntDesignPlugin,
                options: {
                    customizeThemeLessPath: path.join(__dirname, 'node_modules/@kbase/ui-components/lib/custom/antd/theme.less')
                }
            }
        ],
        webpack: {
            alias: {
                react: path.resolve('./node_modules/react'),
                redux: path.resolve('./node_modules/redux'),
                'react-redux': path.resolve('./node_modules/react-redux')
            }
        },
        devServer: {
            watchOptions: {
                poll: 1000
            }
        }
    };
   ```

4. Make sure it is still working

   ```bash
   yarn test
   yarn start
   ```

5. Add a component to see ant design work

   The easiest way is to add a simple component, like a button, to the App component.

   - Add this import

   ```typescript
   import { Button } from "antd";
   ```

   - Within the `render()` method, below `<p>Hello!</p>` add:

   ```typescript
   <Button>Hi!</Button>
   ```

   - Save the file

   - If `yarn start` is not running, run it.

   - You should see the button render in the browser

     ![Ant Design Button](./images/antd-button.png)

## References

- [Ant Design](https://ant.design)
- [craco](https://github.com/sharegate/craco)
- [craco antd plugin](https://github.com/FormAPI/craco-antd)
- [antd theme variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)

## Next Step

[Step 8. Add to KBase UI](./8-add-to-kbase-ui)

\---
