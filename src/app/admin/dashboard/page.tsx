/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [speakers, setSpeakers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchSpeakers()
  }, [])

  const fetchSpeakers = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('speakers')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setSpeakers(data || [])
    } catch (error) {
      console.error('Error fetching speakers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSpeakerStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('speakers')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchSpeakers() // Refresh the list after update
    } catch (error) {
      console.error('Error updating speaker status:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">Loading...</div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col p-24 bg-gray-900 text-white">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Speaker Submissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-2">Name</th>
                  <th className="border border-gray-600 px-4 py-2">Expertise</th>
                  <th className="border border-gray-600 px-4 py-2">Email</th>
                  <th className="border border-gray-600 px-4 py-2">Background</th>
                  <th className="border border-gray-600 px-4 py-2">Submitted By</th>
                  <th className="border border-gray-600 px-4 py-2">Status</th>
                  <th className="border border-gray-600 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {speakers.map((speaker) => (
                  <tr key={speaker.id}>
                    <td className="border border-gray-700 px-4 py-2">{speaker.name}</td>
                    <td className="border border-gray-700 px-4 py-2">{speaker.expertise}</td>
                    <td className="border border-gray-700 px-4 py-2">{speaker.email}</td>
                    <td className="border border-gray-700 px-4 py-2">{speaker.background}</td>
                    <td className="border border-gray-700 px-4 py-2">{speaker.submitted_by}</td>
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
                    <td className="border border-gray-700 px-4 py-2">
                      {speaker.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateSpeakerStatus(speaker.id, 'approved')}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateSpeakerStatus(speaker.id, 'rejected')}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}