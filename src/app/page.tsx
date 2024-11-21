import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Expert Speaker Finder</h1>
      <div className="space-y-4 w-full max-w-xs">
        <Link 
          href="/faculty/login" 
          className="block w-full bg-white text-gray-900 px-4 py-2 rounded-lg text-center hover:bg-gray-100 transition-colors"
        >
          Submit a Speaker
        </Link>
        <Link 
          href="/admin/login" 
          className="block w-full bg-gray-800 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-700 transition-colors"
        >
          Admin Login
        </Link>
      </div>
    </main>
  )
}