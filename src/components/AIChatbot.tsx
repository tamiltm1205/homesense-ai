import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Send, X, Mic, MicOff, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

const quickActions = [
  "Show me 3BHK under ₹80L",
  "Best areas for investment?",
  "Calculate EMI",
  "Compare properties",
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm your AI property assistant. I can help you find properties, calculate EMIs, compare options, and answer any real estate questions. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: "bot",
        text: getBotResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("3bhk") || lowerInput.includes("under")) {
      return "I found 24 properties matching your criteria! Here are the top picks:\n\n🏠 3 BHK in Whitefield - ₹75L\n🏠 3 BHK in Marathahalli - ₹68L\n🏠 3 BHK in Sarjapur - ₹72L\n\nWould you like me to show more details or schedule a visit?";
    }
    if (lowerInput.includes("investment") || lowerInput.includes("best area")) {
      return "Based on current market trends, here are the top areas for investment:\n\n📈 Sarjapur Road - 15% YoY growth\n📈 Whitefield - 12% YoY growth\n📈 Electronic City - 10% YoY growth\n\nShall I show properties in any of these areas?";
    }
    if (lowerInput.includes("emi") || lowerInput.includes("calculate")) {
      return "I can help you calculate EMI! Please provide:\n\n1. Property value\n2. Down payment percentage\n3. Loan tenure\n\nOr tell me the property you're interested in, and I'll calculate it for you.";
    }
    return "I understand you're looking for property assistance. Could you please tell me more about:\n\n• Your preferred location\n• Budget range\n• Property type (apartment/villa/plot)\n\nThis will help me find the perfect match for you!";
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 gold-gradient rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 group"
      >
        <Bot className="w-7 h-7 text-white" />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center animate-pulse">
          1
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-80" : "w-96"
      }`}
    >
      <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="hero-gradient p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Property Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4 text-white" />
              ) : (
                <Minimize2 className="w-4 h-4 text-white" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-secondary/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      message.type === "user"
                        ? "gold-gradient text-white rounded-br-none"
                        : "bg-card border border-border text-foreground rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-border bg-card">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-foreground rounded-full transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`p-3 rounded-xl transition-all ${
                    isListening
                      ? "bg-accent text-white animate-pulse"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-3 bg-secondary rounded-xl outline-none text-foreground placeholder:text-muted-foreground"
                />
                <Button
                  variant="accent"
                  size="icon"
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;
