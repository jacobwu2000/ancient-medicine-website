import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// The layer toggle is the site's core scholarly contribution, so it is
// defined here (not buried in Leaflet's own corner control) and rendered
// as a prominent control bar above the map. Adding a third lens later is
// just one more entry in this object plus a "layers" tag on the relevant
// sites in sites.json — no other component code needs to change.
const LAYER_META = {
  hippocratic: {
    label: 'Hippocratic medical geography',
    description:
      'Sites bearing on the environmental-empirical medicine of the Hippocratic Corpus (Airs, Waters, Places; Epidemics).',
    color: '#3d6b73',
  },
  'cult-healing': {
    label: 'Sites of cult healing',
    description:
      'Sanctuaries and findspots associated with incubatory / dream healing (Asklepieia and the iamata).',
    color: '#a3572c',
  },
};

function markerIcon(layers) {
  const colors = layers.map((l) => LAYER_META[l]?.color).filter(Boolean);
  const size = 22;
  const background =
    colors.length > 1
      ? `conic-gradient(${colors[0]} 0deg 180deg, ${colors[1]} 180deg 360deg)`
      : colors[0] || '#555';
  return L.divIcon({
    className: 'site-marker',
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:50%;background:${background};border:2px solid #fdfbf5;box-shadow:0 1px 3px rgba(0,0,0,.35)"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 2],
  });
}

export default function SiteMap({ sites }) {
  const [active, setActive] = useState({ hippocratic: true, 'cult-healing': true });

  const visibleSites = useMemo(
    () => sites.filter((s) => (s.layers || []).some((l) => active[l])),
    [sites, active]
  );

  const activeDescriptions = Object.entries(LAYER_META)
    .filter(([key]) => active[key])
    .map(([, meta]) => meta.description);

  function toggleLayer(key) {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="site-map">
      <div className="layer-toggle-bar" role="group" aria-label="Map layers">
        {Object.entries(LAYER_META).map(([key, meta]) => (
          <button
            key={key}
            type="button"
            className={`layer-toggle${active[key] ? ' is-active' : ''}`}
            aria-pressed={active[key]}
            onClick={() => toggleLayer(key)}
            style={{ '--layer-color': meta.color }}
          >
            <span className="layer-toggle__swatch" aria-hidden="true"></span>
            <span className="layer-toggle__label">{meta.label}</span>
          </button>
        ))}
      </div>

      <p className="layer-toggle-help">
        {activeDescriptions.length > 0
          ? activeDescriptions.join(' ')
          : 'No layers active — select a layer above to show sites.'}
      </p>

      <div className="site-map__frame">
        <MapContainer
          center={[38.4, 23.8]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {visibleSites.map((site) => (
            <Marker key={site.id} position={[site.lat, site.lng]} icon={markerIcon(site.layers || [])}>
              <Popup>
                <div className="site-popup">
                  <h3>{site.name}</h3>
                  <p>{site.shortDescription}</p>
                  <p className="site-popup__meta">
                    {(site.relatedInscriptions || []).length > 0 && (
                      <span>
                        {site.relatedInscriptions.length} inscription
                        {site.relatedInscriptions.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {(site.relatedHippocraticPassages || []).length > 0 && (
                      <span>
                        {site.relatedHippocraticPassages.length} Hippocratic passage
                        {site.relatedHippocraticPassages.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </p>
                  {site.journal && <a href={site.journal}>Read the journal entry &rarr;</a>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <ul className="map-legend-list">
        {Object.entries(LAYER_META).map(([key, meta]) => (
          <li key={key}>
            <span className="legend-swatch" style={{ background: meta.color }}></span>
            {meta.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
