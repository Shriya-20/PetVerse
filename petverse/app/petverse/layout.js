import Sidebar from "../components/Sidebar";

export default function Dashboard({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <div className="lg:w-[241] w-[53] h-screen sticky">
          <Sidebar />
        </div>
        <div className="flex-grow h-full p-4">{children}</div>
      </div>
    </>
  );
}
