// Assignment: Vibe Coding App. We called it VibeFoxes. Why? Because mainly... We likes foxes :-)
// JULES FRANCOIS
// MARTZ CEDRIC
// 2025

const PUTER_AVAILABLE = true;  // must be false when running on ancientbrain website, true for local testing with an index.html

(function() {
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.async = true;
    document.head.appendChild(tailwindScript);

    tailwindScript.onload = () => {
        if (window.tailwind && window.tailwind.config)
            window.tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            'editor-bg': '#1a1410',
                            'editor-panel': '#2a1f1a',
                            'editor-toolbar': '#3a2820',
                            'editor-input': '#4a3528',
                            'editor-border': '#5a4030',
                            'editor-text': '#f5e6d3',
                            'editor-accent': '#ff6b35',
                            'fox-orange': '#ff6b35',
                            'fox-orange-dark': '#d95d39',
                            'fox-orange-hover': '#ff8555',
                            'fox-cream': '#f5e6d3',
                            'fox-brown': '#6b4423',
                            'fox-dark': '#1a1410',
                            'editor-message-user': '#4a3528',
                        }
                    }
                }
            };
    };
})();

(function() {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jqueryScript.integrity = 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=';
    jqueryScript.crossOrigin = 'anonymous';
    document.head.appendChild(jqueryScript);
})();

// We use Puter.js to test locally the AI, because we don't have API Keys
(function() {
    const puterScript = document.createElement('script');
    puterScript.src = 'https://js.puter.com/v2/';
    puterScript.async = true;
    document.head.appendChild(puterScript);
})();

document.write(`
<style>
    @keyframes bounce-fox {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
    @keyframes slide-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px #ff6b35; }
        50% { box-shadow: 0 0 20px #ff6b35, 0 0 30px #ff6b35; }
    }
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .animate-slide-in {
        animation: slide-in 0.3s ease-out;
    }
    .btn-glow:hover {
        animation: glow 1.5s ease-in-out infinite;
    }
    .fade-out-screen {
        animation: fade-out 0.5s ease-out forwards;
    }

    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        background: #1a1410;
    }
    ::-webkit-scrollbar-thumb {
        background: #ff6b35;
        border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #ff8555;
    }

    #welcome-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1410 0%, #2a1f1a 50%, #3a2820 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fade-in 0.5s ease-in;
    }

    #loading-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 20, 16, 0.9);
        z-index: 9998;
        display: none;
        align-items: center;
        justify-content: center;
    }

    #fox-game-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: #f5e6d3;
        border: 4px solid #ff6b35;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 0 50px rgba(255, 107, 53, 0.5);
        display: none;
    }
</style>

<div id="welcome-screen">
    <div class="bg-editor-panel p-10 rounded-2xl border-2 border-fox-orange shadow-2xl max-w-2xl w-full mx-4 animate-slide-in">
        <div class="text-center mb-8">
            <div class="mb-4 flex justify-center">
                <img src="https://ancientbrain.com/uploads/cedric588/favicon.ico" alt="Fox" style="width: 96px; height: 96px; image-rendering: pixelated;">
            </div>
            <h1 class="text-5xl font-bold text-fox-orange mb-2">VibeFoxes</h1>
            <p class="text-fox-cream text-lg">We thought about giving the site a Halloween theme and preferred foxes to pumpkins for the orange colour</p>
        </div>

        <div class="space-y-6 mb-8">
            <div>
                <label class="block text-fox-cream font-semibold mb-2 text-sm">Choose AI Model:</label>
                <select id="welcome-model-selector"
                        class="w-full px-4 py-3 bg-editor-input border-2 border-editor-border text-editor-text rounded-lg focus:outline-none focus:border-fox-orange transition-colors">
                    <option value="o3-mini" selected>GPT-o3-mini</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="puter">Puter.ai</option>
                </select>
            </div>

            <div id="welcome-api-section">
                <label class="block text-fox-cream font-semibold mb-2 text-sm">OpenAI API Key:</label>
                <input type="password" id="welcome-api-input"
                       placeholder="sk-..."
                       class="w-full px-4 py-3 bg-editor-input border-2 border-editor-border text-editor-text rounded-lg focus:outline-none focus:border-fox-orange transition-colors">
                <a href="https://platform.openai.com/api-keys" target="_blank"
                   class="text-fox-orange text-sm hover:text-fox-orange-hover mt-1 inline-block">
                    Need an API key? Click here :-)
                </a>
            </div>
        </div>

        <div class="flex gap-4">
            <button id="welcome-start-btn"
                    class="flex-1 px-6 py-4 bg-fox-orange text-white font-bold rounded-lg hover:bg-fox-orange-hover transition-all btn-glow text-lg">
                Let's go
            </button>
            <button id="welcome-later-btn"
                    class="flex-1 px-6 py-4 bg-editor-toolbar text-fox-cream font-semibold rounded-lg hover:bg-editor-input transition-colors border-2 border-editor-border text-lg">
                I'll do it later
            </button>
        </div>
    </div>
</div>

<div id="loading-modal">
    <div class="bg-editor-panel p-12 rounded-2xl border-2 border-fox-orange text-center">
        <div class="mb-4 flex justify-center">
            <img src="https://ancientbrain.com/uploads/cedric588/favicon.ico" alt="Fox" style="width: 128px; height: 128px; image-rendering: pixelated;">
        </div>
        <h2 class="text-3xl font-bold text-fox-orange mb-2">Generating Code...</h2>
        <button id="play-game-btn"
                class="px-6 py-3 bg-fox-orange text-white font-bold rounded-lg hover:bg-fox-orange-hover transition-all btn-glow">
            Click to play while you wait!
        </button>
    </div>
</div>

<div id="fox-game-container">
    <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold text-fox-brown flex items-center gap-2">
            <img src="https://ancientbrain.com/uploads/cedric588/favicon.ico" alt="Fox" style="width: 32px; height: 32px; image-rendering: pixelated;">
            Fox Run!
        </h3>
        <button id="close-game-btn"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Close
        </button>
    </div>
    <canvas id="game-canvas" width="800" height="200" class="border-2 border-fox-brown rounded-lg mb-4"></canvas>
    <div class="text-center">
        <p class="text-fox-brown font-semibold mb-2">Score: <span id="game-score">0</span></p>
        <p class="text-sm text-fox-brown">Press SPACE to jump!</p>
    </div>
</div>

<div id="app-container" class="flex flex-col h-screen bg-editor-bg text-editor-text font-sans overflow-hidden">
    <div id="header" class="bg-editor-toolbar px-5 py-4 border-b border-editor-border">
        <h1 class="text-2xl mb-2.5 text-fox-orange font-semibold flex items-center gap-2">
            <img src="https://ancientbrain.com/uploads/cedric588/favicon.ico" alt="Fox" style="width: 32px; height: 32px; image-rendering: pixelated;">
            VibeFoxes - A Vibe Coding Experience
        </h1>
        <div id="api-key-section" class="flex gap-2.5 items-center flex-wrap">
            <input type="password" id="api-key-input" placeholder="Enter your OpenAI API Key..."
                   class="flex-1 max-w-md px-3 py-2 bg-editor-input border border-editor-border text-editor-text rounded focus:outline-none focus:ring-2 focus:ring-fox-orange">
            <button id="set-api-key-btn" disabled
                    class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                Set API Key
            </button>
            <span id="api-status" class="text-sm"></span>
            <div class="flex gap-2 items-center ml-4">
                <label for="model-selector" class="text-editor-text text-sm font-semibold">Model:</label>
                <select id="model-selector"
                        class="px-3 py-2 bg-editor-input border border-editor-border text-editor-text rounded cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-fox-orange">
                    <option value="o3-mini" selected>GPT-o3-mini</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="puter">Puter.ai (testing)</option>
                </select>
            </div>
            <button id="reset-chat-btn"
                    class="px-4 py-2 bg-red-600 text-white rounded cursor-pointer text-sm hover:bg-red-700 transition-colors">
                Reset Chat
            </button>
            <button id="autorun-toggle-btn"
                    class="px-4 py-2 bg-green-600 text-white rounded cursor-pointer text-sm hover:bg-green-700 transition-colors">
                Auto-run: ON
            </button>
            <button id="discussion-mode-btn"
                    class="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer text-sm hover:bg-blue-700 transition-colors">
                Discussion: OFF
            </button>
        </div>
    </div>
    <div id="main-content" class="flex flex-1 overflow-hidden">
        <div id="left-panel" class="w-2/5 bg-editor-panel border-r border-editor-border flex flex-col">
            <div id="conversation-history" class="flex-1 overflow-y-auto p-5"></div>
            <div id="prompt-input-section" class="p-4 bg-editor-toolbar border-t border-editor-border">
                <textarea id="prompt-input" placeholder="Describe what you want to create in English...

Examples:
- Create a cyberpunk cityscape
- Make a game where a fox is trying to eat me
- Draw a rotating 3D cube that spins faster each time I click it
- Display INTEL x86_64 assembly code that follows my mouse cursor to haunt me"
                          class="w-full min-h-[180px] p-2.5 bg-editor-input border border-editor-border text-editor-text rounded resize-y text-sm focus:outline-none focus:ring-2 focus:ring-fox-orange"></textarea>
                <div id="prompt-buttons" class="flex gap-2.5 mt-2.5 items-center flex-wrap">
                    <button id="send-btn" disabled
                            class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Generate Code
                    </button>
                    <button id="clear-btn"
                            class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover transition-colors">
                        Clear History
                    </button>
                </div>
                <div class="mt-2.5 flex flex-wrap gap-2">
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-editor-border text-editor-text rounded cursor-pointer text-xs hover:bg-editor-toolbar transition-colors"
                            data-prompt="Create an animated rainbow gradient background">Rainbow Background</button>
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-editor-border text-editor-text rounded cursor-pointer text-xs hover:bg-editor-toolbar transition-colors"
                            data-prompt="Make an interactive drawing canvas">Drawing Canvas</button>
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-editor-border text-editor-text rounded cursor-pointer text-xs hover:bg-editor-toolbar transition-colors"
                            data-prompt="Create a digital clock showing current time">Digital Clock</button>
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-editor-border text-editor-text rounded cursor-pointer text-xs hover:bg-editor-toolbar transition-colors"
                            data-prompt="Generate an image of a futuristic city">Futuristic City</button>
                </div>
            </div>
        </div>
        <div id="right-panel" class="w-3/5 bg-editor-bg flex flex-col">
            <div id="code-editor-section" class="flex-1 flex flex-col overflow-hidden" style="display: none;">
                <div id="code-toolbar" class="px-4 py-2.5 bg-editor-toolbar border-b border-editor-border flex gap-2.5 items-center">
                    <strong class="text-editor-text">Generated Code:</strong>
                    <button id="run-code-btn" disabled
                            class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Run Code
                    </button>
                    <button id="copy-code-btn" disabled
                            class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Copy
                    </button>
                    <button id="undo-btn" disabled
                            class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Undo
                    </button>
                    <button id="redo-btn" disabled
                            class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Redo
                    </button>
                </div>
                <div id="code-display" class="flex-1 overflow-auto p-4 bg-editor-bg">
                    <pre id="code-content" class="m-0 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-editor-text">Your code will be here ^^</pre>
                </div>
            </div>
            <div id="output-section" class="h-full border-t border-editor-border flex flex-col transition-all duration-300">
                <div id="output-toolbar" class="px-4 py-2.5 bg-editor-toolbar border-b border-editor-border flex gap-2.5 items-center">
                    <strong class="text-editor-text">Output:</strong>
                    <button id="toggle-code-btn"
                            class="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer text-sm hover:bg-purple-700 transition-colors">
                        Show Code
                    </button>
                    <button id="clear-output-btn"
                            class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover transition-colors">
                        Clear Output
                    </button>
                    <div id="drawing-tools" class="mt-2.5 hidden gap-2.5 items-center">
                        <label class="text-editor-text text-sm">Pen Color: <input type="color" id="pen-color" value="#000000" class="ml-1"></label>
                        <label class="text-editor-text text-sm">Pen Size: <input type="range" id="pen-size" min="1" max="20" value="3" class="ml-1"></label>
                        <button id="save-drawing-btn"
                                class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover transition-colors">
                            Save Drawing
                        </button>
                        <button id="send-to-ai-btn"
                                class="px-4 py-2 bg-fox-orange text-white rounded cursor-pointer text-sm hover:bg-fox-orange-hover transition-colors">
                            Send to AI
                        </button>
                    </div>
                </div>
                <div id="output-display" class="flex-1 overflow-auto p-4 bg-white text-black"></div>
            </div>
        </div>
    </div>
</div>
`);

let apiKey = "";
let selectedModel = "o3-mini";
let conversationHistory = [];
let currentCode = "";
let codeHistory = [];
let historyIndex = -1;
let isDrawing = false;
let canvas = null;
let ctx = null;
let lastImageData = null;
let puterReady = false;
let autoRunEnabled = true;
let discussionMode = false;

const initPuter = () => {
    if (typeof puter !== 'undefined') {
        puterReady = true;
        console.log('Puter.js loaded and ready (FOR TESTS ONLY, PUTER IS NOT SUPPORTED ON ANCIENTBRAIN WEBSITE).');
        updateSendButtonState();
        return true;
    }
    return false;
};

if (!initPuter()) {
    let attempts = 0;
    const checkPuter = setInterval(() => {
        attempts++;
        if (initPuter() || attempts > 50) {
            clearInterval(checkPuter);
            if (puterReady) {
                const modelSelect = document.getElementById('model-selector');
                const statusEl = document.getElementById('api-status');
                if (modelSelect && modelSelect.value === 'puter')
                    updateSendButtonState();
            }
        }
    }, 50);
}

const apiKeyInput = document.getElementById('api-key-input');
const setApiKeyBtn = document.getElementById('set-api-key-btn');
const apiStatus = document.getElementById('api-status');
const conversationDiv = document.getElementById('conversation-history');
const promptInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');
const modelSelector = document.getElementById('model-selector');
const resetChatBtn = document.getElementById('reset-chat-btn');
const autorunToggleBtn = document.getElementById('autorun-toggle-btn');
const discussionModeBtn = document.getElementById('discussion-mode-btn');
const codeContent = document.getElementById('code-content');
const runCodeBtn = document.getElementById('run-code-btn');
const copyCodeBtn = document.getElementById('copy-code-btn');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const toggleCodeBtn = document.getElementById('toggle-code-btn');
const codeEditorSection = document.getElementById('code-editor-section');
const outputSection = document.getElementById('output-section');
const outputDisplay = document.getElementById('output-display');
const clearOutputBtn = document.getElementById('clear-output-btn');
const drawingTools = document.getElementById('drawing-tools');
const penColor = document.getElementById('pen-color');
const penSize = document.getElementById('pen-size');
const saveDrawingBtn = document.getElementById('save-drawing-btn');
const sendToAiBtn = document.getElementById('send-to-ai-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const welcomeModelSelector = document.getElementById('welcome-model-selector');
const welcomeApiInput = document.getElementById('welcome-api-input');
const welcomeStartBtn = document.getElementById('welcome-start-btn');
const welcomeLaterBtn = document.getElementById('welcome-later-btn');
const loadingModal = document.getElementById('loading-modal');
const playGameBtn = document.getElementById('play-game-btn');
const foxGameContainer = document.getElementById('fox-game-container');
const gameCanvas = document.getElementById('game-canvas');
const gameScore = document.getElementById('game-score');
const closeGameBtn = document.getElementById('close-game-btn');
let gameCtx = null;
let gameRunning = false;
let gameScore_ = 0;
let foxY = 150;
let foxVelocity = 0;
let obstacles = [];
let gameAnimationId = null;
let foxImage = null;
foxImage = new Image();
foxImage.src = 'https://ancientbrain.com/uploads/cedric588/favicon.ico'; // Pixel art inspired by this picture https://fity.club/lists/2025/easy-pixel-art/

function initializeApp() {
    const savedModel = localStorage.getItem('vibefoxes-model');
    const savedApiKey = localStorage.getItem('vibefoxes-apikey');

    if (savedModel) {
        selectedModel = savedModel;
        modelSelector.value = savedModel;
        welcomeModelSelector.value = savedModel;
    }
    if (savedApiKey) {
        apiKey = savedApiKey;
        apiKeyInput.value = savedApiKey;
        welcomeApiInput.value = savedApiKey;
    }
    updateSendButtonState();
}

function updateSendButtonState() {
    const usePuter = selectedModel === 'puter';

    if (usePuter) {
        sendBtn.disabled = !puterReady;
        if (puterReady) {
            apiStatus.textContent = 'Puter.ai Ready';
            apiStatus.style.color = '#ff6b35';
        } else {
            apiStatus.textContent = 'Puter.ai Loading...';
            apiStatus.style.color = '#f5e6d3';
        }
    } else {
        sendBtn.disabled = !apiKey;
        if (apiKey) {
            apiStatus.textContent = '✓ API Key Set';
            apiStatus.style.color = '#ff6b35';
        } else {
            apiStatus.textContent = '';
        }
    }
}

welcomeStartBtn.addEventListener('click', () => {
    const selectedModelValue = welcomeModelSelector.value;
    const apiKeyValue = welcomeApiInput.value.trim();

    localStorage.setItem('vibefoxes-model', selectedModelValue);
    if (apiKeyValue)
        localStorage.setItem('vibefoxes-apikey', apiKeyValue);
    selectedModel = selectedModelValue;
    modelSelector.value = selectedModelValue;
    if (apiKeyValue)
        apiKey = apiKeyValue;
    closeWelcomeScreen();
});

welcomeLaterBtn.addEventListener('click', () => {
    closeWelcomeScreen();
});

function closeWelcomeScreen() {
    welcomeScreen.classList.add('fade-out-screen');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        updateSendButtonState();
    }, 500);
}

function showLoadingModal() {
    loadingModal.style.display = 'flex';
}

function hideLoadingModal() {
    loadingModal.style.display = 'none';
    stopDinoGame();
}

playGameBtn.addEventListener('click', () => {
    loadingModal.style.display = 'none';
    startDinoGame();
});

closeGameBtn.addEventListener('click', () => {
    stopDinoGame();
    if (sendBtn.textContent === 'Generating...')
        showLoadingModal();
});

function startDinoGame() {
    foxGameContainer.style.display = 'block';
    gameCtx = gameCanvas.getContext('2d');
    gameRunning = true;
    gameScore_ = 0;
    foxY = 150;
    foxVelocity = 0;
    obstacles = [];
    document.addEventListener('keydown', handleGameKeyPress);
    updateGame();
}

function stopDinoGame() {
    gameRunning = false;
    foxGameContainer.style.display = 'none';
    document.removeEventListener('keydown', handleGameKeyPress);
    if (gameAnimationId)
        cancelAnimationFrame(gameAnimationId);
}

function handleGameKeyPress(keyPressed) {
    if (keyPressed.code === 'Space' && gameRunning) {
        keyPressed.preventDefault();
        if (foxY >= 150)
            foxVelocity = -12;
    }
}

function updateGame() {
    if (!gameRunning)
        return;
    gameCtx.fillStyle = '#f5e6d3';
    gameCtx.fillRect(0, 0, 800, 200);
    foxVelocity += 0.6;
    foxY += foxVelocity;
    if (foxY >= 150) {
        foxY = 150;
        foxVelocity = 0;
    }
    gameCtx.fillStyle = '#6b4423';
    gameCtx.fillRect(0, 180, 800, 20);
    if (foxImage && foxImage.complete) {
        gameCtx.imageSmoothingEnabled = false;
        gameCtx.drawImage(foxImage, 50, foxY - 30, 40, 40);
    } else {
        gameCtx.font = '40px Arial';
        gameCtx.fillText('🦊', 50, foxY);
    }
    if (Math.random() < 0.02)
        obstacles.push({ x: 800, width: 20, height: 40 });
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= 5;
        gameCtx.fillStyle = '#d95d39';
        gameCtx.fillRect(obs.x, 140, obs.width, obs.height);
        if (obs.x < 90 && obs.x > 30 && foxY + 30 > 140) {
            gameRunning = false;
            console.log('Game Over! Score: ' + gameScore_);
            stopDinoGame();
            return;
        }
        if (obs.x < -obs.width) {
            obstacles.splice(i, 1);
            gameScore_++;
        }
    }
    gameScore.textContent = gameScore_;
    gameAnimationId = requestAnimationFrame(updateGame);
}

initializeApp();

apiKeyInput.addEventListener('input', () => {
    setApiKeyBtn.disabled = !apiKeyInput.value.trim();
});

setApiKeyBtn.addEventListener('click', () => {
    apiKey = apiKeyInput.value.trim();
    if (apiKey) {
        localStorage.setItem('vibefoxes-apikey', apiKey);
        apiStatus.textContent = '✓ API Key Set';
        apiStatus.style.color = '#ff6b35';
        updateSendButtonState();
        apiKeyInput.value = '';
    }
});

modelSelector.addEventListener('change', (chooseAModel) => {
    selectedModel = chooseAModel.target.value;
    localStorage.setItem('vibefoxes-model', selectedModel);
    console.log('Model changed to:', selectedModel);
    updateSendButtonState();
});

document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        promptInput.value = btn.dataset.prompt;
        promptInput.focus();
    });
});

sendBtn.addEventListener('click', () => sendPromptToAI());
promptInput.addEventListener('keydown', (pressedKeys) => {
    if (pressedKeys.ctrlKey && pressedKeys.key === 'Enter') {
        if (!sendBtn.disabled)
            sendPromptToAI();
    }
});

async function sendPromptToAI() {
    const prompt = promptInput.value.trim();
    if (!prompt)
        return;

    // If Puter selected, we don't require an OpenAI API key -- again, this is only for local testing -- Jules
    const usePuter = selectedModel === 'puter';
    if (!usePuter && !apiKey) {
        console.log('Please set your OpenAI API key');
        addMessageToConversation('assistant', 'Please set your OpenAI API key');
        return;
    }
    if (usePuter && !puterReady) {
        console.warn('Puter is still loading. Please wait a moment and try again.');
        addMessageToConversation('assistant', 'Puter is still loading. Please wait a moment and try again.');
        return;
    }
    addMessageToConversation('user', prompt);
    promptInput.value = '';
    sendBtn.disabled = true;
    sendBtn.textContent = 'Generating...';
    showLoadingModal();
    const messages = buildConversationContext();
    try {
        let aiResponse = '';

        if (usePuter) {
            if (typeof puter === 'undefined' || !puter.ai || !puter.ai.chat)
                throw new Error('Puter library not loaded or puter.ai.chat not available.');
            console.log('Sending request to Puter');
            const systemInstructions = discussionMode
                ? `You are an AI assistant. Have natural conversations with the user. Answer questions, discuss topics, and be helpful. DO NOT generate code unless explicitly asked. Just chat naturally.`
                : `You are a coding assistant. Generate complete, runnable code based on the user's request.
- For animations/visuals: Provide full HTML with embedded CSS and JavaScript
- Wrap all code in markdown code blocks with language tags (html, javascript, etc.)
- Make code production-ready with comments
- The code should be immediately executable

`;
            let fullPrompt = systemInstructions;
            const recentHistory = conversationHistory.slice(-10);

            if (recentHistory.length > 0) {
                fullPrompt += '\n\nConversation history:\n';
                recentHistory.forEach(msg => {
                    const role = msg.role === 'user' ? 'User' : 'Assistant';
                    fullPrompt += `${role}: ${msg.content}\n\n`;
                });
            }
            if (currentCode && !discussionMode)
                fullPrompt += `\nCurrent code in editor:\n\`\`\`javascript\n${currentCode}\n\`\`\`\n\n`;
            fullPrompt += `User request: ${prompt}`;
            const puterResult = await puter.ai.chat(fullPrompt);
            console.log('Puter result::', puterResult);

            if (typeof puterResult === 'string') {
                aiResponse = puterResult;
            } else if (puterResult && puterResult.message) {
                if (typeof puterResult.message === 'string') {
                    aiResponse = puterResult.message;
                } else if (puterResult.message.content) {
                    aiResponse = puterResult.message.content;
                }
            } else if (puterResult && puterResult.response) {
                aiResponse = puterResult.response;
            } else if (puterResult && puterResult.text) {
                aiResponse = puterResult.text;
            } else if (puterResult && puterResult.content) {
                aiResponse = puterResult.content;
            } else {
                aiResponse = JSON.stringify(puterResult, null, 2);
            }
            if (!aiResponse)
                throw new Error('Empty response from Puter.ai');
        } else {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });

            const data = await response.json();

            if (data.error)
                throw new Error(data.error.message);
            aiResponse = data.choices[0].message.content;
        }
        addMessageToConversation('assistant', aiResponse);

        if (!discussionMode) {
            const extractedCode = extractCode(aiResponse);

            if (extractedCode) {
                updateCode(extractedCode);

                if (autoRunEnabled)
                    runCode(extractedCode);
            } else {
                if (aiResponse.startsWith('http') || aiResponse.startsWith('data:image')) {
                    const img = new Image();
                    img.onload = () => setupCanvas(img);
                    img.onerror = () => {
                        outputDisplay.innerHTML = `<div>Received image link but failed to load: ${aiResponse}</div>`;
                    };
                    img.src = aiResponse;
                    outputDisplay.innerHTML = '';
                    outputDisplay.appendChild(img);
                }
            }
        }

    } catch (error) {
        console.error('Error:', error);
        addMessageToConversation('assistant', `Error: ${error.message}`);
        console.warn('Error communicating with the AI provider. Check console for details.');
    } finally {
        hideLoadingModal();
        sendBtn.disabled = false;
        sendBtn.textContent = 'Generate Code';
        updateSendButtonState();
    }
}

function buildConversationContext() {
    const systemMessage = {
        role: 'system',
        content: discussionMode 
            ? `You are a friendly AI assistant. Have natural conversations with the user. Answer questions, discuss topics, and be helpful. DO NOT generate code unless explicitly asked. Just chat naturally.`
            : `You are a coding assistant for a vibe coding app. Generate executable JavaScript code based on user descriptions.

Rules:
- If the user asks for an animation or visual: Generate complete HTML/CSS/JS code that can run in a browser
- If the user asks for an image: Describe how to create it with code or provide a visual representation
- Always provide COMPLETE, RUNNABLE code
- Include all necessary HTML structure, CSS styling, and JavaScript
- For canvas animations, create the canvas element and all drawing code
- Make the code production-ready and well-commented
- IMPORTANT: Always wrap your code in markdown code blocks with the language specified

Format your response like this:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* CSS here */
    </style>
</head>
<body>
    <!-- HTML here -->
    <script>
        // JavaScript here
    </script>
</body>
</html>
\`\`\`

Or for pure JavaScript:
\`\`\`javascript
// Pure JS code here
\`\`\`

Remember: The user expects to see CODE they can run immediately. Always include code blocks!`
    };

    const messages = [systemMessage];
    const recentHistory = conversationHistory.slice(-10);

    messages.push(...recentHistory);
    if (currentCode && !discussionMode) {
        messages.push({
            role: 'system',
            content: `Current code in the editor:\n\`\`\`javascript\n${currentCode}\n\`\`\``
        });
    }

    return messages;
}

function extractCode(text) {
    const codeBlockRegex = /```(?:html|javascript|js|css)?\n?([\s\S]*?)```/g;
    const matches = [...text.matchAll(codeBlockRegex)];

    if (matches.length > 0)
        return matches[0][1].trim();
    return null;
}

function updateCode(newCode) {
    currentCode = newCode;
    codeContent.textContent = newCode;

    if (historyIndex < codeHistory.length - 1)
        codeHistory = codeHistory.slice(0, historyIndex + 1);
    codeHistory.push(newCode);
    historyIndex = codeHistory.length - 1;
    updateUndoRedoButtons();
    runCodeBtn.disabled = false;
    copyCodeBtn.disabled = false;
}

function addMessageToConversation(role, content) {
    conversationHistory.push({ role, content });
    const messageDiv = document.createElement('div');
    messageDiv.className = 'animate-slide-in';

    if (role === 'user')
        messageDiv.className += ' mb-4 p-3 rounded-md bg-editor-message-user ml-5';
    else
        messageDiv.className += ' mb-4 p-3 rounded-md bg-editor-toolbar mr-5';
    const label = document.createElement('div');
    label.className = 'font-bold mb-1 text-xs opacity-80';
    label.textContent = role === 'user' ? 'You:' : 'AI Assistant:';
    const text = document.createElement('div');
    text.textContent = content;
    messageDiv.appendChild(label);
    messageDiv.appendChild(text);
    conversationDiv.appendChild(messageDiv);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

runCodeBtn.addEventListener('click', () => {
    runCode(currentCode);
});

function runCode(code) {
    outputDisplay.innerHTML = '';
    try {
        if (code.includes('<!DOCTYPE') || code.includes('<html')) {
            const iframe = document.createElement('iframe'); // there was a bad code isolation, canva generated was destroying the body. Took me 3h to find that :( -- Cédric
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            outputDisplay.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(code);
            iframeDoc.close();
        } else {
            const result = eval(code);
            if (result !== undefined)
                outputDisplay.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        }
    } catch (error) {
        outputDisplay.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
        console.error('Code execution error:', error);
    }
}

copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(currentCode).then(() => {
        const originalText = copyCodeBtn.textContent;
        copyCodeBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyCodeBtn.textContent = originalText;
        }, 2000);
    });
});

undoBtn.addEventListener('click', () => {
    if (historyIndex > 0) {
        historyIndex--;
        currentCode = codeHistory[historyIndex];
        codeContent.textContent = currentCode;
        updateUndoRedoButtons();
    }
});

redoBtn.addEventListener('click', () => {
    if (historyIndex < codeHistory.length - 1) {
        historyIndex++;
        currentCode = codeHistory[historyIndex];
        codeContent.textContent = currentCode;
        updateUndoRedoButtons();
    }
});

function updateUndoRedoButtons() {
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= codeHistory.length - 1;
}

clearBtn.addEventListener('click', () => {
    conversationHistory = [];
    conversationDiv.innerHTML = '';
});

resetChatBtn.addEventListener('click', () => {
    conversationHistory = [];
    conversationDiv.innerHTML = '';
    currentCode = '';
    codeHistory = [];
    historyIndex = -1;
    codeContent.textContent = 'Your code will be here';
    outputDisplay.innerHTML = '';
    drawingTools.style.display = 'none';
    runCodeBtn.disabled = true;
    copyCodeBtn.disabled = true;
    updateUndoRedoButtons();
});

autorunToggleBtn.addEventListener('click', () => {
    autoRunEnabled = !autoRunEnabled;
    if (autoRunEnabled) {
        autorunToggleBtn.textContent = 'Auto-run: ON';
        autorunToggleBtn.classList.remove('bg-gray-600');
        autorunToggleBtn.classList.add('bg-green-600');
        autorunToggleBtn.classList.remove('hover:bg-gray-700');
        autorunToggleBtn.classList.add('hover:bg-green-700');
    } else {
        autorunToggleBtn.textContent = 'Auto-run: OFF';
        autorunToggleBtn.classList.remove('bg-green-600');
        autorunToggleBtn.classList.add('bg-gray-600');
        autorunToggleBtn.classList.remove('hover:bg-green-700');
        autorunToggleBtn.classList.add('hover:bg-gray-700');
    }
});

discussionModeBtn.addEventListener('click', () => {
    discussionMode = !discussionMode;
    if (discussionMode) {
        discussionModeBtn.textContent = 'Discussion: ON';
        discussionModeBtn.classList.remove('bg-blue-600');
        discussionModeBtn.classList.add('bg-purple-600');
        discussionModeBtn.classList.remove('hover:bg-blue-700');
        discussionModeBtn.classList.add('hover:bg-purple-700');
    } else {
        discussionModeBtn.textContent = 'Discussion: OFF';
        discussionModeBtn.classList.remove('bg-purple-600');
        discussionModeBtn.classList.add('bg-blue-600');
        discussionModeBtn.classList.remove('hover:bg-purple-700');
        discussionModeBtn.classList.add('hover:bg-blue-700');
    }
});

clearOutputBtn.addEventListener('click', () => {
    outputDisplay.innerHTML = '';
    drawingTools.style.display = 'none';
});

let codeVisible = false;
toggleCodeBtn.addEventListener('click', () => {
    codeVisible = !codeVisible;

    if (codeVisible) {
        codeEditorSection.style.display = 'flex';
        outputSection.style.height = '50%';
        toggleCodeBtn.textContent = 'Hide Code';
        updateUndoRedoButtons();
    } else {
        codeEditorSection.style.display = 'none';
        outputSection.style.height = '100%';
        toggleCodeBtn.textContent = 'Show Code';
        if (autoRunEnabled && currentCode && currentCode !== 'Your code will be here')
            runCode(currentCode);
    }
});

function setupCanvas(img) {
    canvas = document.createElement('canvas');
    canvas.id = 'output-canvas';
    canvas.className = 'border border-gray-300 bg-white cursor-crosshair';
    canvas.width = img.width;
    canvas.height = img.height;

    const container = document.createElement('div');
    container.id = 'canvas-container';
    container.className = 'relative inline-block';
    container.appendChild(canvas);
    outputDisplay.innerHTML = '';
    outputDisplay.appendChild(container);

    ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    lastImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawingTools.style.display = 'flex';
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
}

function startDrawing(whenDrawing) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = whenDrawing.clientX - rect.left;
    const y = whenDrawing.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(whenDrawing) {
    if (!isDrawing)
        return;

    const rect = canvas.getBoundingClientRect();
    const x = whenDrawing.clientX - rect.left;
    const y = whenDrawing.clientY - rect.top;

    ctx.strokeStyle = penColor.value;
    ctx.lineWidth = penSize.value;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

saveDrawingBtn.addEventListener('click', () => {
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL();
        link.click();
    }
});

sendToAiBtn.addEventListener('click', () => {
    if (canvas) {
        promptInput.value = `I've drawn on this image. Here's what I want: `;
        promptInput.focus();
        console.log('Image ready to send. Describe what you want the AI to do with your drawing.');
    }
});

console.log('Vibe Coding App initialized!');
console.log('Puter.ai status:', puterReady ? 'Ready' : 'Loading...');
