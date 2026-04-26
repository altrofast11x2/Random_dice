import { useState, useRef } from 'react'
import Die from './Die'
import './App.css'

const DOT_POSITIONS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}

export default function App() {
  const [count, setCount] = useState(2)
  const [values, setValues] = useState([1, 1])
  const [rolling, setRolling] = useState(false)
  const [history, setHistory] = useState([])
  const [rolled, setRolled] = useState(false)
  const intervalRef = useRef(null)

  function roll() {
    if (rolling) return
    setRolling(true)

    const final = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1)

    let frames = 0
    intervalRef.current = setInterval(() => {
      setValues(Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1))
      frames++
      if (frames >= 10) {
        clearInterval(intervalRef.current)
        setValues(final)
        setRolled(true)
        setHistory(h => [final.reduce((a, b) => a + b, 0), ...h].slice(0, 10))
        setRolling(false)
      }
    }, 50)
  }

  function changeCount(n) {
    const next = Math.min(6, Math.max(1, count + n))
    setCount(next)
    setValues(Array.from({ length: next }, () => 1))
    setRolled(false)
  }

  const sum = values.reduce((a, b) => a + b, 0)

  return (
    <div className="wrap">
      <p className="title">DICE ROLLER</p>

      <div className="dice-grid">
        {values.map((v, i) => (
          <Die key={i} value={v} rolling={rolling} dotPositions={DOT_POSITIONS[v]} />
        ))}
      </div>

      <div className="sum-box">
        <p className="sum-label">합계</p>
        <p className="sum-num">{rolled ? sum : '—'}</p>
      </div>

      <div className="controls">
        <div className="count-row">
          <span className="count-label">주사위 수</span>
          <button className="cnt-btn" onClick={() => changeCount(-1)}>−</button>
          <span className="count-val">{count}</span>
          <button className="cnt-btn" onClick={() => changeCount(1)}>+</button>
        </div>
        <button className="roll-btn" onClick={roll} disabled={rolling}>
          {rolling ? '굴리는 중...' : '굴리기'}
        </button>
      </div>

      {history.length > 0 && (
        <div className="history">
          <p className="hist-label">기록</p>
          <div className="hist-pills">
            {history.map((h, i) => (
              <span className="pill" key={i}>{h}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
