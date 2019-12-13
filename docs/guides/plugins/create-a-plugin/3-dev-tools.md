# Step 3. Developer Tools



- vsc

KBase recommends and supports Visual Studio Code for front end development.

If you are using VSC:

  1. create a `.vscode` directory at the top level of your project

        ```bash
        mkdir .vscode
        ```

  2. Add a file `formatter.json` with the following content:

        ```json
        {
            "onSave": true,
            "javascript": {
                "indent_size": 4,
                "indent_char": " ",
                "eol": "auto",
                "preserve_newlines": true,
                "break_chained_methods": false,
                "max_preserve_newlines": 0,
                "space_in_paren": false,
                "space_in_empty_paren": false,
                "jslint_happy": true,
                "space_after_anon_function": true,
                "keep_array_indentation": false,
                "space_before_conditional": true,
                "unescape_strings": false,
                "wrap_line_length": 0,
                "e4x": false,
                "end_with_newline": false,
                "comma_first": false,
                "brace_style": "collapse-preserve-inline"
            },
            "css": {
                "indent_size": 4,
                "indentCharacter": " ",
                "indent_char": " ",
                "selector_separator_newline": true,
                "end_with_newline": false,
                "newline_between_rules": true,
                "eol": "\n"
            },
            "html": {
                "indent_inner_html": false,
                "indent_size": 4,
                "indent_char": " ",
                "indent_character": " "
            }
        }
        ```

- eslint

    > I don't think we'll need direct eslint support for TS projects, no?

- prettier

    The *prettier* plugin provides great support for formatting TypeScript, CSS, and Javascript. It also integrates very neatly into eslint.

    We just add a few tweaks to the standard VSC project settings file `settings.json`, also in the `.vscode` directory:

    ```json
    {
        "prettier.arrowParens": "always",
        "prettier.eslintIntegration": true,
        "prettier.printWidth": 120,
        "prettier.singleQuote": true,
        "prettier.tabWidth": 4,
        "editor.detectIndentation": false
    }
    ```

- Controlling commit spam with `.gitignore`

    Add a `.gitignore` file to the top level of the plugin repo, with the following content:

    ```
    .DS_Store
    node_modules/

    # The built plugin goes here.
    /plugin/iframe_root/

    # created by npm if install with --no-cache option
    false

    _site
    ```


## Next Steps

[Step 4. Say Hello](./4-say-hello)

\---