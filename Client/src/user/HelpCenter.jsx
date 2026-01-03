import React from "react"
import { Search, Package, RotateCcw, CreditCard, Headphones } from "lucide-react"

function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-8">
      
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ===== HEADER ===== */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Help Center
          </h1>
          <p className="text-gray-500 mt-1">
            How can we help you today?
          </p>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for orders, returns, payments..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border 
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* ===== HELP CATEGORIES ===== */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Popular Topics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition cursor-pointer">
              <Package className="w-7 h-7 text-indigo-600" />
              <h3 className="mt-3 font-semibold">Orders</h3>
              <p className="text-sm text-gray-500 mt-1">
                Track, cancel or return items
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition cursor-pointer">
              <RotateCcw className="w-7 h-7 text-green-600" />
              <h3 className="mt-3 font-semibold">Returns</h3>
              <p className="text-sm text-gray-500 mt-1">
                Return & refund policies
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition cursor-pointer">
              <CreditCard className="w-7 h-7 text-purple-600" />
              <h3 className="mt-3 font-semibold">Payments</h3>
              <p className="text-sm text-gray-500 mt-1">
                Wallets, cards & refunds
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition cursor-pointer">
              <Headphones className="w-7 h-7 text-pink-600" />
              <h3 className="mt-3 font-semibold">Support</h3>
              <p className="text-sm text-gray-500 mt-1">
                Contact customer care
              </p>
            </div>

          </div>
        </div>

        {/* ===== FAQ SECTION ===== */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            <div className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium">
                How do I track my order?
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Go to Orders → Select item → Track shipment.
              </p>
            </div>

            <div className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium">
                How can I return a product?
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Visit Orders → Return → Choose reason.
              </p>
            </div>

            <div className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium">
                When will I get my refund?
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Refunds are processed within 5–7 business days.
              </p>
            </div>
          </div>
        </div>

        {/* ===== CONTACT SUPPORT ===== */}
        <div className="bg-indigo-600 rounded-2xl shadow p-6 text-white">
          <h2 className="text-xl font-semibold">
            Still need help?
          </h2>
          <p className="text-indigo-200 mt-1">
            Our support team is available 24/7
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button className="bg-white text-indigo-600 px-6 py-3 
              rounded-xl font-semibold hover:bg-gray-100 transition">
              Chat with Support
            </button>

            <button className="border border-white px-6 py-3 
              rounded-xl font-semibold hover:bg-indigo-500 transition">
              Request a Call
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HelpCenter
