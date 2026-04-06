
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main.jsx";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import Order from "../pages/dashboard/Order";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserProfile from "../pages/dashboard/UserProfile";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/dashboard/Users";
import AdminRoute from "./AdminRoute";
import AddMenu from "./AddMenu";
import ManageItems from "./ManageItems";
import UpdateMenu from "../pages/dashboard/UpdateMenu";
import Payment from "../pages/menuPage/Payment";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },

        {
          path: "/order",
          element:<PrivateRoute><Order/></PrivateRoute>
        },

        {
          path: "/update-profile",
          element: <UserProfile/>
        },
        {
          path: "/cart-page",
          element: <CartPage/>
        },

          {
        path: "/process-checkout",
        element: <Payment/>
      },
 

      ],
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },   

// {
// path: "/dashboard",
// element:<PrivateRoute><Dashboard/></PrivateRoute>,
// children:[

// {
// path:"users",   // no slash here
// element:<Users/>
// }

{
path: "/dashboard",

element:

<PrivateRoute>

<AdminRoute>

<Dashboard/>

</AdminRoute>

</PrivateRoute>,

children:[

{
path:"users",
element:<Users/>
},

{
path:"add-menu",
element:<AddMenu/>
},
{
path:"manage-items",
element:<ManageItems/>
},


  {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`http://localhost:6001/menu/${params.id}`),
      },

// {
//  path:"update-menu/:id",
//  element:<UpdateMenu/>,

//  loader: async ({params})=>{
//   const res = await fetch(`http://localhost:6001/menu/${params.id}`);
//   return res.json();
//  }



],

},


  ]);

  export default router;
