const moment = require("moment");
const helpers = require("../utils/helpers");
const { UrlSchema } = require("../models/index");

class UrlService {
  static async shortenUrl(data) {
    const { url, shortCode } = data;
    // first check if the url already exists
    const urlExists = await UrlSchema.findOne({ url });

    if (urlExists) {
      return {
        data: {
          url: urlExists.url,
          shortCode: urlExists.shortCode,
        },
        statusCode: 200,
      };
    }
    let shortURl = shortCode;
    if (!shortURl) {
      shortURl = await helpers.shortAlias(url);
    }

    const result = await UrlSchema.create({
      url,
      shortCode: shortURl,
      startDate: moment().format("YYYY-MM-DD"),
    });
    // TODO could have used a class response but little time to implement
    return {
      data: {
        url: result.url,
        shortCode: result.shortCode,
      },
      statusCode: 201,
    };
  }

  static async getUrl(shortCode) {
    const url = await UrlSchema.findOne({ shortCode });
    if (!url) return { data: "short code not found", statusCode: 404 };

    url.redirectCount = url.redirectCount + 1;
    url.lastSeenDate = moment().format("YYYY-MM-DD");
    await url.save();

    const data = {
      url: url.url,
      shortCode: url.shortCode,
    };
    return { data, statusCode: 200 };
  }

  static async getUrlStats(shortCode) {
    const url = await UrlSchema.findOne({ shortCode });
    if (!url) return { data: "short code not found", statusCode: 404 };
    return {
      data: {
        startDate: url.startDate,
        lastSeenDate: url.lastSeenDate,
        redirectCount: url.redirectCount,
      },
      statusCode: 200,
    };
  }
}

module.exports = UrlService;
