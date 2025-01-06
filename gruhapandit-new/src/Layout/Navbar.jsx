import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import Logo from "../assets/GruhapandithIcon.png";
import { IoPersonSharp } from "react-icons/io5";
import axiosInstance from "../axiosInstance"; // Import Axios instance
import DialogueBox from "../Dashboard/DialogueBox";

const Navbar = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const userId = localStorage.getItem("UserId"); // Replace with dynamic userId from your app
  const [isDialogOpen,setIsDialogOpen]=useState(false);

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
    setTimeout(() => {
      setNotificationOpen(false);
    }, 3000);
  };

  useEffect(() => {
    // Fetch the profile image URL
    const fetchProfileImage = async () => {
      const token=localStorage.getItem("Token");
      try {
        const response = await axiosInstance.get(
          `/documents/${userId}/profile-picture`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        // Assuming the response contains the signed URL in response.data
        setProfileImageUrl(response.data); // Set the signed URL
        localStorage.setItem("Profile",response.data);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
      
    };

    fetchProfileImage();
  }, []);

  const handleClick = () => {
    setIsDialogOpen(true);
    console.log("Icon clicked");
   
  };
  

  const handleCloseDialog=()=>{
    setIsDialogOpen(false);
  }

  return (
    <div className="flex justify-between items-center bg-white text-black shadow-md border rounded-lg px-4">
      <div className="flex items-center space-x-2">
        <img
          src={Logo}
          alt="Logo"
          className="w-44 h-14 object-contain"
          style={{
            filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>

      <div className="flex items-center space-x-6">
        <FaBell
          onClick={toggleNotification}
          className="text-blue-500 text-lg cursor-pointer"
        />
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden relative">
  {/* {profileImageUrl ? ( */}
    <img
      src={profileImageUrl}
      alt="Profile"
      className="object-cover mt-0 cursor-pointer"
      onClick={handleClick} 
    />
    <IoPersonSharp 
      className="cursor-wait"
      // onClick={handleClick}      
    />
    
  
</div>

      </div>
      {isNotificationOpen && (
        <div className="absolute top-14 right-8 bg-white p-4 shadow-lg rounded-md z-10">
          <p>No new notifications</p>
        </div>
      )}

      {
        isDialogOpen && (
          <DialogueBox 
          userId={userId}
          category="PROFILE_PICTURE"
          onClose={handleCloseDialog}
          onSubmit={(data)=>{console.log("Submitted data:",data);
            if (data.imageUrl) {
                            setProfileImageUrl(data.imageUrl);
                          }
          }}
          />
        )
      }
    </div>
  );
};

export default Navbar;



// import React, { useEffect, useState } from "react";
// import { FaBell } from "react-icons/fa";
// import Logo from "../assets/GruhapandithIcon.png";
// import { IoPersonSharp } from "react-icons/io5";
// import DialogueBox from "../Dashboard/DialogueBox";
// import axiosInstance from "../axiosInstance";

// const Navbar = () => {
//   const [isNotificationOpen, setNotificationOpen] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [profileImageUrl, setProfileImageUrl] = useState(null);
//   const userId = localStorage.getItem("UserId");

//   const toggleNotification = () => {
//     setNotificationOpen(true);
//     setTimeout(() => {
//       setNotificationOpen(false);
//     }, 3000);
//   };

//   const handleClick = () => {
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//   };

//   useEffect(() => {
//     const fetchProfileImage = async () => {
//       const token = localStorage.getItem("Token");
//       if (!userId || !token) {
//         console.error("User ID or Token is missing");
//         return;
//       }

//       try {
//         const response = await axiosInstance.get(
//           `/documents/${userId}/profile-picture`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           const data = response.data;
//           setProfileImageUrl(data.imageUrl);
//         } else {
//           console.error("Failed to fetch profile image");
//         }
//       } catch (error) {
//         console.error("Error fetching profile image:", error);
//       }
//     };

//     fetchProfileImage();
//   }, [userId]);

//   return (
//     <div className="flex justify-between items-center bg-white text-black shadow-md border rounded-lg px-4">
//       <div className="flex items-center space-x-2">
//         <img
//           src={Logo}
//           alt="Logo"
//           className="w-44 h-14 object-contain"
//           style={{
//             filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))",
//           }}
//         />
//       </div>

//       <div className="flex items-center space-x-6">
//         <FaBell onClick={toggleNotification} className="text-blue-500 text-lg cursor-pointer" />
//         <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
//           {profileImageUrl ? (
//             <img
//               src={profileImageUrl}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <IoPersonSharp
//               className="text-red-500 text-2xl cursor-pointer"
//               onClick={handleClick}
//             />
//           )}
//         </div>
//       </div>

//       {isNotificationOpen && (
//         <div className="absolute top-14 right-8 bg-white p-4 shadow-lg rounded-md z-10">
//           <p>No new notifications</p>
//         </div>
//       )}

//       {isDialogOpen && (
//         <DialogueBox
//           userId={userId}
//           category="PROFILE_PICTURE"
//           onClose={handleCloseDialog}
//           onSubmit={(data) => {
//             console.log("Submitted data:", data);
//             // Update profile image dynamically if `data.imageUrl` is returned
//             if (data.imageUrl) {
//               setProfileImageUrl(data.imageUrl);
//             }
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Navbar;
