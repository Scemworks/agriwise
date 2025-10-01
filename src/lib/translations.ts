export type Language = "en" | "hi" | "ml";

export interface Translations {
  // Header & Navigation
  home: string;
  recommendations: string;
  chat: string;
  marketplace: string;
  weather: string;
  carbonCredits: string;
  profile: string;
  login: string;
  register: string;
  logout: string;
  language: string;

  // Common
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  submit: string;
  loading: string;
  error: string;
  success: string;
  search: string;
  filter: string;
  viewAll: string;
  learnMore: string;
  getStarted: string;
  signIn: string;
  back: string;
  next: string;
  previous: string;
  close: string;
  open: string;
  select: string;
  clear: string;
  reset: string;
  apply: string;
  confirm: string;
  yes: string;
  no: string;
  ok: string;

  // Auth
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  location: string;
  soilType: string;
  currentCrops: string;
  landSize: string;
  rememberMe: string;
  forgotPassword: string;
  termsOfService: string;
  privacyPolicy: string;
  agreeToTerms: string;
  signInToAccount: string;
  enterCredentials: string;
  enterYourPassword: string;
  dontHaveAccount: string;

  // Dashboard
  welcome: string;
  dashboard: string;
  quickActions: string;
  recentActivity: string;
  farmOverview: string;
  weatherWidget: string;
  carbonCreditsWidget: string;
  totalCredits: string;
  totalValue: string;
  activeCredits: string;
  getAIPoweredSuggestions: string;
  askFarmingQuestions: string;
  sellOrBuyProduce: string;
  checkWeatherForecast: string;
  recentActivityListTitle: string;
  latestFarmingActivities: string;
  viewFullForecast: string;
  farmDetailsTitle: string;
  farmDetailsSubtitle: string;
  locationLabel: string;
  soilTypeLabel: string;
  landSizeLabel: string;
  currentCropsLabel: string;
  manageCreditsCTA: string;
  thisMonth: string;

  // Crop Recommendations
  cropRecommendations: string;
  soilConditions: string;
  weatherConditions: string;
  getRecommendations: string;
  suitableCrops: string;
  advantages: string;
  disadvantages: string;
  expectedYield: string;
  marketPrice: string;
  plantingTime: string;
  harvestingTime: string;
  growingInformation: string;
  suitabilityScore: string;
  match: string;

  // Chat Assistant
  chatAssistant: string;
  askQuestion: string;
  typeMessage: string;
  send: string;
  quickQuestions: string;
  aiPowered: string;
  multilingual: string;
  voiceInput: string;
  thinking: string;

  // Marketplace
  sellProduce: string;
  browseItems: string;
  myListings: string;
  placeBid: string;
  buyNow: string;
  price: string;
  quantity: string;
  description: string;
  uploadImage: string;
  productName: string;
  category: string;
  condition: string;
  images: string;
  auction: string;
  listProduct: string;
  noProductsFound: string;
  noListingsYet: string;
  listFirstProduct: string;
  rating: string;
  reviews: string;
  seller: string;
  bids: string;
  timeLeft: string;
  fresh: string;
  good: string;
  fair: string;
  searchProductsPlaceholder: string;
  filterLabel: string;
  filtersText: string;
  auctionTag: string;
  saleTag: string;
  clickToUploadImages: string;
  imageFormatsHint: string;
  selectCategoryPlaceholder: string;
  browseItemsLabel: string;

  // Weather
  weatherUpdates: string;
  currentWeather: string;
  forecast: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  windSpeed: string;
  visibility: string;
  uvIndex: string;
  pressure: string;
  feelsLike: string;
  weatherCondition: string;
  weatherAlerts: string;
  farmingRecommendations: string;
  weatherHistory: string;
  irrigationSchedule: string;
  pestControl: string;
  harvestTiming: string;
  averageTemperature: string;
  totalRainfall: string;
  sunnyDays: string;
  rainyDays: string;

  // Carbon Credits
  carbonCreditProgram: string;
  myCredits: string;
  calculateCredits: string;
  sellCredits: string;
  creditValue: string;
  overview: string;
  recentCredits: string;
  sustainablePractices: string;
  recentCarbonCredits: string;
  recentActivities: string;
  creditsReadyToSell: string;
  marketPerCredit: string;
  creditsLabel: string;
  noTillFarming: string;
  coverCropping: string;
  agroforestry: string;
  precisionIrrigation: string;
  renewableEnergy: string;
  composting: string;
  creditsPerAcre: string;
  implementation: string;
  benefits: string;
  availableCredits: string;
  creditMarketPrice: string;
  listForSale: string;
  recentSales: string;
  whyParticipate: string;
  additionalIncome: string;
  environmentalImpact: string;
  verifiedPractices: string;

  // Footer
  aboutUs: string;
  ourMission: string;
  contactUs: string;
  support: string;
  helpCenter: string;
  faq: string;
  documentation: string;
  api: string;
  developers: string;
  partners: string;
  careers: string;
  blog: string;
  news: string;
  press: string;
  socialMedia: string;
  followUs: string;
  newsletter: string;
  subscribe: string;
  copyright: string;
  allRightsReserved: string;
  madeWith: string;
  forFarmers: string;
  products: string;
  legal: string;
  cookiePolicy: string;
  dataProtection: string;
  accessibility: string;
  enterYourEmail: string;

  // Homepage
  heroTitle: string;
  heroSubtitle: string;
  everythingYouNeed: string;
  whyChooseAgriWise: string;
  increasedYield: string;
  communitySupport: string;
  mobileFirstDesign: string;
  readyToTransform: string;
  joinThousands: string;
  startFreeTrial: string;
  browseMarketplace: string;
  farmersConnected: string;
  cropVarieties: string;
  creditsGenerated: string;
  successRate: string;
  featureDescCropRecommendations: string;
  featureDescChatAssistant: string;
  featureDescMarketplace: string;
  featureDescWeather: string;
  featureDescCarbonCredits: string;
  featuresIntro: string;
  benefitsYieldDesc: string;
  benefitsCommunityDesc: string;
  benefitsSustainabilityDesc: string;
  mobileAvailability: string;
  // Error pages
  errorTitle: string;
  errorMessage: string;
  retry: string;
  goHome: string;
  notFoundTitle: string;
  notFoundMessage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header & Navigation
    home: "Home",
    recommendations: "Recommendations",
    chat: "Chat",
    marketplace: "Marketplace",
    weather: "Weather",
    carbonCredits: "Carbon Credits",
    profile: "Profile",
    login: "Login",
    register: "Register",
    logout: "Logout",
    language: "Language",

    // Common
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    submit: "Submit",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    search: "Search",
    filter: "Filter",
    viewAll: "View All",
    learnMore: "Learn More",
    getStarted: "Get Started",
    signIn: "Sign In",
    back: "Back",
    next: "Next",
    previous: "Previous",
    close: "Close",
    open: "Open",
    select: "Select",
    clear: "Clear",
    reset: "Reset",
    apply: "Apply",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    ok: "OK",

    // Auth
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    location: "Location",
    soilType: "Soil Type",
    currentCrops: "Current Crops",
    landSize: "Land Size (acres)",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    agreeToTerms: "I agree to the Terms of Service and Privacy Policy",
    signInToAccount: "Sign in to your account",
    enterCredentials: "Enter your credentials to access your dashboard",
    enterYourPassword: "Enter your password",
    dontHaveAccount: "Don't have an account?",

    // Dashboard
    welcome: "Welcome",
    dashboard: "Dashboard",
    quickActions: "Quick Actions",
    recentActivity: "Recent Activity",
    farmOverview: "Farm Overview",
    weatherWidget: "Weather Widget",
    carbonCreditsWidget: "Carbon Credits",
    totalCredits: "Total Credits",
    totalValue: "Total Value",
    activeCredits: "Active Credits",
    getAIPoweredSuggestions: "Get AI-powered crop suggestions",
    askFarmingQuestions: "Ask farming questions",
    sellOrBuyProduce: "Sell or buy produce",
    checkWeatherForecast: "Check weather forecast",
    recentActivityListTitle: "Recent Activity",
    latestFarmingActivities: "Your latest farming activities",
    viewFullForecast: "View Full Forecast",
    farmDetailsTitle: "Farm Overview",
    farmDetailsSubtitle: "Your farming details",
    locationLabel: "Location:",
    soilTypeLabel: "Soil Type:",
    landSizeLabel: "Land Size:",
    currentCropsLabel: "Current Crops:",
    manageCreditsCTA: "Manage Credits",
    thisMonth: "This Month:",

    // Crop Recommendations
    cropRecommendations: "Crop Recommendations",
    soilConditions: "Soil Conditions",
    weatherConditions: "Weather Conditions",
    getRecommendations: "Get Recommendations",
    suitableCrops: "Suitable Crops",
    advantages: "Advantages",
    disadvantages: "Disadvantages",
    expectedYield: "Expected Yield",
    marketPrice: "Market Price",
    plantingTime: "Planting Time",
    harvestingTime: "Harvesting Time",
    growingInformation: "Growing Information",
    suitabilityScore: "Suitability Score",
    match: "Match",

    // Chat Assistant
    chatAssistant: "Chat Assistant",
    askQuestion: "Ask a Question",
    typeMessage: "Type your message...",
    send: "Send",
    quickQuestions: "Quick Questions",
    aiPowered: "AI-Powered",
    multilingual: "Multilingual",
    voiceInput: "Voice Input",
    thinking: "Thinking...",

    // Marketplace
    sellProduce: "Sell Produce",
    browseItems: "Browse Items",
    myListings: "My Listings",
    placeBid: "Place Bid",
    buyNow: "Buy Now",
    price: "Price",
    quantity: "Quantity",
    description: "Description",
    uploadImage: "Upload Image",
    productName: "Product Name",
    category: "Category",
    condition: "Condition",
    images: "Images",
    auction: "Auction",
    listProduct: "List Product",
    noProductsFound: "No products found",
    noListingsYet: "No listings yet",
    listFirstProduct: "List Your First Product",
    rating: "Rating",
    reviews: "Reviews",
    seller: "Seller",
    bids: "Bids",
    timeLeft: "Time Left",
    fresh: "Fresh",
    good: "Good",
    fair: "Fair",
    searchProductsPlaceholder: "Search products...",
    filterLabel: "Filters",
    filtersText: "Filters",
    auctionTag: "Auction",
    saleTag: "Sale",
    clickToUploadImages: "Click to upload images",
    imageFormatsHint: "PNG, JPG up to 10MB each",
    selectCategoryPlaceholder: "Select category",
    browseItemsLabel: "Browse Items",

    // Weather
    weatherUpdates: "Weather Updates",
    currentWeather: "Current Weather",
    forecast: "Forecast",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall",
    windSpeed: "Wind Speed",
    visibility: "Visibility",
    uvIndex: "UV Index",
    pressure: "Pressure",
    feelsLike: "Feels Like",
    weatherCondition: "Condition",
    weatherAlerts: "Weather Alerts",
    farmingRecommendations: "Farming Recommendations",
    weatherHistory: "Weather History",
    irrigationSchedule: "Irrigation Schedule",
    pestControl: "Pest Control",
    harvestTiming: "Harvest Timing",
    averageTemperature: "Average Temperature",
    totalRainfall: "Total Rainfall",
    sunnyDays: "Sunny Days",
    rainyDays: "Rainy Days",

    // Carbon Credits
    carbonCreditProgram: "Carbon Credit Program",
    myCredits: "My Credits",
    calculateCredits: "Calculate Credits",
    sellCredits: "Sell Credits",
    creditValue: "Credit Value",
    overview: "Overview",
    recentCredits: "Recent Credits",
    recentCarbonCredits: "Recent Carbon Credits",
    recentActivities: "Your latest carbon credit activities",
    creditsReadyToSell: "Credits ready to sell",
    marketPerCredit: "Per credit (current rate)",
    creditsLabel: "credits",

    noTillFarming: "No-Till Farming",
    coverCropping: "Cover Cropping",
    agroforestry: "Agroforestry",
    precisionIrrigation: "Precision Irrigation",
    renewableEnergy: "Renewable Energy",
    composting: "Composting",
    creditsPerAcre: "Credits per Acre",
    implementation: "Implementation",
    benefits: "Benefits",
    availableCredits: "Available Credits",
    creditMarketPrice: "Market Price",
    listForSale: "List for Sale",
    recentSales: "Recent Sales",
    whyParticipate: "Why Participate in Carbon Credits?",
    additionalIncome: "Additional Income",
    environmentalImpact: "Environmental Impact",
    verifiedPractices: "Verified Practices",

    // Footer
    aboutUs: "About Us",
    ourMission: "Our Mission",
    contactUs: "Contact Us",
    support: "Support",
    helpCenter: "Help Center",
    faq: "FAQ",
    documentation: "Documentation",
    api: "API",
    developers: "Developers",
    partners: "Partners",
    careers: "Careers",
    blog: "Blog",
    news: "News",
    press: "Press",
    socialMedia: "Social Media",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    subscribe: "Subscribe",
    copyright: "Copyright",
    allRightsReserved: "All rights reserved",
    madeWith: "Made with",
    forFarmers: "for farmers",
    products: "Products",
    legal: "Legal",
    cookiePolicy: "Cookie Policy",
    dataProtection: "Data Protection",
    accessibility: "Accessibility",
    enterYourEmail: "Enter your email",

    // Homepage
    heroTitle: "Welcome to AgriWise",
    heroSubtitle:
      "Your smart agriculture companion with AI-driven crop recommendations, multilingual support, and marketplace for sustainable farming.",
    everythingYouNeed: "Everything You Need for Smart Farming",
    whyChooseAgriWise: "Why Choose AgriWise?",
    increasedYield: "Increased Yield",
    communitySupport: "Community Support",
    sustainablePractices: "Sustainable Practices",
    mobileFirstDesign: "Mobile-First Design",
    readyToTransform: "Ready to Transform Your Farming?",
    joinThousands:
      "Join thousands of farmers who are already using AgriWise to make smarter agricultural decisions.",
    startFreeTrial: "Start Free Trial",
    browseMarketplace: "Browse Marketplace",
    farmersConnected: "Farmers Connected",
    cropVarieties: "Crop Varieties",
    creditsGenerated: "Credits Generated",
    successRate: "Success Rate",
    featureDescCropRecommendations:
      "AI-driven crop suggestions based on soil, location, and weather conditions for optimal yield.",
    featureDescChatAssistant:
      "Multilingual chat assistant providing real-time agricultural advice and support.",
    featureDescMarketplace:
      "Sell your produce and browse items with bidding system for fair pricing.",
    featureDescWeather:
      "Timely weather notifications to aid your farming decisions and planning.",
    featureDescCarbonCredits:
      "Generate additional income through carbon credit program and sustainable practices.",
    featuresIntro:
      "Our comprehensive platform provides all the tools and resources you need to make informed agricultural decisions.",
    benefitsYieldDesc:
      "AI-powered recommendations help you choose the best crops for maximum productivity and profitability.",
    benefitsCommunityDesc:
      "Connect with fellow farmers and get expert advice through our multilingual chat assistant.",
    benefitsSustainabilityDesc:
      "Earn carbon credits while practicing sustainable farming and contributing to environmental protection.",
    mobileAvailability: "Available in English, Hindi & Malayalam",
    // Error pages
    errorTitle: "Something went wrong",
    errorMessage:
      "An unexpected error occurred. Please try again or contact support if the problem persists.",
    retry: "Retry",
    goHome: "Go Home",
    notFoundTitle: "Page not found",
    notFoundMessage:
      "We couldn't find the page you were looking for. Check the URL or return to the homepage.",
  },
  hi: {
    // Header & Navigation
    home: "होम",
    recommendations: "सुझाव",
    chat: "चैट",
    marketplace: "बाज़ार",
    weather: "मौसम",
    carbonCredits: "कार्बन क्रेडिट",
    profile: "प्रोफ़ाइल",
    login: "लॉगिन",
    register: "रजिस्टर",
    logout: "लॉगआउट",
    language: "भाषा",

    // Common
    save: "सेव",
    cancel: "रद्द",
    edit: "संपादित",
    delete: "हटाएं",
    submit: "जमा करें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    search: "खोजें",
    filter: "फिल्टर",
    viewAll: "सभी देखें",
    learnMore: "और जानें",
    getStarted: "शुरू करें",
    signIn: "साइन इन",
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    close: "बंद",
    open: "खोलें",
    select: "चुनें",
    clear: "साफ़ करें",
    reset: "रीसेट",
    apply: "लागू करें",
    confirm: "पुष्टि करें",
    yes: "हाँ",
    no: "नहीं",
    ok: "ठीक",

    // Auth
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    fullName: "पूरा नाम",
    phoneNumber: "फोन नंबर",
    location: "स्थान",
    soilType: "मिट्टी का प्रकार",
    currentCrops: "वर्तमान फसलें",
    landSize: "भूमि का आकार (एकड़)",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    termsOfService: "सेवा की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    agreeToTerms: "मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं",
    signInToAccount: "अपने खाते में साइन इन करें",
    enterCredentials: "डैशबोर्ड तक पहुंचने के लिए अपनी साख दर्ज करें",
    enterYourPassword: "अपना पासवर्ड दर्ज करें",
    dontHaveAccount: "क्या आपका खाता नहीं है?",

    // Dashboard
    welcome: "स्वागत है",
    dashboard: "डैशबोर्ड",
    quickActions: "त्वरित कार्य",
    recentActivity: "हाल की गतिविधि",
    farmOverview: "खेत का अवलोकन",
    weatherWidget: "मौसम विजेट",
    carbonCreditsWidget: "कार्बन क्रेडिट",
    totalCredits: "कुल क्रेडिट",
    totalValue: "कुल मूल्य",
    activeCredits: "सक्रिय क्रेडिट",
    getAIPoweredSuggestions: "एआई-संचालित फसल सुझाव प्राप्त करें",
    askFarmingQuestions: "खेती से संबंधित प्रश्न पूछें",
    sellOrBuyProduce: "उत्पाद बेचें या खरीदें",
    checkWeatherForecast: "मौसम का पूर्वानुमान जांचें",
    recentActivityListTitle: "हाल की गतिविधि",
    latestFarmingActivities: "आपकी नवीनतम खेती गतिविधियाँ",
    viewFullForecast: "पूरा पूर्वानुमान देखें",
    farmDetailsTitle: "खेत का अवलोकन",
    farmDetailsSubtitle: "आपकी खेती का विवरण",
    locationLabel: "स्थान:",
    soilTypeLabel: "मिट्टी का प्रकार:",
    landSizeLabel: "भूमि का आकार:",
    currentCropsLabel: "वर्तमान फसलें:",
    manageCreditsCTA: "क्रेडिट प्रबंधित करें",
    thisMonth: "इस महीने:",

    searchProductsPlaceholder: "उत्पाद खोजें...",
    filterLabel: "फिल्टर",
    filtersText: "फिल्टर",
    auctionTag: "नीलामी",
    saleTag: "बिक्री",
    clickToUploadImages: "छवियां अपलोड करने के लिए क्लिक करें",
    imageFormatsHint: "PNG, JPG, प्रत्येक 10MB तक",
    selectCategoryPlaceholder: "श्रेणी चुनें",
    browseItemsLabel: "आइटम ब्राउज़ करें",
    // Crop Recommendations
    cropRecommendations: "फसल सुझाव",
    soilConditions: "मिट्टी की स्थिति",
    weatherConditions: "मौसम की स्थिति",
    getRecommendations: "सुझाव प्राप्त करें",
    suitableCrops: "उपयुक्त फसलें",
    advantages: "फायदे",
    disadvantages: "नुकसान",
    expectedYield: "अपेक्षित उपज",
    marketPrice: "बाजार मूल्य",
    plantingTime: "बुवाई का समय",
    harvestingTime: "कटाई का समय",
    growingInformation: "उगाने की जानकारी",
    suitabilityScore: "उपयुक्तता स्कोर",
    match: "मैच",

    // Chat Assistant
    chatAssistant: "चैट सहायक",
    askQuestion: "प्रश्न पूछें",
    typeMessage: "अपना संदेश टाइप करें...",
    send: "भेजें",
    quickQuestions: "त्वरित प्रश्न",
    aiPowered: "एआई संचालित",
    multilingual: "बहुभाषी",
    voiceInput: "आवाज़ इनपुट",
    thinking: "सोच रहा है...",

    // Marketplace
    sellProduce: "उत्पाद बेचें",
    browseItems: "आइटम ब्राउज़ करें",
    myListings: "मेरी सूची",
    placeBid: "बोली लगाएं",
    buyNow: "अभी खरीदें",
    price: "कीमत",
    quantity: "मात्रा",
    description: "विवरण",
    uploadImage: "छवि अपलोड करें",
    productName: "उत्पाद का नाम",
    category: "श्रेणी",
    weatherCondition: "स्थिति",
    images: "छवियां",
    auction: "नीलामी",
    listProduct: "उत्पाद सूचीबद्ध करें",
    noProductsFound: "कोई उत्पाद नहीं मिला",
    noListingsYet: "अभी तक कोई सूची नहीं",
    listFirstProduct: "अपना पहला उत्पाद सूचीबद्ध करें",
    rating: "रेटिंग",
    reviews: "समीक्षाएं",
    seller: "विक्रेता",
    bids: "बोलियां",
    timeLeft: "बचा समय",
    fresh: "ताजा",
    good: "अच्छा",
    fair: "ठीक",

    // Weather
    weatherUpdates: "मौसम अपडेट",
    currentWeather: "वर्तमान मौसम",
    forecast: "पूर्वानुमान",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "वर्षा",
    windSpeed: "हवा की गति",
    visibility: "दृश्यता",
    uvIndex: "यूवी इंडेक्स",
    pressure: "दबाव",
    feelsLike: "महसूस होता है",
    condition: "स्थिति",
    weatherAlerts: "मौसम चेतावनी",
    farmingRecommendations: "खेती की सिफारिशें",
    weatherHistory: "मौसम का इतिहास",
    irrigationSchedule: "सिंचाई कार्यक्रम",
    pestControl: "कीट नियंत्रण",
    harvestTiming: "कटाई का समय",
    averageTemperature: "औसत तापमान",
    totalRainfall: "कुल वर्षा",
    sunnyDays: "धूप वाले दिन",
    rainyDays: "बारिश वाले दिन",

    // Carbon Credits
    carbonCreditProgram: "कार्बन क्रेडिट कार्यक्रम",
    myCredits: "मेरे क्रेडिट",
    calculateCredits: "क्रेडिट की गणना करें",
    sellCredits: "क्रेडिट बेचें",
    creditValue: "क्रेडिट मूल्य",
    overview: "अवलोकन",
    recentCredits: "हाल के क्रेडिट",
    recentCarbonCredits: "हाल के कार्बन क्रेडिट",
    recentActivities: "आपकी नवीनतम कार्बन क्रेडिट गतिविधियाँ",
    creditsReadyToSell: "बिक्री के लिए तैयार क्रेडिट",
    marketPerCredit: "प्रति क्रेडिट (वर्तमान दर)",
    creditsLabel: "क्रेडिट",

    noTillFarming: "बिना जुताई की खेती",
    coverCropping: "कवर क्रॉपिंग",
    agroforestry: "कृषि वानिकी",
    precisionIrrigation: "सटीक सिंचाई",
    renewableEnergy: "नवीकरणीय ऊर्जा",
    composting: "कम्पोस्टिंग",
    creditsPerAcre: "प्रति एकड़ क्रेडिट",
    implementation: "कार्यान्वयन",
    benefits: "लाभ",
    availableCredits: "उपलब्ध क्रेडिट",
    creditMarketPrice: "बाजार मूल्य",
    listForSale: "बिक्री के लिए सूचीबद्ध करें",
    recentSales: "हाल की बिक्री",
    whyParticipate: "कार्बन क्रेडिट में क्यों भाग लें?",
    additionalIncome: "अतिरिक्त आय",
    environmentalImpact: "पर्यावरणीय प्रभाव",
    verifiedPractices: "सत्यापित प्रथाएं",

    // Footer
    aboutUs: "हमारे बारे में",
    ourMission: "हमारा मिशन",
    contactUs: "संपर्क करें",
    support: "सहायता",
    helpCenter: "सहायता केंद्र",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    documentation: "दस्तावेजीकरण",
    api: "एपीआई",
    developers: "डेवलपर्स",
    partners: "भागीदार",
    careers: "करियर",
    blog: "ब्लॉग",
    news: "समाचार",
    press: "प्रेस",
    socialMedia: "सोशल मीडिया",
    followUs: "हमें फॉलो करें",
    newsletter: "न्यूज़लेटर",
    subscribe: "सब्सक्राइब करें",
    copyright: "कॉपीराइट",
    allRightsReserved: "सभी अधिकार सुरक्षित",
    madeWith: "बनाया गया",
    forFarmers: "किसानों के लिए",
    products: "उत्पाद",
    legal: "कानूनी",
    cookiePolicy: "कुकी नीति",
    dataProtection: "डेटा सुरक्षा",
    accessibility: "प्रवेशयोग्यता",
    enterYourEmail: "अपना ईमेल दर्ज करें",

    // Homepage
    heroTitle: "अग्रीवाइज़ में आपका स्वागत है",
    heroSubtitle:
      "आपका स्मार्ट कृषि साथी एआई-संचालित फसल सुझाव, बहुभाषी सहायता और टिकाऊ खेती के लिए बाज़ार के साथ।",
    everythingYouNeed: "स्मार्ट खेती के लिए आपको जो कुछ चाहिए",
    whyChooseAgriWise: "अग्रीवाइज़ क्यों चुनें?",
    increasedYield: "बढ़ी हुई उपज",
    communitySupport: "समुदाय सहायता",
    sustainablePractices: "टिकाऊ प्रथाएं",
    mobileFirstDesign: "मोबाइल-फर्स्ट डिज़ाइन",
    readyToTransform: "अपनी खेती को बदलने के लिए तैयार हैं?",
    joinThousands:
      "हजारों किसानों के साथ जुड़ें जो पहले से ही अग्रीवाइज़ का उपयोग कर रहे हैं।",
    startFreeTrial: "मुफ्त ट्रायल शुरू करें",
    browseMarketplace: "बाज़ार ब्राउज़ करें",
    farmersConnected: "किसान जुड़े",
    cropVarieties: "फसल किस्में",
    creditsGenerated: "क्रेडिट उत्पन्न",
    successRate: "सफलता दर",
    featureDescCropRecommendations:
      "मिट्टी, स्थान और मौसम की स्थिति के आधार पर अधिकतम उपज के लिए एआई-संचालित फसल सुझाव।",
    featureDescChatAssistant:
      "रियल-टाइम कृषि सलाह और समर्थन प्रदान करने वाला बहुभाषी चैट सहायक।",
    featureDescMarketplace:
      "बोली प्रणाली के साथ अपने उत्पाद बेचें और उचित मूल्य सुनिश्चित करने के लिए आइटम ब्राउज़ करें।",
    featureDescWeather:
      "आपके कृषि निर्णयों और योजना में मदद करने के लिए समय पर मौसम सूचनाएँ।",
    featureDescCarbonCredits:
      "टिकाऊ प्रथाओं के माध्यम से अतिरिक्त आय उत्पन्न करें और कार्बन क्रेडिट प्रोग्राम में भाग लें।",
    featuresIntro:
      "हमारा समग्र प्लेटफ़ॉर्म आपको सूचित कृषि निर्णय लेने के लिए सभी उपकरण और संसाधन प्रदान करता है।",
    benefitsYieldDesc:
      "एआई-संचालित सिफारिशें आपको अधिकतम उत्पादकता और लाभ के लिए सबसे अच्छी फसल चुनने में मदद करती हैं।",
    benefitsCommunityDesc:
      "अन्य किसानों से जुड़ें और हमारे बहुभाषी चैट सहायक के माध्यम से विशेषज्ञ सलाह प्राप्त करें।",
    benefitsSustainabilityDesc:
      "टिकाऊ खेती का अभ्यास करते हुए कार्बन क्रेडिट कमाएँ और पर्यावरण संरक्षण में योगदान दें।",
    mobileAvailability: "अंग्रेज़ी, हिंदी और मलयालम में उपलब्ध",
    // Error pages
    errorTitle: "कुछ गलत हो गया",
    errorMessage:
      "एक अनपेक्षित त्रुटि हुई। कृपया पुनः प्रयास करें या समस्या बनी रहने पर समर्थन से संपर्क करें।",
    retry: "पुनः प्रयास",
    goHome: "होम पर जाएँ",
    notFoundTitle: "पृष्ठ नहीं मिला",
    notFoundMessage:
      "हम जिस पृष्ठ की आप तलाश कर रहे थे वह नहीं मिला। URL जांचें या होमपेज पर लौटें।",
  },
  ml: {
    // Header & Navigation
    home: "ഹോം",
    recommendations: "ശുപാർശകൾ",
    chat: "ചാറ്റ്",
    marketplace: "മാർക്കറ്റ്പ്ലേസ്",
    weather: "കാലാവസ്ഥ",
    carbonCredits: "കാർബൺ ക്രെഡിറ്റ്",
    profile: "പ്രൊഫൈൽ",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ",
    logout: "ലോഗൗട്ട്",
    language: "ഭാഷ",

    // Common
    save: "സേവ്",
    cancel: "റദ്ദാക്കുക",
    edit: "എഡിറ്റ്",
    delete: "ഡിലീറ്റ്",
    submit: "സബ്മിറ്റ്",
    loading: "ലോഡിംഗ്...",
    error: "എറർ",
    success: "സക്സസ്",
    search: "തിരയുക",
    filter: "ഫിൽട്ടർ",
    viewAll: "എല്ലാം കാണുക",
    learnMore: "കൂടുതൽ അറിയുക",
    getStarted: "ആരംഭിക്കുക",
    signIn: "സൈൻ ഇൻ",
    back: "തിരികെ",
    next: "അടുത്തത്",
    previous: "മുമ്പത്തെ",
    close: "അടയ്ക്കുക",
    open: "തുറക്കുക",
    select: "തിരഞ്ഞെടുക്കുക",
    clear: "മായ്ക്കുക",
    reset: "റീസെറ്റ്",
    apply: "പ്രയോഗിക്കുക",
    confirm: "സ്ഥിരീകരിക്കുക",
    yes: "അതെ",
    no: "അല്ല",
    ok: "ശരി",

    // Auth
    email: "ഇമെയിൽ",
    password: "പാസ്‌വേഡ്",
    confirmPassword: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
    fullName: "പൂർണ്ണ നാമം",
    phoneNumber: "ഫോൺ നമ്പർ",
    location: "ലൊക്കേഷൻ",
    soilType: "മണ്ണിന്റെ തരം",
    currentCrops: "നിലവിലെ വിളകൾ",
    landSize: "ഭൂമിയുടെ വലിപ്പം (ഏക്കർ)",
    rememberMe: "എന്നെ ഓർക്കുക",
    forgotPassword: "പാസ്‌വേഡ് മറന്നുപോയി?",
    termsOfService: "സേവന നിബന്ധനകൾ",
    privacyPolicy: "സ്വകാര്യതാ നയം",
    agreeToTerms: "ഞാൻ സേവന നിബന്ധനകളും സ്വകാര്യതാ നയവും അംഗീകരിക്കുന്നു",
    signInToAccount: "നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് സൈൻ ഇൻ ചെയ്യുക",
    enterCredentials: "ഡാഷ്ബോർഡിലേക്ക് എത്താൻ നിങ്ങളുടെ ക്രെഡൻഷ്യലുകൾ നൽകുക",
    enterYourPassword: "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക",
    dontHaveAccount: "അക്കൗണ്ടോ ഇല്ലേ?",

    // Dashboard
    welcome: "സ്വാഗതം",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    quickActions: "ദ്രുത പ്രവർത്തനങ്ങൾ",
    recentActivity: "സമീപകാല പ്രവർത്തനങ്ങൾ",
    farmOverview: "കൃഷിസ്ഥല അവലോകനം",
    weatherWidget: "കാലാവസ്ഥാ വിജറ്റ്",
    carbonCreditsWidget: "കാർബൺ ക്രെഡിറ്റുകൾ",
    totalCredits: "മൊത്തം ക്രെഡിറ്റുകൾ",
    totalValue: "മൊത്തം മൂല്യം",
    activeCredits: "സജീവ ക്രെഡിറ്റുകൾ",
    getAIPoweredSuggestions: "AI-ചാലിത വിള ശുപാർശകൾ നേടുക",
    askFarmingQuestions: "കൃഷി സംബന്ധിച്ച ചോദ്യങ്ങൾ ചോദിക്കുക",
    sellOrBuyProduce: "ഉൽപ്പന്നം വിൽക്കുക അല്ലെങ്കിൽ വാങ്ങുക",
    checkWeatherForecast: "കാലാവസ്ഥാ മുൻ‌കണക്കു പരിശോധിക്കുക",
    recentActivityListTitle: "സമീപകാല പ്രവർത്തനങ്ങൾ",
    latestFarmingActivities: "നിങ്ങളുടെ പുതിയ കൃഷി പ്രവർത്തനങ്ങൾ",
    viewFullForecast: "പൂർണ്ണ മുന്നറിയിപ്പ് കാണുക",
    farmDetailsTitle: "ഫാം അവലോകനം",
    farmDetailsSubtitle: "നിങ്ങളുടെ കൃഷി വിശദാംശങ്ങൾ",
    locationLabel: "സ്ഥാനം:",
    soilTypeLabel: "മണ്ണിന്റെ തരം:",
    landSizeLabel: "ഭൂമിയുടെ വലിപ്പം:",
    currentCropsLabel: "നിലവിലുള്ള വിളകൾ:",
    manageCreditsCTA: "ക്രെഡിറ്റുകൾ മാനേജ് ചെയ്യുക",
    thisMonth: "ഈ മാസം:",

    searchProductsPlaceholder: "ഉൽപ്പന്നങ്ങൾ തിരയുക...",
    filterLabel: "ഫിൽറ്ററുകൾ",
    filtersText: "ഫിൽറ്ററുകൾ",
    auctionTag: "ലേലം",
    saleTag: "സെയിൽ",
    clickToUploadImages: "ഇമേജുകൾ അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക",
    imageFormatsHint: "PNG, JPG ഓരോതും 10MB വരെ",
    selectCategoryPlaceholder: "വർഗ്ഗം തിരഞ്ഞെടുക്കുക",
    browseItemsLabel: "ഇനങ്ങൾ ബ്രൗസ് ചെയ്യുക",
    // Crop Recommendations
    cropRecommendations: "വിള ശുപാർശകൾ",
    soilConditions: "മണ്ണിന്റെ അവസ്ഥ",
    weatherConditions: "കാലാവസ്ഥാ അവസ്ഥ",
    getRecommendations: "ശുപാർശകൾ നേടുക",
    suitableCrops: "ഉചിതമായ വിളകൾ",
    advantages: "ഗുണങ്ങൾ",
    disadvantages: "ദോഷങ്ങൾ",
    expectedYield: "പ്രതീക്ഷിത വിളവ്",
    marketPrice: "വിപണി വില",
    plantingTime: "നടാനുള്ള സമയം",
    harvestingTime: "വിളവെടുക്കാനുള്ള സമയം",
    growingInformation: "വളർത്തൽ വിവരങ്ങൾ",
    suitabilityScore: "ഉചിതത്വ സ്കോർ",
    match: "മാച്ച്",

    // Chat Assistant
    chatAssistant: "ചാറ്റ് അസിസ്റ്റന്റ്",
    askQuestion: "ഒരു ചോദ്യം ചോദിക്കുക",
    typeMessage: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
    send: "അയയ്ക്കുക",
    quickQuestions: "ദ്രുത ചോദ്യങ്ങൾ",
    aiPowered: "AI പവർഡ്",
    multilingual: "ബഹുഭാഷാ",
    voiceInput: "വോയ്സ് ഇൻപുട്ട്",
    thinking: "ചിന്തിക്കുന്നു...",

    // Marketplace
    sellProduce: "ഉൽപ്പന്നം വിൽക്കുക",
    browseItems: "ഇനങ്ങൾ ബ്രൗസ് ചെയ്യുക",
    myListings: "എന്റെ ലിസ്റ്റിംഗുകൾ",
    placeBid: "ബിഡ് വയ്ക്കുക",
    buyNow: "ഇപ്പോൾ വാങ്ങുക",
    price: "വില",
    quantity: "അളവ്",
    description: "വിവരണം",
    uploadImage: "ഇമേജ് അപ്‌ലോഡ് ചെയ്യുക",
    productName: "ഉൽപ്പന്നത്തിന്റെ പേര്",
    category: "വിഭാഗം",
    weatherCondition: "അവസ്ഥ",
    images: "ചിത്രങ്ങൾ",
    auction: "ലേലം",
    listProduct: "ഉൽപ്പന്നം ലിസ്റ്റ് ചെയ്യുക",
    noProductsFound: "ഉൽപ്പന്നങ്ങൾ കണ്ടെത്തിയില്ല",
    noListingsYet: "ഇതുവരെ ലിസ്റ്റിംഗുകൾ ഇല്ല",
    listFirstProduct: "നിങ്ങളുടെ ആദ്യ ഉൽപ്പന്നം ലിസ്റ്റ് ചെയ്യുക",
    rating: "റേറ്റിംഗ്",
    reviews: "അവലോകനങ്ങൾ",
    seller: "വിൽപ്പനക്കാരൻ",
    bids: "ബിഡുകൾ",
    timeLeft: "ശേഷിക്കുന്ന സമയം",
    fresh: "പുതിയത്",
    good: "നല്ലത്",
    fair: "ശരാശരി",

    // Weather
    weatherUpdates: "കാലാവസ്ഥാ അപ്‌ഡേറ്റുകൾ",
    currentWeather: "നിലവിലെ കാലാവസ്ഥ",
    forecast: "പ്രവചനം",
    temperature: "താപനില",
    humidity: "ആർദ്രത",
    rainfall: "മഴ",
    windSpeed: "കാറ്റിന്റെ വേഗത",
    visibility: "ദൃശ്യത",
    uvIndex: "UV ഇൻഡെക്സ്",
    pressure: "സമ്മർദ്ദം",
    feelsLike: "അനുഭവപ്പെടുന്നത്",
    condition: "അവസ്ഥ",
    weatherAlerts: "കാലാവസ്ഥാ അലേർട്ടുകൾ",
    farmingRecommendations: "കൃഷി ശുപാർശകൾ",
    weatherHistory: "കാലാവസ്ഥാ ചരിത്രം",
    irrigationSchedule: "കൃഷി ജലസേചന ഷെഡ്യൂൾ",
    pestControl: "കീട നിയന്ത്രണം",
    harvestTiming: "വിളവെടുക്കാനുള്ള സമയം",
    averageTemperature: "ശരാശരി താപനില",
    totalRainfall: "മൊത്തം മഴ",
    sunnyDays: "സൂര്യപ്രകാശ ദിവസങ്ങൾ",
    rainyDays: "മഴയുള്ള ദിവസങ്ങൾ",

    // Carbon Credits
    carbonCreditProgram: "കാർബൺ ക്രെഡിറ്റ് പ്രോഗ്രാം",
    myCredits: "എന്റെ ക്രെഡിറ്റുകൾ",
    calculateCredits: "ക്രെഡിറ്റുകൾ കണക്കാക്കുക",
    sellCredits: "ക്രെഡിറ്റുകൾ വിൽക്കുക",
    creditValue: "ക്രെഡിറ്റ് മൂല്യം",
    overview: "അവലോകനം",
    recentCredits: "സമീപകാല ക്രെഡിറ്റുകൾ",
    recentCarbonCredits: "സമീപകാല കാർബൺ ക്രെഡിറ്റുകൾ",
    recentActivities: "നിങ്ങളുടെ പുതിയ കാർബൺ ക്രെഡിറ്റ് പ്രവർത്തനങ്ങൾ",
    creditsReadyToSell: "വിൽക്കാൻ തയ്യാറായ ക്രെഡിറ്റുകൾ",
    marketPerCredit: "പ്രതി ക്രെഡിറ്റ് (നിലവിലെ നിരക്ക്)",
    creditsLabel: "ക്രെഡിറ്റുകൾ",

    noTillFarming: "നോ-ടിൽ ഫാർമിംഗ്",
    coverCropping: "കവർ ക്രോപ്പിംഗ്",
    agroforestry: "അഗ്രോഫോറസ്ട്രി",
    precisionIrrigation: "പ്രിസിഷൻ ഇറിഗേഷൻ",
    renewableEnergy: "പുനരുപയോഗ ഊർജ്ജം",
    composting: "കമ്പോസ്റ്റിംഗ്",
    creditsPerAcre: "ഏക്കറിന് ക്രെഡിറ്റുകൾ",
    implementation: "നടപ്പാക്കൽ",
    benefits: "ഗുണങ്ങൾ",
    availableCredits: "ലഭ്യമായ ക്രെഡിറ്റുകൾ",
    creditMarketPrice: "വിപണി വില",
    listForSale: "വിൽപ്പനയ്ക്ക് ലിസ്റ്റ് ചെയ്യുക",
    recentSales: "സമീപകാല വിൽപ്പനകൾ",
    whyParticipate: "കാർബൺ ക്രെഡിറ്റുകളിൽ എന്തുകൊണ്ട് പങ്കാളിയാകണം?",
    additionalIncome: "അധിക വരുമാനം",
    environmentalImpact: "പരിസ്ഥിതി സ്വാധീനം",
    verifiedPractices: "സ്ഥിരീകരിച്ച പ്രവർത്തനങ്ങൾ",

    // Footer
    aboutUs: "ഞങ്ങളെ കുറിച്ച്",
    ourMission: "ഞങ്ങളുടെ ദൗത്യം",
    contactUs: "ഞങ്ങളെ ബന്ധപ്പെടുക",
    support: "സഹായം",
    helpCenter: "സഹായ കേന്ദ്രം",
    faq: "പതിവ് ചോദ്യങ്ങൾ",
    documentation: "ഡോക്യുമെന്റേഷൻ",
    api: "API",
    developers: "ഡെവലപ്പർമാർ",
    partners: "പങ്കാളികൾ",
    careers: "കരിയർ",
    blog: "ബ്ലോഗ്",
    news: "വാർത്തകൾ",
    press: "പ്രസ്",
    socialMedia: "സോഷ്യൽ മീഡിയ",
    followUs: "ഞങ്ങളെ ഫോളോ ചെയ്യുക",
    newsletter: "ന്യൂസ് ലെറ്റർ",
    subscribe: "സബ്സ്ക്രൈബ് ചെയ്യുക",
    copyright: "കോപ്പിറൈറ്റ്",
    allRightsReserved: "എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു",
    madeWith: "നിർമ്മിച്ചത്",
    forFarmers: "കർഷകരുടെ വേണ്ടി",
    products: "ഉൽപ്പന്നങ്ങൾ",
    legal: "നിയമപരമായ",
    cookiePolicy: "കുക്കി നയം",
    dataProtection: "ഡേറ്റാ സംരക്ഷണം",
    accessibility: "സാധ്യത",
    enterYourEmail: "നിങ്ങളുടെ ഇമെയിൽ എഴുതുക",

    // Homepage
    heroTitle: "അഗ്രിവൈസിലേക്ക് സ്വാഗതം",
    heroSubtitle:
      "AI-ചാലിത വിള ശുപാർശകൾ, ബഹുഭാഷാ പിന്തുണ, സുസ്ഥിര കൃഷിക്കുള്ള മാർക്കറ്റ്പ്ലേസ് എന്നിവയുള്ള നിങ്ങളുടെ സ്മാർട്ട് കൃഷി കൂട്ടാളി.",
    everythingYouNeed: "സ്മാർട്ട് കൃഷിക്ക് നിങ്ങൾക്ക് ആവശ്യമുള്ളതെല്ലാം",
    whyChooseAgriWise: "എന്തുകൊണ്ട് അഗ്രിവൈസ് തിരഞ്ഞെടുക്കണം?",
    increasedYield: "വർദ്ധിച്ച വിളവ്",
    communitySupport: "കമ്മ്യൂണിറ്റി സഹായം",
    sustainablePractices: "സുസ്ഥിര പ്രവർത്തനങ്ങൾ",
    mobileFirstDesign: "മൊബൈൽ-ഫസ്റ്റ് ഡിസൈൻ",
    readyToTransform: "നിങ്ങളുടെ കൃഷി മാറ്റാൻ തയ്യാറാണോ?",
    joinThousands: "ഇതിനകം അഗ്രിവൈസ് ഉപയോഗിക്കുന്ന ആയിരക്കണക്കിന് കർഷകരുമായി ചേരുക.",
    startFreeTrial: "സൗജന്യ ട്രയൽ ആരംഭിക്കുക",
    browseMarketplace: "മാർക്കറ്റ്പ്ലേസ് ബ്രൗസ് ചെയ്യുക",
    farmersConnected: "കർഷകർ ബന്ധിപ്പിച്ചു",
    cropVarieties: "വിള വിഭാഗങ്ങൾ",
    creditsGenerated: "ക്രെഡിറ്റുകൾ സൃഷ്ടിച്ചു",
    successRate: "വിജയ നിരക്ക്",
    featureDescCropRecommendations:
      "മണ്ണ്, സ്ഥലം, കാലാവസ്ഥാ അനുസരിച്ച് ബെസ്റ്റ് വിളകൾ തെരഞ്ഞെടുക്കാൻ AI-ചാലിത ശുപാർശകൾ.",
    featureDescChatAssistant: "തൽക്ഷണ ഫാർമിംഗ് ഉപദേശം നൽകുന്ന ബഹുഭാഷാ ചാറ്റ് അസിസ്റ്റന്റ്.",
    featureDescMarketplace:
      "നീങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ വിൽക്കുക, ന്യായമായ വിലക്കായി ബിഡിംഗ് സംവിധാനത്തോടെ ഇനങ്ങൾ ബ്രൗസ് ചെയ്യുക.",
    featureDescWeather:
      "നിങ്ങളുടെ കൃഷി തീരുമാനങ്ങളിൽ സഹായിക്കുന്ന സമയോചിത കാലാവസ്ഥാ അറിയിപ്പുകൾ.",
    featureDescCarbonCredits:
      "സുസ്ഥിര രീതികൾ വഴി അധിക വരുമാനം ഉണ്ടാക്കൂ; കാർബൺ ക്രെഡിറ്റ് പ്രോഗ്രാമിൽ പങ്കാളിയാവൂ.",
    featuresIntro:
      "നിങ്ങൾക്ക് അറിവുള്ള കൃഷി തീരുമാനങ്ങൾ സംഘടിപ്പിക്കാൻ ഞങ്ങളുടെ സമഗ്ര പ്ലാറ്റ്ഫോം എല്ലാ ഉപകരണങ്ങളും വിഭവങ്ങളും ലഭ്യമാക്കുന്നു.",
    benefitsYieldDesc:
      "AI-ചാലിത ശുപാർശകൾ നിങ്ങൾക്ക് പരമാവധി ഉൽപ്പാദനക്ഷമതയ്‌ക്കും ലാഭത്തിനും അനുയോജ്യമായ വിളകൾ തിരഞ്ഞെടുക്കാൻ സഹായിക്കുന്നു.",
    benefitsCommunityDesc:
      "ഒപ്പം കർഷകരുമായി ബന്ധപ്പെടുക, ബഹുഭാഷാ ചാറ്റ് അസിസ്റ്റന്റെ വഴി വിദഗ്ധ സഹായം നേടുക.",
    benefitsSustainabilityDesc:
      "സുസ്ഥിര കൃഷി പ്രയോഗങ്ങൾ വഴി കാർബൺ ക്രെഡിറ്റുകൾ സമ്പാദിക്കുക; പരിസ്ഥിതിക്ക് സംഭാവന നൽകുക.",
    mobileAvailability: "ഇംഗ്ലീഷ്, ഹിന്ദി & മലയാളത്തിൽ ലഭ്യമാണ്",
    // Error pages
    errorTitle: "എന്തോ തെറ്റ് സംഭവിച്ചു",
    errorMessage:
      "ഒരു അനपेക്ഷിത പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ പ്രശ്നം തുടർന്നാൽ പിന്തുണയുമായി ബന്ധപ്പെടുക.",
    retry: "മറുപടി ശ്രമിക്കുക",
    goHome: "ഹോംൽ പോകുക",
    notFoundTitle: "പേജ് കണ്ടെത്തിയില്ല",
    notFoundMessage:
      "നിങ്ങൾ അന്വേഷിച്ച പേജ് കണ്ടെത്താനായില്ല. URL പരിശോധിക്കുക അല്ലെങ്കിൽ ഹോംപേജിലേക്ക് മടങ്ങുക.",
  },
};
