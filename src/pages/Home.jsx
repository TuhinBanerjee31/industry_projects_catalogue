import { useState } from "react";
import Projects from "./Projects";
import AllCertifications from "./ALLCertifications";
import Designation from "./Designation";
import IntProjects from "./IntProjects";

function Home() {
  const [tab, setTab] = useState("1");

  const tabs = [
    { id: "1", label: "Projects (India)" },
    { id: "2", label: "Designation(JD with Questions)" },
    { id: "3", label: "Projects (International)" },
    { id: "4", label: "Certifications(Designation-wise)" },
  ];

  return (
    <>
      <div className="w-full h-[10vh] bg-gradient-to-r from-slate-100 to-gray-200 shadow-md flex justify-center gap-6 items-center sticky top-0 z-50">
        {tabs.map(({ id, label }) => (
          <p
            key={id}
            onClick={() => setTab(id)}
            className={`text-lg sm:text-xl font-semibold cursor-pointer px-4 py-2 rounded-md transition-all duration-300
            ${
              tab === id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            {label}
          </p>
        ))}
      </div>

      <div className="p-6 bg-gray-50 min-h-[90vh]">
        {tab === "1" && <Projects />}
        {tab === "2" && <Designation />}
        {tab === "3" && <IntProjects />}
        {tab === "4" && <AllCertifications />}
      </div>
    </>
  );
}

export default Home;
