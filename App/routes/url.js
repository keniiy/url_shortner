const express = require("express");
const router = express.Router();
const { validate } = require("../validation/validatorClass");
const { shortenUrlSchema, shortenUrlParam } = require("../validation/schema");
const UrlController = require("../controllers/urlControllers");

router.post("/shorten", validate(shortenUrlSchema), UrlController.shortenUrl);
router.get(
  "/shorten/:shortCode",
  validate(shortenUrlParam),
  UrlController.getUrl
);
router.get(
  "/shorten/:shortCode/stats",
  validate(shortenUrlParam),
  UrlController.getUrlStats
);

module.exports = router;
