import React, { useState } from 'react'
import Card from './components/Card'
import Controls from './components/Controls'
import { useCanvasExport } from './hooks/useCanvasExport'

export default function App() {
  const [role, setRole] = useState('Competing at')
  const [photoSrc, setPhotoSrc] = useState(null)
  const [photoTransform, setPhotoTransform] = useState({ scale: 100, x: 0, y: 0 })
  const { exportCard } = useCanvasExport()

  function handlePhotoUpload(src) {
    setPhotoSrc(src)
    setPhotoTransform({ scale: 100, x: 0, y: 0 })
  }

  function handlePhotoClick() {
    // Trigger the hidden file input inside Controls via a custom event,
    // or just open a standalone file picker here for the card circle click
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => handlePhotoUpload(ev.target.result)
      reader.readAsDataURL(file)
    }
    input.click()
  }

  async function handleDownload() {
    const dataUrl = await exportCard({ role, photoSrc, photoTransform })
    const link = document.createElement('a')
    link.download = 'hack-the-planet-linkedin.png'
    link.href = dataUrl
    link.click()
  }

  return (
    <>
      <h1 className="page-title">HACK THE PLANET</h1>
      <p className="page-subtitle">&gt;_ LinkedIn Post Creator · CTF 2026</p>

      <div className="workspace">
        <Card
          role={role}
          photoSrc={photoSrc}
          photoTransform={photoTransform}
          onPhotoClick={handlePhotoClick}
        />

        <Controls
          role={role}
          onRoleChange={setRole}
          photoSrc={photoSrc}
          photoTransform={photoTransform}
          onPhotoTransformChange={setPhotoTransform}
          onPhotoUpload={handlePhotoUpload}
          onDownload={handleDownload}
        />
      </div>
    </>
  )
}
