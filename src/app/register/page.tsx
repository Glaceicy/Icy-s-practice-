import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-bold text-brand-800">Create your adult account</h1>
      <p className="mt-2 text-sm text-slate-600">
        Parents, carers and teachers use this account to create and manage child/learner profiles. Children never need their own
        email address &mdash; they sign in with an avatar and a 4-digit PIN.
      </p>
      <div className="mt-8 rounded-xl2 border bg-white p-6 shadow-sm">
        <RegisterForm />
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-700 underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
