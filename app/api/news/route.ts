import { NextResponse } from 'next/server'

export async function GET() {

  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines/sources?language=en&apiKey=${apiKey}`;


  const response = await fetch(url)
  const data = await response.json()

  return NextResponse.json(data)
}
