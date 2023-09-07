import fs from 'fs';
import * as mimetypes from 'mime-types';
import path from 'path';
import shell from 'shelljs';
import * as Directory from '../Directory/Directory.js'

/**
 * Creates a manifest for all files in a folder, and then normalizes each file
 * based on the manifest.
 *
 * @param {object} config The config params from config.json
 */
export function normalizeFolder(config) {
  const configPaths = new Map([
    ["sourcePath", config.input.path],
    ["outputPath", config.output.path],
    ["logPath", config.log.path],
    ["tmpPath", config.temp.path],
  ]);

  const configIgnoredFiletypes = new Map([
    ["ignoredFiletypes", config.input.filetypes.ignored],
  ]);

  // Create requisite dirs if they don't already exist.
  Directory.createDirectories(configPaths);

  // Glob the maps together.
  this.generateManifest(new Map([...configPaths, ...configIgnoredFiletypes]));
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

export function normalizeFile() { }

