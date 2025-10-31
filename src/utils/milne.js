import { create, all } from "mathjs";
const math = create(all);


export function makeF(exprStr) {
    try {
        const node = math.parse(exprStr);
        const code = node.compile();
        return (x, y) => code.evaluate({ x, y });
    } catch (e) {
        return () => NaN;
    }
}


export function milneFromStarters(xs, ys, f, nTotal, corrections = 2) {
    if (xs.length < 4 || ys.length < 4) return [];
    const h = xs[1] - xs[0];
    const fvals = [];
    for (let i = 0; i < 4; i++) fvals[i] = f(xs[i], ys[i]);
    const out = [];
    for (let i = 0; i < 4; i++) out.push({ i, x: xs[i], corr: ys[i] });
    while (out.length < nTotal) {
        const n = out.length - 1;
        const xNext = xs[0] + (n + 1) * h;
        const yPred = ys[n - 3] + (4 * h / 3) * (2 * fvals[n - 2] - fvals[n - 1] + 2 * fvals[n]);
        let yCorr = ys[n - 1] + (h / 3) * (fvals[n - 1] + 4 * fvals[n] + f(xNext, yPred));
        for (let c = 1; c < corrections; c++) {
            yCorr = ys[n - 1] + (h / 3) * (fvals[n - 1] + 4 * fvals[n] + f(xNext, yCorr));
        }
        ys.push(yCorr);
        xs.push(xNext);
        fvals.push(f(xNext, yCorr));
        out.push({ i: n + 1, x: xNext, pred: yPred, corr: yCorr });
    }
    return out;
}