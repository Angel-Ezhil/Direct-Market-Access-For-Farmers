export type Language = 'en' | 'ta' | 'hi';

export interface Translations {
  // Common & Branding
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  subTagline: string;
  selectRoleTitle: string;
  selectRoleSub: string;
  login: string;
  register: string;
  logout: string;
  demoMode: string;
  oneClickDemo: string;
  backToRoleSelect: string;
  
  // Roles
  farmer: string;
  customer: string;
  delivery: string;
  admin: string;
  
  farmerDesc: string;
  customerDesc: string;
  deliveryDesc: string;
  adminDesc: string;
  
  farmerBadge: string;
  customerBadge: string;
  deliveryBadge: string;
  adminBadge: string;

  // Farmer Dashboard
  goodMorningFarmer: string;
  farmerWelcomeSub: string;
  totalProducts: string;
  availableStock: string;
  activeOrders: string;
  completedOrders: string;
  totalEarnings: string;
  listNewProduce: string;
  aiCropScan: string;
  farmerVideoGuide: string;
  watchDemoVideo: string;

  // Farmer Tabs
  dashboard: string;
  products: string;
  orders: string;
  stock: string;
  earnings: string;
  cropScan: string;
  weather: string;
  mandiPrice: string;
  schemes: string;
  profile: string;
  tutorialVideo: string;

  // Customer
  freshFromLocalFarms: string;
  customerHeroSub: string;
  searchProduce: string;
  allDistricts: string;
  addToCart: string;
  viewDetails: string;
  cart: string;
  myOrders: string;
  placeOrder: string;
  subtotal: string;
  deliveryFee: string;
  totalPayable: string;

  // Delivery
  helloDeliveryPartner: string;
  deliveryHeroSub: string;
  todaysDeliveries: string;
  pendingPickups: string;
  outForDelivery: string;
  verifyOtpAndDeliver: string;
  openGpsRoute: string;

  // Admin
  adminPanel: string;
  adminSub: string;
  assignDeliveryPartner: string;
  qualityComplaints: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: "DIRECT MARKET ACCESS",
    appSubtitle: "For Farmers",
    tagline: "From Farm to Home — Direct. Fair. Digital.",
    subTagline: "Connecting Farmers, Customers and Delivery Partners in one digital marketplace.",
    selectRoleTitle: "Choose how you want to continue",
    selectRoleSub: "Four distinct portals engineered for fair trade and direct distribution.",
    login: "Login",
    register: "Register",
    logout: "Logout",
    demoMode: "Demo Mode Active",
    oneClickDemo: "1-Click Demo",
    backToRoleSelect: "Back to Role Selection",

    farmer: "Farmer",
    customer: "Customer",
    delivery: "Delivery Boy",
    admin: "Admin",

    farmerDesc: "Sell your farm products directly with zero middlemen cuts.",
    customerDesc: "Buy fresh farm products harvested within 24 hours.",
    deliveryDesc: "Manage farm pickups, GPS routes, and verified deliveries.",
    adminDesc: "Manage users, monitor order flows, complaints, and dispatch.",

    farmerBadge: "Direct MSP & Fair Price",
    customerBadge: "Farm to Kitchen in 3h",
    deliveryBadge: "Daily Payouts & Routes",
    adminBadge: "Ops Control & Security",

    goodMorningFarmer: "Good Morning, Farmer 👋",
    farmerWelcomeSub: "Manage harvest publishing, fulfill customer orders directly, analyze crop health, and monitor live APMC mandi benchmarks.",
    totalProducts: "Total Products",
    availableStock: "Available Stock",
    activeOrders: "Active Orders",
    completedOrders: "Completed Orders",
    totalEarnings: "Total Earnings",
    listNewProduce: "List New Produce",
    aiCropScan: "AI Crop Disease Scan",
    farmerVideoGuide: "Farmer Video Tutorial",
    watchDemoVideo: "Watch How-To Video",

    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    stock: "Stock",
    earnings: "Earnings",
    cropScan: "Crop Scan",
    weather: "Weather",
    mandiPrice: "Mandi Price",
    schemes: "Schemes",
    profile: "Profile",
    tutorialVideo: "Demo Video",

    freshFromLocalFarms: "Fresh From Local Farms 🌱",
    customerHeroSub: "Support local farmers directly. Harvested within hours and delivered straight to your doorstep.",
    searchProduce: "Search farm fresh vegetables, fruits, grains...",
    allDistricts: "All Districts",
    addToCart: "Add to Cart",
    viewDetails: "View Details",
    cart: "Cart",
    myOrders: "My Orders",
    placeOrder: "Place Order",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    totalPayable: "Total Payable",

    helloDeliveryPartner: "Hello, Delivery Partner 👋",
    deliveryHeroSub: "Manage farm produce pickups, navigate delivery coordinates, and verify customer doorstep handovers with OTP.",
    todaysDeliveries: "Today's Deliveries",
    pendingPickups: "Pending Pickups",
    outForDelivery: "Out for Delivery",
    verifyOtpAndDeliver: "Verify Customer OTP & Deliver",
    openGpsRoute: "Open Full GPS Navigation Route",

    adminPanel: "Admin Control Panel",
    adminSub: "Agricultural Direct Market Access Management Platform",
    assignDeliveryPartner: "Assign Delivery Partner",
    qualityComplaints: "Quality Complaints"
  },

  ta: {
    appTitle: "நேரடி சந்தை அணுகல்",
    appSubtitle: "விவசாயிகளுக்காக",
    tagline: "விவசாய நிலத்திலிருந்து நேராக வீட்டிற்கு — நேரடி. நியாயமான. டிஜிட்டல்.",
    subTagline: "விவசாயிகள், நுகர்வோர் மற்றும் டெலிவரி பார்ட்னர்களை இணைக்கும் டிஜிட்டல் சந்தை.",
    selectRoleTitle: "உங்கள் பிரிவைத் தேர்ந்தெடுங்கள்",
    selectRoleSub: "இடைத்தரகர் இல்லாமல் நியாயமான விலையில் விற்கவும் வாங்கவும்.",
    login: "உள்நுழைக",
    register: "பதிவு செய்க",
    logout: "வெளியேறு",
    demoMode: "டெமோ முறை தயார்",
    oneClickDemo: "1-கிளிக் டெமோ",
    backToRoleSelect: "பிரிவு தேர்வுக்கு திரும்புக",

    farmer: "விவசாயி (Farmer)",
    customer: "வாடிக்கையாளர் (Customer)",
    delivery: "டெலிவரி பார்ட்னர் (Delivery)",
    admin: "நிர்வாகி (Admin)",

    farmerDesc: "தரகர் கமிஷன் இன்றி விளைபொருட்களை நேரிடையாக விற்பனை செய்யுங்கள்.",
    customerDesc: "தோட்டத்திலிருந்து அறுவடை செய்த புத்தம் புதிய காய்கறிகளை வாங்குங்கள்.",
    deliveryDesc: "விளைநிலத்திலிருந்து பொருட்களை சேகரித்து விரைவாக டெலிவரி செய்யுங்கள்.",
    adminDesc: "முழு தளத்தின் இயக்கம், ஆர்டர்கள் மற்றும் பயனர்களை கண்காணிக்கவும்.",

    farmerBadge: "நேரடி நியாய விலை",
    customerBadge: "3 மணிநேரத்தில் டெலிவரி",
    deliveryBadge: "தினசரி ஊதியம்",
    adminBadge: "பாதுகாப்பு & கட்டுப்பாடு",

    goodMorningFarmer: "காலை வணக்கம், உழவரே! 👋",
    farmerWelcomeSub: "விளைபொருட்களை பதிவேற்றி, வாடிக்கையாளர் ஆர்டர்களை உறுதிசெய்து, AI மூலம் பயிர் நோய்களைக் கண்டறிந்து, நேரடி வங்கிப் பணத்தைப் பெறுங்கள்.",
    totalProducts: "மொத்த பொருட்கள்",
    availableStock: "இருப்பு அளவு",
    activeOrders: "நடப்பு ஆர்டர்கள்",
    completedOrders: "முடிந்த ஆர்டர்கள்",
    totalEarnings: "மொத்த வருவாய்",
    listNewProduce: "விளைபொருளை சேர்க்க",
    aiCropScan: "AI பயிர் நோய் ஸ்கேன்",
    farmerVideoGuide: "விவசாயிகள் வீடியோ வழிகாட்டி",
    watchDemoVideo: "வீடியோ செயல்முறை பார்க்க",

    dashboard: "முகப்பு",
    products: "பொருட்கள்",
    orders: "ஆர்டர்கள்",
    stock: "இருப்பு",
    earnings: "வருவாய்",
    cropScan: "பயிர் ஸ்கேன்",
    weather: "வானிலை",
    mandiPrice: "மண்டி விலை",
    schemes: "அரசு திட்டங்கள்",
    profile: "விவரம்",
    tutorialVideo: "வீடியோ வழிகாட்டி",

    freshFromLocalFarms: "உள்ளூர் நிலங்களின் புத்தம் புதிய அறுவடை 🌱",
    customerHeroSub: "விவசாயிகளுக்கு நேரடியாக ஆதரவு அளியுங்கள். தரகர் விலையின்றி இயற்கை காய்கறி, பழங்களை பெறுங்கள்.",
    searchProduce: "காய்கறிகள், பழங்கள், தானியங்களை தேடுங்கள்...",
    allDistricts: "அனைத்து மாவட்டங்கள்",
    addToCart: "கூடையில் சேர்க்க",
    viewDetails: "விவரம் பார்க்க",
    cart: "கூடை",
    myOrders: "என் ஆர்டர்கள்",
    placeOrder: "ஆர்டர் உறுதி செய்",
    subtotal: "கூட்டுத்தொகை",
    deliveryFee: "டெலிவரி கட்டணம்",
    totalPayable: "மொத்த தொகை",

    helloDeliveryPartner: "வணக்கம், டெலிவரி பார்ட்னர் 👋",
    deliveryHeroSub: "விளைநிலங்களில் இருந்து காய்கறிகளைப் பெற்று வாடிக்கையாளரிடம் OTP சரிபார்த்து ஒப்படைக்கவும்.",
    todaysDeliveries: "இன்றைய டெலிவரிகள்",
    pendingPickups: "எடுக்க வேண்டியவை",
    outForDelivery: "டெலிவரியில் உள்ளவை",
    verifyOtpAndDeliver: "OTP சரிபார்த்து டெலிவரி செய்",
    openGpsRoute: "GPS வழித்தடம் பார்க்க",

    adminPanel: "நிர்வாகக் கட்டுப்பாட்டு மையம்",
    adminSub: "விவசாய நேரடி சந்தை நிர்வாக மேலாண்மைத் தளம்",
    assignDeliveryPartner: "டெலிவரி பார்ட்னரை நியமிக்க",
    qualityComplaints: "தரக் குறைகள்"
  },

  hi: {
    appTitle: "प्रत्यक्ष बाज़ार पहुंच",
    appSubtitle: "किसानों के लिए",
    tagline: "खेत से घर तक — सीधा. निष्पक्ष. डिजिटल.",
    subTagline: "किसानों, ग्राहकों और डिलीवरी पार्टनर्स को जोड़ने वाला एक डिजिटल बाज़ार।",
    selectRoleTitle: "आगे बढ़ने के लिए अपनी भूमिका चुनें",
    selectRoleSub: "बिचौलियों से मुक्त, पारदर्शी और वास्तविक मूल्य प्रणाली।",
    login: "लॉगिन करें",
    register: "पंजीकरण करें",
    logout: "लॉगआउट",
    demoMode: "डेमो मोड सक्रिय",
    oneClickDemo: "1-क्लिक डेमो",
    backToRoleSelect: "भूमिका चयन पर वापस जाएं",

    farmer: "किसान (Farmer)",
    customer: "ग्राहक (Customer)",
    delivery: "डिलीवरी पार्टनर (Delivery)",
    admin: "प्रशासक (Admin)",

    farmerDesc: "बिना किसी दलाल या बिचौलिये के अपनी फसल सीधे ग्राहकों को बेचें।",
    customerDesc: "खेतों से ताज़ी तोड़ी गई सब्जियां, फल और अनाज सीधे मंगाएं।",
    deliveryDesc: "खेत से पिकअप करें और ग्राहक तक सुरक्षित डिलीवरी पहुंचाएं।",
    adminDesc: "उपयोगकर्ताओं, उत्पादों, डिलीवरी और शिकायतों की निगरानी करें।",

    farmerBadge: "सीधा उचित मूल्य",
    customerBadge: "3 घंटे में ताज़ा डिलीवरी",
    deliveryBadge: "दैनिक भुगतान",
    adminBadge: "सुरक्षा एवं नियंत्रण",

    goodMorningFarmer: "सुप्रभात, किसान भाई 👋",
    farmerWelcomeSub: "अपनी फसल को सूचीबद्ध करें, ग्राहकों के ऑर्डर स्वीकार करें, AI द्वारा फसल रोग जांचें और सीधे बैंक खाते में भुगतान पाएं।",
    totalProducts: "कुल उत्पाद",
    availableStock: "उपलब्ध स्टॉक",
    activeOrders: "सक्रिय ऑर्डर",
    completedOrders: "पूर्ण ऑर्डर",
    totalEarnings: "कुल कमाई",
    listNewProduce: "नया उत्पाद जोड़ें",
    aiCropScan: "AI फसल रोग स्कैन",
    farmerVideoGuide: "किसान वीडियो गाइड",
    watchDemoVideo: "डेमो वीडियो देखें",

    dashboard: "डैशबोर्ड",
    products: "उत्पाद",
    orders: "ऑर्डर्स",
    stock: "स्टॉक",
    earnings: "कमाई",
    cropScan: "फसल स्कैन",
    weather: "मौसम",
    mandiPrice: "मंडी भाव",
    schemes: "सरकारी योजनाएं",
    profile: "प्रोफाइल",
    tutorialVideo: "वीडियो गाइड",

    freshFromLocalFarms: "स्थानीय खेतों से ताज़ी फसल 🌱",
    customerHeroSub: "सीधे किसानों से खरीदारी करें। ताज़ा और बिना मिलावट के उत्पाद घर पाएं।",
    searchProduce: "ताज़ा सब्जियां, फल, अनाज खोजें...",
    allDistricts: "सभी जिले",
    addToCart: "कार्ट में जोड़ें",
    viewDetails: "विवरण देखें",
    cart: "कार्ट",
    myOrders: "मेरे ऑर्डर्स",
    placeOrder: "ऑर्डर दें",
    subtotal: "उप-योग",
    deliveryFee: "डिलीवरी शुल्क",
    totalPayable: "कुल देय राशि",

    helloDeliveryPartner: "नमस्ते, डिलीवरी पार्टनर 👋",
    deliveryHeroSub: "खेत से पिकअप करें, मैप से रास्ता देखें और OTP सत्यापित करके डिलीवरी पूरी करें।",
    todaysDeliveries: "आज की डिलीवरी",
    pendingPickups: "लंबित पिकअप",
    outForDelivery: "रास्ते में",
    verifyOtpAndDeliver: "ग्राहक OTP सत्यापित कर डिलीवरी करें",
    openGpsRoute: "पूर्ण GPS नेविगेशन मार्ग खोलें",

    adminPanel: "प्रशासन नियंत्रण कक्ष",
    adminSub: "कृषि प्रत्यक्ष बाज़ार प्रबंधन प्रणाली",
    assignDeliveryPartner: "डिलीवरी पार्टनर असाइन करें",
    qualityComplaints: "गुणवत्ता शिकायतें"
  }
};
