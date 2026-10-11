import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ACC Ahmed Coaching Center | Best Tuition & Coaching in Malir Alameen City',
  description: 'Welcome to ACC Ahmed Coaching Center, Malir Alameen City. Providing top-quality education from Class 1 to 2nd Year with expert faculty and online admission support.',
  keywords: 'coaching center malir, tuition classes alameen city, ACC ahmed coaching center, 9th 10th classes admission malir, best coaching in malir',
  icons: {
    icon: '/icon.png', // Yahan apni logo file ka path dena (agar app folder mein icon.png rakhi hai)
  },
  openGraph: {
    title: 'ACC Ahmed Coaching Center - Malir Alameen City',
    description: 'Join the best coaching center in Malir. Admissions open from Class 1 to 2nd Year!',
    siteName: 'ACC Ahmed Coaching Center',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}