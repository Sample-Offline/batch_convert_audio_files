import shell from 'shelljs';
import path from 'path';

/**
 * Creates specified directories given the list of paths.
 *
 * @param {Map} paths An iterable Map of where to create the folders.
 */
export function createDirectories(paths) {

  paths.forEach((p) => {
    console.log(path.resolve(p));
    // -p flag preserves dirs if they already exist.
    shell.mkdir('-p', path.resolve(p));
  });
}
