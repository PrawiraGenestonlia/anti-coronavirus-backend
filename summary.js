const BASEURL = "https://x-dream.tech";
const REVESEPROXY = "/ncov-api";
const URI = BASEURL + REVESEPROXY;

module.exports = {
  "get-status": URI + "/",
  "get-api-summary": URI + "/api-summary",
  "get-images-path": URI + "/get-images-path",
  "get-summary": URI + "/get-summary",
  "get-stats": URI + "/get-stats",
  "get-daily": URI + "/get-daily",
}