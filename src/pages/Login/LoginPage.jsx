import AuthLayout from "../../components/AuthLayout";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Login to your account">
      <LoginForm />
    </AuthLayout>
  );
}
