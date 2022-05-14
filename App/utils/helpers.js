const randomstring = require("randomstring");

class Helpers {
  static async shortAlias() {
    const shortAlias = await randomstring.generate({
      length: 6,
      charset: "alphabetic",
    });
    return shortAlias;
  }
}

module.exports = Helpers;
