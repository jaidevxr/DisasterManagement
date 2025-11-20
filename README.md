# Disaster Management Platform

> 🚨 **Real-time disaster monitoring and emergency response platform** — live alerts, interactive maps, evacuation routes, and offline-first PWA capabilities for India.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://disaster-management-bay.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=flat-square&logo=supabase)](https://supabase.com)

## What is this?

A comprehensive **disaster management and emergency response web application** built for India. It provides real-time disaster monitoring with interactive maps, emergency alerts, evacuation routing, and an offline-first PWA architecture so it remains functional even when connectivity is limited — exactly when it's needed most.

## Features

- 🗺️ **Interactive Maps** — real-time disaster visualization using Leaflet with heatmaps
- 🚨 **Emergency Alerts** — live notifications for natural disasters and emergencies
- 🛣️ **Evacuation Routes** — intelligent routing via Leaflet Routing Machine
- 📡 **Offline-First** — Progressive Web App with IndexedDB for offline functionality
- 🤖 **AI Classification** — HuggingFace Transformers for disaster type classification
- 📊 **Analytics Dashboard** — Chart.js powered statistics and trend analysis
- 📱 **Installable PWA** — install on any device for native-like experience
- 🔐 **Auth & Real-time** — Supabase authentication and real-time subscriptions

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Maps**: Leaflet, React Leaflet, Leaflet Routing Machine, Leaflet Heatmap
- **AI/ML**: HuggingFace Transformers.js (in-browser inference)
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Charts**: Chart.js, Recharts
- **Offline**: IndexedDB (idb), vite-plugin-pwa
- **UI**: Radix UI, Tailwind CSS, shadcn/ui
- **Deployment**: Vercel

## Getting Started

```bash
git clone https://github.com/jaidevxr/DisasterManagement.git
cd DisasterManagement
npm install

# Set up environment variables
cp .env.example .env
# Add Supabase credentials

npm run dev
```

## License

MIT
