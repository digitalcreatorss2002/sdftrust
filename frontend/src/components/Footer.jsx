import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* 🔥 MAIN CONTENT AREA (Now all Green, No white side) */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 🌿 LEFT SIDE - Info (Text only, Logo removed) */}
          <div className="space-y-4">
            {/* Logo ki jagah sirf Text */}
            <div className="flex items-center gap-3">
              <span className="text-4xl">🌿</span>
              <h2 className="font-serif font-bold text-3xl leading-tight">SDF</h2>
            </div>
            
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              Empowering communities and sustaining the future through
              integrated development programs across health, education, and
              environment.
            </p>

            <div className="flex space-x-4 pt-2">
              <a className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                f
              </a>
              <a className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                𝕏
              </a>
              <a className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                in
              </a>
            </div>
          </div>

          {/* 🔗 Quick Links */}
          <div className="md:pl-10">
            <h4 className="text-lg font-bold mb-5 border-b-2 border-accent w-fit pb-1">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-accent">Our Programs</Link></li>
              <li><Link to="/projects" className="hover:text-accent">Ongoing Projects</Link></li>
              <li><Link to="/impact" className="hover:text-accent">Impact & Evidence</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
            </ul>
          </div>

          {/* 🎯 Programs */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b-2 border-accent w-fit pb-1">Our Programs</h4>
            <ul className="space-y-3 text-sm text-white/90">
              <li>Health & Nutrition</li>
              <li>Education & Child Care</li>
              <li>Women Empowerment</li>
              <li>Agriculture & Climate</li>
              <li>Environment & WASH</li>
            </ul>
          </div>

          {/* 📍 Contact */}
          <div>
            <h4 className="text-lg font-bold mb-5 border-b-2 border-accent w-fit pb-1">Contact</h4>
            <ul className="space-y-4 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <span className="shrink-0 text-lg">📍</span>
                <span>
                  Sustainable Development Foundation (SDF), Near Dwarka
                  More, Sector-15, Dwarka, Delhi – 110059
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="shrink-0 text-lg">📞</span>
                <a href="tel:+919289222127" className="hover:text-accent transition-colors">
                  +91 9289222127
                </a>
              </li>

              <li className="flex items-center gap-3">
                <span className="shrink-0 text-lg">✉️</span>
                <a href="mailto:contact@sdfoundation.org" className="hover:text-accent transition-colors">
                  contact@sdfoundation.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🔻 BOTTOM STRIP */}
      <div className="border-t border-white/10 text-center text-xs text-white/60 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Sustainable Development Foundation. All rights reserved.</p>
          <p>
            Digital Creators ||{" "}
            <a
              href="https://hrntechsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent hover:underline font-medium"
            >
              HRN Tech Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;