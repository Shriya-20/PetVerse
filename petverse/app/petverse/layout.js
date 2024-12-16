import Sidebar from "../components/Sidebar";

export default function Dashboard({ children }) {
  return (
    <div className="flex min-h-screen bg-customBg">
      {/* Sidebar */}
      <div className="lg:w-[245px] w-[55px] h-screen fixed top-0 left-0 bg-sidebarBg">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-grow  min-h-screen ml-[55px] lg:ml-[245px] bg-customBg">
        {children}
      </div>
    </div>
  );
}
