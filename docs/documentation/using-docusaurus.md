---
---

We use [Docusaurus](https://docusaurus.io) for creating high level, cross-repo documentation. Docusaurus works by generating a small web site out of the source material - markdown, images, html, configuration. It contains built-in support for publication through github.io, which we utilize.

## Starting a Docusaurus documentation project

to be done

## Working on an existing Docusaurus documentation project

- fork the repo
- clone your fork
- start live preview
- edit and watch the changes
- commit, push to your fork
- issue PR

## Live Preview

Like many modern npm based workflows, Docusaurus provides a live development server which rebuilds the documentation and refreshes the browser view when files are updated

```bash
cd website
npm run start
```

> Note: Some changes do not result in a rebuild and reload. E.g. changing dependencies, changing configuration.

## Publishing

Documentation publication is automated. A commit to the master branch of the documentation repo (e.g. https://github.com/kbase/kbase-ui-docs) will trigger a documentation build and publication via travis.

The process is described by https://docusaurus.io/docs/en/next/publishing#using-travis-ci.

The documentation will be published at a url like: `https://kbase.github.io/THE_REPO`.

### How it Works

Docusaurus includes a script, `publish-gh-pages`, designed specifically to build and publish a documentation project (repo).

The automation of the build and deployment is conducted by Travis CI. This is enabled by the usage of a github personal authorization token and travis environment variables.

The Docusaurus script `publish-gh-pages` takes care of building the docs, copying them into a `gh-pages` branch of the same repo, and committing and pushing up those changes.

### How To

#### Documentation Editing

- fork the documentation repo
- clone the repo and make your changes locally to the master branch
- review your changes using the live preview tool by running `npm run start` in the `website` directory.
- when completed, commit your changes, push to your repo, and issue a Pull Request to the upstream kbase repo.

#### Documentation Publication

- review a documentation update PR
  - install locally, ensure it builds, and review the rendered changes
- when it passes muster, accept and merge the PR
- the documentation should build automatically

### Notes

The upstream document for travis setup https://docusaurus.io/docs/en/next/publishing#using-travis-ci may be slightly out of sync with the github or travis ui layouts. It should not be hard to figure out, though.

#### Bootstrapping a doc project

You can get started a bit more quickly with a new Docusaurus project by publishing directly from your workstation:

```bash
GIT_USER=your_git_username USE_SSH=true npm run publish-gh-pages
```

This assumes you authenticate with github via ssh.
