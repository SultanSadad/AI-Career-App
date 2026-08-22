import { LoginButton } from "@/components/auth/login-button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] px-6">
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm space-y-6 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FFEB43] text-black font-black flex items-center justify-center text-base shadow-sm">
            CP
          </div>
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">
            Sign in to Career Passport
          </h1>
          <p className="text-xs text-neutral-500">
            Build your career once. Use it everywhere.
          </p>
        </div>

        <div className="pt-2">
          <LoginButton />
        </div>

        <p className="text-[11px] text-neutral-400">
          By continuing, you agree to Career Passport Terms of Service.
        </p>
      </div>
    </div>
  );
}