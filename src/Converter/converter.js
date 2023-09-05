import shell from 'shelljs';

export function normalize(input_path) {
  console.log("TODO");
}

/**
 * Converts an audio file from one filetype to another using ffmpeg
 * TODO: ps - Make this use the plugin pattern maybe to get away from the ffmpeg dep?
 * TODO: This current creates files like audioFile.wav.mp3. Remove the .wav part
 *       Using just shell.exec('mv') seems sloppy.
 *
 * @param {string} input_path Where the files to convert are.
 * @param {string} output_path Where the converted files should go
 * @param {string} from_type What filetype should be converted TODO: convert this to arr
 * @param {string} to_type The filetype to convert to. TODO: This should also be an arr
 *
 * @return {void}
 */
export function convertFiletype(input_path, output_path, from_type, to_type = 'mp3') {

  if (from_type === to_type) {
    throw Error('Cannot convert file to the same type it already is!');
  }

  let originPath = shell.exec('pwd');

  // TODO: ps - Check whitelist
  // if from_type is in blacklist, or not in whitelist, err
  // if to_type is in blacklist, or not in whitelist, err

  // cd to input dir and process files. This is set in the config file.
  shell.cd(input_path);

  // Convert each file in the dir.
  shell.ls(`*.${from_type}`).forEach((file) => {

    // TODO: ps - Get file path from file name
    // TODO: Convert extension to `to_type` for use with the output filename in the ffmpeg command
    // TODO: explore shell async process to increase speed

    let command_str = `ffmpeg -i ${input_path}${file} -ab 320k -f ${to_type} ${output_path}${file}.${to_type}`;

    // Run the command
    shell.exec(command_str);
  });

  // Return to where the script was run from.
  shell.cd(originPath);
}

export function readDirectoryFiles() {}
