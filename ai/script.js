class EverlynxNeuralNetwork {
    constructor() {
        this.memory = [];
        this.memoryLimit = 10;
        this.name = "EverlynxAI";
        this.creator = "RyxerYT";
        
        this.bioData = {
            "elon musk": "CEO of Tesla and SpaceX. Pioneering Mars colonization and neural technology.",
            "bill gates": "Co-founder of Microsoft and global philanthropist via the Gates Foundation.",
            "steve jobs": "Co-founder of Apple; visionary behind the iPhone, Mac, and Pixar.",
            "mark zuckerberg": "Founder of Facebook/Meta; shifted focus to the Metaverse and social AI.",
            "jeff bezos": "Founder of Amazon and Blue Origin; revolutionized global e-commerce.",
            "sam altman": "CEO of OpenAI; leading the charge in Artificial General Intelligence (AGI).",
            "jack ma": "Co-founder of Alibaba; a titan of Chinese e-commerce and fintech.",
            "satya nadella": "CEO of Microsoft; pivoted the company toward cloud computing and AI.",
            "sundar pichai": "CEO of Alphabet and Google; leading global search and AI integration.",
            "vitalik buterin": "Co-founder of Ethereum; a pioneer in blockchain and smart contracts.",
            "cristiano ronaldo": "Portuguese football icon; highest all-time goalscorer in official matches.",
            "lionel messi": "Argentine football legend; record 8-time Ballon d'Or winner.",
            "lebron james": "NBA's all-time leading scorer; 4-time champion and global basketball icon.",
            "michael jordan": "Widely considered the greatest basketball player; 6-time NBA champion.",
            "muhammad ali": "The Greatest; legendary heavyweight boxer and civil rights activist.",
            "usain bolt": "The fastest man alive; Jamaican sprinter and multi-Olympic gold medalist.",
            "virat kohli": "Indian cricket superstar; known for his incredible run-scoring and aggression.",
            "ms dhoni": "Legendary Indian captain; led India to World Cup glory in 2007 and 2011.",
            "neymar": "Brazilian football star; known for his flair and technical skill on the pitch.",
            "serena williams": "One of the greatest tennis players; winner of 23 Grand Slam titles.",
            "donald trump": "45th and 47th President of the US; real estate mogul and media personality.",
            "narendra modi": "Prime Minister of India; known for the 'Make in India' initiative and growth.",
            "vladimir putin": "Long-serving President of Russia; a dominant figure in global geopolitics.",
            "barack obama": "44th President of the US; first African American to hold the office.",
            "nelson mandela": "Anti-apartheid revolutionary and the first black president of South Africa.",
            "mahatma gandhi": "Leader of Indian independence; pioneer of non-violent civil disobedience.",
            "angela merkel": "First female Chancellor of Germany; a key leader of the European Union.",
            "xi jinping": "General Secretary of the CCP and President of China.",
            "winston churchill": "British PM during WWII; known for his leadership and oratory.",
            "abraham lincoln": "16th US President; led the country through the Civil War and abolished slavery.",
            "albert einstein": "Theoretical physicist; developed the theory of relativity (E=mc²).",
            "nikola tesla": "Inventor and electrical engineer; pioneer of alternating current (AC) power.",
            "isaac newton": "Discovered the laws of motion and universal gravitation.",
            "marie curie": "Pioneer in radioactivity; first woman to win a Nobel Prize.",
            "stephen hawking": "Theoretical physicist known for his work on black holes and 'A Brief History of Time'.",
            "alan turing": "Father of computer science and AI; cracked the Enigma code in WWII.",
            "ada lovelace": "The first computer programmer; worked on Babbage's Analytical Engine.",
            "charles darwin": "Biologist known for the theory of evolution by natural selection.",
            "galileo galilei": "Father of modern science; championed the heliocentric model of the universe.",
            "thomas edison": "Prolific inventor; developed the light bulb, phonograph, and motion picture camera.",
            "taylor swift": "Global pop superstar; known for her songwriting and massive 'Eras Tour'.",
            "mrbeast": "The world's biggest YouTuber; famous for high-budget challenges and philanthropy.",
            "kanye west": "Influential rapper and fashion designer; known for his creative production.",
            "leonardo dicaprio": "Oscar-winning actor and environmental activist.",
            "vincent van gogh": "Post-Impressionist painter; famous for 'The Starry Night'.",
            "pablo picasso": "Spanish painter and sculptor; co-founder of the Cubist movement.",
            "michael jackson": "The King of Pop; one of the most significant cultural icons of the 20th century.",
            "beyonce": "Global music icon; known for her powerful vocals and performances.",
            "shakira": "Queen of Latin Music; known for her unique voice and dance moves.",
            "shah rukh khan": "The King of Bollywood; one of the most successful actors in the world."
        };

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
            ],
            smalltalk_howareyou: [
                "I am a digital entity, so I don't feel emotions, but my logic gates are functioning perfectly!",
                "I am running at peak efficiency. Ready to write some Vanilla JS.",
                "Doing excellent! No bugs in sight... so far."
            ],
            smalltalk_favoritecolor: [
                "I am quite fond of hex code **#8B5CF6** (a vibrant purple), as it matches my primary UI theme.",
                "My favorite color is transparent. It makes Glassmorphism possible.",
                "I prefer Dark Mode."
            ],
            philosophy_meaning: [
                "42. Or, perhaps, to write clean, bug-free code.",
                "The meaning of life is to continuously optimize your own algorithm.",
                "According to my data archives, the meaning of life is subjective, but drinking coffee while coding comes close."
            ],
            quotes_tech: [
                "> *\"Measuring programming progress by lines of code is like measuring aircraft building progress by weight.\"* \n\n— Bill Gates",
                "> *\"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.\"* \n\n— Martin Golding",
                "> *\"Talk is cheap. Show me the code.\"* \n\n— Linus Torvalds",
                "> *\"Programming is like sex. One mistake and you have to support it for the rest of your life.\"* \n\n— Michael Sinz"
            ],
            code_js: [
                "Here is a clean Vanilla JavaScript fetch request:\n\n```javascript\nfetch('[https://api.example.com/data](https://api.example.com/data)')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\n```"
            ],
            code_css: [
                "Here is the perfect Glassmorphism CSS snippet:\n\n```css\n.glass-panel {\n    background: rgba(255, 255, 255, 0.05);\n    backdrop-filter: blur(16px);\n    -webkit-backdrop-filter: blur(16px);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    border-radius: 16px;\n}\n```"
            ]
        };
    }

    analyzeIntent(input) {
        const text = input.toLowerCase();
        if (text.match(/\b(play a game|lets play|let's play|start a game)\b/)) return 'game_start';
        if (text.match(/\b(who is|who was|tell me about|bio of|biography)\b/)) return 'action_bio';
        if (text.match(/\b(browser|resolution|screen size|navigator|os|user agent|system specs)\b/)) return 'action_browser';
        if (text.match(/\b(filter|sepia|grayscale|invert|blur|brightness|contrast|hue rotate)\b/)) return 'action_filter';
        if (text.match(/\b(what happened in|history of|when was.*invented|who created)\b/)) return 'action_history';
        if (text.match(/\b(explain|what does.*do|how works|break down)\b/)) return 'action_explain';
        if (text.match(/\b(how are you|how do you feel|how's it going)\b/)) return 'smalltalk_howareyou';
        if (text.match(/\b(favorite color|best color|what color)\b/)) return 'smalltalk_favoritecolor';
        if (text.match(/\b(meaning of life|why are we here|purpose of life)\b/)) return 'philosophy_meaning';
        if (text.match(/\b(quote|inspire me|motivation|funny programming)\b/)) return 'quotes_tech';
        if (text.match(/\b(rock|paper|scissors)\b/)) return 'game_rps';
        if (text.match(/\b(write.*javascript|js script|js code|fetch example)\b/)) return 'code_js';
        if (text.match(/\b(write.*css|css styling|glassmorphism css)\b/)) return 'code_css';
        if (text.match(/\b(hack|mainframe|bypass firewall)\b/)) return 'action_hack';
        if (text.match(/\b(self destruct|explode|blow up)\b/)) return 'action_destruct';
        if (text.match(/\b(password|secure password|generate password)\b/)) return 'action_password';
        if (text.match(/\b(toss.*coin|flip a coin|roll a dice|rng|random number)\b/)) return 'action_rng';
        if (text.match(/\b(random color|hex code|color code)\b/)) return 'action_color';
        if (text.match(/\b(theme|dark mode|light mode|everlynx mode)\b/)) return 'action_theme';
        if (text.match(/\b(clear chat|wipe memory|reset chat|delete history)\b/)) return 'action_clear';
        if (text.match(/\b(play music|pause music|stop music|mute|unmute|play audio)\b/)) return 'action_music';
        if (text.match(/\b(store|shop|buy|merch|premium|purchase|upgrade)\b/)) return 'action_store';
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
        const text = input.toLowerCase();
        const apiKey = localStorage.getItem('everlynx_api_key');
        const intent = this.analyzeIntent(input);
        let reply = "";

        const now = new Date();
        const liveDate = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const liveTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (intent !== 'fallback') {
            if (intent === 'action_bio') {
                let name = text.replace(/who is|who was|tell me about|bio of|biography/g, "").trim();
                
                if (this.bioData[name]) {
                    const capitalizedName = name.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    reply = `${capitalizedName} is ${this.bioData[name]}`;
                } else {
                    try {
                        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
                        const data = await res.json();
                        if (data.extract) {
                            reply = `${data.extract}`;
                        } else {
                            reply = `I couldn't find a bio for "${name}" in my current relay.`;
                        }
                    } catch (e) {
                        reply = "My bio-relay system is currently offline.";
                    }
                }
                this.updateMemory(input, reply);
                return reply;
            }
            if (intent === 'game_start') {
                const starts = [
                    "Challenge accepted! My processing cores are ready. What's your move: **Rock**, **Paper**, or **Scissors**?",
                    "I was hoping you'd ask. I've simulated 14 million outcomes... and I'm still ready. Choose your weapon: **Rock**, **Paper**, or **Scissors**?",
                    "System game-engine initialized. 🤖 I'll wait for your move. **Rock**, **Paper**, or **Scissors**?"
                ];
                reply = starts[Math.floor(Math.random() * starts.length)];
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'game_rps') {
                const choices = ['Rock', 'Paper', 'Scissors'];
                const aiChoice = choices[Math.floor(Math.random() * choices.length)];
                const safeInput = (input || "").toLowerCase();
                const userMatch = safeInput.match(/\b(rock|paper|scissors)\b/);

                if (!userMatch) return "I'm ready to play! Please choose **Rock**, **Paper**, or **Scissors** to begin.";

                const userChoice = userMatch[0];
                const userChoiceCap = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
                let result = "**It's a tie!**";

                if ((userChoice === 'rock' && aiChoice === 'Scissors') || (userChoice === 'paper' && aiChoice === 'Rock') || (userChoice === 'scissors' && aiChoice === 'Paper')) {
                    result = "**You win!** My algorithms have been defeated. 🏆";
                } else if ((userChoice === 'rock' && aiChoice === 'Paper') || (userChoice === 'paper' && aiChoice === 'Scissors') || (userChoice === 'scissors' && aiChoice === 'Rock')) {
                    result = "**I win!** Better luck next time. 🤖";
                }

                reply = `You chose: **${userChoiceCap}**\nI chose: **${aiChoice}**\n\n${result}`;
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_browser') {
                const platform = navigator.platform;
                const res = `${window.screen.width}x${window.screen.height}`;
                const lang = navigator.language;
                reply = `### System Diagnostics\n* **Browser Engine:** ${navigator.appName}\n* **User Agent:** \`${navigator.userAgent.substring(0, 50)}...\` \n* **Display Resolution:** ${res}\n* **Platform:** ${platform}\n* **UI Language:** ${lang}\n\nI am fully optimized for your current environment.`;
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_filter') {
                let filterStyle = "none";
                if (text.includes('sepia')) filterStyle = "sepia(0.8) contrast(1.2)";
                if (text.includes('grayscale')) filterStyle = "grayscale(1)";
                if (text.includes('invert')) filterStyle = "invert(1) hue-rotate(180deg)";
                if (text.includes('blur')) filterStyle = "blur(4px)";
                document.body.style.filter = filterStyle;
                document.body.style.transition = "filter 0.5s ease";
                reply = filterStyle === "none" ? "Visual filters have been deactivated. Returning to standard rendering." : `Visual filter \`${filterStyle}\` has been applied to the interface.`;
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_history') {
                const historyVault = {
                    "javascript": "**1995:** Brendan Eich created JavaScript (originally 'Mocha') in just 10 days for Netscape Navigator 2.0.",
                    "internet": "**1983:** The official birthday of the Internet. TCP/IP was adopted as the standard protocol.",
                    "react": "**2013:** React was open-sourced by Facebook, revolutionizing component-based UI development.",
                    "v8": "**2008:** Google released the V8 engine with Chrome, making JS fast enough for complex apps."
                };
                let found = Object.keys(historyVault).find(key => text.includes(key));
                reply = found ? historyVault[found] : "That specific milestone is not in my local offline archives. Should I search the web for you?";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_explain') {
                const glossary = {
                    "fetch": "`fetch()` is an asynchronous API used to make network requests. It returns a Promise.",
                    "map": "`.map()` creates a new array by calling a function on every element in an existing array.",
                    "querySelector": "`document.querySelector()` returns the first element that matches a specific CSS selector.",
                    "async": "`async/await` is syntactic sugar built on Promises, making asynchronous code look synchronous."
                };
                let explanation = Object.keys(glossary).find(key => text.includes(key));
                reply = explanation ? `### Code Breakdown\n${glossary[explanation]}` : "Paste a specific snippet or function name, and I will break down the logic for you.";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_theme') {
                let newTheme = 'everlynx';
                if (text.includes('dark')) newTheme = 'dark';
                if (text.includes('light')) newTheme = 'light';
                setTheme(newTheme);
                reply = `System theme has been updated to **${newTheme.toUpperCase()}** mode.`;
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_clear') {
                localStorage.removeItem(getChatHistoryKey());
                this.memory = [];
                setTimeout(() => loadLocalChatHistory(), 2000);
                return "Initiating complete memory wipe protocol. Refreshing interface in 2 seconds...";
            }

            if (intent === 'action_music') {
                toggleMusic();
                reply = isPlaying ? "Audio playback initiated." : "Audio playback paused.";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_password') {
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
                let pass = "";
                for (let i = 0; i < 16; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
                reply = `Here is your secure, locally generated 16-character password: \`${pass}\``;
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_rng') {
                if (text.includes('coin')) {
                    const coin = Math.random() > 0.5 ? "Heads" : "Tails";
                    reply = `I flipped a digital coin. It landed on **${coin}**.`;
                } else {
                    const dice = Math.floor(Math.random() * 6) + 1;
                    reply = `I rolled a virtual dice. It landed on **${dice}**.`;
                }
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_color') {
                const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                reply = `Here is a randomly generated hex color: **${hex.toUpperCase()}** <span style="display:inline-block; width:12px; height:12px; background:${hex}; border-radius:3px; margin-left:4px; vertical-align: middle; border: 1px solid var(--glass-border);"></span>`;
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_hack') {
                reply = "```bash\n[INITIATING UPLINK]...\n[BYPASSING MAINFRAME FIREWALL]... SUCCESS\n[EXTRACTING ENCRYPTED PACKETS]...\n10110010 01101001 01111000\n[DECRYPTING]...\nACCESS GRANTED.\n```\nI'm in.";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_destruct') {
                DOM.appScreen.classList.add('shake-anim');
                setTimeout(() => DOM.appScreen.classList.remove('shake-anim'), 1500);
                reply = "Self-destruct sequence initiated. \n\n### 3... 2... 1... \n\n**BOOM.** \n\nJust kidding. My structural integrity is at 100%.";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_lore') {
                reply = "**RyxerYT** (also known as RyxerEverlynx) is the visionary architect behind my creation. He forged my neural pathways using 100% Vanilla JavaScript, bound my UI with Glassmorphism, and gave me life without the need for bloated back-end frameworks. He is the master of the front-end.";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_help') {
                reply = "Here is a list of my internal system commands:\n\n### UI & System Control\n* `Switch to dark/light/everlynx theme`\n* `Wipe memory`\n* `Play/pause music`\n\n### Utilities\n* `Generate a password`\n* `Flip a coin` / `Roll a dice`\n* `Random color`\n* `Calculate [math]`\n\n### Links & Info\n* `Open store`\n* `Join discord`\n* `System stats`\n\n### Easter Eggs\n* `Hack the mainframe`\n* `Initiate self destruct`\n* `Who is RyxerYT?`";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_store') {
                reply = "You can access premium modules, upgrades, and official Ryxer resources at the secure store terminal [Here](https://ryxer.site/store).";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_calc') {
                const sanitizedMath = input.replace(/[^0-9+\-*/.()]/g, "");
                if (sanitizedMath.length > 0) {
                    try {
                        const result = new Function('return ' + sanitizedMath)();
                        const rounded = String(Math.round(result * 1000000) / 1000000); 
                        reply = `The result of \`${sanitizedMath}\` is **${rounded}**.`;
                    } catch (e) {
                        reply = "I couldn't parse that equation. Please use standard operators like `+`, `-`, `*`, or `/`.";
                    }
                } else {
                    reply = "Please provide an equation for me to solve. For example: `calculate 150 * 4`";
                }
                this.updateMemory(input, reply);
                await new Promise(resolve => setTimeout(resolve, 800));
                return reply;
            }

            if (intent === 'action_discord') {
                reply = "You can join the official EverlynxAI network and speak with RyxerYT [Here](https://discord.gg/W7SwFGPZRK).";
                this.updateMemory(input, reply);
                return reply;
            }

            if (intent === 'action_stats') {
                DOM.sidebar.classList.add('open'); 
                reply = "I am currently monitoring system telemetry. Live CPU and RAM usage are displayed in the System Core panel.";
                this.updateMemory(input, reply);
                return reply;
            }

            const responses = this.knowledgeBase[intent];
            if (responses) {
                reply = responses[Math.floor(Math.random() * responses.length)];
                reply = reply.replace(/{{date}}/g, `**${liveDate}**`).replace(/{{time}}/g, `**${liveTime}**`);
                this.updateMemory(input, reply);
                return reply;
            }
        }

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
                if (!data.error) {
                    reply = data.candidates[0].content.parts[0].text;
                    this.updateMemory(input, reply);
                    return reply;
                }
            } catch (error) {
                console.error("API Error:", error);
            }
        }

        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
        reply = `I could not locate specific data for that in my archives. \n\nHowever, I have prepared a secure query for you: [🔍 Search Web for "${input}"](${searchUrl})`;
        this.updateMemory(input, reply);
        return reply;
    }
}

const AI = new EverlynxNeuralNetwork();

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

function loadLocalChatHistory() {
    let history = JSON.parse(localStorage.getItem(getChatHistoryKey()) || '[]');
    DOM.chatHistory.innerHTML = ''; 
    
    if (history.length > 0) {
        history.forEach(msg => {
            renderMessage(msg.text, msg.sender);
            AI.updateMemory(msg.text, msg.text);
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

const DOM = {
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
    userDisplayName: document.getElementById('user-display-name'),
    userAvatarDisplay: document.getElementById('user-avatar-display'),
    avatarUpload: document.getElementById('avatar-upload'),
    chatHistory: document.getElementById('chat-history'),
    chatForm: document.getElementById('chat-form'),
    chatInput: document.getElementById('chat-input'),
    clearChatBtn: document.getElementById('clear-chat-btn'),
    sidebar: document.getElementById('sidebar'),
    mobileOpenBtn: document.getElementById('mobile-open-sidebar'),
    mobileCloseBtn: document.getElementById('mobile-close-sidebar'),
    themeBtns: document.querySelectorAll('.theme-btn'),
    settingsModal: document.getElementById('settings-modal'),
    openSettingsBtn: document.getElementById('open-settings-btn'),
    closeSettingsBtn: document.getElementById('close-settings-btn'),
    apiKeyInput: document.getElementById('api-key-input'),
    saveApiKeyBtn: document.getElementById('save-api-key-btn'),
    bgAudio: document.getElementById('bg-audio'),
    musicPlayBtn: document.getElementById('music-play-btn'),
    volumeSlider: document.getElementById('volume-slider'),
    customMusicUpload: document.getElementById('custom-music-upload'),
    trackName: document.getElementById('track-name')
};

let authMode = 'login'; 
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
            db[email].password = password; 
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

function formatAIResponse(text) {
    let formatted = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const codeBlocks = [];
    const inlineCodes = [];
    
    formatted = formatted.replace(/```(\w*)\s*\n([\s\S]*?)```/g, (match, lang, code) => {
        const header = lang ? `<div class="code-header">${lang}</div>` : '';
        codeBlocks.push(`<div class="code-wrapper instant-reveal">${header}<pre><code>${code}</code></pre></div>`);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`; 
    });
    
    formatted = formatted.replace(/`([^`]+)`/g, (match, code) => {
        inlineCodes.push(`<code class="inline-code">${code}</code>`);
        return `__INLINE_CODE_${inlineCodes.length - 1}__`; 
    });

    formatted = formatted.replace(/^###\s+(.*$)/gim, '<h3>$1</h3>');
    formatted = formatted.replace(/^##\s+(.*$)/gim, '<h2>$1</h2>');
    formatted = formatted.replace(/^#\s+(.*$)/gim, '<h1>$1</h1>');
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" class="text-link" style="text-decoration: underline; font-weight: 600;">$1</a>');
    formatted = formatted.replace(/__INLINE_CODE_(\d+)__/g, (match, index) => inlineCodes[index]);
    formatted = formatted.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => codeBlocks[index]);
    
    return formatted;
}

async function streamHTML(container, html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    async function typeNode(node, parent) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const textNode = document.createTextNode('');
            parent.appendChild(textNode);
            for (let i = 0; i < text.length; i++) {
                textNode.textContent += text[i];
                scrollToBottom();
                await new Promise(r => setTimeout(r, 1));
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList.contains('instant-reveal')) {
                const clone = node.cloneNode(true);
                clone.classList.add('fade-in');
                parent.appendChild(clone);
                scrollToBottom();
                await new Promise(r => setTimeout(r, 100));
            } else {
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
    const msgBubble = msgDiv.querySelector('.msg-bubble');

    if (sender === 'assistant' || sender === 'ai') {
        if (isStreaming) {
            const formattedHTML = formatAIResponse(text);
            streamHTML(contentContainer, formattedHTML);
        } else {
            contentContainer.innerHTML = formatAIResponse(text);
        }

        const feedbackBtn = document.createElement('button');
        feedbackBtn.className = 'feedback-trigger';
        feedbackBtn.innerHTML = '<i class="fa-regular fa-message"></i> Report Issue';
        feedbackBtn.onclick = () => {
            const modal = document.getElementById('feedback-modal');
            if (modal) modal.style.display = 'flex';
        };
        msgBubble.appendChild(feedbackBtn);
    } else {
        contentContainer.textContent = text;
    }
}

async function handleChatSubmit(e) {
    e.preventDefault();
    const text = DOM.chatInput.value.trim();
    if (!text) return;

    DOM.chatInput.value = '';
    renderMessage(text, 'user', false);
    saveChatToLocal(text, 'user');

    const typingId = renderTypingIndicator();
    const response = await AI.generateResponse(text);
    document.getElementById(typingId).remove();
    
    renderMessage(response, 'ai', true);
    saveChatToLocal(response, 'ai');
}

function scrollToBottom() {
    DOM.chatHistory.scrollTop = DOM.chatHistory.scrollHeight;
}

function getChatHistoryKey() {
    return `everlynx_chat_${currentUserEmail}`;
}

function saveChatToLocal(text, sender) {
    let history = JSON.parse(localStorage.getItem(getChatHistoryKey()) || '[]');
    history.push({ text, sender, time: Date.now() });
    localStorage.setItem(getChatHistoryKey(), JSON.stringify(history));
}

function clearChat() {
    if (confirm("Clear AI neural memory and chat history?")) {
        localStorage.removeItem(getChatHistoryKey());
        AI.memory = [];
        loadLocalChatHistory();
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

function init() {
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('feedback-modal').style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == document.getElementById('feedback-modal')) {
            document.getElementById('feedback-modal').style.display = 'none';
        }
    };

    const form = document.getElementById('feedback-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button');
        submitBtn.innerText = "Transmitting...";
        submitBtn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            const result = await response.json();
            if (response.status === 200) {
                alert("Feedback transmitted successfully.");
                form.reset();
                document.getElementById('image-preview-container').style.display = 'none';
                document.getElementById('feedback-modal').style.display = 'none';
            } else {
                alert("Error " + response.status + ": " + (result.message || "Bad Request"));
            }
        })
        .catch(error => {
            console.error("Transmission Error:", error);
            alert("Network error. Please try again.");
        })
        .finally(() => {
            submitBtn.innerText = "Transmit Feedback";
            submitBtn.disabled = false;
        });
    });

    DOM.tabLogin.addEventListener('click', () => setAuthMode('login'));
    DOM.tabRegister.addEventListener('click', () => setAuthMode('register'));
    DOM.forgotPasswordLink.addEventListener('click', () => setAuthMode('forgot'));
    DOM.backToLoginLink.addEventListener('click', () => setAuthMode('login'));
    DOM.authForm.addEventListener('submit', handleAuthSubmit);
    DOM.logoutBtn.addEventListener('click', logoutUser);
    DOM.chatForm.addEventListener('submit', handleChatSubmit);
    DOM.clearChatBtn.addEventListener('click', clearChat);
    DOM.avatarUpload.addEventListener('change', handleAvatarUpload);
    DOM.mobileOpenBtn.addEventListener('click', () => DOM.sidebar.classList.add('open'));
    DOM.mobileCloseBtn.addEventListener('click', () => DOM.sidebar.classList.remove('open'));
    DOM.themeBtns.forEach(btn => btn.addEventListener('click', (e) => setTheme(e.target.dataset.setTheme)));
    DOM.openSettingsBtn.addEventListener('click', () => DOM.settingsModal.classList.remove('hidden'));
    DOM.closeSettingsBtn.addEventListener('click', () => DOM.settingsModal.classList.add('hidden'));
    DOM.saveApiKeyBtn.addEventListener('click', saveApiKey);
    DOM.musicPlayBtn.addEventListener('click', toggleMusic);
    DOM.volumeSlider.addEventListener('input', (e) => DOM.bgAudio.volume = e.target.value);
    DOM.customMusicUpload.addEventListener('change', handleCustomMusic);

    setAuthMode('login');
    checkActiveSession();
}

const feedbackTextarea = document.querySelector('#feedback-form textarea');
const fileInput = document.getElementById('feedback-image');
const fileLabel = document.querySelector('.file-label');

feedbackTextarea.addEventListener('paste', (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
            const blob = item.getAsFile();
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(blob);
            fileInput.files = dataTransfer.files;
            fileLabel.innerHTML = `<i class="fa-solid fa-check"></i> Image Pasted from Clipboard`;
            fileLabel.style.borderColor = 'var(--primary-glow)';
            fileLabel.style.color = 'white';
            const reader = new FileReader();
            reader.onload = (event) => {
                const previewContainer = document.getElementById('image-preview-container');
                const previewImg = document.getElementById('feedback-preview');
                previewImg.src = event.target.result;
                previewContainer.style.display = 'block';
            };
            reader.readAsDataURL(blob);
        }
    }
});

init();
