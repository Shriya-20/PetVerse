import Sidebar from "../components/Sidebar";

export default function Dashboard({ children }) {
  return (
    <>
      <div className="flex h-screen bg-customBg">
        <div className="lg:w-[254] w-[59] h-screen sticky">
          <Sidebar />
        </div>
        <div className="flex-grow h-full p-4 mr-2">{children}</div>
      </div>
    </>
  );
}
