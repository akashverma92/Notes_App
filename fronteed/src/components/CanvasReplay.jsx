import React, { useEffect, useRef } from "react";

export default function CanvasReplay({ pageData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(pageData)) {
      console.warn("Invalid canvas page data", pageData);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear previous strokes
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pageData.forEach((stroke) => {
      const { points, color = "#000000", size = 2 } = stroke;

      if (!Array.isArray(points) || points.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      ctx.stroke();
    });
  }, [pageData]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ border: "1px solid #ccc", background: "#fff" }}
    />
  );
}
