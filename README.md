# Batch Convert

## Overview

The goal is to have a few utilities that batch process audio files for normalization.

1. Normalize volume of tracks
2. Convert file from one format to another while preserving as much metadata as possible, as well as bitrate and bit-depth.

## Design

Wrap ffmpeg functionality for conversion and normalization that takes all files in a directory, normalizes them, converts them if necessary, and copies them to
a target directory. All conversions should be written to a log. The original file should not be mutated.

Probably do it in node since it seems easiest. Consider converting to `bin`` whenever.

## TODO

-[ ] Properly escape config paths so there can be multiplatform compatibility and spaces in the directory names
-[ ] This really needs to use async/parallel processing.
-[ ] Currently breaks on paths with spaces (lol)

## Sloppy notes

// modules needed
  // shelljs - check for ffmpeg
  // chalk - output color
  // log - for logging
  // log-symbols for styling log output

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
