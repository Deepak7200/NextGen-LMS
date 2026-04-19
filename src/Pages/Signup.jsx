import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount, login } from "../Redux/Slices/Authorization";

function Signup() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setImagePreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  // for user input
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // function to set signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,  
    });
  };

  // function to handle image upload
  function getImage (event) {
    event.preventDefault();
    // getting image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  // function to create account
  async function createNewAccount(event) {
    event.preventDefault();                             

    // checking empty fields
    if (
      !signupData.avatar ||
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // checking name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }

    // email validation using regex
    if (!signupData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.error("Invalid email id");
      return;
    }

    // password validation regex
    if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error("Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol");
      return;
    }

    // creating form data from existing data
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // calling create account action
    const res = await dispatch(createAccount(formData));
    const email = signupData.email;
    const password = signupData.password;

    // redirect to login page if true
    if (res?.payload?.success) {
      await dispatch(login({ email, password }));
      navigate("/");
    }

    // clearing the signup inputs
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setImagePreview("");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          {/* input for image file */}
          <label className="cursor-pointer" htmlFor="image_uploads">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />

          {/* input for name */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="fullName"> Name </label>
            <input
              required
              type="name"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border"
              value={signupData.fullName}
              onChange={handleUserInput}
            />
          </div>

          {/* input for email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="email"> Email </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          {/* input for password */}
          <div className="flex flex-col gap-1">
          <label className="font-semibold" htmlFor="password"> Password </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="bg-transparent px-2 py-1 border w-full pr-10"
                onChange={handleUserInput}
                value={signupData.password}
              />
              {signupData.password && <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>}
            </div>
          </div>

          {/* registration button */}
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          > Create Account </button>

          <p className="text-center">
            Already have an account ?{" "}
            <Link to={"/login"} className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div> 
    </HomeLayout>
  );
};

export default Signup;
