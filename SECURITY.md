# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Considerations

### API Keys

**NEVER commit API keys to the repository.** 

✅ **Safe practices:**
- Use environment variables
- Store keys in `.env` (which is in `.gitignore`)
- Use browser's localStorage with caution
- Implement key rotation
- Use key management services in production

❌ **Unsafe practices:**
- Hardcoding keys in source files
- Committing `.env` files
- Sharing keys in public channels
- Using production keys in development

### Data Privacy

#### Local Models (WebLLM)
- ✅ All processing happens in browser
- ✅ No data sent to external servers
- ✅ Complete privacy
- ✅ Works offline

#### Cloud APIs
- ⚠️ Data sent to provider's servers
- ⚠️ Subject to provider's privacy policy
- ⚠️ May be used for training (check ToS)
- ⚠️ Consider data sensitivity

### Browser Security

#### Content Security Policy
The application uses WebGPU and WASM which require specific headers:
```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

These are set in `vite.config.js` for development.

#### Microphone Access
- Always explain why microphone access is needed
- Only request when user initiates recording
- Stop recording and release access when done
- Never record without user knowledge

### Input Validation

When integrating this into larger applications:
- Validate and sanitize user inputs
- Implement rate limiting for API calls
- Add CSRF protection if needed
- Use HTTPS in production
- Implement authentication if needed

### Dependencies

We use reputable, well-maintained packages:
- `@mlc-ai/web-llm` - MLC AI team
- `@xenova/transformers` - Hugging Face community
- Regular updates and security patches

### Recommended Production Setup

1. **Environment Variables**
```bash
# .env (never commit)
VITE_GEMINI_API_KEY=your_key_here
VITE_OPENAI_API_KEY=your_key_here
```

2. **API Proxy** (recommended)
Instead of using keys in frontend, proxy through backend:
```javascript
// Don't expose keys in frontend
const response = await fetch('/api/llm', {
  method: 'POST',
  body: JSON.stringify({ message })
});
```

3. **Rate Limiting**
Implement rate limiting to prevent abuse:
- Per user limits
- Per API endpoint limits
- Cost monitoring

4. **HTTPS Only**
Always use HTTPS in production:
- Protects API keys in transit
- Required for microphone access
- Prevents MITM attacks

## Reporting a Vulnerability

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainers privately (check repo for contact)
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **24 hours:** Initial acknowledgment
- **7 days:** Assessment and response
- **30 days:** Fix and disclosure (if applicable)

## Security Best Practices

### For Developers

1. **Keep dependencies updated**
```bash
npm audit
npm update
```

2. **Review code for secrets**
```bash
git secrets --scan
```

3. **Use TypeScript** (consider migrating)
- Type safety reduces bugs
- Better IDE support
- Catches errors early

4. **Implement CSP headers**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-eval';">
```

### For Users

1. **Verify source**
- Only use official repository
- Check commit signatures
- Review code before running

2. **Protect credentials**
- Use separate API keys for testing
- Set spending limits on APIs
- Monitor usage regularly

3. **Browser security**
- Keep browser updated
- Use reputable browsers
- Check permissions granted

4. **Data sensitivity**
- Don't share sensitive data in conversations
- Use local models for private data
- Clear chat history regularly

## Known Limitations

### Development Dependencies
- esbuild (via Vite) has a known moderate security issue affecting the dev server
- **Impact:** Only affects local development, not production builds
- **Mitigation:** Do not expose dev server to untrusted networks
- **Status:** Will be addressed in future Vite updates
- Run `npm audit` regularly and update dependencies

### WebGPU Security
- WebGPU is still evolving
- Some browsers mark it as "unsafe"
- Use at your own risk in production
- Monitor for security updates

### Model Security
- AI models can be manipulated
- Don't trust output for security decisions
- Validate all generated content
- Be aware of prompt injection risks

### Third-Party APIs
- Dependent on provider security
- Subject to provider breaches
- Monitor provider security advisories
- Have backup providers ready

## Compliance

### GDPR (EU)
- Local models are GDPR-friendly
- Cloud APIs may have GDPR implications
- Implement data processing agreements
- Allow users to delete data

### CCPA (California)
- Disclose data collection practices
- Allow users to opt-out
- Provide data access/deletion

### HIPAA (Healthcare)
- Do not use for PHI without proper safeguards
- Local models may be suitable with proper implementation
- Cloud APIs typically not HIPAA-compliant without BAA

## Updates

This security policy is reviewed quarterly and updated as needed.

**Last Updated:** 2024-12-16
**Next Review:** 2025-03-16

---

**Remember:** Security is everyone's responsibility. When in doubt, ask!
