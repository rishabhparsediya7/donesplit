import React, { useState } from "react";
import "../static/css/modal.css";
import axios from "axios";

// Adding friends Modal Form
const ModalForm = ({ toggleModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    console.log(BASE_URL);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/add-friends`,
        {
          email: localStorage.getItem("email"),
          friendEmail: email,
          friendName: name,
          friendMobile: mobile,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        console.log(response);
        setLoading(false);
        window.location.reload();
      } else {
        console.log(response.error);
        setError(response.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setLoading(false);
    } finally {
      setEmail("");
      setName("");
      setMobile("");
      setLoading(false);
      toggleModal();
    }
  };
  return (
    <div className="form-container w-full">
      <div className="logo-container">Add your friend</div>
      <form className="form" onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="name">Friend's Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter friend's name"
            required
          />
        </div>
        <p className="text-blue-500 bg-blue-200 p-2 rounded-md">
          Only one thing is required either Friend's Email or Mobile
        </p>
        <div className="form-group">
          <label htmlFor="email">Friend's Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter friend's email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter friend's contact"
          />
        </div>
        {error && <p>{error}</p>}
        <button className="form-submit-btn" type="submit">
          {loading ? `Loading...` : `Add Friend`}
        </button>
      </form>
    </div>
  );
};

export default ModalForm;
