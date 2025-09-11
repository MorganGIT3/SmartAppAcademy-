import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Zap } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const suggestedQuestions = [
  "Quel contenu performe le mieux ce mois ?",
  "Comment améliorer mon taux de conversion ?",
  "Stratégie pour atteindre 100K€/mois ?",
  "Optimiser mes campagnes publicitaires"
];

export function AIChatbot() {
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

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || input.trim();
    if (!content) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
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

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <CardTitle>Growth Operator IA</CardTitle>
        <Badge variant="secondary" className="ml-auto">
          <Zap className="h-3 w-3 mr-1" />
          En ligne
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className={`rounded-lg px-3 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
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
              <div className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Questions suggérées:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1 px-2"
                  onClick={() => handleSend(question)}
                  data-testid={`suggested-question-${index}`}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isTyping}
            data-testid="input-chatbot-message"
          />
          <Button 
            onClick={() => handleSend()} 
            disabled={!input.trim() || isTyping}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}