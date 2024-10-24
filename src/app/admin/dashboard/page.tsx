'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Speaker {
  id: number
  name: string
  expertise: string
  background: string
  submitted_by: string
  status: string
}

export default function AdminDashboard() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin/login')
    } else {
      fetchSpeakers()
    }
  }, [router])

  const fetchSpeakers = async () => {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching speakers:', error)
    } else {
      setSpeakers(data || [])
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <button onClick={handleLogout} className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors duration-200">
            Logout
          </button>
        </div>
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Expertise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Submitted By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {speakers.map((speaker) => (
                <tr key={speaker.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{speaker.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{speaker.expertise}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{speaker.submitted_by}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{speaker.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/speaker/${speaker.id}`} className="text-primary hover:text-primary/80 transition-colors duration-200">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}