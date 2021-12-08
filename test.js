"use strict";

const Parser = require("./index.js");
const assert = require("assert");

describe("parse", () => {
  it("parses all zeros", () => {
    const row =
      " _  _  _  _  _  _  _  _  _ \n" +
      "| || || || || || || || || |\n" +
      "|_||_||_||_||_||_||_||_||_|\n" +
      "                           \n";
    assert.equal(Parser.parse(row), "000000000");
  });

  it("parses all ones", () => {
    const row =
      "                           \n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "  |  |  |  |  |  |  |  |  |\n" +
      "                           \n";

    assert.equal(Parser.parse(row), "111111111");
  });

  it("parses one through nine", () => {
    const row =
      "    _  _     _  _  _  _  _ \n" +
      "  | _| _||_||_ |_   ||_||_|\n" +
      "  ||_  _|  | _||_|  ||_| _|\n" +
      "                           \n";
    assert.equal(Parser.parse(row), "123456789");
  });
});

describe("validation", () => {
  it("replaces illegal digits with question marks", () => {
    const row =
      "       _     _  _  _  _  _ \n" +
      "  | _| _||_||_ |_   ||_||_|\n" +
      "  ||_  _|  |  ||_|  ||_| _|\n" +
      "                           \n";
    let accountNum = Parser.parse(row);

    if (!Parser.isLegible(accountNum)) accountNum += " ILL";

    assert.equal(accountNum, "1?34?6789 ILL");
  });

  it("expects checksum validation failure", () => {
    const row =
      "       _     _  _  _  _  _ \n" +
      "  |  | _||_||_ |_   ||_||_|\n" +
      "  |  | _|  | _||_|  ||_| _|\n" +
      "                           \n";
    let accountNum = Parser.parse(row);

    if (!Parser.isValidChecksum(accountNum)) accountNum += " ERR";

    assert.equal(accountNum, "113456789 ERR");
  });
});
