"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import "@/app/globals.css";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <>
      <div className="h-screen container flex justify-center align-items-center">
        <div className=" w-4/12 box-border p-16 shadow-best rounded-3xl ">
          <div className="row">
            <div className="col font-semibold">
              <Link href={""}>{"<-"}</Link>
            </div>
            <div className="col-12 flex flex-col align-items-center">
              <Image src={Logo} height={100} width={100} alt="Logo" />
              <h2 className="mt-3 mb-3 font-semibold text-lg">Welcome Back</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row mt-1 p-3">
              <div className="col-12 border-1 border-gray-400 pl-3 pr-3 pt-1 pb-1 rounded-lg mb-2">
                <input
                  className="font-light text-sm"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  style={{ outline: "none" }}></input>
              </div>
              <div className="col-12 border-1 border-gray-400 pl-3 pr-3 pt-1 pb-1 rounded-lg mb-0">
                <input
                  className="font-light text-sm"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{ outline: "none" }}></input>
              </div>
            </div>
            <div className="flex justify-end mb-1 relative bottom-3 right-1">
              <Link className="text-xs text-red-600 font-semibold " href={""}>Forgot Password ?</Link>
            </div>
            <div className="row mt-1">
              <div className="col-12">
                <button
                  type="submit"
                  className=" text-center bg-red-600 p-1 w-full d-block text-white font-medium rounded-lg">
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <div className="row mt-3">
            <div className="col-12">
              <h2 className="text-center text-xs text-gray-500">
                Don't Have an Account ?
                <Link href={"/welcome"} className="text-red-600">
                  {` Sign Up`}
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
