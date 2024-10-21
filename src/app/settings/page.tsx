// app/ai-chat/settings.tsx
import "~/styles/globals.css";
import "~/styles/page.css"
import Settings from "~/components/settings";
export default function settingPage() {
    return (
      <div>
        <div></div>
        <div className='gradientBlock title roboto-bold'>Settings</div>
        <div className='content'>
            <Settings />
        </div>
      </div>
    );
  }
  