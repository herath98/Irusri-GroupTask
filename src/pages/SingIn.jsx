import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateForm } from "../utils/validation";
import logo from "../assets/Group.png";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signIn, loading, error } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await signIn(formData.email, formData.password);
        navigate("/home"); 
      } catch (err) {
        
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-4 max-w-5xl mx-auto flex-col md:flex-row dark:bg-gray-900">
        <div className="w-full md:w-1/2 p-4">
          <div className="mt-12">
            <Link to="/" className="text-5xl font-bold dark:text-white">
              <img src={logo} alt="Logo" width={400} height={350} className="max-w-[400px] w-auto" />
            </Link>
            <p className="justify-center text-sm mt-4">The sun hung low in the sky, casting long shadows across the rugged landscape. The air was crisp, and the breeze was wafting with the scent of pine and damp earth.</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <div className="w-full mt-1">
                <Label htmlFor="email" value="Your Email" />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  color={errors.email ? "failure" : undefined}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="w-full mt-1">
                <Label htmlFor="password" value="Your Password" />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  onChange={handleChange}
                  color={errors.password ? "failure" : undefined}
                />
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
              <Button className="w-full mt-4" gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" aria-label="Loading spinner" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign In'}
              </Button>
            </div>
          </form>
          <div>
            <p className="text-sm mt-4">Don't have an account?{' '}
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
          {error && (
            <Alert className="mt-4" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}