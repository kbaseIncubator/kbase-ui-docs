# Actions

Actions are test case tasks which utilize the `action` property. Value values for the action property include:

- [`navigate`](#navigate)
- [`click`](#click)
- [`setSessionCookie`](#setSessionCookie)
- [`deleteSessionCookie`](#deleteSessionCookie)
- [`keys`](#keys)
- [`switchToFrame`](#switchToFrame)
- [`switchToParent`](#switchToParent)
- [`baseSelector`](#baseSelector)
- [`pause`](#pause)
- [`setValue`](#setValue)
- [`log`](#log)

Each action shares properties with other tasks, including:

- `title`
- `disabled`

Each action may take one or more named parameters. Parameters may be provided under the property `params` or directly in the task itself.

For example

```yaml
- action: navigate
  title: Navigate to the Search Plugin
  params:
    path: search
```

or

```yaml
- action: navigate
  title: Navigate to the Search Plugin
  path: search
```

are both equivalent forms.

The `params` form is preferred because it avoids property name collisions.
  
## `navigate`

Cause the given path to be set as the hash of the current url in the browser.

### params

`path` - the value for the hash; It is named _path_ because it becomes the navigation path in kbase-ui.

### example  

[ to be done ]

## `click`

Cause a click event to be simulated for the current node.

### params

none

### example  

[ to be done ]

## `setSessionCookie`

Set the token for the `kbase_session` cookie in the test browser.

### params

`token` - the value of the token set in the test configuration for the current environment.

### example  

[ to be done ]

## `deleteSessionCookie`

Remove the `kbase_session` cookie from the test browser.

### params

none

## `keys`

The `keys` action causes individual keystrokes to be sent to the browser. Keystrokes are those recognized are documented in the [webdriver docs](https://w3c.github.io/webdriver/#keyboard-actions).

Generally, keys are sensible -- alphabetic and numeric characters are entered by their associated letters, the enter key is "Enter", etc.

Modifier keys (Ctrl, Shift, Alt, Meta) will be "held" until the key is sent again.

Modifier keys are reset after a key action, and will not be continually held down.

### params

`keys` - a list of keys to be pressed (as defined in link above.)

### example

From the search tests:

```yaml
 - action: keys
   params:
        keys:
        - a
        - b
        - c
        - d
        - e
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - Enter
```

## `switchToFrame`

Causes the browser window context to switch to the specified iframe, which defaults to 0. Iframes are numbered in the browser, according to the order in which they were opened, starting at 0.

### params

- `frameNumber` - optional, defaults to 0

### example

From the _plugin_ predefined subtask.

```yaml
  - action: switchToFrame
```

## `switchToParent`

The converse of `switchToFrame`, this action causes the browser context to switch to the main browser window.

### params

none

### example

From the mainwindow plugin tests which uses this action to switch to the main ui window in order to click a menu item, and then dives back into the plugin iframe to test whether the correct plugin loaded.

```yaml
      - action: switchToParent
```

## `baseSelector`

The baseSelector action carries out the same function as the test-case level baseSelector. It sets the current baseSelector to the provided selector, so that all subsequent selectors include the baseSelector as a prefix.

### params

`selector` - The DOM selector which will form the base selector

### example

From the data search plugin:

```yaml
      - action: baseSelector
        selector:
          - type: plugin
            value: data-search
          - type: component
            value: main
```

## `pause`

Causes the test script tasks to pause for the specified amount of time, in milliseconds. This is an asynchronous action (on the browser side), so any events, timers, etc. on the browser will continue to run.

### params

`for` - the amount of time to pause for, in milliseconds. This param also accepts an object value, which can be used to supply a random value.

### example  

```yaml
      - action: pause
        for: 5000
```

```yaml
      - action: pause
        for:
          random: [0, 50]
```

## `setValue`

Sets the value for the DOM element specified by the current selector.

### params

`value` - a string value

### example  

no extant examples!

## `log`

Causes a log entry to be printed amongst the test runner output.

### params

`text`

### example  

no extant examples!

[6. Wait](./6-wait)