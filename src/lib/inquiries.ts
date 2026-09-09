import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { sendInquiryEmail } from "@/lib/email";

export type Inquiry = {
  id: string;
  type: "quote" | "newsletter";
  createdAt: string;
  name?: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  quantity?: string;
  category?: string;
  message?: string;
};

const filePath = path.join(process.cwd(), "data", "submissions.json");

async function readAll(): Promise<Inquiry[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as Inquiry[];
  } catch {
    return [];
  }
}

export async function saveInquiry(entry: Omit<Inquiry, "id" | "createdAt">) {
  const all = await readAll();
  const inquiry: Inquiry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  all.unshift(inquiry);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(all, null, 2), "utf8");
  await sendInquiryEmail(inquiry);
  return inquiry;
}
