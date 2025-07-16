const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Health check
app.get('/', async (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'FawadOS API Running',
    timestamp: new Date()
  });
});

// Test Supabase connection
app.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1);
    
    res.json({
      status: 'success',
      message: 'Supabase connected successfully!',
      supabase_url: process.env.SUPABASE_URL
    });
  } catch (err) {
    res.json({
      status: 'error',
      message: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`FawadOS API running on port ${port}`);
});
