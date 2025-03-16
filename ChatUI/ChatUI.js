const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to add a formatted message to the chat box
async function addMessage(userId, messageText, createdAt) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    // User details (you can replace userId with the actual user's name if needed)
    const userName = `User ${userId}`; // You can change this to fetch the actual user name if required
    const timestamp = new Date(createdAt).toLocaleString(); // Formatting timestamp

    // Message content
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = messageText;

    // User info and timestamp section
    const header = document.createElement('div');
    header.className = 'message-header';
    header.innerHTML = `<strong>${userName}</strong> - <span class="timestamp">${timestamp}</span>`;

    // Append the header and message to the container
    messageContainer.appendChild(header);
    messageContainer.appendChild(message);

    // Append the message container to chat box and scroll to bottom
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get all messages from the API and display them
async function loadMessages() {
    const token = localStorage.getItem('token');
    try {
        console.log("Fetching messages:");
        const response = await axios.get(`${CONFIG.API_BASE_URL}/api/getMessages`, {
            headers: { "Authorization": token }
        });
        console.log("Messages fetched:", response.data);

        // Assuming response.data is an array of messages
        response.data.forEach((messageData) => {
            const { UserId, messageText, createdAt } = messageData; // Extract details from response
            addMessage(UserId, messageText, createdAt); // Add formatted message to chat box
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Event listener for the send button
sendButton.addEventListener('click', async () => {
    const text = messageInput.value.trim();
    if (text) {
        addMessage("You", text, new Date().toISOString()); // Add "You" as the sender and use current timestamp
        messageInput.value = '';

        const token = localStorage.getItem('token');
        console.log(token);
        try {
            console.log("Sending message:");
            const response = await axios.post(`${CONFIG.API_BASE_URL}/api/postMessage`,
                { messageText: text },
                { headers: { "Authorization": token } }
            );
            console.log("Message sent:", response.data);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
});

// Event listener for pressing Enter to send the message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendButton.click();
});

// Load messages when the page is loaded
window.addEventListener('load', () => {
    loadMessages();
});
