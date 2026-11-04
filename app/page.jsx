'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Play, Pause, Music, Sparkles, Gift, Lock, Unlock, Calendar, 
  Trophy, CheckCircle2, RefreshCw, Award, Volume2, VolumeX, Key, 
  ChevronRight, Star, Flame, MessageCircle, Clock, MapPin, Smile
} from 'lucide-react';

// --- ANIMASI CANVAS HATI MELAYANG (BACKGROUND) ---
function HeartsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const hearts = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: Math.sin(Math.random() * Math.PI) * 0.8,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.05 + 0.02,
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    function drawHeart(x, y, size, opacity) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.fillStyle = `rgba(244, 63, 94, ${opacity})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(244, 63, 94, 0.6)';

      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
      ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      hearts.forEach((h) => {
        h.y -= h.speedY;
        h.x += Math.sin(h.y * 0.01) * 0.5;
        h.opacity += Math.sin(Date.now() * h.pulseSpeed) * 0.005;

        if (h.y < -30) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }

        drawHeart(h.x, h.y, h.size, Math.max(0.1, Math.min(0.8, h.opacity)));
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-70" />;
}

// --- KOMPONEN UTAMA WEB BUCIN ---
export default function WebBucin() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Tanggal Jadian (Bisa disesuaikan YYYY-MM-DD)
  const startDate = new Date('2023-01-01T00:00:00'); 
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Vault PIN & Secret Message
  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Random Reasons Vault
  const [currentReason, setCurrentReason] = useState('Klik tombol di bawah untuk membuka kartu alasan cinta!');
  const [isSpinning, setIsSpinning] = useState(false);

  const reasonsList = [
    'Kamu selalu punya cara ajaib buat bikin aku senyum saat hari lagi berat.',
    'Cara kamu nyimak aku cerita hal-hal random selalu bikin aku tersanjung.',
    'Suara tawa kamu adalah melodi favorit yang gak pernah bikin bosan.',
    'Kamu selalu jadi support system nomor satu di setiap impianku.',
    'Momen paling sederhana pun terasa sangat istimewa kalau sama kamu.',
    'Pelukan kamu adalah tempat paling aman dan nyaman di dunia ini.',
    'Kamu tidak pernah ragu buat menyemangati aku di saat aku ragu sama diri sendiri.',
    'Mata kamu selalu punya binar kehangatan yang bikin aku merasa dicintai.'
  ];

  // Love Story Timeline
  const [timeline, setTimeline] = useState([
    { date: 'Momen Pertama', title: 'Awal Mula Kenal', desc: 'Momen pertama kali obrolan kita mengalir tanpa rasa canggung.', icon: Flame },
    { date: 'First Date', title: 'Jalan & Ngobrol Berjam-jam', desc: 'Hari di mana kita sadar kalau waktu jalan terlalu cepat kalau lagi bareng.', icon: Calendar },
    { date: 'Hari Spesial', title: 'Resmi Komitmen', desc: 'Keputusan terbaik dalam hidupku: memulai perjalanan indah ini sama kamu.', icon: Heart },
    { date: 'Kenangan Manis', title: 'Petualangan & Liburan Pertama', desc: 'Menjelajahi tempat baru, bikin foto-foto lucu, dan kenangan tak terlupakan.', icon: MapPin }
  ]);

  // Redeemable Love Coupons
  const [coupons, setCoupons] = useState([
    { id: 1, title: 'Bebas Pilih Tempat Makan', desc: 'Bebas tentukan resto/kuliner tanpa ada kata "terserah".', category: 'Kuliner', claimed: false },
    { id: 2, title: 'Pelukan Hangat 5 Menit', desc: 'Redeem kapan saja kamu butuh penenang ekstra.', category: 'Affection', claimed: false },
    { id: 3, title: 'Diturutin Kemauannya 1 Hari', desc: 'Berlaku 24 jam penuh tanpa bantahan atau alasan!', category: 'VVIP', claimed: false },
    { id: 4, title: 'Puk-Puk & Es Krim Gratis', desc: 'Kupon darurat saat kamu lagi badmood atau pms.', category: 'Comfort', claimed: false }
  ]);

  // Couple Bucket List
  const [bucketList, setBucketList] = useState([
    { id: 1, text: 'Nonton Konser Musik Favorit Bareng', category: 'Hiburan', done: true },
    { id: 2, text: 'Thrifting & Match Outfit Bareng', category: 'Style', done: true },
    { id: 3, text: 'Camp / Sunmori Menikmati Sunrise', category: 'Outdoor', done: false },
    { id: 4, text: 'Masak Dinner Favorit Berdua di Rumah', category: 'Home', done: false },
    { id: 5, text: 'Foto Box Lucu Pakai Pop-Up Costume', category: 'Fun', done: false }
  ]);

  // Interactive Quiz
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      question: "Apa hal pertama yang bikin aku paling kagum sama kamu?",
      options: ["Senyuman manis kamu", "Kebaikan & empati kamu", "Cara kamu bicara", "Semuanya tanpa sisa!"],
      answer: 3
    },
    {
      question: "Kalau aku lagi kangen banget, biasanya aku bakal...",
      options: ["Cari alasan telfonan lama", "Ngirim meme/stiker lucu", "Manja di chat", "Langsung nyamperin kamu"],
      answer: 0
    },
    {
      question: "Apa definisi hari yang sempurna versi kita?",
      options: ["Jalan-jalan seharian", "Nonton film sambil makan enak", "Ngobrol deep talk berjam-jam", "Semua momen asal bareng kamu"],
      answer: 3
    }
  ];

  // Hydration Check (Mencegah SSR Build Error Vercel)
  useEffect(() => {
    setIsMounted(true);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Autoplay ditahan browser:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getRandomReason = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * reasonsList.length);
      setCurrentReason(reasonsList[idx]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const handleClaimCoupon = (id) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, claimed: true } : c)));
  };

  const toggleBucket = (id) => {
    setBucketList(bucketList.map((b) => (b.id === id ? { ...b, done: !b.done } : b)));
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '2707') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleQuizAnswer = (selectedIndex) => {
    if (selectedIndex === quizQuestions[quizIndex].answer) {
      setScore(score + 1);
    }
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Pre-loader untuk Vercel SSR
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-rose-400 font-sans">
        <div className="animate-pulse flex items-center gap-3">
          <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-bounce" />
          <span className="text-xl font-bold tracking-wide">Menyiapkan Dunia Bucin Kita... ❤️</span>
        </div>
      </div>
    );
  }

  const completedBucketCount = bucketList.filter((b) => b.done).length;
  const bucketProgress = Math.round((completedBucketCount / bucketList.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden pb-32 selection:bg-rose-500 selection:text-white">
      {/* Background Hearts Canvas */}
      <HeartsCanvas />

      {/* Audio Element (Memanggil /shapeofmyheart.mp3 dari folder public) */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* FLOATING MUSIC PLAYER (Equalizer Style) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={togglePlay}
          className="bg-slate-900/90 hover:bg-slate-800 text-rose-300 border border-rose-500/40 px-5 py-3.5 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 group"
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-1 h-4 w-5">
                <span className="w-1 bg-rose-500 rounded-full animate-[bounce_1s_infinite_100ms] h-full"></span>
                <span className="w-1 bg-pink-400 rounded-full animate-[bounce_1s_infinite_300ms] h-3"></span>
                <span className="w-1 bg-rose-400 rounded-full animate-[bounce_1s_infinite_200ms] h-4"></span>
              </div>
              <Pause className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold tracking-wide text-slate-200">Shape of My Heart</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-rose-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-semibold tracking-wide text-slate-300">Play Our Song</span>
            </>
          )}
        </button>
      </div>

      {/* HERO SECTION */}
      <header className="relative pt-24 pb-16 px-4 text-center max-w-4xl mx-auto z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
          <span>Our Special Universe</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 mb-6 tracking-tight leading-tight">
          Cerita Indah Kita ❤️
        </h1>
        
        <p className="text-slate-400 text-base md:text-xl max-w-xl mx-auto leading-relaxed">
          Setiap detik bersama kamu adalah kenangan berharga. Terima kasih sudah jadi bagian terbaik di hidupku.
        </p>

        {/* LIVE TIME COUNTER */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Hari', val: timeTogether.days },
            { label: 'Jam', val: timeTogether.hours },
            { label: 'Menit', val: timeTogether.minutes },
            { label: 'Detik', val: timeTogether.seconds }
          ].map((t, idx) => (
            <div key={idx} className="bg-slate-900/70 border border-slate-800 hover:border-rose-500/40 rounded-3xl p-5 backdrop-blur-xl shadow-2xl transition transform hover:-translate-y-1">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-300 to-pink-500 font-mono">
                {t.val}
              </div>
              <div className="text-xs font-semibold text-slate-400 mt-2 uppercase tracking-wider">{t.label} Bersama</div>
            </div>
          ))}
        </div>
      </header>

      {/* MAIN SECTIONS */}
      <main className="max-w-4xl mx-auto px-4 space-y-20 relative z-10">

        {/* 1. REASONS WHY I LOVE YOU (RANDOM SLOT MACHINE) */}
        <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7 fill-rose-500 text-rose-500" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-2">Kenapa Aku Cinta Kamu?</h2>
          <p className="text-slate-400 text-sm mb-8">Setiap kali diputar, ada alasan manis baru yang keluar!</p>

          <div className="bg-slate-950/80 border border-rose-900/30 rounded-2xl p-6 md:p-8 min-h-[140px] flex items-center justify-center mb-8 max-w-2xl mx-auto shadow-inner relative">
            <p className={`text-rose-200 text-base md:text-xl font-medium leading-relaxed transition-all duration-200 ${isSpinning ? 'opacity-40 blur-sm scale-95' : 'opacity-100 scale-100'}`}>
              "{currentReason}"
            </p>
          </div>

          <button
            onClick={getRandomReason}
            disabled={isSpinning}
            className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition transform active:scale-95 inline-flex items-center gap-3 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Acak Alasan Cinta</span>
          </button>
        </section>

        {/* 2. OUR JOURNEY TIMELINE */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center justify-center gap-3">
              <Calendar className="w-7 h-7 text-rose-400" />
              Jejak Kenangan Kita
            </h2>
            <p className="text-slate-400 text-sm mt-1">Momen penting yang mewarnai perjalanan cinta ini.</p>
          </div>

          <div className="relative border-l-2 border-rose-900/40 ml-4 md:ml-32 space-y-8">
            {timeline.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="relative pl-8 md:pl-10 group">
                  <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 group-hover:border-rose-500/30 rounded-2xl p-5 md:p-6 backdrop-blur-xl transition">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">{item.date}</span>
                    <h3 className="text-lg font-bold text-slate-100 mt-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. REDEEMABLE LOVE COUPONS */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 flex items-center justify-center gap-3">
              <Gift className="w-7 h-7 text-pink-400" />
              Kupon Spesial Untukmu
            </h2>
            <p className="text-slate-400 text-sm mt-1">Tekan tombol tukar kapan pun kamu mau menggunakan hak privilimu!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {coupons.map((c) => (
              <div
                key={c.id}
                className={`border rounded-3xl p-6 transition-all relative overflow-hidden flex flex-col justify-between ${
                  c.claimed
                    ? 'bg-slate-900/30 border-slate-800 opacity-60'
                    : 'bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/40 border-rose-800/40 hover:border-rose-500/50 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800/50">
                      {c.category}
                    </span>
                    {c.claimed && (
                      <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full font-semibold">
                        Terpakai ✓
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-rose-200">{c.title}</h3>
                  <p className="text-slate-400 text-sm mt-2 mb-6 leading-relaxed">{c.desc}</p>
                </div>

                <button
                  disabled={c.claimed}
                  onClick={() => handleClaimCoupon(c.id)}
                  className={`w-full py-3 rounded-2xl font-bold text-sm transition shadow-lg ${
                    c.claimed
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-500 text-white active:scale-98'
                  }`}
                >
                  {c.claimed ? 'Kupon Sudah Ditukarkan' : 'Tukarkan Kupon Sekarang'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COUPLE BUCKET LIST WITH PROGRESS BAR */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-100 flex items-center gap-3">
                <Trophy className="w-7 h-7 text-amber-400" />
                Our Couple Bucket List
              </h2>
              <p className="text-slate-400 text-sm mt-1">Impian-impian kecil yang ingin kita selesaikan berdua.</p>
            </div>
            
            <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-right">
              <div className="text-xs text-slate-400">Progress Tercapai</div>
              <div className="text-lg font-bold text-amber-400 font-mono">{bucketProgress}% ({completedBucketCount}/{bucketList.length})</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 rounded-full h-3 mb-8 p-0.5 border border-slate-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-rose-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${bucketProgress}%` }}
            ></div>
          </div>

          <div className="space-y-3">
            {bucketList.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleBucket(item.id)}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-6 h-6 rounded-xl border flex items-center justify-center transition ${
                    item.done ? 'bg-rose-600 border-rose-500 text-white' : 'border-slate-700 group-hover:border-slate-500'
                  }`}>
                    {item.done && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className={`text-sm md:text-base font-medium ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {item.text}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono uppercase bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. INTERACTIVE QUIZ */}
        <section className="bg-gradient-to-b from-slate-900 to-rose-950/30 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-xl text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 mb-2">Quiz Chemistry Bucin</h2>
          <p className="text-slate-400 text-sm mb-8">Seberapa kenal kamu sama kebiasaan & fakta tentang kita?</p>

          {!quizFinished ? (
            <div className="max-w-lg mx-auto bg-slate-950/80 border border-slate-800 rounded-3xl p-6 md:p-8 text-left shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Pertanyaan {quizIndex + 1} / {quizQuestions.length}</span>
                <span className="text-xs text-slate-500">Skor: {score}</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-6 leading-snug">
                {quizQuestions[quizIndex].question}
              </h3>
              <div className="space-y-3">
                {quizQuestions[quizIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    className="w-full text-left p-4 rounded-2xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-600/50 text-sm md:text-base font-medium transition text-slate-200 flex items-center justify-between group"
                  >
                    <span>{opt}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-rose-400 group-hover:translate-x-1 transition" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-slate-950/80 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
              <Award className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-black text-slate-100 mb-2">Quiz Selesai!</h3>
              <p className="text-slate-400 text-sm mb-6">
                Skor Akhir Kamu: <span className="text-rose-400 font-bold text-xl">{score} / {quizQuestions.length}</span>
              </p>
              <p className="text-rose-200 text-sm bg-rose-950/40 border border-rose-800/40 p-4 rounded-2xl mb-6">
                {score === quizQuestions.length ? '100% Perfect Match! Kamu beneran perhatian banget sama hubungan kita ❤️' : 'Nilai yang bagus! Kamu emang paling mengerti aku 💕'}
              </p>
              <button
                onClick={() => { setQuizIndex(0); setScore(0); setQuizFinished(false); }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-3 rounded-2xl transition"
              >
                Coba Ulangi Quiz
              </button>
            </div>
          )}
        </section>

        {/* 6. SECRET LOVE LETTER VAULT (PIN LOCKED) */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-xl relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
              {isUnlocked ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100">Surat Rahasia Untukmu</h2>
            <p className="text-slate-400 text-sm mt-1">Ketik PIN rahasia (Coba PIN: <span className="text-rose-400 font-mono font-bold">1234</span> atau <span className="text-rose-400 font-mono font-bold">2707</span>) untuk membuka vault.</p>
          </div>

          {!isUnlocked ? (
            <form onSubmit={handleUnlock} className="max-w-xs mx-auto space-y-4">
              <div className="relative">
                <input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="• • • •"
                  className="w-full text-center tracking-[1em] text-2xl font-mono bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-2xl px-4 py-4 text-rose-300 focus:outline-none transition shadow-inner"
                />
              </div>
              {pinError && <p className="text-rose-400 text-xs text-center font-medium animate-shake">PIN Salah! Ketik 1234 atau 2707</p>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-3.5 rounded-2xl transition shadow-xl active:scale-98"
              >
                Buka Surat Rahasia
              </button>
            </form>
          ) : (
            <div className="bg-slate-950/90 border border-rose-900/40 rounded-3xl p-6 md:p-10 max-w-2xl mx-auto shadow-2xl text-slate-300 space-y-5 text-base md:text-lg leading-relaxed relative">
              <div className="text-xs font-mono text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full w-max border border-rose-800/40">
                CONFIDENTIAL • FOR YOUR EYES ONLY
              </div>
              <p className="font-bold text-rose-300 text-xl">Halo Sayang ❤️,</p>
              <p>
                Terima kasih ya sudah bertahan dan mau tumbuh bareng aku sejauh ini. Aku tahu hubungan kita tidak selalu sempurna, tapi setiap hari di samping kamu selalu terasa sangat berharga.
              </p>
              <p>
                Semoga web kecil ini bisa bikin kamu tersenyum saat kamu lagi capek sama aktivitas seharian, atau saat lagi kangen. Aku akan selalu ada di sini buat mendukung dan mendampingi kamu.
              </p>
              <div className="pt-6 border-t border-slate-800/80 text-right">
                <p className="font-semibold text-slate-400 text-sm">Dengan segenap rasa sayang,</p>
                <p className="font-bold text-rose-400 text-xl mt-1">— Pasangan Bucinmu 💕</p>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-28 text-center text-slate-500 text-xs tracking-wider uppercase">
        <p>Made with ❤️ for Us • Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
