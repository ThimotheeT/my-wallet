import "./globals.css";
import CustomSessionProvider from './providers/SessionProvider';

export const metadata = {
  title: "My Wallet",
  description: "My Wallet is a web application that helps users manage their personal finances with features for account registration, secure authentication, and intuitive financial tracking.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomSessionProvider>{children}</CustomSessionProvider>
      </body>
    </html>
  );
}
