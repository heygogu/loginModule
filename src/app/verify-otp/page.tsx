"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import OtpInput from "react-otp-input";
import Logo from "@/assets/images/logo.png";
import "@/app/globals.css";
const VerifyOTP = ({
  searchParams,
}: {
  searchParams: {
    phoneNo: string;
  };
}) => {
  console.log(searchParams.phoneNo);
  const [otp, setOtp] = useState("");
  return (
    <>
      <div className="h-screen container flex justify-center align-items-center">
        <div className=" w-4/12 box-border p-16 shadow-best rounded-3xl ">
          <div className="row">
            <div className="col font-semibold">
              <Link
                href={{
                  pathname: "/phone",
                  query: {
                    mobile: searchParams.phoneNo,
                  },
                }}>
                {"<-"}
              </Link>
            </div>
            <div className="col-12 flex flex-col align-items-center">
              <Image src={Logo} height={100} width={100} alt="Logo" />
              <h2 className="mt-3 mb-3 font-semibold text-lg">{`Confirm Your Number`}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div>
                <h1 className="mt-3 mb-1 font-semibold text-lg text-center">
                  Enter the code just sent to
                </h1>
                <h1 className=" mb-3 font-semibold text-lg text-center">
                  {searchParams.phoneNo}
                </h1>
              </div>
              <div className="flex justify-center">
                <OtpInput
                  value={otp}
                  inputStyle={{ width: "40px", height: "40px" }}
                  onChange={setOtp}
                  shouldAutoFocus={true}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <Link
                className=" text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg"
                href={"/"}>
                Verify
              </Link>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <h2 className="text-center text-md text-gray-500">
                Didn't get a text ?
                <Link href={"/welcome"} className="text-red-600">
                  {` Resend`}
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
