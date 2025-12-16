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

// Application State
let state = {
  activeTab: 'overview',
  selectedAgent: 'career-matching',
  messages: [],
  isLoading: false,
  genAI: null,
  chat: null
};

// Initialize Gemini AI
function initializeAI() {
  // In AI Studio, this will be automatically replaced with the user's API key
  const apiKey = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';
  state.genAI = new GoogleGenerativeAI(apiKey);
}

// Get agent configuration by ID
function getAgentConfig(agentId) {
  for (const category of Object.values(AGENT_CATEGORIES)) {
    const agent = category.agents.find(a => a.id === agentId);
    if (agent) return agent;
  }
  return AGENT_CATEGORIES['job-agents'].agents[0];
}

// Create element helper
function createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);
  
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.substring(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  }
  
  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  }
  
  return element;
}

// Render Overview Tab
function renderOverview() {
  const container = createElement('div');
  
  // Header
  const header = createElement('div', { className: 'header' },
    createElement('h1', {}, '🧠 360 MAGICIANS'),
    createElement('p', {}, 'VERTICAL AI Platform - Federated AI Workers'),
    createElement('p', { style: { fontSize: '1rem', color: '#888' } },
      'Making every digital experience accessible to 70+ million deaf people worldwide'
    ),
    createElement('div', { style: { marginTop: '20px' } },
      createElement('span', { className: 'badge badge-primary' }, '🤖 VURA AI: vr4deaf.org (VR/AR + ASL)'),
      createElement('span', { className: 'badge badge-primary' }, '🧠 Vertex AI: GCP Federated Workers')
    )
  );
  
  // Stats
  const stats = createElement('div', { className: 'stats' },
    createElement('div', { className: 'stat-card' },
      createElement('div', { className: 'stat-value' }, '70M+'),
      createElement('div', { className: 'stat-label' }, 'Deaf People Worldwide')
    ),
    createElement('div', { className: 'stat-card' },
      createElement('div', { className: 'stat-value' }, '$26.2B'),
      createElement('div', { className: 'stat-label' }, 'Market Opportunity')
    ),
    createElement('div', { className: 'stat-card' },
      createElement('div', { className: 'stat-value' }, '12'),
      createElement('div', { className: 'stat-label' }, 'Federated AI Agents')
    ),
    createElement('div', { className: 'stat-card' },
      createElement('div', { className: 'stat-value' }, '6'),
      createElement('div', { className: 'stat-label' }, 'Industry Verticals')
    )
  );
  
  container.appendChild(header);
  container.appendChild(stats);
  
  // Agent Categories
  const agentsSection = createElement('div', { style: { marginTop: '30px' } },
    createElement('h2', { style: { marginBottom: '20px', color: '#333' } }, 'AI Agent Categories')
  );
  
  for (const [key, category] of Object.entries(AGENT_CATEGORIES)) {
    const categorySection = createElement('div', { style: { marginBottom: '30px' } },
      createElement('h3', { style: { color: '#667eea', marginBottom: '15px' } }, category.title)
    );
    
    const agentGrid = createElement('div', { className: 'agent-grid' });
    
    for (const agent of category.agents) {
      const agentCard = createElement('div', {
        className: `agent-card ${state.selectedAgent === agent.id ? 'selected' : ''}`,
        onClick: () => {
          state.selectedAgent = agent.id;
          state.activeTab = 'chat';
          render();
        }
      },
        createElement('div', { className: 'agent-name' }, agent.name),
        createElement('div', { className: 'agent-description' }, agent.description)
      );
      agentGrid.appendChild(agentCard);
    }
    
    categorySection.appendChild(agentGrid);
    agentsSection.appendChild(categorySection);
  }
  
  container.appendChild(agentsSection);
  return container;
}

// Render Chat Tab
function renderChat() {
  const agentConfig = getAgentConfig(state.selectedAgent);
  const container = createElement('div');
  
  const title = createElement('h2', 
    { style: { marginBottom: '20px', color: '#333' } },
    `Chat with ${agentConfig.name}`
  );
  container.appendChild(title);
  
  const chatContainer = createElement('div', { className: 'chat-container' });
  
  // Agent Selector
  const agentSelector = createElement('div', { className: 'agent-selector' },
    createElement('h3', 
      { style: { marginBottom: '15px', fontSize: '1rem', color: '#333' } },
      'Select Agent'
    )
  );
  
  for (const [key, category] of Object.entries(AGENT_CATEGORIES)) {
    const categorySection = createElement('div', { style: { marginBottom: '20px' } },
      createElement('h4', 
        { style: { fontSize: '0.85rem', color: '#666', marginBottom: '10px' } },
        category.title
      )
    );
    
    for (const agent of category.agents) {
      const agentButton = createElement('div', {
        style: {
          padding: '10px',
          marginBottom: '8px',
          borderRadius: '8px',
          cursor: 'pointer',
          background: state.selectedAgent === agent.id ? '#667eea' : '#fff',
          color: state.selectedAgent === agent.id ? '#fff' : '#333',
          fontSize: '0.85rem',
          transition: 'all 0.3s'
        },
        onClick: () => {
          state.selectedAgent = agent.id;
          state.messages = [];
          state.chat = null;
          render();
        }
      }, agent.name);
      
      categorySection.appendChild(agentButton);
    }
    
    agentSelector.appendChild(categorySection);
  }
  
  chatContainer.appendChild(agentSelector);
  
  // Chat Interface
  const chatInterface = createElement('div', { className: 'chat-interface' });
  
  // Messages Area
  const messagesArea = createElement('div', { className: 'chat-messages', id: 'chat-messages' });
  
  if (state.messages.length === 0) {
    const emptyState = createElement('div', 
      { style: { textAlign: 'center', color: '#999', padding: '40px' } },
      createElement('p', {}, `Start a conversation with ${agentConfig.name}`),
      createElement('p', 
        { style: { fontSize: '0.9rem', marginTop: '10px' } },
        agentConfig.description
      )
    );
    messagesArea.appendChild(emptyState);
  } else {
    for (const message of state.messages) {
      const messageDiv = createElement('div', { className: `message ${message.role}` }, message.content);
      messagesArea.appendChild(messageDiv);
    }
  }
  
  if (state.isLoading) {
    const loadingDiv = createElement('div', { className: 'message assistant' },
      createElement('div', { className: 'loading' }),
      createElement('span', { style: { marginLeft: '10px' } }, 'Thinking...')
    );
    messagesArea.appendChild(loadingDiv);
  }
  
  chatInterface.appendChild(messagesArea);
  
  // Input Area
  const inputForm = createElement('form', {
    className: 'chat-input-container',
    onSubmit: async (e) => {
      e.preventDefault();
      await handleSendMessage();
    }
  });
  
  const input = createElement('input', {
    type: 'text',
    className: 'chat-input',
    id: 'chat-input',
    placeholder: 'Type your message...',
    disabled: state.isLoading
  });
  
  const sendButton = createElement('button', {
    type: 'submit',
    className: 'send-button',
    disabled: state.isLoading
  }, state.isLoading ? 'Sending...' : 'Send');
  
  inputForm.appendChild(input);
  inputForm.appendChild(sendButton);
  chatInterface.appendChild(inputForm);
  
  chatContainer.appendChild(chatInterface);
  container.appendChild(chatContainer);
  
  return container;
}

// Handle Send Message
async function handleSendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message || state.isLoading) return;
  
  // Add user message
  state.messages.push({ role: 'user', content: message });
  input.value = '';
  state.isLoading = true;
  render();
  
  try {
    const agentConfig = getAgentConfig(state.selectedAgent);
    
    // Initialize model if needed
    if (!state.chat) {
      const model = state.genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        systemInstruction: agentConfig.systemPrompt
      });
      state.chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });
    }
    
    // Send message and get response
    const result = await state.chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    // Add assistant message
    state.messages.push({ role: 'assistant', content: text });
  } catch (error) {
    console.error('Error sending message:', error);
    state.messages.push({ 
      role: 'error', 
      content: `Error: ${error.message}. Please make sure you have set up your Gemini API key.` 
    });
  } finally {
    state.isLoading = false;
    render();
    
    // Scroll to bottom
    setTimeout(() => {
      const messagesArea = document.getElementById('chat-messages');
      if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
      }
    }, 100);
  }
}

// Main Render Function
function render() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  
  const container = createElement('div', { className: 'container' });
  
  // Tabs
  const tabs = createElement('div', { className: 'tabs' });
  
  // Tab List
  const tabList = createElement('div', { className: 'tab-list' },
    createElement('button', {
      className: `tab-button ${state.activeTab === 'overview' ? 'active' : ''}`,
      onClick: () => {
        state.activeTab = 'overview';
        render();
      }
    }, 'Overview'),
    createElement('button', {
      className: `tab-button ${state.activeTab === 'chat' ? 'active' : ''}`,
      onClick: () => {
        state.activeTab = 'chat';
        render();
      }
    }, 'Interactive Chat')
  );
  
  tabs.appendChild(tabList);
  
  // Tab Content
  const tabContent = createElement('div', { className: 'tab-content' });
  if (state.activeTab === 'overview') {
    tabContent.appendChild(renderOverview());
  } else if (state.activeTab === 'chat') {
    tabContent.appendChild(renderChat());
  }
  
  tabs.appendChild(tabContent);
  container.appendChild(tabs);
  
  // Footer
  const footer = createElement('div', 
    { style: { marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '0.9rem' } },
    createElement('p', {}, '© 2025 360 Magicians | Powered by Gemini AI'),
    createElement('p', 
      { style: { marginTop: '5px' } },
      '🌟 VERTICAL AI Platform - Universal Digital Accessibility Infrastructure'
    )
  );
  
  container.appendChild(footer);
  root.appendChild(container);
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initializeAI();
  render();
});
