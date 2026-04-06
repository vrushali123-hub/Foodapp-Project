 import React, { useEffect, useState } from "react";
 import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("price is not a number");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("success");
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent.id);
      setCardError(`Your transaction id is ${paymentIntent.id}`);
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };
      console.log(paymentInfo);
      // send info to backend
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        navigate("/order");
        alert("payment successfull");
      });
    }
  };


  return (

<div className="flex flex-col sm:flex-row justify-between gap-10 p-10 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-200"
style={{
backgroundImage:"url('https://plus.unsplash.com/premium_vector-1726875334685-56c29d78b736?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D')",
backgroundSize:"cover",
backgroundPosition:"center"
}}
>
    
<div className="md:w-1/2 w-full space-y-5 bg-white/80 p-6 rounded-2xl shadow-lg">

<h4 className="text-2xl font-bold text-green-700 tracking-wide border-b pb-2">
Order Summary
</h4>

<p className="text-gray-700 text-lg font-medium">
Total Price : 
<span className="font-bold text-green-600 ml-2 text-xl">
${price}
</span>
</p>

<p className="text-gray-700 text-lg font-medium">
Items : 
<span className="font-bold text-blue-600 ml-2">
{cart.length}
</span>
</p>

<p className="text-sm text-gray-500 mt-4 font-medium">
🔒 Secure payment powered by Stripe
</p>

</div>


{/* right side */}

<div className="md:w-1/2 w-full space-y-4 card shrink-0 w-full max-w-sm shadow-2xl bg-white px-6 py-8 rounded-2xl border">

<h4 className="text-2xl text-gray-800 font-bold tracking-wide">
Process your payment
</h4>

<h5 className="font-semibold text-gray-600 text-md">
Credit / Debit Card
</h5>


<form onSubmit={handleSubmit} className="space-y-4">

<div className="border rounded-lg p-4 bg-gray-50 focus-within:border-green-500 transition">

<CardElement
options={{
style:{
base:{
fontSize:"18px",
color:"#1f2937",
fontFamily:"Poppins, sans-serif",
"::placeholder":{
color:"#9ca3af",
}
},
invalid:{
color:"#ef4444",
}
}
}}
/>

</div>

<button
type="submit"
disabled={!stripe}
className="w-full py-3 mt-3 bg-green-600 hover:bg-green-700 transition duration-300 rounded-xl text-white font-semibold text-lg shadow-md"
>

Pay ${price}

</button>

</form>

{cardError && 
<p className="text-red-500 text-sm font-medium">
{cardError}
</p>
}


<div className="mt-6 text-center">

<hr className="mb-4"/>

<button 
type="submit" 
className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 transition rounded-xl text-black font-semibold flex items-center gap-2 justify-center shadow"
>

<FaPaypal size={18}/> 
Pay with PayPal

</button>

</div>

</div>

</div>

);
};

export default CheckoutForm;
