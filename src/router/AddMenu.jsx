/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const AddMenu = () => {

const [formData,setFormData] = useState({
name:"",
price:"",
category:"",
image:"",
description:""
});

const handleChange=(e)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
})

}

const handleSubmit=(e)=>{

e.preventDefault();

fetch("http://localhost:6001/menu",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(formData)

})
.then(res=>res.json())
.then(data=>{

alert("Item Added Successfully")

})

}


const [image,setImage] = useState(null);

const handleImage=(e)=>{

setImage(e.target.files[0]);

}

return (

<div className="w-full">

<h1 className="text-3xl font-bold text-gray-800 mb-6">
Add New Menu Item
</h1>

<div className="bg-white p-8 rounded-2xl shadow-lg">

<form onSubmit={handleSubmit} className="space-y-6">

{/* Food Name */}

<div>
<label className="block text-gray-600 mb-2">
User Name
</label>

<input
type="text"
name="name"
onChange={handleChange}
placeholder="Enter Name"
className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-orange-500"
/>

<label className="block text-gray-600 mb-2">
Food Name
</label>


<input
type="text"
name="name"
onChange={handleChange}
placeholder="Enter food name"
className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-orange-500"
/>

</div>


{/* Price + Category */}

<div className="grid grid-cols-2 gap-6">

<div>

<label className="block text-gray-600 mb-2">
Price
</label>

<input
type="number"
name="price"
onChange={handleChange}
placeholder="Enter price"
className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-orange-500"
/>

</div>


<div>

<label className="block text-gray-600 mb-2">
Category
</label>

<select
name="category"
onChange={handleChange}
className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-orange-500"
>

<option>Select Category</option>

<option>Pizza</option>

<option>Burger</option>

<option>Drinks</option>

<option>Dessert</option>

</select>

</div>

</div>


{/* Image */}

<div>

 <label className="block text-gray-600 mb-2">
Image 
</label>  

<input
type="file"
name="image"
onChange={handleImage}
className="w-full border border-gray-300 p-3 rounded-lg"
/>




{/* <input
type="text"
name="image"
onChange={handleChange}
placeholder="Paste image link"
className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-orange-500"
/> */}

</div>


{/* Description */}

<div>

<label className="block text-gray-600 mb-2">
Description
</label>

<textarea
name="description"
onChange={handleChange}
placeholder="Food description"
className="w-full border border-gray-300 p-3 rounded-lg h-32 focus:outline-none focus:border-orange-500"
/>

</div>


{/* Button */}

<button
type="submit"
className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
>

Add Item

</button>

</form>

</div>

</div>

);

};

export default AddMenu;