import React from "react";

export default function Limitations() {
    const limits = [
        {
            title: "Starting Values Required",
            desc: "Requires four starting values.",
        },
        {
            title: "Uniform Step Size",
            desc: "Works only when the step size h is uniform (equal spacing).",
        },
        {
            title: "Round-off Error Effect",
            desc: "Accuracy decreases if round-off errors accumulate in previous steps.",
        },
        {
            title: "Predictor Divergence",
            desc: "Predictor can diverge if the step size is too large.",
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
