// import React, { useState } from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// // India Map Data URL
// const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

// const projectStats = {
//   "Haryana": { districts: ["Rohtak", "Bhiwani", "Hisar", "Mahendragarh"], villages: 120 },
//   "Uttar Pradesh": { districts: ["Mirzapur", "Chandauli", "Jaunpur", "Kushinagar", "Kanpur", "Fatehpur"], villages: 450 },
//   "Rajasthan": { districts: ["Ajmer", "Bikaner", "Alwar", "Sri Ganganagar"], villages: 310 },
//   "Bihar": { districts: ["Siwan", "Vaishali", "Saran", "Madhubani"], villages: 215 },
//   "Gujarat": { districts: ["Bhavnagar", "Banaskantha", "Surendranagar"], villages: 180 },
//   "Odisha": { districts: ["Jharsuguda", "Sambalpur"], villages: 95 },
//   "Madhya Pradesh": { districts: ["Rewa", "Shivpuri", "Dindori", "Sagar"], villages: 240 },
//   "Uttarakhand": { districts: ["Haridwar"], villages: 60 },
//   "Assam": { districts: ["Guwahati", "Jorhat"], villages: 110 }
// };

// const ProjectMap = () => {
//   const [selectedState, setSelectedState] = useState(null);

//   const colors = {
//     background: "#2E8B9E", 
//     stateDefault: "#334155", 
//     stateHighlighted: "#606C38", 
//     border: "#FFFFFF", 
//     hover: "#EAB308" 
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-8 p-8 min-h-screen font-sans" style={{ backgroundColor: colors.background }}>
      
//       {/* LEFT: MAP SECTION */}
//       <div className="flex-1 flex justify-center items-center relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl min-h-[500px]">
//         <ComposableMap
//           projection="geoMercator"
//           projectionConfig={{
//             scale: 1000,
//             center: [82, 22] // India Center
//           }}
//           className="w-full h-full"
//         >
//           <Geographies geography={INDIA_TOPO_JSON}>
//             {({ geographies }) =>
//               geographies.map((geo) => {
//                 // GeoJSON ke andar state ka naam 'st_nm' property mein hota hai
//                 const stateName = geo.properties.st_nm; 
//                 const hasData = projectStats[stateName];

//                 return (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     onClick={() => {
//                       if (hasData) setSelectedState({ name: stateName, ...hasData });
//                     }}
//                     style={{
//                       default: {
//                         fill: hasData ? colors.stateHighlighted : colors.stateDefault,
//                         stroke: colors.border,
//                         strokeWidth: 0.5,
//                         outline: "none",
//                       },
//                       hover: {
//                         fill: hasData ? colors.hover : "#475569",
//                         outline: "none",
//                         cursor: hasData ? "pointer" : "default",
//                       },
//                       pressed: {
//                         fill: "#EAB308",
//                         outline: "none",
//                       }
//                     }}
//                   />
//                 );
//               })
//             }
//           </Geographies>
//         </ComposableMap>
//         <div className="absolute bottom-4 left-6 text-white/40 text-xs">
//           * Click on green states to view details
//         </div>
//       </div>

//       {/* RIGHT: LIST SECTION */}
//       <div className="w-full lg:w-96 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl flex flex-col">
//         <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Our Presence</h3>
//         <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
//           {Object.entries(projectStats).map(([name, data]) => (
//             <div 
//               key={name}
//               onClick={() => setSelectedState({ name, ...data })}
//               className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/20 cursor-pointer transition-all border-l-4 border-l-yellow-500"
//             >
//               <h4 className="font-bold text-white">{name}</h4>
//               <p className="text-xs text-gray-300 mt-1 line-clamp-1">{data.districts.join(', ')}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedState && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
//             <button 
//               onClick={() => setSelectedState(null)} 
//               className="absolute top-5 right-5 text-gray-400 hover:text-black text-xl"
//             >✕</button>
            
//             <h2 className="text-3xl font-bold text-[#606C38] mb-2">{selectedState.name}</h2>
//             <div className="h-1 w-20 bg-yellow-500 mb-6 rounded-full"></div>
            
//             <div className="space-y-5">
//               <div>
//                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Districts Covered</label>
//                 <p className="text-gray-700 font-medium leading-relaxed mt-1">
//                   {selectedState.districts.join(', ')}
//                 </p>
//               </div>
              
//               <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
//                 <span className="text-gray-600 font-semibold">Total Villages</span>
//                 <span className="text-2xl font-black text-[#606C38]">{selectedState.villages}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectMap;