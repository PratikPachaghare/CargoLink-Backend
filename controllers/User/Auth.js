import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandeler.js";

const data = [
  {
    id: 1,
    name: "John Doe",
    role: "customer",
    deliveries: [
      { id: 101, pickup: "Mumbai", drop: "Pune", status: "pending" },
      { id: 102, pickup: "Delhi", drop: "Noida", status: "delivered" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "driver",
    vehicles: [
      {
        id: 201,
        type: "Truck",
        capacity: 1000,
        availabilityStatus: "available",
      },
      {
        id: 202,
        type: "Van",
        capacity: 500,
        availabilityStatus: "unavailable",
      },
    ],
    rideShares: [
      { id: 301, pickup: "Bangalore", drop: "Chennai", availableSpace: 200 },
      { id: 302, pickup: "Mumbai", drop: "Goa", availableSpace: 150 },
    ],
  },
  {
    id: 3,
    name: "Ali Khan",
    role: "porter",
    deliveries: [
      { id: 103, pickup: "Kolkata", drop: "Howrah", status: "inTransit" },
    ],
  },
];

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Here you would typically validate the username and password with your database
    const User = await User.findOne({ email: username });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = password === User.password; // Replace with actual password validation logic

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = "dummy-jwt-token"; // Replace with actual JWT token generation logic

    res.status(200).json({ message: "Login Successful", token, User });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const ressiter = (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    // Here you would typically add the user to your database
    const newUser = { id: Date.now(), name, email, phone, role };
    newUser.save();
    // For demonstration, we're just returning the new user object
    res.status(201).json({ message: "User Registered Successfully", user: newUser });   
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const ressiter1 = (req, res) => {
  asyncHandler(async (req, res) => {
    const { name, email, password, phone, role } = req.body;    
    const newUser = new User({ name, email, password, phone, role });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully", user: newUser });
  },message="Internal Server Error");
};

export { login, ressiter };
