import React from "react";

export default function WhyMilne() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 mb-6">
                Comparison Between Milne’s, Euler’s, and Picard’s Methods
            </h1>

            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm md:text-base">
                    <thead>
                        <tr className="bg-slate-800/70 text-cyan-300 text-left">
                            <th className="p-3 border-b border-slate-700">Criteria</th>
                            <th className="p-3 border-b border-slate-700">Euler’s Method</th>
                            <th className="p-3 border-b border-slate-700">Picard’s Method</th>
                            <th className="p-3 border-b border-slate-700">Milne’s Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-100">Basic Idea</td>
                            <td className="p-3 text-slate-300">Uses the slope at the beginning of the interval to estimate the next value.</td>
                            <td className="p-3 text-slate-300">Finds the solution iteratively by integrating the differential equation repeatedly.</td>
                            <td className="p-3 text-slate-300">Uses previous computed points to predict and then correct the next value (multi-step predictor–corrector).</td>
                        </tr>

                        <tr className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-100">Type</td>
                            <td className="p-3 text-slate-300">Single-step explicit method.</td>
                            <td className="p-3 text-slate-300">Analytical successive approximation method.</td>
                            <td className="p-3 text-slate-300">Multi-step predictor–corrector method.</td>
                        </tr>

                        <tr className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-100">Order of Accuracy</td>
                            <td className="p-3 text-slate-300">First order (O(h)).</td>
                            <td className="p-3 text-slate-300">Accuracy improves with each iteration.</td>
                            <td className="p-3 text-slate-300">Fourth order (O(h⁴)) after correction.</td>
                        </tr>

                        <tr className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-100">Computation Type</td>
                            <td className="p-3 text-slate-300">Purely numerical, evaluates f(x,y) once per step.</td>
                            <td className="p-3 text-slate-300">Semi-analytical — involves symbolic integration for each iteration.</td>
                            <td className="p-3 text-slate-300">Purely numerical, reuses past f-values for prediction and correction.</td>
                        </tr>

                        <tr className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-100">Efficiency</td>
                            <td className="p-3 text-slate-300">Fast but inaccurate for large h.</td>
                            <td className="p-3 text-slate-300">Accurate but computationally heavy and impractical for real-time use.</td>
                            <td className="p-3 text-slate-300">Highly efficient once starter values are known; fewer new evaluations per step.</td>
                        </tr>

                        <tr className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-100">Applicability</td>
                            <td className="p-3 text-slate-300">Good for quick, rough estimates or teaching basics.</td>
                            <td className="p-3 text-slate-300">Mainly theoretical; demonstrates existence of solutions.</td>
                            <td className="p-3 text-slate-300">Practical for smooth, non-stiff ODEs in real-world computations.</td>
                        </tr>

                        <tr className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-100">Example Output (y′ = x + y, y(0)=1, x=0.4, h=0.1)</td>
                            <td className="p-3 text-slate-300">y ≈ 1.5696887</td>
                            <td className="p-3 text-slate-300">y ≈ 1.5706667</td>
                            <td className="p-3 text-slate-300">y ≈ 1.5836416 (closest to exact 1.5836494)</td>
                        </tr>

                        <tr>
                            <td className="p-3 font-semibold text-slate-100">Error (|exact - computed|)</td>
                            <td className="p-3 text-slate-300">≈ 1.39×10⁻²</td>
                            <td className="p-3 text-slate-300">≈ 1.30×10⁻²</td>
                            <td className="p-3 text-slate-300">≈ 8.0×10⁻⁶ (very accurate)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-900/40 border border-slate-700 rounded-2xl p-5 mt-6">
                <h2 className="text-lg font-semibold text-fuchsia-300 mb-2">Conclusion</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                    Euler’s method is simple but inaccurate for large steps.
                    Picard’s method provides theoretical insight but is computationally intensive.
                    Milne’s method, using both prediction and correction with previous data, achieves high accuracy and efficiency — making it ideal for smooth, non-stiff problems in numerical analysis.
                </p>
            </div>
        </div>
    );
}
