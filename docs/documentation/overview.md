---
---

## Repo

Repo level general documentation -- for app specific docs see "Narrative Documentation".

Repo documentation documents are:

- REAMD.md
- CONTRIBUTING.md
- LICENSE.md

### Refs

- [IBM repo guidelines](https://github.com/IBM-Cloud/repo-guidelines/blob/master/README.md)
- [Documenting your projects in GitHub](https://guides.github.com/features/wikis/)
- [Setting up a Repo for Contributions](https://help.github.com/en/articles/setting-up-your-project-for-healthy-contributions)
-

### Contribution Support

Github provides several features to help repo contributors regularize and encourage contributions.

Although these features are not as relevant to repos which are primarily (or de-facto **only**) KBase maintained, since the support is already present, we should utilize them as best we can.

GitHub provides a [resource page](https://help.github.com/en/articles/setting-up-your-project-for-healthy-contributions) which provides advice and documentation.

#### Required Documents

These documents provide context for and imbue confidence to potential or actual contributors as well as perusers of the repo.

- README.md
- LICENSE.md
- CODE_OF_CONDUCT.md
- CONTRIBUTING.md

##### The README File

The recommended template is based on [common-readme](https://github.com/noffle/common-readme) with some minor modifications.

- File is always named `README.md`
- **Title** as the first level header
- **One line description** as quoted text
- **Longer description**
- All sections below as second level header
- **Usage**: describe how to use it
- **Background**: (recommended) the plugin is probably the front end for an area of complex of KBase functionality, which should be the subject of the background.
- **API**: (optional) for a library, describe the api or link to the docs
- **Install**: (optional) if the repo has some installation aspect, describe or reference it here
- **Acknowlegements**: a list of major contributors to code, architectural design, and so forth; (optional) link to their GitHub profile or other home page.
- **See Also**: a list of related projects, linked.
- **License**: Will always be "SEE LICENSE IN LICENSE", since the KBase open source license is contained within the separate LICENSE file.

```markdown
# TITLE

> SINGLE SENTENCE

BRIEF DESCRIPTION

## Usage

HOW TO GET STARTED and USE IT

## Install

INSTALLATION OF DEPENDENCIES, THE THING ITSELF

## Background

HOW THIS FITS INTO KBASE

## API

IF IT IS A LIBRARY OR SERVICE

## Acknowledgments

- NAME - COMMENT

## See Also

- [TITLE](URL)

## License

SEE LICENSE IN LICENSE
```

###### Refs

- [Awesome README](https://github.com/matiassingers/awesome-readme) - collection links to examples, specs, articles, tools.

###### Tooling

- [common-readme](https://github.com/noffle/common-readme) - an effort to, er, create a standard readme

##### The LICENSE File

All KBase repos must provide the KBase open source license. It is reproduced below. The only think you may change about it is the date, which should reflect the current year.

The license file must be in a file named `LICENSE.md`. (No markdown is used, but this makes it consistent with README.md and CONTRIBUTING.md.)

```markdown
Copyright (c) 2019 The KBase Project and its Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this  
software and associated documentation files (the "Software"), to deal in the Software  
without restriction, including without limitation the rights to use, copy, modify, merge,  
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons  
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or  
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR  
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE  
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR  
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER  
DEALINGS IN THE SOFTWARE.
```

##### CODE_OF_CONDUCT.md

[ to be done ]

##### CONTRIBUTING.md

[ to be done ]

#### Required Templates

Github supports templates for pull requests and issue submission. We do utilize PRs extensively, althought we do not utilize GitHub issues (yet). Still, it is a good idea to create these templates (examples provided) in order to provide a consistent experience for GitHub users of our repos.

- .github - ISSUE_TEMPLATE - bug_report.md - feature_request.md - question.md - PULL_REQUEST_TEMPLATE - pull_request.md

##### ISSUE_TEMPLATE

[ to be done ]

##### PULL_REQUEST_TEMPLATE

[ to be done ]

## Wiki

We need a wiki or wiki-like service in which to manage our documentation like this document itself.
[ to be done ]

## Code comments

### For document generation

Code documentation takes several forms and serves several purposes. Code comments intended to appear in generated documentation (which is publicly viewable) should be used to explain the purpose of files, functions, types, and classes.

Documentation in the form

```typescript
/**
 * my comment
 */
```

will be included in generated documentation. Such comments should adhere to the TSDoc and TypeDoc format.

Note that typescript comments do not need to describe types since this documentation is automatically generated from the the TS type assertions (and inference as well.)

#### Refs

- [TSDoc](https://github.com/Microsoft/tsdoc)
- [TypeDoc](https://typedoc.org) - for general code
- [API Extractor](https://www.npmjs.com/package/@microsoft/api-extractor) - for libraries

#### Tips

##### File Comment may not be generated

A file comment (the initial comment at the top of the file) will not be included in the generated documentation if it is followed by any code line not preceded by it's own comment. This is often triggered by import statements following the file comment.

The fix is to add a comment block just prior to the first import. E.g.

```typescript
/**
 * my file level comment
 */

/** imports */
// my imports
import Foo from "bar";
```

#### Where to add code generation comments

##### Comment at the top of each file

Every code file, be it `.ts`, `.tsx`, or `.js` must have a comment at the top of the file. The purpose of this comment is primarily to explain the purpose of the file. The KBase coding standards state that we try to follow the single responsibility principle. Thus, a file should serve one primary purpose which can be explained in the top level comment.

###### Required Elements

- single sentence summary of the file
- followed by whatever narrative explanation is necessary

###### Example

```typescript
```

##### All top level file objects are documented

The top level of a file is littered with type definitions, functions, and classes. Every top level statement needs to have an accompanying comment, as described below.

In addition, some types of top level statements require internal documentation.

##### Comment functions

A function needs:

- single sentence description
- @remarks - (optional) detailed description
- @param - one param description for each parameter
- @returns - describe the return value, if any
- @todo - describe any code issues which should be resolved eventually

> Remember - this isn't javascript, so @param and @returns should not embed type information

##### Comment types (type, interface, class)

All types require documentation. For simple types, this may just be a line line description. For more complex types, like interfaces and classes, the constituent properties and methods also need documentation immediately preceding them.

##### Comment methods

As mentioned above, a class' methods need to be documented.

##### Comment algorithms, etc.

If the code is doing a complex algorithm or set of operations that may be difficult to follow, long, or unique, a comment block should be inserted above this code. This explanation may be appropriate at the file level, the function or method. In some cases this information is not appropriate for publication (it may simply be related to coding mechanics), in which case it should be written as inline code comments, which will not be published.

#### Code Classes

Should we have one size fits all document generation, or use different tools for different types of code (at the repo level, not within a single codebase)?

E.g. api-extractor is oriented to api generation, whereas typedoc is more generically oriented to any TS code.

- App
- Components
- Library (api)
- Service Client (api>

#### Generating Docs

We use [TypeDoc](https://typedoc.org)

TypeDoc may be installed easily into the project. We will install it, in the react app directory `src/react-app`. This is because the tool needs access to the installed modules

```bash
npm install --save-dev typedoc
```

The project documentation can be generated by this CLI invocation from within the react-app

```bash
./node_modules/.bin/typedoc --out ../../docs/tsdocs --exclude "**/*.test.*" ./src
```

or from the repo:

#### Deploying Docs

## For reading code

Inline comments of the form

```typescript
// this is my comment
```

are not included generated documentation. They should be used to explain unusual usages, workarounds, etc.

## Narrative Documentation

This section covers documentation in the `/docs` folder; typically used for installation, building, etc. Not always required.

## Automation

This section covers automation tools, including:

- eslint and prettier during development to enforce doc standards
- deploying generated docs during build
- tool to analyze codebase for areas where documentation is lacking

## notes/tool for hierarchy of components

We should find tools to help with documentation the component hierarchy. E.g. generate a tree/graph of components, provide react-specific navigation in VSC.
