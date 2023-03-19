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
  const link = "http://localhost:5000/";
  const [previewsource, setPreviewSource] = useState();
    const [open, setOpen] = useState(false);
  const logout = async () => {
    try {
      const response = await axios(`${link}logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response)
      if(response.data=="logout successfull")
      {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Logout Successfull",
        });
        router.push('/')
      }
      else
      {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Logout Failed",
        });

      }
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

  const summary_download = async (text) =>
  {
    const udata={
      summary:text
    }
    const response = await axios
    .post(`${link}download_summary`, udata, {
      headers: {
        "Content-type": "application/json",
      },
      responseType: 'text',
    })
  
    console.log(response)
    const fileContentBase64 = response.data;
    const fileContent = atob(fileContentBase64); // Decode the base64-encoded string
    const blob = new Blob([fileContent], { type: 'text/plain' }); // Create a blob object from the decoded file content
    const url = window.URL.createObjectURL(blob);
    const linkk = document.createElement('a');
    linkk.href = url;
    linkk.download = 'summary.txt';
    linkk.click();
  }


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
      <div className="w-[100%] md:w-[70%] relative my-10">
        <div
          className={`absolute inset-0 w-full rounded-lg mt-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center`}
        ></div>
        <div
          className={`relative w-full min-h-[70%] rounded-lg mt-5 bg-${theme}-secondary flex flex-row`}
        >
          <div className={`${open ? 'w-[50%] sm:w-[30%]' : 'w-[12%] xs:w-[10%] sm:w-[7%] md:w-[8%]'} duration-300 py-3 flex flex-col bg-white text-black rounded-md relative`}>
                        <div onClick={() => { setOpen(!open) }} className={`cursor-pointer absolute p-1 border-2 text-white border-white -right-3 top-2 bg-${theme}-secondary rounded-full ${!open && "rotate-180"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                        <div onClick={() => { setSelected(0) }} className={`cursor-pointer flex gap-x-2 sm:gap-x-4 items-center p-2 hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-black ${selected == 0 && "text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"}`}>
                            <div className={`cursor-pointer duration-500`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <h1 className={`origin-left text-md sm:text-xl font-medium duration-300 ${!open && "scale-0"}`}>Profile</h1>
                        </div>
                        <div onClick={() => { setSelected(1) }} className={`cursor-pointer flex gap-x-2 sm:gap-x-4 items-center p-2 hover:bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-black ${selected == 1 && "text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"}`}>
                            <div className={`cursor-pointer duration-500`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            </div>
                            <h1 className={`origin-left text-md sm:text-xl font-medium duration-300 ${!open && "scale-0"}`}>Summaries</h1>
                        </div>
                    </div>
          <div className="w-full flex flex-col max-h-[520px] overflow-y-auto">
            {selected == 0 && (
              <div className="w-full flex flex-col items-center justify-center px-3 md:px-8 py-3">
                {user ? (
                  <div className='flex flex-col gap-3'>
                 <div cl>
                      {google === false ? (
                    <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-full text-black ml-2">
                      <img
                        className="rounded-full w-16 h-16 md:w-24 md:h-24 object-cover"
                        src={
                          photo
                            ? `data:image/jpeg;base64, ${photo}`
                            : "./avatar1.jpg"
                        }
                        alt="profilePic"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-full text-black ml-2">
                      <img
                        className="rounded-full w-16 h-16 md:w-24 md:h-24 object-cover"
                        src={photo}
                        alt="profilePic"
                      />
                    </div>
                  )}
                  </div>
                    <h3 className="text-xl md:text-2xl font-medium font-heading underline underline-offset-4 decoration-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
                      {userinfo.first_name} {userinfo.last_name}
                    </h3>
                    <h3 className="text-lg md:text-xlfont-normal">{user}</h3>
                    <h3 className="text-2xl font-bold">
                      Number of Summaries : {discussion.length}
                    </h3>
                      <button 
                       className="w-fit px-4 py-1 cursor-pointer bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
                      onClick={logout}>Log Out</button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
            {selected == 1 && (
              <div className="w-full flex flex-col items-center justify-center px-1 sm:px-3 md:px-8 py-3 ">
                {discussion.length >= 1 && user? (
                  <>
                    {discussion.map((item) => (
                      <div className="w-full flex flex-col my-5 items-center justify-center gap-3">
                        <div className='w-[95%] md:w-[85%] flex items-center justify-between text-content'>
                          <h1 className="text-left underline underline-offset-4 w-[95%] md:w-[85%] py-4 rounded-md text-md sm:text-lg  font-medium font-leading overflow-y-auto">
                          Title : Some Random Topic
                        </h1>
                        <div className='cursor-pointer  text-red-500 hover:text-gray-500 hover:scale-105 duration-10'>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                          </div>
                        </div>
                        <div className='w-[95%] md:w-[85%] flex items-center justify-between text-content'>
                          <h1 className="text-left underline underline-offset-4 w-[95%] md:w-[85%] py-1 rounded-md text-sm sm:text-md font-small overflow-y-auto">
                          Original Text:
                        </h1>
                        <div className='cursor-pointer  hover:text-gray-500 hover:scale-105 duration-10' onClick={() => {
                    navigator.clipboard.writeText(item.text); Swal.fire({
                      position: 'top-middle',
                      icon: 'success',
                      title: 'Text Copied',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
</svg>

                          </div>
                        </div>
                        <div className="relative text-justify w-[95%] md:w-[85%] bg-white p-4 text-black rounded-md text-sm sm:text-md font-small min-h-[130px] max-h-[130px] h-[130px] overflow-y-auto">
                          
                          {item.text}
                        </div>
                         <div className='w-[95%] md:w-[85%] flex items-center justify-between text-content'>
                          <h1 className="text-left underline underline-offset-4 w-[95%] md:w-[85%] py-1 rounded-md text-sm sm:text-md font-small overflow-y-auto">
                          Summary:
                        </h1>
                        <div className='cursor-pointer  hover:text-gray-500 hover:scale-105 duration-10' onClick={() => {
                    navigator.clipboard.writeText(item.summary); Swal.fire({
                      position: 'top-middle',
                      icon: 'success',
                      title: 'Summary Copied',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
</svg>

                          </div>
                        </div>
                        <div className="text-justify w-[95%] md:w-[85%] bg-white p-4 text-black rounded-md text-sm sm:text-md font-small min-h-[130px] max-h-[130px] h-[130px] overflow-y-auto">
                          {item.summary}
                        </div>
                        <button onClick={()=>
                          {
                            summary_download(item.summary)}} className="w-fit bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
                          Download Summary
                        </button>
                         <div className='w-full'>
                          <hr className="h-px my-8 border-0 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"></hr>
                         </div>
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
