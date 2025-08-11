import { TableSeed } from '../controllers/TableControllers/TableSeed/TableSeed';
import { MenuItemsSeed } from '../controllers/MenuItemsController/MenuItemsSeed/MenuItemsSeed';

const main = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    await TableSeed();
    await MenuItemsSeed();

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
};

main();
