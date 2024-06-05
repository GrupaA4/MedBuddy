/* import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin_report_page.module.css";
import Logo from "../assets/MedBuddy.png";
import Megafon from "../assets/megafon.png";
import Cookies from "js-cookie";

const AdminReportPage = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

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

  const fetchReports = async (page) => {
    try {
      const start = (page - 1) * usersPerPage + 1;
      const end = page * usersPerPage;
      const response = await fetch(
        `http://localhost:7264/medbuddy/getreports/${start}/${end}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        const userReportedPromises = data.reports.map(async (report) => {
          const reportedResponse = await fetch(
            `http://localhost:7264/medbuddy/viewprofile/${report.reportedUserId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Basic ${authorisation}`,
              },
            }
          );

          if (reportedResponse.status === 200) {
            const userData = await reportedResponse.json();
            return {
              ...report,
              ...userData,
            };
          }
          return null;
        });

        const reportedDetails = await Promise.all(userReportedPromises);
        setReports(reportedDetails.filter((report) => report !== null));
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage, authorisation]);

  const handleReport = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:7264/medbuddy/softdeleteuser/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        }
      );

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.filter((report) => report.reportedUserId !== userId)
        );
        // Re-fetch reports to update the list
        fetchReports(currentPage);
      } else {
        console.error("Failed to delete reported account");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
            <button
              className={styles.container1_admin_report_page__before}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &#8678;
            </button>
            <button
              className={styles.container1_admin_report_page__next}
              onClick={handleNextPage}
              disabled={reports.length < usersPerPage}
            >
              &#8680;
            </button>
          </div>
        </div>

        {reports.map((report) => (
          <div
            key={report.reportedUserId}
            className={styles.container1_admin_report_page__square}
          >
            <div className={styles.container1_admin_report_page__square__icon}>
              {report.profileImage && report.imageExtension ? (
                <img
                  src={`data:image/${report.imageExtension};base64,${report.profileImage}`}
                  alt="Profile"
                  className={styles.profile_image}
                />
              ) : (
                <p>PHOTO</p>
              )}
            </div>
            <p className={styles.container1_admin_report_page__square__data}>
              Person reported:{" "}
              <span>
                {report.lastName} {report.firstName}{" "}
              </span>
              <br />
              Email person reported: <span>{report.email}</span>
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
        <img
          src={Megafon}
          className={styles.container2_admin_report_page__square1__icon__image}
          alt="Megafon"
        />
        <div className={styles.container2_admin_report_page__text}>
          Vezi ultimele raportari!
        </div>
      </div>
    </div>
  );
};

export default AdminReportPage; */


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin_report_page.module.css";
import Logo from "../assets/MedBuddy.png";
import Megafon from "../assets/megafon.png";
import Cookies from "js-cookie";

const AdminReportPage = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 5;
  const navigate = useNavigate();

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

  const fetchReports = async (page) => {
    setIsLoading(true);
    try {
      const start = (page - 1) * usersPerPage + 1;
      const end = page * usersPerPage;
      const response = await fetch(
        `http://localhost:7264/medbuddy/getreports/${start}/${end}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        const userReportedPromises = data.reports.map(async (report) => {
          const reportedResponse = await fetch(
            `http://localhost:7264/medbuddy/viewprofile/${report.reportedUserId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Basic ${authorisation}`,
              },
            }
          );

          if (reportedResponse.status === 200) {
            const userData = await reportedResponse.json();
            return {
              ...report,
              ...userData,
            };
          }
          return null;
        });

        const reportedDetails = await Promise.all(userReportedPromises);
        const filteredReports = reportedDetails.filter(
          (report) => report !== null
        );
        setReports(filteredReports);

        // Check if this is the last page
        if (filteredReports.length < usersPerPage) {
          setIsLastPage(true);
        } else {
          // Check if there are more reports beyond the current page
          const nextStart = end + 1;
          const nextEnd = nextStart + usersPerPage - 1;
          const nextResponse = await fetch(
            `http://localhost:7264/medbuddy/getreports/${nextStart}/${nextEnd}`,
            {
              method: "GET",
              headers: {
                Authorization: `Basic ${authorisation}`,
              },
            }
          );

          if (nextResponse.status === 200) {
            const nextData = await nextResponse.json();
            setIsLastPage(nextData.reports.length === 0);
          } else {
            setIsLastPage(true);
          }
        }
      } else {
        console.error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage, authorisation]);

  const handleReport = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:7264/medbuddy/softdeleteuser/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Basic ${authorisation}`,
          },
        }
      );

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.filter((report) => report.reportedUserId !== userId)
        );
        // Re-fetch reports to update the list
        fetchReports(currentPage);
      } else {
        console.error("Failed to delete reported account");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage && !isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1 && !isLoading) {
      setCurrentPage((prevPage) => prevPage - 1);
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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
            <button
              className={styles.container1_admin_report_page__before}
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
            >
              &#8678;
            </button>
            <button
              className={styles.container1_admin_report_page__next}
              onClick={handleNextPage}
              disabled={isLastPage || isLoading}
            >
              &#8680;
            </button>
          </div>
        </div>

        {reports.map((report) => (
          <div
            key={report.reportedUserId}
            className={styles.container1_admin_report_page__square}
          >
            <div className={styles.container1_admin_report_page__square__icon}>
              {report.profileImage && report.imageExtension ? (
                <img
                  src={`data:image/${report.imageExtension};base64,${report.profileImage}`}
                  alt="Profile"
                  className={styles.profile_image}
                />
              ) : (
                <p>PHOTO</p>
              )}
            </div>
            <p className={styles.container1_admin_report_page__square__data}>
              Person reported:{" "}
              <span>
                {report.lastName} {report.firstName}{" "}
              </span>
              <br />
              Email person reported: <span>{report.email}</span>
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
        <img
          src={Megafon}
          className={styles.container2_admin_report_page__square1__icon__image}
          alt="Megafon"
        />
        <div className={styles.container2_admin_report_page__text}>
          Vezi ultimele raportari!
        </div>
      </div>
    </div>
  );
};

export default AdminReportPage;
