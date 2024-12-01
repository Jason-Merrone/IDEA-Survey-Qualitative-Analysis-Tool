"use server";
import { Report, MessageSender } from "@prisma/client";
import { Response } from "~/server";
import { db } from "~/server/db";
import { getUserSession } from "~/actions/session";
import { getUser} from "~/server/db/queries/get";

export async function createUser(
  aNumber: string,
  name: string,
  preferredName: string | null,
  email: string,
  role: string
): Promise<Response<{ message: string }>> {
  try {
    const newUser = await db.user.create({
      data: { aNumber, name, preferredName, email, role },
    });

    const newHistory = await db.history.create({
      data: { aNumber },
    });

    return { data: { message: `User created with aNumber: ${newUser.aNumber} and History created with ID: ${newHistory.id}` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to create user and history", detail: error.message }] };
  }
}

export async function createRequest(
  aNumber: string,
  request: string,
  schoolYear: string,
  className: string,
  section: string,
  summaryText: string,
  historyId: number
): Promise<Response<{ message: string }>> {
  try {
    const newRequest = await db.requests.create({
      data: {
        aNumber,
        request,
        schoolYear,
        class: className,
        section,
        summaryText,
        historyId,
      },
    });
    return { data: { message: `Request created with ID: ${newRequest.id}` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to create request", detail: error.message }] };
  }
}

export async function createPdf(
  pdfName: string,
  schoolYear: string,
  className: string,
  section: string,
  pdfTextLines: string[]
): Promise<Response<{ id: number, message: string }>> {
  const user = await getUserSession();
  if (!user) {
    return { data: null, errors: [{ title: "User not found" }] };
  }
  try {
    const newPdf = await db.pdfs.create({
      data: {
        aNumber: user.aNumber,
        pdfName,
        schoolYear,
        class: className,
        section,
        loadedOn: new Date(),
      },
    });

    // Create PDF lines based on provided list of text strings
    const linesData = pdfTextLines.map((lineText, index) => ({
      aNumber: user.aNumber,
      lineText,
      lineNumber: index + 1, // Assign line number sequentially
      pdfId: newPdf.id,       // Associate each line with the PDF
    }));
    
    await db.pdfTextLine.createMany({ data: linesData });

    return { data: { id: newPdf.id, message: `PDF created with ID: ${newPdf.id} and ${pdfTextLines.length} lines of text` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to create PDF", detail: error.message }] };
  }
}

export async function createChat(
  request: string,
  schoolYear: string,
  className: string,
  section: string,
): Promise<Response<{ id: number, message: string }>> {
  const user = await getUserSession();
  if (!user) {
    return { data: null, errors: [{ title: "User not found" }] };
  }
  const dbUser = await getUser(user.aNumber);
  if (dbUser.errors) {
    return { data: null, errors: [{ title: "User not found in database" }] };
  }
  const historyId = dbUser.data?.user.history.id as number;
  if (!historyId) {
    return { data: null, errors: [{ title: "History not found" }] };
  }
  try {
    const newChat = await db.chats.create({
      data: {
        aNumber: user.aNumber,
        request,
        schoolYear,
        class: className,
        section,
        historyId,
        createdAt: new Date(),
      },
    });
    return { data: { id: newChat.id, message: `Chat created with ID: ${newChat.id}` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to create chat", detail: error.message }] };
  }
}

export async function createMessage(
  text: string,
  chatId: number,
  sender: MessageSender,
): Promise<Response<{ message: string }>> {
  const user = await getUserSession();
  if (!user) {
    return { data: null, errors: [{ title: "User not found" }] };
  }
  try {
    const newMessage = await db.messages.create({
      data: {
        aNumber: user.aNumber,
        sender,
        text,
        chatId,
        createdAt: new Date(),
      },
    });
    return { data: { message: `Message created with ID: ${newMessage.id}` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to create message", detail: error.message }] };
  }
}

export async function createActivityLog(
  aNumber: string,
  action: string
): Promise<Response<{ message: string }>> {
  try {
    const newActivityLog = await db.activityLog.create({
      data: { aNumber, action },
    });
    return { data: { message: `ActivityLog created with ID: ${newActivityLog.id}` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to create activity log", detail: error.message }] };
  }
}


export async function createReport(
  pdfId: number,
  summaryText: string,
): Promise<Response<Report>> {
  try {
    const newReport = await db.report.create({
      data: {
        pdfId,
        summaryText,
      },
    });

    return { data: newReport };
  } catch (error: any) {
    return {
      data: null,
      errors: [{ title: "Failed to create report", detail: error.message }],
    };
  }
}
