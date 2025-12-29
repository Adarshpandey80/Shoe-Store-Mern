import { useSelector } from "react-redux";
import axios from "axios";
const CheckOut = () => {
  const myCart = useSelector((state) => state.cart.cartItem);

  let totalAmount = 0;
    let proName="";
    let proImg="";

  myCart.forEach((item) => {
       totalAmount += item.price * item.qnty;
       proName+=item.name+", ";
        proImg=item.image;
  });


    const initPay = (data) => {
  const options = {
    key : "rzp_test_RvRurWrKcudxY0",
    //  amount: data.amount,
    currency: data.currency,
    name: proName,
    description: "Test",
    image:proImg,
    order_id: data.id,
    handler: async (response) => {
      try {
        const verifyURL = "http://localhost:8080/payment/verify";
        const {data} = await axios.post(verifyURL,response);
      } catch(error) {
        console.log(error);
      }
    },
    theme: {
      color: "#3399cc",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};



   const handlePay = async () => {
  try {
    const orderURL = "http://localhost:8000/payment/orders";
    const {data} = await axios.post(orderURL, {amount: totalAmount});
    console.log(data);
    initPay(data.data);
  } catch (error) {
    console.log(error);
  }
};



  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT: PRODUCT LIST */}
        <div className="md:col-span-2 space-y-4">
          {myCart.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Quantity: {item.qnty}
                </p>
                <p className="text-sm text-gray-500">
                  Price: ₹{item.price}
                </p>
              </div>

              <div className="text-right font-semibold">
                ₹{item.price * item.qnty}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition" 
           onClick={handlePay}
          >
            Make Payment
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Secure payments • 100% safe checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
