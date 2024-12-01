import "~/styles/globals.css";
import "~/styles/page.css";
import Login from "~/components/login";

export default function LoginPage() {
    return (
        <div>
            <div></div>
            <div className='gradientBlock title roboto-bold'>Login</div>
            <div className='content'>
                <Login />
            </div>
        </div>
    );
}
