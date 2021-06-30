const DBClient = require("./../config/Database");
const BANKS_DATA_TABLE = "bank_db";

exports.getBanks = async (req, res) => {
  try {
    let { offSet, pageSize, city } = req.query;
    let limit = pageSize;

    let query =
      "SELECT * FROM " +
      BANKS_DATA_TABLE +
      " WHERE LOWER(city) ~* LOWER('" +
      city +
      "') ORDER BY ifsc ASC limit " +
      limit +
      " offset " +
      offSet;
    let response = await DBClient.query(query);

    return res.status(200).json({
      success: true,
      banks: response.rows
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBankCount = async (req, res) => {
  try {
    let { city } = req.query;

    let query =
      "SELECT COUNT(*) FROM " +
      BANKS_DATA_TABLE +
      " WHERE LOWER(city) ~* LOWER('" +
      city +
      "')";
    let response = await DBClient.query(query);

    if (response.rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: "bank count Unvailable"
      });
    }

    return res.status(200).json({
      success: true,
      count: response.rows[0].count
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBranches = async (req, res) => {
  try {
    let { city, branch, offSet, pageSize } = req.query;
    let limit = pageSize;

    let query =
      "SELECT branch FROM " +
      BANKS_DATA_TABLE +
      " WHERE LOWER(city) ~* LOWER('" +
      city +
      "') AND LOWER(branch) LIKE LOWER('%" +
      branch +
      "%') ORDER BY ifsc ASC limit " +
      limit +
      " offset " +
      offSet;
    let response = await DBClient.query(query);

    if (response.rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No branch available"
      });
    }

    return res.status(200).json({
      success: true,
      branches: response.rows
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBranchData = async (req, res) => {
  try {
    let { city, branch, offSet, pageSize } = req.query;
    let limit = pageSize;

    let query =
      "SELECT * FROM " +
      BANKS_DATA_TABLE +
      " WHERE LOWER(city) ~* LOWER('" +
      city +
      "') AND LOWER(branch) ~* LOWER('" +
      branch +
      "') ORDER BY ifsc ASC limit " +
      limit +
      " offset " +
      offSet;
    let response = await DBClient.query(query);

    if (response.rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No bank detail available for the entered branch"
      });
    }

    return res.status(200).json({
      success: true,
      banks: response.rows
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBank = async (req, res) => {
  try {
    let { ifsc } = req.params;

    let query =
      "SELECT * FROM " +
      BANKS_DATA_TABLE +
      " WHERE LOWER(ifsc) ~* LOWER('" +
      ifsc +
      "') ";

    let response = await DBClient.query(query);

    if (response.rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No bank detail available"
      });
    }

    return res.status(200).json({
      success: true,
      bank: response.rows[0]
    });
  } catch (error) {
    console.log(error);
  }
};

exports.searchBanks = async (req, res) => {
  try {
    let { city, offSet, pageSize, key } = req.query;
    let limit = pageSize;

    let query =
      "SELECT * FROM " +
      BANKS_DATA_TABLE +
      " WHERE (LOWER(ifsc) LIKE LOWER('%" +
      key +
      "%') OR LOWER(bank_id) LIKE LOWER('%" +
      key +
      "%') OR LOWER(branch) LIKE LOWER('%" +
      key +
      "%') OR LOWER(address) LIKE LOWER('%" +
      key +
      "%') OR LOWER(city) LIKE LOWER('%" +
      key +
      "%') OR LOWER(district) LIKE LOWER('%" +
      key +
      "%') OR LOWER(state) LIKE LOWER('%" +
      key +
      "%') OR LOWER(bank_name) LIKE LOWER('%" +
      key +
      "%')) AND LOWER(city) like LOWER('" +
      city +
      "') ORDER BY ifsc ASC limit " +
      limit +
      " offset " +
      offSet;

    let response = await DBClient.query(query);

    if (response.rows.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No bank detail available for the entered value"
      });
    }

    return res.status(200).json({
      success: true,
      banks: response.rows
    });
  } catch (error) {
    console.log(error);
  }
};
