import "~/styles/globals.css";
import "~/styles/page.css";
import CreateAccount from "~/components/create_account";
export default function createAccount() {
  return (
    <div>
      <div></div>
      <div className="gradientBlock title roboto-bold">Create Account</div>
      <div className="content">
        <CreateAccount />
      </div>
    </div>
  );
}
