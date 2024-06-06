import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin_user_page.module.css";
import Logo from "../assets/MedBuddy.png";
import checklist from "../assets/checklist.png";

const UserPage = () => {
  const [medics, setMedics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const medicsPerPage = 5;
  const navigate = useNavigate();

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCookieValue = (name) => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const emailFromCookie = getCookieValue("user_email");
  const passwordFromCookie = getCookieValue("user_pass");
  const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);

  useEffect(() => {
    const fetchMedics = async () => {
      try {
        const response = await fetch(
          "http://localhost:7264/medbuddy/seerequestingmedics",
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${authorisation}`,
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          const medicDetailsPromises = data.medics.map(async (medicId) => {
            const medicResponse = await fetch(
              `http://localhost:7264/medbuddy/viewmedicprofile/${medicId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Basic ${authorisation}`,
                },
              }
            );

            if (medicResponse.ok) {
              const medic = await medicResponse.json();
              return { ...medic, medicId };
            }
            return null;
          });

          const medicDetails = await Promise.all(medicDetailsPromises);
          setMedics(medicDetails.filter((medic) => medic !== null));
        } else {
          console.error("Failed to fetch medics", response.status);
        }
      } catch (error) {
        console.error("Error fetching medics:", error);
      }
    };

    fetchMedics();
  }, [authorisation]);

  const handleAccept = async (medicId) => {
    console.log(`Accepting medic with ID: ${medicId}`);
    try {
      const response = await fetch(
        `http://localhost:7264/medbuddy/allowmedic/${medicId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        }
      );

      if (response.ok) {
        setMedics((prevMedics) =>
          prevMedics.filter((medic) => medic.medicId !== medicId)
        );
      } else {
        console.error("Failed to accept medic", response.status);
      }
    } catch (error) {
      console.error("Error accepting medic:", error);
    }
  };

  const handleCheck = async (medic) => {
    if (!medic || !medic.medicId) {
      console.error("Invalid medic object");
      return;
    }
  
    console.log(`Checking license for medic with ID: ${medic.medicId}`);
  
    const { certificateExtension, certificateImage } = medic;
  
    if (!certificateExtension || !certificateImage) {
      console.error("Missing certificate extension or image");
      return;
    }
  
    const mimeType = `image/${certificateExtension}`;
  
    if (!/^data:image\/[a-zA-Z]*;base64,/.test(`data:${mimeType};base64,`)) {
      console.error("Invalid MIME type for the image");
      return;
    }
  
    const licenseURL = `data:${mimeType};base64,${certificateImage}`;
  
    try {
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Medic License</title>
            <style>
              body, html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f0f0f0;
              }
              .centered-image-license {
                max-width: 50%;
                max-height: 50%;
                object-fit: contain;
                border: 1px solid #ccc;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
              }
            </style>
          </head>
          <body>
            <div class="license_class">
              <img src="${licenseURL}" alt="Medic License" class="centered-image-license" />
            </div>
          </body>
          </html>
        `);
        newTab.document.close();
      } else {
        console.error("Failed to open new tab");
      }
    } catch (error) {
      console.error("Error opening medic license:", error);
    }
  };

  const handleDeny = async (medicId) => {
    if (!medicId) {
      console.error("Invalid medicId");
      return;
    }

    console.log(`Denying medic with ID: ${medicId}`);
    try {
      const response = await fetch(
        `http://localhost:7264/medbuddy/softdeleteuser/${medicId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        }
      );

      if (response.ok) {
        setMedics((prevMedics) =>
          prevMedics.filter((medic) => medic.medicId !== medicId)
        );
      } else {
        console.error("Failed to deny medic account", response.status);
      }
    } catch (error) {
      console.error("Error denying medic:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(medics.length / medicsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastMedic = currentPage * medicsPerPage;
  const indexOfFirstMedic = indexOfLastMedic - medicsPerPage;
  const currentMedics = medics.slice(indexOfFirstMedic, indexOfLastMedic);

  console.log("Current medics:", currentMedics);

  return (
    <div className={styles.body_admin_user_page}>
      <div className={styles.admin_user_page_header}>
        <img
          src={Logo}
          className={styles.admin_user_page_header__image}
          alt="Logo"
        />
        <div className={styles.admin_user_page_header__paragraph}>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={() => navigate("/admin")}
          >
            Home
          </a>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={() => navigate("/report")}
          >
            Report
          </a>
          <a
            className={styles.admin_user_page_header__paragraph__part}
            onClick={redirectTop}
            style={{
              textDecoration: "underline",
              textDecorationColor: "#369986",
            }}
          >
            Manage Accounts
          </a>
        </div>
      </div>

      <div className={styles.admin_user_page_container1} id="current_users">
        <div className={styles.admin_user_page_container1__header}>
          <p className={styles.admin_user_page_container1__header__text}>
            Unverified accounts
          </p>
          <div className={styles.admin_user_page_container1__buttons}>
            <button
              className={styles.admin_user_page_container1__before}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &#8678;
            </button>
            <button
              className={styles.admin_user_page_container1__next}
              onClick={handleNextPage}
              disabled={currentMedics.length < medicsPerPage}
            >
              &#8680;
            </button>
          </div>
        </div>

        {currentMedics.map((medic, index) => {
          console.log("Medic information:", medic);
          return (
            <div
              key={medic.medicId || index}
              className={styles.admin_user_page_container1__square}
            >
              <div
                className={
                  styles.admin_user_page_container1__square__icon_and_data
                }
              >
                <div
                  className={styles.admin_user_page_container1__square__icon}
                >
                  {medic.profileImage && medic.imageExtension ? (
                    <img
                      src={`data:image/${medic.imageExtension};base64,${medic.profileImage}`}
                      alt="Profile"
                      className={styles.admin_user_page_profileImage}
                    />
                  ) : (
                    <p>No Photo</p>
                  )}
                </div>
                <div
                  className={styles.admin_user_page_container1__square__data}
                >
                  <div
                    className={
                      styles.admin_user_page_container1__square__data__info
                    }
                  >
                    NAME:{" "}
                    <span className={styles.name}>
                      {medic.lastName} {medic.firstName}
                    </span>
                  </div>
                  <div
                    className={
                      styles.admin_user_page_container1__square__data__info
                    }
                  >
                    {" "}
                    EMAIL: <span className={styles.email}>{medic.email}</span>
                  </div>
                  <div
                    className={
                      styles.admin_user_page_container1__square__data__info
                    }
                  >
                    MEDICAL LICENSE:{" "}
                    <span className={styles.medicalLicense}>
                      {medic.medicalLicense}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={
                  styles.admin_user_page_container1__square__data__buttons
                }
              >
                <button
                  className={styles.admin_user_page_container1__button1}
                  type="button"
                  onClick={() => handleAccept(medic.medicId || medic.id)}
                >
                  Accept
                </button>
                <button
                  className={styles.admin_user_page_container1__button2}
                  type="button"
                  onClick={() => handleDeny(medic.medicId || medic.id)}
                >
                  Deny
                </button>
                <button
                  className={styles.admin_user_page_container1__button3}
                  type="button"
                  onClick={() => handleCheck(medic)}
                >
                  Check License
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.admin_user_page_container2}>
        <img
          src={checklist}
          className={styles.admin_user_page_container2_checklistPhoto}
          alt="Checklist"
        />
        <div className={styles.admin_user_page_container2_upperText}>
          Handle today's requests!
        </div>
      </div>
    </div>
  );
};

export default UserPage;
