import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Account = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [user, setUser] = useState();
  const [userinfo, setUserinfo] = useState(" ");
  const [name, setName] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [google, setGoogle] = useState(false);
  const [photo, setPhoto] = useState();
  const [password, setPassword] = useState(" ");
  const [npassword, setNPassword] = useState(" ");
  const [cpassword, setCPassword] = useState(" ");
  const [discussion, setDiscussion] = useState();
  const link = "https://discussionsummarizerbackend-production.up.railway.app/";
  const [previewsource, setPreviewSource] = useState();

  const logout = async () => {
    try {
      const res = await axios(`${link}logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.type == "image/jpeg") {
      reader.onloadend = () => {
        setPreviewSource(reader.result.slice(reader.result.indexOf(",") + 1));
      };
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please Enter File Formats Of Jpg Jpeg",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handlePhotoInputs = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const profile = async () => {
    try {
      const res = await axios(`${link}auth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      console.log(res.data);
      if (res.data !== "Unauthorized") {
        const email = res.data.user_id;
        console.log(email);
        if (email != undefined) {
          setUser(email);
          setUserinfo(res.data.other_info);
          setDiscussion(res.data.other_info.summary);
          setGoogle(res.data.other_info.isGoogle);
          setPhoto(res.data.other_info.photo);
        } else {
          setUser("Unauthorized");
          router.push("/login");
        }
      } else {
        setUser("Unauthorized");
      }
    } catch (err) {
      setUser("Unauthorized");
      console.log(err);
    }
  };
  const edit_profile = async () => {
    const res = await axios(`${link}auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data !== "Unauthorized") {
      const email = res.data.user_id;
      if (email != undefined) {
        const udata = {
          name: name,
          umail: mail,
          email: email,
          password: password,
          npassword: npassword,
          cpassword: cpassword,
          image: previewsource,
        };
        console.log(udata);
        if (
          mail == " " &&
          password == " " &&
          npassword == " " &&
          cpassword == " " &&
          name == " " &&
          previewsource == " "
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: " Enter atleast one field to update!",
          });
        } else {
          if (
            (password != " " && cpassword != " " && npassword != " ") ||
            name != " " ||
            mail != " " ||
            previewsource != " "
          ) {
            if (
              (cpassword == npassword &&
                cpassword != " " &&
                password != npassword) ||
              name != " " ||
              mail != " " ||
              previewsource != " "
            ) {
              const resp = await axios
                .post(`${link}eprofile`, udata, {
                  headers: {
                    "Content-type": "application/json",
                  },
                })
                .then((resp) => {
                  console.log(resp.data.data);
                  if (resp.data.data == "Updated") {
                    Swal.fire({
                      icon: "success",
                      title: "Success",
                      text: "Profile updated  Successfully",
                    });
                    router.push("/login");
                  } else if (resp.data.data == "Google") {
                    Swal.fire({
                      icon: " Warning",
                      title: "Oops...",
                      text: "Password cannot be changed for Google accounts",
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Profile could not  be updated!",
                    });
                  }
                });
            } else {
              if (password == npassword) {
                Swal.fire({
                  icon: "warning",
                  title: "Oops...",
                  text: " New Password and Old Password should not be same!",
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Oops...",
                  text: " Confirm Password and New Password should be same!",
                });
              }
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: " Enter New Password or Confirm Password!",
            });
          }
        }
      }
    }
  };
  useEffect(() => {
    profile();
  }, []);
  return (
    <div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-10">
      <h1 className="text-white text-3xl text-transparent bg-clip-text font-heading font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
        Welcome {userinfo.first_name}
      </h1>
      <div className="w-[70%] relative my-10">
        <div
          className={`absolute inset-0 w-full rounded-lg mt-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center`}
        ></div>
        <div
          className={`relative w-full min-h-[70%] rounded-lg mt-5 bg-${theme}-secondary flex flex-row`}
        >
          <div className="w-[30%] flex flex-col bg-[#fafafa] rounded-md">
            <button
              onClick={() => {
                setSelected(1);
              }}
              className={
                selected == 1
                  ? "mt-5 w-full px-8 py-3 text-white cursor-pointer font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
                  : "mt-5 w-full px-8 py-3 text-black cursor-pointer font-bold hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
              }
            >
              My Profile
            </button>
            <button
              onClick={() => {
                setSelected(2);
              }}
              className={
                selected == 2
                  ? "w-full px-8 py-3 text-white cursor-pointer font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
                  : "w-full px-8 py-3 text-black cursor-pointer font-bold hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
              }
            >
              Saved Summaries
            </button>
            <button
              onClick={() => {
                setSelected(3);
              }}
              className={
                selected == 1
                  ? "mt-5 w-full px-8 py-3 text-white cursor-pointer font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
                  : "mt-5 w-full px-8 py-3 text-black cursor-pointer font-bold hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"
              }
            >
              Edit Personal Details
            </button>
          </div>
          <div className="w-[70%] min-h-[70%] flex flex-col">
            {selected == 1 && (
              <div className="w-full flex flex-col items-center justify-center px-8 py-3">
                <div className="flex items-center justify-center space-x-4 py-4 lg:py-8">
                  {/* <h2 className="text-white font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
                    {google === false
                      ? "Change Profile Pic"
                      : "Profile Picture"}
                  </h2> */}
                  {google === false ? (
                    <div className="w-32 h-32 relative rounded-full text-black ml-2">
                      <img
                        className="rounded-full w-32 h-32 object-cover"
                        src={
                          photo
                            ? `data:image/jpeg;base64, ${photo}`
                            : "./avatar1.jpg"
                        }
                        alt="profilePic"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 relative rounded-full text-black ml-2">
                      <img
                        className="rounded-full w-32 h-32 object-cover"
                        src={photo}
                        alt="profilePic"
                      />
                    </div>
                  )}
                </div>

                {user ? (
                  <>
                    <h3 className="text-2xl my-5 font-bold">
                      Name: {userinfo.first_name} {userinfo.last_name}
                    </h3>
                    <h3 className="text-2xl my-5 font-bold">Email : {user}</h3>
                    <h3 className="text-2xl my-5 font-bold">
                      Number of Summaries : {discussion.length}
                    </h3>
                    <div className=" mt-5 cursor-pointer mx-4 py-2 px-7 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
                      <button onClick={logout}>Log Out</button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
            {selected == 2 && (
              <div className="w-full flex flex-col items-center justify-center px-8 py-3">
                {discussion.length >= 1 ? (
                  <>
                    {discussion.map((item) => (
                      <div className="w-full flex flex-col my-5 items-center justify-center gap-3">
                        <div className="text-justify w-[70%] md:w-[75%] bg-white p-7 text-black rounded-md font-small min-h-[100px] max-h-[100px] h-[100px] overflow-y-auto">
                          {item.summary}
                        </div>
                        <button className="w-fit bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
                          Read Full
                        </button>
                      </div>
                    ))}
                  </>
                ) : discussion == " " ? (
                  <></>
                ) : (
                  <>
                    <h1 className="mt-3 text-3xl text-white text-transparent bg-clip-text font-heading font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
                      No Summaries generated yet!
                    </h1>
                    <div className=" mt-5 cursor-pointer mx-4 py-2 px-7 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
                      <Link href="/generateSummary">Generate Summary</Link>
                    </div>
                  </>
                )}
              </div>
            )}
            {selected == 3 && (
              <div className="w-full flex flex-col items-center justify-center px-8 py-3">
                <div className="my-5 flex items-center flex-row">
                  {google == false ? (
                    <>
                      <h2 className="text-white font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end pr-4">
                        Change Profile Pic
                      </h2>
                      <div className="w-32 h-32 relative rounded-full text-black ml-2">
                        <img
                          className="rounded-full w-32 h-32 object-cover"
                          src={
                            previewsource
                              ? `data:image/jpeg;base64, ${previewsource}`
                              : "./avatar1.jpg"
                          }
                          alt="profilePic"
                        />
                        <div className="text-slate-500 text-center absolute bg-white rounded-full bottom-[-10%] right-[32%] border-gray-300 border-solid border-2 w-8 h-8 overflow-hidden">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 absolute top-[10%] left-1 cursor-pointer"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <input
                            className="absolute cursor-pointer top-0 scale-110 opacity-0"
                            type="file"
                            onChange={handlePhotoInputs}
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className=" my-5 flex flex-col">
                  <div className="my-5 flex items-center flex-row">
                    <h2 className="text-white font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
                      Change Name{" "}
                    </h2>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className="flex-grow rounded-md p-4 ml-2  outline-none bg-gray-200 text-black"
                      placeholder="Enter new name for your account"
                    ></input>
                  </div>
                  <div className="flex items-center flex-row my-5">
                    <h1 className=" text-white font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
                      Change Email
                    </h1>
                    <input
                      onChange={(e) => setMail(e.target.value)}
                      className="flex-grow rounded-md p-4 ml-2 outline-none bg-gray-200 text-black"
                      placeholder="Enter New Email"
                    ></input>
                  </div>
                </div>
                <div className="my-5">
                  {google == false ? (
                    <>
                      <h1 className=" text-white font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end ">
                        Change Password
                      </h1>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-md m-5 p-4 w-full outline-none bg-gray-200 text-black"
                        placeholder="Enter old password"
                      ></input>
                      <input
                        onChange={(e) => setNPassword(e.target.value)}
                        className="rounded-md m-5 p-4 w-full outline-none bg-gray-200 text-black"
                        placeholder="Enter New Password"
                      ></input>
                      <input
                        onChange={(e) => setCPassword(e.target.value)}
                        className="rounded-md m-5 p-4 w-full outline-none bg-gray-200 text-black"
                        placeholder="Confirm Password"
                      ></input>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    edit_profile();
                  }}
                  className="bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white font-heading font-medium rounded-md w-full py-4 transition-all hover:scale-105"
                >
                  Save Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
