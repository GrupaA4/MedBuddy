import React from "react"
import './Form.css';
import register from '../images/register.png';

export default function Form() {
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            repeat_password: "",
            birthDate: "",
            gender: "",
            pronoun1: "",
            pronoun2: "",
            country: "",
            city: "",
            hospital: "",
            specialization: "",
            language: "",
            license: ""


        }
    )

    const id = React.useId()

    function handleChange(event) {
        const { name, value, type, checked, files } = event.target;

        if (type === "file") {

            const file = files[0];

            if (file) {

                setFormData(prevFormData => ({
                    ...prevFormData,
                    [name]: file
                }));
            }
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    }


    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
    }

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
                                name="phone"
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
                                name="birthDate"
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
                            <label htmlFor={id + "-hospital"}>Hospital/Work place:</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="hospital"
                                value={formData.hospital}
                                id={id + "-hospital"}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor={id + "-specialization"}>Specialization:</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="specialization"
                                value={formData.specialization}
                                id={id + "-specialization"}
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

                            <label htmlFor={id + "-license"}>Upload medical license:</label>
                            <input
                                onChange={handleChange}
                                name="license"

                                id={id + "-license"}
                                type="file"

                            />

                        </div>

                    </div>


                    <button className="submit--button">Submit</button>
                </form>
            </div>
        </div>
    )
}
