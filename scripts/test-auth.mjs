import {
  createUser,
  getUserById,
  signToken,
  verifyCredentials,
  verifyToken,
} from "../src/lib/auth.js";

async function run() {
  try {
    const u = await createUser("alice@example.com", "password123", "Alice");
    console.log("created", u);
    const creds = await verifyCredentials("alice@example.com", "password123");
    console.log("creds ok", creds);
    const token = signToken({ sub: u.id, email: u.email });
    console.log("token", token);
    const payload = verifyToken(token);
    console.log("payload", payload);
    console.log("user by id", getUserById(u.id));
  } catch (err) {
    console.error("error", err);
  }
}

run();
