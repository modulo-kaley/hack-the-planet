import React, { useRef } from 'react'

const ROLE_OPTIONS = [
  { value: 'Competing at',    label: '🏆  Competing at' },
  { value: 'Volunteering at', label: '🛠  Volunteering at' },
  { value: 'Organizing',      label: '⚙️  Organizing' },
  { value: 'Speaking at',     label: '🎤  Speaking at' },
  { value: 'Excited for',     label: '🔥  Excited for' },
]

export default function Controls({
  role,
  onRoleChange,
  photoSrc,
  photoTransform,
  onPhotoTransformChange,
  onPhotoUpload,
  onDownload,
}) {
  const fileRef = useRef(null)

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onPhotoUpload(ev.target.result)
    reader.readAsDataURL(file)
    // reset so same file can be re-selected
    e.target.value = ''
  }

  function resetTransform() {
    onPhotoTransformChange({ scale: 100, x: 0, y: 0 })
  }

  return (
    <div className="controls">

      {/* Role dropdown */}
      <div className="ctrl-section">
        <div className="ctrl-label">&gt;_ Your Role</div>
        <select value={role} onChange={(e) => onRoleChange(e.target.value)}>
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <p className="tip">Updates the card headline instantly.</p>
      </div>

      {/* Event details (read-only) */}
      <div className="ctrl-section">
        <div className="ctrl-label">&gt;_ Event Details</div>
        <div className="preset-info">
          <span className="info-label">DATE</span>
          March 20–21, 2026 &nbsp;(Fri – Sat)
          <br /><br />
          <span className="info-label">LOCATION</span>
          SAIT Downtown Campus<br />Calgary, AB
        </div>
        {/* <p className="tip">Preset — no changes needed.</p> */}
      </div>

      {/* Photo upload + adjust */}
      <div className="ctrl-section">
        <div className="ctrl-label">&gt;_ Your Photo</div>
        <button className="upload-btn" onClick={() => fileRef.current.click()}>
          ⬆ &nbsp;UPLOAD YOUR PHOTO
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
        <p className="tip">Square photo works best. Click the circle on the card too.</p>

        {photoSrc && (
          <div className="slider-section">
            <div className="ctrl-label" style={{ marginBottom: '10px' }}>&gt;_ Adjust Photo</div>

            <div className="slider-row">
              <span className="slider-label">SIZE</span>
              <input
                type="range"
                min="50"
                max="200"
                value={photoTransform.scale}
                onChange={(e) =>
                  onPhotoTransformChange({ ...photoTransform, scale: Number(e.target.value) })
                }
              />
              <span className="slider-val">{photoTransform.scale}%</span>
            </div>

            <div className="slider-row">
              <span className="slider-label">LEFT / RIGHT</span>
              <input
                type="range"
                min="-120"
                max="120"
                value={photoTransform.x}
                onChange={(e) =>
                  onPhotoTransformChange({ ...photoTransform, x: Number(e.target.value) })
                }
              />
            </div>

            <div className="slider-row">
              <span className="slider-label">UP / DOWN</span>
              <input
                type="range"
                min="-120"
                max="120"
                value={photoTransform.y}
                onChange={(e) =>
                  onPhotoTransformChange({ ...photoTransform, y: Number(e.target.value) })
                }
              />
            </div>

            <button
              className="upload-btn"
              style={{ marginTop: '10px', fontSize: '9px', padding: '8px' }}
              onClick={resetTransform}
            >
              ↺ &nbsp;RESET POSITION
            </button>
          </div>
        )}
      </div>

      {/* Download */}
      <button className="download-btn" onClick={onDownload}>
        ▼ &nbsp;DOWNLOAD CARD
      </button>

    </div>
  )
}
