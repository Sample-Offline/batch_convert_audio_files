import fs from 'fs';
import * as mimetypes from 'mime-types';
import path from 'path';
import shell from 'shelljs';

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

/**
 * Adds a file to the manifest for processing if it doesn't appear in the
 * `config.input.ignored` list.
 *
 * @param {Map} config The Mapped config kv's.
 */
export const generateManifest = (config) => {
  // TODO: Check if manifest already-extsts and is not completed

  shell.ls(config.get('sourcePath')).forEach((file) => {
    let file_mimetype = mimetypes.lookup(file);

    // Don't add files with an ignored mimetype
    if (config.get('ignoredFiletypes').includes(file_mimetype)) {
      console.info(`Omitting ${file} from manifest because its mimetype is in the config.input.filetypes.ignored list. Mime-type: ${file_mimetype}`); // TODO: Add this to the log file.
    } else {
      // The row to append to the manifest.
      // TODO: Serialize this so its an object per row. The mime type will be hard to parse if it's not keyed.
      let manifestRow = path.resolve(file) + ' ' + file_mimetype + '\n';

      // Add the row to the manifest. TODO: manifest.log is hardcoded.
      fs.appendFileSync(
        config.get('outputPath') + 'manifest.log',
        manifestRow,
        'utf8'
      );
    }
  });
}
