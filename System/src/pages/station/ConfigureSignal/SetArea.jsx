import React, { useState, useRef, useEffect } from "react";

export const SetArea = ({ capturedImages }) => {
  const [imagesWithPoints, setImagesWithPoints] = useState(
    capturedImages.map((src) => ({ src, points: [] }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && imgRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const img = imgRef.current;

      // Set canvas size to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on the canvas
      context.drawImage(img, 0, 0, img.width, img.height);

      // Draw existing points
      imagesWithPoints[currentIndex].points.forEach(({ x, y }) => {
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
      });
    }
  }, [currentIndex, imagesWithPoints]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setImagesWithPoints((prev) => {
      const updated = [...prev];
      if (updated[currentIndex].points.length < 4) {
        updated[currentIndex].points.push({ x, y });
      }
      return updated;
    });
  };

  const handleNextImage = () => {
    if (imagesWithPoints[currentIndex].points.length === 4) {
      if (currentIndex < imagesWithPoints.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        alert("All images configured!");
        console.log("Final Data:", imagesWithPoints);
      }
    } else {
      alert("Please select exactly 4 points on this image.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Configuring Image {currentIndex + 1} of {imagesWithPoints.length}
      </h1>
      <div className="relative">
        <img
          ref={imgRef}
          src={imagesWithPoints[currentIndex].src}
          alt={`screenshot-${currentIndex}`}
          className="hidden" // Hide the image as it's only used for canvas rendering
          onLoad={() => {
            // Redraw the image on canvas when it loads
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            const img = imgRef.current;

            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
          }}
        />
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-[640px] h-[360px] cursor-crosshair border-2"
        ></canvas>
      </div>
      <div className="mt-4">
        <p className="text-lg">Selected Points:</p>
        <pre>{JSON.stringify(imagesWithPoints[currentIndex].points, null, 2)}</pre>
      </div>
      <button
        onClick={handleNextImage}
        className="mt-4 px-4 py-2 rounded text-white font-semibold bg-purple-500 hover:bg-purple-600"
      >
        Next Image
      </button>
    </div>
  );
};

export default SetArea;