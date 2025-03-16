const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

async function addMessage(userId, messageText, createdAt) {

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const userName = `User ${userId}`;
    const timestamp = new Date(createdAt).toLocaleString();

    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = messageText;

    const header = document.createElement('div');
    header.className = 'message-header';
    header.innerHTML = `<strong>${userName}</strong> - <span class="timestamp">${timestamp}</span>`;

    messageContainer.appendChild(header);
    messageContainer.appendChild(message);

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function loadMessages() {
    chatBox.innerHTML = '';
    const token = localStorage.getItem('token');
    try {
        console.log("Fetching messages:");
        const response = await axios.get(`${CONFIG.API_BASE_URL}/api/getMessages`, {
            headers: { "Authorization": token }
        });
        console.log("Messages fetched:", response.data);

        response.data.forEach((messageData) => {
            const { UserId, messageText, createdAt } = messageData;
            addMessage(UserId, messageText, createdAt);
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

sendButton.addEventListener('click', async () => {
    const text = messageInput.value.trim();
    if (text) {
        addMessage("You", text, new Date().toISOString());
        messageInput.value = '';

        const token = localStorage.getItem('token');
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

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendButton.click();
});

// Load messages when the page is loaded and then call loadMessages every second
window.addEventListener('load', () => {
    loadMessages(); // Initial load
    setInterval(loadMessages, 1000); // Fetch messages every 1 second
});
