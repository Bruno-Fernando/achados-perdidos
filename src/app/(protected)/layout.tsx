import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

function LoggedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />

      <div className="grid h-screen pt-12 md:grid-cols-[1fr_1fr_1fr_1fr]">
        <Sidebar />

        <div className="p-4 md:col-span-2">{children}</div>
      </div>
    </main>
  );
}

export default LoggedLayout;
