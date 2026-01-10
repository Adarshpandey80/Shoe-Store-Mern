import React, { useEffect, useState } from "react";
import axios from "axios";

function KycRequest() {
  const [kycRequests, setKycRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchKycRequests = async () => {
    try {
      const api = "http://localhost:8000/superadmin/kycrequests";
      const response = await axios.get(api);
      setKycRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch KYC requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8000/superadmin/kyc/${id}`,
        { status }
      );
      fetchKycRequests();
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchKycRequests();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading KYC Requests...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Seller KYC Requests
        </h1>
        <p className="text-gray-500 mt-1">
          Review & verify seller documents
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Seller</th>
              <th className="px-6 py-4 text-left">Business</th>
              <th className="px-6 py-4 text-left">PAN</th>
              <th className="px-6 py-4 text-left">GST</th>
              <th className="px-6 py-4 text-left">Documents</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>


          <tbody>
            {kycRequests.map((kyc) => (
              <tr
                key={kyc._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* SELLER INFO */}
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-800">
                    {kyc.sellerId?.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    {kyc.sellerId?.email}
                  </p>
                </td>

                {/* BUSINESS */}
                <td className="px-6 py-4 font-medium">
                  {kyc.businessName}
                </td>

                {/* PAN */}
                <td className="px-6 py-4">
                  {kyc.panNumber}
                </td>

                {/* GST */}
                <td className="px-6 py-4">
                  {kyc.gstNumber || "—"}
                </td>

                {/* DOCUMENTS */}
                <td className="px-6 py-4 space-x-3">
                  <a
                    href={kyc.documents.panCard}
                    target="_blank"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    PAN
                  </a>

                  <a
                    href={kyc.documents.aadhaar}
                    target="_blank"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    Aadhaar
                  </a>
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
            ${kyc.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : kyc.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
          `}
                  >
                    {kyc.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 text-center space-x-2">
                  {kyc.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(kyc._id, "APPROVED")}
                        className="px-4 py-1.5 bg-green-600 text-white rounded-lg 
              hover:bg-green-700 transition text-xs font-semibold"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(kyc._id, "REJECTED")}
                        className="px-4 py-1.5 bg-red-600 text-white rounded-lg 
              hover:bg-red-700 transition text-xs font-semibold"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {kycRequests.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No KYC requests found
          </div>
        )}
      </div>
    </div>
  );
}

export default KycRequest;
