import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { API_BASE_URL } from "../config";

const MapSection = ({ onStateSelect }) => {
  useEffect(() => {
    const map = L.map("map", {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView([22.9734, 78.6569], 5);

    map.setMaxBounds([
      [6, 68],
      [38, 97],
    ]);

    map.on("click", () => {
      if (onStateSelect) onStateSelect(null);
    });

    let geoLayer;
    let projectData = {};

    // Fetch projects with District and Village data
    fetch(`${API_BASE_URL}/projects.php?t=${Date.now()}`)
      .then((res) => res.json())
      .then((res) => {
        const projects = res.data;

        projects.forEach((p) => {
          // Location field mein hum multiple states handle kar rahe hain (comma separated)
          const states = p.location
            ? p.location.split(",").map((s) => s.trim())
            : [];

          states.forEach((state) => {
            if (state) {
              if (!projectData[state]) {
                projectData[state] = [];
              }
              // Store full object instead of just title
              projectData[state].push({
                title: p.title,
                district: p.district || "",
                village: p.village || "",
              });
            }
          });
        });

        loadMap();
      });

    function loadMap() {
      fetch("/india_states.geojson")
        .then((res) => res.json())
        .then((data) => {
          geoLayer = L.geoJSON(data, {
            style: defaultStyle,
            onEachFeature: onEachFeature,
          }).addTo(map);

          map.fitBounds(geoLayer.getBounds());

          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        });
    }

    function defaultStyle(feature) {
      const stateName = feature.properties.NAME_1;
      const hasProjects = projectData[stateName]?.length > 0;

      return {
        color: "#ffffff",
        weight: 1.5,
        fillColor: hasProjects ? "#576123" : "#333333",
        fillOpacity: hasProjects ? 0.95 : 0.7,
        className: "state-feature transition-all duration-300 origin-center",
      };
    }

    function highlightStyle() {
      return {
        color: "#ffffff",
        weight: 2,
        fillColor: "#1A2718",
        fillOpacity: 1,
      };
    }

    function highlightFeature(e) {
      const layer = e.target;
      geoLayer.eachLayer((l) => {
        l.setStyle({ fillOpacity: 0.3 });
      });
      layer.setStyle(highlightStyle());
      layer.bringToFront();
      if (layer._path) {
        layer._path.classList.add("state-hovered");
      }
    }

    function resetHighlight(e) {
      const layer = e.target;
      geoLayer.eachLayer((l) => {
        geoLayer.resetStyle(l);
      });
      if (layer._path) {
        layer._path.classList.remove("state-hovered");
      }
    }

    function onEachFeature(feature, layer) {
      const stateName = feature.properties.NAME_1;
      const projects = projectData[stateName] || [];

      let projectHTML = "";
      if (projects.length > 0) {
        projectHTML = "<ul style='margin: 0; padding-left: 15px;'>";
        projects.forEach((p) => {
          projectHTML += `<li>${p.title}</li>`;
        });
        projectHTML += "</ul>";
      } else {
        projectHTML = "<i>No active projects</i>";
      }

      const content = `
                <div style="font-weight:bold; margin-bottom:5px; border-bottom: 1px solid #eee; padding-bottom: 3px;">
                    ${stateName}
                </div>
                ${projectHTML}
            `;

      layer.bindTooltip(content, {
        direction: "center",
        className: "custom-tooltip",
      });

      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: (e) => {
          L.DomEvent.stopPropagation(e);
          if (onStateSelect) {
            // Passing the list of project objects (title, district, village)
            onStateSelect({
              name: stateName,
              projects: projects,
            });
          }
        },
      });
    }

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <style>{`
                .leaflet-container { background: transparent !important; }
                path.state-feature {
                    transition: transform 0.2s ease, fill 0.2s ease, fill-opacity 0.2s ease;
                    transform-origin: center;
                }
                path.state-hovered {
                    transform: scale(1.02);
                    filter: drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.4));
                }
                .custom-tooltip {
                    background: white !important;
                    border: none !important;
                    border-radius: 8px !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
                    padding: 10px !important;
                    color: #333 !important;
                }
            `}</style>
      <div
        id="map"
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      ></div>
    </>
  );
};

export default MapSection;
