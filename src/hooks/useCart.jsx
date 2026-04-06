
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            // const res = await fetch(`http://localhost:6001/carts?email=${user?.email}`)
            // return res.json();
const token = localStorage.getItem("access-token");

const res = await fetch(`http://localhost:6001/carts?email=${user?.email}`,{
    headers:{
        authorization:`Bearer ${token}`
    }
})

const data = await res.json();

return Array.isArray(data) ? data : [];
      },
     })

    return [cart, refetch]

}
export default useCart;
