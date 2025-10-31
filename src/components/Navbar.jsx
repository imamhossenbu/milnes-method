import React from "react";
import { NavLink } from "react-router-dom";

const tabs = [
    { to: "/interactive", label: "Interactive" },
    { to: "/advantages", label: "Advantages" },
    { to: "/use-cases", label: "Use Cases" },
    { to: "/limitations", label: "Limitations" },
    { to: "/why-milne", label: "Why Milne?" },
];

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center gap-3">
                <div className="font-bold tracking-tight text-slate-100">Milne’s Method</div>
                <div className="flex items-center gap-2 ml-auto">
                    {tabs.map((t) => (
                        <NavLink
                            key={t.to}
                            to={t.to}
                            className={({ isActive }) =>
                                `px-3 py-1.5 rounded-full text-sm transition border ${isActive
                                    ? "bg-linear-to-r from-cyan-600 to-fuchsia-600 text-white border-transparent"
                                    : "bg-slate-900/50 text-slate-300 border-slate-700 hover:bg-slate-800"
                                }`
                            }
                        >
                            {t.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
