import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/variables.css'
import './styles/global.css'

// Polyfill roundRect for older Safari
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (typeof r === 'number') r = [r, r, r, r]
    const [tl = 0, tr = 0, br = 0, bl = 0] = r
    this.beginPath()
    this.moveTo(x + tl, y)
    this.lineTo(x + w - tr, y)
    this.arcTo(x + w, y, x + w, y + tr, tr)
    this.lineTo(x + w, y + h - br)
    this.arcTo(x + w, y + h, x + w - br, y + h, br)
    this.lineTo(x + bl, y + h)
    this.arcTo(x, y + h, x, y + h - bl, bl)
    this.lineTo(x, y + tl)
    this.arcTo(x, y, x + tl, y, tl)
    this.closePath()
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
