// Three-equation New Keynesian model with cognitive discounting (Gabaix 2020),
// solved in closed form for an AR(1) monetary shock. Runs in the browser and at
// build time, so the page has a complete static figure without JavaScript.
//
//   x_t  = m E x_{t+1} - sigma (i_t - E pi_{t+1})
//   pi_t = beta m E pi_{t+1} + kappa x_t
//   i_t  = phi_pi pi_t + phi_x x_t + v_t,   v_t = rho v_{t-1} + eps_t
//
// Calibration: Gali (2015, ch. 3). With m = 1, rho = 0.5 and a 25bp shock this
// reproduces Gali's output gap of -0.285 and annualised inflation of -0.288.

const P = { beta: 0.99, sigma: 1, kappa: 0.1275, phiPi: 1.5, phiX: 0.125, shock: 0.25 };
const H = 13; // quarters shown

export function irf(m, rho) {
  const { beta, sigma, kappa, phiPi, phiX, shock } = P;
  const lambda = kappa / (1 - beta * m * rho);
  const psiX = -sigma / (1 - m * rho + sigma * phiX + sigma * (phiPi - rho) * lambda);
  const psiPi = lambda * psiX;
  const path = (f) => Array.from({ length: H }, (_, t) => f(shock * rho ** t));
  return {
    x: path((v) => psiX * v),
    pi: path((v) => 4 * psiPi * v),
    i: path((v) => 4 * (phiPi * psiPi + phiX * psiX + 1) * v),
  };
}

const PANELS = [
  ["x", "Output gap, %"],
  ["pi", "Inflation, annualised %"],
  ["i", "Policy rate, annualised %"],
];

const W = 300, H_PX = 190, L = 40, R = 8, T = 26, B = 24;

function panel(key, label, base, alt) {
  const all = [...base[key], ...alt[key], 0];
  const top = Math.max(...all), bot = Math.min(...all);
  const pad = (top - bot || 1) * 0.1;
  const y0 = top + (top > 0 ? pad : 0), y1 = bot - (bot < 0 ? pad : 0);
  const sx = (t) => L + (t / (H - 1)) * (W - L - R);
  const sy = (v) => T + ((y0 - v) / (y0 - y1)) * (H_PX - T - B);
  const line = (s) => s.map((v, t) => `${sx(t).toFixed(1)},${sy(v).toFixed(1)}`).join(" ");
  const tick = (v) => `<text class="fig-tick" x="${L - 6}" y="${sy(v) + 3.5}" text-anchor="end">${v.toFixed(2).replace("-", "−")}</text>`;
  const extreme = Math.abs(bot) > Math.abs(top) ? bot : top;
  const xticks = [0, 4, 8, 12].map((t) => `<text class="fig-tick" x="${sx(t)}" y="${H_PX - 7}" text-anchor="middle">${t}</text>`).join("");
  return `<svg class="fig-panel" viewBox="0 0 ${W} ${H_PX}" role="img" aria-label="${label}">
<text class="fig-label" x="0" y="12">${label}</text>
<line class="fig-zero" x1="${L}" x2="${W - R}" y1="${sy(0)}" y2="${sy(0)}"/>
${tick(0)}${tick(extreme)}${xticks}
<polyline class="fig-base" points="${line(base[key])}"/>
<polyline class="fig-alt" points="${line(alt[key])}"/>
</svg>`;
}

const num = (v) => v.toFixed(3).replace("-", "−");

export function renderPanels(m, rho) {
  const base = irf(1, rho), alt = irf(m, rho);
  return PANELS.map(([k, l]) => panel(k, l, base, alt)).join("");
}

export function readout(m, rho) {
  const base = irf(1, rho), alt = irf(m, rho);
  return `On impact the output gap falls by ${num(Math.abs(alt.x[0]))}% with discounting, against ${num(Math.abs(base.x[0]))}% under full rationality.`;
}

if (typeof document !== "undefined") {
  const root = document.querySelector("[data-figure]");
  if (root) {
    const m = root.querySelector("#fig-m"), rho = root.querySelector("#fig-rho");
    const update = () => {
      root.querySelector("[data-panels]").innerHTML = renderPanels(+m.value, +rho.value);
      root.querySelector("[data-readout]").textContent = readout(+m.value, +rho.value);
      root.querySelector("[data-m]").textContent = (+m.value).toFixed(2);
      root.querySelector("[data-rho]").textContent = (+rho.value).toFixed(2);
    };
    m.addEventListener("input", update);
    rho.addEventListener("input", update);
    root.classList.add("is-live");
  }
}
