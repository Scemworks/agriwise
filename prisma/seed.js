/* Prisma seed script
  Run with: node prisma/seed.js  (or via `pnpm prisma:seed` if configured)
*/
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const indianStates = [
  { name: 'Andhra Pradesh', code: 'AP' },
  { name: 'Arunachal Pradesh', code: 'AR' },
  { name: 'Assam', code: 'AS' },
  { name: 'Bihar', code: 'BR' },
  { name: 'Chhattisgarh', code: 'CG' },
  { name: 'Goa', code: 'GA' },
  { name: 'Gujarat', code: 'GJ' },
  { name: 'Haryana', code: 'HR' },
  { name: 'Himachal Pradesh', code: 'HP' },
  { name: 'Jharkhand', code: 'JH' },
  { name: 'Karnataka', code: 'KA' },
  { name: 'Kerala', code: 'KL' },
  { name: 'Madhya Pradesh', code: 'MP' },
  { name: 'Maharashtra', code: 'MH' },
  { name: 'Manipur', code: 'MN' },
  { name: 'Meghalaya', code: 'ML' },
  { name: 'Mizoram', code: 'MZ' },
  { name: 'Nagaland', code: 'NL' },
  { name: 'Odisha', code: 'OR' },
  { name: 'Punjab', code: 'PB' },
  { name: 'Rajasthan', code: 'RJ' },
  { name: 'Sikkim', code: 'SK' },
  { name: 'Tamil Nadu', code: 'TN' },
  { name: 'Telangana', code: 'TG' },
  { name: 'Tripura', code: 'TR' },
  { name: 'Uttar Pradesh', code: 'UP' },
  { name: 'Uttarakhand', code: 'UK' },
  { name: 'West Bengal', code: 'WB' },
  { name: 'Andaman and Nicobar Islands', code: 'AN' },
  { name: 'Chandigarh', code: 'CH' },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', code: 'DH' },
  { name: 'Delhi', code: 'DL' },
  { name: 'Jammu and Kashmir', code: 'JK' },
  { name: 'Ladakh', code: 'LA' },
  { name: 'Lakshadweep', code: 'LD' },
  { name: 'Puducherry', code: 'PY' }
]

const majorCities = {
  'Andhra Pradesh': [
   { name: 'Hyderabad', pincode: '500001', latitude: 17.3850, longitude: 78.4867 },
   { name: 'Visakhapatnam', pincode: '530001', latitude: 17.6868, longitude: 83.2185 },
   { name: 'Vijayawada', pincode: '520001', latitude: 16.5062, longitude: 80.6480 },
   { name: 'Guntur', pincode: '522001', latitude: 16.3067, longitude: 80.4365 }
  ],
  'Karnataka': [
   { name: 'Bangalore', pincode: '560001', latitude: 12.9716, longitude: 77.5946 },
   { name: 'Mysore', pincode: '570001', latitude: 12.2958, longitude: 76.6394 },
   { name: 'Hubli', pincode: '580001', latitude: 15.3647, longitude: 75.1240 },
   { name: 'Mangalore', pincode: '575001', latitude: 12.9141, longitude: 74.8560 }
  ],
  'Tamil Nadu': [
   { name: 'Chennai', pincode: '600001', latitude: 13.0827, longitude: 80.2707 },
   { name: 'Coimbatore', pincode: '641001', latitude: 11.0168, longitude: 76.9558 },
   { name: 'Madurai', pincode: '625001', latitude: 9.9252, longitude: 78.1198 },
   { name: 'Tiruchirapalli', pincode: '620001', latitude: 10.7905, longitude: 78.7047 }
  ],
  'Kerala': [
   { name: 'Thiruvananthapuram', pincode: '695001', latitude: 8.5241, longitude: 76.9366 },
   { name: 'Kollam', pincode: '691001', latitude: 8.8932, longitude: 76.6141 },
   { name: 'Pathanamthitta', pincode: '689645', latitude: 9.2648, longitude: 76.7878 },
   { name: 'Alappuzha', pincode: '688001', latitude: 9.4981, longitude: 76.3388 },
   { name: 'Kottayam', pincode: '686001', latitude: 9.5916, longitude: 76.5222 },
   { name: 'Idukki', pincode: '685607', latitude: 9.8794, longitude: 77.1494 },
   { name: 'Ernakulam', pincode: '682001', latitude: 9.9816, longitude: 76.2999 },
   { name: 'Thrissur', pincode: '680001', latitude: 10.5276, longitude: 76.2144 },
   { name: 'Palakkad', pincode: '678001', latitude: 10.7867, longitude: 76.6538 },
   { name: 'Malappuram', pincode: '676505', latitude: 11.0735, longitude: 76.0743 },
   { name: 'Kozhikode', pincode: '673001', latitude: 11.2588, longitude: 75.7804 },
   { name: 'Wayanad', pincode: '673121', latitude: 11.6141, longitude: 76.0825 },
   { name: 'Kannur', pincode: '670001', latitude: 11.8745, longitude: 75.3704 },
   { name: 'Kasaragod', pincode: '671121', latitude: 12.5000, longitude: 74.9900 }
  ],
  'Maharashtra': [
   { name: 'Mumbai', pincode: '400001', latitude: 19.0760, longitude: 72.8777 },
   { name: 'Pune', pincode: '411001', latitude: 18.5204, longitude: 73.8567 },
   { name: 'Nagpur', pincode: '440001', latitude: 21.1458, longitude: 79.0882 },
   { name: 'Nashik', pincode: '422001', latitude: 19.9975, longitude: 73.7898 }
  ],
  'Gujarat': [
   { name: 'Ahmedabad', pincode: '380001', latitude: 23.0225, longitude: 72.5714 },
   { name: 'Surat', pincode: '395001', latitude: 21.1702, longitude: 72.8311 },
   { name: 'Vadodara', pincode: '390001', latitude: 22.3072, longitude: 73.1812 },
   { name: 'Rajkot', pincode: '360001', latitude: 22.3039, longitude: 70.8022 }
  ],
  'Rajasthan': [
   { name: 'Jaipur', pincode: '302001', latitude: 26.9124, longitude: 75.7873 },
   { name: 'Jodhpur', pincode: '342001', latitude: 26.2389, longitude: 73.0243 },
   { name: 'Udaipur', pincode: '313001', latitude: 24.5854, longitude: 73.7125 },
   { name: 'Kota', pincode: '324001', latitude: 25.2138, longitude: 75.8648 }
  ],
  'Uttar Pradesh': [
   { name: 'Lucknow', pincode: '226001', latitude: 26.8467, longitude: 80.9462 },
   { name: 'Kanpur', pincode: '208001', latitude: 26.4499, longitude: 80.3319 },
   { name: 'Agra', pincode: '282001', latitude: 27.1767, longitude: 78.0081 },
   { name: 'Varanasi', pincode: '221001', latitude: 25.3176, longitude: 82.9739 }
  ],
  'West Bengal': [
   { name: 'Kolkata', pincode: '700001', latitude: 22.5726, longitude: 88.3639 },
   { name: 'Asansol', pincode: '713301', latitude: 23.6739, longitude: 86.9524 },
   { name: 'Siliguri', pincode: '734001', latitude: 26.7271, longitude: 88.3953 },
   { name: 'Durgapur', pincode: '713201', latitude: 23.5500, longitude: 87.3200 }
  ],
  'Punjab': [
   { name: 'Chandigarh', pincode: '160001', latitude: 30.7333, longitude: 76.7794 },
   { name: 'Ludhiana', pincode: '141001', latitude: 30.9010, longitude: 75.8573 },
   { name: 'Amritsar', pincode: '143001', latitude: 31.6340, longitude: 74.8723 },
   { name: 'Jalandhar', pincode: '144001', latitude: 31.3260, longitude: 75.5762 }
  ],
  'Haryana': [
   { name: 'Gurgaon', pincode: '122001', latitude: 28.4595, longitude: 77.0266 },
   { name: 'Faridabad', pincode: '121001', latitude: 28.4089, longitude: 77.3178 },
   { name: 'Panipat', pincode: '132103', latitude: 29.3909, longitude: 76.9635 },
   { name: 'Hisar', pincode: '125001', latitude: 29.1492, longitude: 75.7217 }
  ],
  'Madhya Pradesh': [
   { name: 'Bhopal', pincode: '462001', latitude: 23.2599, longitude: 77.4126 },
   { name: 'Indore', pincode: '452001', latitude: 22.7196, longitude: 75.8577 },
   { name: 'Gwalior', pincode: '474001', latitude: 26.2183, longitude: 78.1828 },
   { name: 'Jabalpur', pincode: '482001', latitude: 23.1815, longitude: 79.9864 }
  ],
  'Delhi': [
   { name: 'New Delhi', pincode: '110001', latitude: 28.6139, longitude: 77.2090 },
   { name: 'Delhi', pincode: '110001', latitude: 28.7041, longitude: 77.1025 }
  ]
}

async function seedIndiaData(prismaClient) {
  console.log('🌱 Seeding Indian states and cities...')
  for (const stateData of indianStates) {
   const state = await prismaClient.state.upsert({
    where: { code: stateData.code },
    update: {},
    create: stateData
   })
   console.log(`✅ Created state: ${state.name}`)

   const cities = majorCities[stateData.name] || []
   for (const cityData of cities) {
    await prismaClient.city.upsert({
      where: {
       name_stateId: {
        name: cityData.name,
        stateId: state.id
       }
      },
      update: {},
      create: {
       name: cityData.name,
       pincode: cityData.pincode,
       latitude: cityData.latitude,
       longitude: cityData.longitude,
       stateId: state.id
      }
    })
    console.log(`  ✅ Created city: ${cityData.name}`)
   }
  }
  console.log('🎉 Successfully seeded Indian states and cities!')
}

async function main() {
  const password = 'password123'
  const passwordHash = await bcrypt.hash(password, 10)

  let user = await prisma.user.findUnique({ where: { email: 'demo@agriwise.local' } })
  if (!user) {
   user = await prisma.user.create({
    data: {
      email: 'demo@agriwise.local',
      name: 'Demo Farmer',
      passwordHash,
    }
   })

   console.log('Created demo user: demo@agriwise.local / password123')
  } else {
   console.log('Demo user already exists: demo@agriwise.local')
  }

  // Create a buyer user for bidding/demo (idempotent)
  let buyer = await prisma.user.findUnique({ where: { email: 'buyer@agriwise.local' } })
  if (!buyer) {
   buyer = await prisma.user.create({
    data: {
      email: 'buyer@agriwise.local',
      name: 'Demo Buyer',
      passwordHash,
    }
   })
   console.log('Created demo buyer: buyer@agriwise.local / password123')
  } else {
   console.log('Demo buyer already exists: buyer@agriwise.local')
  }

  // Create sample categories
  const vegCat = await prisma.category.upsert({
   where: { slug: 'vegetables' },
   update: {},
   create: { name: 'Vegetables', slug: 'vegetables' }
  })

  const grainCat = await prisma.category.upsert({
   where: { slug: 'grains' },
   update: {},
   create: { name: 'Grains', slug: 'grains' }
  })

  const fruitsCat = await prisma.category.upsert({
   where: { slug: 'fruits' },
   update: {},
   create: { name: 'Fruits', slug: 'fruits' }
  })

  const seedsCat = await prisma.category.upsert({
   where: { slug: 'seeds' },
   update: {},
   create: { name: 'Seeds', slug: 'seeds' }
  })

  // Create sample products
  // Create sample products if they don't exist
  let tomato = await prisma.product.findFirst({ where: { name: 'Fresh Tomatoes', sellerId: user.id } })
  if (!tomato) {
   tomato = await prisma.product.create({
    data: {
      name: 'Fresh Tomatoes',
      description: 'Locally grown ripe tomatoes',
      condition: 'Fresh',
      price: 20.0,
      quantity: 100,
      categoryId: vegCat.id,
      sellerId: user.id,
      images: {
       create: [
        { url: 'https://via.placeholder.com/400x300.png?text=Tomato+1', alt: 'Tomato 1' },
        { url: 'https://via.placeholder.com/400x300.png?text=Tomato+2', alt: 'Tomato 2' }
       ]
      }
    }
   })
  }

  let rice = await prisma.product.findFirst({ where: { name: 'White Rice', sellerId: user.id } })
  if (!rice) {
   rice = await prisma.product.create({
    data: {
      name: 'White Rice',
      description: 'High-quality milled rice',
      condition: 'Good',
      price: 40.0,
      quantity: 50,
      categoryId: grainCat.id,
      sellerId: user.id,
      images: {
       create: [{ url: 'https://via.placeholder.com/400x300.png?text=Rice', alt: 'Rice' }]
      }
    }
   })
  }

  let mango = await prisma.product.findFirst({ where: { name: 'Alphonso Mangoes (1 dozen)', sellerId: user.id } })
  if (!mango) {
   mango = await prisma.product.create({
    data: {
      name: 'Alphonso Mangoes (1 dozen)',
      description: 'Sweet Alphonso mangoes from Maharashtra',
      condition: 'Fresh',
      price: 150.0,
      quantity: 10,
      categoryId: fruitsCat.id,
      sellerId: user.id,
      images: { create: [{ url: 'https://via.placeholder.com/400x300.png?text=Mango', alt: 'Mango' }] }
    }
   })
  }

  let seeds = await prisma.product.findFirst({ where: { name: 'Tomato Hybrid Seeds (1000 seeds)', sellerId: user.id } })
  if (!seeds) {
   seeds = await prisma.product.create({
    data: {
      name: 'Tomato Hybrid Seeds (1000 seeds)',
      description: 'High yield hybrid tomato seeds',
      condition: 'Fresh',
      price: 450.0,
      quantity: 5000,
      categoryId: seedsCat.id,
      sellerId: user.id,
      images: { create: [{ url: 'https://via.placeholder.com/400x300.png?text=Seeds', alt: 'Seeds' }] }
    }
   })
  }

  // Create or reuse an auction listing for tomatoes
  let tomatoListing = await prisma.listing.findFirst({ where: { productId: tomato.id, type: 'auction' } })
  if (!tomatoListing) {
   tomatoListing = await prisma.listing.create({
    data: {
      type: 'auction',
      startingBid: 10.0,
      buyNowPrice: 50.0,
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
      productId: tomato.id,
    }
   })
  }

  // Create one bid from the buyer if none exist
  const existingBid = await prisma.bid.findFirst({ where: { listingId: tomatoListing.id } })
  if (!existingBid) {
   await prisma.bid.create({
    data: {
      amount: 12.0,
      bidderId: buyer.id,
      listingId: tomatoListing.id,
    }
   })
  }

  console.log('Seeded sample categories, products, listing and bid')

  // Create a sample farm for the user
  let farm = await prisma.farm.findFirst({ where: { name: 'Demo Farm', ownerId: user.id } })
  if (!farm) {
   farm = await prisma.farm.create({
    data: {
      name: 'Demo Farm',
      location: 'Kerala, India',
      soilType: 'Loamy Soil',
      landSize: 5.0,
      currentCrops: 'Rice,Coconut',
      ownerId: user.id,
    }
   })
  }

  // Create a few weather records
  await prisma.weatherRecord.createMany({
   data: [
    {
      farmId: farm.id,
      recordedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      temperature: 28,
      humidity: 75,
      rainfall: 10,
      windSpeed: 12,
      condition: 'Partly Cloudy',
    },
    {
      farmId: farm.id,
      recordedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      temperature: 30,
      humidity: 70,
      rainfall: 0,
      windSpeed: 8,
      condition: 'Sunny',
    }
   ]
  })

  // Create sample carbon credits
  await prisma.carbonCredit.createMany({
   data: [
    {
      practice: 'No-Till Farming',
      credits: 150,
      value: 1500,
      status: 'active',
      date: new Date('2024-01-10'),
      description: 'No-till practice on part of the farm',
      ownerId: user.id,
      farmId: farm.id
    },
    {
      practice: 'Cover Cropping',
      credits: 200,
      value: 2000,
      status: 'sold',
      date: new Date('2024-01-05'),
      description: 'Cover cropping over winter',
      ownerId: user.id,
      farmId: farm.id
    }
   ]
  })

  // Create some sample chat messages
  await prisma.chatMessage.createMany({
   data: [
    { sender: 'BOT', text: 'Hello! I\'m your AI farming assistant. How can I help?', userId: user.id, timestamp: new Date() },
    { sender: 'USER', text: 'How to improve rice yield?', userId: user.id, timestamp: new Date() }
   ]
  })

  // Create some recent activities
  await prisma.activity.createMany({
   data: [
    { userId: user.id, action: 'Crop recommendation generated', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { userId: user.id, action: 'New message in chat', time: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    { userId: user.id, action: 'Product listed in marketplace', time: new Date(Date.now() - 24 * 60 * 60 * 1000) }
   ]
  })

  console.log('Seeded farm, weather, carbon credits, chat messages, and activities')

  // Seed Indian states and cities using the same Prisma client
  await seedIndiaData(prisma)
}

main()
  .catch((e) => {
   console.error(e)
   process.exit(1)
  })
  .finally(async () => {
   await prisma.$disconnect()
  })
