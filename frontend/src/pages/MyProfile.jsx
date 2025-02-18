import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  // const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); // Initialize to null
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userData.name);
      formData.append('phone', userData.phone);

      // if (image) { // Only append if image is not null
      //   formData.append('image', image);
      // }

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        // setIsEdit(false);
        // setImage(null); // Reset image after successful update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error); // Use console.error for errors
    }
  };

  return (
    <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 mt-[70px]">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div class="lg:col-span-1">
          <div class="bg-white shadow rounded-lg p-6 text-center">
            {/* <div class="relative inline-block">
            </div> */}
            <h2 class="mt-6 text-xl font-semibold text-gray-900">{userData.name}</h2>

          </div>
        </div>
        <div class="lg:col-span-3">
          <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900">Profile Information</h3>
              <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <label class="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border pl-2 pr-3 py-2" onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} value={userData.name} />
                </div>
                <div class="sm:col-span-1">
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <p class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border pl-2 pr-3 py-2">{userData.email}</p>
                </div>
                <div class="sm:col-span-1">
                  <label
                    class="block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border pl-2 pr-3 py-2"
                    onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <button onClick={updateUserProfileData} class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md">Save Changes</button>
            <button class="text-red-600 hover:text-red-700 font-medium">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;