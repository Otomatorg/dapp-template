import Layout from '@/components/layout/layout'
import HomePage from '@/features/homepage/homepage'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
