import { cookies } from "next/headers";

export type Locale = "id" | "en";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const val = cookieStore.get("locale")?.value;
  return val === "en" ? "en" : "id";
}
