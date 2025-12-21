# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-16

### Added
- Initial release of WebLLM with Voice
- Real-time speech recognition using Whisper with WebGPU acceleration
- Text-to-speech synthesis using Web Speech API
- Multiple LLM provider support:
  - WebLLM for local inference (Phi-3.5, Phi-3, Gemma-2, Llama-3.2)
  - Google Gemini API integration
  - OpenAI API integration
  - Dify custom endpoint support
- Interactive chat interface with conversation history
- Voice recording and transcription workflow
- Real-time status updates and progress indicators
- Comprehensive documentation:
  - README with setup and usage instructions
  - QUICKSTART guide for new users
  - EXAMPLES with practical use cases
  - API documentation for developers
  - SECURITY policy and best practices
  - CONTRIBUTING guidelines
- Vite-based build system with optimizations
- GitHub Pages deployment workflow
- Environment variable configuration with examples
- Beautiful, responsive UI with modern design
- Cross-Origin headers for WebGPU compatibility

### Features
- 🎙️ One-click voice recording
- 🔊 Natural text-to-speech playback
- 🤖 Flexible LLM selection (local or cloud)
- 💬 Context-aware conversations
- ⚡ WebGPU hardware acceleration
- 🎨 Modern gradient UI design
- 📱 Mobile-responsive layout
- 🔒 Privacy-focused local option
- 🌐 Multi-provider cloud support
- 📊 Real-time progress tracking

### Technical Details
- Whisper model: whisper-tiny.en for fast transcription
- WebLLM models: 1B-3.5B parameter range
- Browser requirements: Chrome/Edge 113+ with WebGPU
- Built with: Vanilla JavaScript (ES6+), Vite, HTML5, CSS3
- Dependencies: @mlc-ai/web-llm, @xenova/transformers

### Documentation
- Complete API reference
- Step-by-step quick start guide
- Practical usage examples
- Security best practices
- Contributing guidelines
- Troubleshooting section

### Known Limitations
- WebGPU required for optimal performance
- First model load requires internet connection
- Large model downloads (100MB-4GB depending on model)
- WebGPU marked as "unsafe" in some browsers (experimental)
- English-only Whisper model in initial release

### Browser Support
- ✅ Chrome 113+ (recommended)
- ✅ Edge 113+ (recommended)
- ⚠️ Firefox (CPU mode only, WebGPU experimental)
- ⚠️ Safari (CPU mode only, WebGPU coming soon)

### Future Roadmap
- [ ] Multi-language Whisper support
- [ ] Voice activity detection (VAD)
- [ ] Streaming LLM responses
- [ ] More LLM providers (Anthropic Claude, etc.)
- [ ] Custom voice selection for TTS
- [ ] Conversation export/import
- [ ] Mobile app versions
- [ ] Server-side Edge TTS integration
- [ ] Advanced prompt engineering UI
- [ ] Fine-tuning support
- [ ] Plugin system for extensions
- [ ] Analytics and usage tracking (opt-in)

## [Unreleased]

### Planned
- Multi-language support for Whisper
- Voice activity detection
- Streaming responses for faster interaction
- Additional LLM providers
- Custom system prompts interface
- Conversation management (save/load)
- Enhanced error recovery
- Performance optimizations
- TypeScript migration
- Unit and integration tests
- Docker deployment option
- More example use cases
- Video tutorials

---

For more details on each release, see the [GitHub releases page](https://github.com/lucahttp/WebLLMWithVoice/releases).

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute to this project.

### Security

See [SECURITY.md](SECURITY.md) for security policy and vulnerability reporting.
