import Sidebar from "../components/Sidebar";

export default function Dashboard({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <div className="max-w-64 min-w-32 h-screen sticky">
          <Sidebar />
        </div>
        <div className="flex-grow h-full p-4">{children}</div>
      </div>
    </>
  );
}
