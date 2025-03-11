const Agent = require('./../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (agent) => {
  return jwt.sign({ _id: agent._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};
const loginAgent = async (req, res) => {
  try {
    const { login, password } = req.body;

    const agent = await Agent.findOne({
      $or: [{ email: login }, { phone_number: login }]
    });

    if (!agent) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const token = generateToken(agent);
    res.json({ agent, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAgent = async (req, res) => {
  try {
    const { name, email, phone_number, password, bio, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new Agent({
      name,
      email,
      phone_number,
      password: hashedPassword,
      bio,
      address
    });

    await agent.save();
    const token = generateToken(agent);
    res.status(201).json({ agent, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAgentProfile = async (req, res) => {
  res.json(req.agent);
};

const updateAgent = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'email',
    'phone_number',
    'password',
    'bio',
    'address',
    'logo'
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach(async (update) => {
      if (update === 'password') {
        req.agent[update] = await bcrypt.hash(req.body[update], 10);
      } else {
        req.agent[update] = req.body[update];
      }
    });

    await req.agent.save();
    res.json(req.agent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAgent = async (req, res) => {
  try {
    await req.agent.remove();
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginAgent,
  createAgent,
  getAgentProfile,
  updateAgent,
  deleteAgent
};
