import { json } from "react-router-dom";
import { UserInfo, Homepage, UserSummary, SemesterHistory } from "../interface";
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
