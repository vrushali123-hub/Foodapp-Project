import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  // image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hosting_key)
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      // const postMenuItem = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your item updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      
      }
    }
  };
  return (

 <div className="w-full md:w-[870px] px-8 py-8 mx-auto bg-white shadow-xl rounded-2xl">

<h2 className="text-3xl font-bold text-center mb-8">
Update <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
Menu Item
</span>
</h2>

      {/* form here */}

<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

<div className="form-control w-full">

<label className="label">
<span className="label-text text-xl font-bold text-gray-800 tracking-wide">
Recipe Name
</span>
</label>


<input
type="text"
defaultValue={item.name}
{...register("name",{required:true})}
placeholder="Recipe Name"
className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-400"
/>

</div>



          {/* 2nd row */}
      
<div className="grid md:grid-cols-2 gap-6">

<div>

<label className="label">
<span className="label-text text-xl font-bold text-gray-800 tracking-wide">
Category
</span>
</label>

<select
defaultValue={item.category}
{...register("category",{required:true})}
className="select select-bordered w-full focus:ring-2 focus:ring-green-400"
>


<option value="salad">Salad</option>
<option value="pizza">Pizza</option>
<option value="soup">Soup</option>
<option value="dessert">Dessert</option>
<option value="drinks">Drinks</option>

</select>

</div>


<div>

            {/* prices */}

<label className="label">
<span className="label-text text-xl font-bold text-gray-800 tracking-wide">
Price
</span>
</label>


<input
type="number"
defaultValue={item.price}
{...register("price",{required:true})}
className="input input-bordered w-full focus:ring-2 focus:ring-green-400"
/>

</div>

</div>


<div>

<label className="label">
<span className="label-text text-xl font-bold text-gray-800 tracking-wide">
Recipe Details
</span>
</label>

<textarea
defaultValue={item.recipe}
{...register("recipe",{required:true})}
className="textarea textarea-bordered w-full h-28 focus:ring-2 focus:ring-green-400"
/>

</div>


<div>
<label className="label">
<span className="label-text text-xl font-bold text-gray-800 tracking-wide">
Upload Image
</span>
</label>


<input
type="file"
{...register("image",{required:true})}
className="file-input file-input-bordered file-input-warning w-full bg-orange-50 hover:bg-orange-100"
/>


</div>

<button className="btn w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white text-lg font-semibold rounded-xl transition duration-300 border-0">

Update Item <FaUtensils className="ml-2"/>

</button>



</form>

</div>

);
};
export default UpdateMenu;