import React, { useState, useEffect } from "react";
import "./Diagnoses.css";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Panel from "../common-components/panel.svg";
import Navbar from "../common-components/Navbar";
import Footer from "../common-components/Footer";
import EditableInput from "./input/EditableInput";
import NewDiagnoses from "./input/NewDiagnosis";

function Diagnostic() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState("Add new diagnosis");
  let { id } = useParams();

  useEffect(() => {
    const fetchUserMedicalHistory = async () => {
      const email = Cookies.get("user_email");
      const password = Cookies.get("user_pass");

      const credentials = btoa(`${email}:${password}`);

      try {
        const response = await fetch(
          `http://localhost:7264/medbuddy/getusermedicalhistory/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${credentials}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log("Data primita:", data);
        const formattedData = data.map((item) => ({
          id: item.id,
          title: item.diagnose,
          medication: item.treatment,
          doctor: item.name,
          date: item.date_treatment,
        }));
        setDiagnoses(formattedData);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchUserMedicalHistory();
  }, [id]);

  const handleDelete = async (entryId) => {
    const email = Cookies.get("user_email");
    const password = Cookies.get("user_pass");

    const credentials = btoa(`${email}:${password}`);

    try {
      const response = await fetch(
        `http://localhost:7264/medbuddy/removemedicalhistoryentry/${entryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Actualizează lista de diagnostice după ștergere
      setDiagnoses((prevDiagnoses) =>
        prevDiagnoses.filter((diagnosis) => diagnosis.id !== entryId)
      );
    } catch (error) {
      console.error("Error deleting medical history entry:", error);
    }
  };

  const handleUpdate = async (entryId, updatedDiagnosis, updatedTreatment) => {
    const email = Cookies.get("user_email");
    const password = Cookies.get("user_pass");

    const credentials = btoa(`${email}:${password}`);

    try {
      const response = await fetch(
        `http://localhost:7264/medbuddy/verifydiagnosis/${entryId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diagnosis: updatedDiagnosis,
            treatment: updatedTreatment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Actualizează lista de diagnostice după update
      setDiagnoses((prevDiagnoses) =>
        prevDiagnoses.map((diagnosis) =>
          diagnosis.id === entryId
            ? {
                ...diagnosis,
                title: updatedDiagnosis,
                medication: updatedTreatment,
              }
            : diagnosis
        )
      );
    } catch (error) {
      console.error("Error updating medical history entry:", error);
    }
  };

  // Handlers for updating the fields
  const handleTitleChange = (index, newValue) => {
    const updatedDiagnosis = newValue;
    const entryId = diagnoses[index].id;
    const updatedTreatment = diagnoses[index].medication;
    handleUpdate(entryId, updatedDiagnosis, updatedTreatment);
  };

  const handleMedicationChange = (index, newValue) => {
    const updatedTreatment = newValue;
    const entryId = diagnoses[index].id;
    const updatedDiagnosis = diagnoses[index].title;
    handleUpdate(entryId, updatedDiagnosis, updatedTreatment);
  };
  const addNewDiagnosis = () => {
    setIsClicked((isClicked) => !isClicked);
  };

  return (
    <>
      <div className="navbar-container-diagnosis">
        <Navbar />
      </div>
      <section className="introduction_section">
        <div className="introduction_section__text">
          <h1 className="introduction_section__text_title">
            Patient's Diagnoses
          </h1>
          <div className="introduction_section__text_description">
            The Diagnoses Page offers doctors a concise summary of past
            diagnoses and prescribed medications for a patient, complete with
            the prescribing doctor's details and dates, facilitating a clear and
            contextual review of their medical history.
            <br />
            Doctors can also alter the medication and diagnosis fields, ensuring
            that the patient's records are accurate and up-to-date based on the
            latest medical assessments and treatments.
          </div>
        </div>
        <img
          className="introduction_section__image"
          src={Panel}
          alt="An image"
        />
      </section>

      <section className="diagnoses_section">
        {diagnoses.map((diagnosis, index) => (
          <div key={index} className="diagnoses_section__diagnose">
            <div className="diagnoses_section__diagnose_column">
              <div className="diagnoses_section__diagnose_medication">
                <div className="diagnoses_section__diagnose_medication_bold">
                  Diagnosis:
                </div>
                <EditableInput
                  value={diagnosis.title}
                  onBlur={(newValue) => handleTitleChange(index, newValue)}
                />
              </div>
              <div className="diagnoses_section__diagnose_medication">
                <div className="diagnoses_section__diagnose_medication_bold">
                  Medication:
                </div>
                <EditableInput
                  value={diagnosis.medication}
                  onBlur={(newValue) => handleMedicationChange(index, newValue)}
                />
              </div>
            </div>
            <div className="diagnoses_section__diagnose_column_medic">
              {diagnosis.doctor}
            </div>
            <div className="diagnoses_section__diagnose_column_date">
              <div>{diagnosis.date}</div>
              <button
                className="delete-diagnoses"
                onClick={() => handleDelete(diagnosis.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="add_new_section">
        {isClicked && <NewDiagnoses id={id} />}
      </section>

      <section className="add-new-diagnoses-section">
        <div>
          <button className="add-new-diagnoses" onClick={addNewDiagnosis}>
            {!isClicked ? "Add new diagnoses" : "Cancel"}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Diagnostic;
