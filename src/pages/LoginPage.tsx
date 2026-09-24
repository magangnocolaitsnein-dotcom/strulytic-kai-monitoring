import React, { useState } from 'react';
import { useIot } from '../context/IotContext';
import { Train, Shield, KeyRound, User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { ParodyLogo } from '../components/common/ParodyLogo';

export const LoginPage: React.FC = () => {
  const { login } = useIot();
  const [username, setUsername] = useState('flux');
  const [password, setPassword] = useState('demo');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (!success) {
        setErrorMsg('Kredensial tidak valid. Gunakan username "flux" dan password "demo".');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-[16px] shadow-sm p-6 sm:p-8">
        {/* Brand / Logo Header with Parody Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <ParodyLogo variant="rai" width={180} height={60} />
          </div>
          <h1 className="text-lg font-bold text-[#0F172A] tracking-tight">
            Strulytic AIoT Platform
          </h1>
          <p className="text-xs text-[#475569] mt-1">
            Structural Health Monitoring (SHM) Jembatan & Terowongan Kereta Api
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] font-semibold text-[#0F4A8C] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Proposal Demo Landing Page · PT Kereta Api Indonesia</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-lg text-xs text-[#B91C1C] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#EF4444]" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Username ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g. flux)"
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg pl-9 pr-3 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#0F4A8C] focus:ring-1 focus:ring-[#0F4A8C] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1.5">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (e.g. demo)"
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg pl-9 pr-3 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:border-[#0F4A8C] focus:ring-1 focus:ring-[#0F4A8C] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 h-10 bg-[#0F4A8C] hover:bg-[#0C3B70] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span>Memverifikasi...</span>
            ) : (
              <>
                <span>Masuk ke Konsol SHM</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-6 pt-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-lg p-3 text-center">
          <p className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider">
            Demo Credentials
          </p>
          <div className="mt-1 flex items-center justify-center gap-3 text-xs font-mono text-[#0F172A]">
            <span>user: <strong className="text-[#0F4A8C]">flux</strong></span>
            <span>·</span>
            <span>pass: <strong className="text-[#0F4A8C]">demo</strong></span>
          </div>
        </div>

        {/* Industrial standard disclaimer */}
        <div className="mt-4 text-center text-[10px] text-[#64748B] flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#00A896]" />
          <span>Tersertifikasi Keamanan Siber EN 50126 Perkeretaapian KAI</span>
        </div>
      </div>
    </div>
  );
};
