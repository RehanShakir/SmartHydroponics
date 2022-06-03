const MacAdress = require("../models/macAddress.model");

/**
 * Post User MacAdress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.addMacAddress = async (req, res) => {
  try {
    await MacAdress.findOneAndUpdate(
      {
        userId: req.user._id,
      },
      { $push: { macAddress: req?.body?.macAddress } }
    );
    return res.status(200).json({ message: "MacAdress Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Macaddress of Logged in user
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.getAllMacAdresses = async (req, res) => {
  try {
    const Macaddressess = await MacAdress.findOne({
      userId: req.user._id,
    }).populate({ path: "userId", select: "-password" });
    return res.status(200).json({ Macaddressess });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Remove Macaddress
 * @param {Request} req - request object
 * @param {Response} res - response object
 */
exports.removeMacaddress = async (req, res) => {
  try {
    await MacAdress.findOneAndUpdate(
      { userId: req.user._id },
      {
        $pull: { macAddress: req.body.macAddress },
      }
    );
    return res
      .status(200)
      .json({ message: "Macaddress Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
