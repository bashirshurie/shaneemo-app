import { useState } from "react";
import {
  User,
  Sliders,
  CreditCard,
  Edit2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="pb-20 text-white w-full max-w-6xl mx-auto pt-6">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-3 text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-gray-400 font-medium">
          Manage your cinematic experience and subscription preferences.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Profile Management Section */}
          <div className="bg-[#1a1d29] rounded-2xl p-8 border border-gray-800/50 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <User className="w-6 h-6 text-primary-accent" />
              <h2 className="text-xl font-bold">Profile Management</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-[#ffcca8] overflow-hidden shadow-inner flex items-center justify-center border-4 border-dark-bg">
                  <div className="w-16 h-20 bg-white rounded shadow-sm opacity-90"></div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-primary-accent tracking-widest uppercase mb-2 block">
                    DISPLAY NAME
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#11131a] border border-transparent rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-primary-accent tracking-widest uppercase mb-2 block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#11131a] border border-transparent rounded-lg px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-primary-accent transition-colors"
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2 block">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••••••"
                    className="w-full bg-[#11131a] border border-transparent rounded-lg px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-primary-accent transition-colors"
                    disabled
                  />
                  <button className="absolute right-4 top-9 text-xs font-bold text-primary-accent tracking-widest hover:text-white transition-colors">
                    CHANGE
                  </button>
                </div>

                <div className="md:col-span-2 flex justify-end mt-2 items-center gap-4">
                  {saved && (
                    <span className="text-green-400 text-sm font-bold">
                      Saved!
                    </span>
                  )}
                  <button
                    onClick={handleSave}
                    className="bg-gray-700/50 hover:bg-gray-600 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-xl border border-gray-600/50 focus:ring-2 focus:ring-primary-accent/50 outline-none"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-[#1a1d29] rounded-2xl p-8 border border-gray-800/50 shadow-xl mb-8">
            <div className="flex items-center gap-3 mb-8">
              <Sliders className="w-6 h-6 text-primary-accent" />
              <h2 className="text-xl font-bold">Preferences</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Notifications */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-4 h-4 shrink-0 rounded-full bg-gray-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-sm">Notifications</h3>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">New Releases</span>
                    <div className="w-12 h-6 bg-primary-accent rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Account Security
                    </span>
                    <div className="w-12 h-6 bg-primary-accent rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Playback Quality */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-4 h-4 shrink-0 bg-gray-500 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <h3 className="font-bold text-sm">Playback Quality</h3>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="bg-primary-accent/10 border border-primary-accent/30 rounded-xl p-4 flex justify-between items-center cursor-pointer">
                    <span className="text-primary-accent font-bold text-sm">
                      Ultra HD (4K)
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-primary-accent" />
                  </div>
                  <div className="bg-[#11131a] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/50 transition border border-transparent">
                    <span className="text-gray-300 font-medium text-sm">
                      High (1080p)
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-4 leading-relaxed">
                  Automatic quality selection based on your bandwidth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-96 shrink-0 flex flex-col gap-6">
          {/* Subscription Panel */}
          <div className="bg-gradient-to-b from-[#1a1d29] to-[#161821] rounded-2xl p-8 border border-gray-800/50 shadow-2xl relative">
            <h2 className="text-xl font-bold mb-8">Subscription</h2>

            <div className="mb-8">
              <label className="text-[10px] font-bold text-primary-accent tracking-widest uppercase mb-1 block">
                CURRENT PLAN
              </label>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black">Premium</span>
                <span className="text-[10px] text-[#c0ff5b] font-bold tracking-wide uppercase">
                  Active
                </span>
              </div>
            </div>

            <div className="bg-[#11131a] rounded-xl p-5 mb-8 border border-gray-800/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-400 font-medium">
                  Next Billing Date
                </span>
                <span className="text-xs text-white font-bold">
                  Oct 12, 2024
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">
                  Amount
                </span>
                <span className="text-xs text-white font-bold">$14.99/mo</span>
              </div>
            </div>

            <div className="mb-10">
              <label className="text-[10px] font-bold text-primary-accent tracking-widest uppercase mb-4 block">
                PAYMENT METHOD
              </label>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-white px-2 py-1 rounded text-dark-bg font-black text-[10px] italic">
                    VISA
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-wider flex items-center gap-1">
                      •••• 4242
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      Visa | Exp: 09/28
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white transition">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button className="bg-gradient-to-r from-[#ff52a2] to-[#fd4196] text-white font-bold text-xs tracking-widest py-4 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition">
                MANAGE PLAN
              </button>
              <button className="bg-transparent text-gray-400 hover:text-white transition font-bold text-[10px] tracking-widest py-3 rounded-xl border border-transparent">
                CANCEL SUBSCRIPTION
              </button>
            </div>
          </div>

          {/* Family Sharing Panel */}
          <div className="bg-[#1a1d29] rounded-2xl p-6 border border-gray-800/50 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="bg-[#c0ff5b]/10 text-[#c0ff5b] p-2 rounded-lg shrink-0 mt-1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-2">Family Sharing</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] mb-4">
                  You are sharing your subscription with 3 family members.
                </p>
                <button className="text-[10px] font-bold text-primary-accent tracking-widest hover:text-white transition uppercase">
                  MANAGE FAMILY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
