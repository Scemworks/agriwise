const { PrismaClient } = require('@prisma/client')

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
    { name: 'Kochi', pincode: '682001', latitude: 9.9312, longitude: 76.2673 },
    { name: 'Kozhikode', pincode: '673001', latitude: 11.2588, longitude: 75.7804 },
    { name: 'Thrissur', pincode: '680001', latitude: 10.5276, longitude: 76.2144 }
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

async function seedIndiaData() {
  console.log('🌱 Seeding Indian states and cities...')

  try {
    // Create states
    for (const stateData of indianStates) {
      const state = await prisma.state.upsert({
        where: { code: stateData.code },
        update: {},
        create: stateData
      })
      console.log(`✅ Created state: ${state.name}`)

      // Create cities for this state
      const cities = majorCities[stateData.name] || []
      for (const cityData of cities) {
        await prisma.city.upsert({
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
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  seedIndiaData()
}

module.exports = { seedIndiaData }

