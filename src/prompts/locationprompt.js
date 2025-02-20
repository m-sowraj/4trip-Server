const axios = require('axios');

// Replace with your OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to interact with OpenAI's API
const generateScreen = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 1500,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop: ['###'],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating screen:', error.response ? error.response.data : error.message);
        return null;
    }
};

// Prompts for different Location screens
const prompts = {
    createLocation: `
### Generate a React component for creating a new Location.
The component should include a form with the following fields:
- Name (Text Input)
- Latitude (Number Input)
- Longitude (Number Input)
- Submit Button

It should handle form validation and display success or error messages based on the API response.

Provide the complete React component code using functional components and hooks.

### Response:
    `,
    editLocation: `
### Generate a React component for editing an existing Location.
The component should fetch the Location details based on an ID, pre-fill the form with existing data, and allow updating the following fields:
- Name (Text Input)
- Latitude (Number Input)
- Longitude (Number Input)
- Submit Button

It should handle form validation and display success or error messages based on the API response.

Provide the complete React component code using functional components and hooks.

### Response:
    `,
    deleteLocation: `
### Generate a React component for deleting a Location.
The component should display the Location details and include a Delete button. Upon confirmation, it should call the delete API and handle success or error responses.

Provide the complete React component code using functional components and hooks.

### Response:
    `,
    viewLocation: `
### Generate a React component for viewing a single Location's details.
The component should display the following information:
- Name
- Latitude
- Longitude
- Created At
- Updated At

Include a button to navigate back to the Locations list.

Provide the complete React component code using functional components and hooks.

### Response:
    `,
    listLocations: `
### Generate a React component for listing all Locations.
The component should fetch and display a table of Locations with the following columns:
- Name
- Latitude
- Longitude
- Actions (View, Edit, Delete buttons)

Include pagination and a search bar to filter Locations by name.

Provide the complete React component code using functional components and hooks.

### Response:
    `,


};

// Example usage: Generate the Create Location screen
const createLocationScreenPrompt = prompts.createLocation;

generateScreen(createLocationScreenPrompt).then((response) => {
    if (response) {
        console.log('--- Create Location Screen ---');
        console.log(response);
    } else {
        console.log('Failed to generate the Create Location screen.');
    }
});

// Similarly, you can generate other screens by calling generateScreen with the respective prompts
// For example:
// generateScreen(prompts.editLocation).then(...);
// generateScreen(prompts.deleteLocation).then(...); 