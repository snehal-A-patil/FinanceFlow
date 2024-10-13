import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const [securityQuestions, setSecurityQuestions] = useState({
    question: 'What is your pet’s name?',
    answer: '',
  });

  // Handle profile changes
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle password changes
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Handle notification settings change
  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  // Handle security question changes
  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestions({ ...securityQuestions, [e.target.name]: e.target.value });
  };

  // Profile update handler
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    // Here, you would make an API call to save the updated profile
  };

  // Password update handler
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    alert('Password updated successfully!');
    // Here, you would make an API call to update the password
  };

  // Security question update handler
  const handleSecurityQuestionUpdate = (e) => {
    e.preventDefault();
    alert('Security question updated successfully!');
    // API call for updating security question
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Update Profile
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Password Settings</h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Update Password
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              <label>Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={handleNotificationChange}
                className="mr-2"
              />
              <label>SMS Notifications</label>
            </div>
          </div>
        </div>

        {/* Security Questions */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Security Question</h2>
          <form onSubmit={handleSecurityQuestionUpdate} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Security Question</label>
              <select
                name="question"
                value={securityQuestions.question}
                onChange={handleSecurityQuestionChange}
                className="w-full p-2 border rounded"
              >
                <option value="What is your pet’s name?">What is your pet’s name?</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What was your first car?">What was your first car?</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Answer</label>
              <input
                type="text"
                name="answer"
                value={securityQuestions.answer}
                onChange={handleSecurityQuestionChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Update Security Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
