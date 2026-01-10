import AuthLayout from "../../components/AuthLayout";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout title="Create your account">
      <SignupForm />
    </AuthLayout>
  );
}
