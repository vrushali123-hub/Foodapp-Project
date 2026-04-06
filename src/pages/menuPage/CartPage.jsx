/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {

const { user } = useContext(AuthContext);
const [cart, refetch] = useCart();

const calculateTotalPrice = (item)=>{
return item.price * item.quantity;
};

const handleIncrease = async(item)=>{

await fetch(`http://localhost:6001/carts/${item._id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
quantity:item.quantity+1
})

});

refetch();
};

const handleDecrease = async(item)=>{

if(item.quantity>1){

await fetch(`http://localhost:6001/carts/${item._id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
quantity:item.quantity-1
})

});

refetch();

}

};

const cartSubtotal = cart.reduce((total,item)=>{

return total + calculateTotalPrice(item);

},0);

const orderTotal = cartSubtotal;

const handleDelete=(item)=>{

Swal.fire({

title:"Are you sure?",

text:"You won't be able to revert this!",

icon:"warning",

showCancelButton:true,

confirmButtonColor:"#22c55e",

cancelButtonColor:"#ef4444",

confirmButtonText:"Yes delete"

}).then((result)=>{

if(result.isConfirmed){

axios
.delete(`http://localhost:6001/carts/${item._id}`)
.then(()=>{

refetch();

Swal.fire(
"Deleted!",
"Item removed",
"success"
);

});

}

});

};

return (

<div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">

{/* banner */}

<div
className="bg-cover bg-center h-[300px] rounded-xl"
style={{
backgroundImage:
"url(https://beyondtype1.org/wp-content/uploads/2024/09/FAST-FOOD-CHAIN-NUTRITION-GUIDE-HEADER.jpg)"
}}
>

<div className="h-full bg-black/50 flex flex-col items-center justify-center rounded-xl">

<div className="text-center px-4 space-y-5 text-white">

<h2 className="md:text-5xl text-4xl font-bold md:leading-snug">

Items Added to The<span className="text-green-400">
      Cart
</span>

</h2>

</div>

</div>

</div>

{/* cart table */}

{cart.length>0 ?(

<div>

<div className="overflow-x-auto mt-10">

<table className="table">

<thead className="bg-green-500 text-white">

<tr>

<th>#</th>

<th>Food</th>

<th>Item Name</th>

<th>Quantity</th>

<th>Price</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{cart.map((item,index)=>(

<tr key={index}
className="hover:bg-gray-100">

<td>
{index+1}
</td>

<td>

<img
src={item.image}
className="w-14 h-14 rounded-lg"
/>

</td>

<td className="font-medium">
{item.name}
</td>

<td>

<div className="flex items-center">

<button

onClick={()=>handleDecrease(item)}

className="bg-red-500 text-white w-7 h-7 rounded"

>

-

</button>

<input

value={item.quantity}

readOnly

className="w-10 text-center border mx-2 rounded"

/>

<button

onClick={()=>handleIncrease(item)}

className="bg-green-500 text-white w-7 h-7 rounded"

>

+

</button>

</div>

</td>

<td className="font-semibold text-green-600">

${calculateTotalPrice(item).toFixed(2)}

</td>

<td>

<button

onClick={()=>handleDelete(item)}

className="text-red-500 text-lg"

>

<FaTrash/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

<hr className="my-10"/>

<div className="flex flex-col md:flex-row justify-between items-start gap-10">

<div className="space-y-3">

<h3 className="text-lg font-semibold">

Customer Details

</h3>

{/* <p>
Name :
{user?.displayName || "None"}
</p> */}

<p className="text-base">
<span className="font-semibold">Name :</span> {user?.displayName || "None"}
</p>



<p className="text-base">
<span className="font-semibold">Email :</span> {user?.email}
</p>

<p className="text-base">
<span className="font-semibold">User ID :</span> {user?.uid}
</p>

</div>

<div className="space-y-3">

<h3 className="text-lg font-semibold">

Shopping Details

</h3>

<p>
Total Items :
{cart.length}
</p>

<p>

Total Price :

<span className="text-green-600 font-bold">

${orderTotal.toFixed(2)}

</span>

</p>
  <Link to="/process-checkout">
  
  <button
className="px-10 py-3 rounded-lg text-white font-semibold
bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600
hover:scale-105 transition duration-300 shadow-lg"
>
Proceed to Checkout →

</button>
  
  </Link>



</div>

</div>

</div>

):( 

<div className="text-center mt-20">

<p>
Cart is empty
</p>

<Link to="/menu">

<button className="bg-green-500 text-white px-6 py-2 rounded mt-3">

Back to Menu

</button>

</Link>

</div>

)}

</div>

);

};

export default CartPage;