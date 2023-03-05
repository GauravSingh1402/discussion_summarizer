import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
const SummaryOutput = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { kl, lsa, title } = router.query;
  const link = process.env.NEXT_PUBLIC_API_URL;
  const profile = async (title, summary) => {
    const res = await axios(`${link}auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(res);
    const email = res.user_id;
    const udata = {
      email: email,
      sum: {
        summary: summary,
        title: title,
      },
    };
    if (res.status == 200 && res.error != undefined) {
      console.log("AUTH SUCCESS");
      const response = await axios
        .post(`${link}save_summary`, udata, {
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
              text: "Summary saved  Successfully",
            });
            router.push("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid Credentials!",
            });
          }
        });
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-10">
      <h1 className="text-3xl text-transparent bg-clip-text font-heading font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
        Summary Output
      </h1>
      <div className="w-[70%] relative my-10">
        <div
          className={`absolute inset-0 w-full rounded-lg mt-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center`}
        ></div>
        <div
          className={`relative w-full rounded-lg mt-5 bg-${theme}-secondary flex flex-col p-8`}
        >
          <h2 className="font-heading font-medium text-left my-3">
            Generated Title
          </h2>
          <div className="flex justify-between ">
            <div className="text-justify w-[70%] md:w-[75%] bg-white p-7 text-black rounded-md font-small min-h-[100px] max-h-[100px] h-[100px] overflow-y-auto">
              {title}
            </div>
            <div className="flex flex-col">
              <button className=" mb-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
                Copy To ClipBoard
              </button>
              <button
                onClick={profile(title, "")}
                className="bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Save To Profile
              </button>
            </div>
          </div>
          <h2 className="font-heading font-medium text-left my-3">
            Top Summary
          </h2>
          <div className="flex justify-between ">
            <div className="text-justify w-[70%] md:w-[75%] bg-white p-7 text-black rounded-md font-small min-h-[200px] max-h-[200px] h-[200px] overflow-y-auto">
              {lsa}
            </div>
            <div className="flex flex-col">
              <button className=" mb-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
                Copy To ClipBoard
              </button>
              <button
                onClick={profile("", lsa)}
                className="bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Save To Profile
              </button>
            </div>
          </div>
          <div>
            <hr className="h-px my-8 border-0 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"></hr>
          </div>
          <h2 className="font-heading font-medium text-left my-3">
            Other Summaries
          </h2>
          <div className="flex justify-between">
            <div className="text-justify  w-[70%] md:w-[75%] bg-white p-7 text-black rounded-md font-small min-h-[200px] max-h-[200px] h-[200px] overflow-y-auto">
              {kl}
            </div>
            <div className="flex flex-col">
              <button className=" mb-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg">
                Copy To ClipBoard
              </button>
              <button
                onClick={profile("", kl)}
                className="bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Save To Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryOutput;
