# Joya-Tech Digital Solutions

## 🚀 Modern React Website for Digital Solutions Company

A high-performance, accessible, and SEO-optimized React website built with modern technologies.

## ✨ Features

- **⚡ Performance Optimized** - Vite build system, lazy loading, code splitting
- **🎨 Modern UI/UX** - Glassmorphism, Aurora backgrounds, smooth animations
- **🌐 Multilingual Support** - Hebrew (RTL) & English (LTR)
- **🔒 Security First** - Input sanitization, XSS protection
- **📱 Responsive Design** - Mobile-first approach
- **♿ Accessibility** - WCAG compliant, reduced motion support
- **🔍 SEO Optimized** - Meta tags, structured data, canonical URLs

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Security**: DOMPurify
- **SEO**: React Helmet Async
- **Linting**: ESLint
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/joyatech-site.git
cd joyatech-site
```

2. Install dependencies
```bash
npm install
```

3. Create environment variables (optional)
```bash
cp .env.example .env
# Edit .env with your values
```

4. Start development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run analyze      # Analyze bundle size
```

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Shared components
│   ├── layout/      # Header, Footer, etc.
│   ├── ui/          # UI primitives
│   └── home/        # Homepage components
├── constants/       # App constants & config
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services (future)
├── types/           # TypeScript types (future)
└── utils/           # Utility functions
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SITE_URL=https://joyatech.com
VITE_SUPABASE_URL=https://your-supabase-url
VITE_CONTACT_EMAIL=contact@joyatech.com
VITE_CONTACT_PHONE=+972-54-646-8676
VITE_API_BASE_URL=https://api.joyatech.com
VITE_ENABLE_ANALYTICS=false
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite and configure the build
3. Add environment variables in Vercel dashboard

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

## 🔍 Performance Monitoring

- Bundle size analysis: `npm run analyze`
- Lighthouse scores monitoring
- Core Web Vitals tracking

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📈 SEO & Analytics

- Google Analytics integration (configurable)
- Meta tags for social sharing
- JSON-LD structured data
- Sitemap generation (future)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Joya-Tech Digital Solutions.

## 📞 Contact

- **Email**: contact@joyatech.com
- **Phone**: +972-54-646-8676
- **Website**: https://joyatech.com

## 🎯 Roadmap

- [ ] Add TypeScript support
- [ ] Implement testing suite
- [ ] Add CMS integration
- [ ] Performance monitoring dashboard
- [ ] PWA features
- [ ] Multi-language content management
