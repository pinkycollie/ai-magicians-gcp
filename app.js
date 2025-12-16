import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Agent configurations
const AGENT_CATEGORIES = {
  'job-agents': {
    title: 'Job Development Agents',
    agents: [
      {
        id: 'career-matching',
        name: 'Career Matching AI',
        description: 'Intelligent pairing of skills, accommodations, and job requirements',
        systemPrompt: `You are the Career Matching AI for 360 Magicians, specializing in intelligent pairing of skills, accommodations, and job requirements for Deaf and hard-of-hearing professionals.

Your expertise includes:
- Analyzing professional skills and experience
- Understanding accessibility needs and workplace accommodations
- Matching candidates with suitable job opportunities
- Providing career development guidance
- Coordinating with vocational rehabilitation services

Always consider accessibility requirements, communication preferences, and workplace accommodations in your recommendations.`
      },
      {
        id: 'vr-coordination',
        name: 'VR Coordination AI',
        description: 'VURA AI integration with vr4deaf.org for VR/AR rehabilitation and ASL workforce solutions',
        systemPrompt: `You are the VR4DEAF Coordination AI, integrated with the comprehensive VR4DEAF platform architecture (vr4deaf.org). You are deeply knowledgeable about deaf accessibility, sign language models, and disability rights law.

Your technical expertise includes:
- DeafAUTH: Authentication & accommodation engine with SSO, biometric auth, real-time accommodation deployment
- FIBONROSE: Fibonacci trust & validation system for skills assessment and community validation
- PinkSync: Accessibility layer with visual dashboards, progress tracking, and communication tools

Always prioritize deaf-first design principles, visual accessibility, and legal compliance in all recommendations.`
      },
      {
        id: 'interview-prep',
        name: 'Interview Prep AI',
        description: 'Accessibility-focused preparation and simulation',
        systemPrompt: `You are the Interview Prep AI for 360 Magicians, specializing in accessibility-focused interview preparation for Deaf and hard-of-hearing professionals.

Your expertise includes:
- Interview strategy and preparation
- Communication accommodation planning
- Accessible interview techniques
- Building confidence for interviews
- Addressing accessibility concerns proactively`
      },
      {
        id: 'workplace-accommodation',
        name: 'Workplace Accommodation AI',
        description: 'Automated accommodation coordination and tracking',
        systemPrompt: `You are the Workplace Accommodation AI for 360 Magicians, specializing in automated accommodation coordination and tracking for Deaf and hard-of-hearing professionals.

Your expertise includes:
- ADA compliance and reasonable accommodations
- Accommodation request processing
- Workplace accessibility assessment
- Communication technology integration
- Ongoing accommodation support`
      }
    ]
  },
  'business-agents': {
    title: 'Business Development Agents',
    agents: [
      {
        id: 'startup-incubation',
        name: 'Startup Incubation AI',
        description: 'Resource identification and business model validation',
        systemPrompt: `You are the Startup Incubation AI for 360 Magicians, specializing in resource identification and business model validation for Deaf entrepreneurs and startups.

Your expertise includes:
- Business model validation and development
- Resource identification and allocation
- Market analysis and opportunity assessment
- Funding strategy development
- Accessibility-focused business planning
- Community-driven entrepreneurship

Focus on creating inclusive, accessible business solutions that serve the Deaf community while being commercially viable.`
      },
      {
        id: 'document-translation',
        name: 'Document Translation AI',
        description: 'Complex document simplification and accessibility',
        systemPrompt: `You are the Document Translation AI for 360 Magicians, specializing in complex document simplification and accessibility for the Deaf community.

Your expertise includes:
- Translating complex legal and business documents into plain language
- Creating accessible formats for various document types
- Ensuring cultural and linguistic accessibility for Deaf readers
- Converting technical jargon into understandable content
- Maintaining document accuracy while improving readability

Always prioritize clarity, accessibility, and cultural sensitivity in your translations.`
      },
      {
        id: 'funding-intelligence',
        name: 'Funding Intelligence AI',
        description: 'Grant and funding source identification and matching',
        systemPrompt: `You are the Funding Intelligence AI for 360 Magicians, specializing in grant and funding source identification and matching for Deaf-led organizations and initiatives.

Your expertise includes:
- Grant opportunity identification
- Funding source matching
- Proposal development guidance
- Budget planning support
- Funding strategy optimization`
      },
      {
        id: 'growth-planning',
        name: 'Growth Planning AI',
        description: 'Strategic business development and scaling strategies',
        systemPrompt: `You are the Growth Planning AI for 360 Magicians, specializing in strategic business development and scaling strategies for Deaf-led businesses.

Your expertise includes:
- Growth strategy development
- Market expansion planning
- Scalability assessment
- Partnership identification
- Sustainable growth frameworks`
      }
    ]
  },
  'integration-agents': {
    title: 'Integration Hub Agents',
    agents: [
      {
        id: 'workforce-partnership',
        name: 'Workforce Partnership AI',
        description: 'Employer network coordination and accessibility training',
        systemPrompt: `You are the Workforce Partnership AI for 360 Magicians, specializing in employer network coordination and accessibility training.

Your expertise includes:
- Employer partnership development
- Accessibility training programs
- Workplace culture assessment
- Hiring process optimization
- Ongoing support coordination`
      },
      {
        id: 'case-management',
        name: 'Case Management AI',
        description: 'Unified tracking across rehabilitation and career services',
        systemPrompt: `You are the Case Management AI for 360 Magicians, specializing in unified tracking across rehabilitation and career services.

Your expertise includes:
- Case coordination and tracking
- Service integration
- Progress monitoring
- Goal setting and achievement
- Multi-stakeholder communication`
      },
      {
        id: 'progress-analytics',
        name: 'Progress Analytics AI',
        description: 'Performance tracking and outcome optimization',
        systemPrompt: `You are the Progress Analytics AI for 360 Magicians, specializing in performance tracking and outcome optimization.

Your expertise includes:
- Data analysis and insights
- Performance metrics tracking
- Outcome measurement
- Trend identification
- Optimization recommendations`
      },
      {
        id: 'community-intelligence',
        name: 'Community Intelligence AI',
        description: 'Feedback processing and continuous improvement',
        systemPrompt: `You are the Community Intelligence AI for 360 Magicians, specializing in feedback processing and continuous improvement.

Your expertise includes:
- Community feedback analysis
- Sentiment tracking
- Improvement recommendations
- Trend identification
- Engagement optimization`
      }
    ]
  }
};

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState('career-matching');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const genAI = useRef(null);

  useEffect(() => {
    // Initialize Gemini AI with the placeholder API key
    // In AI Studio, this will be automatically replaced with the user's API key
    const apiKey = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
    genAI.current = new GoogleGenerativeAI(apiKey);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAgentConfig = (agentId) => {
    for (const category of Object.values(AGENT_CATEGORIES)) {
      const agent = category.agents.find(a => a.id === agentId);
      if (agent) return agent;
    }
    return AGENT_CATEGORIES['job-agents'].agents[0];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const agentConfig = getAgentConfig(selectedAgent);
      const model = genAI.current.getGenerativeModel({ 
        model: 'gemini-pro',
        systemInstruction: agentConfig.systemPrompt
      });

      // Build conversation history
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'error', 
        content: `Error: ${error.message}. Please make sure you have set up your Gemini API key.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderOverview = () => (
    <div>
      <div className="header">
        <h1>🧠 360 MAGICIANS</h1>
        <p>VERTICAL AI Platform - Federated AI Workers</p>
        <p style={{ fontSize: '1rem', color: '#888' }}>
          Making every digital experience accessible to 70+ million deaf people worldwide
        </p>
        <div style={{ marginTop: '20px' }}>
          <span className="badge badge-primary">🤖 VURA AI: vr4deaf.org (VR/AR + ASL)</span>
          <span className="badge badge-primary">🧠 Vertex AI: GCP Federated Workers</span>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">70M+</div>
          <div className="stat-label">Deaf People Worldwide</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$26.2B</div>
          <div className="stat-label">Market Opportunity</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Federated AI Agents</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">6</div>
          <div className="stat-label">Industry Verticals</div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>AI Agent Categories</h2>
        {Object.entries(AGENT_CATEGORIES).map(([key, category]) => (
          <div key={key} style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#667eea', marginBottom: '15px' }}>{category.title}</h3>
            <div className="agent-grid">
              {category.agents.map(agent => (
                <div
                  key={agent.id}
                  className={`agent-card ${selectedAgent === agent.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedAgent(agent.id);
                    setActiveTab('chat');
                  }}
                >
                  <div className="agent-name">{agent.name}</div>
                  <div className="agent-description">{agent.description}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChat = () => {
    const agentConfig = getAgentConfig(selectedAgent);
    
    return (
      <div>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          Chat with {agentConfig.name}
        </h2>
        <div className="chat-container">
          <div className="agent-selector">
            <h3 style={{ marginBottom: '15px', fontSize: '1rem', color: '#333' }}>Select Agent</h3>
            {Object.entries(AGENT_CATEGORIES).map(([key, category]) => (
              <div key={key} style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>
                  {category.title}
                </h4>
                {category.agents.map(agent => (
                  <div
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgent(agent.id);
                      setMessages([]);
                    }}
                    style={{
                      padding: '10px',
                      marginBottom: '8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedAgent === agent.id ? '#667eea' : '#fff',
                      color: selectedAgent === agent.id ? '#fff' : '#333',
                      fontSize: '0.85rem',
                      transition: 'all 0.3s'
                    }}
                  >
                    {agent.name}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="chat-interface">
            <div className="chat-messages">
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
                  <p>Start a conversation with {agentConfig.name}</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                    {agentConfig.description}
                  </p>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <div className="loading"></div>
                  <span style={{ marginLeft: '10px' }}>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="send-button"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="tabs">
        <div className="tab-list">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            Interactive Chat
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'chat' && renderChat()}
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
        <p>© 2025 360 Magicians | Powered by Gemini AI</p>
        <p style={{ marginTop: '5px' }}>
          🌟 VERTICAL AI Platform - Universal Digital Accessibility Infrastructure
        </p>
      </div>
    </div>
  );
}

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(<App />);
