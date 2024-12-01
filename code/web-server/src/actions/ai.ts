"use server";
import { MessageSender, PdfTextLine } from "@prisma/client";
import { env } from "~/env";
const apiUrl = env.AI_URL;
import type { Response } from "~/server/";
import { createMessage } from "~/server/db/queries/create";
import { getChatMessages, getPdfTextLines } from "~/server/db/queries/get";

const SPECIAL_TOKENS = {
  "begin_of_text": "<|begin_of_text|>,",
  "start_header_id": "<|start_header_id|>",
  "end_header_id": "<|end_header_id|>",
  "eot_id": "<|eot_id|>"
}

type SummaryResponse = { data: [{ response: string }] }

export async function getSummary(
  pdfId: number,
): Promise<Response<string>> {
  const textLines = ((await getPdfTextLines(pdfId)).data?.textLines || []) as PdfTextLine[] || []
  const paragraph = textLines.map((textLine) => textLine.lineText).join(" ")
  const response = await fetch(`${apiUrl}/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ prompt: paragraph }),
  });

  if (!response.ok) {
    return { errors: [{ title: "Failed to fetch summary" }] };
  }

  const json = (await response.json()) as SummaryResponse;

  return { data: json["data"][0]["response"] };
}

export async function getChatResponse(chatId: number, userMessage: string): Promise<Response<string>> {
  const messages = (await getChatMessages(chatId)).data?.messages || []
  const tokenizedHistory = messages.map(
    (message) => `${SPECIAL_TOKENS.start_header_id}${message.sender}${SPECIAL_TOKENS.end_header_id}\n${message.text}${SPECIAL_TOKENS.eot_id}`
  ).join("")
  const tokenizedMessage = `${SPECIAL_TOKENS.start_header_id}user${SPECIAL_TOKENS.end_header_id}\n${userMessage}`
  
  await createMessage(userMessage, chatId, MessageSender.USER)

  const response = await fetch(`${apiUrl}/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ prompt: tokenizedHistory + tokenizedMessage }),
  });

  if (!response.ok) {
    return { errors: [{ title: "Failed to fetch summary" }] };
  }

  const json = (await response.json()) as SummaryResponse
  const aiResponseMessage = json.data[0].response

  await createMessage(aiResponseMessage, chatId, MessageSender.AI)

  return { data: aiResponseMessage }
}

export async function getSemantic(
  data?: Record<string, string>,
): Promise<Response<Record<string, string>>> {
  const response = await fetch(`${apiUrl}/semantic-test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data ?? {}),
  });

  if (!response.ok) {
    return { errors: [{ title: "Failed to fetch summary" }] };
  }

  const json = (await response.json()) as Record<string, string>;

  return json;
}
