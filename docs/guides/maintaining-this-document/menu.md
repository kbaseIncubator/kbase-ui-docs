---
---

# Menu

The menu is stored in the standard Jekyll yaml configuration file `_config.yml` located in the `docs` directory.

```yaml
navigation:
  menu:
    - label: Overview
    - label: About
      menu:
        - label: History
        - label: Current Interfaces
        - label: Evolution
        - label: Layout
        - label: Architecture
        - label: Development
        - label: Deployment
    - label: Getting Started!
      slug: getting-started
      menu:
        - label: Prerequisites
        - label: Quick Start
```

In the example above, note that the `Overview` menu item matches the associated documentation file `overview.md`. This illustrates that:

- menu items with no children ("leaves" of the menu tree) are associated with markdown documents.
- this menu labels was transformed to the associated file name by converting it to lower case and appending `.md`.

The `About` menu does have a sub menu, under the `menu` property. As a menu item with a submenu, the `About` label actually matches the directory named `about`. When clicking on a menu item with a submenu, the user experiences two changes:

- The submenu opens up (and any open menu is closed)
- a document named `index.md` within the menu's directory is displayed.

In this case the document is `about/index.md`.

Within the submenu, notice that the `Current Interfaces` menu item contains a space. How does that map to a document file? If a menu label contains a space, the space is converted to a dash when it is converted to a directory or filename.

Finally, note in the `Getting Started!` menu item the presence of another property, `slug`. The slug property defines the base name for associated directory or file name. Note that as a "base name", it does not specify the `.md` extension for leaf menu items.

In most cases the slug is not necessary because, if it is missing, the slug is obtained by transforming the label. In this case, the slug is used because the label contains a special character `!` and the associated file name does not. We could have placed the `!` on the file name, but this is a rather unusual file name, and in this case we prefer not to do that. We prefer to keep the weirdness in the menu definition!