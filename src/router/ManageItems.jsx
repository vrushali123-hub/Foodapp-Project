import React from "react";
import useMenu from "../hooks/useMenu";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageItems = () => {

const [menu, , refetch] = useMenu();
const axiosSecure = useAxiosSecure();

const handleDeleteItem = (item) => {

Swal.fire({
title: "Are you sure?",
text: "You won't be able to revert this!",
icon: "warning",
showCancelButton: true,
confirmButtonColor: "#22c55e",
cancelButtonColor: "#ef4444",
confirmButtonText: "Yes Delete"
}).then(async (result) => {

if (result.isConfirmed) {

const res = await axiosSecure.delete(`/menu/${item._id}`);

if (res) {

refetch();

Swal.fire({
title: "Deleted!",
text: "Item removed successfully",
icon: "success"
});

}

}

});

};

return (

<div className="w-full md:w-[1000px] px-6 mx-auto bg-white shadow-xl rounded-2xl p-8">

<h2 className="text-3xl font-bold mb-6 text-gray-700 border-b pb-3">

Manage All <span className="text-green-500">Menu Items</span>

</h2>

<div className="overflow-x-auto">

<table className="table">

<thead className="bg-green-500 text-white">

<tr>

<th>#</th>

<th>Image</th>

<th>Item Name</th>

<th>Price</th>

<th>Edit</th>

<th>Delete</th>

</tr>

</thead>

<tbody>

{menu?.map((item, index) => (

<tr 
key={item._id}
className="hover:bg-gray-100 transition duration-300"
>

<th className="font-semibold">
{index + 1}
</th>

<td>

<div className="avatar">

<div className="w-16 h-16 rounded-xl shadow-md">

<img src={item.image} alt="" />

</div>

</div>

</td>

<td className="font-semibold text-gray-700">

{item.name}

</td>

<td className="text-green-600 font-bold">

${item.price}

</td>

<td>

<Link to={`/dashboard/update-menu/${item._id}`}>

<button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg shadow-md transition">

<FaEdit size={18}/>

</button>

</Link>

</td>

<td>

<button

onClick={() => handleDeleteItem(item)}

className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg shadow-md transition"

>

<FaTrashAlt size={18}/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

};

export default ManageItems;