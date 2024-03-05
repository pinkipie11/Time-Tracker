import Sidebar from "./sidebar";

function RootLayout({ children }) {
  return (
    <div className="flex gap-0">
      <Sidebar />

      <main className="flex-1 mx-auto py-0">{children}</main>
    </div>
  );
}

export default RootLayout;
