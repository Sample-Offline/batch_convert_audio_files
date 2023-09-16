#!/bin/sh

yarn version --prerelease --no-commit-hooks --no-git-tag-version

# Generate license files
yarn licenses generate-disclaimer > LICENSES.txt
