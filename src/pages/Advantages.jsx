import React from "react";

export default function Advantages() {
    const data = [
        {
            title: "Multi-step Efficiency",
            desc: "Reuses past f-values → fewer new evaluations per step.",
        },
        {
            title: "Accuracy per Cost",
            desc: "Small step size (h) and 1–2 corrections yield high accuracy.",
        },
        {
            title: "Simple Pairing",
            desc: "Pairs naturally with Simpson-type corrector for stability.",
        },
        {
            title: "Great for Smooth ODEs",
            desc: "Performs exceptionally on non-stiff, smooth differential equations.",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 mb-6">
                Advantages of Milne’s Method
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((adv, i) => (
                    <div
                        key={i}
                        className="p-5 bg-slate-900/60 border border-slate-700 rounded-2xl shadow-md hover:shadow-fuchsia-500/20 hover:border-fuchsia-500/30 transition"
                    >
                        <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                            {adv.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{adv.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
