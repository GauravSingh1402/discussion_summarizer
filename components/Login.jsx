import React, { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import Swal from "sweetalert2";
// import { GoogleAuth } from "google-auth-library";
import dynamic from "next/dynamic";
import loadGoogleScript from "../public/googleScript";
import { useSession, signIn, signOut ,getSession} from "next-auth/react";
import { useRouter } from "next/router";

const Login =  () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const linkk =
    "https://discussionsummarizerbackend-production.up.railway.app/";
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [flag,setFlag] = useState(0);
  const ses= getSession();
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const gsignin = async () => {
    const session = await getSession();
    if(session)
    {
      const udata = {
        email: session.user.email,
      };
      const response = await axios
          .post(
            `${linkk}glogin`,
            udata,
            {
              headers: {
                "Content-type": "application/json",
              },
        withCredentials:true
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data=="login successfull")
            {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Login Successfull',
              })
            }
            else
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid Credentials!',
              })
            }
          })
        
    }
  }

  const handleSignIn = async () => {
    try {
      result=await signIn("google");
      } catch (error) {
      console.log("Google sign-in error:", error);
    }
  };
  const submit = async () => {
    const udata = {
      email: email,
      password: password,
    };
    try {
      const response = await axios
        .post(`${linkk}login`, udata, {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data == "login successfull") {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Login Successfull",
            });
            Router.push("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid Credentials!",
            });
          }
        })
    } catch (error) {
      console.log(error);
    }
  };
  if(flag==0)
  {
    gsignin();
    setFlag(1);
   
  }
  return (
    <div className="relative flex w-full h-full justify-center items-center">
      <div className="absolute m-auto inset-0 w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-md rounded-md"></div>
      <form className="relative w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-light-primary p-8 rounded-md flex flex-col items-center gap-5">
        <h1 className="font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
          Login
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
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className="rounded-md p-4 w-full outline-none bg-gray-200 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="rounded-md p-4 w-full outline-none bg-gray-200 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                className=""
                name="Remember"
                id="Remember"
              />
              <label
                htmlFor="Remember"
                className="text-sm font-medium text-dark-secondary"
              >
                Remember me
              </label>
            </div>
            <a className="text-sm font-medium text-dark-secondary" href="/">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            submit();
          }}
          className="bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white font-heading font-medium rounded-md w-full py-4 transition-all hover:scale-105"
        >
          Login
        </button>

        <div className="w-full flex items-center">
          <div className="border border-custom-gradient-start h-[1px] flex-1"></div>
          <h4 className="mx-2 font-heading font-semibold text-dark-secondary">
            OR
          </h4>
          <div className="border border-custom-gradient-end h-[1px] flex-1"></div>
        </div>
        <button  
          onClick={(e) => {
            e.preventDefault();
            handleSignIn();
          }}className="bg-light-secondary text-light-content flex items-center gap-4 justify-center font-heading font-medium rounded-md w-full py-4 transition-all hover:scale-105">
					<svg className="w-5 h-5" viewBox="0 0 128 128">
						<path
							fill="#fff"
							d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"
						></path>
						<path
							fill="#e33629"
							d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"
						></path>
						<path
							fill="#f8bd00"
							d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"
						></path>
						<path
							fill="#587dbd"
							d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
						></path>
						<path
							fill="#319f43"
							d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"
						></path>
					</svg>
					<p>Sign up with Google</p>
				</button>
      </form>
    </div>
  );
};

export default Login;
