"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    profileImage: "",
    coverImage: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  const [tempData, setTempData] = useState({ ...formData });

  useEffect(() => {
    if (status === "unauthenticated" && !session) {
      router.push("/login");
    } else if (status === "authenticated" && session?.user) {
      // Fetch user data and populate form
      getData();
    }
  }, [status, session, router]);

  const getData = async () => {
    if (session?.user?.name) {
      let u = await fetchuser(session.user.name);
      if (u) {
        // Ensure all fields have string values, not null/undefined
        const userData = {
          name: u.name || "",
          email: u.email || "",
          username: u.username || "",
          profileImage: u.profileImage || "",
          coverImage: u.coverImage || "",
          razorpayId: u.razorpayId || "",
          razorpaySecret: u.razorpaySecret || "",
        };
        setFormData(userData);
        setTempData(userData);
      }
    }
  };

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard content if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...formData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setFormData({ ...tempData });
    setIsEditing(false);
    let a = await updateProfile(tempData, formData.username);
    if (a && a.error) {
      alert(a.error);
      // Revert username change on error
      setFormData((prev) => ({ ...prev, username: formData.username }));
    } else {
      toast("Profile Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-[75.3vh] md:min-h-[80.3vh] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-300">Manage your profile and settings</p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            {/* Cover Image Preview */}
            <div className="relative h-32 sm:h-40 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-4xl">☕</span>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 -mt-12 relative z-10">
              {/* Profile Picture Preview */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl flex-shrink-0">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt={formData.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      formData.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {formData.name || "User"}
                    </h2>
                    <p className="text-yellow-400">@{formData.username || "username"}</p>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="bg-yellow-400 text-[#2A2146] px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Profile Details */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">
                  Profile Information
                </h3>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={tempData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white px-4 py-3 bg-white/5 rounded-lg">
                        {formData.name || "Not set"}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={tempData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white px-4 py-3 bg-white/5 rounded-lg">
                        {formData.email || "Not set"}
                      </p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={tempData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white px-4 py-3 bg-white/5 rounded-lg">
                        {formData.username || "Not set"}
                      </p>
                    )}
                  </div>

                  {/* Profile Picture URL */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Profile Picture URL
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="profileImage"
                        value={tempData.profileImage}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white px-4 py-3 bg-white/5 rounded-lg break-all">
                        {formData.profileImage || "Not set"}
                      </p>
                    )}
                  </div>

                  {/* Cover Picture URL */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Cover Picture URL
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="coverImage"
                        value={tempData.coverImage}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white px-4 py-3 bg-white/5 rounded-lg">
                        {formData.coverImage || "Not set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Payment Settings
                </h3>

                <div className="space-y-4">
                  {/* Razorpay ID */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Razorpay ID
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="razorpayId"
                        value={tempData.razorpayId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white px-4 py-3 bg-white/5 rounded-lg font-mono text-sm">
                        {formData.razorpayId || "Not set"}
                      </p>
                    )}
                  </div>

                  {/* Razorpay Secret */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Razorpay Secret
                    </label>
                    {isEditing ? (
                      <input
                        type="password"
                        name="razorpaySecret"
                        value={tempData.razorpaySecret}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-white px-4 py-3 bg-white/5 rounded-lg font-mono text-sm">
                        {formData.razorpaySecret || "Not set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-yellow-400 text-[#2A2146] px-6 py-3 rounded-lg font-bold hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg font-bold border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;