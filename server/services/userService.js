const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async ({ page, limit, search }) => {
  console.log(page);
  console.log(limit);
  console.log(search);

  const skip = (page - 1) * limit;

  const where = {
    OR: [{ fullname: { contains: search, mode: "insensitive" } }, { username: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }],
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        role: true,
        photo: true,
        createdAt: true,
      },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    page,
    totalPages: Math.ceil(total / limit),
    totalUsers: total,
  };
};

const updateUser = async (id, data) => {
  const allowedFields = ["username", "fullname", "photo"];
  const filteredData = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      filteredData[field] = data[field];
    }
  }

  return await prisma.user.update({
    where: { id },
    data: filteredData,
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      role: true,
      photo: true,
      createdAt: true,
    },
  });
};


const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
