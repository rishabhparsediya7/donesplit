import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerificationModal = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/user/login`, {
        email: email,
        otp: otp,
      });
      if (response.status == 200) {
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("userId", response.data.data.userId);
        localStorage.setItem("email", email);
        navigate("/");
      } else {
        setError(response.data.error);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="form-container w-full absolute z-30">
      <div className="logo-container">OTP Verification</div>
      <form className="form" onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="name">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button className="form-submit-btn" type="submit">
          Submit OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationModal;
