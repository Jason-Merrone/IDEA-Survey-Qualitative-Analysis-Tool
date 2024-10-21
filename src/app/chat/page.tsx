// app/chat/page.tsx
import "~/styles/globals.css";
import "~/styles/page.css";
import Chat from "~/components/chat";

export default function AIChatPage() {
    return (
      <div>
        <div className='gradientBlock title roboto-bold'>AI Chat</div>
        <div className="chat">
        <Chat />
        </div>
      </div>
    );
  }
  