/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
// import { FaHeart } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";  
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2'
import useCart from "../hooks/useCart";
import axios from 'axios';

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const {user} = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(item)
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // add to cart handler
  const handleAddToCart = item => {
    // console.log(item);
    if(user && user.email){
        const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}

        // axios.post('http://localhost:6001/carts', cartItem)

     const token = localStorage.getItem("access-token");

axios.post(
'http://localhost:6001/carts',
cartItem,
{
headers:{
authorization:`Bearer ${token}`
}
}
)


        .then((response) => {
          console.log(response);
          if(response){
            refetch(); // refetch cart
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Food added on the cart.',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
        })
        .catch( (error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    else{
        Swal.fire({
            title: 'Please login to order the food',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from: location}})
            }
          })
    }
}

//   return (
//     <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
//       <div
//         className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
//           isHeartFilled ? "text-rose-500" : "text-white"
//         }`}
//         onClick={handleHeartClick}
//       >
//         <FaHeart className="w-5 h-5 cursor-pointer" />
//       </div>
//       <Link to={`/menu/${item._id}`}>
//         <figure>
//           <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72" />
//         </figure>
//       </Link>
//       <div className="card-body">
//        <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
//         <p>Description of the item</p>
//         <div className="card-actions justify-between items-center mt-2">
//           <h5 className="font-semibold">
//             <span className="text-sm text-red">$ </span> {item.price}
//           </h5>
//           <button onClick={() => handleAddToCart(item)} className="btn bg-green text-white">Add to Cart </button>
//         </div>
//       </div>
//     </div>
//   );
// };



return (

<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 relative mr-5 md:my-5 overflow-hidden group">

{/* Heart button */}

<div
className="absolute right-3 top-3 z-10 p-3 rounded-full bg-white shadow-md cursor-pointer"
onClick={handleHeartClick}
>

{
isHeartFilled 

? <FaHeart className="w-5 h-5 text-red-600 hover:text-red-700 transition"/>
: <FaRegHeart className="w-5 h-5 text-gray-400 hover:text-red-500 transition"/>

}
</div>

{/* Image */}

<Link to={`/menu/${item._id}`}>

<figure className="overflow-hidden">

<img 
src={item.image} 
alt=""
className="w-full md:h-64 object-cover group-hover:scale-110 transition duration-500"
/>

</figure>

</Link>

{/* Card body */}

<div className="p-5">

<Link to={`/menu/${item._id}`}>

<h2 className="text-xl font-bold text-gray-800 hover:text-green-600 transition">
{item.name}
</h2>

</Link>

<p className="text-gray-500 text-sm mt-2">
Delicious food item available now
</p>

<div className="flex justify-between items-center mt-4">

<h5 className="font-bold text-xl text-yellow-500 drop-shadow-md">

<span className="text-sm">$</span> {item.price}

</h5> 


<button
onClick={() => handleAddToCart(item)}
className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-5 py-2 rounded-full shadow-xl hover:scale-110 transition"
>

Add to Cart

</button>

</div>

</div>

</div>

);
};


export default Cards;





