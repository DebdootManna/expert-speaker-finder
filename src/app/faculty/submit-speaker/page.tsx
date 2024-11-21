/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function SubmitSpeaker() {
  const [name, setName] = useState('')
  const [expertise, setExpertise] = useState('')
  const [email, setEmail] = useState('')
  const [background, setBackground] = useState('')
  const [speakers, setSpeakers] = useState<any[]>([])
  interface FacultyMember {
    email: string;
  }

  const [facultyMember, setFacultyMember] = useState<FacultyMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const storedFacultyMember = localStorage.getItem('facultyMember')
    if (!storedFacultyMember) {
      router.push('/faculty/login')
      return
    }
    setFacultyMember(JSON.parse(storedFacultyMember))
    fetchSpeakers()
    setIsLoading(false)
  }, [])

  const fetchSpeakers = async () => {
    try {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setSpeakers(data || [])
    } catch (error) {
      console.error('Error fetching speakers:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { error } = await supabase
        .from('speakers')
        .insert([
          {
            name,
            expertise,
            email,
            background,
            submitted_by: facultyMember?.email || '',
            status: 'pending'
          }
        ])

      if (error) throw error

      // Reset form and refresh speakers list
      setName('')
      setExpertise('')
      setEmail('')
      setBackground('')
      await fetchSpeakers()
    } catch (error) {
      console.error('Error submitting speaker:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-gray-900 text-white">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-center">Speaker Submissions</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg border border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Submitted Speakers</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-600 px-4 py-2">Name</th>
                    <th className="border border-gray-600 px-4 py-2">Expertise</th>
                    <th className="border border-gray-600 px-4 py-2">Status</th>
                    <th className="border border-gray-600 px-4 py-2">Submitted By</th>
                  </tr>
                </thead>
                <tbody>
                  {speakers.map((speaker) => (
                    <tr key={speaker.id}>
                      <td className="border border-gray-700 px-4 py-2">{speaker.name}</td>
                      <td className="border border-gray-700 px-4 py-2">{speaker.expertise}</td>
                      <td className="border border-gray-700 px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded ${
                          speaker.status === 'approved' 
                            ? 'bg-green-900 text-green-100' 
                            : speaker.status === 'rejected'
                            ? 'bg-red-900 text-red-100'
                            : 'bg-yellow-900 text-yellow-100'
                        }`}>
                          {speaker.status.charAt(0).toUpperCase() + speaker.status.slice(1)}
                        </span>
                      </td>
                      <td className="border border-gray-700 px-4 py-2">{speaker.submitted_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-4">Submit a New Speaker</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <div>
                <label htmlFor="expertise" className="block text-sm font-medium">
                  Expertise
                </label>
                <input
                  type="text"
                  id="expertise"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

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
                <label htmlFor="background" className="block text-sm font-medium">
                  Background
                </label>
                <textarea
                  id="background"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-white px-4 py-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Submit Speaker'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}