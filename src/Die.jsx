import './Die.css'

export default function Die({ value, rolling, dotPositions }) {
  return (
    <div className={`die${rolling ? ' rolling' : ''}`}>
      <div className="dot-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className={`dot${dotPositions.includes(i) ? ' on' : ''}`} />
        ))}
      </div>
    </div>
  )
}
