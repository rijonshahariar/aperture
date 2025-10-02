# 🌌 APERTURE

### *NASA Space Apps Challenge 2025*

_Capturing the cosmos through NASA's lens with optimized performance and intuitive design_

[![NASA Space Apps 2025](https://img.shields.io/badge/NASA%20Space%20Apps-2025-blue?style=for-the-badge&logo=nasa)](https://2025.spaceappschallenge.org/)
[![GitHub License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://github.com/rijonshahariar/aperture/blob/main/LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

[**🚀 Live Demo**](https://aperture-space.vercel.app/) • [**📖 Documentation**](#-documentation) • [**� Report Issues**](https://github.com/rijonshahariar/aperture/issues) • [**� NASA Challenge**](https://2025.spaceappschallenge.org/)

</div>

---

## ✨ About APERTURE

**APERTURE** is a high-performance web application developed for **NASA Space Apps Challenge 2025** that revolutionizes how we explore and interact with NASA's Astronomy Picture of the Day (APOD) collection. Built with modern web technologies, APERTURE delivers an intuitive, fast-loading experience that makes astronomical discovery accessible to everyone.

Our solution addresses the challenge of making NASA's vast astronomical archive more accessible through:
- **Optimized Performance**: Lightning-fast image loading with intelligent lazy loading
- **Smart Pagination**: Efficient data fetching that respects NASA API rate limits
- **Responsive Design**: Seamless experience across all devices
- **Intuitive Interface**: Clean, modern UI that puts the cosmos at your fingertips

---

## 🎯 Challenge Statement

**NASA Space Apps Challenge 2025 - Theme: "Explore the Cosmos"**

Our team tackled the challenge of creating an engaging platform to showcase NASA's astronomical data while ensuring optimal performance and user experience. APERTURE demonstrates how modern web technologies can make space exploration more accessible to the global community.

### Key Objectives Achieved:
- ✅ Direct integration with NASA's APOD API
- ✅ Optimized performance with lazy loading and caching
- ✅ Responsive design for universal accessibility
- ✅ Smart pagination to handle large datasets efficiently
- ✅ Modern, intuitive user interface

---

## 🚀 Key Features

<div align="center">

### 🌠 **Direct NASA APOD Access**

Fetches data directly from NASA's Astronomy Picture of the Day API, providing access to astronomical images and content with real-time data.

### 🔍 **Search & Filtering**

Client-side search and filtering capabilities to explore astronomical content by date, media type, and keywords.

### 📱 **Modern Responsive Design**

Beautiful, accessible interface that works seamlessly across all devices, featuring dark/light mode support and smooth animations.

### 🌐 **Simplified Architecture**

Direct integration with NASA's API eliminates the need for a backend database, making the application lightweight and easy to deploy.

Secure authentication system powered by Better Auth, enabling personalized experiences and future features like favorites and collections.

### ⚡ **High Performance**

Built with modern technologies for optimal performance, featuring server-side rendering, efficient client-side caching, and direct NASA API integration.

</div>

---

## 🛠️ Technology Stack

<div align="center">

### **Frontend**

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.18.1-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### **API Integration**

![NASA API](https://img.shields.io/badge/NASA_API-Direct-0B3D91?style=for-the-badge&logo=nasa&logoColor=white)
![Fetch API](https://img.shields.io/badge/Fetch_API-Native-FF6B6B?style=for-the-badge&logo=javascript&logoColor=white)

### **Development & Tooling**

![Turbo](https://img.shields.io/badge/Turborepo-2.5.6-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-9.0.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

</div>

---

## 🏗️ Architecture

APERTURE is built as a streamlined monorepo using **Turborepo** for efficient development and deployment:

```
APERTURE/
├── apps/
│   └── web/          # Next.js frontend application
├── packages/
│   ├── shared/       # Shared types, services, and utilities
│   ├── eslint-config/# Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
└── ...
```

### **Key Architectural Features:**

- 🔄 **Monorepo Structure**: Efficient code sharing and development workflow
- 🌐 **Direct API Integration**: Direct communication with NASA's APOD API
- � **Modular Design**: Shared packages for maximum code reusability
- ⚡ **Client-Side Processing**: Search and filtering performed on the client for better UX
- 🎨 **Modern UI**: Beautiful, responsive interface with dark/light mode support

---

## 🚀 Quick Start

### **Prerequisites**

- **Node.js** 18+
- **pnpm** 9.0.0+
- **NASA API Key** (optional - defaults to DEMO_KEY)

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/rijonshahariar/APERTURE.git
   cd APERTURE
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment setup**

   Create `.env.local` in the root directory:

   ```bash
   # NASA API Configuration
   NASA_API_KEY=your_nasa_api_key_here
   # Or use the default public key: DEMO_KEY

   # Next.js Configuration
   NEXT_PUBLIC_NASA_API_KEY=your_nasa_api_key_here
   ```

4. **Start development server**

   ```bash
   # Start the development server
   pnpm dev
   ```

5. **Access the application**
   - 🌐 **Frontend**: http://localhost:3000

---

## 📚 NASA APOD API Integration

### **Direct API Access**

APERTURE integrates directly with NASA's Astronomy Picture of the Day API:

```
Base URL: https://api.nasa.gov/planetary/apod
```

### **Supported Features**

- 🌟 **Latest APOD**: Get today's astronomy picture
- 📅 **Historical Data**: Access APODs by specific date
- 🎲 **Random Images**: Fetch random astronomical content
- 📊 **Date Ranges**: Get multiple APODs within a date range
- 🔍 **Client-Side Search**: Filter and search through fetched data

### **Rate Limiting**

The application handles NASA API rate limits gracefully:
- Uses fallback content during high traffic
- Implements client-side caching for better performance
- Provides informative error messages

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### **How to Contribute**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed
4. **Test your changes**
   ```bash
   pnpm build
   pnpm check-types
   ```
5. **Commit and push**
   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### **Development Guidelines**

- 📝 **Code Style**: Follow the established ESLint and Prettier configurations
- 🧪 **Testing**: Ensure your changes don't break existing functionality
- 📖 **Documentation**: Update relevant documentation for new features
- 🔒 **Security**: Follow security best practices for any new code
- ♿ **Accessibility**: Maintain accessibility standards in UI components

---

## 🗺️ Roadmap

### **Upcoming Features**

- 🌟 **Personal Collections**: Save and organize favorite APODs
- 🔍 **Enhanced Search**: AI-powered content recommendations
- 🌍 **Internationalization**: Multi-language support
- 🚀 **Mars Rover Photos**: Integration with Mars Rover APIs
- 📱 **Mobile App**: React Native mobile application
- 🎨 **Advanced Filtering**: More granular search options
- 📊 **Analytics Dashboard**: Usage statistics and insights
- 🔔 **Notifications**: Daily APOD notifications

### **Technical Improvements**

- ⚡ **Performance**: Enhanced caching and CDN integration
- 🔐 **Security**: Advanced authentication features
- 📈 **Scalability**: Microservices architecture migration
- 🧪 **Testing**: Comprehensive test coverage
- 📱 **PWA**: Progressive Web App features

---

## 📊 Project Stats

<div align="center">

![GitHub language count](https://img.shields.io/github/languages/count/rijonshahariar/APERTURE?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/rijonshahariar/APERTURE?style=for-the-badge&color=blue)
![GitHub code size](https://img.shields.io/github/languages/code-size/rijonshahariar/APERTURE?style=for-the-badge&color=green)
![GitHub last commit](https://img.shields.io/github/last-commit/rijonshahariar/APERTURE?style=for-the-badge&color=red)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🚀 **NASA**: For providing the incredible APOD API
- 🌟 **Contributors**: Everyone who has contributed to this project
- 🎨 **Design Inspiration**: Modern space exploration websites
- 📚 **Open Source**: The amazing open-source community

---

