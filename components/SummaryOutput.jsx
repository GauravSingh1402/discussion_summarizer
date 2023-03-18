import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Summary from "./SumaaryComp/Summary";
import Swal from "sweetalert2";
const SummaryOutput = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { kl, lsa, title ,convo_bart,text,bart} = router.query;
  return (
    <>
    {title && (
      <div className="flex flex-col items-center w-full px-5 py-8 justify-center gap-10">
      <h1 className="text-3xl text-transparent bg-clip-text font-heading font-bold bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end">
        Summary Output
      </h1>
      {convo_bart!=null && convo_bart!=undefined && convo_bart.length>=1?
      <>
       <div className="w-[90%] sm:w-[80%] md:w-[70%] relative my-10">
        <div
          className={`absolute inset-0 w-full rounded-lg mt-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center`}
        ></div>
        <div
          className={`relative w-full rounded-lg mt-5 bg-${theme}-secondary flex flex-col p-8`}
        >
          <h2 className="font-heading font-medium text-left my-3">
            Generated Title
          </h2>
      <div className='w-full md:w-[75%]'>
        <div className="flex w-full items-end justify-end bg-white text-black rounded-t-md">
        <div className="text-justify text-sm sm:text-lg w-full bg-white p-3 text-black rounded-b-md font-small min-h-[200px] max-h-[200px] h-[200px] overflow-y-auto overflow-x-hidden">
        {title}
      </div>
      </div>
      <div className="mt-5 md:mt-0 flex flex-col gap-5 sm:gap-0 md:gap-3 sm:flex-row justify-between md:justify-start items-center md:flex-col">
        	<button 
          onClick={() => {
                    navigator.clipboard.writeText(title); Swal.fire({
                      position: 'top-middle',
                      icon: 'success',
                      title: 'Copied Title',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }}
          className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all">
          Copy Title
        </button>
      </div>
    </div>
          <h2 className="font-heading font-medium text-left my-3">
            Top Summary
          </h2>
          <Summary title={title} summary={convo_bart} />
          <div>
            <hr className="h-px my-8 border-0 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"></hr>
          </div>
          <h2 className="font-heading font-medium text-left my-3">
            Summary
          </h2>
          <Summary title={title} summary={bart} />
        </div>
      </div>
      </>:
      <>
       <div className="w-[90%] sm:w-[80%] md:w-[70%] relative my-10">
        <div
          className={`absolute inset-0 w-full rounded-lg mt-5 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end blur-xl opacity-50 flex justify-center`}
        ></div>
        <div
          className={`relative w-full rounded-lg mt-5 bg-${theme}-secondary flex flex-col p-8`}
        >
          <h2 className="font-heading font-medium text-left my-3">
            Generated Title
          </h2>
          <div className='w-full flex flex-col gap-2 md:flex-row justify-between'>
        <div className="flex w-full md:w-[75%] items-end justify-end bg-white text-black rounded-md">
        <div className="text-justify text-sm sm:text-lg w-full bg-white p-3 text-black rounded-md font-small min-h-[200px] max-h-[200px] h-[200px] overflow-y-auto overflow-x-hidden">
        {title}
      </div>
      </div>
      <div className="mt-5 md:mt-0 flex flex-col gap-5 sm:gap-0 md:gap-3 sm:flex-row justify-between md:justify-start items-center md:flex-col">
        	<button 
          onClick={() => {
                    navigator.clipboard.writeText(title); Swal.fire({
                      position: 'top-middle',
                      icon: 'success',
                      title: 'Copied Title',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }}
          className="font-heading text-white bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end rounded-md px-2 py-1 sm:px-5 sm:py-2 text-sm sm:text-lg hover:scale-110 transition-all">
          Copy Title
        </button>
      </div>
    </div>
          <h2 className="font-heading font-medium text-left my-3">
            Top Summary
          </h2>
          <Summary title={title} summary={bart} />
          <div>
            <hr className="h-px my-8 border-0 bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end"></hr>
          </div>
          <h2 className="font-heading font-medium text-left my-3">
            Other Summaries
          </h2>
          <Summary title={title} summary={kl}/>
          <br/>
          <br/>
          <Summary title={title} summary={lsa} />
        </div>
      </div>
      </>
      }
    </div>
    )}
    </>
  );
};

export default SummaryOutput;
