import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const canvasRef = useRef(null);
  const [pointMap, setPointMap] = useState({}); // { "x_y": count }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseMove = async (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);
      const key = `${x}_${y}`;

      // Update hit count
      setPointMap(prev => {
        const newMap = { ...prev };
        newMap[key] = (newMap[key] || 0) + 1;

        // Draw pixel
        const intensity = Math.min(255, newMap[key] * 20);
        ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
        ctx.fillRect(x, y, 2, 2);

        axios.post('http://localhost:5000/api/points', { x, y });

        return newMap;
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Mouse Track Canvas</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black', marginTop: 10 }}
      />
    </div>
  );
}

export default App;
