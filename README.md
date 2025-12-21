# WebLLM with Voice 🎤🤖🔊

A real-time voice assistant combining **Whisper WebGPU** speech recognition, **Edge TTS** text-to-speech, and flexible **LLM integration** - all running in your browser with pure JavaScript!

## 🌟 Features

- **🎙️ Real-time Speech Recognition** - Powered by Whisper with WebGPU acceleration
- **🔊 Text-to-Speech** - Natural voice synthesis using Web Speech API (Edge voices)
- **🤖 Multiple LLM Options**:
  - **Local Models** (WebLLM): Phi-3.5, Phi-3, Gemma-2, Llama-3.2 - runs entirely in browser
  - **Cloud APIs**: Google Gemini, OpenAI, and custom endpoints
  - **Dify Integration**: Connect to Dify workflows and agents
- **⚡ WebGPU Acceleration** - Fast inference for both speech and language models
- **💬 Interactive Chat Interface** - Seamless conversation with context awareness
- **🎨 Modern UI** - Beautiful, responsive design with real-time status updates

## 🚀 Quick Start

### Prerequisites

- **Modern Browser** with WebGPU support:
  - Chrome/Edge 113+
  - Enable WebGPU: `chrome://flags/#enable-unsafe-webgpu`
- **Node.js** 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucahttp/WebLLMWithVoice.git
cd WebLLMWithVoice
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

> **Note:** The `--legacy-peer-deps` flag is needed due to peer dependency conflicts in some packages.

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 📖 Usage Guide

### 1. Initialize the System

1. Select your preferred **LLM Provider**:
   - **WebLLM (Local)** - No API key needed, runs in browser
   - **Google Gemini** - Requires Gemini API key
   - **OpenAI** - Requires OpenAI API key
   - **Dify** - Requires custom endpoint and API key

2. If using **WebLLM**, select a model:
   - `Phi-3.5-mini` (Recommended) - Good balance of speed and quality
   - `Phi-3-mini` - Fast and efficient
   - `Gemma-2-2b` - Compact and capable
   - `Llama-3.2-1B` - Smallest and fastest

3. Enter API credentials if using cloud providers

4. Click **"🚀 Initialize System"** and wait for models to load (first load may take 1-2 minutes)

### 2. Voice Interaction

**Option A: Voice Input**
1. Click **"🎤 Start Recording"**
2. Speak your message
3. Click **"⏹️ Stop Recording"**
4. The system will transcribe your speech and automatically send it to the LLM

**Option B: Text Input**
1. Type your message in the text area
2. Click **"📤 Send Message"** or press Enter

### 3. Hear the Response

- After receiving a response, click **"🔊 Speak Response"** to hear it spoken aloud
- The TTS uses high-quality Microsoft Edge voices when available

### 4. Clear and Reset

- Click **"🗑️ Clear Chat"** to start a new conversation

## 🔧 Configuration

### Using Local Models (WebLLM)

WebLLM runs entirely in your browser using WebAssembly and WebGPU:

**Advantages:**
- ✅ No API costs
- ✅ Complete privacy (data never leaves your browser)
- ✅ Works offline after initial model download
- ✅ Fast inference with WebGPU

**Requirements:**
- WebGPU-enabled browser
- Good GPU (integrated GPUs work but may be slower)
- 2-8GB available RAM depending on model

### Using Cloud APIs

#### Google Gemini
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Select "Google Gemini API" as provider
3. Enter your API key
4. Initialize the system

#### OpenAI
1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Select "OpenAI API" as provider
3. Enter your API key
4. Initialize the system (uses GPT-3.5-turbo by default)

#### Dify Custom Endpoint
1. Set up your [Dify](https://dify.ai/) instance
2. Create a chatbot application
3. Get the API endpoint and key from Dify
4. Select "Dify Custom Endpoint" as provider
5. Enter both endpoint URL and API key
6. Initialize the system

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│          User Interface (HTML)          │
├─────────────────────────────────────────┤
│         Main Controller (main.js)       │
├──────────┬──────────┬──────────────────┤
│ Whisper  │   TTS    │   LLM Manager    │
│ Manager  │ Manager  │                  │
├──────────┼──────────┼────────┬─────────┤
│ WebGPU   │   Web    │ WebLLM │  Cloud  │
│ Speech   │  Speech  │ (Local)│  APIs   │
│ Recognition│  API   │        │         │
└──────────┴──────────┴────────┴─────────┘
```

### Components

- **`main.js`** - Main application controller, UI management
- **`whisper.js`** - Speech recognition using Transformers.js with WebGPU
- **`tts.js`** - Text-to-speech using Web Speech API
- **`llm.js`** - LLM integration layer supporting multiple providers

## 🎯 Use Cases

- **Voice Assistants** - Build custom voice-controlled AI assistants
- **Accessibility Tools** - Voice-driven interfaces for accessibility
- **Language Learning** - Practice conversations with AI
- **Meeting Summaries** - Record and transcribe discussions with AI insights
- **Content Creation** - Voice-to-text with AI enhancement
- **Customer Support** - Interactive voice-based support bots

## 🔒 Privacy & Security

- **Local Models**: When using WebLLM, all processing happens in your browser. No data is sent to external servers.
- **Cloud APIs**: When using cloud providers, your conversations are sent to their servers according to their privacy policies.
- **API Keys**: Store API keys securely and never commit them to version control.

## 🛠️ Development

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Technologies Used

- **[@xenova/transformers](https://github.com/xenova/transformers.js)** - WebGPU-accelerated Whisper models
- **[@mlc-ai/web-llm](https://github.com/mlc-ai/web-llm)** - Browser-based LLM inference
- **Web Speech API** - Browser-native text-to-speech
- **WebGPU** - GPU acceleration for ML models
- **Vite** - Fast build tool and dev server

## 🐛 Troubleshooting

### "WebGPU is not supported"
- Make sure you're using Chrome/Edge 113+
- Enable WebGPU in `chrome://flags/#enable-unsafe-webgpu`
- Restart your browser

### Models loading slowly
- First load downloads models (100MB-1GB) and caches them
- Subsequent loads are much faster
- Check your internet connection

### Microphone not working
- Grant microphone permissions when prompted
- Check browser settings for microphone access
- Ensure no other application is using the microphone

### WebLLM initialization fails
- Ensure sufficient RAM (4GB+ recommended)
- Try a smaller model like Llama-3.2-1B
- Check browser console for specific errors

### TTS not working
- Some browsers have limited voice options
- Check if voices are available in your browser
- Try different browsers (Edge has best voice quality)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Whisper models by OpenAI
- Transformers.js by Xenova
- WebLLM by MLC AI
- All the amazing open-source AI models and tools

## 📧 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/lucahttp/WebLLMWithVoice/issues) on GitHub.

---

**Made with ❤️ for the AI community**