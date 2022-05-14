const UrlService = require("../service/urlService");
const { successResponse, errorResponse } = require("../utils/response");

class UrlController {
  /**
   * @description: This method is used to shorten the url
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @returns {Object} - Response object
   */
  static async shortenUrl(req, res) {
    try {
      const result = await UrlService.shortenUrl(req.body);
      if (result.statusCode === 201) {
        logger.info(`${req.body.url} shortened successfully`);
        return successResponse(
          res,
          result.statusCode,
          "shortened successfully",
          result.data
        );
      }
      logger.error(`${req.body.url} already exist and shortened`);
      return successResponse(
        res,
        result.statusCode,
        "already exist and shortened",
        result.data
      );
    } catch (error) {
      logger.error(`Error in shortenUrl: ${error.message}`);
      return errorResponse(res, 500, "Oops! Something went wrong.");
    }
  }

  static async getUrl(req, res) {
    const { shortCode } = req.params;
    try {
      const result = await UrlService.getUrl(shortCode);
      if (result.statusCode === 200) {
        logger.info(`${shortCode} redirected successfully`);
        return successResponse(
          res,
          result.statusCode,
          "redirected successfully",
          result.data
        );
      }
      logger.error(`${shortCode} not found`);
      return errorResponse(res, result.statusCode, result.data);
    } catch (error) {
      logger.error(`Error in getUrl: ${error.message}`);
      return errorResponse(res, 500, "Oops! Something went wrong.");
    }
  }

  static async getUrlStats(req, res) {
    const { shortCode } = req.params;
    try {
      const result = await UrlService.getUrlStats(shortCode);
      if (result.statusCode === 200) {
        logger.info(`${shortCode} stats retrieved successfully`);
        return successResponse(
          res,
          result.statusCode,
          "stats retrieved successfully",
          result.data
        );
      }
      logger.error(`${shortCode}  stats not found`);
      return errorResponse(res, result.statusCode, result.data);
    } catch (error) {
      logger.error(`Error in getUrlStats: ${error.message}`);
      return errorResponse(res, 500, "Oops! Something went wrong.");
    }
  }
}

module.exports = UrlController;
