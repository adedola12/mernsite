import React from "react";
import { Link } from "react-router-dom";

export default function PlanswiftPlugin() {
  return (
    <div>
      <div className="w-full h-auto relative bg-white px-4 py-8 md:px-8 md:py-16">
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col justify-center items-start gap-5">
              <div className="w-full md:w-[473px]">
                <span className="text-stone-950 text-4xl md:text-[64px] font-bold font-['DM Sans'] leading-tight">
                  Swift Quantity Takeoff using the
                </span>
                <span className="text-yellow-600 text-4xl md:text-[64px] font-bold font-['DM Sans'] leading-tight">
                  {" "}
                  ADLM Planswift Plugin
                </span>
              </div>
              <div className="w-full md:w-[565px] text-zinc-500 text-lg md:text-xl font-normal font-['DM Sans'] leading-normal">
                The ADLM Planswift plugin enhances the functionality of
                Planswift, making it a powerful tool for quantity surveyors and
                estimators. It provides precision, speed, and customization
                tailored to the Nigerian construction industry, ensuring
                compliance with BESMM4R standards.
              </div>
              <div className="flex justify-center items-start gap-3">
                <div className="px-4 py-3 bg-neutral-800 rounded-lg flex justify-center items-center gap-2.5">
                  <Link
                    className="text-white text-base font-normal font-['DM Sans'] leading-tight"
                    to={"https://wa.me/message/HS7PK467KV53I1"}
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-full md:w-[655px] h-auto md:h-[501px] mt-8 md:mt-0 rounded-lg"
          src="/courses image/PSPlug.jpg"
          alt="ADLM Planswift Plugin"
        />
      </div>
      <div className="w-full h-auto relative bg-cyan-950 px-4 py-8 md:px-8 md:py-16">
        <div className="flex flex-col justify-start items-start gap-5">
          <div className="text-white text-3xl md:text-5xl font-bold font-['DM Sans'] leading-tight">
            Outstanding Features
          </div>
          <div className="w-full md:w-[488px] text-zinc-300 text-lg md:text-xl font-normal font-['DM Sans'] leading-normal">
            The ADLM Planswift plugin offers numerous features that make
            quantity takeoff and estimation more efficient and accurate for
            construction projects.
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex justify-start items-center gap-2">
              <div className="p-2.5 bg-yellow-600 rounded-full flex justify-center items-center">
                <div className="w-5 h-5"></div>
              </div>
              <div className="text-zinc-300 text-base font-normal font-['DM Sans'] leading-tight">
                Fast Auto Takeoff
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="p-2.5 bg-yellow-600 rounded-full flex justify-center items-center">
                <div className="w-5 h-5"></div>
              </div>
              <div className="text-zinc-300 text-base font-normal font-['DM Sans'] leading-tight">
                Grouped Takeoff Items
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="p-2.5 bg-yellow-600 rounded-full flex justify-center items-center">
                <div className="w-5 h-5"></div>
              </div>
              <div className="text-zinc-300 text-base font-normal font-['DM Sans'] leading-tight">
                Structured in Line with BESMM4R
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="p-2.5 bg-yellow-600 rounded-full flex justify-center items-center">
                <div className="w-5 h-5"></div>
              </div>
              <div className="text-zinc-300 text-base font-normal font-['DM Sans'] leading-tight">
                Tailored for the Nigerian Construction Industry
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="p-2.5 bg-yellow-600 rounded-full flex justify-center items-center">
                <div className="w-5 h-5"></div>
              </div>
              <div className="text-zinc-300 text-base font-normal font-['DM Sans'] leading-tight">
                Detailed Reports
              </div>
            </div>
          </div>
        </div>
        <img
          className="w-full md:w-[525px] h-auto md:h-[427px] mt-8 md:mt-0 rounded-lg"
          src="/courses image/img/plug1.png"
          alt="Features"
        />
        <img
          className="w-full md:w-[391px] h-auto md:h-[381px] mt-8 md:mt-0 rounded-lg"
          src="/courses image/img/plug2.png"
          alt="Features"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-[720px] h-auto pl-4 pr-4 md:pl-20 md:pr-[458px] pt-8 pb-8 md:pb-[185px] bg-white flex flex-col justify-start items-start gap-[357px]">
          <div className="text-black text-3xl md:text-5xl font-bold font-['DM Sans'] leading-tight">
            Reviews
          </div>
          <div className="w-full px-4 py-3 bg-neutral-800 rounded-lg flex justify-center items-center gap-2.5">
            <Link
              className="text-white text-base font-normal font-['DM Sans'] leading-tight"
              to={
                "https://youtube.com/playlist?list=PLk1KkUNE9ZrMSApHFe3-YpiV7b-NbwhYM&si=3ACYP1Y--Wz1uf59"
              }
            >
              Request a demo
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[720px] h-auto relative bg-gray-200 flex flex-col justify-start items-start">
          <div className="text-black text-3xl md:text-5xl font-bold font-['DM Sans'] leading-tight">
            Reviews
          </div>
          <div className="w-[107px] h-[107px] bg-zinc-300 rounded-full mt-4"></div>
        </div>
      </div>
      <div className="w-full h-auto relative bg-white px-4 py-8 md:px-8 md:py-16">
        <div className="text-black text-2xl font-bold font-['DM Sans'] leading-normal">
          Other Products
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <div className="w-full h-auto rounded-lg border border-gray-200 p-4">
            <div className="w-full h-[183px] bg-zinc-100 rounded-lg mb-4">
              <img
                className=" h-[180px] w-full"
                src="/courses image/RateGen.jpg"
                alt="Features"
              />
            </div>
            <div className="text-black text-xl  font-['DM Sans'] md:text-2xl leading-normal">
              ADLM Rate Gen
            </div>
            <div className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 flex justify-start items-center gap-2 mt-4">
              <Link
                className="text-zinc-500 text-sm font-normal font-['DM Sans'] leading-tight"
                to={"/rate-gen"}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="w-full h-auto rounded-lg border border-gray-200 p-4">
            <div className="w-full h-[183px] bg-zinc-100 rounded-lg mb-4"></div>
            <div className="text-black text-xl font-normal font-['DM Sans'] leading-normal">
              ADLM Material Schedule Plugin
            </div>
            <div className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 flex justify-start items-center gap-2 mt-4">
              <div className="text-zinc-500 text-sm font-normal font-['DM Sans'] leading-tight">
                Learn More
              </div>
            </div>
          </div>
          <div className="w-full h-auto rounded-lg border border-gray-200 p-4">
            <div className="w-full h-[183px] bg-zinc-100 rounded-lg mb-4"></div>
            <div className="text-black text-xl font-normal font-['DM Sans'] leading-normal">
              ADLM Class
            </div>
            <div className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 flex justify-start items-center gap-2 mt-4">
              <div className="text-zinc-500 text-sm font-normal font-['DM Sans'] leading-tight">
                Learn More
              </div>
            </div>
          </div>
          <div className="w-full h-auto rounded-lg border border-gray-200 p-4">
            <div className="w-full h-[183px] bg-zinc-100 rounded-lg mb-4"></div>
            <div className="text-black text-xl font-normal font-['DM Sans'] leading-normal">
              ADLM Schedule of Works
            </div>
            <div className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 flex justify-start items-center gap-2 mt-4">
              <div className="text-zinc-500 text-sm font-normal font-['DM Sans'] leading-tight">
                Learn More
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start gap-4 mt-8">
          <div className="w-16 h-16 rounded-full border border-gray-200 flex justify-center items-center">
            <div className="w-6 h-6"></div>
          </div>
          <div className="w-16 h-16 rounded-full border border-gray-200 flex justify-center items-center">
            <div className="w-6 h-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
