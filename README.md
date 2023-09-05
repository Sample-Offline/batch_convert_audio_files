# Batch Convert

## Overview

The goal is to have a few utilities that batch process audio files for normalization.

1. Normalize volume of tracks
2. Convert file from one format to another while preserving as much metadata as possible, as well as bitrate and bit-depth.

## Design

Wrap ffmpeg functionality for conversion and normalization that takes all files in a directory, normalizes them, converts them if necessary, and copies them to
a target directory. All conversions should be written to a log. The original file should not be mutated.

Probably do it in node since it seems easiest. Consider converting to `bin`` whenever.


// modules needed
  // shelljs - check for ffmpeg
  // chalk - output color
  // log - for logging
  // log-symbols for styling log output
