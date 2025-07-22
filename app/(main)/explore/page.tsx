'use client'

import { closeLoadingScreen } from '@/redux/slices/loadingSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface NewsSource {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}

export default function DiscoverPage() {
  const [sources, setSources] = useState<NewsSource[]>([])
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const res = await fetch('/api/news') 
        const data = await res.json()
        if (data.status === 'ok') {
          setSources(data.sources)
          dispatch(closeLoadingScreen())
        } else {
          setError(data.message || 'Failed to load news sources')
        }
      } catch (err) {
        setError('Something went wrong')
      }
    }

    fetchSources()
  }, [])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📰 Discover News Sources</h1>
      
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {sources.map((source) => (
          <li key={source.id} className="p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold">{source.name}</h2>
            <p className="text-gray-600 mb-2">{source.description}</p>
            <p className="text-sm text-gray-500">
              Category: {source.category} | Language: {source.language} | Country: {source.country}
            </p>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Visit Source
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
