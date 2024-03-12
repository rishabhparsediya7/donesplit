import React, { useState } from "react";
import Input from "../utils/Input";
import Navbar from "./Navbar";
import signinbg from "../assets/signinbg.png";
import Tabs from "./Tabs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleEmail = (e) => setEmail(e.target.value);
  const handleOtp = (e) => setOtp(e.target.value);

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/user/send-mail`,
        {
          email: email,
        }
      );
      if (response.status == 200 && response.data.data) {
        setLoading(false);
        setVisible(true);
      } else if (response.data.message == "User not found") {
        setError("User not registered, Please Signup");
      } else {
        setLoading(false);
        setError(response.error);
      }
    } catch (e) {
      if (e.response.status == 404) {
        setError("User not registered, Please Signup");
      } else setError(e.message);
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    const response = await axios.post(`http://localhost:8000/user/login`, {
      email: email,
      otp: otp,
    });
    console.log(response.data);
    if (response.status == 200 && response.data) {
      setLoading(false);
      setVisible(true);
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("email", email);
      localStorage.setItem("userId", response.data.data.userId);
      navigate("/");
    } else {
      setLoading(false);
      setError(response.error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="absolute flex justify-center align-middle w-full top-1/4 lg:top-20 px-3 lg:px-10 lg:py-12 left-1/2 transform -translate-x-1/2 -trasnslate-y-1/2">
        <div className="w-[90vw] lg:w-[60vw] p-8 flex flex-col lg:flex-row rounded-lg customshadow">
          <div className="flex-1">
            <img className="w-full lg:w-[30rem] h-60 lg:h-80" src={signinbg} alt="" />
          </div>
          <div className="flex-1 flex flex-col gap-y-2 justify-center align-middle">
            <input
              type="text"
              placeholder="Type Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border-[0.024rem] rounded-md p-[.6rem] bg-transparent border-black w-full text-lg placeholder:text-black placeholder:font-medium focus:outline-none text-black`}
            />
            {visible && (
              <input
                type="text"
                placeholder="Type Your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`border-[0.024rem] rounded-md p-[.6rem] bg-transparent border-black w-full text-lg placeholder:text-black placeholder:font-medium focus:outline-none text-black`}
              />
            )}
            {error && (
              <p className="mx-4 my-2 p-2 bg-red-100 text-red-400 rounded-md">
                {error}
              </p>
            )}
            <p className="flex justify-end px-4 my-2">
              Not a meber ?
              <a className="underline" href="/signup">
                Signup
              </a>
            </p>
            <div className="my-1">
              {loading && (
                <button
                  onClick={handleEmailVerification}
                  className="bg-black uppercase tracking-wider text-white w-full p-2 rounded-md"
                >
                  Loading
                </button>
              )}
              {!loading && (
                <button
                  onClick={
                    visible ? handleOtpVerification : handleEmailVerification
                  }
                  className="bg-black uppercase tracking-wider text-white w-full p-2 rounded-md"
                >
                  {otp ? `Submit OTP` : `Signin`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default Signin;
