#!/bin/bash

PACKAGES=(nova-core nova-forms nova-comments nova-categories nova-users nova-base-styles)

echo "Cleaning packages"
for pkg in ${PACKAGES[@]}; do
  rm -rf "$pkg/node_modules"
done

echo "Linking globally"
for pkg in ${PACKAGES[@]}; do
  cd $pkg && npm link && cd ..
done

echo "Linking posts"
cd nova-posts && rm -rf node_modules && npm link nova-users && npm link && cd ..

echo "Linking components"
cd nova-base-components && rm -rf node_modules
for pkg in ${PACKAGES[@]}; do
  npm link $pkg
done
npm link nova-posts
npm install
cd ..
