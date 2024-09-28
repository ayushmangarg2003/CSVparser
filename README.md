Chatbot for Service Selection and Personal Information Collection
Project Overview
This project is a chatbot application built using React (Vite) for the frontend and Node.js (Express) for the backend. The chatbot guides users through selecting a service based on data from a CSV file and, after the service selection, collects personal information such as the user's name, zip code, email, phone number, and address.

My Approach
1. CSV Data Parsing:
I used csv-parser in the backend to load and process a CSV file containing service data with categories and a question funnel.
Each row of the CSV file represents a service with a Category ID, Service ID, and a Question Funnel. The funnel contains the sequence of steps/questions to guide the user toward selecting a service.
Challenge: Ensuring the CSV file was parsed correctly and that the question funnel was processed dynamically for each step based on user input.
2. Service Selection Flow:
The chatbot presents service options in a decision-tree format, where each step in the Question Funnel corresponds to a question with multiple options.
The backend dynamically generates these options based on the user's current step in the funnel and sends them to the frontend.
Button-based Options: I implemented clickable buttons on the frontend, allowing the user to select options rather than manually typing them.
Challenge: One of the biggest challenges was ensuring that the question funnel progressed correctly without repeating options or losing track of the user’s position in the flow. I solved this by keeping track of the current step in both the frontend and backend.
3. Transition to Personal Information Collection:
Once the user completes the service selection, the chatbot transitions to collecting personal details.
I defined a set of questions for gathering personal information: zip code, name, email, phone number, and address.
The user’s responses are stored and passed back to the backend with each message, ensuring all the data is collected step by step.
Challenge: Managing the seamless transition between service selection and personal info collection was tricky, as I had to ensure the chatbot didn’t start asking for personal info prematurely.
4. Frontend Chatbot Design:
I implemented the chatbot interface using React. The chatbot displays the conversation history, user inputs, bot responses, and clickable service options.
I focused on making the chatbot modern and responsive, with royal blue and white as the primary colors.
Auto-scrolling was implemented to keep the conversation in view as new messages and options are added.
Challenge: Initially, I struggled with ensuring that the chatbot maintained its styling while being fully responsive. However, by carefully adjusting the CSS, I achieved the desired look.
5. Backend Integration with GPT-4:
I integrated the backend with OpenAI’s GPT-4 to handle dynamic conversational responses.
The backend sends each user message to GPT-4, which responds based on the current conversation context.
Challenge: Ensuring the conversation flowed naturally while integrating GPT-4 into the chatbot, as well as managing the step tracking and deciding when to switch between service selection and personal info collection.
