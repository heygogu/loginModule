import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import FaceBook from "@/assets/images/facebook.png";
import Google from "@/assets/images/google.png";
import Phone from "@/assets/images/phone.png";
import "@/app/globals.css";
const Home = () => {
  return (
    <>
      <div className="h-screen border-2 container flex justify-center align-items-center">
        <div className=" w-4/12 overflow-hidden box-border p-16 shadow-best rounded-3xl ">
          <div className="row">
            <div className="col-12 flex flex-col align-items-center">
              <Image src={Logo} height={100} width={100} alt="Logo" />
              <h2 className="mt-3 mb-3 font-semibold text-lg">
                Welcome to App
              </h2>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className=" bg-red-600 flex p-2 rounded-lg h-10 mb-2">
                <Image src={Phone} alt="Phone" height={2} width={23} />
                <Link
                  className=" text-center ms-20 text-white font-medium"
                  href={"/phone"}>
                  Continue with Phone
                </Link>
              </div>
              <div className=" bg-orange-600 flex p-2 rounded-lg h-10 mb-2">
                <Image src={Google} alt="Google" height={1} width={23} />
                <Link
                  className=" text-center ms-20 text-white font-medium"
                  href={"/"}>
                  Continue with Google
                </Link>
              </div>
              <div className=" bg-blue-600 flex p-2 rounded-lg h-10">
                <Image src={FaceBook} alt="Facebook" height={1} width={15} />
                <Link
                  className=" text-center ms-20 text-white font-medium"
                  href={"/"}>
                  Continue with Facebook
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <h2 className="text-center text-xs text-gray-500">
                Already Registered ?
                <Link href={"/welcome"} className="text-red-600">
                  Sign In
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
