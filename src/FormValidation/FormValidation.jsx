import React, { useState } from "react";
import "./FormValidation.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormValidation() {
  let initialFormData = {
    name: "",
    email: "",
    password: "",
  };

  let [formData, setFormData] = useState({ name: "", email: "", password: "" });
  let [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name is required!";
    }
    if (!formData.email) {
      errors.email = "email address is required!";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid!";
    }
    if (!formData.password) {
      errors.password = "Password is required!";
    }
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be atleast 6 character long!";
    }
    return errors;
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length === 0) {
      toast.success("Data submitted successfully!", {
        className: "custom-toast",
      });
      clearField();
      return;
    } else {
      setErrors(validateErrors);
    }
  };

  const clearField = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <>
      <h1>Custom Form Validation using React Hooks</h1>
      <p className="desc">Controlled Component</p>
      <div className="form-validation">
        <form onSubmit={handleSumbit} autoComplete="off" noValidate>
          <p>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </p>
          <p>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </p>
          <p>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </p>

          <button type="submit">Submit Data</button>
          <button type="button" onClick={clearField} className="clrBtn">
            Clear Data
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
