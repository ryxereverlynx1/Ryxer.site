// ==========================================================================
// EVERLYNX AI - CORE SYSTEM MODULE (100% LOCAL FRONT-END)
// Created by RyxerYT / RyxerEverlynx
// ==========================================================================

// ==========================================================================
// ADVANCED AI NEURAL NETWORK & LIVE API INTEGRATION
// ==========================================================================
class EverlynxNeuralNetwork {
    constructor() {
        this.memory = [];
        this.memoryLimit = 10; // Keep last 10 messages for context
        this.name = "EverlynxAI";
        this.creator = "RyxerYT";
        
        // Local Fallback Knowledge
        this.knowledgeBase = {
            greeting: ["Greetings. I am EverlynxAI. My systems are fully operational."],
            fallback: ["I am processing your input. The contextual variables are complex. Tell me more."]
        };
    }

    analyzeIntent(input) {
        if (input.toLowerCase().match(/\b(hi|hello|hey)\b/)) return 'greeting';
        return 'fallback';
    }

    updateMemory(userMsg, aiMsg) {
        this.memory.push({ role: "user", content: userMsg });
        this.memory.push({ role: "assistant", content: aiMsg });
        if (this.memory.length > this.memoryLimit * 2) {
            this.memory = this.memory.slice(-(this.memoryLimit * 2));
        }
    }

async generateResponse(input) {
        const apiKey = localStorage.getItem('everlynx_api_key');

        // 1. FREE LIVE API MODE (Google Gemini)
        if (apiKey && apiKey.trim() !== '') {
            try {
                // Convert our memory array to Gemini's format
                const geminiHistory = this.memory.map(msg => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }));
                
                // Add the new user input
                geminiHistory.push({ role: "user", parts: [{ text: input }] });

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: geminiHistory })
                });

                const data = await response.json();
                
                if (data.error) {
                    console.error("API Error:", data.error.message);
                    return `System Alert: API connection failed (${data.error.message}).`;
                }

                const reply = data.candidates[0].content.parts[0].text;
                this.updateMemory(input, reply);
                return reply;

            } catch (error) {
                console.error("Fetch Error:", error);
                return "System Alert: Network error. Ensure your connection is stable.";
            }
        }

        // 2. LOCAL NEURAL NETWORK MODE (Fallback)
        const delay = Math.min(1000 + (input.length * 20), 3000);
        await new Promise(resolve => setTimeout(resolve, delay));

        const intent = this.analyzeIntent(input);
        const reply = this.knowledgeBase[intent][0];
        this.updateMemory(input, reply);
        return reply;
    }
}

const AI = new EverlynxNeuralNetwork();

// --- AVATAR RENDERING UPDATES ---

function renderMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message slide-up`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Switch to avatar.png for AI
    const avatarContent = sender === 'user' 
        ? `<img src="${DOM.userAvatarDisplay.src}" alt="User">` 
        : `<img src="assets/avatar.png" alt="EverlynxAI">`;

    msgDiv.innerHTML = `
        <div class="msg-avatar">${avatarContent}</div>
        <div class="msg-bubble glass-panel"><p>${text}</p><span class="timestamp">${time}</span></div>
    `;
    
    DOM.chatHistory.appendChild(msgDiv);
    scrollToBottom();
}

function renderTypingIndicator() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = `message ai-message slide-up`;
    msgDiv.innerHTML = `
        <div class="msg-avatar"><img src="assets/avatar.png" alt="EverlynxAI"></div>
        <div class="msg-bubble glass-panel">
            <div class="typing-indicator">
                <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
            </div>
        </div>
    `;
    DOM.chatHistory.appendChild(msgDiv);
    scrollToBottom();
    return id;
}

// Update loadLocalChatHistory Default Message
function loadLocalChatHistory() {
    let history = JSON.parse(localStorage.getItem(getChatHistoryKey()) || '[]');
    DOM.chatHistory.innerHTML = ''; 
    
    if (history.length > 0) {
        history.forEach(msg => {
            renderMessage(msg.text, msg.sender);
            AI.updateMemory(msg.text, msg.text); // Hydrate local memory
        });
    } else {
        DOM.chatHistory.innerHTML = `
            <div class="message ai-message fade-in">
                <div class="msg-avatar"><img src="assets/avatar.png" alt="EverlynxAI"></div>
                <div class="msg-bubble glass-panel">
                    <p>Greetings. I am EverlynxAI, an advanced neural framework. How may I assist you?</p>
                    <span class="timestamp">Just now</span>
                </div>
            </div>
        `;
    }
}


// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const DOM = {
    // Auth UI
    authScreen: document.getElementById('auth-screen'),
    appScreen: document.getElementById('app-screen'),
    authForm: document.getElementById('auth-form'),
    authEmail: document.getElementById('auth-email'),
    authPassword: document.getElementById('auth-password'),
    authSubmitBtn: document.getElementById('auth-submit-btn'),
    tabLogin: document.getElementById('tab-login'),
    tabRegister: document.getElementById('tab-register'),
    forgotPasswordLink: document.getElementById('forgot-password-link'),
    backToLoginLink: document.getElementById('back-to-login-link'),
    authError: document.getElementById('auth-error'),
    authSuccess: document.getElementById('auth-success'),
    logoutBtn: document.getElementById('logout-btn'),
    
    // Profile UI
    userDisplayName: document.getElementById('user-display-name'),
    userAvatarDisplay: document.getElementById('user-avatar-display'),
    avatarUpload: document.getElementById('avatar-upload'),
    
    // Chat UI
    chatHistory: document.getElementById('chat-history'),
    chatForm: document.getElementById('chat-form'),
    chatInput: document.getElementById('chat-input'),
    clearChatBtn: document.getElementById('clear-chat-btn'),
    
    // Sidebar & Settings UI
    sidebar: document.getElementById('sidebar'),
    mobileOpenBtn: document.getElementById('mobile-open-sidebar'),
    mobileCloseBtn: document.getElementById('mobile-close-sidebar'),
    themeBtns: document.querySelectorAll('.theme-btn'),
    settingsModal: document.getElementById('settings-modal'),
    openSettingsBtn: document.getElementById('open-settings-btn'),
    closeSettingsBtn: document.getElementById('close-settings-btn'),
    apiKeyInput: document.getElementById('api-key-input'),
    saveApiKeyBtn: document.getElementById('save-api-key-btn'),

    // Music UI
    bgAudio: document.getElementById('bg-audio'),
    musicPlayBtn: document.getElementById('music-play-btn'),
    volumeSlider: document.getElementById('volume-slider'),
    customMusicUpload: document.getElementById('custom-music-upload'),
    trackName: document.getElementById('track-name')
};

// ==========================================================================
// LOCAL AUTHENTICATION SYSTEM
// ==========================================================================
let authMode = 'login'; // 'login', 'register', 'forgot'
let currentUserEmail = null;

function getUsersDB() {
    return JSON.parse(localStorage.getItem('everlynx_users_db') || '{}');
}

function saveUsersDB(db) {
    localStorage.setItem('everlynx_users_db', JSON.stringify(db));
}

function setAuthMode(mode) {
    authMode = mode;
    DOM.authError.textContent = '';
    DOM.authSuccess.textContent = '';
    DOM.authEmail.value = '';
    DOM.authPassword.value = '';

    if (mode === 'login') {
        DOM.tabLogin.classList.add('active');
        DOM.tabRegister.classList.remove('active');
        DOM.authSubmitBtn.textContent = 'Log In';
        DOM.forgotPasswordLink.classList.remove('hidden');
        DOM.backToLoginLink.classList.add('hidden');
        DOM.authPassword.placeholder = "Password";
    } else if (mode === 'register') {
        DOM.tabLogin.classList.remove('active');
        DOM.tabRegister.classList.add('active');
        DOM.authSubmitBtn.textContent = 'Create Account';
        DOM.forgotPasswordLink.classList.add('hidden');
        DOM.backToLoginLink.classList.add('hidden');
        DOM.authPassword.placeholder = "Create Password";
    } else if (mode === 'forgot') {
        DOM.tabLogin.classList.remove('active');
        DOM.tabRegister.classList.remove('active');
        DOM.authSubmitBtn.textContent = 'Reset Password';
        DOM.forgotPasswordLink.classList.add('hidden');
        DOM.backToLoginLink.classList.remove('hidden');
        DOM.authPassword.placeholder = "Enter New Password";
    }
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const email = DOM.authEmail.value.trim().toLowerCase();
    const password = DOM.authPassword.value.trim();
    const db = getUsersDB();

    DOM.authError.textContent = '';
    DOM.authSuccess.textContent = '';

    if (authMode === 'register') {
        if (db[email]) {
            DOM.authError.textContent = "Email already registered. Please log in.";
        } else {
            db[email] = { password: password, avatar: 'assets/default-avatar.png' };
            saveUsersDB(db);
            loginUser(email);
        }
    } 
    else if (authMode === 'login') {
        if (!db[email]) {
            DOM.authError.textContent = "Account not found. Please register.";
        } else if (db[email].password !== password) {
            DOM.authError.textContent = "Incorrect password.";
        } else {
            loginUser(email);
        }
    } 
    else if (authMode === 'forgot') {
        if (!db[email]) {
            DOM.authError.textContent = "No account found with this email.";
        } else {
            db[email].password = password; // Overwrite password
            saveUsersDB(db);
            DOM.authSuccess.textContent = "Password reset successfully! You can now log in.";
            setTimeout(() => setAuthMode('login'), 2000);
        }
    }
}

function loginUser(email) {
    currentUserEmail = email;
    localStorage.setItem('everlynx_active_session', email);
    
    DOM.authScreen.classList.add('hidden');
    DOM.appScreen.classList.remove('hidden');
    
    const db = getUsersDB();
    const username = email.split('@')[0];
    DOM.userDisplayName.textContent = username;
    DOM.userAvatarDisplay.src = db[email].avatar || 'assets/default-avatar.png';
    
    loadProfileAndSettings();
    loadLocalChatHistory();
}

function logoutUser() {
    localStorage.removeItem('everlynx_active_session');
    currentUserEmail = null;
    DOM.appScreen.classList.add('hidden');
    DOM.authScreen.classList.remove('hidden');
    setAuthMode('login');
}

function checkActiveSession() {
    const activeSession = localStorage.getItem('everlynx_active_session');
    if (activeSession) {
        loginUser(activeSession);
    }
}

// ==========================================================================
// PROFILE, CHAT, & UI LOGIC
// ==========================================================================
function loadProfileAndSettings() {
    DOM.apiKeyInput.value = localStorage.getItem('everlynx_api_key') || '';
    const savedTheme = localStorage.getItem('everlynx_theme') || 'everlynx';
    setTheme(savedTheme);
}

function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file && currentUserEmail) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            DOM.userAvatarDisplay.src = dataUrl;
            
            // Save to Local DB
            const db = getUsersDB();
            db[currentUserEmail].avatar = dataUrl;
            saveUsersDB(db);
            
            updateChatAvatars(dataUrl);
        };
        reader.readAsDataURL(file);
    }
}

function updateChatAvatars(src) {
    document.querySelectorAll('.user-message .msg-avatar img').forEach(img => img.src = src);
}

// ==========================================================================
// FORMATTING & STREAMING ENGINE (100% VANILLA JS)
// ==========================================================================

// Custom Lightweight Markdown Parser
function formatAIResponse(text) {
    // 1. Escape HTML to prevent XSS attacks
    let formatted = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // 2. Format Code Blocks (```language ... ```)
    formatted = formatted.replace(/```(\w*)\s*\n([\s\S]*?)```/g, (match, lang, code) => {
        const header = lang ? `<div class="code-header">${lang}</div>` : '';
        // 'instant-reveal' class stops the typer from typing out huge code blocks character-by-character
        return `<div class="code-wrapper instant-reveal">${header}<pre><code>${code}</code></pre></div>`;
    });
    
    // 3. Format Inline Code (`code`)
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // 4. Format Bold Text (**text**)
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    return formatted;
}

// Recursive DOM Streamer (Simulates AI typing)
async function streamHTML(container, html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    async function typeNode(node, parent) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const textNode = document.createTextNode('');
            parent.appendChild(textNode);
            // Type character by character
            for (let i = 0; i < text.length; i++) {
                textNode.textContent += text[i];
                scrollToBottom(); // Auto-scroll as it types
                await new Promise(r => setTimeout(r, 1)); // 15ms typing speed
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList.contains('instant-reveal')) {
                // Instantly inject code blocks with a fade so layout doesn't break
                const clone = node.cloneNode(true);
                clone.classList.add('fade-in');
                parent.appendChild(clone);
                scrollToBottom();
                await new Promise(r => setTimeout(r, 100)); // Tiny pause after code
            } else {
                // Reconstruct normal HTML tags (like <strong>)
                const newEl = document.createElement(node.tagName);
                Array.from(node.attributes).forEach(attr => newEl.setAttribute(attr.name, attr.value));
                parent.appendChild(newEl);
                for (let child of node.childNodes) {
                    await typeNode(child, newEl);
                }
            }
        }
    }
    
    for (let child of temp.childNodes) {
        await typeNode(child, container);
    }
}

// ==========================================================================
// UPDATED RENDER MESSAGE & SUBMIT LOGIC
// ==========================================================================

function renderMessage(text, sender, isStreaming = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message slide-up`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const avatarContent = sender === 'user' 
        ? `<img src="${DOM.userAvatarDisplay.src}" alt="User">` 
        : `<img src="assets/avatar.png" alt="EverlynxAI">`;

    msgDiv.innerHTML = `
        <div class="msg-avatar">${avatarContent}</div>
        <div class="msg-bubble glass-panel">
            <div class="msg-content"></div>
            <span class="timestamp">${time}</span>
        </div>
    `;
    
    DOM.chatHistory.appendChild(msgDiv);
    scrollToBottom();

    const contentContainer = msgDiv.querySelector('.msg-content');

    if (isStreaming && sender === 'ai') {
        // Parse the markdown and trigger the typing effect
        const formattedHTML = formatAIResponse(text);
        streamHTML(contentContainer, formattedHTML);
    } else {
        // Instantly load (Used for user messages or loading past history)
        contentContainer.innerHTML = sender === 'ai' 
            ? formatAIResponse(text) 
            : text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

async function handleChatSubmit(e) {
    e.preventDefault();
    const text = DOM.chatInput.value.trim();
    if (!text) return;

    // 1. Render User Message Instantly
    DOM.chatInput.value = '';
    renderMessage(text, 'user', false);
    saveChatToLocal(text, 'user');

    // 2. Render Loading Indicator
    const typingId = renderTypingIndicator();

    // 3. Fetch from API
    const response = await AI.generateResponse(text);

    // 4. Remove Loading Indicator
    document.getElementById(typingId).remove();
    
    // 5. Render AI Response with Streaming Effect!
    renderMessage(response, 'ai', true);
    saveChatToLocal(response, 'ai');
}

function renderTypingIndicator() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = `message ai-message slide-up`;
    msgDiv.innerHTML = `
        <div class="msg-avatar"><img src="assets/avatar.png" alt="EverlynxAI"></div>
        <div class="msg-bubble glass-panel">
            <div class="typing-indicator">
                <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
            </div>
        </div>
    `;
    DOM.chatHistory.appendChild(msgDiv);
    scrollToBottom();
    return id;
}

function scrollToBottom() {
    DOM.chatHistory.scrollTop = DOM.chatHistory.scrollHeight;
}

// Scoped to current user email
function getChatHistoryKey() {
    return `everlynx_chat_${currentUserEmail}`;
}

function saveChatToLocal(text, sender) {
    let history = JSON.parse(localStorage.getItem(getChatHistoryKey()) || '[]');
    history.push({ text, sender, time: Date.now() });
    localStorage.setItem(getChatHistoryKey(), JSON.stringify(history));
}

function loadLocalChatHistory() {
    let history = JSON.parse(localStorage.getItem(getChatHistoryKey()) || '[]');
    DOM.chatHistory.innerHTML = ''; // clear UI
    
    if (history.length > 0) {
        history.forEach(msg => {
            renderMessage(msg.text, msg.sender);
            AI.updateMemory(msg.sender === 'user' ? msg.text : '', msg.sender === 'ai' ? msg.text : '');
        });
    } else {
        // Default greeting
        DOM.chatHistory.innerHTML = `
            <div class="message ai-message fade-in">
                <div class="msg-avatar"><img src="assets/avatar.png" alt="EverlynxAI"></div>
                <div class="msg-bubble glass-panel">
                    <p>Greetings. I am EverlynxAI, an advanced neural framework initialized by RyxerYT. How may I assist you today?</p>
                    <span class="timestamp">Just now</span>
                </div>
            </div>
        `;
    }
}

function clearChat() {
    if (confirm("Clear AI neural memory and chat history?")) {
        localStorage.removeItem(getChatHistoryKey());
        AI.memory = [];
        loadLocalChatHistory(); // Will reset to default greeting
    }
}

function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('everlynx_theme', themeName);
    DOM.themeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.setTheme === themeName));
}

function saveApiKey() {
    localStorage.setItem('everlynx_api_key', DOM.apiKeyInput.value.trim());
    DOM.saveApiKeyBtn.textContent = "Saved!";
    setTimeout(() => DOM.saveApiKeyBtn.textContent = "Save Key", 2000);
}

let isPlaying = false;
function toggleMusic() {
    if (isPlaying) {
        DOM.bgAudio.pause();
        DOM.musicPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        DOM.bgAudio.play().catch(e => console.log("Audio play prevented:", e));
        DOM.musicPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function handleCustomMusic(e) {
    const file = e.target.files[0];
    if (file) {
        DOM.bgAudio.src = URL.createObjectURL(file);
        DOM.trackName.textContent = file.name;
        if (!isPlaying) toggleMusic();
        else DOM.bgAudio.play();
    }
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
function init() {
    // Event Listeners - Auth
    DOM.tabLogin.addEventListener('click', () => setAuthMode('login'));
    DOM.tabRegister.addEventListener('click', () => setAuthMode('register'));
    DOM.forgotPasswordLink.addEventListener('click', () => setAuthMode('forgot'));
    DOM.backToLoginLink.addEventListener('click', () => setAuthMode('login'));
    DOM.authForm.addEventListener('submit', handleAuthSubmit);
    DOM.logoutBtn.addEventListener('click', logoutUser);

    // Event Listeners - Chat & Profile
    DOM.chatForm.addEventListener('submit', handleChatSubmit);
    DOM.clearChatBtn.addEventListener('click', clearChat);
    DOM.avatarUpload.addEventListener('change', handleAvatarUpload);

    // Event Listeners - UI & Settings
    DOM.mobileOpenBtn.addEventListener('click', () => DOM.sidebar.classList.add('open'));
    DOM.mobileCloseBtn.addEventListener('click', () => DOM.sidebar.classList.remove('open'));
    DOM.themeBtns.forEach(btn => btn.addEventListener('click', (e) => setTheme(e.target.dataset.setTheme)));
    DOM.openSettingsBtn.addEventListener('click', () => DOM.settingsModal.classList.remove('hidden'));
    DOM.closeSettingsBtn.addEventListener('click', () => DOM.settingsModal.classList.add('hidden'));
    DOM.saveApiKeyBtn.addEventListener('click', saveApiKey);

    // Event Listeners - Music
    DOM.musicPlayBtn.addEventListener('click', toggleMusic);
    DOM.volumeSlider.addEventListener('input', (e) => DOM.bgAudio.volume = e.target.value);
    DOM.customMusicUpload.addEventListener('change', handleCustomMusic);

    // Boot Sequence
    setAuthMode('login');
    checkActiveSession();
}

init();