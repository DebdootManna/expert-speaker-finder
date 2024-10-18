import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <h1 className="text-5xl font-bold mb-8 text-primary">Expert Speaker Finder</h1>
      <div className="space-y-4 w-full max-w-md">
        <Link href="/submit-speaker" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex justify-center items-center text-lg font-semibold w-full">
          Submit a Speaker
        </Link>
        <Link href="/admin/login" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors duration-200 flex justify-center items-center text-lg font-semibold w-full">
          Admin Login
        </Link>
      </div>
    </div>
  )
}