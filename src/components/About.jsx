import React from 'react';
import { GiSteeringWheel } from 'react-icons/gi';

function About() {
  const features = [
    {
      title: 'Vehicle Inventory',
      description: 'Comprehensive management of your entire fleet with detailed records and images.',
      icon: '🚗',
      color: 'blue'
    },
    {
      title: 'Maintenance Tracking',
      description: 'Schedule and track service appointments to keep your vehicles in top condition.',
      icon: '🔧',
      color: 'yellow'
    },
    {
      title: 'Performance Analytics',
      description: 'Visualize trends and insights about your fleet with powerful analytics tools.',
      icon: '📊',
      color: 'purple'
    },
    {
      title: 'Service History',
      description: 'Complete records of all maintenance and repairs for each vehicle.',
      icon: '📋',
      color: 'red'
    },
    {
      title: 'Value Tracking',
      description: 'Monitor the total value of your fleet and individual vehicle valuations.',
      icon: '💰',
      color: 'yellow'
    },
    {
      title: 'Export Data',
      description: 'Download your fleet data in various formats for reporting and backup.',
      icon: '📤',
      color: 'blue'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      red: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-400 p-6 rounded-2xl shadow-lg">
              <GiSteeringWheel className="text-6xl text-blue-900 animate-pulse" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
          About AutoTrack
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your comprehensive vehicle management solution, designed to help car enthusiasts and owners 
          keep track of their automotive investments with precision and ease.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed text-blue-100">
          Whether you're a collector managing a prestigious fleet, a dealer tracking inventory, 
          or simply passionate about maintaining your personal vehicles, AutoTrack provides the 
          tools you need to stay organized, informed, and in control of your automotive assets.
        </p>
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent text-center">
          Powerful Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl ${getColorClasses(feature.color)} flex items-center justify-center text-3xl mb-4 border-2`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">100%</div>
            <div className="text-blue-800 font-semibold">Free to Use</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">∞</div>
            <div className="text-blue-800 font-semibold">Unlimited Vehicles</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">24/7</div>
            <div className="text-blue-800 font-semibold">Access Anytime</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center border-2 border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Join AutoTrack today and take control of your vehicle management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/add"
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-300 transition-all duration-200 hover:scale-105 shadow-lg shadow-yellow-500/40"
          >
            Add Your First Vehicle
          </a>
          <a
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl font-bold text-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            View Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export default About; 