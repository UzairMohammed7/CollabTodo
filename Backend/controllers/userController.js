const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
          });
        res.status(201).json({token, user, message: "User registered" });
      } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Email" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
          });
        res.json({ token, user, userId: user._id, message: "Loggedin Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkAuth = async (req, res) => {
    try {
      let user = await User.findById(req.userId).select("-password")
      if (!user) {
        return res.status(401).json({ success: false, message: "User Not Found" });
      }
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
};

exports.logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Generate invite link
exports.generateInviteLink = async (req, res) => {
  try {
    const userId = req.userId;
    const inviteToken = jwt.sign({ invitedBy: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const inviteLink = `${process.env.FRONTEND_URL}/invite/${inviteToken}`;
    res.json({ inviteLink });
  } catch (err) {
    console.error("Error generating invite link:", err);
    res.status(500).json({ error: "Failed to generate invite link" });
  }
};

// Validate invite token
exports.validateInvite = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, invitedBy: decoded.invitedBy });
  } catch (err) {
    res.status(400).json({ valid: false, error: "Invalid or expired token" });
  }
};
