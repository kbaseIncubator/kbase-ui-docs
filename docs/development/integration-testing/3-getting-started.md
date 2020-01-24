# Getting Started

You can run the integration tests from the basic kbase-ui development environment.

Before running the tests, you must:

- build and run kbase-ui
- edit the test config file

## Build kbase-ui

Although integration tests may be run against any live instance of kbase-ui (locally or remote), it is still necessary to have a local copy of kbase-ui built and run at least once. The kbase-ui build process gathers the tests together and arranges them with the test running javascripts. Running the container using the provided script maps the internal test directory into the local development directory `dev/test`.

```zsh
git clone https://github.com/kbase/kbase-ui
cd kbase-ui
make dev-start env=ci build=dev build-image=t
```

Note that we've started the ui container with the CI environment. If we want to test against the local kbase-ui, we can control which environment we are testing against by running kbase-ui against that environment and indicating that to the test script (more on that later.)

## Edit the test config file

The integration tests consult a single configuration file for information which cannot be included in the test scripts itself.

After building and running kbase-ui, a sample configuration file is placed at `dev/test/integration-tests/config.json`. Within this file you must replace token placeholders with the login token for the user `kbaseuitest` for each environment you wish to test against.

You'll need the Globus password for `kbaseuitest`. It is located in the UI Resource document in Google Drive. This document is restricted to current kbase-ui developers only. If you have questions, please ask them on the appropriate channels on KBase Slack (#ui or #kbase_coders are good choices).

Configuration values include core configuration like a user token, the associated username, and associated real name. At present, the only configuration value you need to replace is the `token` for each environment. This token can be obtained by logging into each environment as the user `kbaseuitest` and copying the value of the `kbase_session` cookie field. (E.g. in the browser javascript console, enter `document.cookie` to expose the current cookie.)

{% include_relative code-samples/config-template.md %}

## Running tests

In a separate terminal in the kbase-ui root directory, enter the following command:

```text
make integration-tests env=ci browser=chrome
```

or simple

```text
make integration-tests
```

to use the default env of `ci` and browser of `chrome`.

Available values for `env` are `ci`, `next`, `narrative-dev`, and `prod`; for `browser` are `chrome`, `firefox` and `safari`.

> NOTE: firefox and safari are currently not supported as their selenium drivers have test-stopping bugs.

> NOTE: Due to the variability in test response times, some tests may time out. If this occurs, run the tests one or more additional times until (and if) they succeed. Common conditions for timeout-based test failures are local machine load (the tests are fairly cpu-intensive), network congestion, kbase service latency, and kbase service maintenance.

As the tests are running, the selected browser will probably appear on your computer's display and you may witness the actions of the test scripts.

After a few moments, the tests will be finished and the results should be similar to what is shown below.

If any tests fail, the test case will indicate as such.

At the time of writing, the test result summary indicates the number of test javascript files which failed, but since we use yaml script files for test cases, and the javascript files don't contain tests but just execute the test scripts, this statistic is misleading.

{% include_relative code-samples/test-run-result.md %}

## Files

Below are directories and files involved in integration testing.

- `dev/test` - placeholder directory for integration test scripts, code, and configuration; this directory is populated when the ui is built; the files are overlaid from the container via a volume mount.
- `test/wdio.conf.integration.js` - webdriver io test configuration file
- `src/test` - location of script runner files, the configuration file, and canned subtasks; these  are copied into the kbase-ui image and subsequently made available locally through a volume mount at `/dev/test`.
- `tools/proxy/contents/ssl` - empty directory which is populated with `test.crt` and `test.key` when `make dev-cert` is run (and emptied by `make rm-dev-cert`).
- `src/client/plugins/PLUGIN/test` - location of internal plugin integration test scripts
- `kbase-ui-plugin-PLUGIN/src/plugin/test` - location of external plugin integration test scripts.
  - or `kbase-ui-plugin-PLUGIN/plugin/test` for newer CRA-TS plugins


[4. Test Scripts](./4-test-scripts)