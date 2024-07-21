"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import "@/app/globals.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const Phone = ({ mobileNo }: { mobileNo: string }) => {
  const [phone, setPhone] = useState(null || mobileNo);
  return (
    <>
      <div className="h-screen container flex justify-center align-items-center">
        <div className=" w-4/12 box-border p-16 shadow-best rounded-3xl ">
          <div className="row">
            <div className="col-12 flex flex-col align-items-center">
              <Image src={Logo} height={100} width={100} alt="Logo" />
              <h2 className="mt-3 mb-3 font-semibold text-lg">Sign Up</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h1 className="font-semibold text-md">Enter Phone Number:</h1>
              <PhoneInput
                style={{ width: "100%", marginTop: "10px", marginLeft: "50px" }}
                defaultCountry="in"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <Link
                className=" text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg"
                href={{
                  pathname: "/verify-otp",
                  query: {
                    phoneNo: phone,
                  },
                }}>
                Continue
              </Link>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <h2 className="text-center text-xs text-gray-500">
                Already Registered ?
                <Link href={"/welcome"} className="text-red-600">
                  {` Sign In`}
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Phone;
