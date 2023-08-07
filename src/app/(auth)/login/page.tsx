import Image from "next/image";
import GoogleLogin from "./_components/GoogleLogin";

function SignIn() {
  return (
    <main className="dark bg-black">
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-10 p-5 md:w-1/2">
        <div className="mx-auto flex flex-col items-center justify-center gap-10 rounded border border-slate-300 p-5">
          <div className="flex items-center border-b border-white pb-3">
            <Image src="/logo.svg" alt="Logo" width={80} height={80} />
            <h2 className="mr-3 text-center text-2xl text-white">
              Achados e perdidos UFCG
            </h2>
          </div>

          <h3 className="text-center text-white">
            Clique no botão abaixo para realizar o login com o Google
          </h3>

          <GoogleLogin />
        </div>
      </div>
    </main>
  );
}

export default SignIn;
