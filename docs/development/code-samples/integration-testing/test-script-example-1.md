```yaml
---
description: Accessing data search without authentication
specs:
  - description: should get the signin page
    tasks:
    - action: navigate
      path: search
    - subtask: plugin
    - wait: forText
      selector:
        - type: plugin
          value: auth2-client
        - type: component
          value: login-view
        - type: field
          value: requested-path
      text: search
```