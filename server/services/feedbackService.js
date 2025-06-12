"use strict";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function saveFeedback({ name, email, message }) {
  return await prisma.feedback.create({
    data: { name, email, message },
  });
}

async function getFeedbackById(id) {
  return await prisma.feedback.findUnique({
    where: { id },
  });
}

async function deleteFeedbackById(id) {
  return await prisma.feedback.delete({
    where: { id },
  });
}

async function getAllFeedback({ page, limit, search }) {
  const skip = (page - 1) * limit;

  const whereClause = {
    OR: [{ name: { contains: search, mode: "insensitive" } }, { message: { contains: search, mode: "insensitive" } }],
  };

  const [data, total] = await Promise.all([
    prisma.feedback.findMany({
      where: search ? whereClause : undefined,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.feedback.count({
      where: search ? whereClause : undefined,
    }),
  ]);

  return { data, total };
}

module.exports = {
  saveFeedback,
  getFeedbackById,
  deleteFeedbackById,
  getAllFeedback,
};
