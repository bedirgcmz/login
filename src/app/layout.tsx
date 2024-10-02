import "@/styles/global.css";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@/newcontext/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-[100vh]">
        <UserProvider>
          <Header />
          <Menu />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
