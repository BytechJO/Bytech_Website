const bcrypt = require("bcryptjs");
const pool = require("../database/db");

async function createAdmin() {
  try {
    const fullName = "ByteCH Admin";
    const email = "admin@bytechjo.com";
    const password = "123456";
    const role = "super_admin";

    const existingAdmin = await pool.query(
      "SELECT id FROM admins WHERE email = $1",
      [email]
    );

    if (existingAdmin.rows.length > 0) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO admins (full_name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email, role
      `,
      [fullName, email, passwordHash, role]
    );

    console.log("✅ Admin created successfully:");
    console.log(result.rows[0]);

    process.exit(0);
  } catch (error) {
    console.error("❌ Create admin error:");
    console.error(error.message);
    process.exit(1);
  }
}

createAdmin();