import React, { createContext, useState, useContext, useCallback } from "react";
import Chatbot from "./chatbot";

interface ChatbotContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (message: string) => Promise<string>;
  setContextData: (data: Record<string, any>) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

interface ChatbotProviderProps {
  children: React.ReactNode;
  initialMessage?: string;
  botName?: string;
  botAvatar?: string;
  userAvatar?: string;
  suggestions?: string[];
  onSendMessage?: (
    message: string,
    contextData?: Record<string, any>,
  ) => Promise<string>;
  onFeedback?: (messageId: string, isPositive: boolean) => void;
  onHandoff?: () => void;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({
  children,
  initialMessage,
  botName,
  botAvatar,
  userAvatar,
  suggestions,
  onSendMessage,
  onFeedback,
  onHandoff,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contextData, setContextData] = useState<Record<string, any>>({});

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleSendMessage = useCallback(
    async (message: string): Promise<string> => {
      if (onSendMessage) {
        return await onSendMessage(message, contextData);
      }

      // Default implementation if no custom handler provided
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      return `Received your message: "${message}". This is a default response.`;
    },
    [onSendMessage, contextData],
  );

  const updateContextData = useCallback((data: Record<string, any>) => {
    setContextData((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  const value = {
    isOpen,
    openChat,
    closeChat,
    toggleChat,
    sendMessage: handleSendMessage,
    setContextData: updateContextData,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
      <Chatbot
        initialMessage={initialMessage}
        botName={botName}
        botAvatar={botAvatar}
        userAvatar={userAvatar}
        suggestions={suggestions}
        onSendMessage={handleSendMessage}
        onFeedback={onFeedback}
        onHandoff={onHandoff}
        contextData={contextData}
      />
    </ChatbotContext.Provider>
  );
};
