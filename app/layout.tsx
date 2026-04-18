import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Velrox - Android Smartphone Repair Tips & Guides',
  description: 'Expert guides and troubleshooting tips for your Android smartphone. Fix common issues, extend battery life, and optimize performance.',
  generator: 'Kelvin Koech',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">V</span>
                </div>
                <span className="text-xl font-bold group-hover:text-primary transition-colors">Velrox</span>
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link>
                <Link href="/search" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  <Search className="h-4 w-4" />
                  Search
                </Link>
              </nav>

              <div className="md:hidden">
                <Link href="/search">
                  <Search className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t bg-card/50 mt-16 md:mt-20">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">V</span>
                  </div>
                  <h3 className="font-bold">Velrox</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Expert guides for Android smartphone repair and troubleshooting tips.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/category/Charging Issues" className="text-muted-foreground hover:text-primary transition-colors">Charging Issues</Link></li>
                  <li><Link href="/category/Battery" className="text-muted-foreground hover:text-primary transition-colors">Battery</Link></li>
                  <li><Link href="/category/Performance" className="text-muted-foreground hover:text-primary transition-colors">Performance</Link></li>
                  <li><Link href="/category/Apps" className="text-muted-foreground hover:text-primary transition-colors">Apps</Link></li>
                  <li><Link href="/category/Network" className="text-muted-foreground hover:text-primary transition-colors">Network</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                  <li><Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">Search</Link></li>
                  <li><a href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Admin</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">About</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Velrox provides practical solutions for common smartphone issues and performance optimization.
                </p>
              </div>
            </div>

            <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                &copy; {new Date().getFullYear()} Velrox. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
