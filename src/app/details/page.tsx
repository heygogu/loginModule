"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import Profile from "@/assets/images/profile.png";
import "@/app/globals.css";
import Email from "@/assets/images/email.png";
import Visible_On from "@/assets/images/visibility.png";
import Visible_Off from "@/assets/images/visibility_off.png";
import "react-international-phone/style.css";

const Details = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkedItem, setCheckedItem] = useState(false);
  function handleChange(event: any) {
    setCheckedItem(event.target.checked);
  }
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
              <h2 className="mt-3 mb-3 font-semibold text-lg">Sign Up</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row mt-1 p-3">
              <div className="col-12 border-1 border-gray-400 flex justify-between pl-3 pr-3 pt-1 pb-1 rounded-lg mb-2">
                <input
                  className="font-light text-sm"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  style={{ outline: "none" }}></input>
                <Image
                  className="bg-red-600 rounded-full"
                  src={Profile}
                  width={20}
                  height={5}
                  alt="logo"
                />
              </div>
              <div className="col-12 border-1 border-gray-400 flex justify-between pl-3 pr-3 pt-1 pb-1 rounded-lg mb-2">
                <input
                  className="font-light text-sm"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  style={{ outline: "none" }}></input>
                <Image
                  className="bg-red-600 rounded-full"
                  src={Email}
                  width={20}
                  height={5}
                  alt="logo"
                />
              </div>
              <div className="col-12 border-1 border-gray-400 flex justify-between pl-3 pr-3 pt-1 pb-1 rounded-lg mb-0">
                <input
                  className="font-light text-sm"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{ outline: "none" }}></input>
                <Image
                  className="bg-red-600 rounded-full"
                  src={Visible_Off}
                  width={20}
                  height={5}
                  alt="logo"
                />
              </div>
            </div>
            <div className="row pb-2">
              <div className="col col-1">
                <input
                  type="checkbox"
                  checked={checkedItem}
                  className="w-10 relative right-2"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col col-11 relative right-2 top-1">
                <p className="text-xs">
                  By Checking it, You agree to the{" "}
                  <span className="text-red-500 underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-red-500 underline">
                    {" "}
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
            <div className="row mt-3">
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

export default Details;
