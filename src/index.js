#!/bin env node

// Check for ffmpeg
  // which ffmpeg
  // throw error if not present

// Target dir, source dir, filetype whitelist/blacklist, and which filetype to convert to should be configurable

import shell from 'shelljs';
import jsonfile from 'jsonfile';
import * as converter from './Converter/converter.js';

const configFile = './config.json'

// Read config file
// @throws If an error is encountered reading or parsing the file
const config = jsonfile.readFileSync(configFile);

console.log(config)


function createOutputDirectory() {
  // Check existence of desired directories
  shell.mkdir('-p', config.temp.path);
}
createOutputDirectory();

converter.normalize();

// Cleanup
// shell.exec.rm('-rf', config.temp.path);

// Check for ffmpeg
// if (!shell.which('ffmpeg')) {
//   shell.echo('Sorry, this script requires ffmpeg');
//   shell.exit(1);
// }

// shell.echo(shell.exec('ffmpeg -version'));

// Copy files to release dir
// shell.rm('-rf', 'out/Release');
// shell.cp('-R', 'stuff/', 'out/Release');


