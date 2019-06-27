#### Directory layout

Redux does not require a specific location for files or any directory structure. However, redux does have a general architecture which can be used to guide the organization of code into files and directories. Several patterns have arisen out of the redux user community.

We have chosen a modified "rails style" layout. Common code organization strategies are [described in the redux documentation](https://redux.js.org/faq/code-structure#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go).

Our layout looks like:

- redux
  - actions.ts
  - reducers.ts
  - store.ts

This is "modified" compared to the one described by redux in that:

- A top level redux directory is used
- component organization is not included (component files live together)
- For a large app, each file within the top level `redux` directory may actually be a directory, with files assigned by a piece of the store. E.g. an app with multiple views may have an action and reducer file per view.
