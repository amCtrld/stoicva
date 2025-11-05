import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources — StoicVA',
  description: 'Articles and insights to help you build calm, focused, and efficient workflows.',
  openGraph: {
    title: 'Resources — StoicVA',
    description: 'Articles and insights to help you build calm, focused, and efficient workflows.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources — StoicVA',
    description: 'Articles and insights to help you build calm, focused, and efficient workflows.',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}