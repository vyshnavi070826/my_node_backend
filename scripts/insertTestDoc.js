require('dotenv').config();
const mongoose = require('mongoose');

// Load Department model
const Department = require('../src/models/department');

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to', `${mongoose.connection.host}/${mongoose.connection.name}`);

    const doc = await Department.create({
      name: 'InsertTestDept',
      description: 'Test department inserted by script',
      programs: ['Test Program'],
      jobs: ['Test Job']
    });

    console.log('Inserted document id:', doc._id.toString());
  } catch (err) {
    console.error('Error:', err.message || err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
