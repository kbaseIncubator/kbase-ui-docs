# Step 9: Add Testing

Testing is a required aspect of the front end development workflow. In ui development we utilize both *unit* and *integration* tests.

Unit tests are typically restricted to testing one component, file, or namespace in isolation. Unit testing does not typically require very much setup, and does not require a browser. Unit tests are quick to run, and may be run throughout the development day.

Integration tests, on the other hand, typically test visible aspects of the interface as it operates in an actual web browser. These types of tests are much slower, and cannot practically be run multiple times per day. They are most often run prior to a release, against each deployment environment.


## Unit Tests

Unit testing is built into CRATS workflow with jest and support libraries. To make React Component unit testing even easier we utilize Enzyme with jest.

1. Install Enzyme

    ```bash
    npm install --save enzyme enzyme-adapter-react-16 react-test-renderer @types/enzyme @types/enzyme-adapter-react-16
    ```

2. Tweak the test configuration in package.json:

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

3. Add a unit test file `View.test.tsx` for `View.tsx`, in the same directory.

    When creating a test for a component one typically starts with the bare minimum test to ensure that the test file works and the component can be loaded without error.

    Test files are created in the same directory as the file they are testing. They test file is named after the file it is testing, with the `.test` added before the `.tsx` or `.ts`.

    ```typescript
    // We need to import React, even though we don't explicity use it, because
    // it's presence is required for JSX transpilation (the React object is
    // used in the transpiled code)
    import React from "react";

    // Enzyme needs

    import { configure, shallow, render, mount } from "enzyme";
    import Adapter from "enzyme-adapter-react-16";

    // We always need to import the component we are testing
    import View from "./View";

    configure({ adapter: new Adapter() });

    it("renders without crashing", () => {
    const setTitle = (title: string) => {
        return;
    };
    shallow(<View setTitle={setTitle} />);
    });
    ```

4. Tests are run from the `react-app` directory like so:

    ```bash
    npm run test
    ```

5. Test coverage is run similarly:

    ```bash
    npm run test -- --coverage --watchAll=false
    ```

    > Note that the `--watchAll=false` option, which disables the auto-running of tests when source code changes, is currently required due to a bug recently introduced to jest. Running coverage tests with auto running is perhaps not too useful -- when refining coverage tests. Rather, reloading coverage reports per file is more useful.

6. An html report is also produced in `react-app/coverage/lcov-report/index.html`

## Integration Tests

[ to be written ]

## Next Step

[Step 10. Add Documentation](./10-add-documentation)

\---
