const { useState, useEffect, useCallback } = React;

/* ===== MOCK DATA ===== */
const BUILDINGS = [
  { id: 'lib', name: 'Central Library', x: 180, y: 120, w: 120, h: 70 },
  { id: 'sci', name: 'Science Block', x: 380, y: 80, w: 100, h: 60 },
  { id: 'eng', name: 'Engineering Hall', x: 550, y: 150, w: 110, h: 65 },
  { id: 'art', name: 'Arts Center', x: 140, y: 260, w: 90, h: 55 },
  { id: 'cs',  name: 'CS Building', x: 350, y: 230, w: 100, h: 60 },
  { id: 'bus', name: 'Business School', x: 530, y: 290, w: 105, h: 55 },
];

const ROOMS = [
  { id: 1, name: 'Quiet Zone A', building: 'Central Library', floor: '2nd Floor', status: 'available', capacity: 30, currentOccupancy: 8, temp: 22, noise: 15 },
  { id: 2, name: 'Lab 204', building: 'CS Building', floor: '2nd Floor', status: 'moderate', capacity: 40, currentOccupancy: 28, temp: 24, noise: 45 },
  { id: 3, name: 'Study Hall B', building: 'Science Block', floor: '1st Floor', status: 'available', capacity: 50, currentOccupancy: 12, temp: 21, noise: 20 },
  { id: 4, name: 'Seminar Room 3', building: 'Engineering Hall', floor: '3rd Floor', status: 'busy', capacity: 25, currentOccupancy: 24, temp: 26, noise: 65 },
  { id: 5, name: 'Discussion Pod C', building: 'Arts Center', floor: '1st Floor', status: 'available', capacity: 8, currentOccupancy: 2, temp: 22, noise: 10 },
  { id: 6, name: 'Lecture Hall 101', building: 'Business School', floor: 'Ground Floor', status: 'busy', capacity: 120, currentOccupancy: 115, temp: 27, noise: 70 },
];

/* ===== SVG ICONS (inline to avoid dependencies) ===== */
const Icons = {
  Thermometer: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
    </svg>
  ),
  Volume: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  ),
  Users: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
};

/* ===== NAVBAR ===== */
function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar" style={scrolled ? { padding: '10px 40px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' } : {}}>
      <a href="#" className="navbar-brand">
        <div className="navbar-logo">S</div>
        <span className="navbar-title">StudySpot</span>
      </a>
      <ul className="navbar-links">
        <li><a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a></li>
        <li><a href="#map" className={activeSection === 'map' ? 'active' : ''}>Campus Map</a></li>
        <li><a href="#conditions" className={activeSection === 'conditions' ? 'active' : ''}>Live Status</a></li>
        <li><a href="#booking" className={activeSection === 'booking' ? 'active' : ''}>Book Room</a></li>
      </ul>
    </nav>
  );
}

/* ===== HERO ===== */
function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          Live Campus Monitoring
        </div>
        <h1 className="hero-title">
          Find Your Perfect<br />
          <span className="gradient-text">Study Spot</span>
        </h1>
        <p className="hero-subtitle">
          Real-time room availability, live condition monitoring, and instant booking — all in one place. Never waste time searching for a study space again.
        </p>
        <div className="hero-actions">
          <a href="#map" className="btn btn-primary">
            <Icons.Search />
            Explore Campus
          </a>
          <a href="#booking" className="btn btn-secondary">
            <Icons.Calendar />
            Book a Room
          </a>
        </div>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-number">24</div>
            <div className="stat-label">Study Rooms</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">6</div>
            <div className="stat-label">Buildings</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">142</div>
            <div className="stat-label">Spots Open Now</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== CAMPUS MAP SECTION ===== */
function CampusMap() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);

  const getBuildingColor = (id) => {
    const room = ROOMS.find(r => {
      const bld = BUILDINGS.find(b => b.id === id);
      return bld && r.building === bld.name;
    });
    if (!room) return '#334155';
    if (room.status === 'available') return '#10b981';
    if (room.status === 'moderate') return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <section className="section" id="map" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0d1225 100%)' }}>
      <div className="section-header">
        <div className="section-tag">📍 Campus Map</div>
        <h2 className="section-title">Interactive Room Finder</h2>
        <p className="section-subtitle">
          Click on any building to see available rooms. Green means open, amber means filling up, red means full.
        </p>
      </div>

      <div className="campus-map-container">
        <div className="map-wrapper">
          <div className="map-header">
            <h3>🏫 Campus Overview</h3>
            <div className="map-legend">
              <div className="legend-item"><span className="legend-dot available"></span> Available</div>
              <div className="legend-item"><span className="legend-dot moderate"></span> Filling Up</div>
              <div className="legend-item"><span className="legend-dot busy"></span> Full</div>
            </div>
          </div>
          <div className="campus-svg-area">
            <svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="760" height="400" fill="url(#grid)" />

              {/* Paths / Roads */}
              <path d="M 0 200 Q 200 180, 400 200 Q 600 220, 760 200" stroke="rgba(148,163,184,0.12)" strokeWidth="24" fill="none" strokeLinecap="round"/>
              <path d="M 300 0 Q 320 200, 300 400" stroke="rgba(148,163,184,0.08)" strokeWidth="18" fill="none" strokeLinecap="round"/>
              <path d="M 500 0 Q 480 200, 500 400" stroke="rgba(148,163,184,0.08)" strokeWidth="18" fill="none" strokeLinecap="round"/>

              {/* Trees / Greenery dots */}
              {[{x:80,y:60},{x:300,y:160},{x:460,y:340},{x:680,y:80},{x:100,y:350},{x:650,y:360},{x:420,y:140}].map((t,i) => (
                <circle key={i} cx={t.x} cy={t.y} r="8" fill="rgba(16,185,129,0.15)"/>
              ))}

              {/* Buildings */}
              {BUILDINGS.map(b => {
                const color = getBuildingColor(b.id);
                const isHovered = hoveredBuilding === b.id;
                return (
                  <g
                    key={b.id}
                    className="building"
                    onMouseEnter={() => setHoveredBuilding(b.id)}
                    onMouseLeave={() => setHoveredBuilding(null)}
                    onClick={() => {
                      const room = ROOMS.find(r => r.building === b.name);
                      if (room) setSelectedRoom(room.id);
                    }}
                  >
                    <rect
                      x={b.x} y={b.y} width={b.w} height={b.h}
                      rx="6" ry="6"
                      fill={color}
                      fillOpacity={isHovered ? 0.35 : 0.2}
                      stroke={color}
                      strokeWidth={isHovered ? 2 : 1}
                      strokeOpacity={isHovered ? 0.9 : 0.5}
                      className="building-fill"
                    />
                    <text
                      x={b.x + b.w/2} y={b.y + b.h/2 + 4}
                      className="building-label"
                    >
                      {b.name.split(' ').map(w => w[0]).join('')}
                    </text>
                    <circle
                      cx={b.x + b.w - 10} cy={b.y + 10} r="6"
                      fill={color}
                      className="building-marker"
                    />
                    {isHovered && (
                      <g>
                        <rect
                          x={b.x + b.w/2 - 60} y={b.y - 36}
                          width="120" height="28" rx="6"
                          fill="rgba(0,0,0,0.85)"
                        />
                        <text
                          x={b.x + b.w/2} y={b.y - 18}
                          textAnchor="middle"
                          fill="#f1f5f9"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="Inter, sans-serif"
                        >
                          {b.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Room List Sidebar */}
        <div className="map-sidebar">
          {ROOMS.map(room => (
            <div
              key={room.id}
              className={`room-card ${room.status} ${selectedRoom === room.id ? 'selected' : ''}`}
              onClick={() => setSelectedRoom(room.id === selectedRoom ? null : room.id)}
            >
              <div className="room-card-header">
                <span className="room-name">{room.name}</span>
                <span className={`room-status ${room.status}`}>
                  {room.status === 'available' ? '● Open' : room.status === 'moderate' ? '● Filling' : '● Full'}
                </span>
              </div>
              <div className="room-building">{room.building} — {room.floor}</div>
              <div className="room-meta">
                <div className="room-meta-item">
                  <Icons.Users /> {room.currentOccupancy}/{room.capacity}
                </div>
                <div className="room-meta-item">
                  <Icons.Thermometer /> {room.temp}°C
                </div>
                <div className="room-meta-item">
                  <Icons.Volume /> {room.noise} dB
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== LIVE CONDITIONS ===== */
function LiveConditions() {
  const [conditions, setConditions] = useState({
    temp: 22,
    noise: 32,
    occupancy: 45,
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConditions(prev => ({
        temp: Math.max(18, Math.min(30, prev.temp + (Math.random() - 0.5) * 1.5)),
        noise: Math.max(10, Math.min(80, prev.noise + (Math.random() - 0.5) * 6)),
        occupancy: Math.max(5, Math.min(100, prev.occupancy + (Math.random() - 0.5) * 8)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      icon: '🌡️',
      type: 'temp',
      label: 'Temperature',
      value: `${conditions.temp.toFixed(1)}°`,
      unit: 'Celsius',
      percent: ((conditions.temp - 15) / 20) * 100,
      low: '15°C',
      high: '35°C',
    },
    {
      icon: '🔊',
      type: 'noise',
      label: 'Noise Level',
      value: `${conditions.noise.toFixed(0)}`,
      unit: 'Decibels',
      percent: (conditions.noise / 80) * 100,
      low: 'Silent',
      high: 'Loud',
    },
    {
      icon: '👥',
      type: 'occupancy',
      label: 'Occupancy Rate',
      value: `${conditions.occupancy.toFixed(0)}%`,
      unit: 'Capacity Used',
      percent: conditions.occupancy,
      low: 'Empty',
      high: 'Full',
    },
  ];

  return (
    <section className="section" id="conditions">
      <div className="section-header">
        <div className="section-tag">📊 Live Monitoring</div>
        <h2 className="section-title">Room Conditions</h2>
        <p className="section-subtitle">
          Real-time environmental data from IoT sensors across campus study rooms.
        </p>
      </div>

      <div className="conditions-grid">
        {cards.map(card => (
          <div key={card.type} className="condition-card">
            <div className="condition-card-header">
              <div className={`condition-icon-wrapper ${card.type}`}>
                {card.icon}
              </div>
              <div className="condition-live-tag">
                <span className="dot"></span>
                Live
              </div>
            </div>

            <div className={`condition-value ${card.type}`}>{card.value}</div>
            <div className="condition-label">{card.label} — {card.unit}</div>

            <div className="gauge-bar">
              <div
                className={`gauge-fill ${card.type}`}
                style={{ width: `${Math.min(100, Math.max(0, card.percent))}%` }}
              ></div>
            </div>
            <div className="gauge-labels">
              <span>{card.low}</span>
              <span>{card.high}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 <a href="#">StudySpot</a> — Smart Study Spot Finder. Built for students, by students.</p>
    </footer>
  );
}

/* ===== APP ROOT ===== */
function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'map', 'conditions', 'booking'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <React.Fragment>
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <CampusMap />
      <LiveConditions />
      <Footer />
    </React.Fragment>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
