# Development

Development of the kbase-ui integration test runner is fairly straightforward.

First we'll lay out the various files and their purposes.

Then we'll discuss the various dependencies and references for the underlying test stack.

## Execution of Integration Tests

Integration tests are invoked via a simple Makefile task. Setup and a sample test session are provided in the [Getting Started](./3-getting-started) chapter.

Within the kbase-ui repo directory, after having built and run kbase-ui at least once:

```text
make integration-tests
```

is the simplest invocation of integration tests.

The full form is

```text
make integration-tests env=ENV browser=BROWSER
``` 

where `ENV` is one of `ci`, `next`, `narrative-dev` or `prod`; and `BROWSER` is one of `chrome`, `firefox`, or `safari`.

> Note that `firefox` and `safari` are not currently working, due to incompatibilities with their respective selenium drivers.

## Test Runner Files

The sources for integration testing include:

- 

[ to be written ]

[12. Testing Services](./12-testing-services)