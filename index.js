// Assignment: Vibe Coding App. We called it VibeFoxes. Why? Because mainly... We likes foxes :-)
// JULES FRANCOIS
// MARTZ CEDRIC
// 2025

const PUTER_AVAILABLE = true;  // must be false when running on ancientbrain, true for local testing with an index.html

(function() {
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.async = true;
    document.head.appendChild(tailwindScript);

    tailwindScript.onload = () => {
        if (window.tailwind && window.tailwind.config) {
            window.tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            'editor-bg': '#1a1410',
                            'editor-panel': '#2a1f1a',
                            'editor-toolbar': '#3d2817',
                            'editor-input': '#4a3422',
                            'editor-border': '#6b4423',
                            'editor-text': '#f5e6d3',
                            'editor-accent': '#ff6b35',
                            'editor-blue': '#d95d39',
                            'editor-blue-hover': '#ff8c42',
                            'editor-message-user': '#8b4513',
                            'fox-orange': '#ff6b35',
                            'fox-orange-dark': '#d95d39',
                            'fox-cream': '#f5e6d3',
                            'fox-brown': '#6b4423',
                            'fox-tail': '#ff8c42',
                        }
                    }
                }
            };
        }
    };

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes foxTailWag {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
        }

        @keyframes foxGlow {
            0%, 100% { box-shadow: 0 0 5px rgba(255, 107, 53, 0.3); }
            50% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.6); }
        }

        .page-notification {
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid #ff6b35;
        }

        button:hover {
            cursor: pointer;
            animation: foxGlow 1.5s ease-in-out infinite;
        }

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #2a1f1a;
        }

        ::-webkit-scrollbar-thumb {
            background: #ff6b35;
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #ff8c42;
        }

        input:focus, textarea:focus, select:focus {
            outline: none !important;
            box-shadow: 0 0 0 2px #ff6b35 !important;
            border-color: #ff6b35 !important;
        }

        .mb-4 {
            position: relative;
        }

        .mb-4:hover {
            transform: translateX(2px);
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
})();

(function() {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jqueryScript.integrity = 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=';
    jqueryScript.crossOrigin = 'anonymous';
    document.head.appendChild(jqueryScript);
})();

if (PUTER_AVAILABLE) {
    (function() {
        const puterScript = document.createElement('script');
        puterScript.src = 'https://js.puter.com/v2/';
        puterScript.async = true;
        document.head.appendChild(puterScript);
    })();
} else
    console.log('puter.ai is disabled');

document.write(`
<div id="welcome-screen" class="flex items-center justify-center h-screen bg-editor-bg">
    <div class="max-w-2xl w-full mx-4">
        <div class="bg-editor-panel border-2 border-fox-orange p-8 rounded-2xl shadow-2xl" style="box-shadow: 0 0 40px rgba(255, 107, 53, 0.3);">
            <div class="text-center mb-8">
                <div class="mb-4">
                    <img src="https://ancientbrain.com/uploads/cedric588/favicon.ico" alt="VibeFoxes" class="w-16 h-16 mx-auto" style="filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.7));">
                </div>
                <h1 class="text-5xl font-bold text-fox-orange mb-2" style="text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);">
                    VibeFoxes
                </h1>
                <p class="text-fox-cream text-lg opacity-80 italic">Welcome to the Vibe Coding App where the devs were inspired by Halloween, but didn't want to use pumpkins and find out that foxes are orange too!</p>
            </div>
            <div class="mb-6">
                <label class="block text-fox-cream text-sm font-semibold mb-2">
                    Choose your AI Model:
                </label>
                <select
                    id="welcome-model-selector"
                    class="w-full px-4 py-3 bg-editor-input border-2 border-fox-brown text-editor-text rounded-lg cursor-pointer text-base focus:outline-none focus:border-fox-orange transition-all">
                    <option value="o3-mini" selected>GPT-o3-mini</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                    <option value="gpt-4o">GPT-4o</option>
                    ${PUTER_AVAILABLE ? '<option value="puter">Puter.ai</option>' : ''}
                </select>
            </div>
            <div class="mb-6">
                <label class="block text-fox-cream text-sm font-semibold mb-2">
                    OpenAI API Key <span class="text-xs opacity-60">(optional for Puter)</span>:
                </label>
                <input
                    type="password"
                    id="welcome-api-key-input"
                    placeholder="Copy/Paste was probably invented by Larry Tesler... Anyways, paste your key here :-)"
                    class="w-full px-4 py-3 bg-editor-input border-2 border-fox-brown text-editor-text rounded-lg focus:outline-none focus:border-fox-orange transition-all">
            </div>
            <div class="flex gap-3 mb-4">
                <button
                    id="welcome-start-btn"
                    class="flex-1 px-6 py-3 bg-fox-orange text-white font-semibold rounded-lg hover:bg-fox-tail transition-all transform hover:scale-105 shadow-lg"
                    style="box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);">
                    Start Coding
                </button>
                <button
                    id="welcome-later-btn"
                    class="flex-1 px-6 py-3 bg-editor-toolbar text-fox-cream border-2 border-fox-brown font-semibold rounded-lg hover:bg-editor-input transition-all">
                    I'll do it later
                </button>
            </div>
            <div class="text-center text-xs text-fox-cream opacity-50">
                Don't have an API key? <a href="https://platform.openai.com/api-keys" target="_blank" class="text-fox-orange hover:text-fox-tail underline">Get one here</a>
            </div>
        </div>
    </div>
</div>
<div id="app-container" class="flex flex-col h-screen bg-editor-bg text-editor-text font-sans overflow-hidden" style="display: none;">
    <div id="header" class="bg-editor-toolbar px-5 py-4 border-b border-editor-border relative">
        <div class="flex items-center gap-3 mb-2.5">
            <img src="https://ancientbrain.com/uploads/cedric588/favicon.ico" alt="VibeFoxes" class="w-10 h-10" style="filter: drop-shadow(0 0 8px rgba(255, 107, 53, 0.5));">
            <div>
                <h1 class="text-3xl font-bold text-fox-orange" style="text-shadow: 0 0 10px rgba(255, 107, 53, 0.3);">
                    VibeFoxes
                </h1>
                <p class="text-xs text-fox-cream opacity-75 italic">Vibe Coding App</p>
            </div>
        </div>
        <div id="api-key-section" class="flex gap-2.5 items-center flex-wrap">
            <input
                type="text"
                id="api-key-input"
                placeholder="Enter your OpenAI API Key..."
                class="flex-1 max-w-md px-3 py-2 bg-editor-input border border-gray-600 text-editor-text rounded focus:outline-none focus:ring-2 focus:ring-editor-blue">
            <button
                id="set-api-key-btn"
                disabled
                class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                Set API Key
            </button>
            <span id="api-status" class="text-sm"></span>
            <div class="flex gap-2 items-center ml-4">
                <label for="model-selector" class="text-editor-text text-sm font-semibold">Model:</label>
                <select
                    id="model-selector"
                    class="px-3 py-2 bg-editor-input border border-gray-600 text-editor-text rounded cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-editor-blue">
                    <option value="o3-mini" selected>GPT-o3-mini</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    ${PUTER_AVAILABLE ? '<option value="puter">Puter</option>' : ''}
                </select>
            </div>
            <button
                id="reset-chat-btn"
                class="px-4 py-2 bg-red-600 text-white rounded cursor-pointer text-sm hover:bg-red-700 transition-colors">
                Reset Chat
            </button>
            <button
                id="autorun-toggle-btn"
                class="px-4 py-2 bg-green-600 text-white rounded cursor-pointer text-sm hover:bg-green-700 transition-colors">
                Auto-run: ON
            </button>
        </div>
    </div>

    <div id="main-content" class="flex flex-1 overflow-hidden">
        <div id="left-panel" class="w-2/5 bg-editor-panel border-r border-editor-border flex flex-col">
            <div id="conversation-history" class="flex-1 overflow-y-auto p-5"></div>
            <div id="prompt-input-section" class="p-4 bg-editor-toolbar border-t border-editor-border">
                <textarea
                    id="prompt-input"
                    placeholder="Tell VibeFoxes what to create (Ctrl+Enter to submit)...

Examples:
- Create a game where this scary creature tries to catch me. Use this asset for the creature: https://ancientbrain.com/uploads/cedric588/1757363656.png
- Make a bouncing fox animation
- Make a calculator that screams if pressing a button
- I want to draw something!"
                    class="w-full min-h-[180px] p-2.5 bg-editor-input border border-fox-brown text-editor-text rounded resize-y text-sm focus:outline-none focus:ring-2 focus:ring-fox-orange placeholder-fox-cream placeholder-opacity-50"></textarea>
                <div id="prompt-buttons" class="flex gap-2.5 mt-2.5 items-center flex-wrap">
                    <button
                        id="send-btn"
                        disabled
                        class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Generate Code
                    </button>
                    <button
                        id="clear-btn"
                        class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover transition-colors">
                        Clear History
                    </button>
                </div>
                <div class="mt-2.5 flex flex-wrap gap-2">
                    <button
                        class="example-btn px-3 py-1.5 bg-editor-input border border-fox-brown text-editor-text rounded cursor-pointer text-xs hover:bg-fox-brown hover:text-fox-cream transition-colors"
                        data-prompt="Create an animated rainbow gradient background">
                        Rainbow Background
                    </button>
                    <button
                        class="example-btn px-3 py-1.5 bg-editor-input border border-fox-brown text-editor-text rounded cursor-pointer text-xs hover:bg-fox-brown hover:text-fox-cream transition-colors"
                        data-prompt="Make an interactive drawing canvas">
                        Drawing Canvas
                    </button>
                    <button
                        class="example-btn px-3 py-1.5 bg-editor-input border border-fox-brown text-editor-text rounded cursor-pointer text-xs hover:bg-fox-brown hover:text-fox-cream transition-colors"
                        data-prompt="Create a digital clock showing current time">
                        Digital Clock
                    </button>
                    <button
                        class="example-btn px-3 py-1.5 bg-editor-input border border-fox-brown text-editor-text rounded cursor-pointer text-xs hover:bg-fox-brown hover:text-fox-cream transition-colors"
                        data-prompt="Create a bouncing fox animation">
                        Bouncing Fox
                    </button>
                </div>
            </div>
        </div>

        <div id="right-panel" class="w-3/5 bg-editor-bg flex flex-col">
            <div id="code-editor-section" class="flex-1 flex flex-col overflow-hidden" style="display: none;">
                <div id="code-toolbar" class="px-4 py-2.5 bg-editor-toolbar border-b border-editor-border flex gap-2.5 items-center">
                    <strong class="text-editor-text">Generated Code:</strong>
                    <button
                        id="run-code-btn"
                        disabled
                        class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Run Code
                    </button>
                    <button
                        id="copy-code-btn"
                        disabled
                        class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Copy
                    </button>
                    <button
                        id="undo-btn"
                        disabled
                        class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Undo
                    </button>
                    <button
                        id="redo-btn"
                        disabled
                        class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Redo
                    </button>
                </div>
                <div id="code-display" class="flex-1 overflow-auto p-4 bg-editor-bg">
                    <pre id="code-content" class="m-0 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-editor-text">// Your code made by AI is here ^v^</pre>
                </div>
            </div>

            <div id="output-section" class="h-full border-t border-editor-border flex flex-col transition-all duration-300">
                <div id="output-toolbar" class="px-4 py-2.5 bg-editor-toolbar border-b border-editor-border flex gap-2.5 items-center">
                    <strong class="text-editor-text">Output:</strong>
                    <button
                        id="toggle-code-btn"
                        class="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer text-sm hover:bg-purple-700 transition-colors">
                        Show Code
                    </button>
                    <button
                        id="clear-output-btn"
                        class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover transition-colors">
                        Clear Output
                    </button>
                    <div id="drawing-tools" class="mt-2.5 hidden gap-2.5 items-center">
                        <label class="text-editor-text text-sm">
                            Pen Color:
                            <input type="color" id="pen-color" value="#000000" class="ml-1">
                        </label>
                        <label class="text-editor-text text-sm">
                            Pen Size:
                            <input type="range" id="pen-size" min="1" max="20" value="3" class="ml-1">
                        </label>
                        <button
                            id="save-drawing-btn"
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover transition-colors">
                            Save Drawing
                        </button>
                        <button
                            id="send-to-ai-btn"
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover transition-colors">
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

function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const appContainer = document.getElementById('app-container');
    const welcomeModelSelector = document.getElementById('welcome-model-selector');
    const welcomeApiKeyInput = document.getElementById('welcome-api-key-input');
    const welcomeStartBtn = document.getElementById('welcome-start-btn');
    const welcomeLaterBtn = document.getElementById('welcome-later-btn');
    const savedApiKey = localStorage.getItem('vibefox_api_key');
    const savedModel = localStorage.getItem('vibefox_model');

    if (savedApiKey)
        welcomeApiKeyInput.value = savedApiKey;
    if (savedModel)
        welcomeModelSelector.value = savedModel;

    welcomeStartBtn.addEventListener('click', () => {
        const enteredKey = welcomeApiKeyInput.value.trim();
        const chosenModel = welcomeModelSelector.value;

        if (enteredKey) {
            apiKey = enteredKey;
            localStorage.setItem('vibefox_api_key', enteredKey);
        }
        selectedModel = chosenModel;
        localStorage.setItem('vibefox_model', chosenModel);
        startApp();
    });

    welcomeLaterBtn.addEventListener('click', () => {
        const chosenModel = welcomeModelSelector.value;

        selectedModel = chosenModel;
        localStorage.setItem('vibefox_model', chosenModel);
        startApp();
    });

    function startApp() {
        welcomeScreen.style.transition = 'opacity 0.5s ease-out';
        welcomeScreen.style.opacity = '0';

        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            appContainer.style.display = 'flex';
            initializeApp();
        }, 500);
    }
}

initializeWelcomeScreen();

function initializeApp() {
    apiKeyInput = document.getElementById('api-key-input');
    setApiKeyBtn = document.getElementById('set-api-key-btn');
    apiStatus = document.getElementById('api-status');
    conversationDiv = document.getElementById('conversation-history');
    promptInput = document.getElementById('prompt-input');
    sendBtn = document.getElementById('send-btn');
    clearBtn = document.getElementById('clear-btn');
    modelSelector = document.getElementById('model-selector');
    resetChatBtn = document.getElementById('reset-chat-btn');
    autorunToggleBtn = document.getElementById('autorun-toggle-btn');
    codeContent = document.getElementById('code-content');
    runCodeBtn = document.getElementById('run-code-btn');
    copyCodeBtn = document.getElementById('copy-code-btn');
    undoBtn = document.getElementById('undo-btn');
    redoBtn = document.getElementById('redo-btn');
    toggleCodeBtn = document.getElementById('toggle-code-btn');
    codeEditorSection = document.getElementById('code-editor-section');
    outputSection = document.getElementById('output-section');
    outputDisplay = document.getElementById('output-display');
    clearOutputBtn = document.getElementById('clear-output-btn');
    drawingTools = document.getElementById('drawing-tools');
    penColor = document.getElementById('pen-color');
    penSize = document.getElementById('pen-size');
    saveDrawingBtn = document.getElementById('save-drawing-btn');
    sendToAiBtn = document.getElementById('send-to-ai-btn');

    if (apiKey) {
        apiStatus.innerHTML = 'API Key Properlly Set';
        apiStatus.style.color = '#ff6b35';
    }
    modelSelector.value = selectedModel;
    setupEventListeners();
}

function setupEventListeners() {

    apiKeyInput.addEventListener('input', () => {
        setApiKeyBtn.disabled = !apiKeyInput.value.trim();
    });

    setApiKeyBtn.addEventListener('click', () => {
        const trimmedKey = apiKeyInput.value.trim();

        if (trimmedKey) {
            apiKey = trimmedKey;
            apiStatus.innerHTML = 'API Key Set';
            apiStatus.style.color = '#4ec9b0';
            sendBtn.disabled = false;
            apiKeyInput.value = '';
        }
    });

    modelSelector.addEventListener('change', (catchedEvent) => {
        const model = catchedEvent.target.value;
        selectedModel = model;
        console.log('Model changed to:', model);

        if (model === 'puter') {
            if (!PUTER_AVAILABLE) {
                showNotification('Puter is disabled. Please select an OpenAI model.', 'error');
                modelSelector.value = 'o3-mini';
                selectedModel = 'o3-mini';
                return;
            }
            sendBtn.disabled = !puterReady;
            if (puterReady) {
                apiStatus.innerHTML = 'puter.ai Ready';
                apiStatus.style.color = '#4ec9b0';
            } else {
                apiStatus.innerHTML = 'puter.ai Loading...';
                apiStatus.style.color = '#dcdcaa';
            }
        } else {
            sendBtn.disabled = !apiKey;
            if (apiKey) {
                apiStatus.innerHTML = 'API Key Set';
                apiStatus.style.color = '#4ec9b0';
            } else {
                apiStatus.innerHTML = '';
            }
        }
    });

    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            promptInput.value = btn.dataset.prompt;
            promptInput.focus();
        });
    });

    sendBtn.addEventListener('click', () => sendPromptToAI());
    promptInput.addEventListener('keydown', (catchedKeyPressed) => {
        if (catchedKeyPressed.ctrlKey && catchedKeyPressed.key === 'Enter')
            sendPromptToAI();
    });

    runCodeBtn.addEventListener('click', () => {
        if (!isHtmlCode(currentCode)) {
            const warningDiv = document.createElement('div');
            warningDiv.className = 'p-4 bg-red-900 border border-red-600 rounded-md text-red-200';
            warningDiv.innerHTML = `
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    <div>
                        <strong class="font-bold">Oh no, seems that this code can't be executed</strong>
                        <p class="mt-1">This code doesn't appear to be valid HTML or JavaScript that can be executed in the browser. The execution environment only supports HTML/JavaScript code.</p>
                    </div>
                </div>
            `;
            outputDisplay.innerHTML = '';
            outputDisplay.appendChild(warningDiv);
            return;
        }
        runCode(currentCode);
    });

    copyCodeBtn.addEventListener('click', () => {
        const originalText = copyCodeBtn.innerHTML;
        navigator.clipboard.writeText(currentCode).then(() => {
            copyCodeBtn.innerHTML = 'Copied!';
            setTimeout(() => {
                copyCodeBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    undoBtn.addEventListener('click', () => {
        if (historyIndex > 0) {
            historyIndex--;
            currentCode = codeHistory[historyIndex];
            codeContent.innerHTML = currentCode;
            updateUndoRedoButtons();
        }
    });

    redoBtn.addEventListener('click', () => {
        if (historyIndex < codeHistory.length - 1) {
            historyIndex++;
            currentCode = codeHistory[historyIndex];
            codeContent.innerHTML = currentCode;
            updateUndoRedoButtons();
        }
    });

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
        codeContent.innerHTML = '// Your code made by AI is here ^v^';
        outputDisplay.innerHTML = '';
        drawingTools.style.display = 'none';
        runCodeBtn.disabled = true;
        copyCodeBtn.disabled = true;
        updateUndoRedoButtons();
    });

    autorunToggleBtn.addEventListener('click', () => {
        autoRunEnabled = !autoRunEnabled;
        if (autoRunEnabled) {
            autorunToggleBtn.innerHTML = 'Auto-run: ON';
            autorunToggleBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
            autorunToggleBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        } else {
            autorunToggleBtn.innerHTML = 'Auto-run: OFF';
            autorunToggleBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            autorunToggleBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
        }
    });

    clearOutputBtn.addEventListener('click', () => {
        outputDisplay.innerHTML = '';
        drawingTools.style.display = 'none';
    });

    toggleCodeBtn.addEventListener('click', () => {
        codeVisible = !codeVisible;

        if (codeVisible) {
            codeEditorSection.style.display = 'flex';
            outputSection.style.height = '50%';
            toggleCodeBtn.innerHTML = 'Hide Code';
            updateUndoRedoButtons();
        } else {
            codeEditorSection.style.display = 'none';
            outputSection.style.height = '100%';
            toggleCodeBtn.innerHTML = 'Show Code';
            if (autoRunEnabled && currentCode && currentCode !== '// Your code made by AI is here ^v^')
                runCode(currentCode);
        }
    });

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
            promptInput.value = 'I have drawn on this image. Here is what I want: ';
            promptInput.focus();
            showNotification('Image ready to send. Describe what you want the AI to do with your drawing.', 'info');
        }
    });
}

let apiKeyInput, setApiKeyBtn, apiStatus, conversationDiv, promptInput, sendBtn, clearBtn;
let modelSelector, resetChatBtn, autorunToggleBtn, codeContent, runCodeBtn, copyCodeBtn;
let undoBtn, redoBtn, toggleCodeBtn, codeEditorSection, outputSection, outputDisplay;
let clearOutputBtn, drawingTools, penColor, penSize, saveDrawingBtn, sendToAiBtn;
let existingNotif = null;

function showNotification(message, type = 'info') {
    if (existingNotif)
        existingNotif.remove();
    const notif = document.createElement('div');
    notif.className = 'page-notification fixed top-20 right-5 z-50 p-4 rounded-lg shadow-lg max-w-md animate-slide-in';
    let bgColor, borderColor, iconPath;
    if (type === 'error') {
        bgColor = 'bg-red-900';
        borderColor = 'border-red-600';
        iconPath = 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z';
    } else if (type === 'warning') {
        bgColor = 'bg-yellow-900';
        borderColor = 'border-yellow-600';
        iconPath = 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z';
    } else if (type === 'success') {
        bgColor = 'bg-green-900';
        borderColor = 'border-green-600';
        iconPath = 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z';
    } else {
        bgColor = 'bg-blue-900';
        borderColor = 'border-blue-600';
        iconPath = 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z';
    }
    notif.className += ` ${bgColor} border ${borderColor} text-white`;
    notif.innerHTML = `
        <div class="flex items-start gap-3">
            <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="${iconPath}" clip-rule="evenodd"/>
            </svg>
            <div class="flex-1">
                <p>${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-300 font-bold text-xl leading-none">×</button>
        </div>
    `;
    existingNotif = notif;
    document.body.appendChild(notif);
    setTimeout(() => {
        if (notif.parentElement) {
            notif.style.opacity = '0';
            notif.style.transition = 'opacity 0.3s';
            setTimeout(() => {
                notif.remove();
                if (existingNotif === notif)
                    existingNotif = null;
            }, 300);
        }
    }, 5000);
}

// Puter is used for our local tests, because we don't have an API key. See doc here: https://developer.puter.com/
const initPuter = () => {
    if (typeof puter !== 'undefined') {
        puterReady = true;
        console.log('puter.ai loaded and ready (local version used for tests)');
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
                const btnEl = document.getElementById('send-btn');

                if (modelSelect && modelSelect.value === 'puter') {
                    if (btnEl)
                        btnEl.disabled = false;
                    if (statusEl) {
                        statusEl.innerHTML = 'puter.ai Ready';
                        statusEl.style.color = '#4ec9b0';
                    }
                }
            }
        }
    }, 50);
}

async function sendPromptToAI() {
    const prompt = promptInput.value.trim();
    const usePuter = selectedModel === 'puter';

    if (!prompt)
        return;
    if (usePuter && !PUTER_AVAILABLE) {
        showNotification('Puter is disabled. Select an OpenAI model instead.', 'error');
        return;
    }
    if (!usePuter && !apiKey) {
        showNotification('Please choose your model first!', 'warning');
        return;
    }
    if (usePuter && !puterReady) {
        showNotification('Puter is still loading. Please wait a moment and try again.', 'warning');
        return;
    }
    addMessageToConversation('user', prompt);
    promptInput.value = '';
    sendBtn.disabled = true;
    sendBtn.innerHTML = 'Generating...';

    const messages = buildConversationContext();

    try {
        let aiResponse = '';

        if (usePuter)
            aiResponse = await getPuterResponse(prompt);
        else
            aiResponse = await getOpenAIResponse(messages);
        addMessageToConversation('assistant', aiResponse);
        const extractedCode = extractCode(aiResponse);
        if (extractedCode) {
            updateCode(extractedCode);

            if (autoRunEnabled) {
                if (isHtmlCode(extractedCode))
                    runCode(extractedCode);
                else
                    showAutoRunWarning();
            }
        } else
            handleNonCodeResponse(aiResponse);

    } catch (error) {
        console.error('Error:', error);
        if (error && error.error && error.error.code === 'moderation_failed') {
            addMessageToConversation('assistant', 'Error: Content moderation failed. Puter.ai has rejected this request. Please try rephrasing your prompt or use an OpenAI model instead.');
            showNotification('Puter.ai moderation failed. Try rephrasing or switch to OpenAI model.', 'error');
        } else if (error.message && (error.message.includes('Incorrect API key') || error.message.includes('Invalid API key') || error.message.includes('API key provided'))) {
            addMessageToConversation('assistant', 'Error: Invalid OpenAI API key. Please check your API key and try again. You can find your API key at https://platform.openai.com/account/api-keys');
            showNotification('Oh No, invalid API key! Please enter a valid OpenAI API key.', 'error');
            apiKey = '';
            apiStatus.innerHTML = 'Invalid API Key';
            apiStatus.style.color = '#ff4444';
            sendBtn.disabled = true;
        } else {
            const errorMessage = error.message || (error.error && error.error.message) || 'Unknown error';
            addMessageToConversation('assistant', `Error: ${errorMessage}`);
            showNotification('Error communicating with the AI provider. Check console for details.', 'error');
        }
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = 'Generate Code';
    }
}

async function getPuterResponse(prompt) {
    if (!PUTER_AVAILABLE)
        throw new Error('Puter is disabled. Please use OpenAI API instead.');
    if (typeof puter === 'undefined' || !puter.ai || !puter.ai.chat)
        throw new Error('Puter library not loaded or puter.ai.chat not available.');
    console.log('Sending request to puter.ai...');
    const systemInstructions = `You are a coding assistant. Generate complete, runnable code based on the user's request.
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
    if (currentCode)
        fullPrompt += `\nCurrent code in editor:\n\`\`\`javascript\n${currentCode}\n\`\`\`\n\n`;
    fullPrompt += `User request: ${prompt}`;
    const puterResult = await puter.ai.chat(fullPrompt);
    console.log('Puter response:', puterResult);
    
    // Check if Puter returned an error
    if (puterResult && puterResult.success === false && puterResult.error) {
        throw puterResult;
    }
    
    let aiResponse = '';
    if (typeof puterResult === 'string')
        aiResponse = puterResult;
    else if (puterResult && puterResult.message) {
        if (typeof puterResult.message === 'string')
            aiResponse = puterResult.message;
        else if (puterResult.message.content)
            aiResponse = puterResult.message.content;
    } else if (puterResult && puterResult.response)
        aiResponse = puterResult.response;
    else if (puterResult && puterResult.text)
        aiResponse = puterResult.text;
    else if (puterResult && puterResult.content)
        aiResponse = puterResult.content;
    else
        aiResponse = JSON.stringify(puterResult, null, 2);
    if (!aiResponse)
        throw new Error('Empty response from puter.ai');
    return aiResponse;
}

async function getOpenAIResponse(messages) {
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
    return data.choices[0].message.content;
}

function handleNonCodeResponse(aiResponse) {
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

function buildConversationContext() {
    const systemMessage = {
        role: 'system',
        content: `You are a coding assistant for a vibe coding app. Generate executable JavaScript code based on user descriptions.

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

    if (currentCode) {
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

function isHtmlCode(code) {
    const htmlPatterns = [
        /<!DOCTYPE/i,
        /<html/i,
        /<head/i,
        /<body/i,
        /<div/i,
        /<canvas/i,
        /<script/i,
        /<style/i
    ];

    const isHtml = htmlPatterns.some(pattern => pattern.test(code));
    const isPureJs = !code.includes('def ') &&
                     !code.includes('print(') &&
                     !code.includes('import ') &&
                     !code.includes('class ') &&
                     !code.includes('public static') &&
                     !code.includes('package ') &&
                     (code.includes('function') ||
                      code.includes('const ') ||
                      code.includes('let ') ||
                      code.includes('var ') ||
                      code.includes('console.log'));
    return isHtml || isPureJs;
}

function showAutoRunWarning() {
    const warningDiv = document.createElement('div');
    warningDiv.className = 'p-4 bg-yellow-900 border border-yellow-600 rounded-md text-yellow-200';
    warningDiv.innerHTML = `
        <div class="flex items-start gap-3">
            <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <div>
                <strong class="font-bold">Auto-run turned off</strong>
                <p class="mt-1">Auto-run only works with HTML/JavaScript code. The generated code is likely another language, sorry, we don't support autorun with that :-(</p>
            </div>
        </div>
    `;

    outputDisplay.innerHTML = '';
    outputDisplay.appendChild(warningDiv);

    if (!codeVisible)
        toggleCodeBtn.click();
}

function updateCode(newCode) {
    currentCode = newCode;
    codeContent.innerHTML = newCode;

    if (historyIndex < codeHistory.length - 1)
        codeHistory = codeHistory.slice(0, historyIndex + 1);
    codeHistory.push(newCode);
    historyIndex = codeHistory.length - 1;
    updateUndoRedoButtons();
    runCodeBtn.disabled = false;
    copyCodeBtn.disabled = false;
}

function addMessageToConversation(role, content) {
    const messageDiv = document.createElement('div');
    const label = document.createElement('div');
    const text = document.createElement('div');

    conversationHistory.push({ role, content });
    if (role === 'user')
        messageDiv.className = 'mb-4 p-3 rounded-md bg-editor-message-user ml-5';
    else
        messageDiv.className = 'mb-4 p-3 rounded-md bg-editor-toolbar mr-5';
    label.className = 'font-bold mb-1 text-xs opacity-80';
    label.innerHTML = role === 'user' ? 'You:' : 'AI Assistant:';
    text.innerHTML = content;
    messageDiv.appendChild(label);
    messageDiv.appendChild(text);
    conversationDiv.appendChild(messageDiv);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function runCode(code) {
    outputDisplay.innerHTML = '';
    try {
        if (code.includes('<!DOCTYPE') || code.includes('<html')) {
            const iframe = document.createElement('iframe');
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

function updateUndoRedoButtons() {
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= codeHistory.length - 1;
}

let codeVisible = false;

function setupCanvas(img) {
    const container = document.createElement('div');

    canvas = document.createElement('canvas');
    canvas.id = 'output-canvas';
    canvas.className = 'border border-gray-300 bg-white cursor-crosshair';
    canvas.width = img.width;
    canvas.height = img.height;
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

function startDrawing(catchedEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = catchedEvent.clientX - rect.left;
    const y = catchedEvent.clientY - rect.top;

    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(catchedEvent) {
    if (!isDrawing)
        return;

    const rect = canvas.getBoundingClientRect();
    const x = catchedEvent.clientX - rect.left;
    const y = catchedEvent.clientY - rect.top;

    ctx.strokeStyle = penColor.value;
    ctx.lineWidth = penSize.value;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

console.log('Hello, how are you? :-)');
