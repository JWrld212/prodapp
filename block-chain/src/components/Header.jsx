// import React, { useEffect, useMemo, useState } from "react";

// const NAV = [
//   { href: "#hero", label: "Home" },
//   { href: "#features", label: "Features" },
//   { href: "#dashboard", label: "Dashboard" },
//   { href: "#security", label: "Security" },
//   { href: "#analytics", label: "Analytics" },
//   { href: "#ecosystem", label: "Ecosystem" },
//   { href: "#governance", label: "Governance" },
//   { href: "#developer", label: "Developer" },
//   { href: "#community", label: "Community" },
//   { href: "#airdrop", label: "Airdrop" },
//   { href: "#feedback", label: "Feedback" },
//   { href: "#achievements", label: "Achievements" },
//   { href: "#admin", label: "Admin" },
// ];

// export default function Header({ onOpenConnect }) {
//   const [open, setOpen] = useState(false);
//   const [lang, setLang] = useState("en");

//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     const isDark = theme === "dark";
//     document.documentElement.classList.toggle("dark", isDark);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const navItems = useMemo(() => NAV, []);

//   return (
//     <header className="sticky top-0 z-[300] h-[60px] bg-primary text-white dark:bg-darkprimary">
//       <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
//         <div className="font-montserrat text-[1.8rem] font-bold">
//           <span className="mr-2">⬢</span>Pro dApp
//         </div>

//         {/* Desktop nav */}
//         <nav className="hidden items-center md:flex">
//           <ul className="flex items-center gap-4">
//             {navItems.map((item) => (
//               <li key={item.href}>
//                 <a
//                   className="px-2 py-2 text-sm font-medium transition-colors hover:text-accent"
//                   href={item.href}
//                 >
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <select
//             className="ml-4 rounded-md border border-white/80 bg-transparent px-2 py-1 text-sm outline-none"
//             value={lang}
//             onChange={(e) => setLang(e.target.value)}
//           >
//             <option className="text-black" value="en">EN</option>
//             <option className="text-black" value="es">ES</option>
//             <option className="text-black" value="de">DE</option>
//           </select>

//           <button
//             type="button"
//             onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
//             className="ml-4 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
//           >
//             Toggle Theme
//           </button>

//           <button
//             type="button"
//             onClick={onOpenConnect}
//             className="ml-4 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
//           >
//             Onboard
//           </button>
//         </nav>

//         {/* Mobile button */}
//         <button
//           className="md:hidden"
//           aria-label="Open Navigation"
//           onClick={() => setOpen((v) => !v)}
//         >
//           <div className="flex flex-col gap-1">
//             <span className="h-[3px] w-[25px] bg-white" />
//             <span className="h-[3px] w-[25px] bg-white" />
//             <span className="h-[3px] w-[25px] bg-white" />
//           </div>
//         </button>
//       </div>

//       {/* Mobile slide menu */}
//       <div
//         className={[
//           "md:hidden fixed top-[60px] h-[calc(100vh-60px)] w-[250px] bg-primary dark:bg-darkprimary p-4 transition-all",
//           open ? "right-0" : "-right-[300px]",
//         ].join(" ")}
//       >
//         <ul className="flex flex-col gap-2">
//           {navItems.map((item) => (
//             <li key={item.href}>
//               <a
//                 className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//               >
//                 {item.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <div className="mt-4 flex items-center gap-2">
//           <select
//             className="w-full rounded-md border border-white/80 bg-transparent px-2 py-2 text-sm outline-none"
//             value={lang}
//             onChange={(e) => setLang(e.target.value)}
//           >
//             <option className="text-black" value="en">EN</option>
//             <option className="text-black" value="es">ES</option>
//             <option className="text-black" value="de">DE</option>
//           </select>
//         </div>

//         <button
//           type="button"
//           onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
//           className="mt-3 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
//         >
//           Toggle Theme
//         </button>

//         <button
//           type="button"
//           onClick={() => {
//             setOpen(false);
//             onOpenConnect();
//           }}
//           className="mt-3 w-full rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold"
//         >
//           Onboard
//         </button>
//       </div>
//     </header>
//   );
// }
