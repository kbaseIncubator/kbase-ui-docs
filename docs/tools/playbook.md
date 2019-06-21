---
---

# Playbook

## Background

Playbook is a browser-based documentation and prototyping tool...

The KBase Ant Design Playbook is a standalone CRATS project...

## Installation

## Original Setup Notes

(in this section we document the steps to create the original base and playbook project from scratch... may be useful for creating other playbooks. E.g. for kbase custom components, or special use cases.)

### Create CRATS project

Create project directory:

```bash
mkdir kbase-ui-playbook
cd kbase-ui-playbook
git init
```

Bootstrap project.

```bash
npx create-react-app react-app --typescript
```

Ensure it works.

```bash
npm test
npm start
```

(or the `npm run ..` equivalent.)

### Add Storybook

Install storybook package:

```bash
npm install @storybook/react @types/storybook__react --save-dev
```

Add to the package.json scripts section:

```json
"storybook":  "start-storybook"
```

Create storybook config

- create directory `.storybook`
- add here a config file: `webpack.conf.js`

```javascript
module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [
        [
          "react-app",
          {
            flow: false,
            typescript: true
          }
        ]
      ]
    }
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
```

- add here a config file: `config.js`:

```javascript
import { configure } from "@storybook/react";
// automatically import all files ending in *.stories.tsx
const req = require.context("../stories", true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);
```

### Setup Storybook Stories

create directory `src/stories`.

...

### Addons

#### Install Addon packages

```bash
npm install --save-dev @storybook/addon-actions @storybook/addon-links @storybook/addon-knobs @storybook/addon-notes
```

#### Configure addons

Add a file to `.playbook` called `adding.js`:

```bash
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-notes/register';
```

##### Notes

The _notes plugin_ allows you to add arbitrary text and markdown notes, to any story. Such notes will appear in the notes tab at the top of the storybook view.

See https://github.com/storybookjs/storybook/tree/master/addons/notes

### Add in ant design

```bash
npm install antd @craco/craco craco-antd --save
```

### Finish up

clean up package.json
