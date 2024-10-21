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
            title="Recent Activity" 
            content={
            <>
                You have 3 new notifications. <a href="/notifications">View all</a>
            </>
            }
        />
        <Card 
            title="Upcoming Tasks" 
            content={
            <>
                Your next meeting is at 2 PM. <a href="/tasks">View tasks</a>
            </>
            }
        />
        <Card 
            title="System Status" 
            content={
            <>
                All systems are operational. <a href="/status">View system details</a>
            </>
            }
        />
        </div>
      </div>
    );
  }
  