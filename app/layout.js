import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SmartMeal Planner',
  description: 'Personalized meal planning and grocery assistant',
};

// dynamically import the client Providers at render-time to avoid serializing a client component
export default async function RootLayout({ children }) {
  const { default: Providers } = await import('./providers');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}