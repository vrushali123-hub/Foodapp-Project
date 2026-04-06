import React, { createContext, useEffect, useState } from 'react';
import { 
GoogleAuthProvider, 
createUserWithEmailAndPassword, 
getAuth, 
onAuthStateChanged, 
signInWithEmailAndPassword, 
signInWithPopup, 
signOut, 
updateProfile 
} from 'firebase/auth';

import app from '../firebase/firebase.config';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

const createUser = (email, password) => {
setLoading(true);
return createUserWithEmailAndPassword(auth, email, password);
}

const signUpWithGmail = () => {
setLoading(true);
return signInWithPopup(auth, googleProvider);
}

const login = (email, password) =>{
setLoading(true);
return signInWithEmailAndPassword(auth, email, password);
}

const logOut = () =>{
localStorage.removeItem("access-token");
return signOut(auth);
}

// update profile
const updateUserProfile = (name, photoURL) => {
return updateProfile(auth.currentUser,{
displayName:name,
photoURL:photoURL
})
}

// JWT + Auth state
useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{

setUser(currentUser);

if(currentUser?.email){

fetch("http://localhost:6001/jwt",{

method:"POST",

headers:{
"content-type":"application/json"
},

body:JSON.stringify({
 email:currentUser.email,
 name:currentUser.displayName
})
// body:JSON.stringify({
// email:currentUser.email
// })

})
.then(res=>res.json())
.then(data=>{

localStorage.setItem("access-token",data.token);

setLoading(false);

})
.catch(error=>{
console.log(error);
setLoading(false);
})

}

else{

localStorage.removeItem("access-token");

setLoading(false);

}

});

return () => unsubscribe();

},[])

const authInfo = {

user,
loading,
createUser,
login,
logOut,
signUpWithGmail,
updateUserProfile

}

return (

<AuthContext.Provider value={authInfo}>
{children}
</AuthContext.Provider>

);

};

export default AuthProvider;