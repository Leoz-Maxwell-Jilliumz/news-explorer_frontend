// Simulate network delay
const simulateDelay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mock user database
const MOCK_USERS = [
  {
    _id: "user1",
    username: "johndoe",
    email: "john@example.com",
    password: "password123",
  },
  {
    _id: "user2",
    username: "janedoe",
    email: "jane@example.com",
    password: "password456",
  },
  {
    _id: "user3",
    username: "testuser",
    email: "test@example.com",
    password: "test123",
  },
];

export const authorize = async (email, password) => {
  await simulateDelay(1500);

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = `fake_token_${user._id}_${Date.now()}`;

  return {
    token: token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

export const register = async (username, email, password) => {
  await simulateDelay(1500);

  const existingUser = MOCK_USERS.find(
    (u) => u.email === email || u.username === username
  );

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email already exists");
    }
    if (existingUser.username === username) {
      throw new Error("Username already exists");
    }
  }

  const newUser = {
    _id: `user${MOCK_USERS.length + 1}`,
    username,
    email,
    password,
  };

  MOCK_USERS.push(newUser);

  const token = `fake_token_${newUser._id}_${Date.now()}`;

  return {
    token: token,
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  };
};

export const checkToken = async (token) => {
  await simulateDelay(300);

  if (!token) {
    throw new Error("No token provided");
  }

  if (!token.startsWith("fake_token_")) {
    throw new Error("Invalid token format");
  }

  const tokenParts = token.split("_");
  const userId = tokenParts[2];

  const user = MOCK_USERS.find((u) => u._id === userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    data: {
      name: user.username,
      email: user.email,
      _id: user._id,
    },
  };
};

export const logout = async () => {
  await simulateDelay(500);

  return {
    success: true,
    message: "Logged out successfully",
  };
};

export const updateProfile = async (token, userData) => {
  await simulateDelay(1000);

  if (!token) {
    throw new Error("Authentication required");
  }

  return {
    data: {
      name: userData.username || "updated user",
      email: userData.email || "updated@example.com",
      _id: "fake-id",
    },
  };
};

export const resetPassword = async (email) => {
  await simulateDelay(2000);

  const user = MOCK_USERS.find((u) => u.email === email);

  if (!user) {
    throw new Error("Email not found");
  }

  return {
    success: true,
    message: "Password reset email sent",
  };
};
