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
    gender: true,
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
    errors: {},
  });

  const [profileImage, setProfileImage] = React.useState(null);
  const [profileImageExtension, setProfileImageExtension] = React.useState("");
  const [certificateImage, setCertificateImage] = React.useState(null);
  const [certificateImageExtension, setCertificateImageExtension] =
    React.useState("");

  const id = React.useId();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
      errors: {
        ...prevFormData.errors,
        [name]: false,
      },
    }));
  }

  function handleProfileImgChange(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);

      const fileExtension = file.name.split(".").pop();
      if (!["png", "jpg", "jpeg"].includes(fileExtension)) {
        alert("Please select a PNG or JPG file.");
        return;
      }
      setProfileImageExtension(fileExtension);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleCertificateImgChange(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setCertificateImage(reader.result);

      const fileExtension = file.name.split(".").pop();
      if (!["png", "jpg", "jpeg"].includes(fileExtension)) {
        alert("Please select a PNG or JPG file.");
        return;
      }
      setCertificateImageExtension(fileExtension);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const phoneRegex = /^\d{10}$/;
    const languageRegex = /^[A-Z]{2}$/;
    const textRegex = /^[a-zA-Z]+$/;
    const firstNameRegex = /^[a-zA-Z-]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let errors = {};

    if (!formData.email.match(emailRegex)) {
      errors.email = true;
    }
    if (!formData.lastName.match(textRegex)) {
      errors.lastName = true;
    }
    if (!formData.firstName.match(firstNameRegex)) {
      errors.firstName = true;
    }
    if (!formData.pronoun1.match(textRegex)) {
      errors.pronoun1 = true;
    }
    if (!formData.pronoun2.match(textRegex)) {
      errors.pronoun2 = true;
    }
    if (!formData.language.match(languageRegex)) {
      errors.language = true;
    }
    if (!formData.country.match(textRegex)) {
      errors.country = true;
    }
    if (!formData.city.match(textRegex)) {
      errors.city = true;
    }
    if (!formData.phoneNumber.match(phoneRegex)) {
      errors.phoneNumber = true;
    }

    if (Object.keys(errors).length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        errors: errors,
      }));
      return;
    }

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
      imageExtension: profileImageExtension,
      certificateImage: certificateImage,
      certificateExtension: certificateImageExtension,
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
            Authorization: null,
          },
          body: JSON.stringify(formattedData),
        }
      );
      if (response.status !== 201) {
        if (response.status === 418 || response.status === 500) {
          throw new Error("Internal backend error");
        } else if (response.status === 401) {
          throw new Error("Wrong email and password in the header");
        } else if (response.status === 400) {
          throw new Error(
            "Typo in the URL or not the right path variable type"
          );
        } else if (response.status === 403) {
          throw new Error("Another user with this email exists");
        } else {
          throw new Error("Unknown error");
        }
      } else {
        console.log("Successfull authentification");
      }
      console.log("am trecut de fetch");

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
        errors: {},
      });
      setProfileImage(null);
      // setProfileImageExtension(null);
      setCertificateImage(null);
      // setCertificateImageExtension(null);
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
                className={formData.errors.firstName ? "error" : ""}
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
                className={formData.errors.lastName ? "error" : ""}
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
                className={formData.errors.email ? "error" : ""}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-phone"}>Work Phone:</label>
              <input
                type="tel"
                onChange={handleChange}
                name="phoneNumber"
                value={formData.phoneNumber}
                id={id + "-phone"}
                className={formData.errors.phoneNumber ? "error" : ""}
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
                  // checked={formData.gender === "female"}
                  // onChange={handleChange}
                />
                <label htmlFor={id + "-female"}>Female:</label>

                <input
                  type="radio"
                  id={id + "-male"}
                  name="gender"
                  value="male"
                  // checked={formData.gender === "male"}
                  // onChange={handleChange}
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
                value={formData.dateOfBirth}
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
                className={formData.errors.pronoun1 ? "error" : ""}
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
                className={formData.errors.pronoun2 ? "error" : ""}
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
                className={formData.errors.country ? "error" : ""}
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
                className={formData.errors.city ? "error" : ""}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-clinic"}>Hospital/Work place:</label>
              <input
                type="text"
                onChange={handleChange}
                name="clinic"
                value={formData.clinic}
                id={id + "-clinic"}
              />
            </div>
            <div className="input-box">
              <label htmlFor={id + "-typeOfMedic"}>Specialization:</label>
              <input
                type="text"
                onChange={handleChange}
                name="typeOfMedic"
                value={formData.typeOfMedic}
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
                className={formData.errors.language ? "error" : ""}
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
