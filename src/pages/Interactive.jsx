import React, { useMemo, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, ReferenceDot
} from "recharts";
import { makeF, milneFromStarters } from "../utils/milne";

export default function Interactive() {
    const presets = [
        { key: "x+y", label: "f(x,y) = x + y" },
        { key: "y - x^2 + 1", label: "f(x,y) = y - x^2 + 1" },
        { key: "sin(x) + y", label: "f(x,y) = sin(x) + y" },
        { key: "x * y", label: "f(x,y) = x * y" },
        { key: "custom", label: "Custom…" },
    ];
    const [presetKey, setPresetKey] = useState(presets[0].key);
    const [expr, setExpr] = useState(presets[0].key);

    // manual starters (equally spaced x's recommended)
    const [x0, setX0] = useState(0);
    const [x1, setX1] = useState(0.1);
    const [x2, setX2] = useState(0.2);
    const [x3, setX3] = useState(0.3);
    const [y0, setY0] = useState(1);
    const [y1, setY1] = useState(1.110342);
    const [y2, setY2] = useState(1.242805);
    const [y3, setY3] = useState(1.399717);

    const [nPoints, setNPoints] = useState(11);
    const [corrections, setCorrections] = useState(2);

    // target x to evaluate y at
    const [targetX, setTargetX] = useState(0.4);

    // -------- number formatter: normal decimals, trims trailing zeros --------
    const fmt = (v, digits = 9) =>
        (v === null || v === undefined || !Number.isFinite(v))
            ? "—"
            : parseFloat(Number(v).toFixed(digits)).toString();

    const f = useMemo(() => makeF(expr), [expr]);

    const { data, warn, h, gridCheck } = useMemo(() => {
        const xs = [x0, x1, x2, x3];
        const ys = [y0, y1, y2, y3];

        const hEst = x1 - x0;
        const uniform =
            Math.abs((x2 - x1) - hEst) < 1e-7 &&
            Math.abs((x3 - x2) - hEst) < 1e-7;

        const warn = !uniform
            ? "x0..x3 must be equally spaced (constant h) for Milne."
            : "";

        const rows = uniform
            ? milneFromStarters(xs.slice(), ys.slice(), f, nPoints, corrections)
            : [
                { i: 0, x: x0, corr: y0 },
                { i: 1, x: x1, corr: y1 },
                { i: 2, x: x2, corr: y2 },
                { i: 3, x: x3, corr: y3 },
            ];

        // check if x* lies on grid x0 + m*h
        const gridCheck = (xStar) => {
            const h = hEst;
            const m = (xStar - x0) / h;
            const mRounded = Math.round(m);
            const onGrid = Math.abs(m - mRounded) < 1e-9 && mRounded >= 0;
            return { onGrid, m: mRounded, h };
        };

        return {
            data: rows.map((r) => ({ idx: r.i, x: r.x, pred: r.pred, corr: r.corr })),
            warn,
            h: hEst,
            gridCheck,
        };
    }, [x0, x1, x2, x3, y0, y1, y2, y3, nPoints, corrections, f]);

    // Find the row for targetX (if on grid and within computed range)
    const targetInfo = useMemo(() => {
        if (!data?.length) return { status: "no-data" };

        const { onGrid } = gridCheck(targetX);
        if (!onGrid) {
            const xNear = x0 + Math.round((targetX - x0) / h) * h;
            return {
                status: "off-grid",
                message: `Target x must align with the grid x0 + m*h. Nearest grid point: ${fmt(xNear, 6)}.`,
                nearestX: xNear,
            };
        }

        const row = data.find((r) => Math.abs(r.x - targetX) < 1e-9);
        if (!row) {
            return {
                status: "out-of-range",
                message: "Increase 'Total Points' so the computed range includes your target x.",
            };
        }

        return {
            status: "ok",
            idx: row.idx,
            x: row.x,
            pred: row.pred,
            corr: row.corr,
        };
    }, [data, targetX, gridCheck, x0, h]);

    return (
        <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300">
                    Interactive Predictor–Corrector
                </h1>
                <p className="text-slate-300 mt-1">
                    Enter x0..x3, y0..y3 and f(x,y). Milne starts at n=3 → predicts y4 and corrects.
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Equation & Settings */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 lg:col-span-1">
                    <h2 className="font-semibold mb-3">Equation & Settings</h2>
                    <select
                        value={presetKey}
                        onChange={(e) => {
                            const key = e.target.value;
                            setPresetKey(key);
                            if (key !== "custom") setExpr(key);
                        }}
                        className="w-full mb-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700"
                    >
                        {presets.map((p) => (
                            <option key={p.key} value={p.key}>{p.label}</option>
                        ))}
                    </select>

                    <input
                        value={expr}
                        onChange={(e) => setExpr(e.target.value)}
                        className="w-full mb-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700"
                        placeholder="Enter f(x,y)"
                    />

                    <label className="block text-sm">Total Points</label>
                    <input
                        type="number"
                        value={nPoints}
                        onChange={(e) => setNPoints(Number(e.target.value))}
                        className="w-full mb-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700"
                    />

                    <label className="block text-sm">Correction Iterations</label>
                    <input
                        type="number"
                        value={corrections}
                        onChange={(e) => setCorrections(Number(e.target.value))}
                        className="w-full p-2 rounded-xl bg-slate-800/60 border border-slate-700"
                    />

                    {warn && <p className="text-amber-400 mt-2 text-sm">⚠️ {warn}</p>}
                </div>

                {/* Manual Starters */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 lg:col-span-2">
                    <h2 className="font-semibold mb-3">Manual Starters</h2>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* X values column */}
                        <div>
                            <h3 className="font-semibold text-cyan-300 mb-2">x values</h3>
                            {["x0", "x1", "x2", "x3"].map((label) => {
                                const val = { x0, x1, x2, x3 }[label];
                                const setter = { x0: setX0, x1: setX1, x2: setX2, x3: setX3 }[label];
                                return (
                                    <div key={label} className="mb-2">
                                        <label className="block text-sm">{label}</label>
                                        <input
                                            type="number"
                                            value={val}
                                            onChange={(e) => setter(Number(e.target.value))}
                                            className="w-full p-2 rounded-xl bg-slate-800/60 border border-slate-700"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Y values column */}
                        <div>
                            <h3 className="font-semibold text-fuchsia-300 mb-2">y values</h3>
                            {["y0", "y1", "y2", "y3"].map((label) => {
                                const val = { y0, y1, y2, y3 }[label];
                                const setter = { y0: setY0, y1: setY1, y2: setY2, y3: setY3 }[label];
                                return (
                                    <div key={label} className="mb-2">
                                        <label className="block text-sm">{label}</label>
                                        <input
                                            type="number"
                                            value={val}
                                            onChange={(e) => setter(Number(e.target.value))}
                                            className="w-full p-2 rounded-xl bg-slate-800/60 border border-slate-700"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-3">
                        h = x1 - x0 = {fmt(x1 - x0, 6)} (must be constant).
                    </p>
                </div>

                {/* Target x -> y(x) */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 lg:col-span-1">
                    <h2 className="font-semibold mb-3">Find y at x*</h2>
                    <label className="block text-sm">Target x (x*)</label>
                    <input
                        type="number"
                        value={targetX}
                        onChange={(e) => setTargetX(Number(e.target.value))}
                        className="w-full mb-2 p-2 rounded-xl bg-slate-800/60 border border-slate-700"
                    />
                    {targetInfo.status === "ok" && (
                        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm">
                            <div>
                                <span className="text-emerald-300 font-semibold">x*</span> = {fmt(targetInfo.x, 6)} (i = {targetInfo.idx})
                            </div>
                            <div className="mt-1">
                                y<sub>pred</sub>(x*) = {fmt(targetInfo.pred, 9)}
                            </div>
                            <div>
                                y<sub>corr</sub>(x*) = {fmt(targetInfo.corr, 9)}
                            </div>
                        </div>
                    )}
                    {targetInfo.status === "off-grid" && (
                        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
                            {targetInfo.message}
                        </div>
                    )}
                    {targetInfo.status === "out-of-range" && (
                        <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-3 text-sm">
                            {targetInfo.message}
                        </div>
                    )}
                </div>
            </div>

            {/* Chart */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 mt-6">
                <h2 className="font-semibold mb-3">Milne Predicted vs Corrected</h2>
                <div className="h-[380px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <defs>
                                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                            <XAxis dataKey="x" stroke="#94a3b8" tickFormatter={(v) => fmt(v, 6)} />
                            <YAxis stroke="#94a3b8" tickFormatter={(v) => fmt(v, 6)} />
                            <Tooltip
                                contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#e2e8f0" }}
                                formatter={(value, name) => [fmt(Number(value), 9), name]}
                                labelFormatter={(label) => `x = ${fmt(Number(label), 6)}`}
                            />
                            <Legend wrapperStyle={{ color: "#e2e8f0" }} />
                            <Line type="monotone" dataKey="corr" name="Corrected" stroke="url(#g1)" strokeWidth={3} dot={{ r: 2 }} />
                            <Line type="monotone" dataKey="pred" name="Predicted" stroke="#f97316" strokeDasharray="4 4" strokeWidth={2} dot={{ r: 2 }} />

                            {/* first Milne marker (y4 prediction) */}
                            {data.length >= 5 && data[4].pred && (
                                <ReferenceDot x={data[4].x} y={data[4].pred} r={5} fill="#f97316" stroke="#0f172a" />
                            )}

                            {/* highlight the target x */}
                            {targetInfo.status === "ok" && (
                                <ReferenceDot
                                    x={targetInfo.x}
                                    y={targetInfo.corr ?? targetInfo.pred}
                                    r={6}
                                    fill="#10b981"
                                    stroke="#0f172a"
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
