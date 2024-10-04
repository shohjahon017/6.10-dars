import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../axios";

function Register() {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();
  const formRef = useRef();
  const [loader, setLoader] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 3;
  };

  const validate = () => {
    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      return false;
    }

    if (firstNameRef.current.value.length < 1) {
      alert("First name is valid");
      firstNameRef.current.focus();
      return false;
    }

    if (lastNameRef.current.value.length < 1) {
      alert("Last name is not valid");
      lastNameRef.current.focus();
      return false;
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid");
      passwordRef.current.focus();
      return false;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      confirmPasswordRef.current.focus();
      return false;
    }

    return true;
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      password: passwordRef.current.value,
    };

    setLoader(true);
    http
      .post("/api/auth/register", user)
      .then((response) => {
        if (response.status === 200) {
          formRef.current.reset();
          navigate("/login");
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        ref={formRef}
        onSubmit={handleRegister}
        className="w-1/3 flex flex-col p-5 gap-4 border rounded-lg shadow-md"
      >
        <input
          className="border rounded-lg p-3"
          ref={emailRef}
          type="email"
          placeholder="Enter email..."
        />
        <input
          className="border rounded-lg p-3"
          ref={firstNameRef}
          type="text"
          placeholder="Enter first name..."
        />
        <input
          className="border rounded-lg p-3"
          ref={lastNameRef}
          type="text"
          placeholder="Enter last name..."
        />
        <input
          className="border rounded-lg p-3"
          ref={passwordRef}
          type="password"
          placeholder="Enter password..."
        />
        <input
          className="border rounded-lg p-3"
          ref={confirmPasswordRef}
          type="password"
          placeholder="Re-enter password..."
        />
        <button
          disabled={loader}
          className="bg-green-600 p-3 rounded-lg text-white hover:bg-green-700 transition-all duration-500"
        >
          {loader ? "LOADING..." : "REGISTER"}
        </button>
        <Link to="/login" className="text-blue-500 hover:underline">
          Loginga o’tish
        </Link>
      </form>
    </div>
  );
}

export default Register;
