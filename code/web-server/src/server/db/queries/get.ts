"use server";
import { Messages, Pdfs, PdfTextLine, User } from "@prisma/client";
import { Report } from "@prisma/client";
import { Response } from "~/server";
import { db } from "~/server/db";
import { getUserSession } from "~/actions/session";

export async function checkUserExists(
  aNumber: string
): Promise<Response<{ exists: boolean }>> {
  try {
    const user = await db.user.findUnique({ where: { aNumber } });
    return { data: { exists: Boolean(user) } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to check user existence", detail: error.message }] };
  }
}

export async function getUser(
  aNumber: string
): Promise<Response<{ user: User | null }>> {
  try {
    const user = await db.user.findUnique({
      where: { aNumber },
      include: { history: true, activityLogs: true, pdfs: true },
    });

    if (!user) return { data: { user: null }, errors: [{ title: "User not found" }] };

    return { data: { user } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve user", detail: error.message }] };
  }
}

export async function getUserHistory(
  aNumber: string
): Promise<Response<{ history: any }>> {
  try {
    const user = await db.user.findUnique({
      where: { aNumber },
      include: { history: { include: { requests: true, chats: true } } },
    });

    if (!user || !user.history) return { data: { history: null }, errors: [{ title: "History not found for user" }] };

    return { data: { history: user.history } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve user history", detail: error.message }] };
  }
}

export async function getUserActivityLogs(
  aNumber: string
): Promise<Response<{ activityLogs: any[] }>> {
  try {
    const user = await db.user.findUnique({
      where: { aNumber },
      include: { activityLogs: true },
    });

    if (!user) return { data: { activityLogs: [] }, errors: [{ title: "User not found" }] };

    return { data: { activityLogs: user.activityLogs } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve activity logs", detail: error.message }] };
  }
}

export async function getUserChats(): Promise<Response<{ chats: any[] }>> {
  const user = await getUserSession();
  if (!user) {
    return { data: null, errors: [{ title: "User not found" }] };
  }
  console.log(user);
  try {
    const history = await db.history.findUnique({
      where: { aNumber: user.aNumber },
      include: { chats: true },
    });

    if (!history) return { data: { chats: [] }, errors: [{ title: "History not found for user" }] };

    return { data: { chats: history.chats } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve chats", detail: error.message }] };
  }
}

export async function getUserRequests(
  aNumber: string
): Promise<Response<{ requests: any[] }>> {
  try {
    const history = await db.history.findUnique({
      where: { aNumber },
      include: { requests: true },
    });

    if (!history) return { data: { requests: [] }, errors: [{ title: "History not found for user" }] };

    return { data: { requests: history.requests } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve requests", detail: error.message }] };
  }
}

export async function getChatMessages(
  chatId: number
): Promise<Response<{ messages: Messages[] }>> {
  try {
    const chat = await db.chats.findUnique({
      where: { id: chatId },
      include: { messages: true },
    });

    if (!chat) return { data: { messages: [] }, errors: [{ title: "Chat not found" }] };

    return { data: { messages: chat.messages } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve messages", detail: error.message }] };
  }
}

export async function getUserPdfs(
  aNumber: string
): Promise<Response<Pdfs[]>> {
  try {
    const user = await db.user.findUnique({
      where: { aNumber },
      include: { pdfs: true },
    });

    if (!user) return { data: null, errors: [{ title: "User not found" }] };

    return { data: user.pdfs };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve PDFs", detail: error.message }] };
  }
}

export async function getPdf(
  pdfId: number
): Promise<Response<Pdfs>> {
  try {
    const session = await getUserSession()

    const pdf = await db.pdfs.findUnique({
      where: { id: pdfId, aNumber: session.aNumber }
    })

    return { data: pdf }
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve PDFs", detail: error.message }] }
  }
}

export async function getPdfTextLines(
  pdfId: number
): Promise<Response<{ textLines: PdfTextLine[] }>> {
  try {
    const pdf = await db.pdfs.findUnique({
      where: { id: pdfId },
      include: { pdfText: true },
    });

    if (!pdf) return { data: { textLines: [] }, errors: [{ title: "PDF not found" }] };

    return { data: { textLines: pdf.pdfText } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to retrieve text lines", detail: error.message }] };
  }
}


export async function getReports(): Promise<Response<Report[]>> {
  try {
    const reports = await db.report.findMany();
    return { data: reports };
  } catch (error: any) {
    return {
      data: null,
      errors: [{ title: "Failed to retrieve reports", detail: error.message }],
    };
  }
}

export async function getReport(
  pdfId: number,
): Promise<Response<Report>> {
  try {
    const report = await db.report.findUnique({ where: { pdfId } });

    return { data: report };
  } catch (error: any) {
    return {
      data: null,
      errors: [{ title: "Failed to retrieve report", detail: error.message }],
    };
  }
}
