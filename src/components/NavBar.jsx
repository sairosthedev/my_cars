import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { GiSteeringWheel } from 'react-icons/gi'
import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'

function NavBar({ setActiveView = () => {} }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.clear();
      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
    { path: '/inventory', label: 'Inventory', icon: ClipboardDocumentListIcon, view: 'inventory' },
    { path: '/analytics', label: 'Analytics', icon: ChartBarIcon, view: 'analytics' },
    { path: '/maintenance', label: 'Maintenance', icon: WrenchScrewdriverIcon, view: 'maintenance' },
    { path: '/add', label: 'Add Car', icon: PlusCircleIcon, view: 'add' },
    { path: '/about', label: 'About', icon: InformationCircleIcon, view: 'about' },
  ]

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg border-b-2 border-yellow-500">
      <nav className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-yellow-500 p-2.5 rounded-xl shadow-lg">
                <GiSteeringWheel className="text-xl text-blue-900 transition-transform duration-500 group-hover:rotate-180" />
              </div>
            </div>
            <span className="font-bold text-xl text-white tracking-wide">
              Auto<span className="text-yellow-400">Track</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(({ path, label, icon: Icon, view }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setActiveView(view)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
                  ${isActive(path)
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 shadow-lg shadow-yellow-500/40 font-semibold'
                    : 'text-white hover:bg-white/10 hover:text-yellow-300'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Sign Out */}
          <button
            onClick={handleSignOut}
            className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm text-white hover:bg-red-800/80 hover:text-yellow-300 transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-yellow-400 hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-yellow-500/30">
            <div className="space-y-1">
              {navLinks.map(({ path, label, icon: Icon, view }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => {
                    setActiveView(view)
                    setMobileMenuOpen(false)
                  }}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                    ${isActive(path)
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 shadow-lg shadow-yellow-500/40 font-semibold'
                      : 'text-white hover:bg-white/10 hover:text-yellow-300'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm text-white hover:bg-red-800/80 hover:text-yellow-300 transition-all duration-200"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default NavBar