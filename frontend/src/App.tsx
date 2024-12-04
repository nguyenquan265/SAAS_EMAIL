import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './pages/Auth'
import SignInPage from './pages/Auth/SignIn'
import SignUpPage from './pages/Auth/SignUp'
import RootLayout from './pages/Root'
import HomePage from './pages/Root/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />
      }
    ]
  },
  {
    path: '/sign-up',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
