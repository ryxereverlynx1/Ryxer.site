const chatWindow = document.getElementById('chat-window');
const thinking = document.getElementById('thinking');
const historyList = document.getElementById('history-list');
let currentMessages = [];

window.onload = () => renderSidebar();

async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    currentMessages.push({ role: "user", content: text });

    // Move thinking indicator to the bottom and show it
    chatWindow.appendChild(thinking);
    thinking.style.display = 'block';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const response = await fetch('https://api.ryxer.site:8082/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: currentMessages })
        });
        const data = await response.json();
        thinking.style.display = 'none';

        if (data.reply) {
            addMessage(data.reply, 'ai');
            currentMessages.push({ role: "assistant", content: data.reply });
            saveToLocalStorage();
        }
    } catch (err) {
        thinking.style.display = 'none';
        addMessage("Error: Server not reached.", 'ai');
    }
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `msg ${sender}`;
    if (sender === 'ai') {
        div.innerHTML = marked.parse(text);
        div.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
    } else {
        div.innerText = text;
    }
    // Ensure thinking indicator stays at the very bottom
    chatWindow.insertBefore(div, thinking);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function saveToLocalStorage() {
    let chats = JSON.parse(localStorage.getItem('nexus_chats') || '[]');
    const title = currentMessages[0].content.substring(0, 30);
    const idx = chats.findIndex(c => c.title === title);
    if (idx > -1) chats[idx].messages = currentMessages;
    else chats.unshift({ title, messages: currentMessages });
    localStorage.setItem('nexus_chats', JSON.stringify(chats.slice(0, 15)));
    renderSidebar();
}

function renderSidebar() {
    const chats = JSON.parse(localStorage.getItem('nexus_chats') || '[]');
    historyList.innerHTML = chats.map((c, i) => 
        `<div class="history-item" onclick="loadChat(${i})">${c.title}</div>`
    ).join('');
}

function loadChat(idx) {
    const chats = JSON.parse(localStorage.getItem('nexus_chats') || '[]');
    chatWindow.innerHTML = '';
    chatWindow.appendChild(thinking); // Re-add thinking to new window
    currentMessages = chats[idx].messages;
    currentMessages.forEach(m => addMessage(m.content, m.role === 'user' ? 'user' : 'ai'));
}

function startNewChat() {
    location.reload(); // Simplest way to reset the state

}


