import React from "react";

export default function Limitations() {
    const limits = [
        {
            title: "Requires Starters",
            desc: "Needs y₀..y₃ values (from RK or another method) to begin predictions.",
        },
        {
            title: "Not for Stiff ODEs",
            desc: "Instabilities occur on stiff equations; implicit methods work better.",
        },
        {
            title: "Step Size Sensitivity",
            desc: "Accuracy and stability heavily depend on maintaining small h.",
        },
        {
            title: "Uniform Step Requirement",
            desc: "Classic Milne assumes constant spacing; adaptive steps require variants.",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 mb-6">
                Limitations
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {limits.map((lim, i) => (
                    <div
                        key={i}
                        className="p-5 bg-slate-900/60 border border-slate-700 rounded-2xl shadow-md hover:shadow-rose-500/20 hover:border-rose-500/30 transition"
                    >
                        <h3 className="text-xl font-semibold text-rose-300 mb-2">
                            {lim.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{lim.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
