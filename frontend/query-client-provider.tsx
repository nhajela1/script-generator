'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

interface QueryClientProviderProps {
  children: ReactNode
}

export default function QueryClientProvider({ children }: QueryClientProviderProps) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}
