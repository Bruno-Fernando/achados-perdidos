import Header from "./_components/Header";

function LoggedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}

export default LoggedLayout;
