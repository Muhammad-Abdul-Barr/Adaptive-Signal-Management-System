# Adaptive Traffic Signal Management System

An AI-powered adaptive traffic management system designed to improve urban traffic flow, reduce congestion, and contribute to smart city initiatives. This project leverages real-time vehicle detection using YOLOv8, a React-based frontend, and a Node.js backend integrated with a MongoDB database.

---

## Introduction

Traditional traffic systems struggle with static signal timings, causing congestion, delays, and inefficiencies. Our Adaptive Traffic Signal Management System addresses these issues using AI to dynamically adjust signal timings based on real-time vehicle density. 

### Objectives
- Minimize traffic congestion and improve flow.
- Reduce fuel consumption and vehicle emissions.
- Create a scalable, adaptable system for evolving urban infrastructure.

---

## Features

- **Real-Time Vehicle Detection**: YOLOv8 detects and classifies vehicles using live camera feeds.
- **Dynamic Signal Timing**: Signal durations are optimized based on traffic density.
- **User-Friendly Interface**: Configure signals and monitor intersections via an intuitive web application.
- **Scalability**: Uses OpenStreetMaps for adapting to changing road layouts.
- **Failover Mechanism**: Defaults to pre-configured timings during system errors.
- **Logs and Monitoring**: Tracks signal adjustments, vehicle detections, and traffic data.

---

## System Architecture

1. **Frontend**: Built with React and styled using TailwindCSS for a responsive UI.
2. **Backend**: Developed with Node.js and Express.js for API and server-side logic.
3. **Database**: MongoDB for robust and flexible data management.
4. **AI Integration**: YOLOv8 for vehicle detection, integrated via FastAPI and OpenCV.
5. **Live Feed**: Prototyped with IP-based live camera feeds (upgradable to fiber-optic).

---

## Technologies Used

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js, FastAPI
- **Database**: MongoDB
- **AI Model**: YOLOv8
- **Other Tools**: OpenCV, SMOTE, Firebase (future upgrade for cloud storage)

---

## Installation

### Prerequisites
- Node.js
- MongoDB
- Python environment for AI model integration

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/adaptive-traffic-management.git
   cd adaptive-traffic-management
