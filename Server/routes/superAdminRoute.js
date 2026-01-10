const express = require("express")
const router = express.Router();
const superadminController = require("../controllers/superAdminController")

router.get("/kycrequests" , superadminController.kycrequests)
router.put("/kyc/:id", superadminController.updateKycStatus);
router.get("/dashboard", superadminController.superAdminDashboard);

module.exports = router;
