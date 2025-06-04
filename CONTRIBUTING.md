## 🚀 How to Contribute

## 📝 Contributing Guidelines

1. You can contribute to this project by opening a pull request.

2. Create a new branch name of the format `dev/DiscordName`

3. Don't forget to add good commit messages to your code.

4. Make sure to lint before pushing your code `pnpm lint` .

5. Make sure to format before pushing your code `pnpm format` .

## Prerequisites

- Node.js (v20+)
- PostgreSQL
- pnpm

## 🔐 Environment Variables

Create a `.env` file in the project root with these variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/restaurant_booking
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/AshutoshDM1/Backend-Syndicate.git
cd Backend-Syndicate
```

2. Install pnpm

```bash
npm install -g pnpm
```

3. Install dependencies

```bash
pnpm install

```

4. Set up environment variables (see .env.example)

```bash
cp .env
```

5. Setup the database

```bash
pnpx prisma db pull
```

6. Generate Prisma Client

```bash
pnpx prisma generate
```

7. Start the development server

```bash
pnpm run dev
```
