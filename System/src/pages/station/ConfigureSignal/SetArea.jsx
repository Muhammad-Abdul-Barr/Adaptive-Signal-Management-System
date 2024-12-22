import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SetArea = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve image names from state
  const imageNames = location.state?.imageNames || [];

  useEffect(() => {
    if (!imageNames.length) {
      console.error("No image names found. Redirecting to LiveFeed.");
      navigate("/live-feed");
    }
    console.log("Image names received:", imageNames);
  }, [imageNames, navigate]);

  const [imagesWithPoints, setImagesWithPoints] = useState(
    imageNames.map((name) => ({
      src: `/assets/${name}`,
      points: [],
    }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const drawImageWithDelay = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = imgRef.current;

    setTimeout(() => {
      // Ensure the image is fully loaded
      if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        console.log("Drawing image:", img.src);
        console.log("Image dimensions:", img.naturalWidth, img.naturalHeight);

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

        // Draw existing points
        imagesWithPoints[currentIndex].points.forEach(({ x, y }) => {
          console.log(`Drawing point at (${x}, ${y})`);
          context.beginPath();
          context.arc(x, y, 10, 0, 2 * Math.PI);
          context.fillStyle = "red";
          context.fill();
        });
      } else {
        console.warn("Image not fully loaded or invalid dimensions.", img.src);
      }
    }, 200); // Introduce a delay of 1000ms
  };

  useEffect(() => {
    console.log(`Loading image: ${imagesWithPoints[currentIndex]?.src}`);
    drawImageWithDelay();
  }, [currentIndex, imagesWithPoints]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const img = imgRef.current;

    // Calculate the scale ratio
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    // Get scaled coordinates
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Update state with the most recent points
    setImagesWithPoints((prev) => {
      const updated = [...prev];
      if (updated[currentIndex].points.length < 4) {
        updated[currentIndex] = {
          ...updated[currentIndex],
          points: [...updated[currentIndex].points, { x, y }],
        };
      }
      return updated;
    });

    console.log(`Point added: (${x}, ${y})`);
  };

  const handleNextImage = async () => {
    if (imagesWithPoints[currentIndex].points.length === 4) {
      if (currentIndex < imagesWithPoints.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // When on the last image, upload the files
        console.log("Forwarding data:", JSON.stringify(imagesWithPoints, null, 2));
        navigate("verifycamera", { state: { imagesWithPoints } });
      }
    } else {
      alert("Please select exactly 4 points on this image.");
    }
  };

  return (
    <div className="mt-24 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Configuring Image {currentIndex + 1} of {imagesWithPoints.length}
      </h1>
      <div className="relative">
        <img
          ref={imgRef}
          src={imagesWithPoints[currentIndex]?.src}
          alt={`screenshot-${currentIndex}`}
          className="hidden"
          onLoad={() => {
            console.log("Image fully loaded:", imagesWithPoints[currentIndex]?.src);
            drawImageWithDelay();
          }}
        />
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-[640px] h-[360px] cursor-crosshair border-2"
        ></canvas>
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
