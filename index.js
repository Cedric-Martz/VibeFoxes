

// Vibe Coding App - AI-Powered Code Generator
// Created for CSC1047 - Advanced Algorithms and AI Search
// Uses OpenAI ChatGPT API to generate JavaScript code from natural language

// API Documentation: https://platform.openai.com/docs/api-reference/chat

//HTML Template
document.write(`
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        height: 100vh;
        overflow: hidden;
        background: #1e1e1e;
        color: #d4d4d4;
    }
    
    #app-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    
    #header {
        background: #2d2d30;
        padding: 15px 20px;
        border-bottom: 1px solid #3e3e42;
    }
    
    #header h1 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #4ec9b0;
    }
    
    #api-key-section {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    
    #api-key-section input {
        flex: 1;
        max-width: 400px;
        padding: 8px 12px;
        background: #3c3c3c;
        border: 1px solid #555;
        color: #d4d4d4;
        border-radius: 4px;
    }
    
    button {
        padding: 8px 16px;
        background: #0e639c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    
    button:hover:not(:disabled) {
        background: #1177bb;
    }
    
    button:disabled {
        background: #555;
        cursor: not-allowed;
    }
    
    #main-content {
        display: flex;
        flex: 1;
        overflow: hidden;
    }
    
    #left-panel {
        width: 40%;
        background: #252526;
        border-right: 1px solid #3e3e42;
        display: flex;
        flex-direction: column;
    }
    
    #right-panel {
        width: 60%;
        background: #1e1e1e;
        display: flex;
        flex-direction: column;
    }
    
    #conversation-history {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
    }
    
    .message {
        margin-bottom: 15px;
        padding: 12px;
        border-radius: 6px;
    }
    
    .message.user {
        background: #094771;
        margin-left: 20px;
    }
    
    .message.assistant {
        background: #2d2d30;
        margin-right: 20px;
    }
    
    .message-label {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 12px;
        opacity: 0.8;
    }
    
    #prompt-input-section {
        padding: 15px;
        background: #2d2d30;
        border-top: 1px solid #3e3e42;
    }
    
    #prompt-input {
        width: 100%;
        min-height: 80px;
        padding: 10px;
        background: #3c3c3c;
        border: 1px solid #555;
        color: #d4d4d4;
        border-radius: 4px;
        resize: vertical;
        font-family: inherit;
        font-size: 14px;
    }
    
    #prompt-buttons {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        align-items: center;
    }
    
    #model-selector {
        padding: 8px 12px;
        background: #3c3c3c;
        border: 1px solid #555;
        color: #d4d4d4;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    
    #code-editor-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    
    #code-toolbar {
        padding: 10px 15px;
        background: #2d2d30;
        border-bottom: 1px solid #3e3e42;
        display: flex;
        gap: 10px;
        align-items: center;
    }
    
    #code-display {
        flex: 1;
        overflow: auto;
        padding: 15px;
        background: #1e1e1e;
        font-family: 'Consolas', 'Courier New', monospace;
        font-size: 13px;
        line-height: 1.6;
    }
    
    #output-section {
        height: 50%;
        border-top: 1px solid #3e3e42;
        display: flex;
        flex-direction: column;
    }
    
    #output-toolbar {
        padding: 10px 15px;
        background: #2d2d30;
        border-bottom: 1px solid #3e3e42;
        display: flex;
        gap: 10px;
        align-items: center;
    }
    
    #output-display {
        flex: 1;
        overflow: auto;
        padding: 15px;
        background: white;
        color: black;
    }
    
    #canvas-container {
        position: relative;
        display: inline-block;
    }
    
    #output-canvas {
        border: 1px solid #ccc;
        background: white;
        cursor: crosshair;
    }
    
    #drawing-tools {
        margin-top: 10px;
        display: none;
    }
    
    .loading {
        opacity: 0.6;
    }
    
    pre {
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    
    .example-prompts {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .example-btn {
        padding: 6px 12px;
        background: #3c3c3c;
        border: 1px solid #555;
        color: #d4d4d4;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }
    
    .example-btn:hover {
        background: #4c4c4c;
    }
</style>

<div id="app-container">
    <div id="header">
        <h1>🎨 Vibe Coding App - AI Code Generator</h1>
        <div id="api-key-section">
            <input type="text" id="api-key-input" placeholder="Enter your OpenAI API Key...">
            <button id="set-api-key-btn" disabled>Set API Key</button>
            <span id="api-status"></span>
        </div>
    </div>
    
    <div id="main-content">
        <div id="left-panel">
            <div id="conversation-history"></div>
            <div id="prompt-input-section">
                <textarea id="prompt-input" placeholder="Describe what you want to create in English...

Examples:
- Create a colorful bouncing ball animation
- Make a simple calculator with buttons
- Draw a rotating 3D cube
- Create an image of a sunset over mountains"></textarea>
                <div id="prompt-buttons">
                    <button id="send-btn" disabled>Generate Code</button>
                    <button id="clear-btn">Clear History</button>
                    <label for="model-selector" style="color: #d4d4d4; font-size: 14px;">Model:</label>
                    <select id="model-selector">
                        <option value="gpt-3.5-turbo" selected>GPT-3.5 Turbo (Recommended)</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
                        <option value="gpt-4o">GPT-4o</option>
                        <option value="gpt-4o-mini">GPT-4o Mini</option>
                    </select>
                </div>
                <div class="example-prompts">
                    <button class="example-btn" data-prompt="Create an animated rainbow gradient background">Rainbow Background</button>
                    <button class="example-btn" data-prompt="Make an interactive drawing canvas">Drawing Canvas</button>
                    <button class="example-btn" data-prompt="Create a digital clock showing current time">Digital Clock</button>
                    <button class="example-btn" data-prompt="Generate an image of a futuristic city">Futuristic City</button>
                </div>
            </div>
        </div>
        
        <div id="right-panel">
            <div id="code-editor-section">
                <div id="code-toolbar">
                    <strong>Generated Code:</strong>
                    <button id="run-code-btn" disabled>▶ Run Code</button>
                    <button id="copy-code-btn" disabled>📋 Copy</button>
                    <button id="undo-btn" disabled>↶ Undo</button>
                    <button id="redo-btn" disabled>↷ Redo</button>
                </div>
                <div id="code-display">
                    <pre id="code-content">// Your generated code will appear here...</pre>
                </div>
            </div>
            
            <div id="output-section">
                <div id="output-toolbar">
                    <strong>Output:</strong>
                    <button id="clear-output-btn">Clear Output</button>
                    <div id="drawing-tools">
                        <label>Pen Color: <input type="color" id="pen-color" value="#000000"></label>
                        <label>Pen Size: <input type="range" id="pen-size" min="1" max="20" value="3"></label>
                        <button id="save-drawing-btn">Save Drawing</button>
                        <button id="send-to-ai-btn">Send to AI</button>
                    </div>
                </div>
                <div id="output-display"></div>
            </div>
        </div>
    </div>
</div>
`);

// JavaScript Application Logic
// ===============================================

// Global State
let apiKey = "";
let selectedModel = "gpt-3.5-turbo";
let conversationHistory = [];
let currentCode = "";
let codeHistory = [];
let historyIndex = -1;
let isDrawingMode = false;
let isDrawing = false;
let canvas = null;
let ctx = null;
let lastImageData = null;

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
    if (!prompt || !apiKey) return;

    // Add user message to conversation
    addMessageToConversation('user', prompt);
    promptInput.value = '';
    sendBtn.disabled = true;
    sendBtn.textContent = 'Generating...';

    // Build conversation context
    const messages = buildConversationContext(prompt);

    try {
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

        const aiResponse = data.choices[0].message.content;
        addMessageToConversation('assistant', aiResponse);

        // Extract and display code
        const extractedCode = extractCode(aiResponse);
        if (extractedCode) {
            updateCode(extractedCode);
        }

    } catch (error) {
        console.error('Error:', error);
        addMessageToConversation('assistant', `Error: ${error.message}`);
        alert('Error communicating with OpenAI API. Check console for details.');
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Generate Code';
    }
}

function buildConversationContext(newPrompt) {
    const systemMessage = {
        role: 'system',
        content: `You are a helpful coding assistant for a vibe coding app. Generate executable JavaScript code based on user descriptions. 
        
Rules:
- If the user asks for an animation or visual: Generate complete HTML/CSS/JS code that can run in a browser
- If the user asks for an image: Use DALL-E by providing code that calls the OpenAI images API
- Always provide COMPLETE, RUNNABLE code
- Include all necessary HTML structure, CSS styling, and JavaScript
- For canvas animations, create the canvas element and all drawing code
- Make the code production-ready and well-commented
- Wrap your code in markdown code blocks with the language specified

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
\`\`\``
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
    messageDiv.className = `message ${role}`;

    const label = document.createElement('div');
    label.className = 'message-label';
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
    canvas.width = img.width;
    canvas.height = img.height;

    const container = document.createElement('div');
    container.id = 'canvas-container';
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
        const imageData = canvas.toDataURL('image/png');
        promptInput.value = `I've drawn on this image. Here's what I want: `;
        promptInput.focus();
        alert('Image ready to send. Describe what you want the AI to do with your drawing.');
    }
});

console.log('Vibe Coding App initialized!');

