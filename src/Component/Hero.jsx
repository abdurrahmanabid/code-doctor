import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router-dom';
import animationData from './../assets/hero.json';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 lg:p-8 mx-auto w-full max-w-6xl">
      <div className="w-full md:w-1/2 lg:w-2/5 -m-9 md:hidden">
        <div className="mx-auto md:ml-auto md:mr-0 max-w-96 ">
          <Lottie animationData={animationData} loop={true} height={300} width={300} />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left pr-0 md:pr-6 lg:pr-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
          Professional AI Code Assistant
        </h1>
        <p className="text-sm sm:text-md text-gray-300 mb-4 sm:mb-6 max-w-xl">
          Advanced coding solutions powered by artificial intelligence to streamline development workflows and enhance productivity across enterprise environments.
        </p>
        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
          <Link className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-blue-700 transition duration-300 text-xs sm:text-sm font-medium" to={"/chat"}>
            Get Started
          </Link>
          <Link className="bg-transparent border border-gray-600 text-gray-300 px-4 sm:px-6 py-2 rounded hover:border-gray-400 hover:text-white transition duration-300 text-xs sm:text-sm font-medium">
            Documentation
          </Link>
        </div>
      </div>

      {/* Lottie Animation Section */}
      <div className="w-full md:w-1/2 lg:w-2/5 mt-8 md:mt-0 hidden md:block">
        <div className="mx-auto md:ml-auto md:mr-0 max-w-xs">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Hero;