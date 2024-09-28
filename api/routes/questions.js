const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const { OpenAI } = require('openai');
const router = express.Router();
require('dotenv').config();

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load CSV data
const data = [];
fs.createReadStream('./data/services.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
    console.log('Row from CSV:', row);  // Log each row as it's read
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });

// Personal information collection steps
const infoSteps = [
  { question: "Let's start with your zip code. Could you please provide that?", field: 'zipCode' },
  { question: 'Next, could you please tell me your name?', field: 'name' },
  { question: 'Could you please provide your email address?', field: 'email' },
  { question: 'What is your phone number?', field: 'phone' },
  { question: 'Lastly, can I have your full address?', field: 'address' }
];

// Extract options for the current step in the question funnel
function extractOptions(questionFunnel, step) {
  const funnelParts = questionFunnel.split('>');  // Split the question funnel into parts based on ">"
  if (step < funnelParts.length) {
    return funnelParts[step].trim().split('|').map(option => option.trim());
  }
  return [];
}

// Main route to handle chatbot conversation
router.post('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;
  const { userMessage, step = 0, collectedInfo = {}, serviceSelected = false } = req.body;

  console.log('Requested Category ID:', categoryId);

  // Filter data by Category ID
  const filteredData = data.filter(row => row['Category ID'] == categoryId);

  if (filteredData.length === 0) {
    return res.status(404).json({ message: 'No data found for this Category ID' });
  }

  try {
    let nextStep = step;
    let message = '';

    // If a service has already been selected, move to personal information collection
    if (serviceSelected) {
      // Check if we're in the process of collecting personal info
      if (nextStep >= infoSteps.length) {
        message = "Thank you for providing all the information.";
        return res.json({ message, collectedInfo });
      }

      const currentField = infoSteps[step].field;

      // Store user input into the collected info
      if (step > 0 && currentField) {
        collectedInfo[currentField] = userMessage;
      }

      if (step < infoSteps.length - 1) {
        // Ask the next question in the flow
        message = infoSteps[step + 1].question;
        nextStep++;
      } else {
        // All information collected
        message = "Thank you for providing all the required details.";
        nextStep = infoSteps.length;  // Stop the flow
      }

      return res.json({
        message: message,
        nextStep: nextStep,  // Update step
        collectedInfo: collectedInfo  // Keep track of what we collected
      });
    }

    // If a service hasn't been selected yet, proceed with service selection flow
    const options = Array.from(new Set(
      filteredData.map(item => extractOptions(item['Question Funnel'], step)).flat()
    ));

    if (options.length > 0) {
      message = `Here are the options: ${options.join(', ')}`;
      nextStep++;
    } else {
      // If there are no more options, service is selected, move to info collection
      message = "Service selected. Let's proceed with gathering some information.";
      nextStep = 0;  // Reset step for info collection
      return res.json({
        message: message,
        serviceSelected: true,  // Indicate that the service is selected
        nextStep: 0,
        collectedInfo: {}  // Reset collected info for personal data
      });
    }

    res.json({
      message: message,
      options: options,
      nextStep: nextStep,  // Update step for service selection
    });

  } catch (error) {
    console.error('Error with OpenAI GPT-4 API:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error with OpenAI GPT-4 API' });
  }
});

module.exports = router;
