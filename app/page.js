'use client'
import Feed from '@/components/Feed'
import Nav from '@/components/Nav'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Nav/>
      <main className="flex flex-col items-center justify-between p-24">
        <Feed/>
      </main>
    </div>
  )
}
