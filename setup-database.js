#!/usr/bin/env node

const { PrismaClient } = require("@prisma/client");
const { execSync } = require("node:child_process");

const prisma = new PrismaClient();

async function setupDatabase() {
  console.log("🚀 Setting up AgriWise Database...\n");

  try {
    // 1. Generate Prisma client
    console.log("📦 Generating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });
    console.log("✅ Prisma client generated\n");

    // 2. Run migrations
    console.log("🗄️  Running database migrations...");
    execSync("npx prisma migrate dev --name add_location_and_ai_features", {
      stdio: "inherit",
    });
    console.log("✅ Database migrations completed\n");

    // 3. Seed Indian states and cities
    console.log("🌱 Seeding Indian states and cities...");
    const { seedIndiaData } = require("./prisma/seed-india.js");
    await seedIndiaData();
    console.log("✅ Indian data seeded\n");

    // 4. Verify setup
    console.log("🔍 Verifying database setup...");
    const stateCount = await prisma.state.count();
    const cityCount = await prisma.city.count();
    const userCount = await prisma.user.count();

    console.log(`📊 Database Statistics:`);
    console.log(`   - States: ${stateCount}`);
    console.log(`   - Cities: ${cityCount}`);
    console.log(`   - Users: ${userCount}`);
    console.log("✅ Database setup completed successfully!\n");

    console.log("🎉 AgriWise is ready for production!");
    console.log("\nNext steps:");
    console.log("1. Set up your environment variables in .env.local");
    console.log(
      "2. Get your Indian Weather API key from http://indianapi.in/weather-api",
    );
    console.log("3. Run: npm run dev");
    console.log("4. Visit: http://localhost:3000");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
