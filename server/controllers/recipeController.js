"use strict";

const recipeService = require("../services/recipeService");
const { formatError } = require("../utils/errorUtils");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const { log } = require("console");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

async function createRecipe(request, h) {
  try {
    const { payload } = request;
    let imageUrl = null;

    if (payload.image) {
      const image = payload.image;
      const filename = `${Date.now()}-${image.hapi.filename}`;
      const uploadPath = path.join(__dirname, "../uploads", filename);

      try {
        await writeFile(uploadPath, image._data);
        imageUrl = `/uploads/${filename}`;
      } catch (uploadErr) {
        console.error("Error uploading image:", uploadErr);
        throw new Error("Gagal mengupload gambar");
      }
    }

    const recipeData = {
      ...payload,
      imageUrl,
    };

    delete recipeData.image;

    const recipe = await recipeService.createRecipe(recipeData);
    return h.response({ status: "success", data: recipe }).code(201);
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function getAllRecipes(request, h) {
  try {
    const recipes = await recipeService.getAllRecipes();
    return h.response({ status: "success", data: recipes });
  } catch (err) {
    return h.response(formatError(err.message)).code(500);
  }
}

async function getRecipeById(request, h) {
  try {
    const recipe = await recipeService.getRecipeById(request.params.id);
    return h.response({ status: "success", data: recipe });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function updateRecipe(request, h) {
  try {
    const { id } = request.params;
    const { payload } = request;
    let imageUrl = null;

    const existingRecipe = await recipeService.getRecipeById(id);

    if (payload.image) {
      const image = payload.image;
      const filename = `${Date.now()}-${image.hapi.filename}`;
      const uploadPath = path.join(__dirname, "../uploads", filename);

      try {
        if (existingRecipe.imageUrl) {
          const oldImagePath = path.join(__dirname, "..", existingRecipe.imageUrl);
          try {
            await unlink(oldImagePath);
          } catch (err) {
            console.error("Gagal menghapus gambar lama:", err);
          }
        }

        await writeFile(uploadPath, image._data);
        imageUrl = `/uploads/${filename}`;
      } catch (uploadErr) {
        console.error("Error uploading image:", uploadErr);
        throw new Error("Gagal mengupload gambar");
      }
    } else if (payload.removeImage === "true") {
      if (existingRecipe.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", existingRecipe.imageUrl);
        try {
          await unlink(oldImagePath);
        } catch (err) {
          console.error("Gagal menghapus gambar lama:", err);
        }
      }
      imageUrl = null;
    } else {
      imageUrl = existingRecipe.imageUrl;
    }

    const recipeData = {
      ...payload,
      imageUrl,
    };

    delete recipeData.image;
    delete recipeData.removeImage;

    const recipe = await recipeService.updateRecipe(id, recipeData);
    return h.response({ status: "success", data: recipe });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

async function deleteRecipe(request, h) {
  try {
    const recipe = await recipeService.getRecipeById(request.params.id);

    if (recipe.imageUrl) {
      const imagePath = path.join(__dirname, "..", recipe.imageUrl);
      try {
        await unlink(imagePath);
      } catch (err) {
        console.error("Gagal menghapus gambar:", err);
      }
    }

    await recipeService.deleteRecipe(request.params.id);
    return h.response({ status: "success", message: "Recipe berhasil dihapus" });
  } catch (err) {
    return h.response(formatError(err.message)).code(err.output?.statusCode || 500);
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
