"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/supabase/config";

const roles = ["Super Admin", "Admin Users", "Account Manager"];
const tabs = [
  "DASHBOARD",
  "EXHIBITOR",
  "OEM",
  "DELEGATES",
  "VISITORS",
  "SPEAKERS",
  "VENDORS",
  "SESSIONS",
  "STALLS",
  // "SETTINGS",
];

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 overflow-scroll ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 mt-20 ">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Settings = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
    access: [],
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUserAccess();
  }, []);

  const fetchUserAccess = async () => {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setUsers(data); // Ensure data is an array
    } else {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setNewUser((prev) => ({
        ...prev,
        access: checked
          ? [...prev.access, value]
          : prev.access.filter((tab) => tab !== value),
      }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("user").insert([
      {
        user_id: newUser.username,
        password: newUser.password,
        role: newUser.role,
        access: newUser.access,
      },
    ]);

    if (data) {
      alert("User added");
      setUsers([...users, ...data]); // Append new user to users array
      setIsAddModalOpen(false); // Close the modal after adding the user
    } else {
      console.error("Error adding user:", error);
    }

    setNewUser({ username: "", password: "", role: "", access: [] });
  };

  const handleEditUser = async (e) => {
    console.log("currentUser.user_id", currentUser.user_id);
    e.preventDefault();
    const { data, error } = await supabase
      .from("user")
      .update({
        password: newUser.password,
        role: newUser.role,
        access: newUser.access,
      })
      .eq("user_id", currentUser.user_id)
      .select();

    if (data) {
      alert("User updated");
      fetchUserAccess();
      setIsEditModalOpen(false);
      window.location.reload();
    } else {
      console.error("Error updating user:", error);
    }

    setNewUser({ username: "", password: "", role: "", access: [] });
    setCurrentUser(null);
  };

  const handleDeleteUser = async () => {
    const { error } = await supabase
      .from("user")
      .delete()
      .eq("user_id", currentUser.user_id);

    if (!error) {
      alert("User deleted");
      fetchUserAccess(); // Refresh user list
      setIsDeleteModalOpen(false); // Close the modal after deleting the user
    } else {
      console.error("Error deleting user:", error);
    }

    setCurrentUser(null);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setNewUser({
      username: user.user_id,
      password: user.password,
      role: user.role,
      access: JSON.parse(user.access),
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">User Settings</h2>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-6"
      >
        Add User
      </button>

      {/* Add User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <form onSubmit={handleAddUser}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="Access">
              <b>Access tabs :</b>
            </label>
            {tabs.map((tab) => (
              <label key={tab} className="block mb-2">
                <input
                  type="checkbox"
                  name="access"
                  value={tab}
                  checked={newUser.access.includes(tab)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {tab}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleEditUser}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
              disabled
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              className="mb-2 p-2 border rounded w-full"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="Access">
              <b>Access tabs :</b>
            </label>
            {tabs.map((tab) => (
              <label key={tab} className="block mb-2">
                <input
                  type="checkbox"
                  name="access"
                  value={tab}
                  checked={newUser.access.includes(tab)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {tab}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Edit User
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="mb-4">
          <p>Are you sure you want to delete the user?</p>
        </div>
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </Modal>

      <div>
        <h3 className="text-xl font-semibold mb-4">Users</h3>
        {Array.isArray(users) &&
          users.map((user, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <p>
                <span className="font-semibold">Username:</span> {user.user_id}
              </p>
              <p>
                <span className="font-semibold">Password:</span> {user.password}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {user.role}
              </p>
              <p>
                <span className="font-semibold">Access:</span>{" "}
                {JSON.parse(user.access).join(", ")}
              </p>
              <button
                onClick={() => openEditModal(user)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(user)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Settings;
