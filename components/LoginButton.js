"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Chrome } from "lucide-react"; // Google icon එකක් පාවිච්චි කරන්න

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Welcome, {session.user.name}
        </p>
        <button 
          onClick={() => signOut()}
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-all"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 bg-white rounded-[3rem] border border-slate-100 shadow-xl">
      <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Join Suma Automation</h2>
      <button 
        onClick={() => signIn("google")}
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.1em] hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
      <p className="mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        Secure Login via Google Authentication
      </p>
    </div>
  );
}