import { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Video, 
  FileText, 
  Download, 
  ExternalLink,
  Calendar,
  Users,
  TrendingUp,
  Filter
} from 'lucide-react';

const ResourceHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample resource data
  const resourceCategories = [
    { id: 'all', name: 'All Resources', icon: <BookOpen size={18} />, count: 42 },
    { id: 'guides', name: 'Guides & Tutorials', icon: <FileText size={18} />, count: 12 },
    { id: 'videos', name: 'Video Tutorials', icon: <Video size={18} />, count: 8 },
    { id: 'templates', name: 'Templates', icon: <Download size={18} />, count: 10 },
    { id: 'webinars', name: 'Webinars', icon: <Calendar size={18} />, count: 6 },
    { id: 'case-studies', name: 'Case Studies', icon: <TrendingUp size={18} />, count: 4 },
    { id: 'community', name: 'Community Resources', icon: <Users size={18} />, count: 2 },
  ];
  
  const resources = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: 'A comprehensive guide for beginners to get up and running quickly.',
      category: 'guides',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1245,
      date: '2023-10-15',
      featured: true,
      link: '#'
    },
    {
      id: 2,
      title: 'Advanced Configuration Tutorial',
      description: 'Learn advanced configuration options and best practices.',
      category: 'guides',
      type: 'Article',
      size: '12 min read',
      downloads: 892,
      date: '2023-09-22',
      featured: true,
      link: '#'
    },
    {
      id: 3,
      title: 'Dashboard Design Templates',
      description: '10 customizable dashboard templates for various use cases.',
      category: 'templates',
      type: 'ZIP',
      size: '15.7 MB',
      downloads: 3102,
      date: '2023-11-05',
      featured: true,
      link: '#'
    },
    {
      id: 4,
      title: 'Product Walkthrough Video',
      description: 'A complete product tour with real-world examples.',
      category: 'videos',
      type: 'Video',
      size: '18:34',
      downloads: 2456,
      date: '2023-10-30',
      featured: false,
      link: '#'
    },
    {
      id: 5,
      title: 'Q4 Webinar: New Features',
      description: 'Recording of our latest webinar showcasing new features.',
      category: 'webinars',
      type: 'Recording',
      size: '58:12',
      downloads: 1203,
      date: '2023-11-20',
      featured: false,
      link: '#'
    },
    {
      id: 6,
      title: 'Enterprise Implementation Case Study',
      description: 'How Company X increased productivity by 40% using our solution.',
      category: 'case-studies',
      type: 'Case Study',
      size: '8 min read',
      downloads: 867,
      date: '2023-09-10',
      featured: false,
      link: '#'
    },
    {
      id: 7,
      title: 'API Reference Documentation',
      description: 'Complete API documentation with examples for all endpoints.',
      category: 'guides',
      type: 'Documentation',
      size: '45 pages',
      downloads: 4501,
      date: '2023-08-15',
      featured: false,
      link: '#'
    },
    {
      id: 8,
      title: 'Community Best Practices',
      description: 'Tips and tricks collected from our user community.',
      category: 'community',
      type: 'Article',
      size: '10 min read',
      downloads: 1203,
      date: '2023-11-12',
      featured: false,
      link: '#'
    }
  ];
  
  // Filter resources based on search and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured resources
  const featuredResources = resources.filter(resource => resource.featured);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Resource Hub</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Access guides, tutorials, templates, and more to help you get the most out of our platform.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <Download className="mr-2" size={18} />
                Download All Resources
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by:</span>
              <select 
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {resourceCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-2 text-blue-600" size={24} />
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                      {resource.type}
                    </div>
                    <span className="text-gray-500 text-sm">{resource.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="mr-4">{resource.size}</span>
                      <span>↓ {resource.downloads.toLocaleString()} downloads</span>
                    </div>
                    <a 
                      href={resource.link} 
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      Access
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with categories */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {resourceCategories.map(category => (
                  <li key={category.id}>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${selectedCategory === category.id ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-500">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${selectedCategory === category.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}>
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Beginner', 'Advanced', 'API', 'Integration', 'Best Practices', 'Troubleshooting'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main resource list */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Resources' : 
                 resourceCategories.find(c => c.id === selectedCategory)?.name}
                <span className="text-gray-500 text-lg font-normal ml-2">
                  ({filteredResources.length} {filteredResources.length === 1 ? 'item' : 'items'})
                </span>
              </h2>
              <div className="text-sm text-gray-500">
                Sorted by: <span className="font-medium text-gray-700">Most Popular</span>
              </div>
            </div>
            
            {filteredResources.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 text-left font-medium text-gray-700">Resource</th>
                        <th className="py-4 px-6 text-left font-medium text-gray-700 hidden md:table-cell">Type</th>
                        <th className="py-4 px-6 text-left font-medium text-gray-700 hidden lg:table-cell">Downloads</th>
                        <th className="py-4 px-6 text-left font-medium text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredResources.map(resource => (
                        <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div>
                              <h4 className="font-bold text-gray-900">{resource.title}</h4>
                              <p className="text-gray-600 text-sm mt-1 max-w-2xl">{resource.description}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <span>{resourceCategories.find(c => c.id === resource.category)?.icon}</span>
                                <span className="ml-1">{resourceCategories.find(c => c.id === resource.category)?.name}</span>
                                <span className="mx-2">•</span>
                                <span>{resource.date}</span>
                                <span className="mx-2">•</span>
                                <span>{resource.size}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 hidden md:table-cell">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                              {resource.type}
                            </span>
                          </td>
                          <td className="py-4 px-6 hidden lg:table-cell">
                            <div className="flex items-center">
                              <Download size={16} className="text-gray-400 mr-1" />
                              <span className="font-medium">{resource.downloads.toLocaleString()}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              <a 
                                href={resource.link} 
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                              >
                                <Download size={16} className="mr-2" />
                                Download
                              </a>
                              <a 
                                href={resource.link} 
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                              >
                                <ExternalLink size={16} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No resources found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No resources match your search criteria. Try adjusting your search or filter.
                </p>
                <button 
                  className="mt-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
            
            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-600 text-white rounded-lg mr-4">
                    <Download size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Total Downloads</p>
                    <p className="text-2xl font-bold text-blue-900">14,869</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-600 text-white rounded-lg mr-4">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-green-800 font-medium">Total Resources</p>
                    <p className="text-2xl font-bold text-green-900">42</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-600 text-white rounded-lg mr-4">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-purple-800 font-medium">Active Users</p>
                    <p className="text-2xl font-bold text-purple-900">2,845</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer section */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Need More Help?</h3>
              <p className="text-gray-600">Check out our documentation or contact support.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourceHub;