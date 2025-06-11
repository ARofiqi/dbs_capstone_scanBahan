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

async function getAllFeedback() {
  return await prisma.feedback.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

module.exports = {
  saveFeedback,
  getFeedbackById,
  deleteFeedbackById,
  getAllFeedback,
};
