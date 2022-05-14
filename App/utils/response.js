class ApiResponse {
  /**
   * Returns a success response with status code
   * @param {object} res - response object
   * @param {number} statusCode - status code
   * @param {string} message - message
   * @param {object} data - data
   */

  static successResponse(res, statusCode, message, data) {
    return res.status(statusCode).json({ status: "success", message, data });
  }

  /**
   * Returns a error response with status code
   * @param {object} res - response object
   * @param {number} statusCode - status code
   * @param {string} message - message
   * @param {object} data - data
   */
  static errorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ status: "error", message });
  }
}

module.exports = ApiResponse;
