// app/dashboard/page.tsx
import Card from "~/components/card";
import "~/styles/globals.css";
import "~/styles/page.css";

export default function DashboardPage() {
    return (
      <div>
        <div className='gradientBlock title roboto-bold'>Dashboard</div>
        <div className="dashboard content roboto-regular">
        <Card 
            title="Currently Empty" 
            content={
            <>
                EMPTY
            </>
            }
        />
        </div>
      </div>
    );
  }
  