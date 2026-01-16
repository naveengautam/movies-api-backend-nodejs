import {useState} from 'react'
import axios from 'axios';

export default function Signin({setCurrentView}) {
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      // Replace with your actual backend login API endpoint
      const response = await axios.post(import.meta.env.VITE_API_URL + 'users/login', credentials);
      const { token } = response.data.data; // The backend should return the token on success
      console.log('Login response:', response.data);

      // Store the token securely (e.g., in localStorage)
      localStorage.setItem('userToken', token);

      // Redirect the user to a protected route (e.g., a dashboard)
      console.log('Login successful, token stored.', token);
      window.location.reload();

    } catch (err) {
      //setError('Invalid credentials or an error occurred. Please try again.');
      // Handle error (e.g., show error message to user)
      document.querySelector('.error-message').innerText = 'Login failed. Please check your credentials.';
      console.error(err);
    }
  };
    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold mb-6 text-white">Sign In</h2>
                <div className="error-message text-red-500 mb-4"></div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            placeholder="Enter your email"
                           
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            placeholder="Enter your password"
                            
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
            </div>
            <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer text-2xl font-bold"
                onClick={() => setCurrentView('')}
            >
                ✕
            </button>
        </div>
        </>
    )
}

