import React from "react";
import "./Form.css";
import register from "../images/register.png";
import Cookies from "js-cookie";
import { redirect, useNavigate } from "react-router-dom";

export default function Form() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    gender: "",
    pronoun1: "",
    pronoun2: "",
    dateOfBirth: "",
    language: "",
    country: "",
    city: "",
    phoneNumber: "",
    profileImage: "",
    imageExtensioin: "",
    typeOfMedic: "",
    clinic: "",
    certificateImage: "",
    certificateExtension: "",
    admin: false,
  });

  const [profileImage, setProfileImage] = React.useState(null);
  const [profileImageExtension, setProfileImageExtension] =
    React.useState(null);

  const [certificateImage, setCertificateImage] = React.useState(null);
  const [certificateImageExtension, setCertificateImageExtension] =
    React.useState(null);

  const id = React.useId();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleProfileImgChange(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(new Uint8Array(reader.result));
    };
    if (file) {
      reader.readAsArrayBuffer(file);
      const fileExtension = file.name.split(".").pop().toLowerCase();
      setProfileImageExtension(fileExtension);
    }
  }

  function handleCertificateImgChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCertificateImage(new Uint8Array(reader.result));
    };
    if (file) {
      reader.readAsArrayBuffer(file);
      const fileExtension = file.name.split(".").pop().toLowerCase();
      setCertificateImageExtension(fileExtension);
    }
  }
  //   const handleProfileImgChange = (event) => {
  //     const file = event.target.files[0];
  //     console.log("Profile img: ", file);
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setProfileImage(new Uint8Array(reader.result));
  //       setProfileImageExtension(URL.createObjectURL(file));
  //     };

  //     if (file) {
  //       reader.readAsArrayBuffer(file);
  //     }
  //   };

  //   const handleCertificateImgChange = (event) => {
  //     const file = event.target.files[0];
  //     console.log("Certificate img: ", file);
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setCertificateImage(new Uint8Array(reader.result));
  //       setCertificateImageExtension(URL.createObjectURL(file));
  //     };

  //     if (file) {
  //       reader.readAsArrayBuffer(file);
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedData = {
      email: formData.email,
      password: formData.password,
      lastName: formData.lastName,
      firstName: formData.firstName,
      gender: formData.gender,
      pronoun1: formData.pronoun1,
      pronoun2: formData.pronoun2,
      dateOfBirth: formData.dateOfBirth.split("-").reverse().join("."),
      language: formData.language,
      country: formData.country,
      city: formData.city,
      phoneNumber: formData.phoneNumber,
      typeOfMedic: formData.typeOfMedic,
      clinic: formData.clinic,
      profileImage: profileImage,
      profileImageExtension: profileImageExtension,
      certificateImage: certificateImage,
      certificateImageExtension: certificateImageExtension,
      admin: formData.admin,
    };

    console.log("Data to be sent: ", formattedData);

    try {
      const response = await fetch(
        "http://localhost:7264/medbuddy/signupmedic",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );
      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      Cookies.set(`user_email`, formattedData.email, { expires: 7 });
      Cookies.set(`user_pass`, formattedData.password, { expires: 7 });
      setFormData({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        gender: "",
        pronoun1: "",
        pronoun2: "",
        dateOfBirth: "",
        language: "",
        country: "",
        city: "",
        phoneNumber: "",
        typeOfMedic: "",
        clinic: "",
        admin: false,
      });
      setProfileImage(null);
      setProfileImageExtension(null);
      setCertificateImage(null);
      setCertificateImageExtension(null);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="form--container">
      <img src={register} alt="register_photo" className="register--photo" />
      <div className="box--container">
        <h2 className="form--title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="user--details">
            <div className="input-box">
              <label htmlFor={id + "-firstName"}>First Name:</label>
              <input
                type="text"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
                id={id + "-firstName"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-lastName"}>Last Name:</label>
              <input
                type="text"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
                id={id + "-lastName"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-email"}>Email:</label>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                id={id + "-email"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-phone"}>Work Phone:</label>
              <input
                type="tel"
                onChange={handleChange}
                name="phoneNumber"
                value={formData.phone}
                id={id + "-phone"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-password"}>Password:</label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                id={id + "-password"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-repeat_password"}>Rewrite password:</label>
              <input
                type="password"
                onChange={handleChange}
                name="repeat_password"
                value={formData.repeat_password}
                id={id + "-repeat_password"}
              />
            </div>

            <div className="gender--section">
              <span>Gender:</span>
              <div className="gender--types">
                <input
                  type="radio"
                  id={id + "-female"}
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <label htmlFor={id + "-female"}>Female:</label>

                <input
                  type="radio"
                  id={id + "-male"}
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <label htmlFor={id + "-male"}>Male</label>
              </div>
            </div>

            <div className="input-box">
              <label htmlFor={id + "-birthDate"}>Date of Birth:</label>
              <input
                type="date"
                onChange={handleChange}
                name="dateOfBirth"
                value={formData.birthDate}
                id={id + "-birthDate"}
              />
            </div>

            <div className="input-box">
              <label htmlFor={id + "-pronoun1"}>Pronoun1:</label>
              <input
                type="text"
                onChange={handleChange}
                name="pronoun1"
                value={formData.pronoun1}
                id={id + "-pronoun1"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-pronoun2"}>Pronoun2:</label>
              <input
                type="text"
                onChange={handleChange}
                name="pronoun2"
                value={formData.pronoun2}
                id={id + "-pronoun2"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-country"}>Country:</label>
              <input
                type="text"
                onChange={handleChange}
                name="country"
                value={formData.country}
                id={id + "-country"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-city"}>City:</label>
              <input
                type="text"
                onChange={handleChange}
                name="city"
                value={formData.city}
                id={id + "-city"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-clinic"}>Hospital/Work place:</label>
              <input
                type="text"
                onChange={handleChange}
                name="clinic"
                value={formData.hospital}
                id={id + "-clinic"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-typeOfMedic"}>Specialization:</label>
              <input
                type="text"
                onChange={handleChange}
                name="typeOfMedic"
                value={formData.specialization}
                id={id + "-typeOfMedic"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-language"}>Language:</label>
              <input
                type="text"
                onChange={handleChange}
                name="language"
                value={formData.language}
                id={id + "-language"}
              />
            </div>

            <div className="upload--file">
              <label htmlFor={id + "-profileImage"}>
                Upload profile Image:
              </label>
              <input
                onChange={handleProfileImgChange}
                name="profileImage"
                id={id + "-profileImage"}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
            </div>

            <div className="upload--certificate">
              <label htmlFor={id + "-certificateImage"}>
                Upload medical certificate:
              </label>
              <input
                onChange={handleCertificateImgChange}
                name="certificateImage"
                id={id + "-certificateImage"}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
            </div>
          </div>

          <button className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
