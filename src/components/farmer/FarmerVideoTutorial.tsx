import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  CheckCircle2, 
  Sparkles, 
  Sprout, 
  PlusCircle, 
  ScanLine, 
  IndianRupee, 
  Truck, 
  Smartphone,
  Languages,
  ArrowRight
} from 'lucide-react';

export const FarmerVideoTutorial: React.FC = () => {
  const { language, setLanguage, setActiveFarmerTab } = useApp();

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const [audioVoiceoverLang, setAudioVoiceoverLang] = useState<'ta' | 'hi' | 'en'>(
    language === 'ta' ? 'ta' : language === 'hi' ? 'hi' : 'ta'
  );

  // Chapters with multilingual titles and step guidance
  const chapters = [
    {
      id: 'step1',
      title: {
        en: '1. How to List Tomatoes & Fresh Crops',
        ta: '1. தக்காளி மற்றும் விளைபொருளை பதிவேற்றுவது எப்படி',
        hi: '1. टमाटर और ताज़ी फसल कैसे सूचीबद्ध करें'
      },
      time: '0:00 - 1:15',
      summary: {
        en: 'Enter crop name, harvest date, available quantity (e.g. 100 kg), unit price (₹35/kg), and photo. Appears in Customer Marketplace instantly.',
        ta: 'பயிர் பெயர், அறுவடை தேதி, கிடைக்கும் அளவு (100 கிலோ), விலை (ரூ. 35/கிலோ) மற்றும் புகைப்படத்தை உள்ளிடவும். உடனே சந்தையில் வெளியாகும்.',
        hi: 'फसल का नाम, कटाई की तारीख, मात्रा (100 किलो), भाव (₹35/किलो) और फोटो डालें। यह तुरंत ग्राहकों को दिखेगा।'
      },
      badge: 'Step 1',
      actionText: {
        en: 'Try Adding Product Now',
        ta: 'இப்போது பொருள் சேர்க்க',
        hi: 'अभी उत्पाद जोड़ें'
      },
      actionTab: 'products'
    },
    {
      id: 'step2',
      title: {
        en: '2. Real-Time Stock Management',
        ta: '2. நேரடி இருப்பு மேலாண்மை (Stock Control)',
        hi: '2. रीयल-टाइम स्टॉक प्रबंधन'
      },
      time: '1:15 - 2:30',
      summary: {
        en: 'When a customer buys 10 kg, stock automatically reduces from 100 kg to 90 kg. Zero risk of overselling.',
        ta: 'வாடிக்கையாளர் 10 கிலோ வாங்கினால், இருப்பு தானாகவே 100ல் இருந்து 90 கிலோவாக குறையும். பற்றாக்குறை ஆபத்து இல்லை.',
        hi: 'जब ग्राहक 10 किलो खरीदता है, तो स्टॉक 100 से घटकर 90 किलो हो जाता है। अतिरिक्त बिक्री का कोई जोखिम नहीं।'
      },
      badge: 'Step 2',
      actionText: {
        en: 'Check Available Stock',
        ta: 'இருப்பு சரிபார்க்க',
        hi: 'स्टॉक देखें'
      },
      actionTab: 'stock'
    },
    {
      id: 'step3',
      title: {
        en: '3. Receiving & Confirming Orders',
        ta: '3. வாடிக்கையாளர் ஆர்டரை உறுதி செய்தல்',
        hi: '3. ग्राहकों के ऑर्डर स्वीकार करना'
      },
      time: '2:30 - 3:45',
      summary: {
        en: 'Receive instant notifications when an order arrives. Click "Confirm Order" so the delivery boy is dispatched to your farm.',
        ta: 'ஆர்டர் வந்ததும் உடனடி அறிவிப்பு வரும். "Confirm Order" அழுத்தியதும் டெலிவரி பார்ட்னர் உங்கள் நிலத்திற்கு கிளம்புவார்.',
        hi: 'ऑर्डर आने पर तुरंत घंटी बजेगी। "Confirm Order" पर क्लिक करें ताकि डिलीवरी पार्टनर आपके खेत पर आ सके।'
      },
      badge: 'Step 3',
      actionText: {
        en: 'View Orders Queue',
        ta: 'ஆர்டர்கள் பார்க்க',
        hi: 'ऑर्डर्स देखें'
      },
      actionTab: 'orders'
    },
    {
      id: 'step4',
      title: {
        en: '4. AI Crop Leaf Disease Scanner',
        ta: '4. AI மூலம் பயிர் நோய் கண்டறிதல் & இயற்கை மருந்து',
        hi: '4. AI फसल रोग स्कैनर एवं जैविक उपचार'
      },
      time: '3:45 - 4:50',
      summary: {
        en: 'Take a picture of diseased leaves (early blight, blast, rust) to get instant organic neem remedies and CIBRC sprays.',
        ta: 'பாதிக்கப்பட்ட இலையை படம் பிடித்து அப்லோட் செய்யுங்கள். அடுத்த வினாடியே இயற்கை வேப்பெண்ணெய் மற்றும் மருந்தளவு கிடைக்கும்.',
        hi: 'रोगग्रस्त पत्ती की फोटो खींचें और तुरंत जैविक नीम स्प्रे और अनुमोदित दवा की सही खुराक जानें।'
      },
      badge: 'Step 4',
      actionText: {
        en: 'Open AI Crop Scanner',
        ta: 'AI பயிர் ஸ்கேன் திறக்க',
        hi: 'AI फसल स्कैनर खोलें'
      },
      actionTab: 'crop-scan'
    },
    {
      id: 'step5',
      title: {
        en: '5. Direct Bank Account Payouts (0% Commission)',
        ta: '5. இடைத்தரகர் இன்றி நேரடி வங்கிப் பணம் (100% உங்கள் வருமானம்)',
        hi: '5. बैंक खाते में सीधा भुगतान (0% दलाली)'
      },
      time: '4:50 - 6:00',
      summary: {
        en: 'Delivery partner delivers with customer OTP. 100% of the sale value is credited to your bank without intermediary commissions.',
        ta: 'டெலிவரி பாய் வாடிக்கையாளரிடம் OTP சரிபார்த்ததும், விற்பனைத் தொகை முழுவதும் உங்கள் வங்கிக் கணக்கில் வரவு வைக்கப்படும்.',
        hi: 'डिलीवरी पार्टनर OTP से डिलीवरी पूरी करेगा और पूरी राशि सीधे आपके बैंक खाते में जमा हो जाएगी।'
      },
      badge: 'Step 5',
      actionText: {
        en: 'View Bank Earnings',
        ta: 'வங்கி வருவாய் பார்க்க',
        hi: 'बैंक कमाई देखें'
      },
      actionTab: 'earnings'
    }
  ];

  // Simulated playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentChapter = chapters[activeChapterIndex];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>விவசாயிகளுக்கான இலவச பயிற்சி வீடியோ / किसान प्रशिक्षण वीडियो</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            {language === 'ta' ? 'விவசாயிகளுக்கான நேரடி விற்பனை செயல்முறை வீடியோ' : language === 'hi' ? 'किसानों के लिए प्रत्यक्ष बाज़ार डेमो वीडियो' : 'Farmer Direct Marketplace Video Guide'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {language === 'ta' 
              ? 'விளைபொருளை பதிவேற்றுவது முதல் உங்கள் வங்கிக் கணக்கில் பணம் பெறுவது வரை முழுமையான செயல்முறை விளக்கம்.'
              : language === 'hi'
              ? 'फसल सूचीबद्ध करने से लेकर बैंक खाते में सीधा भुगतान प्राप्त करने तक संपूर्ण मार्गदर्शिका।'
              : 'Complete walkthrough on listing crops, managing stock, confirming orders, and receiving direct bank payouts.'}
          </p>
        </div>

        {/* Audio Commentary Language Selector */}
        <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-2xl border border-stone-200">
          <Languages className="w-4 h-4 text-emerald-700 ml-1" />
          <span className="text-xs font-semibold text-stone-600">ஆடியோ உரை:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setAudioVoiceoverLang('ta'); setLanguage('ta'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                audioVoiceoverLang === 'ta' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => { setAudioVoiceoverLang('hi'); setLanguage('hi'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                audioVoiceoverLang === 'hi' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => { setAudioVoiceoverLang('en'); setLanguage('en'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                audioVoiceoverLang === 'en' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Player Screen */}
      <div className="bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 text-white">
        {/* Video Viewport / Animated Simulation Canvas */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full bg-gradient-to-br from-stone-950 via-emerald-950 to-stone-900 overflow-hidden flex flex-col justify-between p-4 sm:p-8">
          {/* Farm Ambient Visual Backdrop */}
          <div 
            className="absolute inset-0 opacity-30 bg-cover bg-center pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80)'
            }}
          />

          {/* Top Video Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow">
                HD 1080p · LIVE AGRI TUTORIAL
              </span>
              <span className="hidden sm:inline-block text-xs font-medium text-emerald-300 bg-stone-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
                {currentChapter.time}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                🎙 {audioVoiceoverLang === 'ta' ? 'தமிழ் குரல்வழிகாட்டி (Tamil Audio)' : audioVoiceoverLang === 'hi' ? 'हिन्दी आवाज (Hindi Audio)' : 'English Commentary'}
              </span>
            </div>
          </div>

          {/* Center Visual Mockup & Demonstration Animation */}
          <div className="relative z-10 my-auto text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>{currentChapter.badge}: {currentChapter.title[audioVoiceoverLang]}</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display leading-tight drop-shadow-md">
              {currentChapter.title[audioVoiceoverLang]}
            </h3>

            <p className="text-xs sm:text-sm text-stone-200 max-w-lg mx-auto bg-stone-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 leading-relaxed shadow-lg">
              {currentChapter.summary[audioVoiceoverLang]}
            </p>

            {/* Simulated Live Action Demo Graphic */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveFarmerTab(currentChapter.actionTab)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>{currentChapter.actionText[audioVoiceoverLang]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="relative z-10 space-y-2 pt-4 bg-gradient-to-t from-stone-950/90 to-transparent">
            {/* Scrubber Bar */}
            <div className="w-full bg-stone-800/80 rounded-full h-2 cursor-pointer overflow-hidden backdrop-blur-xs">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300 relative"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-300 pt-1">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={() => setProgress(0)}
                  className="hover:text-white transition-colors"
                  title="Replay Chapter"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-stone-400">
                  {currentChapter.time}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline">
                  {activeChapterIndex + 1} / {chapters.length} அத்தியாயம்
                </span>
                <button className="hover:text-white p-1" title="Fullscreen">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Chapters Accordion / Playlist */}
        <div className="p-4 sm:p-6 bg-stone-900 border-t border-stone-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
            {language === 'ta' ? 'வீடியோ அத்தியாயங்கள் & நேரடி செயல்முறை' : language === 'hi' ? 'वीडियो अध्याय एवं चरण' : 'Tutorial Video Chapters (Click to Play)'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {chapters.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setActiveChapterIndex(idx);
                    setProgress(idx * 20 + 5);
                    setIsPlaying(true);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2 ${
                    isActive
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
                      : 'bg-stone-950/60 border-stone-800 hover:border-stone-700 text-stone-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {ch.badge}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">{ch.time}</span>
                  </div>

                  <p className="text-xs font-bold line-clamp-2 text-stone-200">
                    {ch.title[audioVoiceoverLang]}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pt-1">
                    <Play className="w-3 h-3" />
                    <span>{isActive ? 'தற்போது இயங்குகிறது (Playing)' : 'இயக்க கிளிக் செய்க'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Helpful Farmer Support Tips */}
      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-emerald-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-stone-900">
              {language === 'ta' ? 'விவசாயிகளுக்கு 24/7 இலவச உதவி மையம்' : language === 'hi' ? 'किसानों के लिए 24/7 नि:शुल्क हेल्पलाइन' : '24/7 Farmer Direct Support Helpline'}
            </h4>
            <p className="text-stone-600 text-xs">
              {language === 'ta' 
                ? 'பொருட்களை பதிவேற்ற அல்லது வங்கிக் கணக்கு இணைக்க ஏதேனும் சந்தேகம் இருந்தால் இலவசமாக அழைக்கவும்: 1800-425-1555' 
                : language === 'hi' 
                ? 'फसल लिस्टिंग अथवा बैंक खाते में कोई समस्या हो तो तुरंत टोल-फ्री डायल करें: 1800-425-1555' 
                : 'Need assistance listing your harvest or receiving payment? Call toll-free: 1800-425-1555'}
            </p>
          </div>
        </div>

        <a
          href="tel:18004251555"
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs whitespace-nowrap shadow-xs text-center"
        >
          {language === 'ta' ? 'உதவி மையத்தை அழைக்க' : language === 'hi' ? 'हेल्पलाइन कॉल करें' : 'Call Toll-Free'}
        </a>
      </div>
    </div>
  );
};
