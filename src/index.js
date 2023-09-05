#!/bin env node

// Check for ffmpeg
  // which ffmpeg
  // throw error if not present

// Target dir, source dir, filetype whitelist/blacklist, and which filetype to convert to should be configurable

import shell from 'shelljs';
import jsonfile from 'jsonfile';
import * as Converter from './Converter/converter.js';

// Read config file
// @throws If an error is encountered reading or parsing the file
const configFile = './config.json'
const config = jsonfile.readFileSync(configFile);

console.log(config)


function createOutputDirectory() {
  // Check existence of desired directories
  shell.mkdir('-p', config.input.path);
  shell.mkdir('-p', config.output.path);
  shell.mkdir('-p', config.temp.path);
}
createOutputDirectory();

Converter.normalize(config.input.path);
Converter.convertFiletype(config.input.path, config.output.path, 'wav', 'mp3');
