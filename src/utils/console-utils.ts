import { wcswidth } from 'simple-wcswidth';
import { CharLengthDict } from '../models/common';

/* eslint-disable no-control-regex */
// const colorRegex = /\x1b\[\d{1,3}m/g; // \x1b[30m  \x1b[305m
const pattern = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
].join('|');

// const colorRegex = /\x1b\[\d{1,3}m/g; // \x1b[30m  \x1b[305m
const colorRegex = new RegExp(pattern, 'g');

const stripAnsi = (str: string): string => str.replace(colorRegex, '');

export const findWidthInConsole = (
  str: string,
  charLength?: CharLengthDict
): number => {
  let strLen = 0;
  str = stripAnsi(str);
  if (charLength) {
    Object.entries(charLength).forEach(([key, value]) => {
      // count appearance of the key in the string and remove from original string
      let regex = new RegExp(key, 'g');
      strLen += (str.match(regex) || []).length * value;
      str = str.replace(key, '');
    });
  }
  strLen += wcswidth(str);
  return strLen;
};

export default findWidthInConsole;
