import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const [user, setuser] = useState("");
     const navigate = useNavigate();
     

    useEffect(() => {
      axios.defaults.withCredentials = true;
      const logout = async () => {
          try {
              const response = await axios.get("https://mern-ecommerce-rnup.onrender.com/users/logout");
              setuser(response.data);
              console.log(response.data);
              if(response.data === "User Logged Out"){
                navigate("/home")
              }
              else if(response.data === "No one is logged in"){
                alert("No one is logged in");
              }
          } catch (error) {
              console.error("Logout error:", error.response.data);
          }
      };
  
      logout();
  }, []);
  
  return (
    <div>Logout</div>
  )
}

export default Logout