---
id: tips
title: Ant Design Tips
sidebar_label: Ant Design Tips
---

## Background

Reading list:

- ant design docs
- ant design principles

## Tips

### Table Row Keys

You must define a good `rowKey` for a table. The row key ensures that the table rows can be deterministically sorted. Duplicate row keys can lead to duplicate rows after a sort.

A suitable row key would be "guaranteed" to be unique. E.g. an incrementing integer or uuid. A JobID is a good row key for a table of jobs, or a username for a table of users.

Sometimes table value does not have a suitable unique rowKey. In such cases, you may be able to combine fields. E.g. in a table of app runs per user, neither the username nor the app id will be unique across the table. However, a combination of username and app id, joined by a character which does not occur in either, will be unique: "mmouse-module/app".

### Table Column Definition

Although antd allows you to define columns as an object and provide it as a prop to the table component, it also allows columns to be defined as sub-components. The latter is much easier to follow, although a bit odd because the column definitions are not actually displayed (other than as projections onto the column header and columns.

### Table Options Disabled by Default

Some table options are disabled by default. Generally this results in a simpler default table interface.

You should read the table component docs to become familiar with available options and whether you want to use them.

One commonly enabled option is the `pagination` prop's `showSizeChanger` property. When set to `true` a dropdown to change the page size is displayed next to the page navigation.
