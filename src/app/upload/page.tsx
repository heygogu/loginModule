"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import "@/app/globals.css";
const Upload = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <>
      <div className="h-screen container flex justify-center align-items-center">
        <div className=" w-4/12 box-border p-12 shadow-best rounded-3xl ">
          <div className="row">
            <div className="col font-semibold">
              <Link href={""}>{"<-"}</Link>
            </div>
            <div className="col-12 flex flex-col align-items-center">
              <Image src={Logo} height={100} width={100} alt="Logo" />
              <h2 className="mt-3 mb-3 font-semibold text-lg">
                Finish Signing Up
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h1 className="text-red-600 text-center text-xs font-semibold">
              Step 3 of 3
            </h1>
            <div className="row mt-1 p-3">
              <div className="col-12 flex justify-center pl-3 pr-3 pt-1 pb-1 rounded-lg mb-0">
                <Image
                  className="rounded-full border-2 border-red-600"
                  src={""}
                  height={100}
                  width={100}
                  alt=""></Image>
              </div>
            </div>
            <div className="flex justify-center outline-none">
              <button className=" text-sm font-semibold mb-3">
                Upload Your Picture
              </button>
            </div>
            <div className="row mt-1 mb-2">
              <div className="col-12">
                <button
                  type="submit"
                  className=" text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
