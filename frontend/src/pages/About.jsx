import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { API_BASE_URL, ADMIN_BASE_URL } from "../config";

const BASE_URL = ADMIN_BASE_URL;

const makeImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.replace(/^\/+/, "")}`;
};

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();

  // 🔥 TAB STATE
  const [activeTab, setActiveTab] = useState("who-we-are");
  const [selectedLeader, setSelectedLeader] = useState(null);

  // 🔥 DYNAMIC STATES
  const [aboutData, setAboutData] = useState(null);
  const [leadershipData, setLeadershipData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch About Data
        const aboutRes = await fetch(
          `${API_BASE_URL}/about_who_we_are.php?t=${Date.now()}`,
        );
        const aboutJson = await aboutRes.json();
        if (aboutJson.status === "success") setAboutData(aboutJson.data);

        // Fetch Leadership Data
        const leadRes = await fetch(
          `${API_BASE_URL}/leadership.php?t=${Date.now()}`,
        );
        const leadJson = await leadRes.json();
        if (leadJson.status === "success") setLeadershipData(leadJson.data);
      } catch (err) {
        console.error("Data fetching error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 🔥 HANDLE HASH FOR TABS
  useEffect(() => {
    if (location.hash) {
      const tab = location.hash.replace("#", "");
      const validTabs = [
        "who-we-are",
        "leadership",
        "approach",
        "partners",
        "faq",
      ];
      if (validTabs.includes(tab)) {
        setActiveTab(tab);
      }
    } else {
      setActiveTab("who-we-are");
    }
  }, [location]);

  const faqs = [
    {
      question: "How is the Sustainable Development Foundation funded?",
      answer:
        "We are funded primarily through grants, corporate partnerships (CSR), and individual donations.",
    },
    {
      question: "Can I volunteer if I don't live in a project area?",
      answer:
        "Absolutely! We offer remote volunteering opportunities in various fields.",
    },
    {
      question: "How do you measure the impact of your programs?",
      answer:
        "We employ rigorous monitoring and evaluation frameworks with regular data collection.",
    },
    {
      question: "Are my donations tax-deductible?",
      answer:
        "Yes, all donations are eligible for 50% tax exemption under Section 80G.",
    },
  ];

  const tabs = [
    { id: "who-we-are", label: "Who We Are 💡" },
    { id: "leadership", label: "Leadership 👥" },
    { id: "approach", label: "Our Approach 🎯" },
    { id: "partners", label: "Partners 🤝" },
    { id: "faq", label: "FAQ 🙋" },
  ];

  return (
    <div className="bg-bg-color min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            About Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-50">
            Discover our journey, our vision, and the people behind our mission
            to empower communities.
          </p>
        </div>
      </section>

      {/* TABS BAR */}
      <section className="border-b sticky top-20 bg-white z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.history.replaceState(null, "", `#${tab.id}`);
                }}
                className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-primary"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* 1. WHO WE ARE (Dynamic) */}
        {activeTab === "who-we-are" && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Who We Are
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
              <p className="w-[100%] mt-4 mx-auto text-gray-600 text-[18px] leading-relaxed text-left">
                {aboutData?.who_we_are_text || "Loading content..."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div
                className="relative rounded-xl overflow-hidden shadow-sm h-74 flex items-center justify-center text-center bg-gray-900"
                style={{
                  backgroundImage: `url('${makeImageUrl(aboutData?.vision_image || "/about/5.png")}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 px-6">
                  <h3 className="text-2xl font-serif text-white mb-4">
                    💡 Our Vision
                  </h3>
                  <div
                    className="text-gray-200"
                    dangerouslySetInnerHTML={{ __html: aboutData?.vision_text }}
                  />
                </div>
              </div>

              <div
                className="relative rounded-xl overflow-hidden shadow-sm h-74 flex items-center justify-center text-center bg-gray-900"
                style={{
                  backgroundImage: `url('${makeImageUrl(aboutData?.mission_image || "/about/3.png")}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 px-6">
                  <h3 className="text-2xl font-serif text-white mb-4">
                    🎯 Our Mission
                  </h3>
                  <div
                    className="text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: aboutData?.mission_text,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* STATIC JOURNEY SECTION (No changes here) */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif text-text-primary mb-6 text-center">
                Our Journey (2014—Present)
              </h3>
              <div className="flex flex-col md:flex-row justify-between items-center text-center gap-6">
                <div className="flex-1">
                  <div className="text-primary text-2xl font-bold mb-2">
                    2014
                  </div>
                  <p className="text-sm text-gray-600">
                    Foundation Established
                  </p>
                </div>
                <div className="hidden md:block w-full h-px bg-gray-200 flex-1"></div>
                <div className="flex-1">
                  <div className="text-primary text-2xl font-bold mb-2">
                    2018
                  </div>
                  <p className="text-sm text-gray-600">Expanded to 5 States</p>
                </div>
                <div className="hidden md:block w-full h-px bg-gray-200 flex-1"></div>
                <div className="flex-1">
                  <div className="text-primary text-2xl font-bold mb-2">
                    2022
                  </div>
                  <p className="text-sm text-gray-600">
                    1 Million Beneficiaries
                  </p>
                </div>
                <div className="hidden md:block w-full h-px bg-gray-200 flex-1"></div>
                <div className="flex-1">
                  <div className="text-primary text-2xl font-bold mb-2">
                    2026
                  </div>
                  <p className="text-sm text-gray-600">Global Recognition</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. LEADERSHIP (Dynamic API based) */}
        {activeTab === "leadership" && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Leadership & Governance
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadershipData.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLeader(item)}
                  className="cursor-pointer bg-white p-6 rounded-xl shadow-sm border text-center hover:-translate-y-1 hover:shadow-md transition"
                >
                  <div className="flex justify-center mb-4 text-3xl">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            {/* DYNAMIC MODAL */}
            {/* Dynamic Modal Content */}
{selectedLeader && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    {/* 🔥 Conditional Background: Founder ke liye green, baki sab ke liye white */}
    <div className={`max-w-6xl w-full rounded-3xl p-6 md:p-10 overflow-y-auto max-h-[90vh] relative shadow-2xl transition-all ${
      selectedLeader.title.includes("Founder") 
      ? "bg-[#6f7c2e] text-white" 
      : "bg-white text-gray-800"
    }`}>
      
      {/* Close Button */}
      <button 
        onClick={() => setSelectedLeader(null)} 
        className={`absolute top-6 right-6 w-10 h-10 rounded-full font-bold shadow-lg transition-all ${
          selectedLeader.title.includes("Founder") 
          ? "bg-white text-black hover:bg-gray-200" 
          : "bg-[#6a752b] text-white hover:bg-[#5a6425]"
        }`}
      >
        ✕
      </button>

      {/* 🔥 Heading Title: Green color for non-founder sections */}
      <h2 className={`text-3xl md:text-5xl font-bold text-center mb-10 italic underline underline-offset-8 decoration-gray-400/30 ${
        selectedLeader.title.includes("Founder") ? "text-white" : "text-[#6a752b]"
      }`}>
        {selectedLeader.title}
      </h2>

      {/* FOUNDER SPECIAL CASE */}
      {selectedLeader.title.includes("Founder") ? (
        <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed text-justify">
          {selectedLeader.members[0]?.content?.split('\n').map((p, i) => (
            <p key={i} className="first-letter:text-xl first-letter:font-bold">
              {p}
            </p>
          ))}
        </div>
      ) : (
        /* BOARD, ADVISORY, MANAGEMENT SECTIONS */
        <div className="space-y-12">
          {selectedLeader.intro_text && (
            <p className="text-center text-lg max-w-3xl mx-auto opacity-90 mb-10 text-gray-600">
              {selectedLeader.intro_text}
            </p>
          )}

          {["General", "M1", "M2", "M3"].map((lvl) => {
            const filteredMembers = selectedLeader.members.filter(m => m.staff_level === lvl);
            if (filteredMembers.length === 0) return null;

            return (
              <div key={lvl}>
                {lvl !== "General" && (
                  /* 🔥 Level Headings also in Green */
                  <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-2 inline-block uppercase tracking-widest text-[#6a752b]">
                    {lvl} Level Team
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredMembers.map((m, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group flex flex-col">
                      {/* Image Container */}
                      <div className="w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                        <img 
                          src={makeImageUrl(m.image_url)} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt={m.name} 
                        />
                      </div>
                      <div className="p-5 text-center">
                        {/* 🔥 Member Name in Green */}
                        <h4 className="text-[#6a752b] font-bold text-lg leading-tight">
                          {m.name}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1 font-medium">
                          {m.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
)}
          </div>
        )}

        {/* 3. APPROACH (Static) */}
        {activeTab === "approach" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Our Approach
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-primary">
                <h3 className="font-bold text-xl mb-3">Theory of Change</h3>
                <p className="text-gray-600">
                  A systematic method to map out our long-term goals and the
                  steps required to achieve sustainable impact.
                </p>
              </div>
              {/* ... Other blocks remain same ... */}
              <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-secondary">
                <h3 className="font-bold text-xl mb-3">
                  Community-Centric Model
                </h3>
                <p className="text-gray-600">
                  Putting the community at the heart of decision-making to
                  ensure ownership and long-lasting changes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. PARTNERS (Static) */}
        {activeTab === "partners" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Partners & Affiliations
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            {/* ... Partner grid remains same ... */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/partners"
                  className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition"
                >
                  <div className="font-bold text-primary text-xl mb-2">
                    Corporate
                  </div>
                  <div className="text-gray-500">CSR Partners</div>
                </Link>
                <div className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition">
                  <div className="font-bold text-primary text-xl mb-2">
                    Public
                  </div>
                  <div className="text-gray-500">Government Alliances</div>
                </div>
                <div className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition">
                  <div className="font-bold text-primary text-xl mb-2">
                    Civil Society
                  </div>
                  <div className="text-gray-500">NGO Partners</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. FAQ (Static) */}
        {activeTab === "faq" && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all ${openFaq === index ? "border-primary shadow-md" : "border-gray-200"}`}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex justify-between items-center bg-white"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-bold text-text-primary">
                      {faq.question}
                    </span>
                    <span
                      className={`transition-transform ${openFaq === index ? "rotate-180 text-primary" : "text-gray-400"}`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all bg-bg-color ${openFaq === index ? "max-h-48 py-5" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
