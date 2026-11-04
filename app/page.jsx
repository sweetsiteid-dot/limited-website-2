'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Play, Pause, Music, Sparkles, Gift, Lock, Calendar, 
  Trophy, Volume2, RefreshCw, CheckCircle2, Award, Smile, Send, Unlock
} from 'lucide-react';

export default function WebBucin() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Status Aplikasi
  const startDate = new Date('2023-01-01T00:00:00'); // Ganti dengan tanggal jadian kamu (YYYY-MM-DD)
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [randomReason, setRandomReason] = useState('Klik tombol di bawah untuk melihat alasan!');

  // Kupon Cinta
  const [coupons, setCoupons] = useState([
    { id: 1, title: 'Bebas Pilih Tempat Makan', desc: 'Bebas pilih mau makan di mana tanpa jawaban "terserah".', claimed: false },
    { id: 2, title: 'Pelukan Hangat 5 Menit', desc: 'Redeem kapan saja saat butuh penenang.', claimed: false },
    { id: 3, title: 'Diturutin Kemauannya 1 Hari', desc: 'Berlaku 24 jam penuh tanpa bantahan!', claimed: false },
    { id: 4, title: 'Puk-puk & Es Krim Gratis', desc: 'Kupon darurat saat lagi badmood.', claimed: false }
  ]);

  // Bucket List
  const [bucketList, setBucketList] = useState([
    { id: 1, text: 'Nonton Konser Musik Favorit Bareng', done: true },
    { id: 2, text: 'Thrifting / Belanja Baju Bareng', done: true },
    { id: 3, text: 'Liburan Pantai / Sunmori Bareng', done: false },
    { id: 4, text: 'Masak Makanan Favorit di Rumah', done: false },
    { id: 5, text: 'Foto Box Lucu Pakai Kostum', done: false }
  ]);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const reasons = [
    'Kamu selalu tahu cara bikin aku tersenyum walaupun hari lagi berat.',
    'Cara kamu memperhatikan hal-hal kecil tentang aku.',
    'Suara tawa kamu adalah musik favoritku.',
    'Kamu selalu mendukung semua impian dan cita-citaku.',
    'Semua momen sederhana jadi berkesan kalau sama kamu.',
    'Kamu tempat pulang terbaik setelah seharian lelah.'
  ];

  const quizQuestions = [
    {
      question: "Apa hal pertama yang paling aku suka dari kamu?",
      options: ["Senyuman kamu", "Cara bicara kamu", "Mata kamu", "Semuanya tanpa terkecuali"],
      answer: 3
    },
    {
      question: "Kalau lagi kangen, biasanya aku bakal...",
      options: ["Cari alasan buat telfonan", "Ngirim meme lucu", "Cemberut sendiri", "Langsung nyamperin"],
      answer: 0
    },
    {
      question: "Apa kegiatan favorit kita kalau lagi bareng?",
      options: ["Kulineran", "Jalan-jalan tanpa tujuan", "Nonton film", "Ngobrol berjam-jam"],
      answer: 3
    }
  ];

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
        audioRef.current.play().catch((err) => console.log("Autoplay diblokir browser:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClaimCoupon = (id) => {
    setCoupons(coupons.map(c => c.id === id ? { ...c, claimed: true } : c));
  };

  const toggleBucket = (id) => {
    setBucketList(bucketList.map(b => b.id === id ? { ...b, done: !b.done } : b));
  };

  const getRandomReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setRandomReason(reasons[randomIndex]);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '2707') { // Password PIN Vault (Bisa diganti)
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleAnswer = (index) => {
    if (index === quizQuestions[quizIndex].answer) {
      setScore(score + 1);
    }
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Mencegah error build Next.js saat pre-rendering di Vercel
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-pink-400 font-sans">
        <div className="animate-pulse flex items-center gap-2">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-bounce" />
          <span className="font-semibold text-lg">Memuat Web Bucin... ❤️</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden pb-24">
      {/* Element Pemutar Audio */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Floating Music Controller */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 bg-rose-600/90 hover:bg-rose-500 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 border border-rose-400/30 backdrop-blur-md"
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <Pause className="w-4 h-4 text-white" />
            <span className="text-sm font-medium">Pause: Shape of My Heart</span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-pink-300 animate-bounce" />
            <span className="text-sm font-medium">Play: Shape of My Heart</span>
          </>
        )}
      </button>

      {/* Header / Hero Section */}
      <header className="relative pt-20 pb-12 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-sm mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Our Little Universe</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-red-400 mb-4 tracking-tight">
          Cerita Tentang Kita ❤️
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          Satu tempat spesial untuk menyimpan semua kenangan, impian, dan alasan kenapa aku bersyukur ada kamu.
        </p>

        {/* Counter Jadian */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { label: 'Hari', val: timeTogether.days },
            { label: 'Jam', val: timeTogether.hours },
            { label: 'Menit', val: timeTogether.minutes },
            { label: 'Detik', val: timeTogether.seconds }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shadow-xl">
              <div className="text-3xl md:text-4xl font-bold text-rose-400 font-mono">{item.val}</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{item.label} Bersama</div>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-4xl mx-auto px-4 space-y-16">

        {/* Section 1: Love Reasons Generator */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl text-center">
          <div className="inline-p-3 rounded-2xl bg-rose-500/10 text-rose-400 mb-4 inline-block">
            <Heart className="w-8 h-8 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Kenapa Aku Cinta Kamu?</h2>
          <p className="text-slate-400 text-sm mb-6">Klik tombol di bawah untuk membuka kartu alasan acak.</p>
          
          <div className="bg-slate-950/80 border border-rose-900/30 rounded-2xl p-6 min-h-[120px] flex items-center justify-center mb-6 max-w-xl mx-auto shadow-inner">
            <p className="text-rose-200 text-lg font-medium italic">"{randomReason}"</p>
          </div>

          <button
            onClick={getRandomReason}
            className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform active:scale-95 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Acak Alasan Lagi
          </button>
        </section>

        {/* Section 2: Kupon Cinta Interaktif */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-100 flex items-center justify-center gap-2">
              <Gift className="w-6 h-6 text-rose-400" />
              Kupon Spesial Untukmu
            </h2>
            <p className="text-slate-400 text-sm mt-1">Bisa ditukarkan kapan saja kamu mau!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons.map((coupon) => (
              <div 
                key={coupon.id}
                className={`border rounded-2xl p-5 transition-all ${
                  coupon.claimed 
                    ? 'bg-slate-900/40 border-slate-800 opacity-60' 
                    : 'bg-gradient-to-br from-slate-900 to-rose-950/30 border-rose-800/40 hover:border-rose-500/50 shadow-xl'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-rose-300 text-lg">{coupon.title}</h3>
                  {coupon.claimed && <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full">Kupon Terpakai</span>}
                </div>
                <p className="text-slate-400 text-sm mb-4">{coupon.desc}</p>
                <button
                  disabled={coupon.claimed}
                  onClick={() => handleClaimCoupon(coupon.id)}
                  className={`w-full py-2.5 rounded-xl font-medium text-sm transition ${
                    coupon.claimed
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                  }`}
                >
                  {coupon.claimed ? 'Sudah Ditukarkan' : 'Tukarkan Kupon Ini'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Bucket List Bersama */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Our Couple Bucket List
          </h2>
          <p className="text-slate-400 text-sm mb-6">Target dan impian kecil yang ingin kita wujudkan bersama.</p>

          <div className="space-y-3">
            {bucketList.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleBucket(item.id)}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
              >
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${
                  item.done ? 'bg-rose-600 border-rose-500 text-white' : 'border-slate-700'
                }`}>
                  {item.done && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <span className={`text-sm md:text-base ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Quiz Chemistry Mini */}
        <section className="bg-gradient-to-b from-slate-900 to-rose-950/20 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Quiz Seberapa Kenal Kamu?</h2>
          <p className="text-slate-400 text-sm mb-6">Uji pemahaman kamu tentang kita!</p>

          {!quizFinished ? (
            <div className="max-w-md mx-auto bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="text-xs text-rose-400 font-mono">Pertanyaan {quizIndex + 1} dari {quizQuestions.length}</span>
              <h3 className="text-lg font-semibold text-slate-100 mt-2 mb-6">
                {quizQuestions[quizIndex].question}
              </h3>
              <div className="space-y-2">
                {quizQuestions[quizIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-900 hover:bg-rose-900/40 border border-slate-800 hover:border-rose-700/50 text-sm transition text-slate-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-100 mb-1">Quiz Selesai!</h3>
              <p className="text-slate-400 text-sm mb-4">Skor Kamu: <span className="text-rose-400 font-bold">{score} / {quizQuestions.length}</span></p>
              <button
                onClick={() => { setQuizIndex(0); setScore(0); setQuizFinished(false); }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl transition"
              >
                Ulangi Quiz
              </button>
            </div>
          )}
        </section>

        {/* Section 5: Surat Rahasia (Vault PIN) */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="inline-p-3 rounded-2xl bg-amber-500/10 text-amber-400 mb-2 inline-block">
              {isUnlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Surat Rahasia Untukmu</h2>
            <p className="text-slate-400 text-sm mt-1">Masukkan PIN rahasia (PIN Default: 1234 atau 2707) untuk membukanya.</p>
          </div>

          {!isUnlocked ? (
            <form onSubmit={handleUnlock} className="max-w-xs mx-auto space-y-3">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan 4 angka PIN"
                className="w-full text-center tracking-widest text-xl bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-white focus:outline-none transition"
              />
              {pinError && <p className="text-rose-400 text-xs text-center">PIN salah! Coba ketik 1234</p>}
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-3 rounded-xl transition shadow-lg"
              >
                Buka Surat
              </button>
            </form>
          ) : (
            <div className="bg-slate-950/90 border border-rose-900/40 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-inner text-slate-300 space-y-4 text-sm md:text-base leading-relaxed">
              <p className="font-semibold text-rose-300 text-lg">Halo Sayang ❤️,</p>
              <p>
                Terima kasih ya sudah bertahan dan mau tumbuh bareng aku sejauh ini. Aku tahu kita bukan pasangan yang sempurna, tapi setiap hari di samping kamu selalu terasa berharga.
              </p>
              <p>
                Semoga web kecil ini bisa bikin kamu tersenyum waktu lagi kangen atau lagi capek sama aktivitas seharian. Aku bakal selalu ada di sini buat kamu.
              </p>
              <p className="text-right font-medium text-rose-400 pt-4 border-t border-slate-800">
                — Dari yang selalu menyayangimu 💕
              </p>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-slate-500 text-xs">
        <p>Made with ❤️ for Us • Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
