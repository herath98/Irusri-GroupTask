import React, { useState, useContext } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from '@/components/ui/alert';
import { Link, useNavigate } from 'react-router-dom';

// Simulated AuthContext
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (userData) => {
    // Simulate storing user data (in a real app, you'd use more secure storage)
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (formData.email === formData.password) {
      setErrorMessage('Email and password cannot be the same');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Register the user
      register(formData);
      
      setLoading(false);
      setSuccessMessage('Signup successful! Redirecting to login page...');
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/sign-in');
      }, 1000);
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('An error occurred during registration');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-5xl mx-auto flex-col md:flex-row dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-4">
          <div className="mt-12">
            <Link to="/" className="text-5xl font-bold dark:text-white">
              <img src="/api/placeholder/400/350" alt="Logo" width={400} height={350} className="max-w-[400px] w-auto" />
            </Link>
            <p className="justify-center text-sm mt-4">Welcome to our platform. Sign up to get started on your journey with us.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {successMessage && (
              <Alert>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            <div>
              <div className="w-full">
                <Label htmlFor="username">Your Username</Label>
                <TextInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mt-1">
                <Label htmlFor="email">Your Email</Label>
                <TextInput id="email" name="email" type="email" placeholder="name@example.com" onChange={handleChange} />
              </div>
              <div className="w-full mt-1">
                <Label htmlFor="password">Your Password</Label>
                <TextInput id="password" name="password" type="password" placeholder="password" onChange={handleChange} />
              </div>
              <Button className="w-full mt-4" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign Up'}
              </Button>
            </div>
          </form>
          <div>
            <p className="text-sm mt-4">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
          {errorMessage && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}