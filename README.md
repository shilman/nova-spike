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

## Work items

This is a temporary repository, and will be removed as soon as it is mature
enough to be merged back into to the main Telescope repo. In the meantime, I'll
be cataloging major work items here.

- [ ] Style should be updated to render properly in storybook (how?)
- [ ] Meteor references should be removed
- [ ] Users completely stubbed out
- [ ] nova-forms completely stubbed out
- [ ] nova-base-styles temporarily (?) merged into nova-base-components
