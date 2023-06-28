import { ArrowLeft } from "@phosphor-icons/react";
import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { CourseDetailData, SemesterHistory } from "../interface";

export default function Detail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { classDetail, history } = useLoaderData() as {
    classDetail: CourseDetailData[];
    history: SemesterHistory[];
  };

  let courseName = "";
  history.forEach((sem) =>
    sem.scores.forEach((s) => {
      if (s.class_id == classId) {
        courseName = s.name;
      }
    })
  );

  return (
    <div className="flex flex-col gap-4 px-4 max-w-lg mx-auto bg-gray-100 h-screen">
      <div className="flex flex-row bg-primary-0 gap-4 absolute top-0 left-1/2 transform -translate-x-1/2 w-screen h-12 px-4 items-center max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-yellow-200 transition"
        >
          <ArrowLeft height={24} weight="bold" />
        </button>
        <strong>Score Detail</strong>
      </div>

      <div className="h-12" />
      <strong>{courseName}</strong>

      <table className="w-full">
        <thead className="text-left text-sm">
          <tr>
            <th>Komponen</th>
            <th>Bobot</th>
            <th>Nilai</th>
          </tr>
        </thead>

        <tbody className="text-xs">
          {classDetail.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.weight}</td>
              <td>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
