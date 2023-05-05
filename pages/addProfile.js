import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function FormPage() {
  const [recieved, setrecieved] = useState(true);
  const [doc, setfile] = useState();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    age: "",
    phoneNo: "",
    file: null,
    resume: "",
  });

  //uploading image to cloudianry
  const handleFile = async (e) => {
    e.preventDefault();
    setfile(formData.file);
    setrecieved(false);
    let data = new FormData();
    e.preventDefault();
    data.append("file", doc);
    data.append("cloud_name", "dkjsazmhu");
    data.append("api_key", "293469851296426");
    data.append("api_secret", "-sjV20vKr76U_NheYazXY5qW8wE");
    // data.append("upload_preset", "ml_default");
    data.append("upload_preset", "resume");
    data.append("resource_type", "video");
    // let img = await postImage(data);
    let img = await fetch(
      "https://api.cloudinary.com/v1_1/dkjsazmhu/image/upload",
      {
        method: "POST",
        body: data,
        header: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          "Allow-Control-Allow-Origin": "*",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    // setdata({ link: img.data.secure_url });
    let asset = await img.json();
    if (!asset.secure_url) {
      toast("Error upload again", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    console.log(asset);
    setrecieved(true);
    formData.resume = asset.secure_url;
  };
  const handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const name = event.target.name;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let profile = await fetch("/api/addProfile", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });
    let res = await profile.json();
    console.log(res);
    if (res.success) {
      toast("Profile successfully created", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Try again later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-500 py-6 mb-6">
        <h1 className="text-center text-white font-bold text-3xl">Profile</h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="fname"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="fname"
                  name="fname"
                  type="text"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lname"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="lname"
                  name="lname"
                  type="text"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="age"
                >
                  Age
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phoneNo"
                >
                  Phone Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phoneNo"
                  name="phoneNo"
                  type="tel"
                  value={formData.phoneNo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="file"
                >
                  Upload File
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleChange}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleFile}
                  className="ml-3 bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Upload
                </button>
                <div className="flex justify-center items-center">
                  <div
                    className={`${
                      recieved ? "hidden" : "block"
                    } border-t-4 border-blue-700 rounded-full animate-spin w-8 h-10`}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
