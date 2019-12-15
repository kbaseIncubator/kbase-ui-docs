---
---


# Evolution of KBase UI 

This page discusses the evolution or history of *KBase UI*.

I hope that by an understanding of where *kbase-ui* has been, it will be easier to comprehend where it is now (next section - [architecture](./architecture)).

## In the beginning...

Originally KBase UI was concerned with two primary tasks - authentication (login and logout) and "landing pages". 

If you are carrying baggage from web development, the term "landing page" may seem a bit odd in the context of KBase. 

No, at KBase a landing page is not a marketing site or the destination of an advertising link, although it is conceptually related. Rather the KBase landing page was designed to visualize several types of objects within KBase:

- data objects
- types

The idea of a landing page is that you and it an identifier (an object id, a type id, a module id), and it will display information about that item, including tabular, descriptive, and visual information.

At that time, KBase UI was actually referred to as *ui-common*, a name which reflected the intention of the code to serve as a basis for ui development. It provided a common widget system, as well as a set of clients for accessing KBase services. In addition, by adding code to the ui-common runtime, or web app, it would inherit the characteristics of ui-common, including available third party libraries like jquery, and styling provided by Bootstrap and KBase custom styles.

*ui-common* was never, as far as I know, used as a common library, but rather as a runtime, which would provide a common look and feel and set of libraries to new interfaces added to it.

## Then there were plugins...

As part of a an effort to create a common api for accessing data objects (the "Data API"), new landing pages for data objects accessible via the Data API needed to be created and put into production. 

Due to the monolithic nature of the kbase-ui codebase, it was  difficult to efficiently develop significant amounts of new code. In addition, there were issues with the codebase related to program construction which made new development somewhat unreliable.

Therefore a ui test platform was created, enough to allow authentication and configuration to be made available to the newly developed landing pages.

Although this worked well, as the Data API project progressed, we were faced with the need to integrate that code back into *ui-common*.

Supporting a development testbed while also being able to expose the landing pages in a fully functioning web app proved to be a challenge.

The solution was to add a featured called *plugins*. A plugin adds functionality to the web app in a compartmentalized manner. A plugin would exist entirely in a distinct directory, and could be enabled or disabled in the web app with just a few lines of configuration (and a build).

A plugin could be internal, in which the code resided in the core kbase-ui repository, or external, in which the code resided in a separate repository at github.

(And yes, we are now using the term *kbase-ui*, because this testbed was what would become kbase-ui.)

## Proper modules, at least for the time

While working on the development testbed and adding plugin support, it was clear that the program construction used in ui-common was not adequate, both at runtime and build time (in fact, there was no build process.)

ui-common did not utilize a runtime module system. Rather, as was the style prior to the introduction of AMD around 2010 but quite prevalent for many years following, dependencies were simply copied into the codebase (with fingers crossed).

This made it very difficult to track down bugs, determine compatibility of libraries, and even to build the app at all, since updates to libraries involved finding a suitable source and simply downloading the necessary files.

Another issue with the lack of a module system was that all javscript files were simply loaded in the top level index.html page. At that time, such file loading was *synchronous*. This meant that the web app could not be touched by the user until all code had been downloaded from the kbase server and loaded in the browser. 

In fact, even if asynchronous javascript loading was possible, it could not be utilized, because the order of loading files was important. Parallelizing of code loading was not possible

This serial loading of dozens of files introduced significant latency in loading ui-common, and also meant that all future code additions would only increase that latency.

The solution was the addition of several key technologies:

- installation of libraries using **Bower**, a javascript ui-centric package management system
- usage of "AMD" (Asynchronous Module Definition) module loading using the **requirejs** library
- creation of a set of build scripts for the ui web app which would download dependencies via Bower, copying the correct files into the correct locations, and installing all specified plugins (via Bower as well.)

This was launched in the 2015 and renamed **kbase-ui**.

## Addition of new plugins over time

Over the subsequent years, additions to kbase-ui led to the creation and integration of several new plugins:

- Dashboard
- User Profile
- App Catalog
- Bulk Upload UI (since retired)
- Data Search
- JGI search
- User Account
- Organizations
- Feeds
- Biochemistry Search

In addition, many plugins were created for prototyping, demonstration, and development.

## But not all Roses...

One problem with this approach has been the variability in the style of coding each plugin. This is manifested not just in the programming style, but language features used, libraries used, and look and feel.

For instance, older code like the Landing Pages, utilize **jquery** and KBase's custom jquery base widget **kbwidget**. Yet the Dashboard is based on **Nunjucks**, a templating language; Bulk Upload UI was based on **Angular**; many small internal plugins (e.g. about, mainwindow) are based on a simple **zero-dependency KBase widget api**; Data Search utilizes **knockoutjs**; and Biochemistry Search uses **React**.

> INSERT HERE: a table of plugins and technologies utilized.

The reason for this plethora of approaches was due to:

- **developer comfort** - developers who had previous experience with jquery and kbwidget would continue to produce code in a similar style; new developers would try to choose a more effective approach;
- **javascript ecosystem evolution** - although often framed as "jquery is out, react is in" or some such, it is simply true that as the ecosystem evolves, more effective libraries arrive and their usage can improve productivity and code quality and enable more effective ui interactions;
- **lack of discipline** - honestly, we did not have an ethic of sticking to one approach - we had many cowboys and no shepherds.

Other issues:

- libraries were often held back from major version updates, because of the bulk of code possibly using them, the different styles of programming make refactoring difficult, and the difficulty of refactoring loosely arranged Javascript;
- no unit tests - none of the code had unit tests, so there is uncertainty that code changes will result in regressions.
- introducing new programmers to the codebase covers too many technolgies and techniques, it is interesting and stimulating but not efficient;
- programming guides are next to impossible due to the idiosyncratic nature of each codebase
- libraries and techniques were becoming outdated and out of the mainstream, which makes skillsets stale, and could negatively affect retention and attractiveness of employees.

## And we arrive at **NOW**

In the Spring of 2019 we launched a project to refactor **kbase-ui** with the following goals:

- adopt a single modern stack of libraries, tools, and practices
- create documentation and tools to support the development of kbase-ui and plugins
- begin conversion of kbase-ui and all extant plugins to this new stack
- eject unused code (for good!)

This new kbase-ui architecture is still based on the same plugin system (for now), allowing us to migrate each plugin separately over time, while being able to deploy each plugin as it is refactored.

By embedding each plugin within an iframe, the code of each plugin is isolated from other plugins and from kbase-ui itself. This allows free development of each plugin. Entanglement of dependencies is not an issue.

At this time this process is still underway, with the initial versions of two plugins rewritten in the new stack, and kbase-ui refactored to support the new architecture. All other plugins have been minimally refactored to make them compatible, which primarily means embedded within an iframe.

So what is the new stack?

The basic elements are:

- **React** - components and component lifecycle
- **TypesScript** - statically typed superset of Javascript
- **Ant Design** - for standard ui components
- **Redux** - for managing data and communications
- **@kbase/ui-lib** - a single internal library for supporting kbase-ui and plugins in this new stack
- Create React App with TypeScript (**CRATS**) - for application construction and developer workflow, including build and test.
- **craco** - for customization of the CRATS workflow

In addition there are several other support libraries involved.

This new stack, which we refer to as *CRATS* (Creat React App with TypeScript) creates a small set of files to be loaded for the app. *kbase-ui* has been modified to load these plugins within an iframe (a technique already used occasionally in kbase-ui, but not standardized). 

By loading each plugin within an iframe, code is decoupled at the plugin level. A narrow communication interface based on the standard *postMessage* API is the primary runtime connection between kbase-ui and a plugin, in addition to the plugin configuration.

## What's Next?

In the short term, we need to complete the first stage of the transition, and deploy the refactored kbase-ui and plugins.

In the medium term, we will continue to refactor (or rather, rewrite), each plugin as well as kbase-ui itself in the new way.

In the long term, we may be able to merge all of the code together and abandon, or at least deprecate, the plugin system. Although the plugin system has served us well, with our new stack managing large codebases should be much easier.

For a detailed presentation of our new kbase-ui architecture, please read on in

<div style="text-align: center" markdown="1">
[Layout](./layout){:class .btn}
</div>
