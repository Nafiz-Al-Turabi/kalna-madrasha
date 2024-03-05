import React, { useState } from 'react';
import axiosInstance from '../../Global/Axios/AxiosInstance';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a POST request to your server endpoint
      const response = await axiosInstance.post('/postcontact', formData);
      
      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Set success message
      setSuccessMessage('Message successfully');
      setErrorMessage('');
    } catch (error) {
      // Set error message
      setErrorMessage('Error sending message');
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg my-20">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#DAA520]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#DAA520]"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-[#DAA520]"
            required
          ></textarea>
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-[#DDA520] text-white px-4 py-2 rounded-md hover:bg-[#DAc520] focus:outline-none focus:shadow-outline-blue active:scale-95"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
