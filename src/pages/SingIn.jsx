import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Group.png";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    if (formData.email === formData.password) {
      setErrorMessage('Email and password cannot be the same');
      return;
    }

  
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setSuccessMessage('Signup successful! Redirecting to login page...');
        setTimeout(() => {
          setSuccessMessage(null);
          navigate('/');
        }, 1000);
        return;
      } else {
        setErrorMessage(data.message || 'Sign in failed'); 
      }

      
    } catch (error) {
      console.error('Error:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-5xl mx-auto flex-col md:flex-row gap-16 dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-4">
          <div className="mt-12">
            <Link to="/" className="text-5xl font-bold dark:text-white ">
           <img src={logo} alt="Logo" width={400} height={350} className="max-w-[400px] w-auto "/>
            </Link>
            <p className="justify-center text-sm mt-4">The sun hung low in the sky, casting long shadows across the rugged landscape. The air was crisp, and the breeze was wafting with the scent of pine and damp earth.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 my-auto">
          <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
            {successMessage &&
              <Alert className="mt-4" color="success">
                {successMessage}
              </Alert>
            }
            <div className="space-y-3 my-auto">
             
              <div className="w-full mt-1">
                <Label value=" Email" />
                <TextInput id="email" name="email" type="email" placeholder="name@example.com" onChange={handleChange} />
              </div>
              <div className="w-full mt-1">
                <Label value=" Password" />
                <TextInput id="password" name="password" type="password" placeholder="*******************" onChange={handleChange} />
              </div>
              <Button className="w-full mt-4" gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      size="sm"
                      aria-label="Extra large spinner example"
                    />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign In'}
              </Button>
            </div>
          </form>
          <div>
            <p className="text-sm mt-4">Don't have an account?
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
          {errorMessage && 
            <Alert className="mt-4" color="failure">
              {errorMessage} 
            </Alert>
          }
        </div>
      </div>
    </div>
  );
}
