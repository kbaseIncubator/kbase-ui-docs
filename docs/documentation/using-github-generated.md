---
id: using-github-generated
title: Using Github Generated Docs
sidebar_label: Using Github Generated Docs
---

Using github generated markdown documentation thanks to Jekyll.

Any KBase github repo can generate documentation from markdown using an interesting but limited integration of Jeckyl provided by github.

With github pages integration enabled for your repo (you must be a repo owner to access the repo configuration), github will build and publish your documentation as a Jekyll project whenever there is a merge into the master branch.

The documentation can be provided in two different ways. Which one to use depends on the workflow for the repo.

For repos which operate solely on the master branch, such as kbase-ui plugins, the `/docs` method should be used. In this method, the documentation source (markdown files and jekyll configuration) is stored in the `/docs` folder. The documentation will be compiled and published whenever you push a commit to the repo at github.

For repos which operate with a develop / master branch, such as kbase-ui and most other kbase repos, the `gh-pages` method should be used. In this method, the documentation source is stored in a branch named, you guessed it, `gh-pages`. Within `gh-pages` you should maintain two sets of documentation, one for the `master` branch and one for the `develop` branch. More branches could be supported if necessary. For instance, if a feature branch is being worked on with additional documentation, it may be appropriate to fork the documentation into a new directory in order to avoid confusion with the master and develop documentation.

## Docs Method

### Create `/docs` directory in your repo

We utilize the `/docs` github pages workflow because it is more straightforward. In this workflow, all of your documentation will reside in the top level folder `/docs`.

### Create Initial Docs Files

Every docs folder should have a default index page. This page is displayed when the url for the docs site is specified without a target page.

E.g. `https://kbase.github.io/kbase-ui-lib`

- in the `/docs` folder create a file named `index.md`.
- at the top of this file add the _frontmatter_

```yaml
---
permalink: /index.html
---

```

- Populate the page with whatever content you want to show by default for this repo.

> If you already have a `/docs` directory, you may want to move it aside for now; if it is populated with documentation you want to include in the generated docs, it is easier to add it back piecemeal.

### Create the Jekyll config file

Github pages uses Jekyll under the hood. The documentation can be built without configuration, but we need the configuration in order to use our theme. The default theme provides too little functionality (e.g. no table of contents). A set of "official" themes is available, as is a whole (small) world of Jekyll open source and paid themes. However, none of the (free) themes are suitable.

I found one theme, **Just the Docs**, which seems to fit the bill. It has a sidebar table of contents with collapsible navigation, search, and some other minor goodies like top-navigation links.

However, this theme fails in a few areas -- enough that it was worth forking the theme so that we can make a few relatively minor changes related to styling (so far).

So, without further ado:

1. create the file `_config.yml` in the `/docs` directory.
2. add the content
   ```yaml
   title: { YOUR PROJECT }
   remote_theme: eapearson/just-the-docs
   search_enabled: true
   aux_links:
     "{YOUR PROJECT} on Github":
       - "//github.com/kbase/{YOUR REPO}"
     "About KBase":
       - "//kbase.us/about"
   ```
   where you should of course replace `{YOUR PROJECT}` with the title of your project, and `{YOUR REPO}` with your repo name.

### Commit, push / PR & merge

Before we can set up the automated documentation generation at github, the repo must already contain the /docs directory, so we need to commit the changes to the repo, and either push it up directly or push it to a fork, issue a pull request, and have that pull request merged.

### Set up the repo for github pages

At the github ui for your repo:

- click the **Settings** menu item
- towards the bottom of the page note a section "GitHub Pages"
- under **Source** select "master branch /docs folder"
- leave the theme alone, it is already specified in the Jekyll config file `_config.yml`.

### Visit the docs site

The docs will be automatically generated with every commit to the master branch of the repo. The generated docs will live at:

`https://kbase.github.io/repo-name`

where `repo-name` is the name of your repo.

### Adding additional pages

The **Just The Docs** theme supports two basic organization features.

#### Ordering

First, you can order the pages by adding **front matter** directives.

```yaml
---
title: { DOCUMENT PAGE TITLE }
nav_order: { ORDER }
---

```

where `{DOCUMENT PAGE TITLE}` is the title of your document as it should appear in the navigation, and `{ORDER}` is an integer determining the order of this document within the other documents.

#### Hierarchy

If you have a lot of documentation, say more than 10 pages, you may want to organize it into a hierarchy.

[ TO BE DONE ]

[ TO BE WRITTEN ]

## Theming

We don't (yet) have our own Jekyll Theme, but we do have a forked version of [Just The Docs](https://github.com/eapearson/just-the-docs). (We had to fork it to change some of the layout).

This theme

## Testing Locally

### Recipe

#### macOS

1. Ruby is built into macOS, and the version should be fine
   - to check just type `ruby --version` into Terminal; the version must be greater than 2.1
2. Install `Bundler`
   - From Terminal, enter `sudo gem install bundler`
3. Create github pages gemfile
   - In the `/docs` folder of your repo, create the file `Gemfile` with the following contents:
   ```ruby
   source 'https://rubygems.org'
   gem 'github-pages', group: :jekyll_plugins
   ```
4. Install the dependencies defined by this Gemfile
   - Open Terminal in the `/docs` directory where the Gemfile is located
   - Enter:
   ```bash
   bundle install
   ```
   - Enter your password (assuming you have an Admin account) when prompted.
5. Open your browser to `https://localhost:4000` to see the docs!

## Using the `gh-pages` method

The `gh-pages` method is a bit more complicated to set up, but necessary for projects with more than one active branch for which documentation needs to be available.

### For existing repo

- clone the upstream repo
  ```bash
  git clone https://github.com/kbase/YOUR_REPO
  ```
- enter the repo directory
  ```bash
  cd YOUR_REPO
  ```
- create a new gh-pages branch
  ```bash
  git checkout --orphan gh-pages
  ```
- remove all content

  ```bash
  git rm -rf .
  ```

- create an initial document
  ```bash
  echo "My first document" > index.md
  ```
- commit the first document
  ```bash
  git add .
  git commit -m "First document"
  ```
- push up to github
  ```bash
  git push origin gh-pages
  ```
  > It is interesting but a little weird that github will automatically reconfigure your repo to publish to github pages when you make your first commit to the gh-pages branch
- check out your new baby document at `https://YOUR_ACCOUNT.github.com/YOUR_REPO`, where `YOUR_ACCOUNT` is probably `kbase`, unless you are testing in your own repo first.

Note that you MUST perform this operation against the upstream repo, eventually. Github does not support merging a PR and creating a new branch created in the PR. However, pushing to the upstream repo directly from your machine will create the new branch you have created locally.

This is the only procedure for which you need to push directly to the upstream repo. All changes to the gh-pages branch documentation should be carried out through the normal PR workflow.

> Also, cool tip: You can set up github pages in your fork of a kbase repo. This allows you to preview changes through your own github pages (in addition to the local development workflow described in this document.)

### Set up the documentation structure

The steps above established the gh-pages based documentation with github. However, we cheated a bit and did not create the documentation structure we need. Let's do that now...

- create the following directories:
  - `master`
  - `develop`
- add an `index.md` file to each directory, with whatever content you wish (for now)
- in the original top level `index.md` file add links to these new documents, like:

  ```markdown
  # Documentation Index

  - [Master](./master)
  - [Develop](./develop)
  ```

- commit your changes and push them up to github
- it may take 10s of seconds for github to generate the pages from your documentation

### Add the theme

- add the Jekyll config file:
  ```bash
  touch _config.yml
  ```
- add the following to it:
  ```yaml
  title: { YOUR PROJECT }
  remote_theme: eapearson/just-the-docs
  search_enabled: false
  aux_links:
    "{YOUR PROJECT} on Github":
      - "//github.com/kbase/{YOUR REPO}"
    "About KBase":
      - "//kbase.us/about"
  ```
- update pages for navigation introduced by the theme

  - for the top level index page, add:

  ```yaml
  ```

- commit and push your changes up
- when your changes are merged at github you can preview them.

Okay, well, you will have noticed that it looks _different_, subjectively _better_, but what is going on? We've applied a theme that requires

INTERRUPTION - hmm, one workflow is to edit, commit, push to fork, wait 30 seconds, see results.
another requires setting up for local preview of github pages. The prior is slow if you have a lot of work to do, but super convenient if you don't. The latter takes a few minutes to set up, and is more likely to tread on unfamiliar territory, but results in a much quicker workflow when you have a lot of changes.

### Bonus: Clean up original branch

If you have copied documentation from the master branch, you can go ahead and remove the documentation from the master branch.

### Local Dev Support

#### macOS

1. Ruby is built into macOS; the installed version should be fine.
   - to be sure, just type `ruby --version` into Terminal; the version must be greater than 2.1
2. Install `Bundler`
   - Skip this if _bundler_ has already been installed
   - From Terminal, enter `sudo gem install bundler`
3. Create github pages Gemfile
   - In the root of your repo, create the file `Gemfile` with the following contents:
   ```ruby
   source 'https://rubygems.org'
   gem 'github-pages', group: :jekyll_plugins
   ```
4. Install the dependencies defined by this Gemfile
   - Open Terminal in the `/docs` directory where the Gemfile is located
   - Enter:
   ```bash
   bundle install
   ```
   - You may be asked to enter your password (assuming you have an Admin account); do so when prompted.
5. Start the jekyll local compiler and server:
   ```bash
   bundle exec jekyll serve
   ```
6. Open your browser to `https://localhost:4000` to see the docs!

## References

- [Github Pages Docs](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch)
- [local install of Jeckly to test documentation](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll)
- [adding a theme](https://help.github.com/en/articles/adding-a-jekyll-theme-to-your-github-pages-site-with-the-jekyll-theme-chooser)
