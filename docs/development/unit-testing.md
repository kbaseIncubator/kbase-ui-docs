---
id: unit-testing
title: Unit Testing
sidebar_label: Unit Testing
---

## Unit Testing

### Installation

Our unit testing tools are based on the [Jest](https://jestjs.io) testing framework and the [Enzyme](https://airbnb.io/enzyme/) react testing library.

### About

For the purposes of this document, we consider unit tests to be those which do not require connection to KBase or other network-based services. All components which need to render data from kbase or other services are composed of an inner (leaf) component called a "view" component, and an outer component called a "container" or "redux interface". Sometimes we need a third component called a "loader".

Unit testing only covers "view" components. This is no accident! On of he reasons we separate a component into multiple component layers is to allow the final view or display component to be more easily unit tested.

### Configuring testing in your project

The basic test mechanism is included with Create React App (CRA).

#### Install Enzyme

The enzyme library eases testing of React components.
AKIYO: Do you think we need to specify we are using react v16 and this is for react v16?

```bash
npm install --save enzyme enzyme-adapter-react-16 react-test-renderer @types/enzyme @types/enzyme-adapter-react-16
```

#### Include & Exclude Test Files

We'll need to tweak the test configuration in package.json:

```json
"jest": {
	"collectCoverageFrom": [
		"src/**/*.{ts,tsx}",
		"!/node_modules/",
		"!src/index.tsx",
		"!src/serviceWorker.ts"
	]
},
```

This ensures that we are testing all typescript files in the source directory, that we exclude all 3rd party library code, we skip the main index file referenced from index.html (it is not a module, so hard to test), and omit the service worker implementation included with CRA, but unused in our projects.
Ref: [https://jestjs.io/docs/en/configuration#collectcoveragefrom-array](https://jestjs.io/docs/en/configuration#collectcoveragefrom-array)
AKIYO: should it to be "! ** /node_modules/ ** ??

### Writing Tests

Tests use `enzyme` and `jest`. Enzyme provides react integration, jest is a test framework.

Each unit-testable code file has an accompanying test file in the same directory. Each test file is named after it's subject file, with `.test` added before the file suffix. Thus `MyFile.tsx`'s test file is `MyFile.test.tsx`.
ref: [https://facebook.github.io/create-react-app/docs/running-tests#filename-conventions](https://facebook.github.io/create-react-app/docs/running-tests#filename-conventions)

#### Base level test - I'm Alive!

When creating a test for a component one typically starts with the bare minimum test to ensure that the test file works and the component can be loaded without error.

```typescript
/**
 * Unit tests for the KBaseIntegration component
 */

// We need to import React, even though we don't explicity use it, because
// it's presence is required for JSX transpilation (the React object is
// used in the transpiled code)
import React from "react";

// Enzyme needs

import { configure, shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// We always need to import the component we are testing
import Loader from "./Loader";
import { AppState } from "../redux/app/store";
import { AppError } from "../redux/store";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const appState = AppState.NONE;
  const onLoad = () => {
    return;
  };
  shallow(<Loader status={appState} onLoad={onLoad} />);
});
```

This test relies on the fact that if there were any problem in the test file, from imports to setup to the actual component rendering, it would throw an error and be caught by the test framework.

### Running Tests

Tests are run using the built-in `test` script. All of the basic test configuration is included with CRA.

```
npm run test
```

By default the test script is setup for continuous testing during development. It listens for file changes, and re-runs the tests automatically. The test runner will run tests against all files (first time) or changed files, with a small menu of options for re-running tests, exiting, etc.

#### Coverage

Code coverage is a measure of how much of your code is exeuted during testing. Coverage is all about lines of code "touched" by the test. It does not measure whether tests actually cover an adequate range of values -- that part is up to you.

We consider test coverage above 80% (?) to be acceptable, but coverage varies by the type of project. Part of test set up is to control which files are actually tested. For example, some files may be difficult to unit-test and will be excluded, but are involved in integration tests (which also have coverage.)a

To see test code coverage, all we need to do is run the test command differently.

```bash
npm run test -- --coverage
```

A summary of coverage is reported directly in the console, with color coding to indicate which files have good (green), adequate (orange), and poor (red) coverage.

> Note: the `--` argument causes npm to consider that the end of options, and passes the rest to the test script; otherwise, npm would absorb the `--coverage` option (which does nothing) and the test script would not generate coverage.

After running the tests with coverage, you'll get a text-based table summarizing the results.

```bash
------------------------------------|----------|----------|----------|----------|-------------------|
File                                |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------------------------|----------|----------|----------|----------|-------------------|
All files                           |     2.92 |      1.9 |     6.17 |     2.93 |                   |
 src                                |        0 |      100 |        0 |        0 |                   |
  App.tsx                           |        0 |      100 |        0 |        0 |       37,49,50,54 |
 src/components                     |        0 |        0 |        0 |        0 |                   |
  JobLog.tsx                        |        0 |        0 |        0 |        0 |... 68,77,78,80,87 |
  MyJobs.tsx                        |        0 |        0 |        0 |        0 |... 07,716,720,729 |
  UserJobs-container.tsx            |        0 |      100 |        0 |        0 |... 65,67,70,73,78 |
  UserJobs.tsx                      |        0 |        0 |        0 |        0 |... 48,657,661,670 |
  time.ts                           |        0 |        0 |        0 |        0 |... 45,147,153,155 |
 src/kbaseUI/components             |    28.57 |       25 |    42.86 |    28.57 |                   |
  AppBase.tsx                       |        0 |        0 |        0 |        0 |    17,18,19,25,29 |
  Loader.tsx                        |    44.44 |    33.33 |       75 |    44.44 |    18,19,25,44,46 |
 src/kbaseUI/components/auth        |    18.18 |       15 |    28.57 |    18.18 |                   |
  loader.tsx                        |        0 |      100 |        0 |        0 | 23,24,30,32,35,38 |
  view.tsx                          |    22.22 |       15 |    44.44 |    22.22 |... 07,109,115,121 |
 src/kbaseUI/components/integration |    28.57 |      100 |       25 |    28.57 |                   |
  container.tsx                     |        0 |      100 |        0 |        0 |       35,36,43,45 |
  loader.tsx                        |        0 |      100 |        0 |        0 |    12,41,42,48,50 |
  view.tsx                          |       80 |      100 |       60 |       80 |                70 |
------------------------------------|----------|----------|----------|----------|-------------------|
```

The practice of achieving a given code coverage is to iteratively add tests and inspect the coverage results. We have a long way to go, clearly, at just under 3% code coverage!!

And our example test for `Loader.tsx` is quite low as well, between 33% and 44% (depending on the column).

#### More detailed coverage report

In addition to the summary, the coverage tool also produces a detailed report, which provides a per-file view of which lines were or were not covered.

The detailed coverage report is located in `src/react-app/coverage`, and is excluded from git commits. To view the report you need to open `src/react-app/coverage/lcov-report/index.html` in your favorite browser.

E.g.

```bash
open coverage/lcov-report/index.html
```

#### Better unit tests

But we haven't tested any characteristics of the component itself, so lets add more tests.

If we look at the coverage report for `Loader.tsx`, we can see that in the main entry point, the `render` method, some branches of the top level switch are not covered, and as a result some of the rendering methods are not covered either.

##### Covering branches

Many components present different behavior and interfaces based on the evaluation of props or state, rendering content in conditional statements like `switch`, `if`, and so forth.

One of the main tasks of writing unit tests is to ensure that all of those conditional code branches are covered by tests. This is typically done by creating one test per unique combination of prop values.

For component props with discrete, definite values, this is straightforward. In the Loader example, the component state is represented as a value of type `AppState` which is itself an enum. To provide coverage for the `switch` over app state in the Loader component, we just need to create one test per enum value.

There is a bit more to it than that. The change in prop value will change the rendered content, so we need to be able to test the specific content rendered.

Props with continuous values will require a different treatment, and how to test with them is somewhat specific to how they are used. A prop value with a restricted range (e.g. age, which is between say 0 and 200) can be tested for at the lower bound, upper bound, and in the middle. For testing error conditions you would also want to test below and above the bounds.

##### Covering different rendered markup

There are two basic approaches to testing rendered content.

First we need to ensure that we can deterministically find the content in the rendered DOM. We do this by creating "testhooks". These are specially formatted `data-` attributes which we set up in our rendering methods and which we access in our tests in DOM selectors. Often folks will use class names or ids to locate rendered DOM elements, but these each present problems.

Classes are problematic because their primary usage is for styling. Changing the styling should not (necessarily, unless that is what one is testing!) affect the testing of basic DOM structure and the presence of required elements.

IDs are a problem for an unusual reason. By definition, each id value within a document needs to be unique. However, when developers manually create ids on elements they often create duplicates. Duplicate ids is a violation of the DOM, but most browsers will not trigger an error, rather they return a collection of elements with e.g. querySelectAll. Given this uncertainty, it is best to avoid them for tests, unless it is well established that they are unique.

The testhook is an attribute in the format `data-k-b-testhook-TYPE="VALUE"`, where

- `data-` is the standard html5 prefix for user defined attributes, `k-b` is simply a name spacing for `KBase`,
- `testhook` is the what we use for all test hooks,
- `TYPE` varies by the primary type of element the attribute is attached to, and -`"VALUE"` is used to identify the testbhook within its DOM scope.

Common types include `plugin`, `component`, `button`, `tab`, and so forth. For general elements like divs, `element` is fine. The reason to use the type in the attribute name is to provide multiple testing namespaces, which allows simpler attribute values, and reduces the chance of collision.

##### Covering states

[ to be done ]

##### Testing rendered component

[ to be done]

### Tips

#### Testing componentWillUnmount

To ensure that `componentWillUnmount` will be included in test coverage, you need to use `mount` and `unmount`, not `shallow`.

E.g.

```typescript
it("renders without crashing", () => {
  const channelId = null;
  const onAppStart = () => {
    return;
  };

  const rendered = mount(<KBaseIntegration channelId={channelId} onAppStart={onAppStart} />);
  rendered.unmount();
});
```

### Issues

#### Type-only files

Tests for type-only files do not report correctly, showing no coverage for functions, etc. since there are none. The bandaid for this is to add an exported dummy function and include it in the tests.

#### Antd with override

The `craco` CRA override library causes tests to fail if `antd` components are loaded like this:

```typescript
import { Button } from "antd";
```

`antd` imports should be of the form:

```typescript
import Button from "antd/lib/button";
```

This also has the benefit of reducing build size (since it only includes the button component in the build, whereas the first includes all of antd.)

It is a pain, though, because VSC will auto-import using the first form.a

Note that as of now (5/23/19) antd will soon be releasing an update which provides for smaller build sizes without having to use a specific import form like above.

## Integration Tests

[ to be done ]
