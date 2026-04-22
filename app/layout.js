import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata = {
  title: ' هايبر ماركت الاهرام',
  description: 'أفضل هايبر ماركت في مصر - تسوق أونلاين',
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="ar">
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}