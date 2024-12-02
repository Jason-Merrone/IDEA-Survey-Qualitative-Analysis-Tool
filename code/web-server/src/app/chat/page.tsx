// app/chat/page.tsx
import "~/styles/globals.css";
import "~/styles/page.css";
import ChatApp from "~/components/chatApp";
import { getUserSession } from "~/actions/session";
import { redirect } from "next/navigation";

export default async function AIChatPage() {
  const user = await getUserSession();
  if (!user) redirect("/login");

  return (
    <div>
      <div className="gradientBlock title roboto-bold">AI Chat</div>
      <div className="chat">
        <ChatApp />
      </div>
    </div>
  );
}
