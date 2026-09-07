import { Suspense, type ReactNode } from "react";

function AuthFallback() {
  return (
    <main
      className="min-h-[calc(100vh-72px)] bg-[#050914] px-4 py-10 text-white sm:px-6 sm:py-14"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="h-12 w-full animate-pulse rounded-2xl bg-white/[0.04]" />
      </div>
    </main>
  );
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<AuthFallback />}>{children}</Suspense>;
}
