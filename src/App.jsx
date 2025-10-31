import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Interactive from "./pages/Interactive";
import Advantages from "./pages/Advantages";
import UseCases from "./pages/UseCases";
import Limitations from "./pages/Limitations";
import WhyMilne from "./pages/WhyMilne";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-fuchsia-950 text-slate-50">
      <Navbar />
      <div className="flex-1 pt-4 pb-20"> {/* leaves space for footer */}
        <Routes>
          <Route path="/" element={<Navigate to="/interactive" replace />} />
          <Route path="/interactive" element={<Interactive />} />
          <Route path="/advantages" element={<Advantages />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/limitations" element={<Limitations />} />
          <Route path="/why-milne" element={<WhyMilne />} />
          <Route path="*" element={<Navigate to="/interactive" replace />} />
        </Routes>
      </div>

      <footer className="mt-auto bg-slate-950/80 backdrop-blur border-t border-slate-800 text-center text-xs md:text-sm text-slate-400 py-4 shadow-inner">
        <p className="mb-1 text-slate-300">
          🌌 <span className="font-semibold text-fuchsia-400">Milne’s Method Visualizer</span>
        </p>
        <p>
          Pages —{" "}
          <span className="text-cyan-300">Interactive</span> •{" "}
          <span className="text-cyan-300">Advantages</span> •{" "}
          <span className="text-cyan-300">Use Cases</span> •{" "}
          <span className="text-cyan-300">Limitations</span> •{" "}
          <span className="text-cyan-300">Why Milne?</span>
        </p>
        <p className="text-slate-500 mt-1">© {new Date().getFullYear()} Numerical Analysis Project</p>
      </footer>

    </div>
  );
}
