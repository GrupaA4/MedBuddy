import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin_main_page.module.css";
import Logo from "./Logo.png";
import Admin from "./Admin.png";

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

const AdminMainPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [currentFetch, setCurrentFetch] = useState(null);
  const usersPerPage = 5;
  const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);

  useEffect(() => {
    const titleElement = document.querySelector(
      `.${styles.container2__admin__main__page__title}`
    );
    const texts = ["Welcome back,", "     Admin!"];
    let index = 0;
    let textIndex = 0;
    let finalText = "";

    function writeText() {
      let currentText = texts[textIndex];
      if (index < currentText.length) {
        finalText += currentText[index];
        titleElement.innerHTML = finalText;
        index++;
        setTimeout(writeText, 100);
      } else {
        index = 0;
        textIndex++;
        if (textIndex < texts.length) {
          finalText += "<br>";
          finalText += " ";
          setTimeout(writeText, 100);
        }
      }
    }

    setTimeout(writeText, 800);
  }, []);

  const redirectTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchUsers = async (pageNum) => {
    if (currentFetch) {
      await currentFetch;
    }
    const fetchPromise = (async () => {
      try {
        const start = (pageNum - 1) * usersPerPage + 1;
        const end = pageNum * usersPerPage;
        const responseIds = await fetch(
          `http://localhost:7264/medbuddy/getoldestusers/${start}/${end}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${authorisation}`,
            },
          }
        );

        if (responseIds.ok) {
          const data = await responseIds.json();
          const userIds = data.users;

          const userDetailsPromises = userIds.map(async (userId) => {
            const userResponse = await fetch(
              `http://localhost:7264/medbuddy/viewprofile/${userId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Basic ${authorisation}`,
                },
              }
            );

            if (userResponse.ok) {
              const userInfo = await userResponse.json();
              return {
                Id: userId,
                userFirstName: userInfo.firstName,
                userLastName: userInfo.lastName,
                userEmail: userInfo.email,
                userPhone: userInfo.phoneNumber,
                profileImage: userInfo.profileImage, // Adaugă informația despre imagine
                imageExtension: userInfo.imageExtension, // Adaugă informația despre extensia imaginii
              };
            }
            return null;
          });

          const userDetails = await Promise.all(userDetailsPromises);
          const filteredUsers = userDetails.filter((user) => user !== null);
          setUsers(filteredUsers);

          if (filteredUsers.length < usersPerPage) {
            setIsLastPage(true);
          } else {
            const nextStart = end + 1;
            const nextEnd = nextStart + usersPerPage - 1;
            const nextResponseIds = await fetch(
              `http://localhost:7264/medbuddy/getoldestusers/${nextStart}/${nextEnd}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Basic ${authorisation}`,
                },
              }
            );

            if (nextResponseIds.ok) {
              const nextData = await nextResponseIds.json();
              setIsLastPage(nextData.users.length === 0);
            } else {
              setIsLastPage(true);
            }
          }
        } else {
          console.error("Failed to fetch users information");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();

    setCurrentFetch(fetchPromise);
    await fetchPromise;
    setCurrentFetch(null);
  };

  useEffect(() => {
    const initFetch = async () => {
      await fetchUsers(page);
    };
    initFetch();
  }, [authorisation, page]);

  const handleReportClick = () => {
    navigate("/report");
  };

  const handleManageAccountsClick = () => {
    navigate("/user");
  };
  const handleLogOut = async (event) => {
    event.preventDefault();
    window.location.href='/';
};
  const handlePrevious = async () => {
    if (page > 1) {
      await fetchUsers(page - 1);
      setPage(page - 1);
    }
  };

  const handleNext = async () => {
    if (!isLastPage) {
      await fetchUsers(page + 1);
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.body__admin__main__page}>
      <div className={styles.header__admin__main__page}>
        <img
          src={Logo}
          className={styles.header__image__admin__main__page}
          alt="Logo"
        />
        <div className={styles.header__paragraph__admin__main__page}>
          <a
            onClick={redirectTop}
            className={styles.header__paragraph__admin__main__page__part}
          >
            Home
          </a>
          <a
            onClick={handleReportClick}
            className={styles.header__paragraph__admin__main__page__part}
          >
            Report
          </a>
          <a
            onClick={handleManageAccountsClick}
            className={styles.header__paragraph__admin__main__page__part}
          >
            Manage Accounts
          </a>
        </div>
      </div>

      <div className={styles.container1__admin__main__page} id="current_users">
        <div className={styles.container1__header__admin__main__page}>
          <p className={styles.container1__header__admin__main__text}>
            CURRENT USERS
          </p>
          <div
            className={styles.container1__header__admin__main__page__buttons}
          >
            <button
              className={styles.container1__header__admin__main__page__before}
              onClick={handlePrevious}
              disabled={page === 1}
            >
              &#8678;
            </button>
            <button
              className={styles.container1__header__admin__main__page__next}
              onClick={handleNext}
              disabled={isLastPage}
            >
              &#8680;
            </button>
          </div>
        </div>

        {users.map((user, i) => (
          <div key={i} className={styles.container1__admin__main__page__square}>
            <div className={styles.container1__admin__main__page__square__icon}>
              {user.profileImage && user.imageExtension ? (
                <img
                  src={`data:image/${user.imageExtension};base64,${user.profileImage}`}
                  alt="Profile"
                  className={styles.container1__admin__main__page_profile_image}
                />
              ) : (
                <p>No Photo</p>
              )}
            </div>
            <p className={styles.container1__admin__main__page__square__data}>
              NAME:{" "}
              <span>
                {user.userLastName} {user.userFirstName}
              </span>
              <br />
              EMAIL: <span>{user.userEmail}</span>
              <br />
              PHONE: <span>{user.userPhone}</span>
            </p>
          </div>
        ))}
      </div>

      <div className={styles.container2__admin__main__page}>
        <p className={styles.container2__admin__main__page__title}></p>
        <img
          src={Admin}
          className={styles.conatiner2__admin__main__page__image}
          alt="Admin"
        />
        <button
          className={styles.container2__admin__main__page__button1}
          type="button"
          onClick={handleReportClick}
        >
          REPORT
        </button>
        <br />
        <br />
        <button
          className={styles.container2__admin__main__page__button2}
          type="button"
          onClick={handleManageAccountsClick}
        >
          MANAGE ACCOUNTS
        </button>
        <br />
        <br />
        <button
          className={styles.container2__admin__main__page__button3}
          type="button"
          onClick={handleLogOut}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default AdminMainPage;
