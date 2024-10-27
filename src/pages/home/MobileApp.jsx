import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import AppContainer from "../../components/AppContainer";

const MobileApp = () => {
  return (
    <AppContainer className="py-14">
      <div className="grid sm:grid-cols-2 gap-6 place-items-center">
        {/* App Screenshot */}
        <div className="flex justify-center sm:justify-between items-center p-2 rounded-xl w-full">
          <div>
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[400px] w-[200px] md:h-[600px] md:w-[300px]">
              <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[172px] h-[372px] md:w-[272px] md:h-[572px] bg-white dark:bg-gray-800">
                <img
                  src="https://backend.nexuspublication.com/storage/appscreenshot.jpg"
                  className="dark:hidden w-full h-full"
                  alt="App Screenshot"
                />
                <img
                  src="https://backend.nexuspublication.com/storage/appscreenshot.jpg"
                  className="hidden dark:block w-full h-full"
                  alt="App Screenshot"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="w-full">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-bold uppercase mb-4 text-center md:text-start">
              Download the Nexus Publication App
            </h1>
            
            <p className="text-lg text-gray-500 text-center md:text-start">
              Unlock a world of resources tailored for students and educators. With content for grades 1-12, 
              our app makes learning simple and accessible, while giving teachers powerful tools to create custom question papers.
            </p>
            
            <p className="text-base text-gray-400 text-center md:text-start">
              Whether you're a student ready to explore new study materials or a teacher looking to streamline assessments, 
              Nexus Publication is here to support you at every step.
            </p>
            
            <div className="grid xs:grid-cols-2 gap-3">
              <a
                href="http://www.appstore.com"
                className="border p-3 bg-secondary rounded-xl flex flex-col items-center gap-2"
              >
                <FaGooglePlay className="text-2xl text-white" />
                <div className="text-white flex flex-col justify-center items-center">
                  <p className="text-sm">Download on the</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </a>
              
              <a
                href="http://www.appstore.com"
                className="border p-3 bg-secondary rounded-xl flex flex-col items-center gap-2"
              >
                <FaApple className="text-2xl text-white" />
                <div className="text-white flex flex-col justify-center items-center">
                  <p className="text-sm">Download on the</p>
                  <p className="font-semibold">App Store</p>
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
