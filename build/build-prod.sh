#!/bin/sh

yarn version --release

# Generate license files
yarn licenses generate-disclaimer > LICENSES.txt

# Don't forget to `git push --tags`!
