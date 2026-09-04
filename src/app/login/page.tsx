import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-bold text-brand-800">Sign in</h1>
      <p className="mt-2 text-sm text-slate-600">Sign in to your parent or teacher account.</p>
      <div className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
      <p className="mt-6 rounded-lg bg-brand-50 p-4 text-center text-sm text-slate-700">
        Demo account: <strong>parent.demo@mathsjourney.example</strong> / <strong>Demo!Password123</strong>
      </p>
      <p className="mt-4 text-center text-sm text-slate-600">
        New here?{" "}
        <Link href="/register" className="font-semibold text-brand-700 underline">
          Create an account
        </Link>
      </p>
    </main>
  );
}
