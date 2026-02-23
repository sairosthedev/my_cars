import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { GiSteeringWheel } from 'react-icons/gi'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white mt-auto border-t-2 border-yellow-500">
      <div className="max-w-[1600px] mx-auto py-6 px-3 sm:px-4 lg:px-6">
        <div className="flex flex-wrap justify-between items-center">
          {/* Brand Section */}
          <div className="flex items-center space-x-2 group">
            <GiSteeringWheel className="text-2xl text-yellow-400 transition-transform duration-500 group-hover:rotate-180" />
            <span className="text-lg font-bold tracking-wide">
              Auto<span className="text-yellow-400">Track</span>
            </span>
          </div>

          {/* Center Section - Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 transform hover:-translate-y-1"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 transform hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:-translate-y-1"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-300 text-sm font-light tracking-wide">
            © {currentYear} <span className="text-yellow-400">AutoTrack</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 