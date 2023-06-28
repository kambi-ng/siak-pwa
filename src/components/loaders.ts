import { LoaderFunctionArgs, json } from "react-router-dom";
import {
  UserInfo,
  Homepage,
  UserSummary,
  SemesterHistory,
  CourseDetailData,
} from "../interface";
import { getOrRedirect } from "../utils";

export async function userLoader() {
  return getOrRedirect<UserInfo>(`${import.meta.env.VITE_API_URL}/me`, false);
}

export async function homeLoader() {
  return getOrRedirect<Homepage>(`${import.meta.env.VITE_API_URL}/home`, false);
}

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

export async function scoreLoader({ params }: LoaderFunctionArgs) {
  const classDetail = await getOrRedirect<CourseDetailData[]>(
    `${import.meta.env.VITE_API_URL}/academic/course/${params.classId}`,
    true
  );
  const history = await getOrRedirect<SemesterHistory[]>(
    `${import.meta.env.VITE_API_URL}/academic/history`,
    true
  );
  return json({ classDetail, history });
}

export async function profileLoader() {
  return getOrRedirect<UserSummary>(
    `${import.meta.env.VITE_API_URL}/academic/summary`,
    false
  );
}
