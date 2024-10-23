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

export default function SpeakerDetails({ params }: { params: { id: string } }) {
  const [speaker, setSpeaker] = useState<Speaker | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin/login')
    } else {
      fetchSpeaker()
    }
  }, [router])

  const fetchSpeaker = async () => {
    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching speaker:', error)
    } else {
      setSpeaker(data)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!speaker) return

    const { error } = await supabase
      .from('speakers')
      .update({ status: newStatus })
      .eq('id', speaker.id)

    if (error) {
      console.error('Error updating speaker status:', error)
    } else {
      setSpeaker({ ...speaker, status: newStatus })
    }
  }

  if (!speaker) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/dashboard" className="text-primary hover:text-primary/80 transition-colors duration-200 mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-primary mb-6">{speaker.name}</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-muted-foreground">Expertise</h2>
              <p className="text-foreground">{speaker.expertise}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-muted-foreground">Background</h2>
              <p className="text-foreground">{speaker.background}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-muted-foreground">Submitted By</h2>
              <p className="text-foreground">{speaker.submitted_by}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-muted-foreground">Status</h2>
              <p className="text-foreground">{speaker.status}</p>
            </div>
          </div>
          <div className="mt-8 space-x-4">
            <button
              onClick={() => handleStatusChange('approved')}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange('rejected')}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}