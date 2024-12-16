import Sidebar from "../components/Sidebar";

export default function Dashboard({ children }) {
  return (q
    <>
      <div className="fixed inset-0 flex h-screen bg-customBg">
        <div className="lg:w-[245px] w-[55px] sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-grow overflow-auto max-h-screen p-0 mr-2 pt-2">
          {children}
        </div>
    </div>
</>
  );
}
