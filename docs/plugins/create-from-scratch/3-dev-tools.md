---
---

# Step 3. Developer Tools



- vsc

KBase recommends and supports Visual Studio Code for front end development.

- eslint

[ to be written ]

- prettier

[ to be written ]

- Controlling commit spam with `.gitignore`

    Add a `.gitignore` file to the top level of the plugin repo, with the following content:

    ```gitignore
    .DS_Store
    node_modules/

    # The build plugin goes here. We don't want to check it it from 
    # a developer session, but we do like to keep the directory in the repo,
    # thus the placeholder README file.
    /plugin/iframe_root/*
    !/plugin/iframe_root/README.md 

    # created by npm if install with --no-cache option
    false

    _site
    ```


## Next Steps

[Step 4. Say Hello](./4-say-hello)

\---