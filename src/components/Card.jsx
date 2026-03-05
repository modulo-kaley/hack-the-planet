
const ROLE_OPTIONS = [
  { value: 'Competing at',    label: '🏆  Competing at' },
  { value: 'Volunteering at', label: '🛠  Volunteering at' },
  { value: 'Organizing',      label: '⚙️  Organizing' },
  { value: 'Speaking at',     label: '🎤  Speaking at' },
  { value: 'Excited for',     label: '🔥  Excited for' },
]

export default function Card({ role, photoSrc, photoTransform, onPhotoClick }) {
  return (
    <div className="card">
      {/* Backgrounds */}
      <div className="card-bg" />
      <div className="card-grid" />
      <div className="scanlines" />

      {/* Top bar */}
      <div className="card-topbar">
        <div className="terminal-dots">
          <div className="dot dot-r" />
          <div className="dot dot-y" />
          <div className="dot dot-g" />
        </div>
        <span className="topbar-title">
          CTF_2026.exe
          <span className="cursor-blink" />
        </span>
      </div>

      {/* Headline */}
      <div className="card-headline">
        <div className="joining">{role}</div>
        <span className="event-name">
          {/* HACK THE PLANET<br />CTF */}
        </span>
      </div>

      {/* Photo circle */}
      <div className="card-photo-area">
        <div
          className="photo-ring"
          onClick={onPhotoClick}
          title="Click to upload photo"
        >
          {photoSrc ? (
            <div
              id="photoImg"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${photoSrc})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${photoTransform.scale}%`,
                backgroundPosition: `calc(50% + ${photoTransform.x}px) calc(50% + ${photoTransform.y}px)`,
              }}
            />
          ) : (
            <div className="photo-placeholder">
              <div className="upload-icon">⬆</div>
              <div>CLICK TO<br />UPLOAD PHOTO</div>
            </div>
          )}
        </div>
      </div>

      {/* Date / location info block */}
      <div className="card-info-block">
        {/* <span className="date-sub">FRI – SAT</span>*/}
        <span className="loc">CYBERSECURITY CTF</span>
        <div className="info-divider" />
        <span className="date-big">20-21 MARCH 2026</span>
        {/* <span className="date-sub">20-21</span> */}
        <div className="info-divider" />
        <span className="venue">SAIT DOWNTOWN CAMPUS</span>
        <span className="loc">CALGARY, AB</span>
      </div>

      {/* Globe logo */}
      <div className="card-globe">
        <img src="/logo.png" alt="Hack the Planet" onError={(e) => { e.target.style.display = 'none' }} />
      </div>

      {/* Bottom strip */}
      <div className="card-bottombar" />
    </div>
  )
}
