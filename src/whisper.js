import { pipeline } from '@xenova/transformers';

export class WhisperManager {
    constructor() {
        this.transcriber = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isInitialized = false;
    }

    async initialize(progressCallback) {
        try {
            if (this.isInitialized) return;

            progressCallback?.('Downloading Whisper model...');
            
            // Initialize the Whisper model with WebGPU support
            // Using distil-whisper for faster performance
            this.transcriber = await pipeline(
                'automatic-speech-recognition',
                'Xenova/whisper-tiny.en',
                {
                    device: 'webgpu',
                    dtype: 'fp32',
                    progress_callback: (progress) => {
                        if (progress.status === 'progress') {
                            const percent = Math.round((progress.loaded / progress.total) * 100);
                            progressCallback?.(`Downloading: ${percent}%`);
                        } else if (progress.status === 'ready') {
                            progressCallback?.('Model ready!');
                        }
                    }
                }
            );

            this.isInitialized = true;
            progressCallback?.('Whisper initialized!');
            
        } catch (error) {
            console.error('Whisper initialization error:', error);
            
            // Fallback to CPU if WebGPU fails
            try {
                progressCallback?.('WebGPU failed, falling back to CPU...');
                this.transcriber = await pipeline(
                    'automatic-speech-recognition',
                    'Xenova/whisper-tiny.en',
                    {
                        progress_callback: (progress) => {
                            if (progress.status === 'progress') {
                                const percent = Math.round((progress.loaded / progress.total) * 100);
                                progressCallback?.(`Downloading (CPU): ${percent}%`);
                            }
                        }
                    }
                );
                this.isInitialized = true;
                progressCallback?.('Whisper initialized (CPU mode)!');
            } catch (cpuError) {
                throw new Error(`Failed to initialize Whisper: ${cpuError.message}`);
            }
        }
    }

    async startRecording() {
        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    channelCount: 1,
                    sampleRate: 16000,
                    echoCancellation: true,
                    noiseSuppression: true
                } 
            });

            this.audioChunks = [];
            
            // Create MediaRecorder
            this.mediaRecorder = new MediaRecorder(stream);
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.start();
            
        } catch (error) {
            throw new Error(`Microphone access denied or not available: ${error.message}`);
        }
    }

    async stopRecording() {
        return new Promise((resolve, reject) => {
            if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
                reject(new Error('No active recording'));
                return;
            }

            this.mediaRecorder.onstop = async () => {
                try {
                    // Stop all tracks
                    this.mediaRecorder.stream.getTracks().forEach(track => track.stop());

                    // Create blob from recorded chunks
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                    
                    // Convert to format suitable for Whisper
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    
                    await new Promise((res) => {
                        audio.onloadedmetadata = res;
                    });

                    // Transcribe the audio
                    const transcription = await this.transcribe(audioUrl);
                    
                    URL.revokeObjectURL(audioUrl);
                    resolve(transcription);
                    
                } catch (error) {
                    reject(error);
                }
            };

            this.mediaRecorder.stop();
        });
    }

    async transcribe(audioUrl) {
        try {
            if (!this.transcriber) {
                throw new Error('Whisper model not initialized');
            }

            // Transcribe the audio
            const result = await this.transcriber(audioUrl, {
                chunk_length_s: 30,
                stride_length_s: 5,
                language: 'english',
                task: 'transcribe'
            });

            return result.text.trim();
            
        } catch (error) {
            console.error('Transcription error:', error);
            throw new Error(`Transcription failed: ${error.message}`);
        }
    }

    // Method for transcribing from URL (for testing)
    async transcribeFromUrl(url) {
        return await this.transcribe(url);
    }
}
