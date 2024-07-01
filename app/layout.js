import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import { ThemeProvider } from "./UI/ThemeProvider";
import ReduxProvider from "./redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReduxProvider>
          <ToastContainer />
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
