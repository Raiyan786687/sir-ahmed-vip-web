'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [step, setStep] = useState<'gift' | 'celebration' | 'main'>('gift');
  const [balloons, setBalloons] = useState<{ id: number; left: number; color: string; delay: number; speed: number }[]>([]);

  // Form State
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [msg, setMsg] = useState('');

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'bot', text: 'Assalamualikum! Welcome to ACC Ahmed Coaching Center. How can I help you with our classes or fields?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Read WhatsApp Number from .env.local
  const sirWhatsApp = process.env.NEXT_PUBLIC_SIR_WHATSAPP_NUMBER || "923492584693"; // Default number if not set

  // Slow Motion Celebration Setup
  useEffect(() => {
    if (step === 'celebration') {
      const items = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: ['bg-red-500', 'bg-amber-400', 'bg-emerald-400', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 3,
        speed: 6 + Math.random() * 5,
      }));
      setBalloons(items);

      const timer = setTimeout(() => {
        setStep('main');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Admission / Inquiry*%0A*Name:* ${encodeURIComponent(name)}%0A*Number:* ${encodeURIComponent(number)}%0A*Message:* ${encodeURIComponent(msg)}`;
    window.open(`https://wa.me/${sirWhatsApp}?text=${text}`, '_blank');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Server error. Please try again.' }]);
    }
  };

  // 1. Double Tap Gift Screen
  if (step === 'gift') {
    return (
      <div
        className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center cursor-pointer select-none z-50 px-4"
        onDoubleClick={() => setStep('celebration')}
      >
        <div className="vip-card p-10 rounded-3xl text-center max-w-md w-full border border-amber-500/40 shadow-2xl animate-float hover-lift">
          <div className="text-7xl mb-4">🎁</div>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-400 mb-2 glow-text">
            Special Surprise
          </h1>
          <p className="text-slate-300 text-lg mb-6">
            Double tap to open your gift
          </p>
          <div className="inline-block px-5 py-2.5 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-300 text-sm font-semibold animate-pulse">
            👆 Double Tap Here
          </div>
        </div>
      </div>
    );
  }

  // 2. Slow Motion Celebration Screen
  if (step === 'celebration') {
    return (
      <div className="fixed inset-0 bg-slate-950 overflow-hidden flex flex-col items-center justify-center z-50">
        {balloons.map(b => (
          <div
            key={b.id}
            className={`absolute w-7 h-9 rounded-full ${b.color} opacity-85 shadow-lg`}
            style={{
              left: `${b.left}%`,
              top: `-15%`,
              animation: `floatDown ${b.speed}s linear infinite`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <div className="text-6xl mb-4 animate-bounce">🎆💥🎆</div>
          <h1 className="text-5xl md:text-7xl font-black text-amber-400 glow-text mb-6 tracking-wide transition-all duration-1000 scale-105">
            🎉 Happy Birthday Sir! 🎉
          </h1>
          <p className="text-2xl text-slate-200 font-medium mb-8">
            Wishing you great health, success & happiness! ✨
          </p>
          <div className="inline-block px-6 py-2 rounded-full bg-slate-900/80 border border-amber-500/40 text-amber-300 text-sm animate-pulse">
            Opening ACC VIP Website...
          </div>
        </div>

        <style jsx>{`
          @keyframes floatDown {
            0% { transform: translateY(0vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(115vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  // 3. Main VIP Web Experience
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-amber-500/20 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-bold text-lg glow-text">
            ACC
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-400">ACC Ahmed Coaching Center</h2>
            <p className="text-xs text-slate-400">Malir / Alameen City</p>
          </div>
        </div>
        <a
          href="#admission-form"
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold px-5 py-2 rounded-xl shadow-lg transition-all text-sm hover-lift"
        >
          Online Admission
        </a>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0,transparent_70%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto z-10">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6 inline-block">
            ✨ Excellence in Education ✨
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Welcome to <span className="text-amber-400 glow-text">ACC Ahmed Coaching Center</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Empowering students from Class 1 to 2nd Year with top-tier education, expert guidance, and smart learning in Malir & Alameen City.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#admission-form"
              className="bg-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-2xl shadow-xl transition-all hover-lift"
            >
              Apply For Admission
            </a>
            <button
              onClick={() => setChatOpen(true)}
              className="bg-slate-900 text-amber-400 border border-amber-500/40 font-semibold px-8 py-3.5 rounded-2xl shadow-xl transition-all hover-lift"
            >
              💬 Ask AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: Why Choose ACC (Hover Lift Added to Each Card) */}
      <section className="py-16 px-6 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-amber-400 mb-3">Why Choose ACC Coaching?</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">We provide the best environment and conceptual learning for your child's bright future.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="vip-card p-6 rounded-2xl text-center hover-lift cursor-pointer">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="font-bold text-amber-400 mb-2">Expert Teachers</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Highly qualified faculty dedicated to concept clarity and academic growth.</p>
            </div>

            <div className="vip-card p-6 rounded-2xl text-center hover-lift cursor-pointer">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-amber-400 mb-2">Complete Syllabus</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Full course coverage with regular revision and board pattern exam preparation.</p>
            </div>

            <div className="vip-card p-6 rounded-2xl text-center hover-lift cursor-pointer">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold text-amber-400 mb-2">Weekly Tests</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Weekly testing system and monthly performance reports for parents.</p>
            </div>

            <div className="vip-card p-6 rounded-2xl text-center hover-lift cursor-pointer">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold text-amber-400 mb-2">Personal Attention</h3>
              <p className="text-slate-300 text-xs leading-relaxed">Small batch sizes ensuring individual guidance for every single student.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Location & Info Card */}
      <section className="py-16 px-6 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto vip-card p-8 rounded-3xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 hover-lift">
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">Visit ACC Campus Today</h3>
            <p className="text-slate-300 text-sm max-w-lg mb-2">
              📍 <strong className="text-white">Location:</strong> Malir / Alameen City / ACC
            </p>
            <p className="text-slate-400 text-xs">
              Admissions are currently OPEN for all batches. Contact us on WhatsApp or submit the form below for fast processing!
            </p>
          </div>
          <a
            href="#admission-form"
            className="bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl whitespace-nowrap transition-all text-sm hover-lift"
          >
            Apply Now ➔
          </a>
        </div>
      </section>

      {/* Admission Form Section */}
      <section id="admission-form" className="py-20 px-6 bg-slate-900/80 border-t border-slate-800">
        <div className="max-w-xl mx-auto vip-card p-8 md:p-10 rounded-3xl hover-lift">
          <h3 className="text-2xl font-bold text-amber-400 mb-2 text-center">Online Admission Form</h3>
          <p className="text-slate-400 text-center text-sm mb-8">Fill out the form below to send your details directly to WhatsApp.</p>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">1st Name / Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">2nd Number (Contact Number)</label>
              <input
                type="tel"
                required
                value={number}
                onChange={e => setNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">3rd Message / Class & Details</label>
              <textarea
                rows={4}
                required
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="Mention your class and message here..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold py-4 rounded-xl shadow-lg transition-all text-center flex items-center justify-center space-x-2 hover-lift"
            >
              <span>📲 Send to WhatsApp Form</span>
            </button>
          </form>
        </div>
      </section>

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-amber-500 text-slate-950 p-4 rounded-full shadow-2xl flex items-center justify-center font-bold text-xl transition-all hover-lift"
          >
            💬
          </button>
        ) : (
          <div className="vip-card w-80 md:w-96 h-[450px] rounded-3xl shadow-2xl flex flex-col border border-amber-500/40 overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-amber-400 text-sm">ACC Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white font-bold px-2">✕</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${m.sender === 'user' ? 'bg-amber-500 text-slate-950 font-medium' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex space-x-2">
              <input
                type="text"
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                placeholder="Ask about classes or fees..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold">Send</button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-6 text-center text-slate-400 text-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-amber-400 font-bold">ACC Ahmed Coaching Center</p>
            <p className="text-xs text-slate-400 mt-1">Location: Malir / Alameen City / ACC</p>
          </div>
          <div>
            <p className="text-xs text-slate-300">Sir's Contact: <span className="text-amber-400 font-semibold">+{sirWhatsApp}</span></p>
            <p className="text-[10px] text-slate-400 mt-1">© 2026 ACC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
