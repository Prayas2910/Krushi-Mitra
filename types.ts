
export interface CropScan {
  id: string;
  timestamp: number;
  cropType: string;
  disease: string;
  confidence: number;
  imageUrl: string;
  location?: { lat: number; lng: number };
  analysis: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  description: string;
}

export enum Language {
  HINDI = 'hi',
  MARATHI = 'mr',
  TELUGU = 'te',
  TAMIL = 'ta',
  KANNADA = 'kn',
  ENGLISH = 'en'
}

export enum Page {
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  HISTORY = 'HISTORY',
  FORUM = 'FORUM',
  MANDI = 'MANDI'
}

export const CROPS = [
  "Soybean", "Chana", "Kapas", "Tomato", "Papaya", "Banana", "Grapes", "Potato"
];

export const translations = {
  [Language.ENGLISH]: {
    appName: "Farmers Friend",
    welcome: "Welcome, Farmer!",
    newScan: "Scan Crop",
    mandi: "Mandi Rates",
    history: "My Scans",
    chat: "Agro Chat",
    home: "Home",
    selectLang: "Select Language",
    startNow: "Start Now",
    checking: "Checking...",
    chooseCrop: "1. Choose Crop:",
    uploadPhoto: "2. Upload Photo:",
    clickCamera: "Open Camera to Scan",
    verdict: "Expert Verdict",
    prevention: "Avoid These Actions (What NOT to do)",
    buyMedicine: "Buy Trusted Medicine",
    getRemedies: "Get tested remedies for {crop} on AgroStar.",
    orderAgroStar: "Order on AgroStar",
    liveUpdates: "Live Updates",
    marketIntel: "Market Intelligence",
    verifiedSources: "Verified Sources",
    externalMandi: "Open Official Mandi Website",
    recentScans: "Recent Scans",
    noData: "No data found. Start scanning your fields.",
    askExpert: "Ask our Expert AI or other farmers for advice.",
    consulting: "AgroBot Expert Consulting",
    consultingSub: "Always Online • AI Specialist",
    chatPlaceholder: "Describe your farming issue..."
  },
  [Language.HINDI]: {
    appName: "किसान मित्र",
    welcome: "नमस्ते, किसान भाई!",
    newScan: "फसल जाँच",
    mandi: "मंडी भाव",
    history: "मेरी जाँच",
    chat: "सलाह लें",
    home: "मुख्य",
    selectLang: "भाषा चुनें",
    startNow: "अभी शुरू करें",
    checking: "जाँच हो रही है...",
    chooseCrop: "1. फसल चुनें:",
    uploadPhoto: "2. फोटो अपलोड करें:",
    clickCamera: "स्कैन करने के लिए कैमरा खोलें",
    verdict: "विशेषज्ञ की राय",
    prevention: "ये गलतियां न करें (सावधानियां)",
    buyMedicine: "भरोसेमंद दवा खरीदें",
    getRemedies: "एग्रोस्टार पर {crop} के लिए जाँची गई दवाएं प्राप्त करें।",
    orderAgroStar: "एग्रोस्टार पर ऑर्डर करें",
    liveUpdates: "लाइव अपडेट",
    marketIntel: "बाजार की जानकारी",
    verifiedSources: "सत्यापित स्रोत",
    externalMandi: "आधिकारिक मंडी वेबसाइट खोलें",
    recentScans: "हाल की जाँच",
    noData: "कोई डेटा नहीं मिला। अपने खेतों की जाँच शुरू करें।",
    askExpert: "सलाह के लिए हमारे विशेषज्ञ एआई या अन्य किसानों से पूछें।",
    consulting: "एग्रोबॉट विशेषज्ञ परामर्श",
    consultingSub: "हमेशा ऑनलाइन • एआई विशेषज्ञ",
    chatPlaceholder: "अपनी खेती की समस्या बताएं..."
  },
  [Language.MARATHI]: {
    appName: "शेतकरी मित्र",
    welcome: "नमस्कार, शेतकरी मित्रानो!",
    newScan: "पीक तपासणी",
    mandi: "बाजार भाव",
    history: "माझे रेकॉर्ड",
    chat: "चॅट करा",
    home: "मुख्य",
    selectLang: "भाषा निवडा",
    startNow: "आता सुरू करा",
    checking: "तपासत आहे...",
    chooseCrop: "१. पीक निवडा:",
    uploadPhoto: "२. फोटो अपलोड करा:",
    clickCamera: "स्कॅन करण्यासाठी कॅमेरा उघडा",
    verdict: "तज्ज्ञांचे मत",
    prevention: "या गोष्टी टाळा (काय करू नये)",
    buyMedicine: "विश्वासार्ह औषध खरेदी करा",
    getRemedies: "ॲग्रोस्टारवर {crop} साठी तपासलेले उपाय मिळवा.",
    orderAgroStar: "ॲग्रोस्टारवर ऑर्डर करा",
    liveUpdates: "थेट अपडेट",
    marketIntel: "बाजार माहिती",
    verifiedSources: "सत्यापित स्रोत",
    externalMandi: "अधिकृत मंडी वेबसाइट उघडा",
    recentScans: "अलीकडील तपासणी",
    noData: "काहीही माहिती आढळली नाही. आपल्या शेताची तपासणी सुरू करा.",
    askExpert: "सल्ल्यासाठी आमच्या तज्ज्ञ एआय किंवा इतर शेतकऱ्यांना विचारा.",
    consulting: "एग्रोबॉट तज्ज्ञ सल्ला",
    consultingSub: "नेहमी ऑनलाइन • एआई तज्ज्ञ",
    chatPlaceholder: "तुमची शेतीची समस्या सांगा..."
  }
};
