const fs = require('fs');
const path = require('path');

// Define the order of files to ensure proper dependencies
const schemaFiles = [
  'base.prisma',
  'user.prisma',
  'customer.prisma',
  'table.prisma',
  'order.prisma',
  'menu.prisma',
];

const partialsDir = path.join(__dirname, 'partials');
const outputFile = path.join(__dirname, 'schema.prisma');

function buildSchema() {
  console.log('🔨 Building Prisma schema from partials...');

  let combinedSchema = '';

  // Add header comment
  combinedSchema += '// This file is auto-generated from partials. Do not edit directly.\n';
  combinedSchema += '// Run "npm run build:schema" to regenerate this file.\n\n';

  // Combine all partial files
  schemaFiles.forEach((file, index) => {
    const filePath = path.join(partialsDir, file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Warning: ${file} not found, skipping...`);
      return;
    }

    console.log(`📄 Processing ${file}...`);

    const content = fs.readFileSync(filePath, 'utf8');

    // Add spacing between files (except for the first one)
    if (index > 0) {
      combinedSchema += '\n\n';
    }

    combinedSchema += content;
  });

  // Write the combined schema
  fs.writeFileSync(outputFile, combinedSchema);

  console.log('✅ Schema built successfully!');
  console.log(`📍 Output: ${outputFile}`);
}

// Run the build
try {
  buildSchema();
} catch (error) {
  console.error('❌ Error building schema:', error);
  process.exit(1);
}
