'use client'
import Feed from '@/components/Feed'

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-between p-24">
        <Feed/>
      </main>
    </div>
  )
}
