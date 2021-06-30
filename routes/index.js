const express = require("express");
const router = express.Router();

const {
  getBankCount,
  getBanks,
  getBank,
  getBranches,
  searchBanks,
  getBranchData
} = require("./../controller/controller");

router.get("/bank/branch", getBranchData);
router.get("/banks/count", getBankCount);
router.get("/banks/branches/autocomplete", getBranches);
router.get("/banks/branches", searchBanks);
router.get("/banks/:ifsc", getBank);
router.get("/banks", getBanks);

module.exports = router;
