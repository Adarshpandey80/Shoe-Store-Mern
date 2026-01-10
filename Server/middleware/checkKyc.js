// middleware/checkKyc.js
const checkKycVerified = (req, res, next) => {
  if (!req.seller.isVerified) {
    return res.status(403).json({
      message: "KYC_NOT_VERIFIED",
      redirect: "/adminSeller/kyc"
    });
  }

  next();
};

module.exports = checkKycVerified;
