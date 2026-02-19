const DEFAULT_API_KEY = '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';

const STORAGE_KEYS = {
    users: 'everlynx_users',
    session: 'everlynx_session',
    apiKey: 'everlynx_api_key',
    theme: 'everlynx_theme',
    chatHistory: 'everlynx_chat_history',
    currentChat: 'everlynx_current_chat'
};

const EVERLYNX_SYSTEM_PROMPT = `You are EverLynx AI, an intelligent, calm, and futuristic AI assistant. You help users with:
- Writing assistance: emails, essays, creative writing, editing
- Code generation: any programming language, clean and documented
- General Q&A: explanations, research, advice

Be concise, helpful, and professional. Use clear formatting when appropriate.`;

async function hashPassword(password, email) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + email.toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.users);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

async function signUp(email, password) {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    if (users[key]) return { success: false, error: 'Email already registered' };
    const hash = await hashPassword(password, email);
    users[key] = { email: key, passwordHash: hash };
    saveUsers(users);
    return { success: true };
}

async function login(email, password) {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    const user = users[key];
    if (!user) return { success: false, error: 'Invalid email or password' };
    const hash = await hashPassword(password, email);
    if (hash !== user.passwordHash) return { success: false, error: 'Invalid email or password' };
    return { success: true, user: { email: user.email } };
}

async function resetPassword(email, newPassword) {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    if (!users[key]) return { success: false, error: 'No account found for that email.' };
    const hash = await hashPassword(newPassword, email);
    users[key].passwordHash = hash;
    saveUsers(users);
    return { success: true };
}

function createSession(user) {
    const session = { email: user.email, createdAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
}

function getSession() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.session);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

function clearSession() {
    localStorage.removeItem(STORAGE_KEYS.session);
}

function getApiKey() {
    return DEFAULT_API_KEY;
}

async function callAiApi(messages) {
    const apiKey = getApiKey();
    if (!apiKey) throw new Error('Missing OpenRouter API key.');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    if (typeof location !== 'undefined' && location.origin && location.origin.startsWith('http')) {
        headers['HTTP-Referer'] = location.origin;
    }
    headers['X-Title'] = 'EverLynx AI';

    let response;
    try {
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages,
                stream: false
            })
        });
    } catch (e) {
        const hint = !navigator.onLine
            ? 'You appear to be offline.'
            : (location?.protocol === 'file:' ? 'If you opened index.html via file://, some browsers block cross-origin requests. Use GitHub Pages (https://) or a local static server.' : 'Your network or browser blocked the request (CORS/adblock/firewall).');
        throw new Error(`Failed to fetch. ${hint}`);
    }

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response generated.';
}

function streamText(element, text, speed = 20, options = { markdownLive: false }) {
    return new Promise(resolve => {
        let i = 0;
        let lastRender = 0;
        element.textContent = '';
        const interval = setInterval(() => {
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
                return;
            }
            i++;
            const now = Date.now();
            const shouldRender = now - lastRender > 40 || i === text.length;
            if (!shouldRender) return;
            lastRender = now;
            const partial = text.slice(0, i);
            if (options.markdownLive) {
                element.innerHTML = formatMessageContent(partial);
            } else {
                element.textContent = partial;
            }
        }, speed);
    });
}

function getAvatarHtml(role) {
    if (role === 'assistant') {
        return '<img src="avatar.png" alt="EverLynx AI" class="avatar-img">';
    }
    
    const session = getSession();
    if (session) {
        const users = getUsers();
        const user = users[session.email.toLowerCase().trim()];
        
        if (user && user.pfp) {
            return `<img src="${user.pfp}" alt="You" class="avatar-img">`;
        }
    }
    
    return '<img src="default-avatar.png" alt="You" class="avatar-img default-pfp">';
}

function getChatHistoryKey() {
    const session = getSession();
    return session ? `${STORAGE_KEYS.chatHistory}_${session.email}` : STORAGE_KEYS.chatHistory;
}

function getChatHistoryList() {
    try {
        const data = localStorage.getItem(getChatHistoryKey());
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveChatToHistory(chatId, title, messages) {
    const list = getChatHistoryList();
    const existing = list.find(c => c.id === chatId);
    const entry = { id: chatId, title: title || 'New Chat', messages, updatedAt: Date.now() };
    if (existing) {
        const idx = list.findIndex(c => c.id === chatId);
        list[idx] = entry;
    } else {
        list.unshift(entry);
    }
    const trimmed = list.slice(0, 50);
    localStorage.setItem(getChatHistoryKey(), JSON.stringify(trimmed));
}

function getCurrentChatId() {
    const session = getSession();
    const key = session ? `${STORAGE_KEYS.currentChat}_${session.email}` : STORAGE_KEYS.currentChat;
    return localStorage.getItem(key) || null;
}

function setCurrentChatId(id) {
    const session = getSession();
    const key = session ? `${STORAGE_KEYS.currentChat}_${session.email}` : STORAGE_KEYS.currentChat;
    if (id) localStorage.setItem(key, id);
    else localStorage.removeItem(key);
}

function generateId() {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
}

let currentChatId = null;
let currentMessages = [];
let isGenerating = false;

function showAuth() {
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
}

function showApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    renderChatHistory();
    loadTheme();
    updateLayoutVars();
    updateAllAvatars()
}

function renderChatHistory() {
    const list = getChatHistoryList();
    const ul = document.getElementById('chat-history-list');
    ul.innerHTML = '';
    list.forEach(chat => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'nav-btn chat-history-item';
        btn.textContent = chat.title;
        btn.addEventListener('click', () => loadChat(chat.id));
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

function loadChat(chatId) {
    const list = getChatHistoryList();
    const chat = list.find(c => c.id === chatId);
    if (!chat) return;
    currentChatId = chatId;
    setCurrentChatId(chatId);
    currentMessages = chat.messages || [];
    renderMessages();
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('chat-messages').classList.remove('hidden');
    document.getElementById('btn-toggle-sidebar').click(); // Close sidebar on mobile
}

function newChat() {
    currentChatId = generateId();
    setCurrentChatId(currentChatId);
    currentMessages = [];
    document.getElementById('chat-messages').innerHTML = '';
    document.getElementById('welcome-screen').classList.remove('hidden');
    document.getElementById('chat-messages').classList.add('hidden');
    renderChatHistory();
    document.getElementById('btn-toggle-sidebar').click();
}

function renderMessages() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    container.classList.remove('hidden');
    document.getElementById('welcome-screen').classList.add('hidden');

    currentMessages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message ${msg.role}`;
        const mdClass = msg.role === 'assistant' ? ' markdown' : '';
        div.innerHTML = `
            <div class="message-header">
                <span class="message-avatar">${getAvatarHtml(msg.role)}</span>
                <span class="message-role">${msg.role === 'user' ? 'You' : 'EverLynx AI'}</span>
            </div>
            <div class="message-content${mdClass}">${msg.role === 'assistant' ? formatMessageContent(msg.content) : escapeHtml(msg.content)}</div>
        `;
        container.appendChild(div);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function markdownToHtml(text) {
    const codeBlocks = [];
    let html = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
        const token = `PLACEHOLDERCODE${codeBlocks.length}`; 
        codeBlocks.push(`<pre class="code-block"><code>${escapeHtml(code.trim())}</code></pre>`);
        return token;
    });

    html = escapeHtml(html);

    html = html.replace(/^#### (.+)$/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gim, '<h1>$1</h1>');
    html = html.replace(/^[-*+] (.+)$/gim, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.+)$/gim, '<li>$2</li>');
    html = html.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => '<ul>' + m + '</ul>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_\n]+?)_/g, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    const lines = html.split('\n');
    const out = [];
    let buf = [];
    
    const flush = () => {
        if (buf.length) {
            out.push('<p>' + buf.join('<br>') + '</p>');
            buf = [];
        }
    };

    const isBlock = (s) => /^<(h[1-4]|ul|ol|li|pre)/i.test(s.trim()) || s.includes('PLACEHOLDERCODE') || s.trim() === '';

    for (const line of lines) {
        if (isBlock(line)) {
            flush();
            out.push(line);
        } else {
            buf.push(line);
        }
    }
    flush();

    let finalHtml = out.join('\n');

    codeBlocks.forEach((block, i) => {
        const token = `PLACEHOLDERCODE${i}`;
        const re = new RegExp(token, 'g');
        finalHtml = finalHtml.replace(re, block);
    });

    return finalHtml;
}

function formatMessageContent(text) {
    return markdownToHtml(text);
}

function appendMessage(role, content, options = {}) {
    const container = document.getElementById('chat-messages');
    container.classList.remove('hidden');
    document.getElementById('welcome-screen').classList.add('hidden');

    const div = document.createElement('div');
    div.className = `message ${role}${options.streaming ? ' streaming' : ''}`;
    const mdClass = role === 'assistant' ? ' markdown' : '';
    const displayContent = options.streaming ? '' : (role === 'assistant' ? formatMessageContent(content) : escapeHtml(content));
    div.innerHTML = `
        <div class="message-header">
            <span class="message-avatar">${getAvatarHtml(role)}</span>
            <span class="message-role">${role === 'user' ? 'You' : 'EverLynx AI'}</span>
        </div>
        <div class="message-content${mdClass}">${displayContent}</div>
    `;
    container.appendChild(div);
    const contentEl = div.querySelector('.message-content');
    return { contentEl, div };
}

function getTitleFromMessages(messages) {
    const userMsg = messages.find(m => m.role === 'user');
    const text = userMsg?.content || 'New Chat';
    return text.length > 40 ? text.slice(0, 40) + '...' : text;
}

function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEYS.theme) || 'everlynx';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `theme-${theme}`);
    });
    const menuLabel = document.getElementById('theme-menu-label');
    if (menuLabel) menuLabel.textContent = theme === 'everlynx' ? 'Everlynx' : 'Dark';
    document.querySelectorAll('.theme-menu-item').forEach(item => {
        item.classList.toggle('active', item.dataset.theme === theme);
    });
}

function loadTheme() {
    setTheme(getStoredTheme());
}

function updateOfflineBanner() {
    const banner = document.getElementById('offline-banner');
    banner.classList.toggle('hidden', navigator.onLine);
}
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = '';
    const result = await login(email, password);
    if (result.success) {
        createSession(result.user);
        document.getElementById('user-email-display').textContent = result.user.email;
        showApp();
    } else {
        errorEl.textContent = result.error;
    }
}

async function handleSignUp(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const errorEl = document.getElementById('signup-error');
    errorEl.textContent = '';
    const result = await signUp(email, password);
    if (result.success) {
        const loginResult = await login(email, password);
        createSession(loginResult.user);
        document.getElementById('user-email-display').textContent = loginResult.user.email;
        showApp();
    } else {
        errorEl.textContent = result.error;
    }
}

async function handleSendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || isGenerating) return;

    input.value = '';
    input.style.height = 'auto';

    if (!currentChatId) {
        currentChatId = generateId();
        setCurrentChatId(currentChatId);
    }

    const userMsg = { role: 'user', content: text };
    currentMessages.push(userMsg);
    appendMessage('user', text);

    const sendBtn = document.getElementById('btn-send');
    sendBtn.disabled = true;
    isGenerating = true;

    const { contentEl } = appendMessage('assistant', '', { streaming: true });
    contentEl.parentElement.classList.add('streaming');

    try {
        const apiMessages = [
            { role: 'system', content: EVERLYNX_SYSTEM_PROMPT },
            ...currentMessages.map(m => ({ role: m.role, content: m.content }))
        ];
        const response = await callAiApi(apiMessages);
        contentEl.parentElement.classList.remove('streaming');
        await streamText(contentEl, response, 12, { markdownLive: true });
        contentEl.innerHTML = formatMessageContent(response);
        currentMessages.push({ role: 'assistant', content: response });
    } catch (err) {
        contentEl.parentElement.classList.remove('streaming');
        contentEl.textContent = `Error: ${err.message}`;
        contentEl.style.color = 'var(--error)';
    }

    const title = getTitleFromMessages(currentMessages);
    saveChatToHistory(currentChatId, title, currentMessages);
    renderChatHistory();

    sendBtn.disabled = false;
    isGenerating = false;
}

function handleQuickAction(prompt) {
    document.getElementById('chat-input').value = prompt;
    document.getElementById('chat-input').focus();
}

function init() {
    
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignUp);
    document.getElementById('show-signup').addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('signup-form').classList.remove('hidden');
    });
    document.getElementById('show-login').addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('signup-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });
    const forgotModal = document.getElementById('forgot-modal');
    const closeForgot = () => forgotModal.classList.add('hidden');
    document.getElementById('show-forgot').addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('forgot-error').textContent = '';
        document.getElementById('forgot-email').value = document.getElementById('login-email').value || '';
        document.getElementById('forgot-new-password').value = '';
        forgotModal.classList.remove('hidden');
    });
    document.getElementById('btn-close-forgot').addEventListener('click', closeForgot);
    forgotModal.addEventListener('click', e => {
        if (e.target.id === 'forgot-modal') closeForgot();
    });
    document.getElementById('forgot-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        const pw = document.getElementById('forgot-new-password').value;
        const errEl = document.getElementById('forgot-error');
        errEl.textContent = '';
        const res = await resetPassword(email, pw);
        if (!res.success) {
            errEl.textContent = res.error;
            return;
        }
        closeForgot();
        document.getElementById('login-email').value = email;
        document.getElementById('login-password').value = '';
        document.getElementById('login-error').textContent = 'Password updated. Please sign in.';
    });

    document.getElementById('btn-new-chat').addEventListener('click', newChat);
    document.getElementById('btn-logout').addEventListener('click', () => {
        clearSession();
        showAuth();
    });
    const menu = document.getElementById('theme-menu');
    const menuBtn = document.getElementById('theme-menu-btn');
    const menuList = document.getElementById('theme-menu-list');
    const closeThemeMenu = () => {
        menuList.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    };
    const openThemeMenu = () => {
        menuList.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
    };
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !menuList.classList.contains('hidden');
        if (isOpen) closeThemeMenu(); else openThemeMenu();
    });
    menuList.querySelectorAll('.theme-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            setTheme(item.dataset.theme);
            closeThemeMenu();
        });
    });
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) closeThemeMenu();
    });

    document.getElementById('theme-dark').addEventListener('click', () => setTheme('dark'));
    document.getElementById('theme-everlynx').addEventListener('click', () => setTheme('everlynx'));

    document.getElementById('btn-toggle-sidebar').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('settings-modal').classList.remove('hidden');
    });
    function closeSettings() {
        document.getElementById('settings-modal').classList.add('hidden');
    }
    document.getElementById('btn-close-settings').addEventListener('click', closeSettings);
    document.getElementById('settings-modal').addEventListener('click', e => {
        if (e.target.id === 'settings-modal') closeSettings();
    });

    const chatInput = document.getElementById('chat-input');
    chatInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        updateLayoutVars();
    });
    document.getElementById('btn-send').addEventListener('click', handleSendMessage);

    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => handleQuickAction(btn.dataset.prompt));
    });

    document.getElementById('btn-profile').addEventListener('click', () => {
        document.getElementById('settings-modal').classList.remove('hidden');
    });

    window.addEventListener('online', updateOfflineBanner);
    window.addEventListener('offline', updateOfflineBanner);
    updateOfflineBanner();

    window.addEventListener('resize', updateLayoutVars);
    updateLayoutVars();
    const session = getSession();
    if (session) {
        document.getElementById('user-email-display').textContent = session.email;
        showApp();
        const lastChatId = getCurrentChatId();
        if (lastChatId) loadChat(lastChatId);
    } else {
        showAuth();
    }
    document.getElementById('pfp-upload-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5000000) {
        alert("Image is too large. Please choose an image under 5MB.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        const base64Image = event.target.result;
        
        document.getElementById('settings-pfp-preview').src = base64Image;
        
        const session = getSession();
        if (session) {
            const users = getUsers();
            const email = session.email.toLowerCase().trim();
            if (users[email]) {
                users[email].pfp = base64Image; 
                saveUsers(users);
                renderMessages();
            }
        }
    };
    reader.readAsDataURL(file);
    const removeBtn = document.getElementById('btn-remove-pfp');
    if (removeBtn) {
        // Remove any old listeners first to prevent double-firing
        removeBtn.replaceWith(removeBtn.cloneNode(true));
        
        // Re-attach the fresh listener
        document.getElementById('btn-remove-pfp').addEventListener('click', (e) => {
            e.preventDefault();
            handleRemovePfp();
        });
    }
});
initMusicPlayer()
loadUserMusic()
}

init();

function updateLayoutVars() {
    const header = document.querySelector('.main-header');
    const inputArea = document.querySelector('.input-area');
    if (header) document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    if (inputArea) document.documentElement.style.setProperty('--input-h', `${inputArea.offsetHeight}px`);
}
function updateAllAvatars() {
    const session = getSession();
    if (!session) return;

    const avatarHtml = getAvatarHtml('user');
    
    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    if (sidebarAvatar) {
        sidebarAvatar.innerHTML = avatarHtml;
    }

    const users = getUsers();
    const user = users[session.email.toLowerCase().trim()];
    const settingsPreview = document.getElementById('settings-pfp-preview');
    
    if (settingsPreview) {
        settingsPreview.src = (user && user.pfp) ? user.pfp : 'default-avatar.png';
    }
}

let pendingMusicData = null;

function initMusicPlayer() {
    const audio = document.getElementById('settings-audio');
    const playBtn = document.getElementById('btn-settings-play');
    const volumeSlider = document.getElementById('music-volume');
    const uploadInput = document.getElementById('music-upload-input');
    const nameModal = document.getElementById('music-name-modal');
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    audio.volume = 0.5;
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸ Pause';
        } else {
            audio.pause();
            playBtn.textContent = '▶ Play';
        }
    });

    document.getElementById('btn-upload-music').addEventListener('click', () => uploadInput.click());

    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large! Max size is 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            pendingMusicData = event.target.result;
            nameModal.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('btn-save-music').addEventListener('click', () => {
        const trackName = document.getElementById('music-name-input').value || "Custom Track";
        const session = JSON.parse(localStorage.getItem('everlynx_session'));

        if (session && pendingMusicData) {
            const users = JSON.parse(localStorage.getItem('everlynx_users'));
            const email = session.email.toLowerCase().trim();

            if (users[email]) {
                users[email].customMusic = {
                    name: trackName,
                    data: pendingMusicData
                };
                localStorage.setItem('everlynx_users', JSON.stringify(users));
                
                loadUserMusic();
                nameModal.classList.add('hidden');
            }
        }
    });
}

function loadUserMusic() {
    const session = JSON.parse(localStorage.getItem('everlynx_session'));
    const audio = document.getElementById('settings-audio');
    const source = document.getElementById('audio-source');
    const label = document.getElementById('settings-now-playing');

    if (session) {
        const users = JSON.parse(localStorage.getItem('everlynx_users'));
        const user = users[session.email.toLowerCase().trim()];

        if (user && user.customMusic) {
            source.src = user.customMusic.data;
            label.textContent = `Playing: ${user.customMusic.name}`;
            audio.load();
            return;
        }
    }
    label.textContent = "Default Theme";
}
function handleMusicSave() {
    const nameInput = document.getElementById('music-name-input');
    const trackName = nameInput.value.trim() || "Custom Track";
    const session = getSession();

    if (!session || !pendingMusicData) {
        alert("Please upload a file first.");
        return;
    }

    const email = session.email.toLowerCase().trim();
    const users = getUsers();

    users[email].customMusic = {
        name: trackName,
        data: pendingMusicData 
    };
    
    saveUsers(users);

    const audio = document.getElementById('settings-audio');
    const source = document.getElementById('audio-source');
    const label = document.getElementById('settings-now-playing');
    const playBtn = document.getElementById('btn-settings-play');

    source.src = pendingMusicData;
    label.textContent = `Playing: ${trackName}`;
    
    audio.load();
    audio.play().then(() => {
        playBtn.textContent = '⏸ Pause';
    }).catch(err => console.error("Playback failed:", err));

    document.getElementById('music-name-modal').classList.add('hidden');
    nameInput.value = "";
}

document.getElementById('btn-save-music').onclick = handleMusicSave;

function enableAutoplay() {
    const audio = document.getElementById('settings-audio');
    const playBtn = document.getElementById('btn-settings-play');

    const startMusic = () => {
        audio.play().then(() => {
            if (playBtn) playBtn.textContent = '⏸ Pause';
            document.removeEventListener('click', startMusic);
            document.removeEventListener('keydown', startMusic);
        }).catch(err => {
            console.log("Autoplay still waiting for interaction...");
        });
    };

    startMusic();
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
}
function showApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    
    loadTheme();
    renderChatHistory();
    updateAllAvatars(); 
    loadUserMusic();
    enableAutoplay();  
}

// Ensure this is at the top level so it can be called from anywhere
function handleRemovePfp() {
    const sessionData = localStorage.getItem('everlynx_session');
    if (!sessionData) return;

    const session = JSON.parse(sessionData);
    const email = session.email.toLowerCase().trim();
    
    const usersData = localStorage.getItem('everlynx_users');
    if (!usersData) return;

    const users = JSON.parse(usersData);

    if (users[email]) {
        // Remove the pfp data point from the user object
        delete users[email].pfp;
        
        // Save back to localStorage
        localStorage.setItem('everlynx_users', JSON.stringify(users));

        // Immediate UI Update
        const settingsPreview = document.getElementById('settings-pfp-preview');
        if (settingsPreview) {
            settingsPreview.src = 'default-avatar.png'; // Revert to your default avatar
        }
        
        // Update the sidebar and any active chat bubbles
        updateAllAvatars(); 
        if (typeof renderMessages === 'function') renderMessages();
        
        console.log("PFP removed successfully for:", email);
    }
}