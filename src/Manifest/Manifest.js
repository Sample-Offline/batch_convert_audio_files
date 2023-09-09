import fs from 'fs';
import * as mimetypes from 'mime-types';
import path from 'path';
import shell from 'shelljs';

/**
 * Adds a file to the manifest for processing if it doesn't appear in the
 * `config.input.ignored` list.
 *
 * @param {Map} config The Mapped config kv's.
 *
 * @return {void}
 */
export const generateManifest = (config) => {
  // TODO: Check if manifest already-extsts and is not completed
  // TODO: Don't append to existing manifest. Generate a new one.
  const manifestPath = config.get('logPath') + config.get('manifestFilename');

  shell.ls(config.get('sourcePath')).forEach((file) => {
    let manifestRow = generateManifestRow(file, config);

    // Add the row to the manifest only if it's valid.
    if (manifestRow !== '') {
      fs.appendFileSync(
        manifestPath,
        manifestRow,
        config.get('manifestEncoding')
      );
    }
  });
}

/**
 *
 * @param {string} file The file path to use for the manifest row.
 * @param {array} config The config params from config.json
 *
 * @return {string} The manifest row to be appended, or an empty string if the
 * file shouldn't be added to the manifest
 */
export const generateManifestRow = (file, config) => {
  let row = '';
  let file_mimetype = mimetypes.lookup(file);

  // If the file's mime-type is in the ignored list, return
  if (config.get('ignoredFiletypes').includes(file_mimetype)) {
    console.info(`Omitting ${file} from manifest because its mimetype is in the config.input.filetypes.ignored list. Mime-type: ${file_mimetype}`); // TODO: Add this to the log file.

    return '';
  }

  // The row to append to the manifest.
  // TODO: Serialize this so its an object per row. The mime type will be hard to parse if it's not keyed.
  row = path.resolve(file) + ' ' + file_mimetype + '\n';

  return row;
}
