import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin
  const hashedPass = await bcrypt.hash(process.env.ADMIN_DEFAULT_PASSWORD || "Admin@123", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", password: hashedPass },
  });
  console.log("✅ Admin created (username: admin)");

  // Create categories
  const categories = [
    { name: "أعشاب طبية", slug: "herbs", image: "🌿", description: "أعشاب طبيعية للصحة والعلاج" },
    { name: "بهارات وتوابل", slug: "spices", image: "🌶️", description: "أجود أنواع البهارات والتوابل" },
    { name: "زيوت طبيعية", slug: "oils", image: "🫒", description: "زيوت طبيعية نقية 100%" },
    { name: "عسل نحل", slug: "honey", image: "🍯", description: "عسل نحل طبيعي أصلي" },
    { name: "مكسرات وياميش", slug: "nuts", image: "🥜", description: "مكسرات طازجة وياميش رمضان" },
    { name: "حبوب وبذور", slug: "seeds", image: "🌾", description: "حبوب وبذور صحية" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }
  console.log("✅ Categories created");

  // Get category IDs
  const cats = await prisma.category.findMany();
  const catMap: Record<string, number> = {};
  cats.forEach((c) => (catMap[c.slug] = c.id));

  // Create products
  const products = [
    { name: "بابونج مجفف", slug: "baboneg", price: 45, oldPrice: 60, stock: 50, unit: "100 جرام", categoryId: catMap["herbs"], featured: true, description: "بابونج مجفف طبيعي 100% مهدئ للأعصاب ومفيد للهضم" },
    { name: "يانسون", slug: "yansoon", price: 35, stock: 80, unit: "100 جرام", categoryId: catMap["herbs"], featured: true, description: "يانسون طبيعي ممتاز للمشروبات الساخنة ومهدئ للمعدة" },
    { name: "نعناع مجفف", slug: "naanaa", price: 30, stock: 100, unit: "100 جرام", categoryId: catMap["herbs"], description: "نعناع مجفف منعش وطبيعي" },
    { name: "كركم بودر", slug: "kurkum", price: 50, oldPrice: 65, stock: 60, unit: "250 جرام", categoryId: catMap["spices"], featured: true, description: "كركم هندي نقي مضاد للأكسدة ومضاد للالتهابات" },
    { name: "قرفة سيلانية", slug: "qerfa", price: 70, stock: 40, unit: "100 جرام", categoryId: catMap["spices"], featured: true, description: "قرفة سيلانية أصلية برائحة فواحة" },
    { name: "كمون مطحون", slug: "kammon", price: 25, stock: 120, unit: "250 جرام", categoryId: catMap["spices"], description: "كمون مطحون طازج وفاخر" },
    { name: "فلفل أسود حب", slug: "felfel-aswad", price: 55, stock: 70, unit: "250 جرام", categoryId: catMap["spices"], description: "فلفل أسود حب ممتاز ورائحة قوية" },
    { name: "زيت زيتون بكر", slug: "zeit-zaytoon", price: 120, oldPrice: 150, stock: 30, unit: "لتر", categoryId: catMap["oils"], featured: true, description: "زيت زيتون بكر ممتاز عصرة أولى على البارد" },
    { name: "زيت حبة البركة", slug: "zeit-habet-baraka", price: 80, stock: 45, unit: "250 مل", categoryId: catMap["oils"], featured: true, description: "زيت حبة البركة (الحبة السوداء) نقي 100% مقوي للمناعة" },
    { name: "زيت جوز الهند", slug: "zeit-goz-hend", price: 90, stock: 35, unit: "500 مل", categoryId: catMap["oils"], description: "زيت جوز الهند الطبيعي البكر للبشرة والشعر والطبخ" },
    { name: "عسل جبلي", slug: "asal-gabaly", price: 250, oldPrice: 300, stock: 20, unit: "كيلو", categoryId: catMap["honey"], featured: true, description: "عسل جبلي طبيعي 100% غني بالفيتامينات والمعادن" },
    { name: "عسل سدر", slug: "asal-sedr", price: 350, stock: 15, unit: "كيلو", categoryId: catMap["honey"], description: "عسل سدر يمني فاخر أصلي مضمون" },
    { name: "لوز محمص", slug: "loz", price: 180, stock: 50, unit: "كيلو", categoryId: catMap["nuts"], featured: true, description: "لوز محمص بملح خفيف طازج ومقرمش" },
    { name: "كاجو", slug: "cashew", price: 220, oldPrice: 260, stock: 40, unit: "كيلو", categoryId: catMap["nuts"], description: "كاجو فاخر محمص ومملح" },
    { name: "بذر كتان", slug: "bazr-kettan", price: 40, stock: 90, unit: "250 جرام", categoryId: catMap["seeds"], description: "بذر كتان عضوي غني بالأوميجا 3" },
    { name: "حبة البركة", slug: "habet-baraka", price: 55, stock: 80, unit: "250 جرام", categoryId: catMap["seeds"], featured: true, description: "حبة البركة (الحبة السوداء) شفاء من كل داء" },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: { ...prod, active: true, image: "" },
    });
  }
  console.log("✅ Products created");
  console.log("\n🎉 Seed complete! You can now run: npm run dev");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
