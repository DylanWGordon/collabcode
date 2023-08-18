/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const InterviewList = () => {
  const { userData } = useContext(AppLevelContext);
  const { pendingStudents } = useContext(TeacherAdminPageContext);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const getInterviews = async () => {
      const interviewsRes = await fetch(
        `https://collab-code.onrender.com/interviews?ta_id=${userData.user.ta_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const interviewsData = await interviewsRes.json();
      setInterviews(interviewsData);
    };
    getInterviews();
  }, []);

  console.log(interviews, pendingStudents);

  

  return (
    <div id="interview-list-container" className="w-[50vw] h-[60vh]">
      <div
        id="interview-list-items"
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <h1 className="text-[4rem]">Scheduled Interviews</h1>
      </div>
    </div>
  );
};

export default InterviewList;
