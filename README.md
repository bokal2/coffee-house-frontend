
### ☕ Coffee Order Frontend

A simple coffee ordering frontend built with **Next.js**, **ShadCN UI**, and **TypeScript**, designed to interact with a FastAPI backend.

---

### 🚀 Features

- Select coffee type, size, and quantity
- Submit orders to a FastAPI backend
- View all submitted orders in real-time

---

### 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

### 📦 Setup

1. **Clone the repo**

```bash
git clone https://github.com/bokal2/coffee-house-frontend.git
cd coffee-house-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the dev server**

```bash
npm run dev
```

The app will run at `http://localhost:3000`.

---

### Backend API

This frontend expects the following FastAPI endpoints:

- `POST /orders` – Submit an order
- `GET /orders` – Fetch all orders

Each order should have this structure:

```json
{
  "id": 1,
  "coffee_name": "Latte",
  "size": "Medium",
  "quantity": 2,
  "created_at": "2025-03-25T10:15:00Z"
}
```

---

### 📄 License

MIT — free to use, modify, and share.
