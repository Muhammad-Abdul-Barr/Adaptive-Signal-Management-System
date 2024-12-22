const mongoose = require('./database');

const UserSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  cnic: String,
  email: String,
  profilepiclink: String,
  role: String,
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const User = mongoose.model('User', UserSchema);
module.exports.User = User;

const IntersectionSchema = new mongoose.Schema({
  IntersectionName: String,
  Location: String,
  trafficflow: String,
  numberofSignals: Number,
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // FK to User
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  signals: {
    signal1: { type: mongoose.Schema.Types.ObjectId, ref: 'SignalData' }, // Pairing signals
    signal2: { type: mongoose.Schema.Types.ObjectId, ref: 'SignalData' },
    signal3: { type: mongoose.Schema.Types.ObjectId, ref: 'SignalData' },
    signal4: { type: mongoose.Schema.Types.ObjectId, ref: 'SignalData' },
  },
}, { timestamps: true });

const Intersection = mongoose.model('Intersection', IntersectionSchema);
module.exports.Intersection = Intersection;

const SignalDataSchema = new mongoose.Schema({
    cameralink: String,
    Intersection: { type: mongoose.Schema.Types.ObjectId, ref: 'Intersection' }, // FK to Intersection
    timing: Number,
    status: String,
    numberofVehicles: Number,
    point: {
      lefttop: { x: Number, y: Number },
      leftbottom: { x: Number, y: Number },
      righttop: { x: Number, y: Number },
      rightbottom: { x: Number, y: Number },
    },
    imageconfigurelink: String,
  }, { timestamps: true });
  
  const SignalData = mongoose.model('SignalData', SignalDataSchema);
  module.exports.SignalData = SignalData;

  const LogsSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    IntersectionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Intersection' }, // FK to Intersection
    processedimagelink: String,
  });
  
  const Logs = mongoose.model('Logs', LogsSchema);
  module.exports.Logs = Logs;
  