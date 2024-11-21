'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function FacultyLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const { data, error } = await supabase
        .from('faculty_members')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (error) throw error

      if (data) {
        // Store faculty info in localStorage (you might want to use a more secure method in production)
        localStorage.setItem('facultyMember', JSON.stringify(data))
        router.push('/faculty/submit-speaker')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center">Faculty Login</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}