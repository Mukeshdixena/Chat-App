
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

async function addMessage(text) {


    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;



}

sendButton.addEventListener('click', async () => {
    const text = messageInput.value.trim();
    if (text) {
        addMessage("You: " + text);
        messageInput.value = '';

        const token = localStorage.getItem('token');
        console.log(token)
        try {
            console.log("api call sent:");
            const response = await axios.post(`${CONFIG.API_BASE_URL}/api/postMessage`,
                { messageText: text },
                { headers: { "Authorization": token } }
            );
            console.log("fine till here");

            console.log("Message sent:", response.data);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
});


messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendButton.click();
});


