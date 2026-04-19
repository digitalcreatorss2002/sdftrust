import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
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
  
  // 🔥 DYNAMIC ABOUT DATA STATE
  const [aboutData, setAboutData] = useState(null);
  const [loadingAbout, setLoadingAbout] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/about_who_we_are.php?t=${Date.now()}`);
        const data = await response.json();
        if (data.status === "success" && data.data) {
          setAboutData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch about data:", err);
      } finally {
        setLoadingAbout(false);
      }
    };
    fetchAboutData();
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(tab);
      }
    } else {
      setActiveTab("who-we-are"); // default
    }
  }, [location]);

  const faqs = [
    {
      question: "How is the Sustainable Development Foundation funded?",
      answer:
        "We are funded primarily through grants, corporate partnerships (CSR), and individual donations. Every contribution transparently supports our grassroots initiatives.",
    },
    {
      question: "Can I volunteer if I don't live in a project area?",
      answer:
        "Absolutely! We offer remote volunteering opportunities in areas like digital marketing, content writing, data analysis, and fundraising. Visit our Contact page to get involved.",
    },
    {
      question: "How do you measure the impact of your programs?",
      answer:
        "We employ rigorous monitoring and evaluation frameworks. We collect baseline data before intervention and track key metrics (e.g., school attendance, crop yield, health markers) regularly.",
    },
    {
      question: "Are my donations tax-deductible?",
      answer:
        "Yes, all donations made to the foundation are eligible for 50% tax exemption under Section 80G of the Income Tax Act.",
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

      {/* 🔥 TABS BAR */}
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
                className={`py-4 border-b-2 font-bold whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-primary"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* 1. WHO WE ARE */}
        {activeTab === "who-we-are" && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Who We Are
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>

              <p className="w-[100%] mt-4 mx-auto text-gray-600 text-[18px] leading-relaxed text-left">
                {aboutData && aboutData.who_we_are_text ? (
                  aboutData.who_we_are_text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)
                ) : (
                  "Established in 2014 by a dedicated group of professional social workers, the Sustainable Development Foundation (SDF) is a distinguished autonomous and 'not-for-profit' organization in India..."
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Our Vision */}
              <div
                className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-74 flex items-center justify-center text-center"
                style={{
                  backgroundImage: `url('${aboutData && aboutData.vision_image ? makeImageUrl(aboutData.vision_image) : "/about/5.png"}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 px-6">
                  <h3 className="text-2xl font-serif text-white mb-4">
                    💡 Our Vision
                  </h3>
                  {aboutData && aboutData.vision_text ? (
                    <p className="text-gray-200" dangerouslySetInnerHTML={{ __html: aboutData.vision_text }} />
                  ) : (
                    <p className="text-gray-200">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reiciendis explicabo{" "}
                      <span className="text-yellow-500">
                        cumque impedit iusto quas laudantium Reiciendis explicabo
                        tempora voluptatibus
                      </span>{" "}
                      , minus placeat ducimus architecto deleniti, similique vero
                      accusantium veniam eveniet necessitatibus nulla blanditiis?
                    </p>
                  )}
                </div>
              </div>

              {/* Our Mission */}
              <div
                className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-74 flex items-center justify-center text-center"
                style={{
                  backgroundImage: `url('${aboutData && aboutData.mission_image ? makeImageUrl(aboutData.mission_image) : "/about/3.png"}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 px-6">
                  <h3 className="text-2xl font-serif text-white mb-4">
                    🎯 Our Mission
                  </h3>
                  {aboutData && aboutData.mission_text ? (
                    <p className="text-gray-200" dangerouslySetInnerHTML={{ __html: aboutData.mission_text }} />
                  ) : (
                    <p className="text-gray-200">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptates placeat totam{" "}
                      <span className="text-yellow-500">
                        dolor officiis nemo aliquid, ipsum est dolorum quis optio
                        voluptatibus
                      </span>{" "}
                      , necessitatibus repudiandae voluptatum quisquam laboriosam
                      animi provident ab natus.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
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
        {/* 2. LEADERSHIP */}
        {activeTab === "leadership" && (
          <div className="animate-fade-in">
            {/* HEADER */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Leadership & Governance
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            {/* MAIN CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                // ===== FOUNDER =====
                {
                  title: "Founder's Message",
                  icon: "🏆",
                  desc: "Leadership driving vision and impact.",
                  image: "logo/logo.png",
                  content: [
                    "In a country as diverse and dynamic as India, inclusive and sustainable development is not merely an aspiration—it is a collective responsibility. At Sustainable Development Foundation (SDF), we are committed to ensuring that development reaches the last mile and transforms the lives of vulnerable communities.",
                    "We believe that development extends beyond economic growth to encompass social equity, access to healthcare, education, sustainable livelihoods, and the right to live with dignity. Our interventions are designed with a holistic approach—integrating community empowerment, institutional strengthening, and capacity building for long-term impact.",
                    "Women empowerment remains at the core of our framework. SDF is committed to enabling women to become economically independent, socially confident, and active participants in decision-making. We recognize that empowering women leads to stronger communities and inclusive growth.",
                    "Our work across climate-smart agriculture, rural livelihoods, community health, nutrition, and youth engagement reflects our commitment to addressing critical challenges through scalable solutions.",
                    "We view CSR as a strategic partnership that brings together corporate institutions, government systems, and communities to drive measurable and sustainable outcomes, guided by transparency and accountability.",
                    "With the support of our partners and team, SDF remains committed to building resilient communities and creating sustainable models for a more inclusive and self-reliant India.",
                    <span className="text-bold text-2xl">
                      "Bighnaraj Behera – CEO & Founder Trustee",
                    </span>,
                  ],
                },

                // ===== BOARD =====
                {
                  title: "Board of Trustees",
                  icon: "👥",
                  desc: "Experts ensuring governance & accountability.",

                  intro:
                    "The Board of Trustees provides strategic guidance and oversight to ensure that the Sustainable Development Foundation continues to work with transparency, accountability, and impact for community development.",

                  members: [
                    {
                      name: "Banaja Mishra",
                      role: "CEO & Founder Trustee",
                      image: "about/news.png",
                      isFounder: true,
                    },
                    {
                      name: "Sahin Paravin",
                      role: "Trustee",
                      image: "about/news1.png",
                    },
                    {
                      name: "Shardindu Upadhyay",
                      role: "Trustee",
                      image: "about/news1.png",
                    },
                    {
                      name: "Hamid Malik",
                      role: "Trustee",
                      image: "about/news3.png",
                    },
                    {
                      name: "Jakir Hussain",
                      role: "Trustee",
                      image: "about/news4.png",
                    },
                    {
                      name: "Sishir Kumar",
                      role: "Trustee",
                      image: "about/news.png",
                    },
                  ],
                },

                // ===== ADVISORY =====
                {
                  title: "Advisory Committee",
                  icon: "🤝",
                  desc: "Strategic advisors guiding growth.",
                  intro:
                    "The Advisory committee provides expert guidance and strategic insights to strengthen the mission and programs of the Sustainable Development Foundation.",

                  members: [
                    {
                      name: "Anil Kumar Popli",
                      role: "Advisor (Fund Management)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Alok Pattnaik",
                      role: "Advisor (Strategic Management)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Debuja Choudhary",
                      role: "Advisor (CBO Management)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Bandita Mishra",
                      role: "Advisor (Legal Affairs)",
                      image: "about/vol.png",
                    },
                  ],
                },

                // ===== MANAGEMENT =====
                {
                  title: "Management Team",
                  icon: "🛡️",
                  desc: "Operational leaders driving execution.",

                  board: [
                    {
                      name: "Banaja Mishra",
                      role: "CEO & Founder Trustee",
                      image: "about/news.png",
                      isFounder: true,
                    },
                    {
                      name: "Sahin Paravin",
                      role: "Trustee",
                      image: "about/news.png",
                    },
                    {
                      name: "Shardindu Upadhyay",
                      role: "Trustee",
                      image: "about/news.png",
                    },
                    {
                      name: "Hamid Malik",
                      role: "Trustee",
                      image: "about/hamid.jpg",
                    },
                    {
                      name: "Jakir Hussain",
                      role: "Trustee",
                      image: "about/jakir.jpg",
                    },
                    {
                      name: "Sishir Kumar",
                      role: "Trustee",
                      image: "about/sishir.jpg",
                    },
                  ],

                  advisory: [
                    {
                      name: "Anil Kumar Popli",
                      role: "Advisor (Fund Management)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Alok Pattnaik",
                      role: "Advisor (Strategic Management)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Debuja Choudhary",
                      role: "Advisor (CBO Management)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Bandita Mishra",
                      role: "Advisor (Legal Affairs)",
                      image: "about/vol.png",
                    },
                  ],

                  m1: [
                    {
                      name: "Bighnaraj Behera",
                      role: "Director (Programs)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Kiran",
                      role: "Manager (HR & Coordination)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Pinki Patel",
                      role: "Finance Manager",
                      image: "about/vol.png",
                    },
                  ],

                  m2: [
                    {
                      name: "Kajal Berwa",
                      role: "Program Manager",
                      image: "about/vol.png",
                    },
                    {
                      name: "Francisca Minj",
                      role: "Manager (Administration & Logistics)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Kiran",
                      role: "Manager (HR & Coordination)",
                      image: "about/vol.png",
                    },
                    {
                      name: "Pinki Patel",
                      role: "Finance Manager",
                      image: "about/vol.png",
                    },
                  ],

                  m3: [
                    {
                      name: "Archana Kujur",
                      role: "MTS",
                      image: "about/vol.png",
                    },
                    {
                      name: "Nikhil Gupta",
                      role: "Program Executive",
                      image: "about/vol.png",
                    },
                    {
                      name: "Saumya Jha",
                      role: "Brand Communication Executive",
                      image: "about/vol.png",
                    },
                    {
                      name: "Shivam Kumar Raj",
                      role: "Program Executive",
                      image: "about/vol.png",
                    },
                    {
                      name: "Pallavi",
                      role: "Office Manager",
                      image: "about/vol.png",
                    },
                  ],
                },
              ].map((item, idx) => (
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

                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* MODAL */}
            {selectedLeader && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 ">
                <div className="bg-[#6f7c2e] max-w-7xl w-full rounded-2xl p-6 overflow-y-auto max-h-[90vh] relative ">
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="absolute top-4 right-4 bg-black text-white w-10 h-10 rounded-full"
                  >
                    ✕
                  </button>

                  <h2 className="text-4xl text-white font-bold text-center mb-1 italic ">
                    {selectedLeader.title}
                  </h2>

                  {/* FOUNDER */}
                  <div className="bg-[#6f7c2e] p-2 rounded-xl mb-3">
                    {selectedLeader.title === "Founder's Message" && (
                      <div className="relative bg-[#6f7c2e] rounded-xl p-6">
                        <div className="text-white text-md flex flex-col justify-end space-y-5">
                          {selectedLeader.content.map((t, i) => (
                            <p key={i}>{t}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* NORMAL (BOARD + ADVISORY) */}
                  {selectedLeader.members && (
                    <>
                      {/* 🔥 INTRO ADD */}
                      {selectedLeader.intro && (
                        <p className="text-left text-lg text-white max-w-3xl mx-auto mb-6">
                          {selectedLeader.intro}
                        </p>
                      )}

                      {/* MEMBERS GRID */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {selectedLeader.members.map((m, i) => (
                          <div
                            key={i}
                            className="bg-white border rounded-xl text-center"
                          >
                            <img
                              src={m.image}
                              className="w-full h-60 object-cover rounded-t-xl"
                            />
                            <div className="p-4">
                              <h3 className="text-green-700 font-semibold">
                                {m.name}
                              </h3>
                              <p className="text-sm text-gray-500">{m.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* MANAGEMENT */}
                  {selectedLeader.board && (
                    <>
                      {/* 🔥 INTRO ADD */}
                      {selectedLeader.intro && (
                        <p className="text-left text-lg text-white max-w-3xl mx-auto mb-6">
                          {selectedLeader.intro}
                        </p>
                      )}
                      <div className="space-y-10">
                        {[
                          // { title: "Board Members", data: selectedLeader.board },
                          // {
                          //   title: "Advisory Board",
                          //   data: selectedLeader.advisory,
                          // },
                          { title: "M1 Level Staff", data: selectedLeader.m1 },
                          { title: "M2 Level Staff", data: selectedLeader.m2 },
                          { title: "M3 Level Staff", data: selectedLeader.m3 },
                        ].map((section, idx) => (
                          <div key={idx}>
                            <h3 className="text-xl text-white font-semibold mb-4">
                              {section.title}
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                              {section.data.map((m, i) => (
                                <div
                                  key={i}
                                  className="bg-white border rounded-xl text-center"
                                >
                                  <img
                                    src={m.image}
                                    className="w-full h-56 object-cover rounded-t-xl"
                                  />
                                  <div className="p-3">
                                    <h4 className="text-green-700">{m.name}</h4>
                                    <p className="text-sm text-gray-500">
                                      {m.role}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* 3. APPROACH */}
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
                  steps required to achieve sustainable impact. We work backward
                  from our ultimate goals to identify necessary preconditions.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-secondary">
                <h3 className="font-bold text-xl mb-3">
                  Community-Centric Model
                </h3>
                <p className="text-gray-600">
                  Putting the community at the heart of decision-making to
                  ensure ownership and long-lasting changes. Solutions are built
                  *with* the people, not just *for* them.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-accent">
                <h3 className="font-bold text-xl mb-3">
                  Monitoring, Evaluation & Learning
                </h3>
                <p className="text-gray-600">
                  Rigorous data collection and analysis to measure our impact
                  and continuously improve our interventions. We adapt and
                  evolve based on real-world feedback.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* 4. PARTNERS */}
        {activeTab === "partners" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Partners & Affiliations
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-600 mb-10 text-lg">
                We collaborate with a diverse network of organizations to
                amplify our impact and reach wider demographics.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <Link to="/partners">
                  <div className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                    <div className="font-bold text-primary text-xl mb-2">
                      Corporate
                    </div>
                    <div className="text-gray-500">CSR Partners</div>
                  </div>
                </Link>
                <div className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="font-bold text-primary text-xl mb-2">
                    Public
                  </div>
                  <div className="text-gray-500">Government Alliances</div>
                </div>
                <div className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="font-bold text-primary text-xl mb-2">
                    Civil Society
                  </div>
                  <div className="text-gray-500">NGO & Academic Partners</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* 5. FAQ */}
        {activeTab === "faq" && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif text-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-gray-500">
                Find answers to common questions about our operations and
                impact.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === index ? "border-primary shadow-md" : "border-gray-200 hover:border-primary/50"}`}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none bg-white"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-bold text-text-primary pr-8">
                      {faq.question}
                    </span>
                    <span
                      className={`text-xl transition-transform duration-300 ${openFaq === index ? "rotate-180 text-primary" : "text-gray-400"}`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out bg-bg-color ${openFaq === index ? "max-h-48 py-5 opacity-100" : "max-h-0 py-0 opacity-0"}`}
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