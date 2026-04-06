import React from "react";
import { FaHome, FaUtensils, FaUsers, FaClipboardList } from "react-icons/fa";
// import { Outlet } from "react-router-dom";
// import { Link } from "react-router-dom";
import { FaTrash, FaUserShield } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
  return (

<div className="flex min-h-screen bg-gray-100">

{/* Sidebar */}

<div className="w-64 bg-gray-900 text-white p-5">

<div className="flex items-center gap-3 border-b pb-4">

<img 
src="/images/logo.png"
alt="logo"
className="w-12 h-12 rounded"
/>

<span className="bg-blue-500 px-3 py-1 rounded text-sm">
Admin
</span> 




</div>

<div className="mt-6 space-y-4">

<p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaHome/>
Dashboard
</p>

<p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaClipboardList/>
Manage Bookings
</p>

{/* <p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaUtensils/>
Add Menu
</p> */}


<Link 
to="/dashboard/Add-menu"
className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer"
>
<FaUsers/>
Add-Menu
</Link>


<Link 
to="/dashboard/Manage-Items"
className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer"
>
<FaUsers/>
Manage-Items
</Link>






{/* 
<p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaUtensils/>
Manage Items
</p> */}

{/* <p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaUsers/>
All Users
</p> */}

<Link 
to="/dashboard/users"
className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer"
>
<FaUsers/>
All Users
</Link>

<hr/>

<p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaHome/>
Dashboard
</p>

<p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaUtensils/>
Menu
</p> 


<p className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded cursor-pointer">
<FaClipboardList/>
Order Tracking
</p>


{/* <button
onClick={()=>handleDeleteUser(user)}
className="bg-red-500 text-white p-2 rounded"
>

<FaTrash/>

</button> */}





</div>

</div>

{/* Main Content */}

{/* <div className="flex-1 p-10">

<h1 className="text-3xl font-bold text-gray-800">
Dashboard
</h1> */}

{/* <div className="mt-6 bg-white p-6 rounded shadow">

<p>Welcome to Admin Dashboard</p> */}

{/* <div className="flex items-center justify-center h-[70vh]">

<h1 className="text-5xl font-extrabold text-center text-gray-800">

<span className="border-b-4 border-orange-500 pb-2">
Welcome to Admin Dashboard 🚀
</span>

</h1>

</div> */}

{/* <p className="text-lg text-gray-500 mt-2 font-medium tracking-wide">
Welcome to <span className="text-orange-500 font-semibold">Admin Dashboard 🚀</span>
</p>

</div> */}

<div className="flex-1 p-10">

<h1 className="text-3xl font-bold text-gray-800">
Dashboard
</h1>

<p className="text-lg text-gray-500 mt-2 font-medium tracking-wide">
Welcome to <span className="text-orange-500 font-semibold">Admin Dashboard 🚀</span>
</p> 



<Outlet/>

</div>








</div>

// </div>

// </div>

  );
};

export default Dashboard;