"use server";
import { Response } from "~/server";
import { db } from "~/server/db";

export async function deleteChat(
  chatId: number
): Promise<Response<{ message: string }>> {
  try {
    await db.messages.deleteMany({ where: { chatId } }); // First delete related messages
    await db.chats.delete({ where: { id: chatId } }); // Then delete the chat
    return { data: { message: `Chat with ID ${chatId} and its messages deleted successfully.` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to delete chat", detail: error.message }] };
  }
}

export async function deletePdf(
  pdfId: number
): Promise<Response<{ message: string }>> {
  try {
    await db.pdfTextLine.deleteMany({ where: { pdfId } }); // First delete related text lines
    await db.pdfs.delete({ where: { id: pdfId } }); // Then delete the PDF
    return { data: { message: `PDF with ID ${pdfId} and its text lines deleted successfully.` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to delete PDF", detail: error.message }] };
  }
}

export async function deleteUser(
  aNumber: string
): Promise<Response<{ message: string }>> {
  try {
    const user = await db.user.findUnique({ where: { aNumber } });

    if (!user) {
      return { data: null, errors: [{ title: "User not found", detail: `User with aNumber ${aNumber} does not exist.` }] };
    }

    // Cascade delete related entities
    await db.activityLog.deleteMany({ where: { aNumber } });
    await db.pdfTextLine.deleteMany({ where: { pdf: { aNumber } } });
    await db.pdfs.deleteMany({ where: { aNumber } });
    await db.messages.deleteMany({ where: { chat: { history: { aNumber } } } });
    await db.chats.deleteMany({ where: { history: { aNumber } } });
    await db.requests.deleteMany({ where: { history: { aNumber } } });
    await db.history.deleteMany({ where: { aNumber } }); // Delete user's history
    await db.user.delete({ where: { aNumber } }); // Finally delete the user

    return { data: { message: `User with aNumber ${aNumber} and all related data deleted successfully.` } };
  } catch (error: any) {
    return { data: null, errors: [{ title: "Failed to delete user", detail: error.message }] };
  }
}


export async function deleteReport(
  reportId: number,
): Promise<Response<{ message: string }>> {
  try {
    await db.report.delete({ where: { id: reportId } });

    return { data: { message: `Report with ID ${reportId} deleted successfully.` } };
  } catch (error: any) {
    return {
      data: null,
      errors: [{ title: "Failed to delete report", detail: error.message }],
    };
  }
}
