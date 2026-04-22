import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [dynamicPrograms, setDynamicPrograms] = useState([]);

  // 🔥 ONLY FIX (NO UI CHANGE)
  const formatLabel = (label) => {
    if (!label) return '';
    return label.replace(/\(eoi\/rfq\)/gi, '(EOI/RFQ)');
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/programs.php?t=${Date.now()}`);
        const data = await response.json();
        if (data.status === 'success') {
          const uniquePrograms = [];
          const seen = new Set();
          for (const prog of data.data) {
            const normalizedId = (prog.program_id || '').toLowerCase().trim();
            if (!seen.has(normalizedId)) {
              seen.add(normalizedId);
              uniquePrograms.push({
                label: prog.title,
                path: `/programs?filter=${encodeURIComponent(normalizedId)}`,
                icon: prog.icon || '📌'
              });
            }
          }
          setDynamicPrograms(uniquePrograms);
        }
      } catch (error) {
        console.error("Failed to fetch programs for navbar", error);
      }
    };
    fetchPrograms();
  }, []);

  const toggleMobileMenu = (menu) => {
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  const menuItems = [
    {
      name: 'About',
      path: '/about',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Who We Are', path: '/about#who-we-are', icon: '💡' },
        { label: 'Leadership', path: '/about#leadership', icon: '👥' },
        { label: 'Our Approach', path: '/about#approach', icon: '🎯' },
        { label: 'Partners', path: '/about#partners', icon: '🤝' },
        { label: 'FAQ', path: '/about#fAq', icon: '🙋' },
      ],
    },
    {
      name: 'Programs',
      path: '/programs',
      hasDropdown: true,
      dropdownItems: dynamicPrograms.length > 0 ? dynamicPrograms : [
        { label: 'Loading...', path: '/programs', icon: '⏳' }
      ],
    },
    {
      name: 'Our Work',
      path: '/projects',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Ongoing Projects', path: '/projects#ongoing', icon: '🏢' },
        { label: 'State-wise Listings', path: '/projects#listings', icon: '🗺️' },
        { label: 'Impact Snapshot', path: '/projects#impact', icon: '📊' },
      ],
    },
    {
      name: 'Publications',
      path: '/publications',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Annual Reports', path: '/publications#annual-reports', icon: '📈' },
        { label: 'Case Studies', path: '/publications#case-studies', icon: '📝' },
        { label: 'Our Publications', path: '/publications#in-publications', icon: '📚' },
      ],
    },
    {
      name: 'Media & Stories',
      path: '/media',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Photo Gallery', path: '/media#photos', icon: '📸' },
        { label: 'Video Gallery', path: '/media#videos', icon: '🎥' },
        { label: 'Press Coverage', path: '/media#press', icon: '🗞️' },
      ],
    },
    {
      name: 'Get Involved',
      path: '/get-involved',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Volunteer With Us', path: '/get-involved#volunteer', icon: '🤝' },
        { label: 'Careers', path: '/get-involved#careers', icon: '💼' },
        { label: 'Partners (EOI/RFQ)', path: '/get-involved#funds', icon: '🌱' },
      ],
    },
    {
      name: 'Contact Us',
      path: '/contact',
    },
  ];

  return (
    <nav className="bg-white backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center h-16 w-auto">
                <img src="/logo/logo-bg.png" alt="Logo" className="h-full object-contain" />
              </div>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group px-2 py-6">
                <Link
                  to={item.path}
                  className="text-text-primary hover:text-primary font-bold text-sm flex items-center gap-1"
                >
                  {item.name}
                  {item.hasDropdown && <span className="text-[10px]">▼</span>}
                </Link>

                {item.hasDropdown && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 bg-white shadow-xl border rounded-xl opacity-0 group-hover:opacity-100 transition">

                    <div className="p-2">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg"
                        >
                          <span>{subItem.icon}</span>

                          {/* 🔥 FIX ONLY */}
                          <span className="text-sm font-bold normal-case">
                            {formatLabel(subItem.label)}
                          </span>

                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link to="/donate" className="bg-accent text-white px-6 py-2.5 rounded-full ml-2">
              Donate
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div className="lg:hidden bg-white">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <>
                  <button onClick={() => toggleMobileMenu(item.name)}>
                    {item.name}
                  </button>

                  {activeMobileMenu === item.name && (
                    <div>
                      {item.dropdownItems.map((subItem) => (
                        <Link key={subItem.label} to={subItem.path}>
                          {formatLabel(subItem.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </div>
          ))}

          <Link to="/donate">Donate</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;