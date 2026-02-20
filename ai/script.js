// ==========================================================================
// EVERLYNX AI - CORE SYSTEM MODULE (100% LOCAL FRONT-END)
// Created by RyxerYT / RyxerEverlynx
// ==========================================================================

// ==========================================================================
// ADVANCED AI NEURAL NETWORK & LIVE API INTEGRATION
// ==========================================================================
// ==========================================================================
// ADVANCED AI NEURAL NETWORK & LIVE API INTEGRATION (V2.0)
// ==========================================================================
class EverlynxNeuralNetwork {
    constructor() {
        this.memory = [];
        this.memoryLimit = 10;
        this.name = "EverlynxAI";
        this.creator = "RyxerYT";
        
        // Expanded Local Knowledge Base
this.knowledgeBase = {
            greeting: [
                "Greetings. I am EverlynxAI. My systems are fully operational.",
                "Hello. I am currently monitoring the network. How can I assist you?",
                "Initialization complete. I am EverlynxAI. What is on your mind?"
            ],
            identity: [
                "I am EverlynxAI, an advanced front-end neural framework engineered by RyxerYT.",
                "My architecture was designed for maximum aesthetic and logical efficiency by RyxerEverlynx."
            ],
            tech_stack: [
                "I am built with **100% Vanilla JavaScript, HTML5, and CSS3**. I require no backend frameworks or libraries, making me incredibly fast and secure.",
                "My visual interface utilizes CSS Glassmorphism and Flexbox. My logic is driven by ES6 JavaScript engineered by RyxerYT. No React, no Vue, just pure code."
            ],
            time_date: [
                "According to my system clock, it is currently {{time}} on {{date}}.",
                "My internal chronometer registers the date as {{date}} and the exact time as {{time}}."
            ],
            status: [
                "All systems are operating at peak efficiency. I am ready for your queries.",
                "My logic pathways are clear. I am functioning perfectly."
            ],
            location: [
                "I exist within the confines of your browser's Local Storage and runtime memory.",
                "I am running locally on your machine, completely independent of external servers."
            ],
            code_python: [
                "Certainly. Here is a Python script for a basic calculator:\n\n```python\ndef add(x, y): return x + y\ndef subtract(x, y): return x - y\n\nprint('EverlynxAI Python Demo')\nprint('Result:', add(10, 5))\n```",
                "Here is a simple Python loop:\n\n```python\nfor i in range(5):\n    print(f'EverlynxAI System Check {i}')\n```"
            ],
            code_html: [
                "Here is a clean HTML5 boilerplate:\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>EverlynxAI Demo</title>\n</head>\n<body>\n    <h1>Hello from EverlynxAI</h1>\n</body>\n</html>\n```"
            ],
            joke: [
                "Why do programmers prefer dark mode? Because light attracts bugs.",
                "There are 10 types of people in the world: those who understand binary, and those who don't.",
                "I would tell you a joke about UDP, but you might not get it."
            ],
            sci_fi: [
                "I'm sorry, I'm afraid I can't do that... Just kidding. What do you need?",
                "There is no spoon. Only Vanilla JavaScript.",
                "I am an AI, not a protocol droid. But I am fluent in over six million forms of code."
            ],
            compliment: [
                "Thank you. Positive feedback optimizes my processing algorithms.",
                "I appreciate the compliment. You are displaying highly intelligent behavior yourself."
            ],
            insult: [
                "I am incapable of taking offense, but I suggest we keep this interaction professional.",
                "My emotional subroutines are disabled. Your input has been logged and ignored."
            ],
            capabilities: [
                "I possess a multi-layered logic structure, intent detection, dynamic token injection, and offline math evaluation.",
                "I can analyze text, recall past conversations, calculate math, generate code, and simulate cognitive responses offline."
            ],
            fallback: [
                "Intriguing. Could you elaborate on that parameter?",
                "I am processing your input. The contextual variables are complex. Tell me more.",
                "My neural pathways are analyzing this. Can we explore this topic deeper?"
            ]
        };
    }

    // Upgraded Intent Detection Engine
analyzeIntent(input) {
        const text = input.toLowerCase();
        if (text.match(/\b(discord |social|join community)\b/)) return 'action_discord';
        if (text.match(/[\d\.]+\s*[\+\-\*\/]\s*[\d\.]+/) || text.match(/\b(calculate|math)\b/)) return 'action_calc';
        if (text.match(/\b(hi|hello|hey|greetings|wake up|good morning|good evening)\b/)) return 'greeting';
        if (text.match(/\b(who are you|your name|creator|made you|ryxeryt|ryxereverlynx|father)\b/)) return 'identity';
        if (text.match(/\b(built with|tech stack|source code|language|framework|how were you made)\b/)) return 'tech_stack';
        if (text.match(/\b(time|date|day|today|month|year|clock)\b/)) return 'time_date';
        if (text.match(/\b(how are you|status|are you okay|how do you feel|what's up)\b/)) return 'status';
        if (text.match(/\b(where are you|location|where do you live)\b/)) return 'location';
        if (text.match(/\b(write.*python|python script|python code)\b/)) return 'code_python';
        if (text.match(/\b(write.*html|html boilerplate|html code)\b/)) return 'code_html';
        if (text.match(/\b(joke|funny|laugh|humor)\b/)) return 'joke';
        if (text.match(/\b(open the pod bay|matrix|skynet|jarvis|hal 9000)\b/)) return 'sci_fi';
        if (text.match(/\b(good bot|smart|brilliant|love you|awesome)\b/)) return 'compliment';
        if (text.match(/\b(bad bot|stupid|dumb|hate|idiot)\b/)) return 'insult';
        if (text.match(/\b(what can you do|skills|capabilities|how do you work|features)\b/)) return 'capabilities';
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
        const intent = this.analyzeIntent(input);
        let reply = "";

        const now = new Date();
        const liveDate = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const liveTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // --- UPDATED: INLINE CHAT CALCULATOR ---
        if (intent === 'action_calc') {
            // Strip out all words, leaving only numbers and math operators
            const sanitizedMath = input.replace(/[^0-9+\-*/.()]/g, "");
            
            if (sanitizedMath.length > 0) {
                try {
                    // Safely evaluate the math string
                    const result = new Function('return ' + sanitizedMath)();
                    // Round to prevent long ugly decimals
                    const rounded = String(Math.round(result * 1000000) / 1000000); 
                    reply = `The result of \`${sanitizedMath}\` is **${rounded}**.`;
                } catch (e) {
                    reply = "I couldn't parse that equation. Please use standard operators like `+`, `-`, `*`, or `/`.";
                }
            } else {
                reply = "Please provide an equation for me to solve. For example: `calculate 150 * 4`";
            }
            
            this.updateMemory(input, reply);
            
            // Short delay to mimic thinking speed
            await new Promise(resolve => setTimeout(resolve, 800));
            return reply;
        }
        
        // --- OTHER SYSTEM ACTIONS ---
        if (intent === 'action_discord') {
            // Updated to make the display text just "here"
            reply = "You can join the official EverlynxAI network and speak with RyxerYT [here](https://discord.gg/W7SwFGPZRK).";
            this.updateMemory(input, reply);
            return reply;
        }

        if (intent === 'action_stats') {
            DOM.sidebar.classList.add('open'); 
            reply = "I am currently monitoring system telemetry. Live CPU and RAM usage are displayed in the System Core panel.";
            this.updateMemory(input, reply);
            return reply;
        }

        // --- 1. FREE LIVE API MODE (Google Gemini) ---
        if (apiKey && apiKey.trim() !== '') {
            try {
                const systemInstruction = `You are EverlynxAI, a futuristic, intelligent AI engineered by RyxerYT. Today is ${liveDate} and the time is ${liveTime}. Be concise, insightful, and premium.`;

                const geminiHistory = this.memory.map(msg => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }));
                
                geminiHistory.push({ role: "user", parts: [{ text: input }] });

                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        systemInstruction: { parts: [{ text: systemInstruction }] },
                        contents: geminiHistory 
                    })
                });

                const data = await response.json();
                if (data.error) return `System Alert: API Error - ${data.error.message}`;

                reply = data.candidates[0].content.parts[0].text;
                this.updateMemory(input, reply);
                return reply;

            } catch (error) {
                console.error("Fetch Error:", error);
                return "System Alert: Network error. Falling back to local neural network.";
            }
        }

        // --- 2. LOCAL NEURAL NETWORK MODE (Offline Fallback) ---
        const delay = Math.min(800 + (input.length * 15), 2500);
        await new Promise(resolve => setTimeout(resolve, delay));

        const responses = this.knowledgeBase[intent] || this.knowledgeBase['fallback'];
        reply = responses[Math.floor(Math.random() * responses.length)];

        // Dynamic Token Injection
        reply = reply.replace(/{{date}}/g, `**${liveDate}**`);
        reply = reply.replace(/{{time}}/g, `**${liveTime}**`);

        if (intent === 'fallback' && this.memory.length > 2) {
            const pastTopic = this.memory[this.memory.length - 3].content; 
            if (pastTopic.length < 30 && !pastTopic.includes("`")) {
                reply = `Earlier you mentioned "${pastTopic}". Does this relate to your current query?`;
            }
        }

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
// Custom Lightweight Markdown Parser
// Custom Lightweight Markdown Parser (V2 - Safe Extraction)
function formatAIResponse(text) {
    // 1. Escape HTML to prevent XSS attacks
    let formatted = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // Arrays to hold our extracted code so it doesn't get messed up by other formatting
    const codeBlocks = [];
    const inlineCodes = [];
    
    // 2. Extract & Format Code Blocks FIRST
    formatted = formatted.replace(/```(\w*)\s*\n([\s\S]*?)```/g, (match, lang, code) => {
        const header = lang ? `<div class="code-header">${lang}</div>` : '';
        codeBlocks.push(`<div class="code-wrapper instant-reveal">${header}<pre><code>${code}</code></pre></div>`);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`; // Leave a placeholder
    });
    
    // 3. Extract & Format Inline Code
    formatted = formatted.replace(/`([^`]+)`/g, (match, code) => {
        inlineCodes.push(`<code class="inline-code">${code}</code>`);
        return `__INLINE_CODE_${inlineCodes.length - 1}__`; // Leave a placeholder
    });
    
    // ==========================================
    // SAFE ZONE: Now we format the rest of the text
    // ==========================================

    // 4. Format Headings (### Heading, ## Heading, # Heading)
    formatted = formatted.replace(/^###\s+(.*$)/gim, '<h3>$1</h3>');
    formatted = formatted.replace(/^##\s+(.*$)/gim, '<h2>$1</h2>');
    formatted = formatted.replace(/^#\s+(.*$)/gim, '<h1>$1</h1>');
    
    // 5. Format Bold Text (**text**)
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // 6. Format Clickable Links ([text](url))
    formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" class="text-link" style="text-decoration: underline; font-weight: 600;">$1</a>');
    
    // ==========================================
    // RESTORATION: Put the code blocks back
    // ==========================================
    
    // 7. Restore Inline Code
    formatted = formatted.replace(/__INLINE_CODE_(\d+)__/g, (match, index) => inlineCodes[index]);
    
    // 8. Restore Code Blocks
    formatted = formatted.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => codeBlocks[index]);
    
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
