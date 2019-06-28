# Step 10: Add Documentation

Documentation other than the README.md resides in a top level `/docs` folder and is build and deployed automatically by Github through Github Pages.

1. Add `/docs` directory to the top level of the plugin repo

    ```bash
    mkdir docs
    ```

2. Add a new file `index.md` in the `docs` directory, with the following content:

    ```markdown
    # My Great Plugin
    ```

3. Add a new file `overview.md` in the `docs` directory, with the following content:

    ```markdown
    # Overview
    ```

4. Add a new file `_config.yml` to the `docs` directory, with the following content:

    ```yaml
    title: My Great Plugin
    remote_theme: kbaseIncubator/kbase-github-pages-theme
    search_enabled: false
    aux_links: 
        "My Great Plugin on Github":
            - "//github.com/kbase/kbase-ui-plugin-{PLUGIN}"
        "About KBase":
            - "//kbase.us/about"
    navigation:
        menu:
            - label: Overview
    ```

5. Add a new file `Gemfile` to the `docs` directory, with the following content:

    ```ruby
    source 'https://rubygems.org'
    gem 'github-pages', group: :jekyll_plugins
    gem 'kbase-github-pages-theme', git: 'https://github.com/eapearson/kbase-github-pages-theme'
    ```

6. Preview the docs:

    - install `ruby` or use the built-in one
      - > Note that it may be necessary to install ruby with macports or homebrew due to permissions issues adding gems to the stock ruby on macOS.
  
    - install `bundler` if it isn't already

        ```bash
        sudo gem install bundler
        ```

    - install the bundle; in a terminal session in the docs directory:

        ```bash
        bundle install
        ```

    - if all goes well, launch the local github pages server:

        ```bash
        bundle exec jekyll serve
        ```

6. Open your browser to `https://localhost:4000` to see the docs!

## Follow Up / See Also

- adding submenus
- the KBase Github Pages Theme

## Next Step

[Step 11. Fin](./11-fin)

\---
