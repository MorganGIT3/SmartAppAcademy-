import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  User, 
  Send, 
  BarChart3,
  TrendingUp,
  Target,
  DollarSign,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIChatbotNew() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Salut ! Je suis votre Growth Operator IA. Je peux analyser vos métriques et vous donner des recommandations personnalisées pour booster vos revenus. Comment puis-je vous aider aujourd'hui ?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('contenu') || input.includes('performe')) {
      return "📊 D'après vos métriques, votre contenu TikTok '5 Secrets pour 10K€/mois' performe exceptionnellement bien avec 287K vues et un ROI de +340%. Je recommande de créer du contenu similaire sur ce thème. Voulez-vous que je génère des idées de variations ?";
    }
    
    if (input.includes('conversion') || input.includes('améliorer')) {
      return "🎯 Votre taux de conversion actuel est de 3.2%. Pour l'améliorer, je suggère: 1) Optimiser vos landing pages (test A/B), 2) Améliorer votre follow-up email, 3) Ajouter des témoignages clients. Votre funnel Instagram a le plus de potentiel d'amélioration.";
    }
    
    if (input.includes('100k') || input.includes('stratégie')) {
      return "🚀 Pour atteindre 100K€/mois, basé sur vos performances actuelles (47K€), voici ma stratégie: 1) Doubler la production de contenu TikTok (votre meilleure source), 2) Lancer 2 nouvelles campagnes YouTube, 3) Automatiser votre setter IA. Objectif réalisable en 3-4 mois !";
    }
    
    if (input.includes('publicité') || input.includes('campagne')) {
      return "💰 Vos campagnes Facebook ont un ROAS de 2.8x (excellent !). Pour optimiser: 1) Augmenter le budget sur les audiences qui convertissent, 2) Tester de nouveaux créatifs basés sur votre top contenu, 3) Exclure les audiences non-converteuses. Budget recommandé: +30%.";
    }

    return "🤖 Excellente question ! Basé sur vos données actuelles, je peux analyser vos performances et vous donner des recommandations précises. Pouvez-vous me donner plus de détails sur ce que vous aimeriez optimiser ? (contenu, ads, conversion, etc.)";
  };

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedQuestions = [
    "Quel contenu performe le mieux ce mois ?",
    "Comment améliorer mon taux de conversion ?", 
    "Stratégie pour atteindre 100K€/mois ?",
    "Optimiser mes campagnes publicitaires"
  ];

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      {/* Header compact */}
      <div className="text-center py-4 border-b border-gray-700/30">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Growth Operator IA</h1>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs">En ligne</span>
          </div>
        </div>
      </div>

      {/* Messages Area - Prend tout l'espace disponible */}
      <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gray-700'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className={`rounded-xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-white border border-gray-700'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-gray-800 rounded-xl px-4 py-3 border border-gray-700">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
      </div>

      {/* Input Area fixe en bas */}
      <div className="border-t border-gray-700/30 p-4">
        {/* Suggested Questions (only show at start) */}
        {messages.length === 1 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-700 text-gray-300 hover:text-white transition-colors text-xs"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Box */}
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question sur vos performances, stratégies, optimisations..."
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-500"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl transition-colors text-white flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}