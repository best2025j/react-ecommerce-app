// src/pages/UserDetails.jsx (or any component file)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../features/auth/authSlice";

const UserDetails = () => {
  const dispatch = useDispatch();

  const { selectedUser, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const userId = "64fa3c4ab7e3f7e889defa44"; // replace with dynamic user ID
    const token = localStorage.getItem("token");

    dispatch(getUserById({ userId, token }));
  }, [dispatch]);

  if (isLoading) return <p>Loading user...</p>;
  if (isError) return <p>Error: {errorMessage}</p>;

  return (
    <div>
      <h1>User Details</h1>
      {selectedUser ? (
        <div>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          {/* Add more fields if needed */}
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default UserDetails;
