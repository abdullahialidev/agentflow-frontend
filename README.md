# 🧠 AgentFlow Frontend

> A responsive crypto dashboard built with **Next.js 15**, **Tailwind CSS 4**, and **Recharts**, designed to match the Behance UI/UX spec and serve as the foundation for a real-time, data-connected web app.

---

## 🚀 Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure
agentflow-frontend/
├── app/
│ └── page.tsx # Main dashboard
├── components/
│ └── ui/
│ ├── button.tsx # Reusable button component
│ └── card.tsx # Reusable card components
├── public/
│ └── favicon.ico (optional)
├── styles/
│ └── globals.css
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── next.config.js
└── README.md

yaml
Copy
Edit

---

## 📦 Setup & Run

### Install dependencies:
```bash
npm install
Start local dev server:
bash
Copy
Edit
npm run dev
Then go to http://localhost:3000

🔮 Features
Fully responsive layout (mobile → desktop)

Sidebar navigation

Topbar with Connect Wallet CTA and profile image

Interactive line chart (dummy data)

Search + filter support

Animated crypto cards with state selection

🛠 Future Goals
Connect to real API (e.g., CoinGecko)

Add user authentication

Implement Web3 wallet integration

Add data validation & loading states

🧑‍💻 Author
Built by Abdullahi Ali

📄 License
MIT