import "./globals.css";
import CustomSessionProvider from './providers/SessionProvider';
import { Kanit } from 'next/font/google'

export const metadata = {
  title: "My Wallet",
  description: "My Wallet is a web application that helps users manage their personal finances with features for account registration, secure authentication, and intuitive financial tracking.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: 'images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: 'images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-kanit',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${kanit.variable} font-sans`}>
      <body className="font-kanit">
        <CustomSessionProvider>{children}</CustomSessionProvider>
      </body>
    </html>
  );
}
