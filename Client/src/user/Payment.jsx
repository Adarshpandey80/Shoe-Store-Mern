import { useState } from "react";
import { CreditCard, Smartphone, Wallet, ShieldCheck } from "lucide-react";

function Payment() {
  const [method, setMethod] = useState("upi");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ===== LEFT: PAYMENT METHODS ===== */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Select Payment Method
          </h2>

          {/* === UPI === */}
          <div
            onClick={() => setMethod("upi")}
            className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer border 
            ${method === "upi" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}
          >
            <div className="flex items-center gap-3">
              <Smartphone className="text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-800">UPI</p>
                <p className="text-sm text-slate-500">Pay via Google Pay, PhonePe</p>
              </div>
            </div>
            <input type="radio" checked={method === "upi"} readOnly />
          </div>

          {/* === CARD === */}
          <div
            onClick={() => setMethod("card")}
            className={`flex items-center justify-between p-4 mb-4 rounded-xl cursor-pointer border 
            ${method === "card" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-800">Credit / Debit Card</p>
                <p className="text-sm text-slate-500">Visa, Mastercard, RuPay</p>
              </div>
            </div>
            <input type="radio" checked={method === "card"} readOnly />
          </div>

          {/* === COD === */}
          <div
            onClick={() => setMethod("cod")}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border 
            ${method === "cod" ? "border-indigo-600 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}
          >
            <div className="flex items-center gap-3">
              <Wallet className="text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-800">Cash on Delivery</p>
                <p className="text-sm text-slate-500">Pay when you receive</p>
              </div>
            </div>
            <input type="radio" checked={method === "cod"} readOnly />
          </div>

          {/* === SECURE INFO === */}
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="text-green-600" size={18} />
            100% Secure Payments
          </div>
        </div>

        {/* ===== RIGHT: ORDER SUMMARY ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹2,499</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹120</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-slate-800 text-base">
              <span>Total</span>
              <span>₹2,619</span>
            </div>
          </div>

          <button
            className="w-full mt-6 bg-black text-white py-3 rounded-xl 
            hover:bg-slate-900 transition font-semibold shadow-lg"
          >
            Pay ₹2,619
          </button>

          <p className="text-xs text-center text-slate-400 mt-3">
            By placing order you agree to our terms & conditions
          </p>
        </div>

      </div>
    </div>
  );
}

export default Payment;
