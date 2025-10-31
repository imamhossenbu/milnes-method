import React from "react";

export default function UseCases() {
    const cases = [
        {
            title: "Engineering Dynamics",
            desc: "Efficiently simulate smooth force systems using fewer function evaluations.",
        },
        {
            title: "Control & Signal Models",
            desc: "Predictor–corrector structure stabilizes signal updates at fixed intervals.",
        },
        {
            title: "Population & Growth Models",
            desc: "Handles mild nonlinearities with solid numerical stability.",
        },
        {
            title: "Education & Research",
            desc: "Perfect for demonstrating multi-step vs. single-step method differences.",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 mb-6">
                Use Cases
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((use, i) => (
                    <div
                        key={i}
                        className="p-5 bg-slate-900/60 border border-slate-700 rounded-2xl shadow-md hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition"
                    >
                        <h3 className="text-xl font-semibold text-fuchsia-300 mb-2">
                            {use.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">{use.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
