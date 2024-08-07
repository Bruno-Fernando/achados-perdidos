import Image from "next/image";

function ExtFormContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="rounded border border-slate-300 p-5">
        <div className="mb-8 flex items-center border-b border-white pb-3">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
          <h2 className="mr-3 text-center text-2xl text-white">UFCG Finder</h2>
        </div>

        {children}
      </div>
    </main>
  );
}

export default ExtFormContainer;
