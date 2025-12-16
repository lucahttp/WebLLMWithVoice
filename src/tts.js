export class TTSManager {
    constructor() {
        this.isInitialized = false;
        this.audioContext = null;
        this.currentAudio = null;
        this.voices = [];
        this.selectedVoice = null;
    }

    async initialize() {
        try {
            // Initialize Web Speech API for TTS
            if ('speechSynthesis' in window) {
                // Get available voices
                this.voices = speechSynthesis.getVoices();
                
                // If voices aren't loaded yet, wait for them
                if (this.voices.length === 0) {
                    await new Promise((resolve) => {
                        speechSynthesis.onvoiceschanged = () => {
                            this.voices = speechSynthesis.getVoices();
                            resolve();
                        };
                    });
                }

                // Select a good English voice (prefer Edge voices if available)
                this.selectedVoice = this.voices.find(voice => 
                    voice.name.includes('Microsoft') && voice.lang.startsWith('en')
                ) || this.voices.find(voice => 
                    voice.lang.startsWith('en')
                ) || this.voices[0];

                console.log('Selected voice:', this.selectedVoice?.name);
                
                this.isInitialized = true;
            } else {
                throw new Error('Text-to-Speech not supported in this browser');
            }
            
        } catch (error) {
            console.error('TTS initialization error:', error);
            throw new Error(`TTS initialization failed: ${error.message}`);
        }
    }

    async speak(text, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                if (!this.isInitialized) {
                    reject(new Error('TTS not initialized'));
                    return;
                }

                // Cancel any ongoing speech
                speechSynthesis.cancel();

                // Create utterance
                const utterance = new SpeechSynthesisUtterance(text);
                
                // Configure voice
                if (this.selectedVoice) {
                    utterance.voice = this.selectedVoice;
                }
                
                // Configure speech parameters
                utterance.rate = options.rate || 1.0;
                utterance.pitch = options.pitch || 1.0;
                utterance.volume = options.volume || 1.0;
                utterance.lang = options.lang || 'en-US';

                // Set up event handlers
                utterance.onend = () => {
                    resolve();
                };

                utterance.onerror = (event) => {
                    reject(new Error(`Speech synthesis error: ${event.error}`));
                };

                // Speak
                speechSynthesis.speak(utterance);
                
            } catch (error) {
                reject(error);
            }
        });
    }

    stop() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
    }

    getVoices() {
        return this.voices;
    }

    setVoice(voiceName) {
        const voice = this.voices.find(v => v.name === voiceName);
        if (voice) {
            this.selectedVoice = voice;
            return true;
        }
        return false;
    }
}

// Alternative implementation using Edge TTS API (requires server-side proxy)
export class EdgeTTSManager {
    constructor() {
        this.isInitialized = false;
        this.apiEndpoint = null;
    }

    async initialize(apiEndpoint = null) {
        this.apiEndpoint = apiEndpoint || '/api/tts'; // Requires a backend proxy
        this.isInitialized = true;
    }

    async speak(text, voice = 'en-US-AriaNeural') {
        try {
            if (!this.isInitialized) {
                throw new Error('Edge TTS not initialized');
            }

            // This would require a backend proxy to Edge TTS API
            // For now, we'll use the Web Speech API as fallback
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    voice
                })
            });

            if (!response.ok) {
                throw new Error('Edge TTS API request failed');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            
            return new Promise((resolve, reject) => {
                const audio = new Audio(audioUrl);
                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    resolve();
                };
                audio.onerror = reject;
                audio.play();
            });
            
        } catch (error) {
            console.error('Edge TTS error:', error);
            throw error;
        }
    }
}
