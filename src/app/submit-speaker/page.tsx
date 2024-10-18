'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SubmitSpeaker() {
  const [name, setName] = useState('')
  const [expertise, setExpertise] = useState('')
  const [background, setBackground] = useState('')
  const [submittedBy, setSubmittedBy] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    try {
      const { data, error } = await supabase
        .from('speakers')
        .insert([{ name, expertise, background, submitted_by: submittedBy }])
      
      if (error) throw error
      setMessage('Speaker submitted successfully!')
      setName('')
      setExpertise('')
      setBackground('')
      setSubmittedBy('')
    } catch (error) {
      console.error('Error submitting speaker:', error)
      setMessage(`Error submitting speaker: ${error.message || 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Submit a Speaker</h1>
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expertise" className="block text-sm font-medium text-muted-foreground mb-1">Expertise</label>
          <input
            type="text"
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            required
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="background" className="block text-sm font-medium text-muted-foreground mb-1">Background</label>
          <textarea
            id="background"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            required
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="submittedBy" className="block text-sm font-medium text-muted-foreground mb-1">Submitted By</label>
          <input
            type="text"
            id="submittedBy"
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            required
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button type="submit" className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200">
          Submit Speaker
        </button>
      </form>
      {message && <p className="mt-4 text-center text-primary">{message}</p>}
    </div>
  )
}