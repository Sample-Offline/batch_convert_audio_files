import path from 'path';
import shell from 'shelljs';

/**
 * Creates specified directories given the list of paths.
 *
 * @param {Map} paths An iterable Map of where to create the folders.
 *
 * @return {void}
 */
export function createDirectories(paths) {

  paths.forEach((p) => {
    createDirectory(path.resolve(p));
  });
}

/**
 * Creates a directory at a location on the filesystem.
 *
 * @param {string} directoryPath
 *
 * @return {void}
 */
export const createDirectory = (directoryPath) => {
  // -p flag preserves dirs if they already exist.
  shell.mkdir('-p', directoryPath);
}
