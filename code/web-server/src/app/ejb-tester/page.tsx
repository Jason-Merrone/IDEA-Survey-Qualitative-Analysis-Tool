//import {
//  createReport,
//  createChat,
//  createMessage,
//} from "~/server/db/queries/create";
import { getSummary, getSemantic } from "~/actions/ai";

export default async function MockendTestPage() {
  //const report = await createReport([1, 2], [3, 4]);
  //
  //const chat = await createChat([1, 2], [3, 4]);
  //
  //if (!chat.data) {
  //  throw new Error("Chat not created");
  //}
  //
  //const message = await createMessage(chat.data?.id, "Hello, AI!");
  //
  //return (
  //  <div>
  //    <h1>Mockend Test Page</h1>
  //    <p>Report created: {JSON.stringify(report)}</p>
  //    <p>Chat created: {JSON.stringify(chat)}</p>
  //    <p>Message created: {JSON.stringify(message)}</p>
  //  </div>
  //);

  const summary = await getSummary();
  const semantic = await getSemantic();

  return (
    <>
      <div>Summary: {JSON.stringify(summary.data)}</div>
      <div>Semantic: {JSON.stringify(semantic.data)}</div>
    </>
  );
}
