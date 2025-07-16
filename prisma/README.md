# Prisma Schema Organization

This project uses a **modular schema approach** to better organize the growing database schema. Instead of having one large `schema.prisma` file, the schema is split into domain-specific partial files.

## 📁 File Structure

```
prisma/
├── schema.prisma          # ⚠️ Auto-generated - DO NOT EDIT
├── build-schema.js        # Build script to combine partials
├── partials/              # Domain-specific schema files
│   ├── base.prisma       # Generator, datasource, and global enums
│   ├── user.prisma       # User management domain
│   ├── customer.prisma   # Customer domain
│   ├── table.prisma      # Table management domain
│   ├── order.prisma      # Order management domain
│   └── menu.prisma       # Menu management domain
└── README.md             # This file
```

## 🔧 How It Works

1. **Partial Files**: Each domain has its own `.prisma` file in the `partials/` directory
2. **Build Script**: The `build-schema.js` script combines all partials into `schema.prisma`
3. **Auto-Generation**: The main `schema.prisma` file is auto-generated and should not be edited directly

## 🚀 Usage

### Building the Schema

```bash
# Build the schema from partials
npm run db

# Build everything (schema + generate client + compile TypeScript)
npm run build
```

### Development Workflow

1. **Edit partials**: Make changes to files in `prisma/partials/`
2. **Build schema**: Run `npm run db`
3. **Generate client**: Run `prisma generate` (or `npm run build`)
4. **Run migrations**: Run `prisma migrate dev`

### Adding New Domains

1. Create a new `.prisma` file in `prisma/partials/`
2. Add the filename to the `schemaFiles` array in `build-schema.js`
3. Run `npm run db`

## 📋 Domain Organization

### Base (`base.prisma`)
- Prisma generator and datasource configuration
- Global enums used across multiple domains

### User Management (`user.prisma`)
- User authentication and authorization
- Sessions, accounts, and verifications

### Customer (`customer.prisma`)
- Customer profiles and preferences
- Payment methods and loyalty information

### Table Management (`table.prisma`)
- Restaurant table definitions
- Table status and capacity management

### Order Management (`order.prisma`)
- Order processing and tracking
- Order items and modifiers

### Menu Management (`menu.prisma`)
- Menu items and categories
- Modifiers and combo meals

## ⚠️ Important Notes

- **Never edit `schema.prisma` directly** - it's auto-generated
- Always run `npm run db` after editing partials
- The build script maintains proper dependency order
- All Prisma commands work normally with the generated schema

## 🔄 Migration Workflow

```bash
# 1. Edit partial files
# 2. Build schema
npm run db

# 3. Create and apply migration
npx prisma migrate dev --name your-migration-name

# 4. Generate client
npx prisma generate
```

## 📦 Benefits

- **Better Organization**: Each domain is clearly separated
- **Easier Maintenance**: Find and edit specific models quickly
- **Team Collaboration**: Multiple developers can work on different domains
- **Reduced Conflicts**: Smaller files mean fewer merge conflicts
- **Clear Dependencies**: Explicit ordering of schema components 