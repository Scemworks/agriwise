/* Prisma seed script
   Run with: node prisma/seed.js  (or via `pnpm prisma:seed` if configured)
*/
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
