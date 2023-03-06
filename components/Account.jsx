import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
const Account = () => {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState(0);
  const [user, setUser] = useState();
  const [userinfo, setUserinfo] = useState(" ");
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
          Router.push("/login");
        }
      } else {
        setUser("Unauthorized");
      }
    } catch (err) {
      setUser("Unauthorized");
      console.log(err);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
