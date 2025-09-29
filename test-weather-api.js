// Simple test script to verify weather API integration
const BASE_URL = 'http://localhost:3000';

async function testWeatherAPI() {
  console.log('Testing Weather API Integration...\n');

  try {
    // Test Indian cities endpoint
    console.log('1. Testing Indian Cities API...');
    const citiesResponse = await fetch(`${BASE_URL}/api/weather/india/cities`);
    if (citiesResponse.ok) {
      const cities = await citiesResponse.json();
      console.log(`✓ Indian Cities API working - Found ${Object.keys(cities).length} cities`);
      console.log(`  Sample cities: ${Object.values(cities).slice(0, 3).join(', ')}`);
    } else {
      console.log(`✗ Indian Cities API failed: ${citiesResponse.status}`);
    }

    // Test Indian weather endpoint
    console.log('\n2. Testing Indian Weather API...');
    const indiaWeatherResponse = await fetch(`${BASE_URL}/api/weather/india?city=Chennai`);
    if (indiaWeatherResponse.ok) {
      const weather = await indiaWeatherResponse.json();
      console.log(`✓ Indian Weather API working - Got weather for ${weather.city}`);
      console.log(`  Temperature: ${weather.weather?.current?.temperature?.max?.value || 'N/A'}°C`);
    } else {
      console.log(`✗ Indian Weather API failed: ${indiaWeatherResponse.status}`);
    }

    // Test global weather endpoint
    console.log('\n3. Testing Global Weather API...');
    const globalWeatherResponse = await fetch(`${BASE_URL}/api/weather/global/weather?location=London&days=2`);
    if (globalWeatherResponse.ok) {
      const weather = await globalWeatherResponse.json();
      console.log(`✓ Global Weather API working - Got weather for ${weather.location}`);
      console.log(`  Temperature: ${weather.current?.temperature || 'N/A'}°C`);
    } else {
      console.log(`✗ Global Weather API failed: ${globalWeatherResponse.status}`);
    }

    console.log('\n✅ Weather API integration test completed!');
    console.log('\nNote: Make sure to set INDIANAPI_KEY in your .env.local file for the APIs to work properly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\nMake sure the development server is running with: npm run dev');
  }
}

// Run the test
testWeatherAPI();


