#!/bin env node

import jsonfile from 'jsonfile';
import { Command } from "commander";
import { normalize } from './Normalizer/normalizer.js';

// Init the new commander instance
const program = new Command();

// Main program metadata (taken from package.json)
const pkg = jsonfile.readFileSync('../package.json');
program
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version)

// Program commands
program.command('normalize')
  .description('Normalize audio based on the EBU R128 standard.')
  .option('-i, --il', 'Set integrated loudness target. Range is -70.0 - -5.0. Default value is -24.0.')
  .option('-l, --lra', 'Set loudness range target. Range is 1.0 - 50.0. Default value is 7.0.')
  .option('-t, --dbtp', 'Set maximum true peak. Range is -9.0 - +0.0. Default value is -2.0.')
  .action(normalize());

// program.parse();
