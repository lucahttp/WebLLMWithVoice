# API Documentation

This document describes the JavaScript APIs and classes used in WebLLM with Voice.

## Main Classes

### VoiceAssistant

The main controller class that orchestrates all components.

```javascript
const assistant = new VoiceAssistant();
```

#### Methods

- `initialize()` - Initialize all subsystems (Whisper, LLM, TTS)
- `startRecording()` - Begin audio recording
- `stopRecording()` - Stop recording and transcribe
- `sendMessage()` - Send text message to LLM
- `speakLastResponse()` - Speak the last AI response
- `clearChat()` - Clear conversation history

## WhisperManager

Handles speech-to-text transcription using Whisper with WebGPU acceleration.

### Constructor

```javascript
import { WhisperManager } from './whisper.js';
const whisper = new WhisperManager();
```

### Methods

#### `initialize(progressCallback)`

Initialize the Whisper model.

**Parameters:**
- `progressCallback` (Function, optional): Callback for loading progress
  - Called with progress messages as strings

**Returns:** Promise that resolves when initialized

**Example:**
```javascript
await whisper.initialize((progress) => {
  console.log('Loading:', progress);
});
```

#### `startRecording()`

Start recording audio from the microphone.

**Returns:** Promise that resolves when recording starts

**Throws:** Error if microphone access is denied

**Example:**
```javascript
await whisper.startRecording();
console.log('Recording started');
```

#### `stopRecording()`

Stop recording and transcribe the audio.

**Returns:** Promise that resolves with transcription text (string)

**Example:**
```javascript
const transcription = await whisper.stopRecording();
console.log('You said:', transcription);
```

#### `transcribeFromUrl(url)`

Transcribe audio from a URL (for testing).

**Parameters:**
- `url` (string): URL to audio file

**Returns:** Promise that resolves with transcription text

**Example:**
```javascript
const text = await whisper.transcribeFromUrl('https://example.com/audio.mp3');
```

## TTSManager

Handles text-to-speech synthesis using Web Speech API.

### Constructor

```javascript
import { TTSManager } from './tts.js';
const tts = new TTSManager();
```

### Methods

#### `initialize()`

Initialize the TTS system and load available voices.

**Returns:** Promise that resolves when initialized

**Example:**
```javascript
await tts.initialize();
console.log('TTS ready');
```

#### `speak(text, options)`

Speak the given text.

**Parameters:**
- `text` (string): Text to speak
- `options` (object, optional):
  - `rate` (number): Speech rate (0.1 to 10, default: 1.0)
  - `pitch` (number): Speech pitch (0 to 2, default: 1.0)
  - `volume` (number): Speech volume (0 to 1, default: 1.0)
  - `lang` (string): Language code (default: 'en-US')

**Returns:** Promise that resolves when speech completes

**Example:**
```javascript
await tts.speak('Hello, world!', {
  rate: 1.2,
  pitch: 1.0,
  volume: 0.8
});
```

#### `stop()`

Stop any ongoing speech.

**Example:**
```javascript
tts.stop();
```

#### `getVoices()`

Get available voices.

**Returns:** Array of SpeechSynthesisVoice objects

**Example:**
```javascript
const voices = tts.getVoices();
voices.forEach(voice => {
  console.log(voice.name, voice.lang);
});
```

#### `setVoice(voiceName)`

Set the voice to use for speech.

**Parameters:**
- `voiceName` (string): Name of the voice

**Returns:** boolean - true if voice found and set

**Example:**
```javascript
const success = tts.setVoice('Microsoft David - English (United States)');
```

## LLMManager

Handles LLM interactions with support for multiple providers.

### Constructor

```javascript
import { LLMManager } from './llm.js';
const llm = new LLMManager();
```

### Methods

#### `initialize(config, progressCallback)`

Initialize the LLM with the specified provider.

**Parameters:**
- `config` (object):
  - `provider` (string): 'webllm', 'gemini', 'openai', or 'dify'
  - `apiKey` (string, optional): API key for cloud providers
  - `endpoint` (string, optional): Custom endpoint for Dify
  - `model` (string, optional): Model ID for WebLLM
- `progressCallback` (Function, optional): Callback for loading progress

**Returns:** Promise that resolves when initialized

**Example:**
```javascript
// WebLLM (local)
await llm.initialize({
  provider: 'webllm',
  model: 'Phi-3.5-mini-instruct-q4f16_1-MLC'
}, (progress) => {
  console.log('Loading:', progress);
});

// Gemini
await llm.initialize({
  provider: 'gemini',
  apiKey: 'YOUR_API_KEY'
});

// Dify
await llm.initialize({
  provider: 'dify',
  endpoint: 'https://your-dify.com/api',
  apiKey: 'YOUR_API_KEY'
});
```

#### `generateResponse(conversationHistory)`

Generate a response based on conversation history.

**Parameters:**
- `conversationHistory` (Array): Array of message objects
  - Each object has `role` ('user' or 'assistant') and `content` (string)

**Returns:** Promise that resolves with response text (string)

**Example:**
```javascript
const history = [
  { role: 'user', content: 'Hello!' },
  { role: 'assistant', content: 'Hi! How can I help?' },
  { role: 'user', content: 'What is AI?' }
];

const response = await llm.generateResponse(history);
console.log('AI:', response);
```

#### `cleanup()`

Clean up resources (especially for WebLLM).

**Example:**
```javascript
await llm.cleanup();
```

## Configuration Objects

### WebLLM Models

Available models for local inference:

```javascript
const models = [
  'Phi-3.5-mini-instruct-q4f16_1-MLC',  // Recommended
  'Phi-3-mini-4k-instruct-q4f16_1-MLC',
  'gemma-2-2b-it-q4f16_1-MLC',
  'Llama-3.2-1B-Instruct-q4f16_1-MLC'
];
```

### Message Format

```javascript
{
  role: 'user' | 'assistant',
  content: string
}
```

## Events and Callbacks

### Progress Callbacks

All initialization methods accept progress callbacks:

```javascript
function progressCallback(message) {
  // message is a string describing current progress
  console.log('Progress:', message);
  updateUIStatus(message);
}
```

## Error Handling

All async methods may throw errors. Always use try-catch:

```javascript
try {
  await whisper.initialize();
  await whisper.startRecording();
  const text = await whisper.stopRecording();
  console.log(text);
} catch (error) {
  console.error('Error:', error.message);
  // Handle error appropriately
}
```

## Common Error Types

- **WebGPU not supported**: User's browser doesn't support WebGPU
- **Microphone access denied**: User denied microphone permissions
- **Model loading failed**: Network issue or incompatible browser
- **API key invalid**: Invalid or missing API key for cloud providers
- **Transcription failed**: Audio quality too low or no speech detected

## Performance Tips

### Whisper
- First initialization downloads ~100MB model
- Subsequent loads are instant (cached)
- WebGPU provides 5-10x speedup over CPU
- Shorter audio clips (< 30s) transcribe faster

### LLM
- WebLLM first load downloads 1-4GB depending on model
- Models are cached in browser storage
- Smaller models (1-2B parameters) are faster
- Cloud APIs have lower latency but require internet

### TTS
- Web Speech API is instant
- No initialization delay
- Uses native browser/OS voices
- Microsoft Edge has highest quality voices

## Browser Compatibility

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| WebGPU  | 113+   | 113+ | 🔜 Exp  | 🔜 Exp |
| Whisper | ✅     | ✅   | ⚠️ CPU  | ⚠️ CPU |
| WebLLM  | ✅     | ✅   | ⚠️ CPU  | ⚠️ CPU |
| Web Speech | ✅  | ✅   | ✅      | ✅     |
| MediaRecorder | ✅ | ✅  | ✅      | ✅     |

✅ Full support | ⚠️ Partial support | 🔜 Coming soon | ❌ Not supported

## Advanced Usage

### Custom Model Integration

You can extend the LLMManager to support additional providers:

```javascript
class CustomLLMManager extends LLMManager {
  async initializeCustomProvider(config) {
    // Your custom initialization
  }
  
  async generateCustom(history) {
    // Your custom generation
  }
}
```

### Stream Responses

For providers that support streaming:

```javascript
// This would need to be implemented
async streamResponse(history, onChunk) {
  // Call onChunk for each token received
}
```

### Multi-Language Support

Whisper supports multiple languages:

```javascript
const result = await this.transcriber(audioUrl, {
  language: 'spanish',  // or 'french', 'german', etc.
  task: 'transcribe'
});
```

## Security Considerations

- Never commit API keys to version control
- Store API keys securely (environment variables)
- Validate user input before sending to LLMs
- Be aware of rate limits on cloud APIs
- Consider data privacy with cloud providers
- Local models (WebLLM) keep all data in browser

## Testing

### Unit Test Example

```javascript
import { WhisperManager } from './whisper.js';

async function testWhisper() {
  const whisper = new WhisperManager();
  await whisper.initialize();
  
  const text = await whisper.transcribeFromUrl('./test-audio.mp3');
  console.assert(text.includes('expected phrase'));
}
```

## Support

For issues or questions:
- Check [EXAMPLES.md](EXAMPLES.md) for usage examples
- Review [README.md](README.md) troubleshooting section
- Open an issue on GitHub

---

**Last Updated:** 2024
**Version:** 1.0.0
