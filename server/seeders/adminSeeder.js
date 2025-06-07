const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);

    const admin = await prisma.user.create({
      data: {
        fullname: "Adminnistrator",
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
        photo: null,
      },
    });

    console.log("Admin user created:", admin);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
