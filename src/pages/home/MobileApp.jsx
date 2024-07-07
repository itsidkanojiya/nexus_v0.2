import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import AppContainer from "../../components/AppContainer";

const MobileApp = () => {
  return (
    <AppContainer className="py-14">
      <div className="grid sm:grid-cols-2 gap-6 place-items-center">
        <div className="flex justify-center sm:justify-between items-center p-2 rounded-xl w-full">
          <div className="">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[400px] w-[200px] md:h-[600px] md:w-[300px]">
              <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden  w-[172px] h-[372px] md:w-[272px] md:h-[572px] bg-white dark:bg-gray-800">
                <img src="https://backend.nexuspublication.com/storage/appscreenshot.png" className="dark:hidden w-full h-full" alt="" />
                <img src="https://backend.nexuspublication.com/storage/appscreenshot.png" className="hidden dark:block w-full h-full" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className=" space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold uppercase mb-3 text-center md:text-start ">Download App</h1>
            <p className="text-base text-gray-400 text-center md:text-start">Chillwave portland ugh, knausgaard fam polaroid iPhone. Man braid swag typewriter affogato, hella selvage wolf narwhal dreamcatcher.</p>
            <div className=" grid xs:grid-cols-2 gap-2">
              <a href="http://www.appstore.com" className=" border p-2 bg-secondary rounded-xl">
                <div className=" flex flex-col items-center gap-2">
                  <FaGooglePlay className="text-2xl text-white" />
                  <div className=" text-white flex flex-col justify-center items-center">
                    <p className=" text-sm text-white leading-4">Download on the</p>
                    <p className=" font-semibold">Google Play</p>
                  </div>
                </div>
              </a>
              <a href="http://www.appstore.com" className=" border p-2 bg-secondary rounded-xl">
                <div className=" flex flex-col items-center gap-2">
                  <FaApple className="text-2xl text-white" />
                  <div className=" text-white flex flex-col justify-center items-center">
                    <p className=" text-sm text-white leading-4">Download on the</p>
                    <p className=" font-semibold">App Store</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default MobileApp;
