"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import "@/app/globals.css";
const Reset = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <>
      <div className="h-screen container flex justify-center align-items-center">
        <div className=" w-4/12 box-border p-16 shadow-best rounded-3xl ">
          <div className="row">
            <div className="col-12 flex flex-col align-items-center">
              <Image src={Logo} height={100} width={100} alt="Logo" />
              <h2 className="mt-3 mb-3 font-semibold text-lg">
                Reset Your Password
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row mt-1 p-3">
              <div className="col-12 border-1 border-gray-400 pl-3 pr-3 pt-1 pb-1 rounded-lg mb-2">
                <input
                  className="font-light text-sm"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old Password"
                  style={{ outline: "none" }}></input>
              </div>
              <div className="col-12 border-1 border-gray-400 pl-3 pr-3 pt-1 pb-1 rounded-lg mb-0">
                <input
                  className="font-light text-sm"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  style={{ outline: "none" }}></input>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-12">
                <button
                  type="submit"
                  className=" text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;