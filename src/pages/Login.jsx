import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../axios";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const formRef = useRef();
  const [loader, setLoader] = useState(false);

  function validatePassword(pw) {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 3;
  }

  function validate() {
    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      return false;
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      return false;
    }

    return true;
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function handleLogin(event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoader(true);

    http
      .post("/api/auth/login", user)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          if (data.message) {
            alert(data.message);
          } else if (data.id) {
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="w-1/3 flex flex-col p-5 gap-4 mt-4 mx-auto border rounded-lg"
      >
        <input
          className="border rounded-lg p-3"
          ref={emailRef}
          type="email"
          placeholder="Enter email..."
        />
        <input
          className="border rounded-lg p-3"
          ref={passwordRef}
          type="password"
          placeholder="Enter password..."
        />
        <button
          disabled={loader}
          className="bg-green-600 p-3 rounded-lg text-white hover:bg-green-700 transition-all duration-500"
        >
          {loader ? "LOADING" : "LOGIN"}
        </button>
        <Link to="/register" className="text-blue-500 hover:underline">
          Registerga o’tish
        </Link>
      </form>
    </div>
  );
}

export default Login;
