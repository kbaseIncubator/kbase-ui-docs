---
id: theming
title: Theming Ant Design
sidebar_label: Theming Ant Design
---

## Background

`craco` is a Create React App (CRA) customization tool. We are using it for now to allow us to integrate Ant Design theming, which is implemented as LESS variable overrides.

## Installation

```bash
npm install @craco/craco craco-antd --save
```

## Setup

### Remove global load of antd stylesheet

If you are loading the prebuilt antd stylesheet, remove that code.

For instance, when working with the default theme, I use:

```typescript
import "antd/dist/antd.css";
```

in my top level `App.tsx`.

This line should be removed, otherwise the style overrides will be superseded (in most cases) by the global stylesheet.

### Make sure you are using the non-default import form

In order to utilize the themed antd component styles, you need to use the import form

```typescript
import { Icon } from "antd";
```

rather than

```typescript
import Icon from "antd/lib/icon";
```

> Note: the latter is required for jest unit tests -- so we need to find a way for jest to work without that form! There is probably a way through craco...

### Fix npm `package.json`

Replace the CRA script calls with craco script calls in package.json:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "postbuild": "bash postbuild.sh",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

becomes

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "postbuild": "bash postbuild.sh",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

> Note that we are changing the definitions of the scripts. We can still use all of the standard CRA npm script commands.

### Set up craco antd plugin

Add the `craco` customization file `craco-config.ts` to the top level of the react app `src/react-app`:
AKIYO: this was a bit confusing...
Ref: [https://github.com/sharegate/craco/blob/master/packages/craco/README.md#custom-location-for-cracoconfigjs](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#custom-location-for-cracoconfigjs)

```
my-app
├── node_modules
├── craco.config.js
└── package.json
```

<!--DOCUSAURUS_CODE_TABS-->
<!--Typescript -->

```typescript
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [{ plugin: CracoAntDesignPlugin }]
};
```

<!--END_DOCUSAURUS_CODE_TABS-->

> AKIYO: how does it know where to look for the file? It's not working for me.
> ERIK: By default craco will look for that specific file. `craco` supports other methods of configuration: https://github.com/sharegate/craco/blob/master/packages/craco/README.md#custom-location-for-cracoconfigjs

Add the antd customization less file in `src/react-app/custom/style/antd/theme.less`:

```less
// antd theme customization
// @primary-color: #1da57a;
// @link-color: #1da57a;
```

### Making development easier

Changing the antd `theme.less` file or the Craco config file `Craco-config.ts` does not cause the development-time app to reload.

Try this:

Install `nodemon`:

```bash
npm install --save-dev nodemon
```

Update the start script:

```json
"scripts
```

#### Refs

https://github.com/DocSpring/craco-antd#reload-custom-variables-during-development

## The KBase Theme

So now to the theme itself...

Here is a start:

> This is a working set of overrides, we are currently actively development them, so they WILL change!

```less
@blue-kbase: rgb(22, 99, 186);

// antd theme customization
@primary-color: @blue-kbase;
@info-color: @blue-kbase;
@success-color: @green-6;
@processing-color: @blue-kbase;
@error-color: @red-6;
@highlight-color: @red-6;
@warning-color: @gold-6;
@normal-color: #d9d9d9;

@font-family: "Oxygen";
@code-family: monospace;
@text-color: fade(@black, 65%);
@text-color-secondary: fade(@black, 45%);
@text-color-warning: @gold-7;
@text-color-danger: @red-7;
@text-color-inverse: @white;

@font-size-base: 14px;
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

## References

- [craco](https://github.com/sharegate/craco)
- [craco antd plugin](https://github.com/FormAPI/craco-antd)
- [antd theme variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)
