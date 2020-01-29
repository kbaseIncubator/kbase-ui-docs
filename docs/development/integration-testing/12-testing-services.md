# Testing Services

In addition to running integration tests locally, we can, should, and must run them against a testing service.

## What is a testing service?

For our purposes, a testing service is a web service which offers a webdriver server endpoint. 

## Why?

A testing service can offer testing against all major browsers and platforms, including multiple recent versions. Testing services also offer handy features like testing logs, browser error logs, screenshots of errors, and even screen capture videos. They can also be run from any desktop and even from travis, with little to no configuration. They can be run against deployed instances of kbase-ui, or an instance spun up locally.

Its not all roses, though. Integration tests against remote services are slower (3-5x in my experience). They also tend to fail incorrectly more frequently, due to higher and unpredictable latency between the test runner (local), service (remote), and kbase-ui instance (remote). Some testing services simply don't work well enough, or well enough with our test stack (webdriver).

## Which Service?

We've casually evaluated some top services and, for now, have chosen [testingbot](https://testingbot.com).

### saucelabs

Our initial work with testing services was with saucelabs. We chose saucelabs because it was natively supported by travis ci. However, it proved to be quite unreliable (false negatives) and we didn't pursue it further.

In recent releases (as of 1/28/20) webriver compatibility has failed, so it is off the table.

### browserstack

At present (as of 1/28/20), browserstack is quite unreliable.

### testingbot

Although sporting the quirkiest name of the bunch, testingbot has proven to be quite reliable. It too can suffer from false negatives, but much less frequently than browserstack.

## Using

Switching to a testing service from local testing is trivial.

Instead of 

```text
make integration-tests
```

do this

```text
make integration-tests service=testingbot user=USER_ID key=API_KEY
```

What is this `USER_ID` and `API_KEY`?

Running integration tests against a testing service requires API credentials. These credentials consist of a user (account) id and an api key which are provided with an account at the testing service.

This information will be recorded in the [UI Development Playbook](https://docs.google.com/document/d/1SbWTH00TDWuZ5JKclZkEohJxR-digmgkAWE0Gh7uhZw).

FIN
