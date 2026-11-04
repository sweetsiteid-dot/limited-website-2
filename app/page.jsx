'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Play, Pause, Music, Sparkles, Gift, Lock, Calendar, Trophy, Volume2 } from 'lucide-react';

export default function WebBucin() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
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

  // Mencegah error build Next.js saat pre-rendering di Vercel
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-pink-400 font-sans">
        <div className="animate-pulse flex items-center gap-2">
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-bounce" />
          <span>Memuat Web Bucin... ❤️</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* File lagu dipanggil dari folder /public/shapeofmyheart.mp3 */}
      <audio ref={audioRef} src="/shapeofmyheart.mp3" loop prefetch="auto" />

      {/* Tombol Melayang Pemutar Musik (Kanan Bawah) */}
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
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Sparkles, Calendar, Clock, Music, Play, Pause, Volume2, VolumeX,
  Gift, Check, Plus, Award, Lock, Unlock, KeyRound, Send, Smile,
  MapPin, Edit, Trash2, X, ChevronRight, RotateCcw, Flame, BookOpen,
  CheckCircle, Circle, Share2, Star, Sliders, MessageSquare, ArrowRight, CheckCircle2
} from 'lucide-react';

// --- Web Audio API Synth for Background Ambiance ---
class AmbientAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.interval = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  play() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    
    // Simple romantic synth chord progression (Cmaj7 - Am7 - Fmaj7 - G7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.isPlaying) return;
      const currentChord = chords[chordIdx];
      currentChord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        // Soft envelope
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.5);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + 4.5);
      });
      chordIdx = (chordIdx + 1) % chords.length;
    };

    playChord();
    this.interval = setInterval(playChord, 5000);
  }

  stop() {
    this.isPlaying = false;
    if (this.interval) clearInterval(this.interval);
  }
}

const audioSynth = new AmbientAudio();

// --- Main App Component ---
export default function App() {
  // --- Persistent & State Declarations ---
  const [anniversaryDate, setAnniversaryDate] = useState(() => {
    return localStorage.getItem('bucin_anniversary') || '2023-02-14T00:00:00';
  });

  const [partnerNames, setPartnerNames] = useState(() => {
    const saved = localStorage.getItem('bucin_partners');
    return saved ? JSON.parse(saved) : { partner1: 'Alex', partner2: 'Taylor', nickname: 'My Forever Love' };
  });

  const [partnerStatus, setPartnerStatus] = useState(() => {
    const saved = localStorage.getItem('bucin_status');
    return saved ? JSON.parse(saved) : {
      partner1Status: 'Thinking of you ❤️',
      partner2Status: 'Craving Boba 🧋',
      quote: 'You are my favorite notification in a world of noise.'
    };
  });

  // Active Tab State
  const [activeTab, setActiveTab] = useState('hero');

  // Music Player Simulation State
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);

  const tracks = [
    { title: "Sweet Serenade (Lofi Romance)", artist: "Bucin Records", duration: "03:45" },
    { title: "Midnight Moonlight Whispers", artist: "Acoustic Love", duration: "04:12" },
    { title: "Coffee & Cozy Blankets", artist: "Pastel Chill", duration: "02:58" },
    { title: "Our Favorite Golden Hour", artist: "Endless Sunset", duration: "03:30" }
  ];

  // Toast Notification System
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- 1. Relationship Counter Calculator ---
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  // Save Settings Helper
  useEffect(() => {
    localStorage.setItem('bucin_anniversary', anniversaryDate);
    localStorage.setItem('bucin_partners', JSON.stringify(partnerNames));
    localStorage.setItem('bucin_status', JSON.stringify(partnerStatus));
  }, [anniversaryDate, partnerNames, partnerStatus]);

  // Music toggle handler
  const toggleMusic = () => {
    if (isPlayingMusic) {
      audioSynth.stop();
      setIsPlayingMusic(false);
      showToast("🎵 Ambient music paused");
    } else {
      audioSynth.play();
      setIsPlayingMusic(true);
      showToast("🎶 Playing romantic ambient soundscape");
    }
  };

  // --- 2. Interactive Story Milestones ---
  const [milestones, setMilestones] = useState(() => {
    const saved = localStorage.getItem('bucin_milestones');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'The First Encounter', date: '2022-10-15', category: 'Meeting', description: 'Met at the cozy corner bookstore cafe. You ordered matcha, I ordered cappuccino, and our eyes met over shared poetry.', icon: '☕' },
      { id: 2, title: 'First Official Date', date: '2022-11-02', category: 'Date', description: 'Stargazing at the observatory hill followed by late-night ramen. We talked until 3 AM.', icon: '🌌' },
      { id: 3, title: 'Official Relationship Day', date: '2023-02-14', category: 'Milestone', description: 'Under the glowing street lamps after dinner, we promised to walk hand in hand through everything.', icon: '💍' },
      { id: 4, title: 'First Beach Trip', date: '2023-07-20', category: 'Travel', description: 'Watched the sunrise over the ocean waves and built a tiny sand castle.', icon: '🏖️' },
      { id: 5, title: 'Adopted Our Little Cat', date: '2024-01-10', category: 'Life', description: 'Brought home Mochi, the tiny purring ball of joy.', icon: '🐾' }
    ];
  });

  const [newMilestone, setNewMilestone] = useState({ title: '', date: '', category: 'Date', description: '', icon: '💖' });
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);

  const addMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone.title || !newMilestone.date) return;
    const item = { ...newMilestone, id: Date.now() };
    const updated = [...milestones, item].sort((a,b) => new Date(a.date) - new Date(b.date));
    setMilestones(updated);
    localStorage.setItem('bucin_milestones', JSON.stringify(updated));
    setNewMilestone({ title: '', date: '', category: 'Date', description: '', icon: '💖' });
    setShowMilestoneModal(false);
    showToast("✨ Beautiful milestone added!");
  };

  const deleteMilestone = (id) => {
    const updated = milestones.filter(m => m.id !== id);
    setMilestones(updated);
    localStorage.setItem('bucin_milestones', JSON.stringify(updated));
    showToast("Milestone removed");
  };

  // --- 3. Redeemable Love Coupons ---
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem('bucin_coupons');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Unlimited Warm Hug Pass', description: 'Valid for one 5-minute squeeze anytime, anywhere. No questions asked.', tag: 'Comfort', status: 'Available', code: 'HUG-9999' },
      { id: 2, title: 'Late Night Boba & Snack', description: 'Redeem for immediate delivery or run to your favorite boba shop.', tag: 'Food', status: 'Available', code: 'BOBA-LOVE' },
      { id: 3, title: 'Movie Choice Dictatorship', description: 'You get full 100% rights to pick the film. Zero complaints guaranteed.', tag: 'Fun', status: 'Available', code: 'CINEMA-VIP' },
      { id: 4, title: 'Instant Forgiveness Card', description: 'Use during small silly arguments to instantly reset and get a kiss.', tag: 'Peace', status: 'Available', code: 'PEACE-TREATY' },
      { id: 5, title: '20-Minute Relaxing Shoulder Massage', description: 'Complete with soothing music and lavender scented oils.', tag: 'Care', status: 'Available', code: 'SPA-DAY' },
      { id: 6, title: 'Dinner Date (My Treat!)', description: 'Pick any restaurant in town, I handle the bill and the reservations.', tag: 'Romance', status: 'Available', code: 'FOODIE-DATE' }
    ];
  });

  const [selectedCouponModal, setSelectedCouponModal] = useState(null);

  const redeemCoupon = (id) => {
    const updated = coupons.map(c => c.id === id ? { ...c, status: 'Redeemed', redeemedAt: new Date().toLocaleDateString() } : c);
    setCoupons(updated);
    localStorage.setItem('bucin_coupons', JSON.stringify(updated));
    setSelectedCouponModal(null);
    showToast("🎉 Coupon Redeemed! Enjoy your special treat!");
  };

  // --- 4. Reasons Vault (100 Reasons Why I Love You) ---
  const [reasons, setReasons] = useState(() => {
    const saved = localStorage.getItem('bucin_reasons');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "The adorable squishy face you make when you are concentrating really hard.", category: "Cute Habits" },
      { id: 2, text: "How you always remember how I take my coffee without me asking.", category: "Little Things" },
      { id: 3, text: "The way your eyes crinkle in the corners when you laugh hysterically.", category: "Cute Habits" },
      { id: 4, text: "How safe and peaceful I feel whenever I rest my head against your shoulder.", category: "Feelings" },
      { id: 5, text: "Your endless enthusiasm when talking about your favorite hobbies.", category: "Personality" },
      { id: 6, text: "How you hold my hand a little tighter whenever we cross busy streets.", category: "Little Things" },
      { id: 7, text: "Our silly inside jokes that no one else in the universe understands.", category: "Memories" },
      { id: 8, text: "The way you cheer me up whenever I have a rough day at work.", category: "Support" },
      { id: 9, text: "Your big heart and how gently you treat animals and nature.", category: "Personality" },
      { id: 10, text: "That you are not just my love, but truly my best friend.", category: "Feelings" }
    ];
  });

  const [reasonCategory, setReasonCategory] = useState('All');
  const [randomReasonModal, setRandomReasonModal] = useState(null);
  const [newReasonText, setNewReasonText] = useState('');
  const [newReasonCategory, setNewReasonCategory] = useState('Little Things');
  const [showAddReasonModal, setShowAddReasonModal] = useState(false);

  const filteredReasons = reasonCategory === 'All' ? reasons : reasons.filter(r => r.category === reasonCategory);

  const pickRandomReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setRandomReasonModal(reasons[randomIndex]);
  };

  const handleAddReason = (e) => {
    e.preventDefault();
    if (!newReasonText.trim()) return;
    const item = { id: Date.now(), text: newReasonText.trim(), category: newReasonCategory };
    const updated = [item, ...reasons];
    setReasons(updated);
    localStorage.setItem('bucin_reasons', JSON.stringify(updated));
    setNewReasonText('');
    setShowAddReasonModal(false);
    showToast("💌 Love reason added to the vault!");
  };

  // --- 5. Couple Bucket List ---
  const [bucketList, setBucketList] = useState(() => {
    const saved = localStorage.getItem('bucin_bucket');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Watch the Northern Lights together in Norway', category: 'Travel', completed: false },
      { id: 2, title: 'Take a cooking class to master homemade pasta', category: 'Food', completed: true },
      { id: 3, title: 'Go on a spontaneous 3-day road trip with no map', category: 'Adventure', completed: false },
      { id: 4, title: 'Build a cozy blanket fort and have a Harry Potter marathon', category: 'Cozy', completed: true },
      { id: 5, title: 'Plant a fruit tree together and watch it grow over years', category: 'Life', completed: false },
      { id: 6, title: 'Go hot air ballooning at sunrise in Cappadocia', category: 'Travel', completed: false },
      { id: 7, title: 'Write a song or poem together', category: 'Creative', completed: false }
    ];
  });

  const [newBucketTitle, setNewBucketTitle] = useState('');
  const [newBucketCategory, setNewBucketCategory] = useState('Travel');

  const toggleBucket = (id) => {
    const updated = bucketList.map(b => b.id === id ? { ...b, completed: !b.completed } : b);
    setBucketList(updated);
    localStorage.setItem('bucin_bucket', JSON.stringify(updated));
  };

  const addBucketItem = (e) => {
    e.preventDefault();
    if (!newBucketTitle.trim()) return;
    const item = { id: Date.now(), title: newBucketTitle.trim(), category: newBucketCategory, completed: false };
    const updated = [...bucketList, item];
    setBucketList(updated);
    localStorage.setItem('bucin_bucket', JSON.stringify(updated));
    setNewBucketTitle('');
    showToast("🎯 Bucket list adventure added!");
  };

  const completedBucketCount = bucketList.filter(b => b.completed).length;
  const bucketProgress = Math.round((completedBucketCount / (bucketList.length || 1)) * 100);

  // --- 6. Romantic Couple Quiz Engine ---
  const quizQuestions = [
    {
      id: 1,
      question: "What was our first memorable meal together?",
      options: ["Late Night Ramen", "Matcha & Cappuccino at Bookstore", "Homemade Burritos", "Street Food Tacos"],
      correct: 1
    },
    {
      id: 2,
      question: "Who is more likely to fall asleep during a movie night?",
      options: [partnerNames.partner1, partnerNames.partner2, "Both of us simultaneously", "Neither, we stay sharp"],
      correct: 0
    },
    {
      id: 3,
      question: "What is our ultimate comfort go-to activity?",
      options: ["Blanket fort + snacks", "Hiking steep mountains", "Cleaning the entire apartment", "Attending loud concerts"],
      correct: 0
    },
    {
      id: 4,
      question: "How long have we been dreaming of our dream vacation?",
      options: ["Since Day 1!", "Just last week", "A couple of months", "Only in our sleep"],
      correct: 0
    }
  ];

  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    userAnswers: {},
    isFinished: false,
    score: 0
  });

  const handleSelectAnswer = (qIdx, optionIdx) => {
    setQuizState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [qIdx]: optionIdx }
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    } else {
      // Calculate score
      let score = 0;
      quizQuestions.forEach((q, idx) => {
        if (quizState.userAnswers[idx] === q.correct) score += 1;
      });
      setQuizState(prev => ({ ...prev, isFinished: true, score }));
    }
  };

  const resetQuiz = () => {
    setQuizState({ currentQuestion: 0, userAnswers: {}, isFinished: false, score: 0 });
  };

  // --- 7. Secret Love Letter Vault & Lock ---
  const [secretPasscode, setSecretPasscode] = useState(() => localStorage.getItem('bucin_pin') || '1234');
  const [inputPin, setInputPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [lockError, setLockError] = useState('');
  
  const [secretLetter, setSecretLetter] = useState(() => {
    return localStorage.getItem('bucin_letter') || 
`My Dearest Love,

If you are reading this, it means you typed our secret code correctly. 

I just wanted to write a timeless note to remind you how deeply and unconditionally loved you are. Meeting you changed the trajectory of my entire life. Every single ordinary moment—from waking up to drinking morning coffee, sharing quiet evenings, and bursting into random laughter—is rendered extraordinary simply because I am sharing it with you.

Thank you for being my constant warmth, my safe harbor, and my absolute favorite adventure. I promise to keep holding your hand through every chapter of our lives, to cheer for your dreams, and to love you more with every single passing second.

Forever & Always Yours,
xoxo ❤️`;
  });

  const [isEditingLetter, setIsEditingLetter] = useState(false);
  const [editedLetterContent, setEditedLetterContent] = useState(secretLetter);
  
  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  useEffect(() => {
    if (isUnlocked && typewriterIndex < secretLetter.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + secretLetter.charAt(typewriterIndex));
        setTypewriterIndex(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked, typewriterIndex, secretLetter]);

  const handleKeypadPress = (digit) => {
    if (inputPin.length < 4) {
      const nextPin = inputPin + digit;
      setInputPin(nextPin);
      setLockError('');
      if (nextPin.length === 4) {
        if (nextPin === secretPasscode) {
          setIsUnlocked(true);
          setTypewriterIndex(0);
          setDisplayedText('');
          showToast("🔓 Secret Vault Unlocked!");
        } else {
          setLockError("Incorrect Passcode! Hint: Default is 1234");
          setTimeout(() => setInputPin(''), 1000);
        }
      }
    }
  };

  const handleSaveLetter = () => {
    setSecretLetter(editedLetterContent);
    localStorage.setItem('bucin_letter', editedLetterContent);
    setIsEditingLetter(false);
    setTypewriterIndex(editedLetterContent.length);
    setDisplayedText(editedLetterContent);
    showToast("💌 Love letter updated!");
  };

  // --- Settings Modal State ---
  const [showSettings, setShowSettings] = useState(false);
  const [editNames, setEditNames] = useState(partnerNames);
  const [editStatus, setEditStatus] = useState(partnerStatus);
  const [editAnniversary, setEditAnniversary] = useState(anniversaryDate.split('T')[0]);
  const [editPin, setEditPin] = useState(secretPasscode);

  const saveSettings = (e) => {
    e.preventDefault();
    setPartnerNames(editNames);
    setPartnerStatus(editStatus);
    setAnniversaryDate(`${editAnniversary}T00:00:00`);
    setSecretPasscode(editPin);
    localStorage.setItem('bucin_pin', editPin);
    setShowSettings(false);
    showToast("✨ Profile & Couple settings updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 text-slate-800 font-sans relative overflow-x-hidden pb-24">
      {/* Floating Canvas Hearts Background */}
      <HeartsCanvas />

      {/* --- Floating Toast Notification --- */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-rose-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-rose-400 backdrop-blur-md">
          <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* --- Top Navigation Bar --- */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-rose-100 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('hero')}>
            <div className="bg-gradient-to-tr from-rose-500 to-pink-500 p-2 rounded-2xl shadow-md text-white">
              <Heart className="w-6 h-6 fill-white animate-pulse" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                {partnerNames.partner1} & {partnerNames.partner2}
              </h1>
              <p className="text-xs text-rose-400 font-medium">{partnerNames.nickname}</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-rose-100/60 p-1.5 rounded-full border border-rose-200/50">
            {[
              { id: 'hero', label: 'Home', icon: Heart },
              { id: 'story', label: 'Timeline', icon: Calendar },
              { id: 'coupons', label: 'Coupons', icon: Gift },
              { id: 'vault', label: 'Love Vault', icon: BookOpen },
              { id: 'bucket', label: 'Bucket List', icon: Star },
              { id: 'quiz', label: 'Love Quiz', icon: Smile },
              { id: 'secret', label: 'Secret Box', icon: Lock }
            ].map(tab => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-300'
                      : 'text-slate-600 hover:text-rose-600 hover:bg-white/50'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-rose-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions & Settings */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className={`p-2.5 rounded-full transition-all flex items-center justify-center border ${
                isPlayingMusic
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-300 animate-spin-slow'
                  : 'bg-white/80 text-rose-500 border-rose-200 hover:bg-rose-50'
              }`}
              title="Toggle Romantic Ambient Music"
            >
              {isPlayingMusic ? <Music className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="p-2.5 bg-white/80 text-slate-600 border border-rose-200 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
              title="Customize App Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Content Dynamic Body --- */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        
        {/* ================= HERO SECTION & COUNTER ================= */}
        {activeTab === 'hero' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Couple Banner Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-400 p-8 md:p-12 text-white shadow-2xl shadow-rose-300/50">
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <Heart className="w-96 h-96 fill-white" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                {/* Left: Couple Profiles */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Avatar 1 */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white/30 backdrop-blur-md shadow-xl">
                      <div className="w-full h-full rounded-full bg-rose-200 flex items-center justify-center text-3xl font-extrabold text-rose-600 border-2 border-white shadow-inner">
                        {partnerNames.partner1.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white text-rose-500 p-1.5 rounded-full shadow">
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </div>
                    </div>
                    <h3 className="mt-2 font-bold text-lg">{partnerNames.partner1}</h3>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-rose-100 mt-1">
                      {partnerStatus.partner1Status}
                    </span>
                  </div>

                  {/* Heart Beat Pulsing Connector */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse border border-white/40">
                      <Heart className="w-6 h-6 fill-white text-white" />
                    </div>
                    <span className="text-xs text-rose-100 mt-1 font-semibold">Together</span>
                  </div>

                  {/* Avatar 2 */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white/30 backdrop-blur-md shadow-xl">
                      <div className="w-full h-full rounded-full bg-pink-200 flex items-center justify-center text-3xl font-extrabold text-pink-600 border-2 border-white shadow-inner">
                        {partnerNames.partner2.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white text-pink-500 p-1.5 rounded-full shadow">
                        <Sparkles className="w-4 h-4 text-pink-500 fill-pink-500" />
                      </div>
                    </div>
                    <h3 className="mt-2 font-bold text-lg">{partnerNames.partner2}</h3>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-rose-100 mt-1">
                      {partnerStatus.partner2Status}
                    </span>
                  </div>
                </div>

                {/* Right: Quick Romantic Quote Card */}
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 max-w-xs text-center md:text-right">
                  <span className="text-xs uppercase tracking-widest text-rose-200 font-semibold">Daily Note</span>
                  <p className="italic text-sm text-white mt-1 font-serif">"{partnerStatus.quote}"</p>
                </div>
              </div>
            </div>

            {/* LIVE RELATIONSHIP COUNTER */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-rose-100 shadow-xl shadow-rose-100/50 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-rose-500" />
                <h2 className="text-sm uppercase tracking-widest text-rose-500 font-bold">Love Timer</h2>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6">
                We have been in love for
              </h3>

              {/* Time Units Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { label: 'Days', value: timeTogether.days, color: 'from-rose-500 to-pink-500' },
                  { label: 'Hours', value: timeTogether.hours, color: 'from-pink-500 to-rose-400' },
                  { label: 'Minutes', value: timeTogether.minutes, color: 'from-rose-400 to-red-400' },
                  { label: 'Seconds', value: timeTogether.seconds, color: 'from-red-400 to-rose-500' }
                ].map((unit, idx) => (
                  <div key={idx} className="relative group overflow-hidden bg-rose-50/50 p-6 rounded-2xl border border-rose-100 shadow-inner text-center transform transition hover:-translate-y-1">
                    <div className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${unit.color} bg-clip-text text-transparent`}>
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-6">
                Anniversary Date: <span className="font-semibold text-rose-500">{new Date(anniversaryDate).toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
              </p>
            </div>

            {/* Audio Visualizer & Music Player Widget */}
            <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-900/50">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <Music className={`w-8 h-8 text-white ${isPlayingMusic ? 'animate-bounce' : ''}`} />
                  {isPlayingMusic && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  )}
                </div>
                <div>
                  <span className="text-xs text-rose-400 uppercase tracking-widest font-semibold">Now Playing</span>
                  <h4 className="font-bold text-base text-white">{tracks[currentTrackIdx].title}</h4>
                  <p className="text-xs text-slate-400">{tracks[currentTrackIdx].artist}</p>
                </div>
              </div>

              {/* Simulated Equalizer Bars */}
              <div className="flex items-end gap-1.5 h-8 px-4 py-1 bg-white/5 rounded-full border border-white/10">
                {[40, 80, 30, 90, 60, 100, 45, 75, 50, 85].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-rose-500 to-pink-400 rounded-full transition-all duration-300"
                    style={{
                      height: isPlayingMusic ? `${Math.max(15, Math.floor(Math.random() * 100))}%` : '20%'
                    }}
                  />
                ))}
              </div>

              {/* Audio Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentTrackIdx((prev) => (prev > 0 ? prev - 1 : tracks.length - 1))}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleMusic}
                  className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/40 hover:scale-105 transition-all"
                >
                  {isPlayingMusic ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <button
                  onClick={() => setCurrentTrackIdx((prev) => (prev < tracks.length - 1 ? prev + 1 : 0))}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Access Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div
                onClick={() => setActiveTab('coupons')}
                className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-3xl shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all flex justify-between items-center group"
              >
                <div>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">Available Rewards</span>
                  <h3 className="text-xl font-bold mt-2">Redeem Love Coupons</h3>
                  <p className="text-xs text-rose-100 mt-1">{coupons.filter(c => c.status === 'Available').length} coupons waiting to be claimed</p>
                </div>
                <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('vault')}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-rose-100 shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all flex justify-between items-center group"
              >
                <div>
                  <span className="text-xs bg-rose-100 text-rose-600 px-3 py-1 rounded-full font-semibold">Love Vault</span>
                  <h3 className="text-xl font-bold text-slate-800 mt-2">100+ Reasons Why</h3>
                  <p className="text-xs text-slate-500 mt-1">Read sweet love notes & habits</p>
                </div>
                <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('bucket')}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-rose-100 shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all flex justify-between items-center group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-semibold">Bucket Progress</span>
                    <span className="text-xs font-bold text-rose-500">{bucketProgress}%</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mt-2">Our Adventures</h3>
                  <p className="text-xs text-slate-500 mt-1">{completedBucketCount} of {bucketList.length} dreams completed</p>
                </div>
                <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 fill-pink-500" />
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= 2. LOVE STORY TIMELINE ================= */}
        {activeTab === 'story' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-sm">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-rose-500" />
                  Our Romantic Journey
                </h2>
                <p className="text-xs text-slate-500 mt-1">Chronological milestones of our favorite memories together</p>
              </div>
              <button
                onClick={() => setShowMilestoneModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-rose-300 hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Milestone
              </button>
            </div>

            {/* Timeline Vertical Stack */}
            <div className="relative border-l-2 border-rose-200 ml-4 sm:ml-32 my-8 space-y-8">
              {milestones.map((item, idx) => (
                <div key={item.id} className="relative pl-6 sm:pl-8 group">
                  {/* Timeline Icon Marker */}
                  <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-white border-2 border-rose-400 flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>

                  {/* Left Date Label (Desktop view) */}
                  <div className="hidden sm:block absolute -left-32 top-2 text-right w-24">
                    <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Milestone Card Content */}
                  <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-rose-100 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1 sm:hidden">
                          <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            {item.date}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-pink-500 uppercase tracking-widest">{item.category}</span>
                        <h3 className="text-lg font-bold text-slate-800 mt-0.5">{item.title}</h3>
                      </div>
                      <button
                        onClick={() => deleteMilestone(item.id)}
                        className="text-slate-300 hover:text-red-500 p-1.5 transition-colors"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Milestone Modal */}
            {showMilestoneModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-100 animate-scaleUp">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-rose-500" /> New Romantic Milestone
                    </h3>
                    <button onClick={() => setShowMilestoneModal(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={addMilestone} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600">Milestone Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. First Concert Together"
                        value={newMilestone.title}
                        onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                        className="w-full mt-1 p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-600">Date</label>
                        <input
                          type="date"
                          required
                          value={newMilestone.date}
                          onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                          className="w-full mt-1 p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600">Emoji Icon</label>
                        <input
                          type="text"
                          value={newMilestone.icon}
                          onChange={(e) => setNewMilestone({ ...newMilestone, icon: e.target.value })}
                          className="w-full mt-1 p-3 border border-rose-200 rounded-2xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-rose-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">Category</label>
                      <select
                        value={newMilestone.category}
                        onChange={(e) => setNewMilestone({ ...newMilestone, category: e.target.value })}
                        className="w-full mt-1 p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                      >
                        <option value="Date">Date Night</option>
                        <option value="Milestone">Milestone</option>
                        <option value="Travel">Trip / Travel</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Life">Life Event</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">Memory Details</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Write a sweet memory description..."
                        value={newMilestone.description}
                        onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                        className="w-full mt-1 p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold text-sm shadow-md shadow-rose-300 hover:scale-105 transition-all"
                    >
                      Save Memory
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= 3. REDEEMABLE LOVE COUPONS ================= */}
        {activeTab === 'coupons' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-sm text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 bg-rose-100 text-rose-500 rounded-2xl mb-2">
                <Gift className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">Redeemable Love Coupons</h2>
              <p className="text-xs text-slate-500 mt-1">
                Click on any coupon to claim your reward. Once redeemed, it marks as used!
              </p>
            </div>

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coupons.map((coupon) => {
                const isAvailable = coupon.status === 'Available';
                return (
                  <div
                    key={coupon.id}
                    className={`relative rounded-3xl p-6 border transition-all overflow-hidden flex flex-col justify-between ${
                      isAvailable
                        ? 'bg-gradient-to-br from-white to-rose-50/50 border-rose-200 shadow-xl shadow-rose-100/50 hover:-translate-y-1'
                        : 'bg-slate-100 border-slate-200 opacity-70 grayscale'
                    }`}
                  >
                    {/* Voucher Ticket Cutout Ornaments */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50 border-r border-rose-200" />
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50 border-l border-rose-200" />

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-rose-100 text-rose-600">
                          {coupon.tag}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {coupon.code}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-slate-800 leading-snug mb-2">
                        {coupon.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {coupon.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-rose-200 flex items-center justify-between">
                      {isAvailable ? (
                        <button
                          onClick={() => setSelectedCouponModal(coupon)}
                          className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs rounded-2xl shadow-md shadow-rose-300 transition-all flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Claim Reward
                        </button>
                      ) : (
                        <div className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 py-2 bg-slate-200/60 rounded-2xl">
                          <CheckCircle2 className="w-4 h-4 text-slate-400" /> Redeemed on {coupon.redeemedAt}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Claim Coupon Modal */}
            {selectedCouponModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-rose-100 animate-scaleUp">
                  <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Gift className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800">Redeem Coupon?</h3>
                  <p className="text-xs text-slate-500 mt-2">
                    Are you sure you want to claim <span className="font-bold text-rose-600">"{selectedCouponModal.title}"</span> right now?
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setSelectedCouponModal(null)}
                      className="w-1/2 py-2.5 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => redeemCoupon(selectedCouponModal.id)}
                      className="w-1/2 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl text-xs font-bold shadow-md shadow-rose-300 hover:scale-105 transition-all"
                    >
                      Yes, Claim! 🎉
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= 4. REASONS WHY I LOVE YOU VAULT ================= */}
        {activeTab === 'vault' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-sm">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-rose-500" />
                  Reasons Why I Love You
                </h2>
                <p className="text-xs text-slate-500 mt-1">A curated vault of subtle details, memories, and habits I adore about you</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={pickRandomReason}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2.5 rounded-full font-bold text-xs shadow-md shadow-pink-300 hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4 fill-white" /> Surprise Me!
                </button>
                <button
                  onClick={() => setShowAddReasonModal(true)}
                  className="flex items-center gap-1.5 bg-rose-100 text-rose-600 px-4 py-2.5 rounded-full font-bold text-xs hover:bg-rose-200 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Note
                </button>
              </div>
            </div>

            {/* Category Pill Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Little Things', 'Cute Habits', 'Feelings', 'Personality', 'Support', 'Memories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setReasonCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    reasonCategory === cat
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-300'
                      : 'bg-white/80 text-slate-600 border border-rose-100 hover:bg-rose-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Reasons Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredReasons.map((reason, idx) => (
                <div
                  key={reason.id}
                  className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-lg shadow-rose-100/40 flex flex-col justify-between hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-100 to-transparent rounded-bl-3xl opacity-50 pointer-events-none" />
                  
                  <div>
                    <span className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      #{idx + 1} • {reason.category}
                    </span>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed mt-4 italic">
                      "{reason.text}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-rose-300">
                    <Heart className="w-4 h-4 fill-rose-300 group-hover:scale-125 group-hover:fill-rose-500 transition-all" />
                    <span className="text-[10px] font-bold text-slate-400">Always & Forever</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Random Reason Slot Modal */}
            {randomReasonModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-white via-rose-50 to-pink-50 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-rose-200 animate-scaleUp relative">
                  <button
                    onClick={() => setRandomReasonModal(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-400/50">
                    <Sparkles className="w-8 h-8 fill-white" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                    Random Love Note
                  </span>

                  <p className="text-base text-slate-800 font-bold italic my-6 leading-relaxed">
                    "{randomReasonModal.text}"
                  </p>

                  <button
                    onClick={pickRandomReason}
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold text-xs shadow-md shadow-rose-300 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Pick Another Reason
                  </button>
                </div>
              </div>
            )}

            {/* Add Reason Modal */}
            {showAddReasonModal && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-100 animate-scaleUp">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Write Love Note
                    </h3>
                    <button onClick={() => setShowAddReasonModal(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAddReason} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600">Category</label>
                      <select
                        value={newReasonCategory}
                        onChange={(e) => setNewReasonCategory(e.target.value)}
                        className="w-full mt-1 p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
                      >
                        <option value="Little Things">Little Things</option>
                        <option value="Cute Habits">Cute Habits</option>
                        <option value="Feelings">Feelings</option>
                        <option value="Personality">Personality</option>
                        <option value="Support">Support</option>
                        <option value="Memories">Memories</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600">Reason / Detail</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="I love the way you..."
                        value={newReasonText}
                        onChange={(e) => setNewReasonText(e.target.value)}
                        className="w-full mt-1 p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold text-sm shadow-md shadow-rose-300 hover:scale-105 transition-all"
                    >
                      Add Note
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= 5. COUPLE BUCKET LIST ================= */}
        {activeTab === 'bucket' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header & Progress Bar */}
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                    <Star className="w-6 h-6 text-pink-500 fill-pink-500" />
                    Our Couple Bucket List
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Life goals, travel dreams, and cozy activities to accomplish together</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-rose-600">{completedBucketCount} / {bucketList.length}</span>
                  <span className="text-xs font-bold text-slate-400 block">Dreams Fulfilled</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-rose-100 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${bucketProgress}%` }}
                />
              </div>
            </div>

            {/* Add Bucket Form */}
            <form onSubmit={addBucketItem} className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-rose-100 shadow-sm flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                placeholder="Add a new bucket goal (e.g. Learn how to tango together)..."
                value={newBucketTitle}
                onChange={(e) => setNewBucketTitle(e.target.value)}
                className="flex-1 p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <select
                value={newBucketCategory}
                onChange={(e) => setNewBucketCategory(e.target.value)}
                className="p-3 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
              >
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Adventure">Adventure</option>
                <option value="Cozy">Cozy</option>
                <option value="Life">Life</option>
                <option value="Creative">Creative</option>
              </select>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm rounded-2xl shadow-md shadow-rose-300 hover:scale-105 transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Goal
              </button>
            </form>

            {/* Bucket List Items */}
            <div className="space-y-3">
              {bucketList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleBucket(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    item.completed
                      ? 'bg-rose-50/60 border-rose-200 text-slate-400 line-through'
                      : 'bg-white/90 border-rose-100 text-slate-800 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${item.completed ? 'text-rose-500' : 'text-slate-300'}`}>
                      {item.completed ? <CheckCircle className="w-6 h-6 fill-rose-500 text-white" /> : <Circle className="w-6 h-6" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <h4 className="font-semibold text-sm mt-1">{item.title}</h4>
                    </div>
                  </div>

                  {item.completed && (
                    <span className="text-xs font-bold text-rose-500 bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-rose-500" /> Done!
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= 6. ROMANTIC COUPLE QUIZ ================= */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
            
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-rose-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Smile className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">How Well Do You Know Us?</h2>
              <p className="text-xs text-slate-500 mt-1">Take this romantic relationship quiz together!</p>
            </div>

            {!quizState.isFinished ? (
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-rose-100 shadow-xl space-y-6">
                
                {/* Progress Header */}
                <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>Question {quizState.currentQuestion + 1} of {quizQuestions.length}</span>
                  <span className="text-rose-500">Love Quiz</span>
                </div>

                {/* Question Text */}
                <h3 className="text-xl font-extrabold text-slate-800 leading-snug">
                  {quizQuestions[quizState.currentQuestion].question}
                </h3>

                {/* Options List */}
                <div className="space-y-3">
                  {quizQuestions[quizState.currentQuestion].options.map((opt, optIdx) => {
                    const isSelected = quizState.userAnswers[quizState.currentQuestion] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(quizState.currentQuestion, optIdx)}
                        className={`w-full p-4 rounded-2xl text-left font-semibold text-sm transition-all border flex items-center justify-between ${
                          isSelected
                            ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-300'
                            : 'bg-rose-50/50 text-slate-700 border-rose-100 hover:bg-rose-100/50'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Heart className="w-4 h-4 fill-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Action Button */}
                <button
                  onClick={handleNextQuestion}
                  disabled={quizState.userAnswers[quizState.currentQuestion] === undefined}
                  className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-lg shadow-rose-300 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  {quizState.currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz 🎉' : 'Next Question'} <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            ) : (
              /* Quiz Score Result Badge Card */
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-rose-100 shadow-2xl text-center space-y-6 animate-scaleUp">
                <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-rose-400/50">
                  <Award className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-800">Quiz Completed!</h3>
                  <p className="text-xs text-slate-500 mt-1">Here is your couple compatibility score</p>
                </div>

                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200">
                  <div className="text-5xl font-black text-rose-600">
                    {Math.round((quizState.score / quizQuestions.length) * 100)}%
                  </div>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest mt-2 block">
                    {quizState.score === quizQuestions.length ? '💖 Perfect Soulmates!' : '💞 Deeply Connected!'}
                  </span>
                </div>

                <p className="text-sm text-slate-600 italic">
                  "No matter the score, every single second spent with you is a 100% win."
                </p>

                <button
                  onClick={resetQuiz}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold text-sm shadow-md shadow-rose-300 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Quiz
                </button>
              </div>
            )}

          </div>
        )}

        {/* ================= 7. SECRET LOVE LETTER LOCK BOX ================= */}
        {activeTab === 'secret' && (
          <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
            
            {!isUnlocked ? (
              /* Lock Screen Keypad */
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-rose-100 shadow-2xl text-center space-y-6">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Lock className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Secret Love Lockbox</h2>
                  <p className="text-xs text-slate-500 mt-1">Enter 4-digit passcode to unlock the private letter</p>
                </div>

                {/* PIN Display Dots */}
                <div className="flex justify-center gap-4 my-6">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        inputPin.length > idx
                          ? 'bg-rose-500 border-rose-500 scale-125'
                          : 'border-rose-300 bg-white'
                      }`}
                    />
                  ))}
                </div>

                {lockError && <p className="text-xs font-bold text-red-500">{lockError}</p>}

                {/* Numpad Keypad */}
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Clear', 0, 'Delete'].map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (btn === 'Clear') setInputPin('');
                        else if (btn === 'Delete') setInputPin(prev => prev.slice(0, -1));
                        else handleKeypadPress(String(btn));
                      }}
                      className="py-3.5 bg-rose-50/60 hover:bg-rose-100 text-slate-700 font-bold text-lg rounded-2xl border border-rose-100 transition-all active:scale-95"
                    >
                      {btn}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400">Default PIN is <span className="font-bold text-rose-500">1234</span> (Can be changed in settings)</p>
              </div>
            ) : (
              /* Unlocked Typewriter Love Letter */
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-rose-200 shadow-2xl space-y-6 relative animate-scaleUp">
                <div className="flex justify-between items-center border-b border-rose-100 pb-4">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                    <Unlock className="w-5 h-5 text-green-500" /> Secret Letter Unlocked
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingLetter(!isEditingLetter)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Edit Letter"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsUnlocked(false)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Lock Vault"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {!isEditingLetter ? (
                  <div className="prose font-serif text-slate-700 leading-relaxed text-base whitespace-pre-line bg-rose-50/40 p-6 rounded-2xl border border-rose-100 min-h-[250px]">
                    {displayedText}
                    {typewriterIndex < secretLetter.length && (
                      <span className="inline-block w-2 h-4 bg-rose-500 ml-1 animate-pulse" />
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      rows={10}
                      value={editedLetterContent}
                      onChange={(e) => setEditedLetterContent(e.target.value)}
                      className="w-full p-4 border border-rose-200 rounded-2xl font-serif text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                    <button
                      onClick={handleSaveLetter}
                      className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm rounded-2xl shadow-md shadow-rose-300 hover:scale-105 transition-all"
                    >
                      Save Secret Letter
                    </button>
                  </div>
                )}

                <div className="text-center pt-2">
                  <span className="text-xs text-rose-400 font-bold italic">"Written with pure devotion."</span>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* ================= GLOBAL PROFILE & APP SETTINGS MODAL ================= */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-100 animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-rose-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-rose-500" /> Couple Profile Settings
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveSettings} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600">Partner 1 Name</label>
                  <input
                    type="text"
                    required
                    value={editNames.partner1}
                    onChange={(e) => setEditNames({ ...editNames, partner1: e.target.value })}
                    className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600">Partner 2 Name</label>
                  <input
                    type="text"
                    required
                    value={editNames.partner2}
                    onChange={(e) => setEditNames({ ...editNames, partner2: e.target.value })}
                    className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Couple Nickname</label>
                <input
                  type="text"
                  value={editNames.nickname}
                  onChange={(e) => setEditNames({ ...editNames, nickname: e.target.value })}
                  className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Anniversary Start Date</label>
                <input
                  type="date"
                  required
                  value={editAnniversary}
                  onChange={(e) => setEditAnniversary(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">{editNames.partner1}'s Current Mood</label>
                <input
                  type="text"
                  value={editStatus.partner1Status}
                  onChange={(e) => setEditStatus({ ...editStatus, partner1Status: e.target.value })}
                  className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">{editNames.partner2}'s Current Mood</label>
                <input
                  type="text"
                  value={editStatus.partner2Status}
                  onChange={(e) => setEditStatus({ ...editStatus, partner2Status: e.target.value })}
                  className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Daily Love Motto / Quote</label>
                <input
                  type="text"
                  value={editStatus.quote}
                  onChange={(e) => setEditStatus({ ...editStatus, quote: e.target.value })}
                  className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600">Secret Lockbox 4-Digit PIN</label>
                <input
                  type="text"
                  maxLength={4}
                  value={editPin}
                  onChange={(e) => setEditPin(e.target.value)}
                  className="w-full mt-1 p-2.5 border border-rose-200 rounded-xl text-sm text-center font-mono font-bold focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold text-sm shadow-md shadow-rose-300 hover:scale-105 transition-all mt-4"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Mobile Bottom Floating Navigation Bar --- */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/90 backdrop-blur-xl border border-rose-200 rounded-full p-2 shadow-2xl flex items-center justify-around">
        {[
          { id: 'hero', icon: Heart, label: 'Home' },
          { id: 'story', icon: Calendar, label: 'Story' },
          { id: 'coupons', icon: Gift, label: 'Perks' },
          { id: 'vault', icon: BookOpen, label: 'Notes' },
          { id: 'bucket', icon: Star, label: 'Bucket' },
          { id: 'quiz', icon: Smile, label: 'Quiz' },
          { id: 'secret', icon: Lock, label: 'Secret' }
        ].map(item => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2.5 rounded-full transition-all flex flex-col items-center justify-center ${
                isActive ? 'bg-rose-500 text-white shadow-md shadow-rose-300' : 'text-slate-400 hover:text-rose-500'
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </div>

    </div>
  );
}

// --- Floating Hearts HTML5 Canvas Animation ---
function HeartsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Heart system
    const hearts = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
      opacity: Math.random() * 0.4 + 0.1,
      color: `rgba(244, 63, 94, ${Math.random() * 0.4 + 0.15})`
    }));

    const drawHeart = (ctx, x, y, size, color) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = color;
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
      ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((h) => {
        h.y -= h.speedY;
        h.x += Math.sin(h.y * 0.02) * 0.5;

        if (h.y < -20) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }

        drawHeart(ctx, h.x, h.y, h.size, h.color);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
