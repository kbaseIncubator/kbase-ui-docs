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

- Visual Studio Code (VSC) configuration

    The files stored in the `.vscode` directory control the behavior of Visual Studio Code. Many if not all of the settings can also be applied through the VSC settings ui, but that is very hard to document!

    These settings are primarily to ensure consistent formatting, but also help with IDE behavior. For instance, the `onSave` setting in `formatter.json` ensures that formatting is applied whenever a file is saved, which prevents us from forgetting to apply the formatting rules. 

    Another example is thhe `editor.detectIndentation` setting in `settings.json`. VSC may ignore the tab width setting if it detects that a different tab width is used in the file. This defeats the purpose of standard formatting rules!!

    We will surely be updating these settings as time goes on. We need to figure out a method of ensuring that devs have access to the most recent settings files.

    Overall, the purpose of insisting on these settings is both to provide a consistent experience for coders, especially when they take up a new codebase, and to avoid commit spam due to differences in formatting between developers.

  - create the directory `.vscode` at the top level of the repo

    ```bash
    mkdir .vscode
    ```

  - create the file `settings.json` in the `.vscode` directory with the following content:

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

  - create the file `formatter.json` in the `.vscode` directory with the following content:

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

- Controlling commit spam with `.gitignore`

    Add a `.gitignore` file to the top level of the plugin repo, with the following content:


    ```gitignore
    # macOS
    .DS_Store
    node_modules/

    # The built plugin app goes here during a top level build; we don't want to check
    # that is as it is build during install in kbase-ui
    /plugin/iframe_root

    # created by npm if install with --no-cache option
    false

    # created by yarn, but causes problems with kbase-ui builds.
    yarn.lock

    # Artifact of local github pages development
    _site

    # Don't check in coverage reports
    coverage

    # Put stuff in _trash to move it out of the way, and omit it from the repo 
    # (but keep it locally to support procrastination.)
    _trash
    ```

## Next Steps

[Step 4. Say Hello](./4-say-hello)

\---