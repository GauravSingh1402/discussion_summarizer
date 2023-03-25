import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Reset = () => {
  const router = useRouter();
  const linkk =
    "http://localhost:5000/";
  const [password, setPassword] = useState(" ");
  const [cpassword, setCPassword] = useState(" ");
  const token = router.query.token;
  console.log("token", token);
  function strong_password() {
    var flag = 0;
    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Password should be atleast 8 characters long",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    for (var i = 0; i < password.length; i++) {
      if (password[i] >= "0" && password[i] <= "9") {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      Swal.fire({
        icon: "warning",
        title: "Password should contain atleast one number",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    flag = 0;
    for (var i = 0; i < password.length; i++) {
      if (password[i] >= "A" && password[i] <= "Z") {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      Swal.fire({
        icon: "warning",
        title: "Password should contain atleast one uppercase letter",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    flag = 0;
    for (var i = 0; i < password.length; i++) {
      if (password[i] >= "a" && password[i] <= "z") {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      Swal.fire({
        icon: "warning",
        title: "Password should contain atleast one lowercase letter",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    return true;
  }
  const reset = async () => {
    let x=strong_password(password);
    const udata = {
      password: password,
      cpassword: cpassword,
      token: token,
    };
    try {
      if (password == cpassword && password.length > 0 && x==true) {
        const response = await axios
          .post(`${linkk}reset_password`, udata, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.data == "Updated") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Password Updated Successfull!",
              });
              router.push("/");
            } else if (response.data.data == "Google") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Forgot Password is not for Google accounts !",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password Updation failed!",
              });
            }
          });
      } else {
        if (password == " " || cpassword == " ") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password cannot be empty!",
          });
        }
        if (password != cpassword) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Passwords do not match!",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center mt-[13%] h-full w-full justify-center">
      <div className="relative flex w-full h-full justify-center items-center">
        <div className="absolute m-auto inset-0 w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-md rounded-md"></div>
        <form className="relative w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-light-primary p-8 rounded-md flex flex-col items-center gap-5">
          <h1 className="font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
            Reset Password
          </h1>
          <p className="text-dark-primary">
            New User?{" "}
            <a
              className="underline bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
              href="/signup"
            >
              Create an account
            </a>
          </p>
          <div className="flex gap-5 flex-col w-full">
            <input
              name="password"
              id="password"
              placeholder="Enter new password"
              className="rounded-md p-4 w-full outline-none bg-gray-200 text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              name="cpassword"
              id="cpassword"
              placeholder="Confirm password"
              className="rounded-md p-4 w-full outline-none bg-gray-200 text-black"
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
            className="bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white font-heading font-medium rounded-md w-full py-4 transition-all hover:scale-105"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
