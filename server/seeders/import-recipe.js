const xlsx = require("xlsx");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const filePath = "./Indonesian_Food_Recipes.xlsx";

async function importExcel() {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const results = xlsx.utils.sheet_to_json(sheet);

    // const limitedResults = results.slice(0, 10000);
    // console.log(`Total data dibaca: ${results.length}, akan diproses: ${limitedResults.length}`);
    console.log(`Total data dibaca: ${results.length}, akan diproses: ${limitedResults.length}`);
    
    for (const item of results) {
      if (item.Title && item.Ingredients && item.Steps && item.URL && item.Category && item.TitleCleaned && item.TotalIngredients !== undefined && item.IngredientsCleaned && item.TotalSteps !== undefined) {
        try {
          await prisma.recipe.create({
            data: {
              title: item.Title,
              ingredients: item.Ingredients,
              steps: item.Steps,
              image: null,
              loves: 0,
              url: item.URL,
              category: item.Category,
              title_cleaned: item.TitleCleaned,
              total_ingredients: parseInt(item.TotalIngredients),
              ingredients_cleaned: item.IngredientsCleaned,
              total_steps: parseInt(item.TotalSteps),
            },
          });
        } catch (err) {
          console.error("Gagal menyimpan item:", item.Title, "-", err.message);
        }
      } else {
        console.warn("❗ Melewatkan data tidak lengkap:", item.Title || "[Tanpa Judul]");
      }
    }
    
    console.log(`✅ Import berhasil: ${limitedResults.length} data dimasukkan`);
  } catch (err) {
    console.error("❌ Gagal mengimpor:", err);
  } finally {
    await prisma.$disconnect();
  }
}

importExcel();
