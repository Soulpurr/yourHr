import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
function ProfilePage() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const [profile, setprofile] = useState([{}]);
  const getData = async () => {
    let data = await fetch("/api/getProfile", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    let res = await data.json();
    console.log(res);
    setprofile(res);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(profile);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between my-8">
          {/* User information section */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Personal Information
            </h2>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="mb-4">
                <label
                  className="font-bold text-gray-700 block mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <span className="text-gray-900">{profile[0].fname}</span>
              </div>
              <div className="mb-4">
                <label
                  className="font-bold text-gray-700 block mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <span className="text-gray-900">{profile[0].lname}</span>
              </div>
              <div className="mb-4">
                <label
                  className="font-bold text-gray-700 block mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <span className="text-gray-900">{profile[0].age}</span>
              </div>
              <div className="mb-4">
                <label
                  className="font-bold text-gray-700 block mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <span className="text-gray-900">{profile[0].email}</span>
              </div>
              <div className="mb-4">
                <label
                  className="font-bold text-gray-700 block mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <span className="text-gray-900">{profile[0].phoneNo}</span>
              </div>
            </div>
          </div>
          {/* File upload and display section */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Documents</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="mb-4">
                <label
                  className="font-bold text-gray-700 block mb-2"
                  htmlFor="fileDisplay"
                >
                  Resume
                </label>
                <iframe
                  src={profile[0].resume}
                  className="h-64 w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
