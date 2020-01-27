# Wait

A wait task combines navigation with an assertion about the result of the navigation. A wait task combines three goals:

- navigate to a node(s)
- test an assertion about that node(s)
- fail if that goal is not achieved within a time limit

A wait task is signaled by the `wait` property existing on the task. The value of the wait property indicates what type of assertion has been made. An assertion may support or require arguments.

The underling implementation will poll for the given assertion on the given navigation path. The tasks succeeds if the assertion succeeds within the time limit, which defaults to 10 seconds but may be overridden; otherwise, the task fails.

## the assertions

### `forElement`

The wait _forElement_ assertion will succeed when the node specified by the navigation path exists.

#### example

```yaml
- wait: forElement
```

### `forText`

The wait _forText_ assertion will succeed when the node specified by the navigation path is found to have the text provided by the `text` parameter.

#### params

- `text` - a string which is matched exactly against the node text value

#### example

```yaml
- wait: forText
  params:
    text: my test text
```

### `forTextMatch`

The wait _forTextMatch_ assertion will succeed when the node specified by the navigation path is found to have the text matching the regular expression provided by the `text` parameter.

An invalid regular expression will also cause the test to fail.

#### params

- `regexp` - a valid Javascript regular expression, acceptable to the [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor
- `flags` - a valid _flags_ string, acceptable to the [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor

#### example

```yaml
- wait: forTextRegex
  params:
    regexp: ^mr
    flags: i
```

### `forNumber`

The _`wait: forNumber`_ assertion will succeed when the text value for the specified node can be coerced to a number as conducted by the [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) constructor.

The assertion will fail if the text value of the node cannot be converted to a number (either throws exception or [`Number.isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) returns true.)

#### params

- `number` - either a simple number or a numeric comparison expression

A numeric comparison expression is an object with any of the following properties:

- `gt`
  - also `greaterThan`
- `gte`
  - also `greaterThanOrEqual`
- `lt`
  - also `lessThan`
- `lte`
  - also `lessThanOrEqual`
- `equal`
  - also `equals`

The value of each of these comparison operators is some number

If multiple comparisons are provided, they are `and`ed together.

#### example

```yaml
-   wait: forNumber
    title: Check that the reference data tab result count is rendered
    selector:
        - type: component
          value: tabset
        - type: tab
          value: reference-data
        - type: component
          value: tab-total-count
    number:
        greaterThan: 0
```

### `forElementCount`

The _`wait: forElementCount`_ assertion tests that the number of elements matching the navigation path. The `count` parameter provides a numeric comparison (same as the `number` parameter for `forNumber`).

#### parameters

- `count` - a numeric comparison as described above for `wait: forNumber`.

#### example

The following test case task, taken from the `mainwindow` plugin ensures that an unauthenticated kbase-ui shows only one sidebar nav item.

```yaml
-   wait: forElementCount
    selector:
        - type: element
          value: menu-items
        - type: element
          value: menu-item
    count:
        equal: 1
```

## `selector`

The _selector_ parameter provides the DOM selector path to the DOM node of interest.

Selectors are discussed in detail in the [test scripts](./4-test-scripts#selectors) chapter.


## `timeout`

A wait task will keep trying an assertion until it either succeeds or a time limit has been exceeded. The time limit defaults to 10 seconds, but can be overridden with the `timeout` parameter.


#### parameters

- `timeout` - a timeout duration in milliseconds.


#### example

This `wait: forText` task tests that the node with the `data-element` attribute with a value of "title" (equivalent to the selector `[data-element="title"]`) has the value "Bulk Import - DEPRECATED" within 5 seconds.

```yaml
-   wait: forText
    timeout: 5000
    text: Bulk Import - DEPRECATED
    selector:
        - type: raw
          name: data-element
          value: title
```

[7. Test Data](./7-test-data)
