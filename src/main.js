import { WhisperManager } from './whisper.js';
import { TTSManager } from './tts.js';
import { LLMManager } from './llm.js';

class VoiceAssistant {
    constructor() {
        this.whisper = new WhisperManager();
        this.tts = new TTSManager();
        this.llm = new LLMManager();
        
        this.isInitialized = false;
        this.isRecording = false;
        this.conversationHistory = [];
        this.lastResponse = '';
        
        this.initializeUI();
    }

    initializeUI() {
        // Get DOM elements
        this.elements = {
            initBtn: document.getElementById('init-btn'),
            recordBtn: document.getElementById('record-btn'),
            stopBtn: document.getElementById('stop-btn'),
            sendBtn: document.getElementById('send-btn'),
            speakBtn: document.getElementById('speak-btn'),
            clearBtn: document.getElementById('clear-btn'),
            
            llmProvider: document.getElementById('llm-provider'),
            webllmModel: document.getElementById('webllm-model'),
            apiKey: document.getElementById('api-key'),
            apiEndpoint: document.getElementById('api-endpoint'),
            
            textInput: document.getElementById('text-input'),
            chatContainer: document.getElementById('chat-container'),
            recordingIndicator: document.getElementById('recording-indicator'),
            
            initStatus: document.getElementById('init-status'),
            audioStatus: document.getElementById('audio-status'),
            systemStatus: document.getElementById('system-status')
        };

        // Bind event listeners
        this.elements.initBtn.addEventListener('click', () => this.initialize());
        this.elements.recordBtn.addEventListener('click', () => this.startRecording());
        this.elements.stopBtn.addEventListener('click', () => this.stopRecording());
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.elements.speakBtn.addEventListener('click', () => this.speakLastResponse());
        this.elements.clearBtn.addEventListener('click', () => this.clearChat());
        
        this.elements.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Update UI based on provider selection
        this.elements.llmProvider.addEventListener('change', () => this.updateProviderUI());
        this.updateProviderUI();
    }

    updateProviderUI() {
        const provider = this.elements.llmProvider.value;
        const needsApiKey = provider !== 'webllm';
        const needsEndpoint = provider === 'dify';
        
        this.elements.apiKey.parentElement.style.display = needsApiKey ? 'block' : 'none';
        this.elements.apiEndpoint.parentElement.style.display = needsEndpoint ? 'block' : 'none';
        this.elements.webllmModel.parentElement.parentElement.style.display = 
            provider === 'webllm' ? 'block' : 'none';
    }

    async initialize() {
        try {
            this.updateSystemStatus('Initializing system...', 'info');
            this.elements.initBtn.disabled = true;
            this.elements.initStatus.style.display = 'block';
            this.elements.initStatus.textContent = 'Initializing...';

            // Check WebGPU support
            if (!navigator.gpu) {
                throw new Error('WebGPU is not supported in this browser. Please use Chrome/Edge 113+ with WebGPU enabled.');
            }

            // Initialize Whisper
            this.updateSystemStatus('Loading Whisper model...', 'info');
            this.elements.initStatus.textContent = 'Loading Whisper model... This may take a minute on first load.';
            await this.whisper.initialize((progress) => {
                this.elements.initStatus.textContent = `Loading Whisper: ${progress}`;
            });

            // Initialize LLM
            const provider = this.elements.llmProvider.value;
            const config = {
                provider,
                apiKey: this.elements.apiKey.value,
                endpoint: this.elements.apiEndpoint.value,
                model: this.elements.webllmModel.value
            };

            this.updateSystemStatus('Loading LLM...', 'info');
            this.elements.initStatus.textContent = 'Loading LLM...';
            
            await this.llm.initialize(config, (progress) => {
                this.elements.initStatus.textContent = `Loading LLM: ${progress}`;
            });

            // Initialize TTS
            this.updateSystemStatus('Initializing Text-to-Speech...', 'info');
            await this.tts.initialize();

            this.isInitialized = true;
            this.updateSystemStatus('✅ System ready! You can now record or type messages.', 'success');
            this.elements.initStatus.style.display = 'none';
            
            // Enable controls
            this.elements.recordBtn.disabled = false;
            this.elements.sendBtn.disabled = false;
            
        } catch (error) {
            console.error('Initialization error:', error);
            this.updateSystemStatus(`❌ Error: ${error.message}`, 'error');
            this.elements.initStatus.textContent = `Error: ${error.message}`;
            this.elements.initBtn.disabled = false;
        }
    }

    async startRecording() {
        try {
            this.elements.recordBtn.disabled = true;
            this.elements.stopBtn.disabled = false;
            this.elements.recordingIndicator.classList.add('active');
            
            await this.whisper.startRecording();
            this.isRecording = true;
            this.updateAudioStatus('🎤 Recording... Speak now!', 'info');
            
        } catch (error) {
            console.error('Recording error:', error);
            this.updateAudioStatus(`Error: ${error.message}`, 'error');
            this.elements.recordBtn.disabled = false;
            this.elements.stopBtn.disabled = true;
            this.elements.recordingIndicator.classList.remove('active');
        }
    }

    async stopRecording() {
        try {
            this.elements.stopBtn.disabled = true;
            this.elements.recordingIndicator.classList.remove('active');
            this.updateAudioStatus('⏳ Processing audio...', 'info');
            
            const transcription = await this.whisper.stopRecording();
            this.isRecording = false;
            
            if (transcription && transcription.trim()) {
                this.updateAudioStatus(`✅ Transcribed: "${transcription}"`, 'success');
                this.addMessage(transcription, 'transcription');
                this.elements.textInput.value = transcription;
                
                // Automatically send the transcribed message
                await this.sendMessage();
            } else {
                this.updateAudioStatus('No speech detected. Please try again.', 'error');
            }
            
            this.elements.recordBtn.disabled = false;
            
        } catch (error) {
            console.error('Stop recording error:', error);
            this.updateAudioStatus(`Error: ${error.message}`, 'error');
            this.elements.recordBtn.disabled = false;
            this.elements.stopBtn.disabled = true;
        }
    }

    async sendMessage() {
        const message = this.elements.textInput.value.trim();
        if (!message) return;

        try {
            this.elements.sendBtn.disabled = true;
            this.elements.textInput.disabled = true;
            
            // Add user message to chat
            this.addMessage(message, 'user');
            this.elements.textInput.value = '';
            
            // Add to conversation history
            this.conversationHistory.push({ role: 'user', content: message });
            
            // Get LLM response
            this.updateSystemStatus('🤔 Thinking...', 'info');
            const response = await this.llm.generateResponse(this.conversationHistory);
            
            this.lastResponse = response;
            this.conversationHistory.push({ role: 'assistant', content: response });
            
            // Add assistant response to chat
            this.addMessage(response, 'assistant');
            
            this.updateSystemStatus('✅ Response generated!', 'success');
            this.elements.speakBtn.disabled = false;
            
        } catch (error) {
            console.error('Send message error:', error);
            this.updateSystemStatus(`❌ Error: ${error.message}`, 'error');
            this.addMessage(`Error: ${error.message}`, 'assistant');
        } finally {
            this.elements.sendBtn.disabled = false;
            this.elements.textInput.disabled = false;
            this.elements.textInput.focus();
        }
    }

    async speakLastResponse() {
        if (!this.lastResponse) return;

        try {
            this.elements.speakBtn.disabled = true;
            this.updateSystemStatus('🔊 Speaking...', 'info');
            
            await this.tts.speak(this.lastResponse);
            
            this.updateSystemStatus('✅ Speech completed!', 'success');
            this.elements.speakBtn.disabled = false;
            
        } catch (error) {
            console.error('TTS error:', error);
            this.updateSystemStatus(`❌ TTS Error: ${error.message}`, 'error');
            this.elements.speakBtn.disabled = false;
        }
    }

    clearChat() {
        this.conversationHistory = [];
        this.lastResponse = '';
        this.elements.chatContainer.innerHTML = '';
        this.elements.speakBtn.disabled = true;
        this.updateSystemStatus('Chat cleared.', 'info');
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = text;
        
        this.elements.chatContainer.appendChild(messageDiv);
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    }

    updateSystemStatus(message, type) {
        this.elements.systemStatus.textContent = message;
        this.elements.systemStatus.className = `status status-${type}`;
    }

    updateAudioStatus(message, type) {
        this.elements.audioStatus.textContent = message;
        this.elements.audioStatus.className = `status status-${type}`;
        this.elements.audioStatus.style.display = 'block';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.voiceAssistant = new VoiceAssistant();
});
