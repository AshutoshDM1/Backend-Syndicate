import { prisma } from "../../../db";
import { ModifierType } from "../../../../prisma/generated/prisma";

export const MenuItemsSeed = async () => {
  console.log("Starting MenuItems seeding...");
  await prisma.category.deleteMany();
  console.log('Deleted all categories successfully!');
  await prisma.modifier.deleteMany();
  console.log('Deleted all modifiers successfully!');
  await prisma.menuItem.deleteMany();
  console.log('Deleted all menu items successfully!');
  await prisma.menuItemModifier.deleteMany();
  console.log('Deleted all menu item modifiers successfully!');
  await prisma.comboMeal.deleteMany();
  console.log('Deleted all combo meals successfully!');
  await prisma.comboMealItem.deleteMany();
  console.log('Deleted all combo meal items successfully!');
  // First, create categories
  console.log("Categories seeding...");
  const categories = await prisma.category.createMany({
    data: [
      { 
        id: "cat-1", 
        name: "Pizza", 
        description: "Delicious Italian pizzas", 
        sortOrder: 1 
      },
      { 
        id: "cat-2", 
        name: "Burgers", 
        description: "Juicy beef and chicken burgers", 
        sortOrder: 2 
      },
      { 
        id: "cat-3", 
        name: "Salads", 
        description: "Fresh and healthy salads", 
        sortOrder: 3 
      },
      { 
        id: "cat-4", 
        name: "Desserts", 
        description: "Sweet treats and desserts", 
        sortOrder: 4 
      },
      { 
        id: "cat-5", 
        name: "Beverages", 
        description: "Refreshing drinks", 
        sortOrder: 5 
      },
      { 
        id: "cat-6", 
        name: "Main Courses", 
        description: "Hearty main dishes", 
        sortOrder: 6 
      },
    ],
    skipDuplicates: true,
  });

  console.log("Categories seeded successfully!");

  // Create modifiers
  const modifiers = await prisma.modifier.createMany({
    data: [
      // Pizza modifiers
      { id: "mod-1", name: "Extra Cheese", price: 2.50, type: ModifierType.EXTRA, description: "Add extra cheese to your pizza" },
      { id: "mod-2", name: "Spicy", price: 0, type: ModifierType.OPTION, description: "Make it spicy" },
      
      // Salmon modifiers
      { id: "mod-3", name: "Extra Lemon", price: 0.50, type: ModifierType.EXTRA, description: "Add extra lemon slices" },
      { id: "mod-4", name: "Medium Rare", price: 0, type: ModifierType.OPTION, description: "Cook to medium rare" },
      
      // Chicken modifiers
      { id: "mod-5", name: "Extra Spicy", price: 0, type: ModifierType.OPTION, description: "Make it extra spicy" },
      { id: "mod-6", name: "BBQ Sauce", price: 1.00, type: ModifierType.EXTRA, description: "Add BBQ sauce" },
      
      // Salad modifiers
      { id: "mod-7", name: "Extra Shrimp", price: 3.00, type: ModifierType.EXTRA, description: "Add extra shrimp" },
      { id: "mod-8", name: "Dressing on Side", price: 0, type: ModifierType.OPTION, description: "Serve dressing on the side" },
      
      // Dessert modifiers
      { id: "mod-9", name: "Vanilla Ice Cream", price: 2.00, type: ModifierType.EXTRA, description: "Add vanilla ice cream" },
      { id: "mod-10", name: "Extra Hot", price: 0, type: ModifierType.OPTION, description: "Serve extra hot" },
      
      // Burger modifiers
      { id: "mod-11", name: "Extra Patty", price: 4.00, type: ModifierType.EXTRA, description: "Add extra beef patty" },
      { id: "mod-12", name: "No Onions", price: 0, type: ModifierType.OPTION, description: "Remove onions" },
      
      // Cake modifiers
      { id: "mod-13", name: "Extra Glaze", price: 1.00, type: ModifierType.EXTRA, description: "Add extra glaze" },
      { id: "mod-14", name: "Whipped Cream", price: 1.50, type: ModifierType.EXTRA, description: "Add whipped cream" },
      
      // Pasta modifiers
      { id: "mod-15", name: "Extra Bacon", price: 2.50, type: ModifierType.EXTRA, description: "Add extra bacon" },
      { id: "mod-16", name: "Gluten Free", price: 1.00, type: ModifierType.OPTION, description: "Use gluten-free pasta" },
      
      // Turkey modifiers
      { id: "mod-17", name: "Extra Gravy", price: 1.50, type: ModifierType.EXTRA, description: "Add extra gravy" },
      { id: "mod-18", name: "Spicy Rub", price: 0, type: ModifierType.OPTION, description: "Add spicy seasoning" },
      
      // Smoothie modifiers
      { id: "mod-19", name: "Protein Powder", price: 2.00, type: ModifierType.EXTRA, description: "Add protein powder" },
      { id: "mod-20", name: "Extra Large", price: 2.00, type: ModifierType.OPTION, description: "Make it extra large" },
    ],
    skipDuplicates: true,
  });

  console.log("Modifiers seeded successfully!");

  // Create menu items
  const menuItems = await prisma.menuItem.createMany({
    data: [
      {
        id: "item-1",
        name: "Smokey Supreme Pizza",
        description: "Delicious pizza with smoked sausage, pepperoni, and cheese",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
        categoryId: "cat-1",
        rating: 4.5,
        prepTime: 25,
        calories: 850,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: true,
        sortOrder: 1,
      },
      {
        id: "item-2",
        name: "Grilled Salmon",
        description: "Fresh grilled salmon with lemon and herbs",
        price: 22.00,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
        categoryId: "cat-6",
        rating: 4.7,
        prepTime: 20,
        calories: 350,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        id: "item-3",
        name: "Grilled Chicken Delight",
        description: "Tender grilled chicken with herbs and spices",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
        categoryId: "cat-6",
        rating: 4.8,
        prepTime: 30,
        calories: 420,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        sortOrder: 2,
      },
      {
        id: "item-4",
        name: "Fiery Shrimp Salad",
        description: "Fresh shrimp salad with mixed greens",
        price: 8.00,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        categoryId: "cat-3",
        rating: 4.4,
        prepTime: 15,
        calories: 220,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: true,
        sortOrder: 1,
      },
      {
        id: "item-5",
        name: "Chocolate Lava Cake",
        description: "Rich chocolate cake with molten center",
        price: 10.00,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
        categoryId: "cat-4",
        rating: 4.9,
        prepTime: 12,
        calories: 520,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        id: "item-6",
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheese, lettuce, and tomato",
        price: 10.00,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        categoryId: "cat-2",
        rating: 4.6,
        prepTime: 18,
        calories: 680,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        sortOrder: 1,
      },
      {
        id: "item-7",
        name: "Sunny Citrus Cake",
        description: "Light and zesty citrus cake",
        price: 8.50,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
        categoryId: "cat-4",
        rating: 4.8,
        prepTime: 10,
        calories: 380,
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        sortOrder: 2,
      },
      {
        id: "item-8",
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta with eggs, cheese, and bacon",
        price: 15.00,
        image: "https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3BhZ2hldHRpJTIwQ2FyYm9uYXJhfGVufDB8fDB8fHww",
        categoryId: "cat-6",
        rating: 4.7,
        prepTime: 22,
        calories: 620,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        sortOrder: 3,
      },
      {
        id: "item-9",
        name: "Roasted Turkey Legs",
        description: "Slow-roasted turkey legs with herbs",
        price: 8.00,
        image: "https://plus.unsplash.com/premium_photo-1664392048940-3e08720a4207?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Um9hc3RlZCUyMFR1cmtleSUyMExlZ3N8ZW58MHx8MHx8fDA%3D",
        categoryId: "cat-6",
        rating: 4.5,
        prepTime: 45,
        calories: 480,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: true,
        isSpicy: false,
        sortOrder: 4,
      },
      {
        id: "item-10",
        name: "Fresh Fruit Smoothie",
        description: "Refreshing blend of seasonal fruits",
        price: 6.50,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
        categoryId: "cat-5",
        rating: 4.3,
        prepTime: 5,
        calories: 180,
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isSpicy: false,
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Menu items seeded successfully!");

  // Create menu item modifier relationships
  const menuItemModifiers = await prisma.menuItemModifier.createMany({
    data: [
      // Pizza modifiers
      { menuItemId: "item-1", modifierId: "mod-1", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-1", modifierId: "mod-2", isRequired: false, sortOrder: 2 },
      
      // Salmon modifiers
      { menuItemId: "item-2", modifierId: "mod-3", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-2", modifierId: "mod-4", isRequired: false, sortOrder: 2 },
      
      // Chicken modifiers
      { menuItemId: "item-3", modifierId: "mod-5", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-3", modifierId: "mod-6", isRequired: false, sortOrder: 2 },
      
      // Salad modifiers
      { menuItemId: "item-4", modifierId: "mod-7", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-4", modifierId: "mod-8", isRequired: false, sortOrder: 2 },
      
      // Dessert modifiers
      { menuItemId: "item-5", modifierId: "mod-9", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-5", modifierId: "mod-10", isRequired: false, sortOrder: 2 },
      
      // Burger modifiers
      { menuItemId: "item-6", modifierId: "mod-11", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-6", modifierId: "mod-12", isRequired: false, sortOrder: 2 },
      
      // Cake modifiers
      { menuItemId: "item-7", modifierId: "mod-13", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-7", modifierId: "mod-14", isRequired: false, sortOrder: 2 },
      
      // Pasta modifiers
      { menuItemId: "item-8", modifierId: "mod-15", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-8", modifierId: "mod-16", isRequired: false, sortOrder: 2 },
      
      // Turkey modifiers
      { menuItemId: "item-9", modifierId: "mod-17", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-9", modifierId: "mod-18", isRequired: false, sortOrder: 2 },
      
      // Smoothie modifiers
      { menuItemId: "item-10", modifierId: "mod-19", isRequired: false, sortOrder: 1 },
      { menuItemId: "item-10", modifierId: "mod-20", isRequired: false, sortOrder: 2 },
    ],
    skipDuplicates: true,
  });

  console.log("Menu item modifiers seeded successfully!");

  // Create combo meals
  const comboMeals = await prisma.comboMeal.createMany({
    data: [
      {
        id: "combo-1",
        name: "Pizza & Salad Combo",
        description: "Supreme pizza with fresh shrimp salad - Perfect combination!",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        id: "combo-2",
        name: "Burger & Smoothie Combo",
        description: "Classic cheeseburger with fresh fruit smoothie",
        price: 14.50,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        id: "combo-3",
        name: "Chicken & Cake Combo",
        description: "Grilled chicken with sunny citrus cake for dessert",
        price: 22.50,
        image: "https://images.unsplash.com/photo-1671898295493-b8a75407dadb?w=500&auto=format&fit=crop",
        isAvailable: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Combo meals seeded successfully!");

  // Create combo meal items
  const comboMealItems = await prisma.comboMealItem.createMany({
    data: [
      // Pizza & Salad Combo
      { comboMealId: "combo-1", menuItemId: "item-1", quantity: 1 },
      { comboMealId: "combo-1", menuItemId: "item-4", quantity: 1 },
      
      // Burger & Smoothie Combo
      { comboMealId: "combo-2", menuItemId: "item-6", quantity: 1 },
      { comboMealId: "combo-2", menuItemId: "item-10", quantity: 1 },
      
      // Chicken & Cake Combo
      { comboMealId: "combo-3", menuItemId: "item-3", quantity: 1 },
      { comboMealId: "combo-3", menuItemId: "item-7", quantity: 1 },
    ],
    skipDuplicates: true,
  });

  console.log("Combo meal items seeded successfully!");

  console.log("✅ MenuItems seeding completed successfully!");
  console.log("📊 Seeded:");
  console.log("   - 6 Categories");
  console.log("   - 20 Modifiers");
  console.log("   - 10 Menu Items");
  console.log("   - 20 Menu Item Modifiers");
  console.log("   - 3 Combo Meals");
  console.log("   - 6 Combo Meal Items");
};
