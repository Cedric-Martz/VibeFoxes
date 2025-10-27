// Vibe Coding App - AI-Powered Code Generator
// Created for CSC1047 - Advanced Algorithms and AI Search
// Uses OpenAI ChatGPT API to generate JavaScript code from natural language

// API Documentation: https://platform.openai.com/docs/api-reference/chat

// Chargement de Tailwind CSS via CDN
(function() {
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.async = true;
    document.head.appendChild(tailwindScript);

    // Configuration de Tailwind pour les couleurs personnalisées
    tailwindScript.onload = () => {
        if (window.tailwind && window.tailwind.config) {
            window.tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            'editor-bg': '#1e1e1e',
                            'editor-panel': '#252526',
                            'editor-toolbar': '#2d2d30',
                            'editor-input': '#3c3c3c',
                            'editor-border': '#3e3e42',
                            'editor-text': '#d4d4d4',
                            'editor-accent': '#4ec9b0',
                            'editor-blue': '#0e639c',
                            'editor-blue-hover': '#1177bb',
                            'editor-message-user': '#094771',
                        }
                    }
                }
            };
        }
    };
})();

// Chargement de jQuery
(function() {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
    jqueryScript.integrity = 'sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=';
    jqueryScript.crossOrigin = 'anonymous';
    document.head.appendChild(jqueryScript);
})();

// Chargement de Puter.js
(function() {
    const puterScript = document.createElement('script');
    puterScript.src = 'https://js.puter.com/v2/';
    puterScript.async = true;
    document.head.appendChild(puterScript);
})();

//HTML Template avec Tailwind CSS
document.write(`
<div id="app-container" class="flex flex-col h-screen bg-editor-bg text-editor-text font-sans overflow-hidden">
    <!-- Header -->
    <div id="header" class="bg-editor-toolbar px-5 py-4 border-b border-editor-border">
        <h1 class="text-2xl mb-2.5 text-editor-accent font-semibold">🎨 Vibe Coding App - AI Code Generator</h1>
        <div id="api-key-section" class="flex gap-2.5 items-center">
            <input type="text" id="api-key-input" placeholder="Enter your OpenAI API Key..." 
                   class="flex-1 max-w-md px-3 py-2 bg-editor-input border border-gray-600 text-editor-text rounded focus:outline-none focus:ring-2 focus:ring-editor-blue">
            <button id="set-api-key-btn" disabled 
                    class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                Set API Key
            </button>
            <span id="api-status" class="text-sm"></span>
        </div>
    </div>
    
    <!-- Main Content -->
    <div id="main-content" class="flex flex-1 overflow-hidden">
        <!-- Left Panel -->
        <div id="left-panel" class="w-2/5 bg-editor-panel border-r border-editor-border flex flex-col">
            <div id="conversation-history" class="flex-1 overflow-y-auto p-5"></div>
            <div id="prompt-input-section" class="p-4 bg-editor-toolbar border-t border-editor-border">
                <textarea id="prompt-input" placeholder="Describe what you want to create in English...

Examples:
- Create a colorful bouncing ball animation
- Make a simple calculator with buttons
- Draw a rotating 3D cube
- Create an image of a sunset over mountains" 
                          class="w-full min-h-[180px] p-2.5 bg-editor-input border border-gray-600 text-editor-text rounded resize-y text-sm focus:outline-none focus:ring-2 focus:ring-editor-blue"></textarea>
                <div id="prompt-buttons" class="flex gap-2.5 mt-2.5 items-center flex-wrap">
                    <button id="send-btn" disabled 
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        Generate Code
                    </button>
                    <button id="clear-btn" 
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover transition-colors">
                        Clear History
                    </button>
                    <label for="model-selector" class="text-editor-text text-sm">Model:</label>
                    <select id="model-selector" 
                            class="px-3 py-2 bg-editor-input border border-gray-600 text-editor-text rounded cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-editor-blue">
                        <option value="o3-mini" selected>GPT-o3-mini</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                        <option value="gpt-4o">GPT-4o</option>
                        <option value="gpt-4o-mini">GPT-4o Mini</option>
                        <option value="puter">Puter.ai (local)</option>
                    </select>
                </div>
                <div class="mt-2.5 flex flex-wrap gap-2">
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-gray-600 text-editor-text rounded cursor-pointer text-xs hover:bg-gray-700 transition-colors" 
                            data-prompt="Create an animated rainbow gradient background">Rainbow Background</button>
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-gray-600 text-editor-text rounded cursor-pointer text-xs hover:bg-gray-700 transition-colors" 
                            data-prompt="Make an interactive drawing canvas">Drawing Canvas</button>
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-gray-600 text-editor-text rounded cursor-pointer text-xs hover:bg-gray-700 transition-colors" 
                            data-prompt="Create a digital clock showing current time">Digital Clock</button>
                    <button class="example-btn px-3 py-1.5 bg-editor-input border border-gray-600 text-editor-text rounded cursor-pointer text-xs hover:bg-gray-700 transition-colors" 
                            data-prompt="Generate an image of a futuristic city">Futuristic City</button>
                </div>
            </div>
        </div>
        
        <!-- Right Panel -->
        <div id="right-panel" class="w-3/5 bg-editor-bg flex flex-col">
            <!-- Code Editor Section -->
            <div id="code-editor-section" class="flex-1 flex flex-col overflow-hidden">
                <div id="code-toolbar" class="px-4 py-2.5 bg-editor-toolbar border-b border-editor-border flex gap-2.5 items-center">
                    <strong class="text-editor-text">Generated Code:</strong>
                    <button id="run-code-btn" disabled 
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        ▶ Run Code
                    </button>
                    <button id="copy-code-btn" disabled 
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        📋 Copy
                    </button>
                    <button id="undo-btn" disabled 
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        ↶ Undo
                    </button>
                    <button id="redo-btn" disabled 
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
                        ↷ Redo
                    </button>
                </div>
                <div id="code-display" class="flex-1 overflow-auto p-4 bg-editor-bg">
                    <pre id="code-content" class="m-0 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-editor-text">// Your generated code will appear here...</pre>
                </div>
            </div>
            
            <!-- Output Section -->
            <div id="output-section" class="h-1/2 border-t border-editor-border flex flex-col">
                <div id="output-toolbar" class="px-4 py-2.5 bg-editor-toolbar border-b border-editor-border flex gap-2.5 items-center">
                    <strong class="text-editor-text">Output:</strong>
                    <button id="clear-output-btn" 
                            class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover transition-colors">
                        Clear Output
                    </button>
                    <div id="drawing-tools" class="mt-2.5 hidden gap-2.5 items-center">
                        <label class="text-editor-text text-sm">Pen Color: <input type="color" id="pen-color" value="#000000" class="ml-1"></label>
                        <label class="text-editor-text text-sm">Pen Size: <input type="range" id="pen-size" min="1" max="20" value="3" class="ml-1"></label>
                        <button id="save-drawing-btn" 
                                class="px-4 py-2 bg-editor-blue text-white rounded cursor-pointer text-sm hover:bg-editor-blue-hover transition-colors">
                            Save Drawing
                        </button>
                        <button id="send-to-ai-btn" 
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

// JavaScript Application Logic
// ===============================================

// Global State
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

// Wait for Puter to be ready (synchronous load, should be immediate)
// Puter is now loaded synchronously from local file
const initPuter = () => {
    if (typeof puter !== 'undefined') {
        puterReady = true;
        console.log('✅ Puter.js loaded and ready (local version)');
        return true;
    }
    return false;
};

// Check immediately
if (!initPuter()) {
    // If not available immediately, poll briefly
    let attempts = 0;
    const checkPuter = setInterval(() => {
        attempts++;
        if (initPuter() || attempts > 50) {
            clearInterval(checkPuter);
            if (puterReady) {
                // Update UI if model is already set to puter
                const modelSelect = document.getElementById('model-selector');
                const statusEl = document.getElementById('api-status');
                const btnEl = document.getElementById('send-btn');
                if (modelSelect && modelSelect.value === 'puter') {
                    if (btnEl) btnEl.disabled = false;
                    if (statusEl) {
                        statusEl.textContent = '✓ Puter.ai Ready';
                        statusEl.style.color = '#4ec9b0';
                    }
                }
            }
        }
    }, 50);
}

// DOM Elements
const apiKeyInput = document.getElementById('api-key-input');
const setApiKeyBtn = document.getElementById('set-api-key-btn');
const apiStatus = document.getElementById('api-status');
const conversationDiv = document.getElementById('conversation-history');
const promptInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-btn');
const modelSelector = document.getElementById('model-selector');
const codeContent = document.getElementById('code-content');
const runCodeBtn = document.getElementById('run-code-btn');
const copyCodeBtn = document.getElementById('copy-code-btn');
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const outputDisplay = document.getElementById('output-display');
const clearOutputBtn = document.getElementById('clear-output-btn');
const drawingTools = document.getElementById('drawing-tools');
const penColor = document.getElementById('pen-color');
const penSize = document.getElementById('pen-size');
const saveDrawingBtn = document.getElementById('save-drawing-btn');
const sendToAiBtn = document.getElementById('send-to-ai-btn');

// API Key Management
apiKeyInput.addEventListener('input', () => {
    setApiKeyBtn.disabled = !apiKeyInput.value.trim();
});

setApiKeyBtn.addEventListener('click', () => {
    apiKey = apiKeyInput.value.trim();
    if (apiKey) {
        apiStatus.textContent = '✓ API Key Set';
        apiStatus.style.color = '#4ec9b0';
        sendBtn.disabled = false;
        apiKeyInput.value = '';
    }
});

// Model Selection
modelSelector.addEventListener('change', (e) => {
    selectedModel = e.target.value;
    console.log('Model changed to:', selectedModel);

    // Enable send button if Puter is selected and ready, or if API key is set
    if (selectedModel === 'puter') {
        sendBtn.disabled = !puterReady;
        if (puterReady) {
            apiStatus.textContent = '✓ Puter.ai Ready';
            apiStatus.style.color = '#4ec9b0';
        } else {
            apiStatus.textContent = '⏳ Puter.ai Loading...';
            apiStatus.style.color = '#dcdcaa';
        }
    } else {
        sendBtn.disabled = !apiKey;
        if (apiKey) {
            apiStatus.textContent = '✓ API Key Set';
            apiStatus.style.color = '#4ec9b0';
        } else {
            apiStatus.textContent = '';
        }
    }
});

// Example Prompts
document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        promptInput.value = btn.dataset.prompt;
        promptInput.focus();
    });
});

// Send Prompt to AI
sendBtn.addEventListener('click', () => sendPromptToAI());
promptInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        sendPromptToAI();
    }
});

async function sendPromptToAI() {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    // If Puter selected, we don't require an OpenAI API key
    const usePuter = selectedModel === 'puter';
    if (!usePuter && !apiKey) {
        alert('Please set your OpenAI API key or choose Puter as the model.');
        return;
    }

    // Check if Puter is ready
    if (usePuter && !puterReady) {
        alert('Puter is still loading. Please wait a moment and try again.');
        return;
    }

    // Add user message to conversation
    addMessageToConversation('user', prompt);
    promptInput.value = '';
    sendBtn.disabled = true;
    sendBtn.textContent = 'Generating...';

    // Build conversation context (only for OpenAI path)
    const messages = buildConversationContext();

    try {
        let aiResponse = '';

        if (usePuter) {
            // Use puter.ai.chat
            if (typeof puter === 'undefined' || !puter.ai || !puter.ai.chat) {
                throw new Error('Puter library not loaded or puter.ai.chat not available.');
            }

            console.log('📡 Sending request to Puter.ai...');

            // Build a comprehensive prompt with instructions for Puter
            const systemInstructions = `You are a coding assistant. Generate complete, runnable code based on the user's request.
- For animations/visuals: Provide full HTML with embedded CSS and JavaScript
- Wrap all code in markdown code blocks with language tags (html, javascript, etc.)
- Make code production-ready with comments
- The code should be immediately executable

`;

            // Build full prompt with conversation history
            let fullPrompt = systemInstructions;

            // Add recent conversation history (last 5 exchanges)
            const recentHistory = conversationHistory.slice(-10);
            if (recentHistory.length > 0) {
                fullPrompt += '\n\nConversation history:\n';
                recentHistory.forEach(msg => {
                    const role = msg.role === 'user' ? 'User' : 'Assistant';
                    fullPrompt += `${role}: ${msg.content}\n\n`;
                });
            }

            // Add current code context if exists
            if (currentCode) {
                fullPrompt += `\nCurrent code in editor:\n\`\`\`javascript\n${currentCode}\n\`\`\`\n\n`;
            }

            // Add current user request
            fullPrompt += `User request: ${prompt}`;

            // Call puter.ai.chat - the response format can vary
            const puterResult = await puter.ai.chat(fullPrompt);

            console.log('📥 Puter response:', puterResult);

            // Extract text from various possible response formats
            if (typeof puterResult === 'string') {
                aiResponse = puterResult;
            } else if (puterResult && puterResult.message) {
                // Handle message object
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
                // Last resort: stringify the result
                aiResponse = JSON.stringify(puterResult, null, 2);
            }

            if (!aiResponse) {
                throw new Error('Empty response from Puter.ai');
            }
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

            if (data.error) {
                throw new Error(data.error.message);
            }

            aiResponse = data.choices[0].message.content;
        }

        addMessageToConversation('assistant', aiResponse);

        // Extract and display code
        const extractedCode = extractCode(aiResponse);
        if (extractedCode) {
            updateCode(extractedCode);
        } else {
            // If response is an image URL or base64, attempt to show it
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

    } catch (error) {
        console.error('Error:', error);
        addMessageToConversation('assistant', `Error: ${error.message}`);
        alert('Error communicating with the AI provider. Check console for details.');
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Generate Code';
    }
}

function buildConversationContext() {
    const systemMessage = {
        role: 'system',
        content: `You are a helpful coding assistant for a vibe coding app. Generate executable JavaScript code based on user descriptions. 
        
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

    // Add conversation history (last 5 exchanges)
    const recentHistory = conversationHistory.slice(-10);
    messages.push(...recentHistory);

    // Add current code context if exists
    if (currentCode) {
        messages.push({
            role: 'system',
            content: `Current code in the editor:\n\`\`\`javascript\n${currentCode}\n\`\`\``
        });
    }

    return messages;
}

function extractCode(text) {
    // Extract code from markdown code blocks
    const codeBlockRegex = /```(?:html|javascript|js|css)?\n?([\s\S]*?)```/g;
    const matches = [...text.matchAll(codeBlockRegex)];

    if (matches.length > 0) {
        return matches[0][1].trim();
    }

    return null;
}

function updateCode(newCode) {
    currentCode = newCode;
    codeContent.textContent = newCode;

    // Add to history for undo/redo
    if (historyIndex < codeHistory.length - 1) {
        codeHistory = codeHistory.slice(0, historyIndex + 1);
    }
    codeHistory.push(newCode);
    historyIndex = codeHistory.length - 1;

    updateUndoRedoButtons();
    runCodeBtn.disabled = false;
    copyCodeBtn.disabled = false;
}

function addMessageToConversation(role, content) {
    conversationHistory.push({ role, content });

    const messageDiv = document.createElement('div');
    // Utilisation des classes Tailwind pour les messages
    if (role === 'user') {
        messageDiv.className = 'mb-4 p-3 rounded-md bg-editor-message-user ml-5';
    } else {
        messageDiv.className = 'mb-4 p-3 rounded-md bg-editor-toolbar mr-5';
    }

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

// Code Execution
runCodeBtn.addEventListener('click', () => {
    runCode(currentCode);
});

function runCode(code) {
    outputDisplay.innerHTML = '';

    try {
        // Check if it's HTML code
        if (code.includes('<!DOCTYPE') || code.includes('<html')) {
            // Create iframe for isolated execution
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
            // Execute as pure JavaScript
            const result = eval(code);
            if (result !== undefined) {
                outputDisplay.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
            }
        }
    } catch (error) {
        outputDisplay.innerHTML = `<div style="color: red;">Error: ${error.message}</div>`;
        console.error('Code execution error:', error);
    }
}

// Copy Code
copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(currentCode).then(() => {
        const originalText = copyCodeBtn.textContent;
        copyCodeBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyCodeBtn.textContent = originalText;
        }, 2000);
    });
});

// Undo/Redo
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

// Clear Functions
clearBtn.addEventListener('click', () => {
    if (confirm('Clear all conversation history?')) {
        conversationHistory = [];
        conversationDiv.innerHTML = '';
    }
});

clearOutputBtn.addEventListener('click', () => {
    outputDisplay.innerHTML = '';
    drawingTools.style.display = 'none';
});

// Canvas Drawing for Image Editing
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

    // Store original image data
    lastImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Show drawing tools
    drawingTools.style.display = 'flex';

    // Setup drawing events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

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
        alert('Image ready to send. Describe what you want the AI to do with your drawing.');
    }
});

console.log('🎨 Vibe Coding App initialized!');
console.log('Puter.ai status:', puterReady ? '✅ Ready' : '⏳ Loading...');
