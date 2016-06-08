#!/bin/bash

cd nova-core && npm link && cd ..
cd nova-users && npm link && cd ..
cd nova-forms && npm link && cd ..

cd nova-base-components
npm link nova-core
npm link nova-users
npm link nova-forms
cd ..
