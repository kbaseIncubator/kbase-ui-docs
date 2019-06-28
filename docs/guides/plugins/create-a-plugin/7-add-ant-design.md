# Step 7. Add Ant Design

Modern KBase user interfaces utilize [Ant Design](https://ant.design) as the base component library.

1. Add Component Library Support

   ```bash
   npm install antd @craco/craco craco-antd nodemon --save
   ```

   > Don't forget to clean up `package.json`.

2. Set up craco

   `craco` is a Create React App (CRA) customization tool. We are using it for now to allow us to integrate Ant Design theming, which is implemented as LESS variable overrides.

   Replace the CRA script calls with craco script calls in package.json:

   ```json
   "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "eject": "react-scripts eject"
   },
   ```

   becomes

   ```json
   "scripts": {
        "start": "nodemon -w ./craco.config.js -w ./src/custom/style/antd/theme.less --exec 'craco start'",
        "build": "craco build",
        "test": "react-scripts test"
   },
   ```

   > Note that we are changing the definitions of the scripts. We can still use all of the standard CRA npm script commands start, build, and test.

   > Note that the `test` script is using the `react-scripts` script rather than the `craco` script -- `craco test` current does not work (well) with the Ant Design less overrides.

3. Set up craco antd plugin

   - Add the `craco` customization file `craco.config.js` in the top level `react-app` directory:

   ```typescript
   const path = require("path");
   const CracoAntDesignPlugin = require("craco-antd");

   module.exports = {
     jest: {
       babel: {
         addPresets: true,
         addPlugins: true,
         configure: (jestConfig, { env, paths, resolve, rootDir }) => {
           jestConfig.transformIgnorePatterns = ["[/\\\\]node_modules[/\\\\](?!kbase-ui-lib|antd/).+\\.js$"];
           jestConfig.rootDir = "./src";

           return jestConfig;
         }
       }
     },
     plugins: [
       {
         plugin: CracoAntDesignPlugin,
         options: {
           customizeThemeLessPath: path.join(__dirname, "src/custom/style/antd/theme.less")
         }
       }
     ]
   };
   ```

   - Add the antd customization less file in `theme.less` into the new directory `react-app/custom/antd`:

   > Sorry, github pages uses [Rouge](http://rouge.jneen.net/) for syntax highlighting, and Rouge does not currently support less stylesheets, thus the lack of styling in the code sample below :(

   ```less
   /**
    * Primary antd colors. 
    * Blue, green, gold are derived from the kbase logo colors.
    */
   @blue-kbase: rgb(22, 99, 186);
   @green-kbase: rgb(45, 135, 48);
   @gold-kbase: rgb(251, 116, 7);
   @red-kbase: rgb(163, 36, 36);
   @font-size-base-kbase: 16px;
   @font-family-kbase: "Oxygen";

   // antd theme customization
   @primary-color: @blue-kbase;
   // @primary-color: @debug-kbase;

   @info-color: @blue-kbase;
   @success-color: @green-kbase;
   @processing-color: @blue-kbase;
   @error-color: @red-kbase;
   @highlight-color: @red-kbase;
   @warning-color: @gold-kbase;
   @normal-color: #d9d9d9;

   /**
    * Use KBase fonts. 
    * Note: Currently the kbase ui uses oxygen for most text, and roboto for
    * headlines.
    */
   @font-family: @font-family-kbase;
   @code-family: monospace;

   @text-color: fade(@black, 65%);
   @text-color-secondary: fade(@black, 45%);
   @text-color-warning: @gold-7;
   @text-color-danger: @red-7;
   @text-color-inverse: @white;

   @font-size-base: @font-size-base-kbase;
   @font-size-lg: @font-size-base + 2px;
   @font-size-sm: 12px;
   @heading-1-size: ceil(@font-size-base * 2.71);
   @heading-2-size: ceil(@font-size-base * 2.14);
   @heading-3-size: ceil(@font-size-base * 1.71);
   @heading-4-size: ceil(@font-size-base * 1.42);

   // Layout
   @layout-body-background: #f0f2f5;
   @layout-header-background: #001529;
   ```

   > Note: When we have officially arrived at our antd theme, we'll just install it here.

   > Remember: Ideally ALL of the setup described here will be automated by a script.

4. Make sure it is still working

   ```bash
   npm run test
   npm run start
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

   - If `npm run start` is not running, run it.

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
