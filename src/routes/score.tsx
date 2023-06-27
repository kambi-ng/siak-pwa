import React from "react";
import { getOrRedirect } from "../utils";
import { SemesterHistory, UserSummary } from "../interface";
import { json, useLoaderData } from "react-router-dom";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export async function historyLoader() {
  const summary = await getOrRedirect<UserSummary>(
    `${import.meta.env.VITE_API_URL}/academic/summary`,
    true
  );
  const history = await getOrRedirect<SemesterHistory[]>(
    `${import.meta.env.VITE_API_URL}/academic/history`,
    true
  );
  return json({ summary, history });
}

function SemesterBox({ sem }: { sem: SemesterHistory }) {
  return (
    <div className="p-4 rounded-md bg-gray-200 flex flex-col gap-2">
      <strong>
        {sem.period} - Semester {sem.semester}
      </strong>

      {sem.scores.map((score) => (
        <div className="flex flex-row gap-4 items-center border rounded-md border-black w-full">
          <div className="min-w-[4rem] min-h-[4rem] text-center font-bold text-lg bg-gray-400 rounded-tl-md rounded-bl-md items-center justify-center flex flex-col flex-none">
            <span>{score.final_index}</span>
            <span className="text-xs">{score.final_score}</span>
          </div>

          <div className="flex flex-col gap-1">
            <strong className="text-sm">{score.name}</strong>
            <span className="text-xs">
              {score.class} - {score.credits} SKS - {score.code}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function IPGraph({ summary }: { summary: UserSummary }) {
  const data = summary.terms
    .slice()
    .reverse()
    .filter((term) => term.data !== null)
    .map((term) => ({
      name: term.period + "-" + term.term,
      gp: term.data?.grade_point_average,
      gpa: term.data?.total_passed_grade_point_average,
    }));

  return (
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="gp" stroke="#8884d8" />
      <Line type="monotone" dataKey="gpa" stroke="#82ca9d" />
    </LineChart>
  );
}

export default function Score() {
  const { history, summary } = useLoaderData() as {
    summary: UserSummary;
    history: SemesterHistory[];
  };

  return (
    <div className="flex flex-col gap-4">
      <IPGraph summary={summary} />
      {history.map((sem) => (
        <SemesterBox sem={sem} key={sem.period + sem.semester} />
      ))}
    </div>
  );
}
