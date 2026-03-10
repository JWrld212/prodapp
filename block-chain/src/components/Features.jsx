// import React from "react";

// const FEATURES = [
//   { title: "Connect Wallet", desc: "Securely connect your digital wallet using state-of-the-art encryption and multi-factor authentication." },
//   { title: "Synchronize Wallet", desc: "Monitor real-time transactions and updates; manage your assets effortlessly." },
//   { title: "Swap Tokens", desc: "Enjoy seamless token swaps with competitive rates and robust error handling." },
//   { title: "Claim Token", desc: "Effortlessly claim tokens via secure on-chain verification and transparent processes." },
//   { title: "Airdrop", desc: "Participate in verified airdrop events and receive rewards directly in your wallet." },
//   { title: "Authenticate Wallet", desc: "Utilize advanced authentication methods—including biometrics and hardware wallet integrations—for maximum security." },
//   { title: "More Options", desc: "Explore additional protocols, granular permissions, and comprehensive portfolio management features." },
// ];

// export default function Features({ onConnect }) {
//   return (
//     <section id="features" className="mx-auto max-w-[1200px] px-8 py-12 animate-fadeInUp">
//       <h2 className="font-montserrat text-3xl font-bold text-center text-black dark:text-white mb-6">
//         Core Features
//       </h2>

//       <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
//         {FEATURES.map((f) => (
//           <div
//             key={f.title}
//             className="
//               rounded-[10px] bg-white dark:bg-darkcard p-8 shadow-card
//               transition-transform duration-300 hover:-translate-y-[5px]
//             "
//           >
//             <h3 className="font-montserrat text-xl font-semibold mb-3 text-black dark:text-white">
//               {f.title}
//             </h3>

//             <p className="text-sm text-black/80 dark:text-white/80 mb-4">
//               {f.desc}
//             </p>

//             <button
//               onClick={onConnect}
//               className="
//                 rounded-md bg-primary dark:bg-darkprimary px-6 py-3 text-white text-sm font-semibold
//                 transition-colors hover:bg-accent
//               "
//             >
//               {f.title}
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
