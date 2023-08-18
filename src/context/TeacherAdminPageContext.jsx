/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from "react";

const TeacherAdminPageContext = createContext();

export const TeacherAdminPageProvider = ({ children }) => {
  const [pendingStudents, setPendingStudents] = useState([]);

  //Displays the Students in the Drop Down
  useEffect(() => {
    const getStudents = async () => {
      const studentRes = await fetch("/students");
      const studentData = await studentRes.json();
      setPendingStudents(studentData);
    };
    getStudents();
  }, []);

  useEffect(() => {
    const getTeacherData = async () => {
      try {
        // Using the refresh token to get an access token
        const verifyRefresh = await fetch(
          "https://collabcode.onrender.com/api/auth/refresh_token/teacher",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const verifyRefreshData = await verifyRefresh.json();
        console.log(verifyRefreshData);

        if (verifyRefreshData.status !== 200) {
          alert("Error refreshing token...");
        } else {
          // Using the refreshed access token to fetch protected data
          const verifyAccess = await fetch(
            "https://collabcode.onrender.com/api/auth/protected/teacher",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Token: verifyRefreshData.accessToken, // Corrected header name
              },
            }
          );

          const verifyAccessData = await verifyAccess.json();
          console.log(verifyAccessData); // User Information
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getTeacherData();
  }, []);

  return (
    <TeacherAdminPageContext.Provider
      value={{ pendingStudents, setPendingStudents }}
    >
      {children}
    </TeacherAdminPageContext.Provider>
  );
};

export default TeacherAdminPageContext;
