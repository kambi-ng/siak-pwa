import ky from "ky";
import { BaseResponse, SiakCookie } from "./interface";
import { Input, Options } from "ky/distribution/types/options";
import { json, redirect } from "react-router-dom";

export function kyWrapper(input: Input, options?: Options) {
  const cookieData: SiakCookie = JSON.parse(
    localStorage.getItem("auth") ?? "{}"
  );

  return ky(input, {
    ...options,
    headers: {
      "X-Siakng-Cc": cookieData.siakng_cc,
      "X-Mojavi": cookieData.mojavi,
      ...options?.headers,
    },
  });
}

export async function getOrRedirect<T>(input: Input, direct: true): Promise<T>;
export async function getOrRedirect<T>(
  input: Input,
  direct: false
): Promise<Response>;
export async function getOrRedirect<T>(input: Input, direct: boolean) {
  try {
    const response = await kyWrapper(input).json<BaseResponse<T>>();

    if (response.status !== 200) {
      throw new Error(response.message);
    }

    return direct ? response.data : json(response.data);
  } catch {
    return redirect("/auth");
  }
}
