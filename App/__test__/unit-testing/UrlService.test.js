const mongoose = require("mongoose");
const database = require("../../config/db");
const Logger = require("../../config/logger");
global.logger = Logger.createLogger({ label: "URL_SHORTENER" });

database();

const { shortenUrl, getUrl, getUrlStats } = require("../../service/urlService");

describe("UrlService", () => {
  it("should shorten url when given valid full data", async () => {
    const func = await shortenUrl({
      url: "https://npm.io/package/node-url-shortener",
      shortCode: "STHdxE",
    });
    expect(func.statusCode).toBe(201);
    expect(func.data.url).toBe("https://npm.io/package/node-url-shortener");
    expect(func.data.shortCode).toBe("STHdxE");
  });

  it("should return url a new url and autogenerated shortCode is given without shortCode", async () => {
    const func = await shortenUrl({
      url: "https://npm.io/package/node-url-shortene",
    });
    expect(func.statusCode).toBe(201);
    expect(func.data.url).toBe("https://npm.io/package/node-url-shortene");
    expect(func.data.shortCode).toMatch(/^[a-zA-Z0-9]{6}$/);
  });

  it("should return url an old url is given", async () => {
    const func = await shortenUrl({
      url: "https://npm.io/package/node-url-shortener",
      shortCode: "STHdxE",
    });
    expect(func.statusCode).toBe(200);
    expect(func.data.url).toBe("https://npm.io/package/node-url-shortener");
  });

  it("should return a 200 if a valid shortCode is provided", async () => {
    const func = await getUrl("STHdxE");
    expect(func.statusCode).toBe(200);
    expect(func.data).toHaveProperty("url");
    expect(func.data).toHaveProperty("shortCode");
  });

  it("should return a 404 if a shortCode is not provided", async () => {
    const func = await getUrl("iiuuygyucrandom");

    expect(func.statusCode).toBe(404);
  });
});
