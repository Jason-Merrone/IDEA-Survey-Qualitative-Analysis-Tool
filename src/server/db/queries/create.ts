"use server";

import { Response } from "~/server";

let nextId = 1;
const chats: Chat[] = [];

type Semantic = {
  semantic: string;
  value: number;
};

type Overview = {
  general: string;
  well: string;
  improve: string;
};

type Report = {
  overview: Overview;
  semantics: Semantic[];
};

type Message = {
  text: string;
  sender: string;
  timestamp: number;
};

type Chat = {
  id: number;
  messages: Message[];
  classIds: number[];
  semesterIds: number[];
};

export async function createReport(
  classIds: number[],
  semesterIds: number[],
): Promise<Response<Report>> {
  return {
    data: {
      overview: {
        general: `This is a general overview for class ${classIds.join(
          ", ",
        )} in semester ${semesterIds.join(", ")}`,
        well: "This is what you did well",
        improve: "This is what you can improve",
      },
      semantics: [{ semantic: "Clear", value: 1 }],
    },
  };
}

export async function createChat(
  classIds: number[],
  semesterIds: number[],
): Promise<Response<Chat>> {
  const chat: Chat = {
    id: nextId++,
    messages: [],
    classIds,
    semesterIds,
  };
  chats.push(chat);
  return { data: chat };
}

export async function createMessage(
  chatId: number,
  messageText: string,
): Promise<Response<Message>> {
  const chat = chats.find((chat) => chat.id === chatId);
  if (!chat) {
    return { data: null, errors: [{ detail: "Chat not found" }] };
  }
  chat.messages.push({
    text: messageText,
    sender: "student",
    timestamp: Date.now(),
  });
  chat.messages.push({
    text: `I am a bot and I am here to help you. You said: ${messageText}`,
    sender: "ai",
    timestamp: Date.now(),
  });
  const responseMessage: Message | undefined =
    chat.messages[chat.messages.length - 1];
  if (!responseMessage) {
    return { data: null, errors: [{ detail: "Response not found" }] };
  }
  return { data: responseMessage };
}
