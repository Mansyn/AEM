/*
 *  createUid
 *
 *  This is a helper function that creates a unique ID of a specified length
 *
 *  @param length (int) how long string should be.
 *  @return (str) a string of numbers
 */
function createUid(length) {
  // All allowed chars
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // Output string
  let output = '';
  // Loop iterator
  let i;

  // Loop through `length` times to build the unique string
  for (i = 0; i < length; i += 1) {
    output += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  // return the output
  return output;
}

export default createUid;
