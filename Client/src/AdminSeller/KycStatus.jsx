import React from "react";
import { useNavigate } from "react-router-dom";

function KycStatus({ kycState }) {
  const navigate = useNavigate();

  if (kycState === "Pending") {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-yellow-700">
          KYC Under Verification
        </h3>
        <p className="text-sm text-yellow-600 mt-2">
          Our team is reviewing your documents.
        </p>
      </div>
    );
  }

  if (kycState === "Approved") {
    return (
      <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-green-700">
          🎉 KYC Approved
        </h3>
        <p className="text-sm text-green-600 mt-2">
          You can now list products.
        </p>
        <button
          onClick={() => navigate("/adminSeller/productlist")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
        >
          List Product
        </button>
      </div>
    );
  }

  return null;
}

export default KycStatus;
