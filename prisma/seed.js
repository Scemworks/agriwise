/* Prisma seed script
  Run with: node prisma/seed.js  (or via `pnpm prisma:seed` if configured)
*/
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const indianStates = [
  { name: "Andhra Pradesh", code: "AP" },
  { name: "Arunachal Pradesh", code: "AR" },
  { name: "Assam", code: "AS" },
  { name: "Bihar", code: "BR" },
  { name: "Chhattisgarh", code: "CG" },
  { name: "Goa", code: "GA" },
  { name: "Gujarat", code: "GJ" },
  { name: "Haryana", code: "HR" },
  { name: "Himachal Pradesh", code: "HP" },
  { name: "Jharkhand", code: "JH" },
  { name: "Karnataka", code: "KA" },
  { name: "Kerala", code: "KL" },
  { name: "Madhya Pradesh", code: "MP" },
  { name: "Maharashtra", code: "MH" },
  { name: "Manipur", code: "MN" },
  { name: "Meghalaya", code: "ML" },
  { name: "Mizoram", code: "MZ" },
  { name: "Nagaland", code: "NL" },
  { name: "Odisha", code: "OR" },
  { name: "Punjab", code: "PB" },
  { name: "Rajasthan", code: "RJ" },
  { name: "Sikkim", code: "SK" },
  { name: "Tamil Nadu", code: "TN" },
  { name: "Telangana", code: "TG" },
  { name: "Tripura", code: "TR" },
  { name: "Uttar Pradesh", code: "UP" },
  { name: "Uttarakhand", code: "UK" },
  { name: "West Bengal", code: "WB" },
  { name: "Andaman and Nicobar Islands", code: "AN" },
  { name: "Chandigarh", code: "CH" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", code: "DH" },
  { name: "Delhi", code: "DL" },
  { name: "Jammu and Kashmir", code: "JK" },
  { name: "Ladakh", code: "LA" },
  { name: "Lakshadweep", code: "LD" },
  { name: "Puducherry", code: "PY" },
];

const majorCities = {
  "Andhra Pradesh": [
    { name: "Visakhapatnam" },
    { name: "Vijayawada" },
    { name: "Guntur" },
    { name: "Nellore" },
    { name: "Kurnool" },
    { name: "Kakinada" },
    { name: "Rajahmundry" },
    { name: "Tirupati" },
    { name: "Kadapa" },
    { name: "Anantapur" },
    { name: "Eluru" },
    { name: "Ongole" },
    { name: "Nandyal" },
  ],
  "Arunachal Pradesh": [
    { name: "Itanagar" },
    { name: "Naharlagun" },
    { name: "Pasighat" },
    { name: "Tawang" },
    { name: "Ziro" },
    { name: "Bomdila" },
    { name: "Tezu" },
    { name: "Seppa" },
  ],
  Assam: [
    { name: "Guwahati" },
    { name: "Silchar" },
    { name: "Dibrugarh" },
    { name: "Jorhat" },
    { name: "Nagaon" },
    { name: "Tinsukia" },
    { name: "Tezpur" },
    { name: "Bongaigaon" },
    { name: "Karimganj" },
    { name: "Dhubri" },
  ],
  Bihar: [
    { name: "Patna" },
    { name: "Gaya" },
    { name: "Bhagalpur" },
    { name: "Muzaffarpur" },
    { name: "Purnia" },
    { name: "Darbhanga" },
    { name: "Bihar Sharif" },
    { name: "Arrah" },
    { name: "Begusarai" },
    { name: "Katihar" },
    { name: "Munger" },
    { name: "Chhapra" },
  ],
  Chhattisgarh: [
    { name: "Raipur" },
    { name: "Bhilai" },
    { name: "Bilaspur" },
    { name: "Korba" },
    { name: "Durg" },
    { name: "Rajnandgaon" },
    { name: "Jagdalpur" },
    { name: "Raigarh" },
    { name: "Ambikapur" },
    { name: "Dhamtari" },
  ],
  Goa: [
    { name: "Panaji" },
    { name: "Margao" },
    { name: "Vasco da Gama" },
    { name: "Mapusa" },
    { name: "Ponda" },
    { name: "Bicholim" },
    { name: "Curchorem" },
  ],
  Gujarat: [
    { name: "Ahmedabad" },
    { name: "Surat" },
    { name: "Vadodara" },
    { name: "Rajkot" },
    { name: "Bhavnagar" },
    { name: "Jamnagar" },
    { name: "Junagadh" },
    { name: "Gandhinagar" },
    { name: "Anand" },
    { name: "Nadiad" },
    { name: "Morbi" },
    { name: "Bharuch" },
    { name: "Vapi" },
  ],
  Haryana: [
    { name: "Gurgaon" },
    { name: "Faridabad" },
    { name: "Panipat" },
    { name: "Hisar" },
    { name: "Ambala" },
    { name: "Karnal" },
    { name: "Rohtak" },
    { name: "Sonipat" },
    { name: "Panchkula" },
    { name: "Yamunanagar" },
    { name: "Bhiwani" },
  ],
  "Himachal Pradesh": [
    { name: "Shimla" },
    { name: "Dharamshala" },
    { name: "Solan" },
    { name: "Mandi" },
    { name: "Palampur" },
    { name: "Kullu" },
    { name: "Manali" },
    { name: "Baddi" },
    { name: "Nahan" },
    { name: "Una" },
  ],
  Jharkhand: [
    { name: "Ranchi" },
    { name: "Jamshedpur" },
    { name: "Dhanbad" },
    { name: "Bokaro" },
    { name: "Deoghar" },
    { name: "Hazaribagh" },
    { name: "Giridih" },
    { name: "Ramgarh" },
    { name: "Dumka" },
  ],
  Karnataka: [
    { name: "Bangalore" },
    { name: "Mysore" },
    { name: "Hubli" },
    { name: "Mangalore" },
    { name: "Belgaum" },
    { name: "Davanagere" },
    { name: "Bellary" },
    { name: "Bijapur" },
    { name: "Shimoga" },
    { name: "Tumkur" },
    { name: "Raichur" },
    { name: "Bidar" },
    { name: "Udupi" },
  ],
  Kerala: [
    { name: "Thiruvananthapuram" },
    { name: "Kollam" },
    { name: "Pathanamthitta" },
    { name: "Alappuzha" },
    { name: "Kottayam" },
    { name: "Idukki" },
    { name: "Ernakulam" },
    { name: "Thrissur" },
    { name: "Palakkad" },
    { name: "Malappuram" },
    { name: "Kozhikode" },
    { name: "Wayanad" },
    { name: "Kannur" },
    { name: "Kasaragod" },
  ],
  "Madhya Pradesh": [
    { name: "Bhopal" },
    { name: "Indore" },
    { name: "Gwalior" },
    { name: "Jabalpur" },
    { name: "Ujjain" },
    { name: "Sagar" },
    { name: "Dewas" },
    { name: "Satna" },
    { name: "Ratlam" },
    { name: "Rewa" },
    { name: "Katni" },
    { name: "Singrauli" },
  ],
  Maharashtra: [
    { name: "Mumbai" },
    { name: "Pune" },
    { name: "Nagpur" },
    { name: "Nashik" },
    { name: "Thane" },
    { name: "Aurangabad" },
    { name: "Solapur" },
    { name: "Kolhapur" },
    { name: "Amravati" },
    { name: "Nanded" },
    { name: "Akola" },
    { name: "Latur" },
    { name: "Dhule" },
    { name: "Ahmednagar" },
    { name: "Jalgaon" },
  ],
  Manipur: [
    { name: "Imphal" },
    { name: "Thoubal" },
    { name: "Bishnupur" },
    { name: "Churachandpur" },
    { name: "Ukhrul" },
    { name: "Senapati" },
    { name: "Kakching" },
  ],
  Meghalaya: [
    { name: "Shillong" },
    { name: "Tura" },
    { name: "Nongstoin" },
    { name: "Jowai" },
    { name: "Baghmara" },
    { name: "Williamnagar" },
  ],
  Mizoram: [
    { name: "Aizawl" },
    { name: "Lunglei" },
    { name: "Champhai" },
    { name: "Serchhip" },
    { name: "Kolasib" },
    { name: "Saiha" },
  ],
  Nagaland: [
    { name: "Kohima" },
    { name: "Dimapur" },
    { name: "Mokokchung" },
    { name: "Tuensang" },
    { name: "Wokha" },
    { name: "Zunheboto" },
    { name: "Phek" },
  ],
  Odisha: [
    { name: "Bhubaneswar" },
    { name: "Cuttack" },
    { name: "Rourkela" },
    { name: "Berhampur" },
    { name: "Sambalpur" },
    { name: "Puri" },
    { name: "Balasore" },
    { name: "Bhadrak" },
    { name: "Baripada" },
    { name: "Jharsuguda" },
  ],
  Punjab: [
    { name: "Ludhiana" },
    { name: "Amritsar" },
    { name: "Jalandhar" },
    { name: "Patiala" },
    { name: "Bathinda" },
    { name: "Mohali" },
    { name: "Pathankot" },
    { name: "Hoshiarpur" },
    { name: "Batala" },
    { name: "Moga" },
  ],
  Rajasthan: [
    { name: "Jaipur" },
    { name: "Jodhpur" },
    { name: "Udaipur" },
    { name: "Kota" },
    { name: "Ajmer" },
    { name: "Bikaner" },
    { name: "Bhilwara" },
    { name: "Alwar" },
    { name: "Sikar" },
    { name: "Bharatpur" },
    { name: "Pali" },
    { name: "Tonk" },
  ],
  Sikkim: [
    { name: "Gangtok" },
    { name: "Namchi" },
    { name: "Gyalshing" },
    { name: "Mangan" },
    { name: "Rangpo" },
    { name: "Jorethang" },
  ],
  "Tamil Nadu": [
    { name: "Chennai" },
    { name: "Coimbatore" },
    { name: "Madurai" },
    { name: "Tiruchirappalli" },
    { name: "Salem" },
    { name: "Tirunelveli" },
    { name: "Tiruppur" },
    { name: "Erode" },
    { name: "Vellore" },
    { name: "Thoothukudi" },
    { name: "Thanjavur" },
    { name: "Dindigul" },
    { name: "Kanchipuram" },
    { name: "Karur" },
  ],
  Telangana: [
    { name: "Hyderabad" },
    { name: "Warangal" },
    { name: "Nizamabad" },
    { name: "Khammam" },
    { name: "Karimnagar" },
    { name: "Mahbubnagar" },
    { name: "Nalgonda" },
    { name: "Adilabad" },
    { name: "Ramagundam" },
    { name: "Siddipet" },
  ],
  Tripura: [
    { name: "Agartala" },
    { name: "Udaipur" },
    { name: "Dharmanagar" },
    { name: "Kailashahar" },
    { name: "Ambassa" },
    { name: "Belonia" },
    { name: "Khowai" },
  ],
  "Uttar Pradesh": [
    { name: "Lucknow" },
    { name: "Kanpur" },
    { name: "Agra" },
    { name: "Varanasi" },
    { name: "Meerut" },
    { name: "Allahabad" },
    { name: "Bareilly" },
    { name: "Aligarh" },
    { name: "Moradabad" },
    { name: "Saharanpur" },
    { name: "Gorakhpur" },
    { name: "Noida" },
    { name: "Firozabad" },
    { name: "Jhansi" },
    { name: "Muzaffarnagar" },
  ],
  Uttarakhand: [
    { name: "Dehradun" },
    { name: "Haridwar" },
    { name: "Roorkee" },
    { name: "Haldwani" },
    { name: "Rudrapur" },
    { name: "Kashipur" },
    { name: "Rishikesh" },
    { name: "Nainital" },
    { name: "Pithoragarh" },
  ],
  "West Bengal": [
    { name: "Kolkata" },
    { name: "Asansol" },
    { name: "Siliguri" },
    { name: "Durgapur" },
    { name: "Bardhaman" },
    { name: "Malda" },
    { name: "Baharampur" },
    { name: "Habra" },
    { name: "Kharagpur" },
    { name: "Raiganj" },
    { name: "Jalpaiguri" },
  ],
  "Andaman and Nicobar Islands": [
    { name: "Port Blair" },
    { name: "Diglipur" },
    { name: "Rangat" },
    { name: "Car Nicobar" },
  ],
  Chandigarh: [{ name: "Chandigarh" }],
  "Dadra and Nagar Haveli and Daman and Diu": [
    { name: "Daman" },
    { name: "Diu" },
    { name: "Silvassa" },
  ],
  Delhi: [
    { name: "New Delhi" },
    { name: "Central Delhi" },
    { name: "North Delhi" },
    { name: "South Delhi" },
    { name: "East Delhi" },
    { name: "West Delhi" },
    { name: "North East Delhi" },
    { name: "North West Delhi" },
    { name: "South East Delhi" },
    { name: "South West Delhi" },
    { name: "Shahdara" },
  ],
  "Jammu and Kashmir": [
    { name: "Srinagar" },
    { name: "Jammu" },
    { name: "Anantnag" },
    { name: "Baramulla" },
    { name: "Udhampur" },
    { name: "Kathua" },
    { name: "Rajouri" },
    { name: "Sopore" },
  ],
  Ladakh: [
    { name: "Leh" },
    { name: "Kargil" },
    { name: "Nubra" },
    { name: "Zanskar" },
  ],
  Lakshadweep: [{ name: "Kavaratti" }, { name: "Agatti" }, { name: "Minicoy" }],
  Puducherry: [
    { name: "Puducherry" },
    { name: "Karaikal" },
    { name: "Yanam" },
    { name: "Mahe" },
  ],
};

async function seedIndiaData(prismaClient) {
  console.log("🌱 Seeding Indian states and cities...");
  for (const stateData of indianStates) {
    const state = await prismaClient.state.upsert({
      where: { code: stateData.code },
      update: {},
      create: stateData,
    });
    console.log(`✅ Created state: ${state.name}`);

    const cities = majorCities[stateData.name] || [];
    for (const cityData of cities) {
      await prismaClient.city.upsert({
        where: {
          name_stateId: {
            name: cityData.name,
            stateId: state.id,
          },
        },
        update: {},
        create: {
          name: cityData.name,
          stateId: state.id,
        },
      });
      console.log(`  ✅ Created city: ${cityData.name}`);
    }
  }
  console.log("🎉 Successfully seeded Indian states and cities!");
}

async function main() {
  const password = "password123";
  const passwordHash = await bcrypt.hash(password, 10);

  let user = await prisma.user.findUnique({
    where: { email: "demo@agriwise.local" },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: "demo@agriwise.local",
        name: "Demo Farmer",
        passwordHash,
      },
    });

    console.log("Created demo user: demo@agriwise.local / password123");
  } else {
    console.log("Demo user already exists: demo@agriwise.local");
  }

  // Create a buyer user for bidding/demo (idempotent)
  let buyer = await prisma.user.findUnique({
    where: { email: "buyer@agriwise.local" },
  });
  if (!buyer) {
    buyer = await prisma.user.create({
      data: {
        email: "buyer@agriwise.local",
        name: "Demo Buyer",
        passwordHash,
      },
    });
    console.log("Created demo buyer: buyer@agriwise.local / password123");
  } else {
    console.log("Demo buyer already exists: buyer@agriwise.local");
  }

  // Create sample categories
  const vegCat = await prisma.category.upsert({
    where: { slug: "vegetables" },
    update: {},
    create: { name: "Vegetables", slug: "vegetables" },
  });

  const grainCat = await prisma.category.upsert({
    where: { slug: "grains" },
    update: {},
    create: { name: "Grains", slug: "grains" },
  });

  const fruitsCat = await prisma.category.upsert({
    where: { slug: "fruits" },
    update: {},
    create: { name: "Fruits", slug: "fruits" },
  });

  const seedsCat = await prisma.category.upsert({
    where: { slug: "seeds" },
    update: {},
    create: { name: "Seeds", slug: "seeds" },
  });

  // Create sample products
  // Create sample products if they don't exist
  let tomato = await prisma.product.findFirst({
    where: { name: "Fresh Tomatoes", sellerId: user.id },
  });
  if (!tomato) {
    tomato = await prisma.product.create({
      data: {
        name: "Fresh Tomatoes",
        description: "Locally grown ripe tomatoes",
        condition: "Fresh",
        price: 20.0,
        quantity: 100,
        categoryId: vegCat.id,
        sellerId: user.id,
        images: {
          create: [
            {
              url: "https://via.placeholder.com/400x300.png?text=Tomato+1",
              alt: "Tomato 1",
            },
            {
              url: "https://via.placeholder.com/400x300.png?text=Tomato+2",
              alt: "Tomato 2",
            },
          ],
        },
      },
    });
  }

  let rice = await prisma.product.findFirst({
    where: { name: "White Rice", sellerId: user.id },
  });
  if (!rice) {
    rice = await prisma.product.create({
      data: {
        name: "White Rice",
        description: "High-quality milled rice",
        condition: "Good",
        price: 40.0,
        quantity: 50,
        categoryId: grainCat.id,
        sellerId: user.id,
        images: {
          create: [
            {
              url: "https://via.placeholder.com/400x300.png?text=Rice",
              alt: "Rice",
            },
          ],
        },
      },
    });
  }

  let mango = await prisma.product.findFirst({
    where: { name: "Alphonso Mangoes (1 dozen)", sellerId: user.id },
  });
  if (!mango) {
    mango = await prisma.product.create({
      data: {
        name: "Alphonso Mangoes (1 dozen)",
        description: "Sweet Alphonso mangoes from Maharashtra",
        condition: "Fresh",
        price: 150.0,
        quantity: 10,
        categoryId: fruitsCat.id,
        sellerId: user.id,
        images: {
          create: [
            {
              url: "https://via.placeholder.com/400x300.png?text=Mango",
              alt: "Mango",
            },
          ],
        },
      },
    });
  }

  let seeds = await prisma.product.findFirst({
    where: { name: "Tomato Hybrid Seeds (1000 seeds)", sellerId: user.id },
  });
  if (!seeds) {
    seeds = await prisma.product.create({
      data: {
        name: "Tomato Hybrid Seeds (1000 seeds)",
        description: "High yield hybrid tomato seeds",
        condition: "Fresh",
        price: 450.0,
        quantity: 5000,
        categoryId: seedsCat.id,
        sellerId: user.id,
        images: {
          create: [
            {
              url: "https://via.placeholder.com/400x300.png?text=Seeds",
              alt: "Seeds",
            },
          ],
        },
      },
    });
  }

  // Create or reuse an auction listing for tomatoes
  let tomatoListing = await prisma.listing.findFirst({
    where: { productId: tomato.id, type: "auction" },
  });
  if (!tomatoListing) {
    tomatoListing = await prisma.listing.create({
      data: {
        type: "auction",
        startingBid: 10.0,
        buyNowPrice: 50.0,
        endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
        productId: tomato.id,
      },
    });
  }

  // Create one bid from the buyer if none exist
  const existingBid = await prisma.bid.findFirst({
    where: { listingId: tomatoListing.id },
  });
  if (!existingBid) {
    await prisma.bid.create({
      data: {
        amount: 12.0,
        bidderId: buyer.id,
        listingId: tomatoListing.id,
      },
    });
  }

  console.log("Seeded sample categories, products, listing and bid");

  // Create a sample farm for the user
  let farm = await prisma.farm.findFirst({
    where: { name: "Demo Farm", ownerId: user.id },
  });
  if (!farm) {
    farm = await prisma.farm.create({
      data: {
        name: "Demo Farm",
        location: "Kerala, India",
        soilType: "Loamy Soil",
        landSize: 5.0,
        currentCrops: "Rice,Coconut",
        ownerId: user.id,
      },
    });
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
        condition: "Partly Cloudy",
      },
      {
        farmId: farm.id,
        recordedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        temperature: 30,
        humidity: 70,
        rainfall: 0,
        windSpeed: 8,
        condition: "Sunny",
      },
    ],
  });

  // Create sample carbon credits
  await prisma.carbonCredit.createMany({
    data: [
      {
        practice: "No-Till Farming",
        credits: 150,
        value: 1500,
        status: "active",
        date: new Date("2024-01-10"),
        description: "No-till practice on part of the farm",
        ownerId: user.id,
        farmId: farm.id,
      },
      {
        practice: "Cover Cropping",
        credits: 200,
        value: 2000,
        status: "sold",
        date: new Date("2024-01-05"),
        description: "Cover cropping over winter",
        ownerId: user.id,
        farmId: farm.id,
      },
    ],
  });

  // Create some sample chat messages
  await prisma.chatMessage.createMany({
    data: [
      {
        sender: "BOT",
        text: "Hello! I'm your AI farming assistant. How can I help?",
        userId: user.id,
        timestamp: new Date(),
      },
      {
        sender: "USER",
        text: "How to improve rice yield?",
        userId: user.id,
        timestamp: new Date(),
      },
    ],
  });

  // Create some recent activities
  await prisma.activity.createMany({
    data: [
      {
        userId: user.id,
        action: "Crop recommendation generated",
        time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        userId: user.id,
        action: "New message in chat",
        time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        userId: user.id,
        action: "Product listed in marketplace",
        time: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    ],
  });

  console.log(
    "Seeded farm, weather, carbon credits, chat messages, and activities",
  );

  // Seed Indian states and cities using the same Prisma client
  await seedIndiaData(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
