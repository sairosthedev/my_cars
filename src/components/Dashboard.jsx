import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Stats from './Stats';
import { supabase } from '../utils/supabaseClient';
import { formatCurrency } from '../utils/format';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*');

        if (error) throw error;
        setCars(data);
      } catch (error) {
        setError('Error fetching car data.');
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Modern skeleton loading state
  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl h-32">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Modern error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800">Error Loading Dashboard</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const averageYear = Math.round(cars.reduce((sum, car) => sum + car.year, 0) / cars.length) || 0;

  const slidesToShow = Math.min(3, Math.max(cars.length, 1));
  const settings = {
    dots: true,
    infinite: cars.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: Math.min(1, slidesToShow),
    autoplay: cars.length > slidesToShow,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="space-y-12">
      {/* Stats Section */}
      <Stats 
        totalValue={totalValue} 
        carCount={cars.length} 
        averageYear={averageYear} 
      />

      {/* Featured Vehicles Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              Your Collection
            </h2>
            <p className="text-gray-600 mt-1">Browse your automotive portfolio</p>
          </div>
          <Link 
            to="/inventory"
            className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/40"
          >
            <span>View All</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Car Cards Carousel */}
        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-dashed border-gray-300">
            <div className="p-6 bg-white rounded-full shadow-lg mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No vehicles yet</h3>
            <p className="text-gray-600 mb-6">Start building your collection</p>
            <Link
              to="/add"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/40"
            >
              Add Your First Vehicle
            </Link>
          </div>
        ) : (
          <div className="slider-container px-2">
            <Slider {...settings}>
              {cars.map(car => (
                <div key={car.id} className="px-3">
                  <Link
                    to={`/car/${car.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100">
                      {/* Image Section with Overlay */}
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                          src={car.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 rounded-full font-bold shadow-lg backdrop-blur-sm">
                            {formatCurrency(car.price)}
                          </div>
                        </div>
                        {/* Year Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full font-semibold text-sm shadow-md">
                            {car.year}
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-200">
                          {car.make} {car.model}
                        </h3>
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <div className="p-2 bg-yellow-50 rounded-lg">
                              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium">{car.transmission}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium">{car.fuel_type}</span>
                          </div>
                        </div>

                        {/* View Details Button */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between text-yellow-600 font-semibold group-hover:text-yellow-700">
                            <span>View Details</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 