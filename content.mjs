// All site content lives here. Edit, push, and the site and CV PDF rebuild themselves.
// Strings may contain inline HTML (<em>, <a>).

export const site = {
  name: "Daniel Vykoukal",
  url: "https://danielvykoukal.com",
  role: "Master’s student in Economic Research",
  place: "CERGE-EI, Prague",
  email: "daniel.vykoukal@cerge-ei.cz",
  github: "https://github.com/danielvykoukal",
  description:
    "Daniel Vykoukal: master’s student at CERGE-EI working on monetary policy, expectations and macroeconomic forecasting.",
};

export const home = {
  lede: "I study how monetary policy works when people do not pay full attention.",
  bio: [
    "I am a master’s student in Economic Research at CERGE-EI in Prague. My thesis looks at quantitative easing in a New Keynesian model where rational inattention and cognitive discounting replace the full-information assumption.",
    "I also work as a research assistant to Stephanie Ettmeier at Charles University, on how monetary policy shocks move the whole distribution of household expectations. This past summer I interned with the economics team at Moody’s, building nowcasting models for the euro area and Slovakia.",
  ],
  interests: ["Monetary policy", "Expectations and bounded rationality", "Macroeconometrics", "Nowcasting"],
};

// featured: also listed on the home page. pdf: file name under assets/files/.
export const research = [
  {
    group: "Thesis",
    items: [
      {
        title: "Unconventional Monetary Policy under Bounded Rationality",
        meta: "Master’s thesis, CERGE-EI",
        year: "In progress",
        featured: true,
        abstract:
          "Studies the transmission channels of quantitative easing (signalling, portfolio balance and liquidity) in a structural New Keynesian model with rational inattention and cognitive discounting replacing the full-information assumption.",
      },
    ],
  },
  {
    group: "Research projects",
    items: [
      {
        title: "Distributional Effects of Macroeconomic Shocks on Expectations",
        meta: "with Stephanie Ettmeier and Chi Hyun Kim",
        year: "In progress",
        featured: true,
        abstract:
          "Studies how monetary policy shocks affect the full cross-sectional distribution of US household inflation and income expectations, using the New York Fed’s Survey of Consumer Expectations with high-frequency-identified shocks decomposed into target and path components. A functional VAR identifies whether policy actions compress or widen the distribution of expectations and which segments respond most strongly.",
      },
      {
        title: "Monetary Policy of the European Central Bank: A BVAR Approach",
        meta: "with Tomáš Pokorný (Czech National Bank)",
        year: "In progress",
        abstract:
          "Estimates Bayesian VARs with Minnesota priors for ECB monetary transmission, with impulse responses, forecast error variance decompositions and robustness checks.",
      },
    ],
  },
  {
    group: "Course papers",
    items: [
      {
        title: "Macroeconomic Forecasting: Econometrics vs. Machine Learning",
        meta: "Machine Learning for Social Scientists, CERGE-EI",
        year: "2026",
        featured: true,
        abstract:
          "Compares ten models for GDP growth and inflation nowcasting in the Czech Republic and the United States: AR, ARMA, VAR and BVAR against Ridge, Lasso, XGBoost, Random Forest, a feedforward network and an LSTM. Over an expanding-window evaluation for 2014–2026, regularised regressions and tree ensembles cut GDP forecast errors by 45–55% relative to the AR benchmark from 2020 onward but overfit in stable times. Classical time-series models dominate inflation nowcasting, and the LSTM consistently underperforms.",
      },
      {
        title: "The Length of the Pre-Doctoral Period and Academic Performance",
        meta: "Statistics, CERGE-EI",
        year: "2026",
        abstract:
          "Fixed-effects estimation on a panel of five million observations, with a critical evaluation of the identification strategy and possible extensions. Presented in the Applied Microeconomics Research Seminar Series.",
      },
    ],
  },
];

export const projects = [
  {
    title: "Aiyagari (1995): Optimal Capital Income Taxation with Incomplete Markets",
    dek: "Animated presentation of why capital income should be taxed when households face uninsurable risk and borrowing limits. Click or press → to advance, ← to go back, F for full screen.",
    meta: "Public Finance, CERGE-EI",
    date: "2026",
    links: [{ label: "Open presentation", href: "/projects/aiyagari/" }],
  },
];

export const writing = {
  intro: "Commentary written at Moody’s.",
  items: [
    {
      title: "Euro Zone Savings: Increasing and Shifting",
      dek: "Following a series of crises, the household saving rate is stuck above its pre-pandemic norm.",
      meta: "with Annabelle Ren Fang and Olia Kuranova · Moody’s",
      date: "28 August 2026",
      links: [{ label: "PDF", href: "/assets/files/euro-zone-savings.pdf" }],
    },
    {
      title: "The Artificial Intelligence Ownership Gap",
      dek: "Europe’s AI dependence runs deep and could limit productivity gains.",
      meta: "with Annabelle Ren Fang · Moody’s",
      date: "21 August 2026",
      links: [
        { label: "Read", href: "https://www.economy.com/economicview/analysis/423628/The-Artificial-Intelligence-Ownership-Gap" },
        { label: "PDF", href: "/assets/files/ai-ownership-gap.pdf" },
      ],
    },
  ],
};

export const cv = [
  {
    section: "Education",
    entries: [
      {
        when: "2025–present",
        what: "Master’s in Economic Research",
        where: "CERGE-EI, Prague",
        notes: [
          "Thesis: <em>Unconventional Monetary Policy under Bounded Rationality</em> (in progress).",
          "Applied Macroeconomics I–II (Matlab, Dynare), Applied Microeconomics I–II, Statistics, Econometrics, Machine Learning for Social Scientists.",
        ],
      },
      {
        when: "2022–2025",
        what: "Bachelor’s in Economics",
        where: "Prague University of Economics and Business",
        notes: ["Intermediate Micro and Macro, Econometrics, Advanced Macroeconomics (MA level), Applied Quantitative Methods, Labor Economics, Game Theory."],
      },
    ],
  },
  {
    section: "Experience",
    entries: [
      {
        when: "Feb 2026–present",
        what: "Research Assistant to Stephanie Ettmeier",
        where: "Charles University, Prague",
        notes: ["Large-scale data cleaning and analysis in Python, reproducible workflows, and regular reporting of empirical results to the research team."],
      },
      {
        when: "Jun–Aug 2026",
        what: "Economics Intern",
        where: "Moody’s, Prague",
        notes: ["Nowcasting models for the euro area and Slovakia, with backtesting and variable selection. Debt revenue for OECD countries. Published commentary in the Economic View series."],
      },
      {
        when: "Sep 2023–Jun 2025",
        what: "Audit Intern",
        where: "Deloitte, Prague",
        notes: ["Analysis of client financial data and daily reporting to international clients."],
      },
    ],
  },
  {
    section: "Research",
    entries: [
      { when: "In progress", what: "Distributional Effects of Macroeconomic Shocks on Expectations", where: "with Stephanie Ettmeier and Chi Hyun Kim" },
      { when: "In progress", what: "Monetary Policy of the European Central Bank: A BVAR Approach", where: "with Tomáš Pokorný (Czech National Bank)" },
      { when: "2026", what: "Macroeconomic Forecasting: Econometrics vs. Machine Learning", where: "Course paper, CERGE-EI" },
      { when: "2026", what: "The Length of the Pre-Doctoral Period and Academic Performance", where: "Course paper, CERGE-EI; presented in the Applied Microeconomics Research Seminar Series" },
    ],
  },
  {
    section: "Skills",
    entries: [
      { what: "Programming", where: "Python, R, Matlab with Dynare, LaTeX, Git, EViews" },
      { what: "Methods", where: "Time series, VAR and BVAR, panel data, dynamic factor models including mixed-frequency" },
      { what: "Languages", where: "Czech (native), English (C1)" },
    ],
  },
];
