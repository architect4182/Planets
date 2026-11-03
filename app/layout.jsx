import './globals.css';

export const metadata = {
  title: 'Planet Jumping — Immersive Space Portal Experience',
  description: 'A full-viewport cinematic landing experience with a canvas-driven 3D portal and video transitions.',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/logo.svg'],
    apple: ['/logo.svg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#090807',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}

