const { User, Intersection, SignalData, Logs } = require('./dbmodels');

const seedDatabase = async () => {
  try {
    // Clear existing data (optional)
    await User.deleteMany({});
    await Intersection.deleteMany({});
    await SignalData.deleteMany({});
    await Logs.deleteMany({});

    // Create Users
    const users = [
        {
            Username: "admin1",
            Password: "ad123",
            cnic: "12345-6789012-1",
            email: "admin1@example.com",
            profilepiclink: "https://example.com/admin1.jpg",
            role: "admin",
          },
          {
            Username: "Qila Station",
            Password: "st123",
            cnic: "12345-6789012-2",
            email: "qilastation@gmail.com",
            profilepiclink: "https://example.com/admin2.jpg",
            role: "station",
          },
    ];
    const savedUsers = await User.insertMany(users);

    // Signal List Template (Each Intersection gets unique signals)
    const signalTemplate = (intersectionIndex) => [
      {
        cameralink: `http://<IP${intersectionIndex}1>:<port>/video`,
        timing: 20,
        status: "active",
        numberofVehicles: 5,
        point: {
          lefttop: { x: 10, y: 20 },
          leftbottom: { x: 10, y: 50 },
          righttop: { x: 40, y: 20 },
          rightbottom: { x: 40, y: 50 },
        },
        imageconfigurelink: `https://example.com/screenshot${intersectionIndex}1.png`,
      },
      {
        cameralink: `http://<IP${intersectionIndex}2>:<port>/video`,
        timing: 15,
        status: "active",
        numberofVehicles: 10,
        point: {
          lefttop: { x: 15, y: 25 },
          leftbottom: { x: 15, y: 55 },
          righttop: { x: 45, y: 25 },
          rightbottom: { x: 45, y: 55 },
        },
        imageconfigurelink: `https://example.com/screenshot${intersectionIndex}2.png`,
      },
      {
        cameralink: `http://<IP${intersectionIndex}3>:<port>/video`,
        timing: 25,
        status: "active",
        numberofVehicles: 8,
        point: {
          lefttop: { x: 20, y: 30 },
          leftbottom: { x: 20, y: 60 },
          righttop: { x: 50, y: 30 },
          rightbottom: { x: 50, y: 60 },
        },
        imageconfigurelink: `https://example.com/screenshot${intersectionIndex}3.png`,
      },
      {
        cameralink: `http://<IP${intersectionIndex}4>:<port>/video`,
        timing: 30,
        status: "active",
        numberofVehicles: 3,
        point: {
          lefttop: { x: 25, y: 35 },
          leftbottom: { x: 25, y: 65 },
          righttop: { x: 55, y: 35 },
          rightbottom: { x: 55, y: 65 },
        },
        imageconfigurelink: `https://example.com/screenshot${intersectionIndex}4.png`,
      },
    ];

    // Create Intersections and Logs
    const intersections = await Promise.all(
      savedUsers.map(async (user, index) => {
        const signalList = signalTemplate(index + 1);

        // Save signals for the intersection
        const savedSignals = await Promise.all(
          signalList.map(async (signal) => {
            const newSignal = new SignalData(signal);
            await newSignal.save();
            return newSignal._id; // Return the ID after saving
          })
        );

        // Dynamically create signal pairs
        const signalPairs = {};
        savedSignals.forEach((signalId, i) => {
          signalPairs[`signal${i + 1}`] = signalId;
        });

        // Save Intersection
        const intersection = new Intersection({
          IntersectionName: `Garhi Shaho ${index + 1}`,
          Location: `Allama Iqbal Road, Garhi Shaho, Lahore`,
          trafficflow: "Three Way",
          numberofSignals: savedSignals.length,
          assigned_to: user._id,
          coordinates: {
            latitude: 31.5546 + index * 0.01,
            longitude: 74.3572 + index * 0.01,
          },
          signals: signalPairs,
        });
        const savedIntersection = await intersection.save();

        // Create Logs for the Intersection
        const logs = [
          {
            timestamp: new Date(),
            IntersectionID: savedIntersection._id,
            processedimagelink: `https://example.com/processed${index + 1}_1.png`,
          },
          {
            timestamp: new Date(),
            IntersectionID: savedIntersection._id,
            processedimagelink: `https://example.com/processed${index + 1}_2.png`,
          },
        ];
        await Logs.insertMany(logs);

        return savedIntersection;
      })
    );

    console.log("Users, intersections, signals, and logs seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    process.exit(); // Exit script
  }
};

seedDatabase();
