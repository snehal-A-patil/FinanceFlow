import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Settings = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '', age: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Error fetching user data');
    }
  };

  const updateUserData = async () => {
    const token = localStorage.getItem('token');

    if (!profile.name || !profile.email) {
      setErrorMessage('Name and Email are required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          age: profile.age ? parseInt(profile.age) : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      }

      const updatedData = await response.json();
      setProfile(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      setErrorMessage('Error updating user data: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          {isEditing ? (
            <>
              <input
                type="text"
                placeholder="Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Age"
                value={profile.age || ''}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                className="border rounded p-2 mb-2 w-full"
              />
              <button onClick={updateUserData} className="bg-blue-500 text-white p-2 rounded">
                Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-black p-2 rounded ml-2">
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone Number:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Age:</strong> {profile.age}</p>
              <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white p-2 rounded">
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
