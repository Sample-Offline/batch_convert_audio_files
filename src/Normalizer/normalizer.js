import * as Directory from '../Directory/Directory.js'
import * as Manifest from '../Manifest/Manifest.js'

/**
 * Creates a manifest for all files in a folder, and then normalizes each file
 * based on the manifest.
 *
 * @param {object} config The config params from config.json
 */
export const normalizeFolder = (config) => {
  const configPaths = new Map([
    ["sourcePath", config.input.path],
    ["outputPath", config.output.path],
    ["logPath", config.log.path],
    ["tmpPath", config.temp.path],
  ]);

  // Create requisite dirs if they don't already exist.
  Directory.createDirectories(configPaths);

  const manifestConfig = new Map([
    ["ignoredFiletypes", config.input.filetypes.ignored],
    ["sourcePath", config.input.path],
    ["logPath", config.log.path],
    ["manifestFilename", config.log.manifest.filename],
    ["manifestEncoding", config.log.manifest.encoding],
  ]);

  // Glob the maps together.
  Manifest.generateManifest(manifestConfig);
}

export const normalizeFromManifest = (manifestFile) => {
  let queue = [];

  normalizeFile(file);
}


export const normalizeFile = (file) => {

}

