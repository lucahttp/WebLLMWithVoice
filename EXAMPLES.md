# Usage Examples

This document provides practical examples of using WebLLM with Voice.

## Example 1: Quick Voice Chat (Local Model)

**Use Case:** Privacy-focused voice assistant running entirely in your browser.

**Setup:**
1. Select "WebLLM (Local - Phi/Gemma)" as provider
2. Choose "Phi-3.5-mini" model
3. Click "Initialize System" (wait 1-2 minutes for first load)

**Usage:**
1. Click "Start Recording"
2. Say: "What is artificial intelligence?"
3. Click "Stop Recording"
4. Wait for the transcription and response
5. Click "Speak Response" to hear the answer

**Benefits:**
- No API costs
- Complete privacy
- Works offline after initial download

## Example 2: Google Gemini Integration

**Use Case:** Powerful cloud-based responses with latest knowledge.

**Setup:**
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Select "Google Gemini API" as provider
3. Enter your API key
4. Click "Initialize System"

**Usage:**
1. Type or speak: "Explain quantum computing in simple terms"
2. Get comprehensive response from Gemini
3. Continue conversation with context awareness

**Benefits:**
- State-of-the-art responses
- Large context window
- Latest information

## Example 3: Custom Workflow with Dify

**Use Case:** Integrate with custom business logic and workflows.

**Setup:**
1. Set up a Dify instance (cloud or self-hosted)
2. Create a chatbot application in Dify
3. Get the API endpoint and key
4. Select "Dify Custom Endpoint" as provider
5. Enter endpoint URL: `https://your-dify.com/api`
6. Enter API key
7. Click "Initialize System"

**Usage:**
1. Voice or text input gets processed through Dify
2. Dify can integrate with:
   - Your knowledge bases
   - Custom tools and APIs
   - Business logic and workflows
   - Multiple LLM providers

**Benefits:**
- Custom business integration
- Advanced workflow capabilities
- Knowledge base integration
- Multi-LLM orchestration

## Example 4: Language Learning Assistant

**Setup:**
1. Use any provider (WebLLM recommended for privacy)
2. Initialize the system

**Usage:**
```
You: "I want to practice Spanish conversation"
AI: "¡Perfecto! Podemos practicar español. ¿Qué te gustaría hacer?"
You: "How do I order coffee in Spanish?"
AI: "To order coffee in Spanish, you can say: 'Me gustaría un café, por favor'..."
```

3. Use "Speak Response" to hear pronunciation
4. Practice speaking with voice input
5. Get corrections and explanations

## Example 5: Meeting Notes Assistant

**Use Case:** Record discussions and get AI summaries.

**Setup:**
1. Choose any LLM provider
2. Initialize system

**Usage:**
1. Start recording at beginning of meeting
2. Stop recording after key discussion points
3. Transcription appears automatically
4. Ask AI: "Summarize the key points from what I just said"
5. Get action items: "What are the action items?"
6. Export conversation for notes

## Example 6: Content Creation Helper

**Workflow:**
1. Speak your ideas: "I want to write a blog post about sustainable living"
2. AI provides outline
3. Speak: "Expand on the first point"
4. AI provides detailed content
5. Continue refining with voice and text
6. Use TTS to review content by listening

## Tips for Best Results

### Voice Input Tips
- Speak clearly and at moderate pace
- Minimize background noise
- Use short to medium length sentences
- Wait for silence before stopping recording

### Prompt Engineering
- Be specific about what you want
- Provide context when needed
- Use follow-up questions to clarify
- Reference previous messages in conversation

### Model Selection
- **Phi-3.5-mini**: Best all-around local model
- **Gemma-2-2b**: Fast responses, good for simple tasks
- **Llama-3.2-1B**: Fastest, best for low-end devices
- **Cloud APIs**: Best for complex reasoning and latest information

### Performance Optimization
- First load takes time for model download
- Close unnecessary tabs for better performance
- Use smaller models on lower-end devices
- Cloud APIs are faster but require internet

## Advanced Use Cases

### Multi-Turn Conversations
The system maintains conversation context:
```
You: "What is machine learning?"
AI: [Explains machine learning]
You: "What are its applications?"
AI: [Lists applications with context from previous answer]
You: "Which one is used in healthcare?"
AI: [Focuses on healthcare applications]
```

### Code Assistance
```
You: "Write a Python function to sort a list"
AI: [Provides code]
You: "Add error handling to that code"
AI: [Updates code with error handling]
You: "Explain how it works"
AI: [Explains the code]
```

### Research Assistant
```
You: "What are the latest developments in renewable energy?"
AI: [Provides overview]
You: "Compare solar and wind energy efficiency"
AI: [Provides comparison]
You: "Which is more cost-effective?"
AI: [Analyzes costs]
```

## Troubleshooting Common Scenarios

### Transcription Issues
- If transcription is inaccurate, try speaking slower
- Reduce background noise
- Use clearer pronunciation
- Check microphone quality

### Model Performance
- If responses are slow with WebLLM, try smaller model
- Cloud APIs are generally faster
- Clear chat history if conversation gets very long
- Restart browser if memory usage is high

### API Limits
- Monitor API usage to stay within limits
- Use local models for testing/development
- Switch between providers based on task complexity

---

Have your own use case? Share it by contributing to this document!
