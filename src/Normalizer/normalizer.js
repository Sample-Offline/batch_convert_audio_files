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
  Directory.generateManifest(new Map([...configPaths, ...configIgnoredFiletypes]));
}

export function normalizeFile() { }

