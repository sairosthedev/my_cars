// Importing necessary components
import NavBar from './NavBar';
import Footer from './Footer';

// Layout component definition
const Layout = ({ children, isAuthenticated, successMessage }) => {
  // Rendering the layout
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {isAuthenticated && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white">
          <NavBar />
        </div>
      )}
      <div className={`max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 w-full ${isAuthenticated ? 'mt-20' : ''} flex-grow`}>
        {successMessage && isAuthenticated && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}
        {children}
      </div>
      {isAuthenticated && <Footer />}
    </div>
  );
};

// Exporting the Layout component
export default Layout; 