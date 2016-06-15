# Nova-NPM

Nova-NPM is a hacked up standalone NPM package for Nova components running React
Storybook. It's a proof of concept to uncover the major work items and gotchas
to make the conversion.

## Running Locally

Running the following command will set up the NPM packages locally on your machine:
```
./link.sh
```

After you've linked the packages, you should be able to run Storybook to browse
the components:
```
cd nova-base-components
npm install
npm run storybook
```

And then navigate to http://localhost:9010

To develop a package, you can open a separate terminal window, cd into a package
directory, and run `prepublish:watch`. This way every time you make a change in
a source file for that package, it will automatically rerun the build script and
in turn update your storybook.

```
cd nova-posts
npm run prepublish:watch
```

## Work items

This is a temporary repository, and will be removed as soon as it is mature
enough to be merged back into to the main Telescope repo. In the meantime, I'll
be cataloging major work items here.

Miscellaneous notes:
- [x] Style should be updated to render properly in storybook (how?)
- [x] Meteor references should be removed
- [x] Users completely stubbed out
- [x] nova-forms completely stubbed out (and broken)
- [x] nova-base-styles temporarily (?) merged into nova-base-components
- [x] nova-forms flashes should not depend on telescope
- [x] linting + linting settings + commit hooks
- [x] Pass Messages.flash as context messageCallback (see Vote.jsx)
- [x] Route functions / links as callbacks?
- [x] PostsItem child rendering is broken

Top-level:
- [x] nova-forms should be standalone
  - meteor version validates, NPM version just displays
  - if !SimpleSchema console.log("npm add simple-schema")
- [x] nova-base-components should depend on:
  - nova-forms
  - some collection utilities (e.g. `Posts.getLinkTarget`), but NOT on meteor
    - => nova-helpers?
    - => Posts = typeof Mongo !== "undefined" ? new Mongo.Collection("posts") : {};
- [x] the code that got extracted out of the components (e.g. Meteor.call('xxx')) needs a new home
  - Actions => this.context.actions.
  - Events => this.context.events.
  - Messages => ...
  - App.jsx
- [x] lerna.io package management?
