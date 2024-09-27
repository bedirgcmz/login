// layout.tsx
import "@/styles/global.css";
import { UserProvider } from "@/context/AuthContext";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-[100vh]">
        {/* UserProvider ile tüm uygulamayı sarmalıyoruz */}
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
