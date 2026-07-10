'use client'

import { LandingExperience } from '@/components/landing/landing-experience'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader transparent={true} />
      
      <main>
        <LandingExperience />
      </main>

      <SiteFooter />
    </div>
  )
}

