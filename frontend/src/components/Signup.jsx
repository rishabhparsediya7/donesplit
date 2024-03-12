import React, { useState } from "react";
import Input from "../utils/Input";
import Navbar from "./Navbar";
import Tabs from "./Tabs";
import formbg from "../assets/formbg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpVerificationModal from "./OtpVerificationModal";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleMobile = (e) => setMobile(e.target.value);
  const handleEmailVerification = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/user/send-mail`,
        {
          email: email,
        }
      );
      if (response.status == 200 && response.data.data) {
        console.log("mail sent");
      } else {
        setError(response.error);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/user/create`, {
        email: email,
        name: name,
        mobile: mobile,
      });
      if (response.status == 201) {
        setLoading(false);
        setModalOpen(true);
        handleEmailVerification();
      } else {
        setLoading(false);
        setError(response.data.error);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <img src={formbg} alt="" />
      </div>
      {modalOpen && <OtpVerificationModal email={email} />}
      <div className="space-y-2">
        <Input
          placeholder={"Type your email"}
          type={"text"}
          icon={"bi-envelope-check-fill"}
          value={email}
          handler={handleEmail}
        />
        <Input
          placeholder={"Your name"}
          type={"text"}
          icon={"bi-person-fill"}
          value={name}
          handler={handleName}
        />
        <Input
          placeholder={"Your contact"}
          type={"text"}
          icon={"bi-phone-fill"}
          value={mobile}
          handler={handleMobile}
        />
        <p className="flex justify-end px-4 my-2">
          Already Registered ?
          <a className="underline" href="/signin">
            Login
          </a>
        </p>
        {error && (
          <p className="text-red-500 capitalize p-2 bg-red-100 mx-4 rounded-md">
            {error}
          </p>
        )}
        <div className="px-4 my-1">
          <button
            onClick={handleSignUp}
            className="bg-black uppercase tracking-wider text-white w-full p-2 rounded-md"
          >
            {loading ? "Loading..." : "signup"}
          </button>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default Signup;
