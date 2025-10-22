/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '87.5rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }], // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
        '8xl': ['6rem', { lineHeight: '1' }], // 96px
        '9xl': ['8rem', { lineHeight: '1' }], // 128px
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        black: {
          100: '#313239',
          200: '#303030',
          300: '#1A1D1F',
          400: '#111315',
          500: '#181818',
        },
        darkblue: {
          100: '#090524',
        },
        white: {
          100: '#FFFFFF',
          200: '#F5F5F5',
          300: '#EEEEEE',
        },
        green: {
          100: '#49FB3A',
        },
        blue: {
          100: '#298FC4',
        },
        red: {
          100: '#FF3D00',
          200: '#EB4F27',
          300: '#ff8566',
        },
        gray: {
          100: '#6C7284',
          200: '#B6B6B6',
          300: '#202020',
        },
        rgba255: {
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
          300: 'rgba(255, 255, 255, 0.3)',
          400: 'rgba(255, 255, 255, 0.4)',
          500: 'rgba(255, 255, 255, 0.5)',
          600: 'rgba(255, 255, 255, 0.6)',
          700: 'rgba(255, 255, 255, 0.7)',
          800: 'rgba(255, 255, 255, 0.8)',
          900: 'rgba(255, 255, 255, 0.9)',
        },
        rgba182: {
          100: 'rgba(182, 182, 182, 0.1)',
          200: 'rgba(182, 182, 182, 0.2)',
          300: 'rgba(182, 182, 182, 0.3)',
          400: 'rgba(182, 182, 182, 0.4)',
          500: 'rgba(182, 182, 182, 0.5)',
          600: 'rgba(182, 182, 182, 0.6)',
          700: 'rgba(182, 182, 182, 0.7)',
          800: 'rgba(182, 182, 182, 0.8)',
          900: 'rgba(182, 182, 182, 0.9)',
        },
        rgba10: {
          100: 'rgba(10, 10, 10, 0.1)',
          150: 'rgba(10, 10, 10, 0.15)',
          200: 'rgba(10, 10, 10, 0.2)',
          300: 'rgba(10, 10, 10, 0.3)',
          400: 'rgba(10, 10, 10, 0.4)',
          500: 'rgba(10, 10, 10, 0.5)',
          600: 'rgba(10, 10, 10, 0.6)',
          700: 'rgba(10, 10, 10, 0.7)',
          800: 'rgba(10, 10, 10, 0.8)',
          900: 'rgba(10, 10, 10, 0.9)',
        },
        rgba137: {
          100: 'rgba(137, 137, 137, 0.1)',
          140: 'rgba(137, 137, 137, 0.14)',
          200: 'rgba(137, 137, 137, 0.2)',
          300: 'rgba(137, 137, 137, 0.3)',
          400: 'rgba(137, 137, 137, 0.4)',
          500: 'rgba(137, 137, 137, 0.5)',
          600: 'rgba(137, 137, 137, 0.6)',
          700: 'rgba(137, 137, 137, 0.7)',
          800: 'rgba(137, 137, 137, 0.8)',
          900: 'rgba(137, 137, 137, 0.9)',
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem', // 2px
        DEFAULT: '0.25rem', // 4px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.125rem', // 18px
        '4xl': '1.5rem', // 24px
        '5xl': '2rem', // 32px
        full: '9999px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
