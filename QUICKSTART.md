# Quick Start Guide

Get up and running with WebLLM with Voice in 5 minutes!

## 🚀 Super Quick Start (Local Model)

This is the fastest way to get started with complete privacy.

### 1. Install

```bash
git clone https://github.com/lucahttp/WebLLMWithVoice.git
cd WebLLMWithVoice
npm install
npm run dev
```

### 2. Enable WebGPU (One-time setup)

**Chrome/Edge:**
1. Open `chrome://flags` (or `edge://flags`)
2. Search for "WebGPU"
3. Enable "Unsafe WebGPU" flag
4. Restart browser

### 3. Initialize

1. Browser opens to `http://localhost:3000`
2. Select "WebLLM (Local - Phi/Gemma)" (default)
3. Click "🚀 Initialize System"
4. Wait 1-2 minutes (first time only - downloads model)

### 4. Start Talking!

**Voice Input:**
1. Click "🎤 Start Recording"
2. Say: "Hello, how are you?"
3. Click "⏹️ Stop Recording"
4. Watch magic happen! ✨

**Text Input:**
1. Type in the text box
2. Press Enter or click "📤 Send"

**Hear Response:**
- Click "🔊 Speak Response" to hear AI voice

## 📱 Quick Start (Cloud API - Faster)

If you want faster responses and have an API key:

### 1. Get API Key

**Google Gemini (Easiest):**
- Go to https://makersuite.google.com/app/apikey
- Click "Create API key"
- Copy the key

**OpenAI:**
- Go to https://platform.openai.com/api-keys
- Create new secret key
- Copy the key

### 2. Configure

1. In the web app, select "Google Gemini API" or "OpenAI API"
2. Paste your API key
3. Click "🚀 Initialize System"
4. Start chatting immediately (no download wait)

## 🎯 Common Use Cases

### Use Case 1: Voice Notes
```
1. Click record
2. Speak your thoughts
3. Get transcription instantly
4. Ask AI to summarize or organize
```

### Use Case 2: Quick Questions
```
You: "What's the capital of France?"
AI: Responds with answer
Click "Speak Response" to hear it
```

### Use Case 3: Conversation Practice
```
You: "Let's practice Spanish"
AI: Responds in Spanish
Continue natural conversation
```

## ⚙️ Recommended Settings

### For Best Quality
- Provider: Google Gemini API
- Always get latest information
- Fast responses
- High quality answers

### For Privacy
- Provider: WebLLM (Local)
- Model: Phi-3.5-mini
- Everything runs in browser
- No data sent to servers

### For Speed (on slower devices)
- Provider: WebLLM (Local)
- Model: Llama-3.2-1B
- Smallest, fastest model
- Good for simple tasks

## 🔧 Troubleshooting

### "WebGPU is not supported"
✅ **Solution:** Enable WebGPU in browser flags (see step 2 above)

### Models loading slowly
✅ **Solution:** First load downloads models, be patient. Subsequent loads are instant.

### Microphone not working
✅ **Solution:** Allow microphone access when browser prompts. Check no other app is using it.

### "Failed to initialize"
✅ **Solutions:**
- Check internet connection (for first load)
- Try smaller model (Llama-3.2-1B)
- Restart browser
- Clear browser cache

### Poor transcription accuracy
✅ **Solutions:**
- Speak clearly and slower
- Reduce background noise
- Move closer to microphone
- Check microphone quality

## 📊 Performance Expectations

### Local Models (WebLLM)
- **First Load:** 1-2 minutes (downloads model)
- **Subsequent Loads:** 10-30 seconds (from cache)
- **Response Time:** 2-10 seconds depending on model
- **Requires:** Good GPU, 4GB+ RAM

### Cloud APIs
- **Initialization:** Instant
- **Response Time:** 1-3 seconds
- **Requires:** Internet connection, API key

### Whisper Transcription
- **First Load:** 30-60 seconds (downloads model)
- **Subsequent Loads:** 5-10 seconds
- **Transcription Time:** 1-3 seconds per 10 seconds of audio

## 💡 Pro Tips

1. **First time?** Use Gemini API for instant gratification
2. **Privacy concerned?** Switch to WebLLM after trying cloud
3. **Slow computer?** Use Llama-3.2-1B model
4. **Best voice quality?** Use Microsoft Edge browser
5. **Long conversations?** Clear chat periodically for better performance
6. **Testing features?** Use text input first, then try voice
7. **Custom workflows?** Check out Dify integration

## 🎓 Next Steps

After getting started:

1. **Read [README.md](README.md)** for detailed documentation
2. **Check [EXAMPLES.md](EXAMPLES.md)** for usage examples
3. **Review [API.md](API.md)** if building on top of this
4. **Join discussions** on GitHub for tips and tricks

## 🆘 Still Need Help?

1. Check the full [README.md](README.md) troubleshooting section
2. Review [EXAMPLES.md](EXAMPLES.md) for detailed use cases
3. Open an issue on GitHub with:
   - Your browser version
   - Error messages
   - What you were trying to do

## 🎉 Success!

You're now ready to use AI-powered voice conversations!

Try asking:
- "Explain quantum computing"
- "Write a poem about coding"
- "What are the benefits of exercise?"
- "Teach me something interesting"

Have fun exploring! 🚀

---

**Time to first response:** 
- Cloud API: ~2 minutes
- Local Model: ~3 minutes (including model download)

**Worth it?** Absolutely! ✨
