const map = {
  [" _ " + "| |" + "|_|"]: "0",
  ["   " + "  |" + "  |"]: "1",
  [" _ " + " _|" + "|_ "]: "2",
  [" _ " + " _|" + " _|"]: "3",
  ["   " + "|_|" + "  |"]: "4",
  [" _ " + "|_ " + " _|"]: "5",
  [" _ " + "|_ " + "|_|"]: "6",
  [" _ " + "  |" + "  |"]: "7",
  [" _ " + "|_|" + "|_|"]: "8",
  [" _ " + "|_|" + " _|"]: "9",
};

const DIGIT_WIDTH = 3;
const ENTRY_HEIGHT = 4;

const getKeys = (arr) => {
  const [str1, str2, str3] = arr;
  if (!str1) return;
  if (!str2) return;
  if (!str3) return;
  const keys = new Array(9).fill(0);

  let width = DIGIT_WIDTH;
  for (let i = 0; i < keys.length; i++) {
    keys[i] = str1[width - 3] + str1[width - 2] + str1[width - 1];
    keys[i] += str2[width - 3] + str2[width - 2] + str2[width - 1];
    keys[i] += str3[width - 3] + str3[width - 2] + str3[width - 1];

    width += 3;
  }
  return keys;
};

const getDigits = (keys) => {
  let str = "";
  for (const key of keys) {
    str += map[key] || "?";
  }
  return str;
};

const isValidChecksum = (str) => {
  let sum = +str[8];
  let j = 2;
  for (let i = 7; i >= 0; i--) {
    sum += j * +str[i];
    j++;
  }
  return sum % 11 === 0;
};

const isLegible = (str) => {
  return str.indexOf("?") < 0;
};

const parse = (fileData) => {
  const arr = fileData.split("\n");
  let res = "";
  for (let i = 0; i < arr.length; i += ENTRY_HEIGHT) {
    // get keys for covert them to digits
    const keys = getKeys([arr[i], arr[i + 1], arr[i + 2]]);
    if (!keys) break;
    // get account numbers
    let accountNum = getDigits(keys);

    res += accountNum;
  }

  return res;
};

module.exports = { parse, isValidChecksum, isLegible };
