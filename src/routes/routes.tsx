import Layout from '@/components/layout/layout'
import { PATHNAME } from '@/constants/pathname'
import DeFiAssistant from '@/features/defi-assistant/defi-assistant'
import HomePage from '@/features/homepage/homepage'
import HyperEVMDeFiAssistant from '@/features/hyperevm-defi-assistant/hyperevm-defi-assistant'
import { Suspense } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: PATHNAME.HOME,
        element: <HomePage />,
      },
      {
        path: PATHNAME.DEFI_ASSISTANT,
        element: <DeFiAssistant />,
      },
      {
        path: PATHNAME.HYPEREVM_DEFI_ASSISTANT,
        element: <HyperEVMDeFiAssistant />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback="">
        <div>404</div>
      </Suspense>
    ),
  },
]

export const router = createBrowserRouter(routes)
