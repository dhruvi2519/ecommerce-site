import React, { useEffect, useState } from "react";

import "./Profile.css";
import { api } from "../../config/apiConfig";

const SellerAccount = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userId", userId);

    api
      .get(`http://localhost:5000/user/auth/profile/${userId}`)
      .then((response) => {
        console.log("response", response);
        setUserData(response.data.data.user);
        setUpdatedUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    api
      .put(`http://localhost:5000/user/auth/update/${userId}`, updatedUserData)
      .then((response) => {
        setUserData(response.data.data.user);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  return (
    <div className="profile-container">
      {console.log("userData", userData)}
      {userData ? (
        <div className="profile">
          <h1>Profile</h1>
          <div className="profile-details">
            <div>
              <strong>Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="firstname"
                  value={updatedUserData.name}
                  onChange={handleChange}
                />
              ) : (
                <span>{userData.firstname}</span>
              )}
            </div>
            <div>
              <strong>Email:</strong>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={updatedUserData.email}
                  onChange={handleChange}
                />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>
            {/* Add more user details as needed */}
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default SellerAccount;
