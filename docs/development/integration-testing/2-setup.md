# Requirements and Setup

## Prerequisites

To get the most out of this document, you should be familiar with setting up kbase-ui locally for development and/or previewing. See [Getting Started](../dev/getting-started.md).

The integration tests require that an instance of kbase-ui be available at at a `HOST.kbase.us` host (where `HOST`is typically ci, next, appdev, narrative). 

## Testing Stack

The integration testing utilizes Selenium, WebdriverIO, Firefox, Chrome, and Safari browsers, and our own integration library. Since most user functionality in the UI is provided through plugins, most integration tests reside in plugins as well. Each plugin should contain a testing folder `plugin/test` (wherever the plugin folder is located). This folder contains one or more json or yaml files (yaml preferred). Each of these files defines one or more tests. We call these "integration test scripts". (scripts as in "screenplay".)

During the kbase-ui build, all of the plugin testing scripts are placed into a single folder `dev/test/integration-tests/specs/plugins`. Also during the build, all of the tools required for integration testing are placed in `dev/test/integration-tests/specs`. In addition, various development javascript dependencies are installed locally during the kbase-ui build. This means that you need to conduct a local build to use the integration tests, even if you are testing against a remote instance.

Upon invoking the integration tests, all of the test scripts are run, and the results printed to the console. When invoking the tests, you can specify the deployment environment (ci, next, prod, narrative-dev) and the browser (chrome, firefox, safari). Without specifying these, the defaults are ci and chrome.

For example

```text
make integration-tests env=ci browser=chrome
```

will run the integration tests against ci with the chrome web browser.

It is even possible to run the tests against a testing service like Sauce Labs, which can test against multiple browser models and versions and on multiple operating systems. We do not currently run integration tests through a testing service, but we did conduct a successful evaluation which proved to us that it was achievable but not at the time practical -- too many issues with connectivity to the testing service resulted in too many false negatives.


[3. Getting Started](./3-getting-started)