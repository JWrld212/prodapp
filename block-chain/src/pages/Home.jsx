import React, { useEffect, useMemo, useRef, useState } from "react";
import ConnectWalletModal from "../components/ConnectWalletModal";

const NAV = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#security", label: "Security" },
  { href: "#analytics", label: "Analytics" },
  { href: "#ecosystem", label: "Ecosystem" },
  { href: "#governance", label: "Governance" },
  { href: "#developer", label: "Developer" },
  { href: "#community", label: "Community" },
  { href: "#airdrop", label: "Airdrop" },
  { href: "#feedback", label: "Feedback" },
  { href: "#achievements", label: "Achievements" },
  { href: "#admin", label: "Admin" },
];

const FEATURES = [
  {
    title: "Connect Wallet",
    desc: "Securely connect your digital wallet using state-of-the-art encryption and multi-factor authentication.",
    btn: "Connect Wallet",
  },
  {
    title: "Synchronize Wallet",
    desc: "Monitor real-time transactions and updates; manage your assets effortlessly.",
    btn: "Synchronize Wallet",
  },
  {
    title: "Swap Tokens",
    desc: "Enjoy seamless token swaps with competitive rates and robust error handling.",
    btn: "Swap Tokens",
  },
  {
    title: "Claim Token",
    desc: "Effortlessly claim tokens via secure on-chain verification and transparent processes.",
    btn: "Claim Token",
  },
  {
    title: "Airdrop",
    desc: "Participate in verified airdrop events and receive rewards directly in your wallet.",
    btn: "Airdrop",
  },
  {
    title: "Authenticate Wallet",
    desc: "Utilize advanced authentication methods—including biometrics and hardware wallet integrations—for maximum security.",
    btn: "Authenticate Wallet",
  },
  {
    title: "More Options",
    desc: "Explore additional protocols, granular permissions, and comprehensive portfolio management features.",
    btn: "More Options",
  },
];

/* -----------------------------
   ✅ FIX 1: Missing hook
----------------------------- */
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

/* Real Theme Switch */
function ThemeSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-9 w-16 items-center rounded-full border border-white/20 transition-colors",
        checked ? "bg-accent" : "bg-white/15",
      ].join(" ")}
      title="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span className="absolute left-2 text-xs text-white/80">☀</span>
      <span className="absolute right-2 text-xs text-white/80">🌙</span>
      <span
        className={[
          "inline-block h-7 w-7 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-8" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
}

/* -----------------------------
   Header Component
----------------------------- */
function Header({ navItems, lang, setLang, theme, setTheme, openConnect }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useOnClickOutside(moreRef, () => setMoreOpen(false));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // split nav into visible + overflow
  const { visibleItems, overflowItems } = useMemo(() => {
    let max = 5;
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w >= 1280) max = 9;
    else if (w >= 1024) max = 7;
    else if (w >= 768) max = 5;

    return {
      visibleItems: navItems.slice(0, max),
      overflowItems: navItems.slice(max),
    };
  }, [navItems]);

  const isDark = theme === "dark";

  return (
    <header className="fixed top-0 z-[200] w-full bg-primary pb-[60px] text-white dark:bg-darkprimary">
      <div className="mx-auto flex h-[60px] w-full fixed  bg-primary max-w-[1200px] items-center justify-between px-4 sm:px-6  dark:bg-darkprimary">
        {/* Logo */}
        <div className="font-montserrat text-[1.6rem] font-bold whitespace-nowrap">
          <span className="mr-2">⬢</span>chain assist
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex  items-center gap-3 min-w-0">
          <ul className="flex items-center gap-3 lg:gap-4 min-w-0 overflow-hidden">
            {visibleItems.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  className="px-2 py-2 text-sm font-medium transition-colors hover:text-accent whitespace-nowrap"
                >
                  {item.label}
                </a>
              </li>
            ))}

            {overflowItems.length > 0 && (
              <li className="relative shrink-0" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen((v) => !v)}
                  className="px-2 py-2 text-sm font-semibold hover:text-accent whitespace-nowrap"
                  aria-haspopup="menu"
                  aria-expanded={moreOpen}
                >
                  More <span className="ml-1">▾</span>
                </button>

                {moreOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black/80 backdrop-blur p-2 shadow-lg"
                    role="menu"
                  >
                    {overflowItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-white/10"
                        role="menuitem"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              className="rounded-md border border-white/70 bg-transparent px-2 py-1 text-sm outline-none"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option className="text-black" value="en">
                EN
              </option>
              <option className="text-black" value="es">
                ES
              </option>
              <option className="text-black" value="de">
                DE
              </option>
            </select>

            <ThemeSwitch
              checked={isDark}
              onChange={(checked) => setTheme(checked ? "dark" : "light")}
            />

            <button
              type="button"
              onClick={openConnect}
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15 whitespace-nowrap"
            >
              Onboard
            </button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          aria-label="Open Navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1">
            <span className="h-[3px] w-[25px] bg-white" />
            <span className="h-[3px] w-[25px] bg-white" />
            <span className="h-[3px] w-[25px] bg-white" />
          </div>
        </button>
      </div>

      {/* Mobile slide menu */}
      <div
        className={[
          "md:hidden fixed top-[60px] right-0 max-h-[calc(100vh-60px)] w-[250px] bg-primary dark:bg-darkprimary p-4 transition-transform overflow-y-auto",
          menuOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <select
          className="mt-4 w-full rounded-md border border-white/70 bg-transparent px-2 py-2 text-sm outline-none"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option className="text-black" value="en">
            EN
          </option>
          <option className="text-black" value="es">
            ES
          </option>
          <option className="text-black" value="de">
            DE
          </option>
        </select>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-white/80">Theme</span>
          <ThemeSwitch
            checked={isDark}
            onChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            openConnect();
          }}
          className="mt-3 w-full rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold"
        >
          Onboard
        </button>
      </div>
    </header>
  );
}

/* -----------------------------
   Page
----------------------------- */
export default function Home() {
  const [lang, setLang] = useState("en");

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  const [connectOpen, setConnectOpen] = useState(false);

  // Testimonials slider
  const [slide, setSlide] = useState(0);
  const sliderTimerRef = useRef(null);

  const navItems = useMemo(() => NAV, []);

  // ✅ Global theme switch (this was already correct)
  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    sliderTimerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % 3);
    }, 10000);

    return () => {
      if (sliderTimerRef.current) clearInterval(sliderTimerRef.current);
    };
  }, []);

  function openConnect() {
    setConnectOpen(true);
  }

  function closeConnect() {
    setConnectOpen(false);
  }

  // ✅ Reusable classes so dark mode affects everything
  const pageBg = "bg-gray-100 text-black dark:bg-[#0b0f18] dark:text-white";
  const card =
    "bg-white text-black shadow-card dark:bg-white/5 dark:text-white dark:border dark:border-white/10";
  const softCard =
    "bg-[#eef3f9] text-black shadow-card dark:bg-white/5 dark:text-white dark:border dark:border-white/10";
  const sectionTitle = "text-black dark:text-white";
  const sectionText = "text-black/80 dark:text-white/70";

  return (
    <div className={`min-h-screen pt-[5%] overflow-x-hidden transition-colors ${pageBg}`}>
      <Header
        navItems={navItems}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        openConnect={openConnect}
      />

      {/* HERO */}
      <section
        id="hero"
        className="group relative overflow-hidden bg-[linear-gradient(135deg,#1a2238_0%,#2d3e50_100%)] px-8 w-[90%] py-16 m-auto text-center text-white animate-fadeInUp rounded-2xl mt-8"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 80% 40%, rgba(0,255,255,0.18), transparent 45%), radial-gradient(circle at 50% 90%, rgba(0,120,255,0.18), transparent 50%)",
          }}
        />

        <div className="relative z-10  mx-auto max-w-[1000px]">
          <h1 className="font-montserrat text-5xl font-bold mb-4">
            Empowering Your Blockchain Experience
          </h1>

          <p className="mx-auto mb-8 max-w-[600px] text-lg text-white/90">
            Access wallets, swap tokens, claim rewards, and secure your assets
            on an ecosystem built for innovation and trust.
          </p>

          <button
            onClick={openConnect}
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-semibold transition-transform hover:-translate-y-[3px]"
          >
            Connect Wallet
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Core Features
        </h2>

        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`rounded-[10px] p-8 transition-transform duration-300 hover:-translate-y-[5px] ${card}`}
            >
              <h3 className="font-montserrat text-xl font-semibold mb-3">
                {f.title}
              </h3>

              <p className={`text-md font-medium mb-4 ${sectionText}`}>
                {f.desc}
              </p>

              <button
                onClick={openConnect}
                className="rounded-md bg-primary px-6 py-3 text-white text-sm font-semibold transition-colors hover:bg-accent"
              >
                {f.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD */}
      <section
        id="dashboard"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-2 ${sectionTitle}`}
        >
          Your Dashboard
        </h2>
        <p className={`text-center text-md font-medium mb-8 ${sectionText}`}>
          Customize your experience with real-time analytics, market data, and
          personalized widgets.
        </p>

        <div className="flex flex-wrap gap-6">
          {[
            { title: "Portfolio Balance", value: "$0.00" },
            { title: "Recent Transactions", value: "No transactions yet" },
            { title: "Market Trends", value: "Chart Placeholder" },
          ].map((w) => (
            <div
              key={w.title}
              className={`min-w-[250px] flex-1 rounded-lg p-6 animate-fadeInUp ${card}`}
            >
              <h4 className="mb-2 font-semibold text-lg">{w.title}</h4>
              <p className={`text-md font-medium ${sectionText}`}>{w.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECURITY */}
      <section
        id="security"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Advanced Security & Audits
        </h2>

        <div className={`rounded-lg p-8 ${softCard}`}>
          <h3 className="font-montserrat text-xl font-semibold mb-4">
            Security Features
          </h3>

          <ul className={`ml-4 list-disc space-y-2 text-md ${sectionText}`}>
            <li>Biometric & Hardware Wallet Integrations</li>
            <li>Behavioral Anomaly Detection & Alerts</li>
            <li>Zero-Knowledge Proof Authentication</li>
            <li>Granular Permission Controls</li>
          </ul>

          <div className="mt-4 inline-flex rounded-md bg-accent px-3 py-2 text-white text-lg font-bold">
            Security Score: 92%
          </div>

          <div className={`mt-4 text-center text-md font-medium ${sectionText}`}>
            <a className="text-primary dark:text-accent hover:underline" href="#security">
              View Audit Reports
            </a>
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section
        id="analytics"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Real-Time Analytics
        </h2>

        <div className={`rounded-lg p-8 shadow-card text-center ${card}`}>
          <p className={`mb-4 text-md font-medium ${sectionText}`}>
            Live token prices, historical performance, and personalized risk
            analysis at a glance.
          </p>

          <div className="h-[200px] rounded-lg bg-[#ccc] leading-[200px] font-medium text-[#666] text-lg dark:bg-white/10 dark:text-white/70">
            Chart Placeholder
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section
        id="ecosystem"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          NFT, Cross-Chain & DeFi
        </h2>

        <div className="flex flex-wrap gap-8">
          {[
            {
              title: "NFT Marketplace",
              desc: "Mint, buy, sell, and trade NFTs while integrating digital collectibles into your portfolio.",
              btn: "View Marketplace",
            },
            {
              title: "DeFi Integration",
              desc: "Access lending, borrowing, yield farming, and liquidity pools in a secure hub.",
              btn: "Explore DeFi",
            },
          ].map((b) => (
            <div
              key={b.title}
              className={`min-w-[300px] flex-1 rounded-lg p-6 ${card}`}
            >
              <h3 className="font-montserrat text-xl font-semibold mb-3">
                {b.title}
              </h3>
              <p className={`text-md font-medium mb-4 ${sectionText}`}>{b.desc}</p>
              <button
                onClick={openConnect}
                className="rounded-md bg-primary px-6 py-3 text-white text-sm font-semibold transition-colors hover:bg-accent"
              >
                {b.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* GOVERNANCE */}
      <section
        id="governance"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Decentralized Governance
        </h2>

        <div className={`rounded-[10px] p-8 shadow-card text-center ${card}`}>
          <h3 className="font-montserrat text-xl font-semibold mb-3">
            Community Proposals
          </h3>
          <p className={`text-lg mb-4 ${sectionText}`}>
            Participate in on-chain voting and decision-making processes with
            full transparency.
          </p>
          <button
            onClick={() => openConnect()}
            className="rounded-md bg-primary px-6 py-3 text-white text-md font-semibold hover:bg-accent transition-colors"
          >
            Vote Now
          </button>
        </div>
      </section>

      {/* DEVELOPER */}
      <section
        id="developer"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Developer & API Ecosystem
        </h2>

        <div className={`rounded-lg p-8 shadow-card text-center ${softCard}`}>
          <h3 className="font-montserrat text-xl font-semibold mb-3">
            Developer Portal
          </h3>
          <p className={`text-md font-medium mb-4 ${sectionText}`}>
            Access robust APIs, SDKs, and comprehensive documentation to build
            your own integrations on our platform.
          </p>
          <button
            onClick={openConnect}
            className="rounded-md bg-primary px-6 py-3 text-white text-sm font-semibold hover:bg-accent transition-colors"
          >
            Visit Developer Portal
          </button>
        </div>
      </section>

      {/* COMMUNITY */}
      <section
        id="community"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Social Trading & Community
        </h2>

        <div className={`rounded-lg p-8 shadow-card text-center ${softCard}`}>
          <h3 className="font-montserrat text-xl font-semibold mb-3">
            Join the Community
          </h3>
          <p className={`text-md font-medium mb-4 ${sectionText}`}>
            Follow top traders, share strategies, and participate in challenges
            for rewards.
          </p>
          <button
            onClick={openConnect}
            className="mx-auto block rounded-md bg-primary px-6 py-3 text-white text-md font-semibold hover:bg-accent transition-colors"
          >
            Join Now
          </button>

          <div className="mt-4 rounded-md bg-[#ddd] p-6 text-md text-[#333] dark:bg-white/10 dark:text-white/80">
            Community Challenge: Trade for a chance to win exclusive NFTs!
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section
        id="achievements"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Your Achievements
        </h2>

        <div className={`rounded-lg p-8 shadow-card text-center ${softCard}`}>
          <h3 className="font-montserrat text-xl font-semibold mb-3">
            Progress & Badges
          </h3>
          <p className={`text-md font-medium mb-4 ${sectionText}`}>
            Track your onboarding progress and earn badges for milestones
            completed.
          </p>

          <div className="mx-auto max-w-[400px] overflow-hidden rounded-md bg-[#ccc] dark:bg-white/10">
            <div className="w-[70%] bg-accent py-4 text-center text-sm font-bold text-white">
              70%
            </div>
          </div>
        </div>
      </section>

      {/* ADMIN */}
      <section
        id="admin"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2
          className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}
        >
          Admin Dashboard
        </h2>

        <div className={`rounded-lg p-8 shadow-card text-center ${softCard}`}>
          <h3 className="font-montserrat text-xl font-semibold mb-3">
            Platform Metrics
          </h3>
          <p className={`text-md font-medium ${sectionText}`}>
            Monitor system health, API usage, user engagement, and security
            metrics.
          </p>
          <p className="mt-3 text-md italic text-black/70 dark:text-white/60">
            [Admin dashboard placeholder]
          </p>
        </div>
      </section>

      {/* ADVANCED SECTIONS */}
      <SectionText
        title="Advanced User & Access Management"
        text="Integrate decentralized identity (DID) solutions, role-based access control (RBAC), and adaptive multi-factor authentication (MFA) to empower users with self-sovereign identities and granular permissions."
      />
      <SectionText
        title="Smart Contract Upgradability & Governance"
        text="Ensure seamless smart contract upgrades with proxy patterns, combined with token-based governance that enables token holders to vote on platform changes."
      />
      <SectionText
        title="Automated Security Auditing & Privacy Enhancements"
        text="Incorporate continuous auditing tools, vulnerability monitoring, and privacy-enhancing technologies (e.g., zero-knowledge proofs) to safeguard user data."
      />
      <SectionText
        title="Asset Management & DeFi Extensions"
        text="Access an advanced dashboard for portfolio analytics, risk analysis, yield aggregation, and flash loan/arbitrage tools for power users."
      />
      <SectionText
        title="Cross-Chain & Interoperability"
        text="Enable seamless asset and data transfers across multiple blockchains with cross-chain bridges and interoperability protocols."
      />
      <SectionText
        title="Next-Generation Capabilities"
        text="Explore AI-driven insights, augmented reality (AR) for immersive data visualization, and edge computing solutions to optimize performance and latency."
      />

      {/* NOTIFICATIONS */}
      <section className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp">
        <h2 className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}>
          Real-Time Notifications & Alerts
        </h2>

        <div className={`rounded-lg p-8 shadow-card ${card}`}>
          <p className={`text-md mb-4 ${sectionText}`}>
            Stay informed with in-app notifications, push alerts, and email/SMS
            integrations for critical events.
          </p>
          <ul className={`ml-6 list-disc text-md space-y-2 ${sectionText}`}>
            <li>Price Alert: BTC reached $60,000</li>
            <li>New Governance Proposal available</li>
            <li>Wallet connected successfully</li>
          </ul>
        </div>
      </section>

      {/* CHAT */}
      <section className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp">
        <h2 className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}>
          Integrated Chat & Support
        </h2>

        <div className={`rounded-lg p-8 shadow-card ${card}`}>
          <p className={`text-md mb-4 ${sectionText}`}>
            Get live support, participate in community discussions, and access
            FAQs or AI-driven assistance directly within the platform.
          </p>

          <div className="h-[300px] rounded-lg bg-[#ccc] p-4 overflow-y-auto text-black dark:bg-white/10 dark:text-white/80">
            <p>[Chat conversation placeholder]</p>
          </div>

          <div className="mt-4 flex">
            <input
              className="flex-1 rounded-l-md border border-black/10 bg-white px-3 py-2 text-md outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
              placeholder="Type your message..."
            />
            <button
              onClick={openConnect}
              className="rounded-r-md bg-accent px-4 py-2 text-md font-semibold text-white"
            >
              Send
            </button>
          </div>
        </div>
      </section>

      {/* EXPLORER */}
      <section className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp">
        <h2 className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}>
          Blockchain Explorer
        </h2>

        <div className={`rounded-lg p-8 shadow-card ${card}`}>
          <p className={`text-md font-medium mb-4 ${sectionText}`}>
            Verify transactions, monitor block confirmations, and explore smart
            contract details directly on the platform.
          </p>

          <div className="h-[200px] rounded-lg bg-[#ccc] leading-[200px] text-xl text-black dark:bg-white/10 dark:text-white/80">
            Explorer Placeholder
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp">
        <h2 className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}>
          Compliance & Regulatory Support
        </h2>

        <div className={`rounded-lg p-8 shadow-card ${card}`}>
          <p className={`text-md mb-3 ${sectionText}`}>
            Access tools for KYC/AML, on-chain audit trails, and automated
            compliance reporting to meet institutional standards.
          </p>
          <p className="text-md text-black/60 mb-4 dark:text-white/60">
            [Compliance modules and audit logs will be integrated here.]
          </p>
          <a className="text-accent font-semibold hover:underline" href="#compliance">
            Download Compliance Report
          </a>
        </div>
      </section>

      {/* FEEDBACK */}
      <section
        id="feedback"
        className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp"
      >
        <h2 className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}>
          User Feedback
        </h2>

        <div className={`rounded-lg p-8 shadow-card ${card}`}>
          <h3 className="font-montserrat text-xl font-semibold mb-3">
            We Value Your Input
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              openConnect();
              e.currentTarget.reset();
            }}
            className="flex flex-col gap-3"
          >
            <textarea
              className="rounded-md border border-black/10 bg-white px-3 py-2 text-md outline-none dark:bg-white/5 dark:text-white dark:border-white/10"
              rows={4}
              placeholder="Tell us what you think..."
              required
            />
            <button className="rounded-md bg-accent px-4 py-3 text-sm font-semibold text-white">
              Submit Feedback
            </button>
          </form>
        </div>
      </section>

      <ConnectWalletModal open={connectOpen} onClose={closeConnect} />

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        className="px-4 py-12 animate-fadeInUp bg-[#eef3f9] dark:bg-white/5"
      >
        <h2 className={`font-montserrat text-3xl font-bold text-center mb-6 ${sectionTitle}`}>
          What Our Users Say
        </h2>

        <div className="mx-auto max-w-[800px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${-100 * slide}%)` }}
          >
            <Testimonial
              quote="The interface is intuitive and performance is remarkable. I trust Pro dApp with all my transactions."
              author="Alex M."
            />
            <Testimonial
              quote="Professional design meets cutting-edge blockchain technology. A truly secure and efficient system."
              author="Jamie L."
            />
            <Testimonial
              quote="I appreciate the focus on security and transparency. Pro dApp sets a new standard in blockchain services."
              author="Morgan R."
            />
          </div>

          <div className="mt-4 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={[
                  "h-3 w-3 rounded-full transition-colors",
                  slide === i ? "bg-accent" : "bg-black/20 dark:bg-white/20",
                ].join(" ")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionText({ title, text }) {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp">
      <h2 className="font-montserrat text-3xl font-bold text-center mb-4 text-black dark:text-white">
        {title}
      </h2>
      <p className="text-md text-black/80 dark:text-white/70">{text}</p>
      <p className="mt-2 text-lg font-medium text-black italic dark:text-white/60">
        [Section placeholder]
      </p>
    </section>
  );
}

function Testimonial({ quote, author }) {
  return (
    <div className="min-w-full box-border rounded-lg bg-white p-6 shadow-card text-left dark:bg-white/5 dark:border dark:border-white/10">
      <p className="italic text-black mb-3 dark:text-white/80">"{quote}"</p>
      <div className="font-semibold text-black dark:text-white">- {author}</div>
    </div>
  );
}