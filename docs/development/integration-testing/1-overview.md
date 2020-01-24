# Overview

At present, the focus of testing in kbase-ui is integration testing. It gives us the most bang for the buck, exercising not just multiple libraries, but also plugins, configuration, and building too.

Generally, the integration tests work by controlling a browser to invoke urls, click on buttons, fill in inputs, and then observing the browser to make sure "the right thing happens". For example, a test can open a url to kbase-ui, navigate to search, enter a search, and inspect the search results, comparing what is found to what is expected.

## Status

The integration testing tools are under active development, but do provide a good enough coverage to satisfy our testing demands. Additional features can readily be added in kbase-ui (which is a topic for another document!)

> At present (1/7/20), Safari 13 (the current release) is broken with respect to webdriver - button and/or key presses don't work, and this breaks many of our tests. Firefox support is unreliable - selenium sometimes can't find the browser session (there may be a workaround, but haven't had time.)

[2. Setup](./2-setup)