```text
erikpearson@Eriks-MBP-2 kbase-ui % make integration-tests
ENV=ci BROWSER=chrome ./node_modules/.bin/grunt integration-tests --env=ci
Running "webdriver:integration" (webdriver) task
TEST ENV        : ci
TEST HOST PREFIX: ci
TEST BROWSER    : chrome

Execution of 4 spec files started at 2020-01-23T18:31:42.218Z

[0-0] TEST ENV        : ci
[0-0] TEST HOST PREFIX: ci
TEST BROWSER    : chrome
[0-0] RUNNING in chrome - /dev/test/integration-tests/specs/merger.js
[0-0] PASSED in chrome - /dev/test/integration-tests/specs/merger.js
[0-1] TEST ENV        : ci
[0-1] TEST HOST PREFIX: ci
[0-1] TEST BROWSER    : chrome
[0-1] RUNNING in chrome - /dev/test/integration-tests/specs/runner.js
[0-1] PASSED in chrome - /dev/test/integration-tests/specs/runner.js
[0-2] TEST ENV        : ci
[0-2] TEST HOST PREFIX: ci
[0-2] TEST BROWSER    : chrome
[0-2] RUNNING in chrome - /dev/test/integration-tests/specs/theSpec.js
[0-2] PASSED in chrome - /dev/test/integration-tests/specs/theSpec.js
[0-3] TEST ENV        : ci
[0-3] TEST HOST PREFIX: ci
[0-3] TEST BROWSER    : chrome
[0-3] RUNNING in chrome - /dev/test/integration-tests/specs/utils.js
[0-3] PASSED in chrome - /dev/test/integration-tests/specs/utils.js

 "dot" Reporter:
..................................

 "spec" Reporter:
------------------------------------------------------------------
[chrome 79.0.3945.130 Mac OS X #0-2] Spec: /Users/erikpearson/work/kbase/sprints/2019/q3/s4/deploy-refactored-ui/kbase-ui/dev/test/integration-tests/specs/theSpec.js
[chrome 79.0.3945.130 Mac OS X #0-2] Running: chrome (v79.0.3945.130) on Mac OS X
[chrome 79.0.3945.130 Mac OS X #0-2] Session ID: a4585417f26f563fd0e1312a4d3bad6d
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] About panel
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ View the about panel directly
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Access the login buttons
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should work
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Ensure main view appears
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should have main panel framing appear when hit the path
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Unauthenticated
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Ensure the main view loads
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ Navigate to catalog main view
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Unauthenticated
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the main view even without auth
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Dashboard with authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ Dashboard should appear when the route is navigated to
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Unauthenticated
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Ensure main view appears
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ Should have main panel framing appear when hit the path
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing data search without authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] No search in place
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should show the no-search alert on each tab
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Searching for something which doesn't exist
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should show a not-found message
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Search for 'sphaeroides''
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should  should reveal 1 or more hits for each tab
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing a media object while authenticated
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ case 1: media object should be displayed
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing feeds with authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should show the feeds main view with a global feed menu item
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing feeds without authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Ensure main view appears
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should have main panel framing appear when hit the path
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing jgi-search without authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing the job browser with authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should show the primary widget
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing the job browser with authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page with the jobbrowser path displayed
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Login plugin - authorized
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Login plugin - unauthorized
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Sidebar nav
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ It should be there
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Sidebar Nav Navigation Tests without Authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ Navigation between items should ... work
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Sidebar Nav Navigation Tests without Authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ Navigation between items with multiple clicks should result in just one instance of a plugin
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Sidebar Nav Navigation Tests without Authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ There should be 7 sidebar items after login
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Sidebar Nav Navigation Tests without Authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ There should be just one sidebar nav item
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Sidebar Nav Navigation Tests
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ It should be there
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Ensure main view appears
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should have main panel framing appear when hit the path
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Unauthenticated
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Ensure main view appears
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should have main panel framing appear when hit the path
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Accessing orgs without authentication
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should get the signin page
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Ensure main view appears
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓ should have main panel framing appear when hit the path
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] Welcome plugin
[chrome 79.0.3945.130 Mac OS X #0-2]    ✓
[chrome 79.0.3945.130 Mac OS X #0-2]
[chrome 79.0.3945.130 Mac OS X #0-2] 34 passing (1m 31.9s)


Spec Files:	 4 passed, 4 total (100% completed) in 00:01:39


Done.
```