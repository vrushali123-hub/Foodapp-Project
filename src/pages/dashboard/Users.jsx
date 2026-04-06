// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { FaTrash, FaUserShield } from "react-icons/fa";
// import axios from "axios";

// // const Users = () => {

// // const [users,setUsers] = useState([]);

// //  useEffect(()=>{

// // fetch("http://localhost:6001/users")
// // .then(res=>res.json())
// // .then(data=>setUsers(data))

// // },[])


// // const handleDeleteUser = (user)=>{

// // if(!window.confirm("Are you sure ?")) return;

// // fetch(`http://localhost:6001/users/${user._id}`,{

// // method:"DELETE"

// // })
// // .then(res=>res.json())

// // .then(data=>{

// // if(data.deletedCount > 0){

// // alert("User Deleted");

// // setUsers(users.filter(u=>u._id !== user._id))

// // }

// // })

// // }

// const handleDeleteUser = (user)=>{

// if(!window.confirm("Are you sure you want to delete this user?")) return;

// fetch(`http://localhost:6001/users/${user._id}`,{

// method:"DELETE"

// })
// .then(res=>res.json())

// .then(data=>{

// if(data.deletedCount > 0){

// alert(user.name + " deleted successfully ✅");

// setUsers(users.filter(u=>u._id !== user._id))

// }

// })

// }





// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState(""); // For delete message

//   // Fetch users from backend
//   useEffect(() => {
//     fetch("http://localhost:6001/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//   }, []);

//   // Delete user function
//   const handleDelete = (id) => {
//     fetch(`http://localhost:6001/users/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.deletedCount > 0) {
//           // Update state to remove deleted user
//           setUsers(users.filter((user) => user._id !== id));

//           // Show temporary message
//           setMessage("User deleted successfully!");

//           // Hide message after 3 seconds
//           setTimeout(() => {
//             setMessage("");
//           }, 3000);
//         }
//       });
//   };



















// return (

// <div className="p-10 w-full">

// {/* Heading */}

// <div className="flex justify-between mb-6">

// <h2 className="text-2xl font-bold text-gray-700">
// All Users
// </h2>

// <p className="text-gray-500">
// Total users : {users.length}
// </p>

// </div>


// {/* Table */}

// <div className="bg-white rounded-xl shadow-lg overflow-hidden">

// <table className="w-full">

// <thead className="bg-indigo-600 text-white">

// <tr>

//  <th className="py-3">#</th> 

// <th>Name</th>

// <th>Email</th>

// <th>Role</th>

// <th>Action</th>

// </tr>

// </thead>


// <tbody>

// {

// users.map((user,index)=>(

// <tr key={user._id}
// className="text-center border-b hover:bg-gray-100">

// {/* <td className="py-3">
// {index+1}
// </td> */}

// <td className="py-3 text-gray-700">{index + 1}</td>


// {/* 
// <td>
// {user.name}
// </td> */}

// <td className="text-gray-800">{user.name}</td>
// <td className="text-gray-800">{user.email}</td>

// <td>

// <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 mx-auto">

// <FaUserShield/>

// Admin

// </button>

// </td>

// <td>

// <button
// onClick={()=>handleDelete(user._id)}
// className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
// >

// <FaTrash/>

// </button>

// </td>

// </tr>

// ))

// }

// </tbody>

// </table>

// </div>

// </div>

// );

// };

// export default Users;

















import React, { useEffect, useState } from "react";
import { FaTrash, FaUserShield } from "react-icons/fa";

const Users = () => {

const [users,setUsers] = useState([]);
const [message,setMessage] = useState("");


// // Fetch users
// useEffect(()=>{

// fetch("http://localhost:6001/users")
// .then(res=>res.json())
// .then(data=>setUsers(data))

// },[])


// // Delete user
// const handleDelete = (user)=>{

// if(!window.confirm("Are you sure you want to delete this user?")) return;

// fetch(`http://localhost:6001/users/${user._id}`,{

// method:"DELETE"

// })
// .then(res=>res.json())

// .then(data=>{

// if(data.deletedCount > 0){

// // remove user from UI
// setUsers(users.filter(u=>u._id !== user._id))

// // show message
// setMessage(user.name + " deleted successfully ✅")

// // hide after 3 sec
// setTimeout(()=>{

// setMessage("")

// },3000)

// }

// })

// }
// Fetch users
useEffect(()=>{

const token = localStorage.getItem("access-token");

fetch("http://localhost:6001/users",{
headers:{
authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(data=>setUsers(Array.isArray(data)?data:[]))

},[])


// Delete user
const handleDelete = (user)=>{

if(!window.confirm("Are you sure you want to delete this user?")) return;

const token = localStorage.getItem("access-token");

fetch(`http://localhost:6001/users/${user._id}`,{

method:"DELETE",

headers:{
authorization:`Bearer ${token}`
}

})
.then(res=>res.json())

.then(data=>{

if(data.deletedCount > 0){

// remove user from UI
setUsers(users.filter(u=>u._id !== user._id))

// show message
setMessage(user.name + " deleted successfully ✅")

// hide after 3 sec
setTimeout(()=>{

setMessage("")

},3000)

}

})

}




return (

<div className="p-10 w-full">


{/* Message */}

{message && (

<div className="mb-4 p-3 bg-green-100 text-green-700 rounded">

{message}

</div>

)}



{/* Heading */}

<div className="flex justify-between mb-6">

<h2 className="text-2xl font-bold text-gray-700">

All Users

</h2>

<p className="text-gray-500">

Total users : {users.length}

</p>

</div>



{/* Table */}

<div className="bg-white rounded-xl shadow-lg overflow-hidden">

<table className="w-full">

<thead className="bg-indigo-600 text-white">

<tr>

<th className="py-3">#</th>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Action</th>

</tr>

</thead>


<tbody>

{

users.map((user,index)=>(

<tr
key={user._id}
className="text-center border-b hover:bg-gray-100"
>

<td className="py-3 text-gray-700">

{index+1}

</td>


<td className="text-gray-800">

{user.name}

</td>


<td className="text-gray-800">

{user.email}

</td>


<td>

<button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 mx-auto">

<FaUserShield/>

Admin

</button>

</td>


<td>

<button

onClick={()=>handleDelete(user)}

className="bg-red-500 text-white p-2 rounded hover:bg-red-600"

>

<FaTrash/>

</button>

</td>


</tr>

))

}

</tbody>

</table>

</div>

</div>

);

};

export default Users;