import * as webllm from "@mlc-ai/web-llm";

export class LLMManager {
    constructor() {
        this.provider = null;
        this.engine = null;
        this.config = null;
        this.isInitialized = false;
    }

    async initialize(config, progressCallback) {
        this.config = config;
        this.provider = config.provider;

        try {
            switch (this.provider) {
                case 'webllm':
                    await this.initializeWebLLM(config.model, progressCallback);
                    break;
                case 'gemini':
                    await this.initializeGemini(config.apiKey);
                    break;
                case 'openai':
                    await this.initializeOpenAI(config.apiKey);
                    break;
                case 'dify':
                    await this.initializeDify(config.endpoint, config.apiKey);
                    break;
                default:
                    throw new Error(`Unknown provider: ${this.provider}`);
            }

            this.isInitialized = true;
            progressCallback?.('LLM initialized!');
            
        } catch (error) {
            console.error('LLM initialization error:', error);
            throw new Error(`LLM initialization failed: ${error.message}`);
        }
    }

    async initializeWebLLM(modelId, progressCallback) {
        try {
            progressCallback?.('Loading WebLLM engine...');
            
            // Create engine with progress callback
            this.engine = await webllm.CreateMLCEngine(modelId, {
                initProgressCallback: (progress) => {
                    console.log(progress);
                    if (progress.text) {
                        progressCallback?.(`WebLLM: ${progress.text}`);
                    }
                }
            });

            progressCallback?.('WebLLM engine ready!');
            
        } catch (error) {
            console.error('WebLLM initialization error:', error);
            throw new Error(`WebLLM initialization failed: ${error.message}`);
        }
    }

    async initializeGemini(apiKey) {
        if (!apiKey) {
            throw new Error('Gemini API key is required');
        }
        this.config.apiKey = apiKey;
    }

    async initializeOpenAI(apiKey) {
        if (!apiKey) {
            throw new Error('OpenAI API key is required');
        }
        this.config.apiKey = apiKey;
    }

    async initializeDify(endpoint, apiKey) {
        if (!endpoint) {
            throw new Error('Dify endpoint is required');
        }
        if (!apiKey) {
            throw new Error('Dify API key is required');
        }
        this.config.endpoint = endpoint;
        this.config.apiKey = apiKey;
    }

    async generateResponse(conversationHistory) {
        try {
            if (!this.isInitialized) {
                throw new Error('LLM not initialized');
            }

            switch (this.provider) {
                case 'webllm':
                    return await this.generateWebLLM(conversationHistory);
                case 'gemini':
                    return await this.generateGemini(conversationHistory);
                case 'openai':
                    return await this.generateOpenAI(conversationHistory);
                case 'dify':
                    return await this.generateDify(conversationHistory);
                default:
                    throw new Error(`Unknown provider: ${this.provider}`);
            }
            
        } catch (error) {
            console.error('Response generation error:', error);
            throw new Error(`Failed to generate response: ${error.message}`);
        }
    }

    async generateWebLLM(conversationHistory) {
        try {
            // Format messages for WebLLM
            const messages = conversationHistory.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            // Generate response
            const response = await this.engine.chat.completions.create({
                messages: messages,
                temperature: 0.7,
                max_tokens: 512
            });

            return response.choices[0].message.content;
            
        } catch (error) {
            console.error('WebLLM generation error:', error);
            throw error;
        }
    }

    async generateGemini(conversationHistory) {
        try {
            const apiKey = this.config.apiKey;
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

            // Format conversation for Gemini
            const contents = conversationHistory.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 512
                    }
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Gemini API request failed');
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
            
        } catch (error) {
            console.error('Gemini API error:', error);
            throw error;
        }
    }

    async generateOpenAI(conversationHistory) {
        try {
            const apiKey = this.config.apiKey;
            const url = 'https://api.openai.com/v1/chat/completions';
            // Allow model selection via config, default to gpt-3.5-turbo for cost-efficiency
            const model = this.config.openaiModel || 'gpt-3.5-turbo';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: conversationHistory,
                    temperature: 0.7,
                    max_tokens: 512
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'OpenAI API request failed');
            }

            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('OpenAI API error:', error);
            throw error;
        }
    }

    async generateDify(conversationHistory) {
        try {
            const endpoint = this.config.endpoint;
            const apiKey = this.config.apiKey;
            
            // Get the last user message
            const lastMessage = conversationHistory[conversationHistory.length - 1];
            
            const response = await fetch(`${endpoint}/chat-messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    inputs: {},
                    query: lastMessage.content,
                    response_mode: 'blocking',
                    conversation_id: '',
                    user: 'user'
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Dify API request failed');
            }

            const data = await response.json();
            return data.answer;
            
        } catch (error) {
            console.error('Dify API error:', error);
            throw error;
        }
    }

    async cleanup() {
        if (this.provider === 'webllm' && this.engine) {
            // Clean up WebLLM resources if needed
            this.engine = null;
        }
        this.isInitialized = false;
    }
}
