// Demo data for SIH 2025 presentation
export const demoData = {
  // User profile data
  user: {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    location: 'Kerala, India',
    soilType: 'Loamy Soil',
    landSize: 5,
    currentCrops: 'Rice, Coconut',
    joinDate: '2024-01-15',
    totalCredits: 1250,
    creditsValue: 12500
  },

  // Weather data
  weather: {
    current: {
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 75,
      windSpeed: 12,
      visibility: 10,
      uvIndex: 6,
      pressure: 1013,
      feelsLike: 32
    },
    forecast: [
      { date: '2024-01-15', high: 32, low: 24, condition: 'Sunny', precipitation: 0, windSpeed: 8 },
      { date: '2024-01-16', high: 30, low: 23, condition: 'Partly Cloudy', precipitation: 20, windSpeed: 10 },
      { date: '2024-01-17', high: 28, low: 22, condition: 'Rainy', precipitation: 80, windSpeed: 15 },
      { date: '2024-01-18', high: 29, low: 21, condition: 'Cloudy', precipitation: 40, windSpeed: 12 },
      { date: '2024-01-19', high: 31, low: 23, condition: 'Sunny', precipitation: 5, windSpeed: 6 }
    ],
    alerts: [
      {
        id: '1',
        type: 'warning',
        title: 'Heavy Rain Warning',
        description: 'Heavy rainfall expected in the next 24 hours. Take necessary precautions for your crops.',
        time: '2 hours ago'
      },
      {
        id: '2',
        type: 'info',
        title: 'Optimal Planting Conditions',
        description: 'Current weather conditions are ideal for planting rice and vegetables.',
        time: '1 day ago'
      },
      {
        id: '3',
        type: 'success',
        title: 'Harvest Weather',
        description: 'Perfect weather for harvesting your current crops. Low humidity and clear skies.',
        time: '3 days ago'
      }
    ]
  },

  // Crop recommendations
  cropRecommendations: [
    {
      name: 'Rice',
      suitability: 95,
      advantages: [
        'High yield potential in your soil type',
        'Good market demand',
        'Suitable for your climate',
        'Water requirements match availability'
      ],
      disadvantages: [
        'Requires consistent water supply',
        'Susceptible to certain pests'
      ],
      expectedYield: '4-6 tons per acre',
      marketPrice: '₹2,500-3,000 per quintal',
      plantingTime: 'June-July',
      harvestingTime: 'October-November'
    },
    {
      name: 'Coconut',
      suitability: 88,
      advantages: [
        'Long-term crop with stable income',
        'Multiple products (copra, oil, water)',
        'Drought resistant',
        'Good for your soil type'
      ],
      disadvantages: [
        'Long gestation period',
        'Requires regular maintenance'
      ],
      expectedYield: '80-100 nuts per tree per year',
      marketPrice: '₹15-25 per nut',
      plantingTime: 'May-June',
      harvestingTime: 'Year-round'
    },
    {
      name: 'Banana',
      suitability: 82,
      advantages: [
        'Quick returns (12-15 months)',
        'High nutritional value',
        'Good market demand',
        'Suitable for your climate'
      ],
      disadvantages: [
        'Requires regular irrigation',
        'Susceptible to wind damage'
      ],
      expectedYield: '25-30 kg per bunch',
      marketPrice: '₹40-60 per kg',
      plantingTime: 'March-April',
      harvestingTime: '12-15 months'
    }
  ],

  // Marketplace products
  marketplaceProducts: [
    {
      id: '1',
      name: 'Organic Basmati Rice',
      price: 2500,
      originalPrice: 2800,
      seller: 'Rajesh Kumar',
      location: 'Punjab, India',
      rating: 4.8,
      reviews: 124,
      quantity: '50 kg',
      description: 'Premium quality organic basmati rice, freshly harvested. No pesticides used.',
      category: 'Grains',
      isAuction: false,
      condition: 'Fresh',
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      name: 'Fresh Mangoes (Alphonso)',
      price: 120,
      seller: 'Priya Sharma',
      location: 'Maharashtra, India',
      rating: 4.6,
      reviews: 89,
      quantity: '1 dozen',
      description: 'Sweet and juicy Alphonso mangoes, perfect for eating or making desserts.',
      category: 'Fruits',
      isAuction: true,
      timeLeft: '2 days left',
      bids: 15,
      condition: 'Fresh',
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: 'Coconut Oil (Cold Pressed)',
      price: 180,
      seller: 'Kerala Farms',
      location: 'Kerala, India',
      rating: 4.9,
      reviews: 203,
      quantity: '1 liter',
      description: 'Pure cold-pressed coconut oil, extracted from fresh coconuts.',
      category: 'Spices',
      isAuction: false,
      condition: 'Good',
      image: '/api/placeholder/300/200'
    },
    {
      id: '4',
      name: 'Tractor (Used)',
      price: 250000,
      seller: 'Farm Equipment Co.',
      location: 'Haryana, India',
      rating: 4.5,
      reviews: 45,
      quantity: '1 unit',
      description: 'Well-maintained tractor, 2 years old. Perfect for small to medium farms.',
      category: 'Equipment',
      isAuction: true,
      timeLeft: '5 days left',
      bids: 8,
      condition: 'Good',
      image: '/api/placeholder/300/200'
    },
    {
      id: '5',
      name: 'Tomato Seeds (Hybrid)',
      price: 450,
      seller: 'Seed Solutions',
      location: 'Karnataka, India',
      rating: 4.7,
      reviews: 156,
      quantity: '1000 seeds',
      description: 'High-yield hybrid tomato seeds, disease-resistant variety.',
      category: 'Seeds',
      isAuction: false,
      condition: 'Fresh',
      image: '/api/placeholder/300/200'
    },
    {
      id: '6',
      name: 'Fresh Milk (Buffalo)',
      price: 60,
      seller: 'Dairy Farm',
      location: 'Rajasthan, India',
      rating: 4.8,
      reviews: 78,
      quantity: '1 liter',
      description: 'Fresh buffalo milk, collected daily. Rich in nutrients and protein.',
      category: 'Livestock',
      isAuction: false,
      condition: 'Fresh',
      image: '/api/placeholder/300/200'
    }
  ],

  // Carbon credits
  carbonCredits: [
    {
      id: '1',
      practice: 'No-Till Farming',
      credits: 150,
      value: 1500,
      status: 'active',
      date: '2024-01-10',
      description: 'Implemented no-till farming on 5 acres'
    },
    {
      id: '2',
      practice: 'Cover Cropping',
      credits: 200,
      value: 2000,
      status: 'sold',
      date: '2024-01-05',
      description: 'Cover crops planted during off-season'
    },
    {
      id: '3',
      practice: 'Agroforestry',
      credits: 300,
      value: 3000,
      status: 'pending',
      date: '2024-01-15',
      description: 'Tree planting program initiated'
    }
  ],

  // Chat messages
  chatMessages: [
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. How can I help you with your agricultural questions today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ],

  // Recent activity
  recentActivity: [
    {
      action: 'Crop recommendation generated',
      time: '2 hours ago',
      icon: 'Sprout'
    },
    {
      action: 'New message in chat',
      time: '4 hours ago',
      icon: 'MessageCircle'
    },
    {
      action: 'Product listed in marketplace',
      time: '1 day ago',
      icon: 'ShoppingCart'
    },
    {
      action: 'Weather alert received',
      time: '2 days ago',
      icon: 'Cloud'
    }
  ],

  // Quick questions for chat
  quickQuestions: [
    'How to increase rice yield?',
    'Best time to plant coconut?',
    'How to control pests naturally?',
    'What fertilizers to use?',
    'How to get carbon credits?',
    'Market prices for crops'
  ],

  // Sustainable practices
  sustainablePractices: [
    {
      id: '1',
      name: 'No-Till Farming',
      description: 'Planting crops without disturbing the soil through tillage',
      creditsPerAcre: 0.3,
      implementation: 'Use direct seeding equipment and maintain soil cover',
      benefits: ['Reduces soil erosion', 'Improves soil health', 'Lowers fuel costs'],
      icon: 'TreePine'
    },
    {
      id: '2',
      name: 'Cover Cropping',
      description: 'Growing crops to cover soil during off-seasons',
      creditsPerAcre: 0.4,
      implementation: 'Plant cover crops like legumes or grasses between main crops',
      benefits: ['Prevents soil erosion', 'Adds organic matter', 'Fixes nitrogen'],
      icon: 'Leaf'
    },
    {
      id: '3',
      name: 'Agroforestry',
      description: 'Integrating trees and shrubs with crops and livestock',
      creditsPerAcre: 0.6,
      implementation: 'Plant trees in rows or scattered throughout the farm',
      benefits: ['Carbon sequestration', 'Biodiversity', 'Additional income'],
      icon: 'TreePine'
    },
    {
      id: '4',
      name: 'Precision Irrigation',
      description: 'Using water efficiently through smart irrigation systems',
      creditsPerAcre: 0.2,
      implementation: 'Install drip irrigation and soil moisture sensors',
      benefits: ['Water conservation', 'Reduced energy use', 'Better crop yields'],
      icon: 'Droplets'
    },
    {
      id: '5',
      name: 'Renewable Energy',
      description: 'Using solar or wind power for farm operations',
      creditsPerAcre: 0.5,
      implementation: 'Install solar panels or wind turbines',
      benefits: ['Clean energy', 'Reduced costs', 'Energy independence'],
      icon: 'Sun'
    },
    {
      id: '6',
      name: 'Composting',
      description: 'Converting organic waste into nutrient-rich compost',
      creditsPerAcre: 0.1,
      implementation: 'Create compost piles from farm and kitchen waste',
      benefits: ['Waste reduction', 'Soil improvement', 'Cost savings'],
      icon: 'Leaf'
    }
  ]
}

export default demoData
