export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // פלטת צבעים מאוחדת
        primary: {
          50: '#fef7f5',
          100: '#fdeae6',
          200: '#fcd5cc',
          300: '#fab6a9',
          400: '#f78775',
          500: '#FC7753', // צבע ראשי - כתום אדום
          600: '#e86845',
          700: '#d45539',
          800: '#b3442f',
          900: '#8f3625',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#66D7D1', // צבע משני - טורקיז
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        neutral: {
          50: '#f9f8f7',
          100: '#F2EFEA', // צבע רקע - קרם בהיר
          200: '#e8e5e0',
          300: '#d4d0c8',
          400: '#a8a294',
          500: '#8b8575',
          600: '#706a5c',
          700: '#5b554a',
          800: '#403D58', // צבע טקסט - סגול כהה
          900: '#2a2637',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#DBD56E', // צבע accent - צהוב זהב
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Override Tailwind defaults to use our palette
        cyan: 'var(--tw-empty,/*!*/ /*!*/)',
        blue: 'var(--tw-empty,/*!*/ /*!*/)',
        red: 'var(--tw-empty,/*!*/ /*!*/)',
        green: 'var(--tw-empty,/*!*/ /*!*/)',
        yellow: 'var(--tw-empty,/*!*/ /*!*/)',
        purple: 'var(--tw-empty,/*!*/ /*!*/)',
      },
      backgroundColor: {
        'primary': '#FC7753',
        'secondary': '#66D7D1',
        'neutral': '#F2EFEA',
        'accent': '#DBD56E',
      },
      textColor: {
        'primary': '#FC7753',
        'secondary': '#66D7D1',
        'neutral': '#403D58',
        'accent': '#DBD56E',
      },
      borderColor: {
        'primary': '#FC7753',
        'secondary': '#66D7D1',
        'neutral': '#403D58',
        'accent': '#DBD56E',
      },
    },
  },
  plugins: [],
};
