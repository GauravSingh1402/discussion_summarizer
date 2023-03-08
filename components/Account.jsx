import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Account = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [user, setUser] = useState();
  const [userinfo, setUserinfo] = useState(" ");
  const [name, setName] = useState(" ");
  const [mail, setMail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [npassword, setNPassword] = useState(" ");
  const [cpassword, setCPassword] = useState(" ");
  const link = "https://discussionsummarizerbackend-production.up.railway.app/";
  const [discussion, setDiscussion] = useState(" ");
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
        };
        console.log(udata);
        if (
          mail == " " &&
          password == " " &&
          npassword == " " &&
          cpassword == " " &&
          name == " "
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: " Enter atleast one field to update!",
          });
        } else {
          if ((password != " " && cpassword!=" " && npassword != " ") ||(name != " " || mail != " ")) {
              if ((cpassword == npassword && cpassword != " " && password!=npassword) ||(name != " " || mail != " "))  {
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
                      router.push('/login');
                    }
                    else if(resp.data.data == "Google"){
                      Swal.fire({
                        icon: " Warning",
                        title: "Oops...",
                        text: "Password cannot be changed for Google accounts",
                      });
                    } 
                    else {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Profile could not  be updated!",
                      });
                    }
                  });
              }
           else {
            if(password==npassword)
            {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: " New Password and Old Password should not be same!",
              });

            }
            else
            {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: " Confirm Password and New Password should be same!",
              });
            }
         
           }
          
          
          }
        else {
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
      <h1 className="text-3xl text-transparent bg-clip-text font-heading font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
        Welcome {userinfo.first_name}
      </h1>
      <div className="w-[70%] relative my-10">
        <div
          className={`absolute inset-0 w-full rounded-lg mt-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center`}
        ></div>
        <div
          className={`relative w-full rounded-lg mt-5 bg-${theme}-secondary flex flex-row`}
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
              Edit PersonalDetails
            </button>
          </div>
          <div className="w-[70%] min-h-[70%] flex flex-col">
            {selected == 1 && (
              <div className="w-full flex flex-col items-center justify-center px-8 py-3">
                <h3 className="text-2xl font-bold">
                  {userinfo.first_name} {userinfo.last_name}
                </h3>
                <p className="text-sm ">{user}</p>
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
                ) : (
                  <></>
                )}
              </div>
            )}
            {selected == 3 && (
              <div className="w-full flex flex-col items-center justify-center px-8 py-3">
                <div className="my-5 flex flex-row">
                  <h2 className="font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
                    Change Name{" "}
                  </h2>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md p-4 w-full outline-none bg-gray-200 text-black"
                    placeholder="Enter new name for your account"
                  ></input>
                </div>
                <div className=" my-5 flex flex-row">
                  <h1 className="font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
                    Change Email{" "}
                  </h1>
                  <input
                    onChange={(e) => setMail(e.target.value)}
                    className="rounded-md p-4 w-full outline-none bg-gray-200 text-black"
                    placeholder="Enter New Email"
                  ></input>
                </div>
                <div className="my-5">
                  <h1 className="font-heading text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end ">
                    Change Password{" "}
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
