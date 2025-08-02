// import React, { useRef, useState, useEffect } from "react";

// const DrawingCanvas = ({ onCanvasPagesChange }) => {
//   const [pages, setPages] = useState([{}]);
//   const canvasRefs = useRef([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [tool, setTool] = useState("pen");
//   const [color, setColor] = useState("#000000");
//   const [lineWidth, setLineWidth] = useState(3);

//   const startDrawing = (e, pageIndex) => {
//     const canvas = canvasRefs.current[pageIndex];
//     const ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     setIsDrawing(true);
//   };

//   const draw = (e, pageIndex) => {
//     if (!isDrawing) return;
//     const canvas = canvasRefs.current[pageIndex];
//     const ctx = canvas.getContext("2d");
//     ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
//     ctx.lineWidth = lineWidth;
//     ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     ctx.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     sendCanvasPagesUp();
//   };

//   const sendCanvasPagesUp = () => {
//     const canvasData = canvasRefs.current.map((canvas) =>
//       canvas ? canvas.toDataURL("image/png") : null
//     );
//     if (onCanvasPagesChange) {
//       onCanvasPagesChange(canvasData);
//     }
//   };

//   const addNewPage = () => {
//     setPages((prev) => [...prev, {}]);
//     setTimeout(sendCanvasPagesUp, 100);
//   };

//   const clearPage = (pageIndex) => {
//     const canvas = canvasRefs.current[pageIndex];
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     sendCanvasPagesUp();
//   };

//   return (
//     <div className="w-full">
//       {/* Tools */}
//       <div className="flex gap-4 items-center mb-4">
//         <select
//           value={tool}
//           onChange={(e) => setTool(e.target.value)}
//           className="text-black p-1"
//         >
//           <option value="pen">Pen</option>
//           <option value="eraser">Eraser</option>
//         </select>
//         <input
//           type="color"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//         />
//         <input
//           type="range"
//           min="1"
//           max="10"
//           value={lineWidth}
//           onChange={(e) => setLineWidth(e.target.value)}
//         />
//         <button onClick={() => clearPage(currentPage)} className="bg-red-600 px-3 py-1 rounded">
//           Clear Page
//         </button>
//         <button onClick={addNewPage} className="bg-green-600 px-3 py-1 rounded">
//           ➕ Add Page
//         </button>
//       </div>

//       {/* Pages */}
//       {pages.map((_, index) => (
//         <div key={index} className="mb-8">
//           <h3 className="text-xl font-bold mb-2">Page {index + 1}</h3>
//           <canvas
//             ref={(el) => (canvasRefs.current[index] = el)}
//             width={800}
//             height={500}
//             className="border border-black bg-white"
//             onMouseDown={(e) => startDrawing(e, index)}
//             onMouseMove={(e) => draw(e, index)}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DrawingCanvas;

import React, { useEffect, useRef, useState } from "react";

export default function DrawingCanvas({
  canvasData = [],
  onSave,
  tool = "pen",
  strokeColor = "#000000",
  strokeWidth = 2,
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState(canvasData);
  const [currentStroke, setCurrentStroke] = useState([]);

  useEffect(() => {
    drawStrokes(strokes);
  }, [strokes]);

  useEffect(() => {
    setStrokes(canvasData);
  }, [canvasData]);

  const drawStrokes = (strokesToDraw) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokesToDraw.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      stroke.points.forEach((pt) => ctx.lineTo(pt.x, pt.y));
      ctx.stroke();
    });
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setCurrentStroke([point]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setCurrentStroke((prev) => [...prev, point]);
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const newStroke = {
        tool,
        color: strokeColor,
        width: strokeWidth,
        points: currentStroke,
      };
      const updatedStrokes = [...strokes, newStroke];
      setStrokes(updatedStrokes);
      onSave(updatedStrokes);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="border border-gray-300 bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}


