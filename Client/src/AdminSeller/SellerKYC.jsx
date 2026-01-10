import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import KycForm from "./KYCForm";
import KycStatus from "./KycStatus";

function SellerKYC() {
  const [sellerId, setSellerId] = useState("");
  const [kycState, setKycState] = useState("NotApplied");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sellertoken");
    if (token) {
      const decoded = jwtDecode(token);
      setSellerId(decoded.id);
    }
  }, []);

  const fetchKycState = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/admin/isverified/${sellerId}`
      );
      setKycState(res.data.kycState || "NotApplied");
    } catch (err) {
      console.error("Failed to fetch KYC state");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sellerId) fetchKycState();
  }, [sellerId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-2">Seller KYC</h2>
        <p className="text-gray-500 mb-6">
          Verify your identity to start selling
        </p>

        {/* ✅ Conditional Rendering */}
        {kycState === "Pending" || kycState === "Approved" ? (
          <KycStatus kycState={kycState} />
        ) : (
          <KycForm onSuccess={() => setKycState("Pending")} />
        )}
      </div>
    </div>
  );
}

export default SellerKYC;
