# Joya-Tech Admin Dashboard

מערכת ניהול מלאה לאתר Joya-Tech, כולל ניהול מאמרים, כלים, המלצות, תיק עבודות, קרוסלות ועוד.

## 🚀 התקנה מהירה

### 1. התקנת Dependencies

```bash
npm install
```

### 2. הגדרת Firebase

ודא שיש לך קובץ `.env` עם המשתנים הבאים:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 3. הגדרת משתמש Admin

כדי להגדיר משתמש כ-Admin:

1. צור משתמש חדש ב-Firebase Authentication
2. הרץ את ה-Cloud Function:
   ```bash
   firebase deploy --only functions:setAdminClaim
   firebase functions:call setAdminClaim --data '{"email":"your-admin@email.com"}'
   ```

### 4. פריסת Security Rules

```bash
firebase deploy --only firestore:rules,storage:rules,firestore:indexes
```

### 5. מיגרציית נתונים

להעברת הנתונים מה-JSON ל-Firestore:

```bash
# בדיקה יבשה (ללא שינויים)
npm run migrate:dry

# מיגרציה בפועל
npm run migrate
```

## 📁 מבנה התיקיות

```
src/admin/
├── AdminLayout.jsx       # Layout ראשי (Sidebar + Navbar)
├── AdminRoutes.jsx       # הגדרת Routes
├── components/           # קומפוננטות משותפות
│   ├── ConfirmDialog.jsx
│   ├── DataTable.jsx     # טבלה עם מיון/סינון/דפדוף
│   ├── GlobalSearch.jsx  # חיפוש גלובלי (⌘K)
│   ├── ImageUploader.jsx # העלאת תמונות
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── RichTextEditor.jsx # עורך TipTap
│   ├── Sidebar.jsx
│   └── StatsCard.jsx
├── hooks/                # React Hooks
│   ├── useAuth.jsx       # Authentication
│   ├── useFirestore.js   # CRUD operations
│   └── useKeyboardShortcuts.js
├── pages/                # דפי הניהול
│   ├── ActivityLog.jsx
│   ├── ArticleEditor.jsx
│   ├── ArticlesManager.jsx
│   ├── CarouselDesigner.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── MediaLibrary.jsx
│   ├── PortfolioManager.jsx
│   ├── Settings.jsx
│   ├── TestimonialsManager.jsx
│   └── ToolsManager.jsx
└── utils/                # פונקציות עזר
```

## ⌨️ קיצורי מקלדת

| קיצור | פעולה |
|-------|-------|
| `⌘/Ctrl + K` | פתיחת חיפוש גלובלי |
| `⌘/Ctrl + S` | שמירה |
| `⌘/Ctrl + N` | פריט חדש |
| `Escape` | סגירה/חזרה |
| `G → H` | ניווט לדאשבורד |
| `G → A` | ניווט למאמרים |
| `G → T` | ניווט לכלים |
| `G → M` | ניווט למדיה |
| `G → S` | ניווט להגדרות |

## 🗄️ מבנה Database (Firestore)

### Collections

- `articles` - מאמרים
- `tools` - כלי AI
- `testimonials` - המלצות לקוחות
- `portfolio` - תיק עבודות (לפני/אחרי)
- `carousels` - קרוסלות מותאמות
- `settings` - הגדרות האתר
- `activityLogs` - יומן פעילות
- `admins` - משתמשי Admin

## 🔐 Security Rules

- **Public Read**: articles, tools, testimonials, portfolio, carousels, settings
- **Admin Write**: כל הקולקציות למעט contactMessages
- **Admin Only**: activityLogs

## ☁️ Cloud Functions

| Function | תיאור |
|----------|--------|
| `setAdminClaim` | הגדרת משתמש כ-Admin |
| `removeAdminClaim` | הסרת הרשאות Admin |
| `scheduledBackup` | גיבוי יומי (2:00 AM) |
| `manualBackup` | גיבוי ידני |
| `listBackups` | רשימת גיבויים |

## 🎨 פיצ'רים

### בסיסי
- ✅ Authentication עם Firebase
- ✅ Protected Routes
- ✅ CRUD מלא לכל הקולקציות
- ✅ Responsive Design (RTL)
- ✅ Dark Mode

### מתקדם
- ✅ Global Search (⌘K)
- ✅ Keyboard Shortcuts
- ✅ Activity Logging
- ✅ Rich Text Editor (TipTap)
- ✅ Drag & Drop לקרוסלות
- ✅ Image Upload עם compression
- ✅ Scheduled Backups

## 🔧 פיתוח

```bash
# הרצה מקומית
npm run dev

# בנייה
npm run build

# פריסה
firebase deploy
```

## 📝 הערות

- ה-Admin Dashboard נמצא ב-`/admin`
- עמוד ההתחברות ב-`/admin/login`
- כל ה-routes מוגנים עם `ProtectedRoute`
- ה-Rich Text Editor תומך ב-Markdown
