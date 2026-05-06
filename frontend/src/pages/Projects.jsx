import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { API_BASE_URL, ADMIN_BASE_URL } from "../config";
import "leaflet/dist/leaflet.css";

// Video Checker Helper
const isVideoFile = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg)$/i.test(url);
};

const Projects = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState("all");

  // 🔥 HANDLE HASH FOR TABS
  useEffect(() => {
    if (location.hash) {
      const tab = decodeURIComponent(location.hash.replace("#", ""));
      setActiveTab(tab);
    } else {
      setActiveTab("all");
    }
  }, [location]);

  // FETCH DATA
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects.php?t=${Date.now()}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          setProjects(data.data);
          
          // Set default tab to "all" or first available category if no hash
          if (!location.hash) {
            setActiveTab("all");
          }
        } else {
          setError(data.message || 'Failed to fetch projects');
        }
      } catch (err) {
        setError('Could not connect to the database API.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [location.hash]);

  // 🔥 SCROLL LOGIC FOR ARROWS
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 300;
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // 🔥 EXTRACT UNIQUE CATEGORIES
  const uniqueCategories = [
    "all",
    ...new Set(projects.map((p) => p.category?.trim()).filter(Boolean)),
  ];

  // Helper to format tab labels
  const formatTabLabel = (label) => {
    if (label === "all") return "All Projects 🏢";
    return label.replace(/[_-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // 🔥 FILTER PROJECTS
  const displayProjects = activeTab === "all" 
    ? projects 
    : projects.filter((p) => p.category?.trim() === activeTab);

  return (
    <div className="bg-bg-color min-h-screen pb-20">
      
      {/* HERO SECTION */}
      <section id="ongoing" className="bg-accent text-white py-20 relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Ongoing Projects</h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-50">
            Discover our active interventions and on-ground activities across various geographies.
          </p>
        </div>
      </section>

      {/* 🔥 TABS NAVBAR (Banner ke thik niche) */}
      <section className="border-b sticky top-20 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
          
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center w-10 h-10 border border-gray-100"
          >
            <span>❮</span>
          </button>

          {/* Scrollable Tabs */}
          <div
            ref={scrollRef}
            className="flex items-center space-x-8 overflow-x-auto no-scrollbar scroll-smooth px-12"
          >
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  window.history.replaceState(null, "", `#${cat}`);
                }}
                className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors shrink-0 ${
                  activeTab === cat
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-primary"
                }`}
              >
                {formatTabLabel(cat)}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-lg rounded-full hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center w-10 h-10 border border-gray-100"
          >
            <span>❯</span>
          </button>
        </div>
      </section>

      {/* PROJECT LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            <div className="col-span-2 py-12 text-center text-gray-500 flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              Loading active projects...
            </div>
          ) : error ? (
            <div className="col-span-2 py-8 px-6 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center">
              ⚠️ {error}
            </div>
          ) : displayProjects.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              No projects found in this category.
            </div>
          ) : (
            displayProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                
                {/* Media Section */}
                <div className="w-full md:w-48 h-48 shrink-0">
                  {isVideoFile(project.image_url) ? (
                    <video 
                      src={`${ADMIN_BASE_URL}${project.image_url.replace(/^\/+/, '')}`} 
                      className="w-full h-full object-cover rounded-lg"
                      autoPlay loop muted playsInline
                    />
                  ) : (
                    <img 
                      src={`${ADMIN_BASE_URL}${project.image_url.replace(/^\/+/, '')}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image" }}
                    />
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col">
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{project.category}</div>
                  <h3 className="text-2xl font-serif font-bold text-text-primary mb-2 leading-tight">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 mt-auto">
                    <span className="text-base">📍</span> {project.location}
                  </div>
                  <Link to={`/projectdetails/${project.slug}`} className="inline-block bg-primary hover:bg-[#5a6425] text-white px-5 py-2 rounded font-medium text-sm transition-colors text-center self-start">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
