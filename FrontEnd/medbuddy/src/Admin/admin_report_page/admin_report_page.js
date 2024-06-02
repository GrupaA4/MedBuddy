import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin_report_page.module.css";
import Logo from "../assets/MedBuddy.png";
import Megafon from "../assets/megafon.png";
import Cookies from "js-cookie";

const AdminReportPage = () => {
  const [reports, setReports] = useState([]);
  const [reportToStartWith, setReportToStartWith] = useState([]);
  const [reportToEndLoad, setReportToEndLoad] = useState([]);
  const [reportedUserId, setReportedUserId] = useState([]);
  const [reporterUserId, setReporterUserId] = useState([]);
  const [message, setMessage] = useState([]);

  const [reportedUserEmail, setReportedUserEmail] = useState([]);
  const [reportedUserFirstName, setReportedUserFirstName] = useState([]);
  const [reportedUserLastName, setReportedUserLastName] = useState([]);
  const [reporterUserFirstName, setReporterUserFirstName] = useState([]);
  const [reporterUserLastName, setReporterUserLastName] = useState([]);

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

  //am nevoie de un cookie cu email si parola la admin ca sa pot sa fac fetchurile

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const start = 1;
        const end = 10;
        const response = await fetch(
          `http://localhost:7264/medbuddy/getreports/${start}/${end}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${authorisation}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setReports(data.reports);
        } else {
          console.error("Failed to fetch reports");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [authorisation]);

  const handleReport = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:7264/medbuddy/softdeleteuser/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to delete reported account");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };
  
  return (
    <div className={styles.body_admin_report_page}>
      <div className={styles.header}>
        <img src={Logo} className={styles.header__image} alt="Your image" />
        <div className={styles.header__paragraph}>
          <a
            onClick={() => navigate("/admin")}
            className={styles.header__paragraph__part}
          >
            Home
          </a>
          <a
            onClick={redirectTop}
            className={styles.header__paragraph__part}
            style={{
              textDecoration: "underline",
              textDecorationColor: "#369986",
            }}
          >
            Report
          </a>
          <a
            onClick={() => navigate("/user")}
            className={styles.header__paragraph__part}
          >
            Manage Accounts
          </a>
        </div>
      </div>

      <div className={styles.container1_admin_report_page} id="current_users">
        <div className={styles.container1_admin_report_page__header}>
          <p className={styles.container1_admin_report_page__header__text}>
            Reported accounts
          </p>
          <div className={styles.container1_admin_report_page__buttons}>
            <button className={styles.container1_admin_report_page__before}>
              &#8678;
            </button>
            <button className={styles.container1_admin_report_page__next}>
              &#8680;
            </button>
          </div>
        </div>

        {reports.map((report, i) => (
          <div key={i} className={styles.container1_admin_report_page__square}>
            <div className={styles.container1_admin_report_page__square__icon}>
              <p>PHOTO</p>
            </div>
            <p className={styles.container1_admin_report_page__square__data}>
              Person reported:{" "}
              <span>
                {report.reportedLastName} {report.reportedFirstName} {i + 1}
              </span>
              <br />
              Email person reported: <span>{report.reportedEmail}</span>
              <br />
              Reporter:{" "}
              <span>
                {report.reporterLastName} {report.reporterFirstName}
              </span>
              <br />
              Message: <span>{report.message}</span>
              <br />
              <button
                className={styles.container1_admin_report_page__button1}
                type="button"
                onClick={() => handleReport(report.reportedUserId)}
              >
                Report
              </button>
            </p>
          </div>
        ))}
      </div>

      <div className={styles.container2_admin_report_page}>
        <div className={styles.icon__and__text}>
          <div className={styles.container2_admin_report_page__square1__icon}>
            <img
              src={Megafon}
              className={
                styles.container2_admin_report_page__square1__icon__image
              }
              alt="Megafon"
            />
          </div>
          <div className={styles.container2_admin_report_page__text}>
            Vezi ultimele raportari!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportPage;
