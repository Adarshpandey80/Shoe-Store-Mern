const kycModel = require("../models/kycModel");
const AdminSeller = require("../models/SellerModel"); // seller model
const UserModel = require("../models/userModel")
const ProductModel = require("../models/productModel")

/**
 * GET ALL KYC REQUESTS
 */
const kycrequests = async (req, res) => {
    try {
        const requests = await kycModel
            .find()
            .populate("sellerId", "email username")
            .sort({ createdAt: -1 });

        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching KYC requests",
        });
    }
};

/**
 * UPDATE KYC STATUS (APPROVE / REJECT)
 */
const updateKycStatus = async (req, res) => {
    try {
        const { id } = req.params;        // KYC document ID
        const { status, adminRemark } = req.body;

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status value",
            });
        }

        const kyc = await kycModel.findById(id);

        if (!kyc) {
            return res.status(404).json({
                message: "KYC request not found",
            });
        }

        // update KYC document
        kyc.status = status;
        kyc.adminRemark = adminRemark || "";
        await kyc.save();

        // ✅ If approved → enable seller
        if (status === "APPROVED") {
            await AdminSeller.findByIdAndUpdate(kyc.sellerId, {
                isVerified: true,
                kycState: "Approved",
            });
        }
        // ❌ If rejected → disable seller
        else if (status === "REJECTED") {
            await AdminSeller.findByIdAndUpdate(kyc.sellerId, {
                isVerified: false,
                kycState: "Rejected",
            });
        }


        res.status(200).json({
            message: `KYC ${status.toLowerCase()} successfully`,
            kyc,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update KYC status",
        });
    }
};


const superAdminDashboard = async (req, res) => {
  try {
    const [
      totalSellers,
      totalUsers,
      totalProducts,
      approvedSellers,
      pendingKyc,
      rejectedKyc,
      recentSellers,
    ] = await Promise.all([
      AdminSeller.countDocuments(),
      UserModel.countDocuments(),
      ProductModel.countDocuments(),

      AdminSeller.countDocuments({ kycState: "Approved" }),
      AdminSeller.countDocuments({ kycState: "Pending" }),
      AdminSeller.countDocuments({ kycState: "Rejected" }),

      AdminSeller.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("storeName email kycState createdAt"),
    ]);

    res.status(200).json({
      stats: {
        totalSellers,
        totalUsers,
        totalProducts,
        approvedSellers,
        pendingKyc,
        rejectedKyc,
      },
      recentSellers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
};



module.exports = {
    kycrequests,
    updateKycStatus,
   superAdminDashboard
   
};
