import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Order = () => {

const { user } = useAuth();
const token = localStorage.getItem("access-token");

const { data: orders = [] } = useQuery({
queryKey: ["orders", user?.email],
queryFn: async () => {

const res = await fetch(
`http://localhost:6001/payments?email=${user?.email}`,
{
headers:{
authorization:`Bearer ${token}`
}
}
);

return res.json();

}
});

const formatDate=(createdAt)=>{
const createdAtDate = new Date(createdAt);
return createdAtDate.toLocaleDateString();
}

return (

<div className="max-w-screen-2xl mx-auto px-6 py-16">

{/* Header */}

<div 
className="rounded-[20px] shadow-2xl mb-14 text-white"
style={{

backgroundImage:
"url('https://t4.ftcdn.net/jpg/02/92/74/19/360_F_292741930_eODxgfFT41CRil8eOww1o2UWX0Ers7kM.jpg')",

backgroundSize:"cover",

backgroundPosition:"center"

}}
>

<div className="py-24 text-center space-y-6 bg-black/60 rounded-[20px]">

<h2 className="text-5xl font-bold">

Order <span className="text-indigo-400">
History
</span>

</h2>

<p className="text-gray-200">

Track all your premium food orders here

</p>

</div>

</div>

{/* Conditional */}

{orders?.length > 0 ?(

<div className="bg-white shadow-2xl rounded-[20px] p-8">

{/* Table */}

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

<th className="p-4 text-left">#</th>

<th className="p-4 text-left">Date</th>

<th className="p-4 text-left">Transaction ID</th>

<th className="p-4 text-left">Amount</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Contact</th>

</tr>

</thead>

<tbody>

{orders.map((item,index)=>(

<tr
key={index}
className="border-b hover:bg-indigo-50 transition"
>

<td className="p-4 font-semibold text-indigo-600">
{index+1}
</td>

<td className="p-4">
{formatDate(item.createdAt)}
</td>

<td className="p-4 text-gray-500">
{item.transitionId}
</td>

<td className="p-4 font-bold text-indigo-700">
₹{item.price}
</td>

<td className="p-4">

<span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm">

{item.status}

</span>

</td>

<td className="p-4">

<Link
to="/contact"
className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm shadow hover:scale-105 transition"
>

Contact

</Link>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* Bottom cards */}

<div className="grid md:grid-cols-2 gap-10 mt-14">

{/* User card */}

<div className="bg-gradient-to-br from-[#020617] to-[#1e293b] text-white p-8 rounded-xl shadow-xl">

<h3 className="text-xl mb-4 text-indigo-300 font-semibold">

User Details

</h3>

<p>Name : {user?.displayName}</p>

<p>Email : {user?.email}</p>

<p className="text-xs">
ID : {user?.uid}
</p>

</div>

{/* Order summary */}

<div className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-8 rounded-xl shadow-xl">

<h3 className="text-xl mb-4 font-semibold">

Order Summary

</h3>

<p>
Total Orders :
<span className="ml-2 font-bold">
{orders.length}
</span>
</p>

<p className="mt-2">

Account :
<span className="ml-2">
Premium Customer
</span>

</p>

</div>

</div>

</div>

):( 

<div className="text-center bg-white shadow-xl rounded-xl p-20">

<h3 className="text-2xl font-semibold">

No Orders Found

</h3>

<p className="text-gray-500 mt-3">

Start ordering delicious food now

</p>

<Link to="/menu">

<button className="mt-8 px-10 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow hover:scale-105 transition">

Order Food

</button>

</Link>

</div>

)}

</div>

);

};

export default Order;