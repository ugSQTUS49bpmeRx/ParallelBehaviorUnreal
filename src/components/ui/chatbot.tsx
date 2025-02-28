import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  X,
  Maximize2,
  Minimize2,
  User,
  Bot,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
}

interface ChatbotProps {
  initialMessage?: string;
  botName?: string;
  botAvatar?: string;
  userAvatar?: string;
  className?: string;
  onSendMessage?: (message: string) => Promise<string>;
  onFeedback?: (messageId: string, isPositive: boolean) => void;
  onHandoff?: () => void;
  suggestions?: string[];
  contextData?: Record<string, any>;
}

const Chatbot: React.FC<ChatbotProps> = ({
  initialMessage = "مرحباً! أنا المساعد الطبي الخاص بك. كيف يمكنني مساعدتك اليوم؟",
  botName = "المساعد الطبي",
  botAvatar = "https://api.dicebear.com/7.x/bottts/svg?seed=medical-assistant",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  className,
  onSendMessage,
  onFeedback,
  onHandoff,
  suggestions = [
    "كيف يمكنني حجز موعد؟",
    "ما هي ساعات العمل؟",
    "هل يمكنني الحصول على تقرير طبي؟",
    "كيف أدفع فاتورتي؟",
  ],
  contextData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0 && initialMessage) {
      setMessages([
        {
          id: "welcome",
          content: initialMessage,
          sender: "bot",
          timestamp: new Date(),
          suggestions: suggestions,
        },
      ]);
    }
  }, [initialMessage, messages.length, suggestions]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Add typing indicator
    const typingIndicatorId = `typing-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: typingIndicatorId,
        content: "",
        sender: "bot",
        timestamp: new Date(),
        isTyping: true,
      },
    ]);

    try {
      let response;
      if (onSendMessage) {
        response = await onSendMessage(inputValue);
      } else {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = getSimulatedResponse(inputValue, contextData);
      }

      // Remove typing indicator and add actual response
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== typingIndicatorId)
          .concat({
            id: `bot-${Date.now()}`,
            content: response,
            sender: "bot",
            timestamp: new Date(),
            suggestions: getSuggestionsBasedOnContext(inputValue),
          }),
      );
    } catch (error) {
      // Handle error
      setMessages((prev) =>
        prev
          .filter((msg) => msg.id !== typingIndicatorId)
          .concat({
            id: `error-${Date.now()}`,
            content:
              "عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
            sender: "bot",
            timestamp: new Date(),
          }),
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    if (onFeedback) {
      onFeedback(messageId, isPositive);
    }
    // Show feedback confirmation
    alert(
      isPositive
        ? "شكراً لتقييمك الإيجابي!"
        : "شكراً لملاحظاتك، سنعمل على التحسين.",
    );
  };

  const handleHumanHandoff = () => {
    if (onHandoff) {
      onHandoff();
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: `handoff-${Date.now()}`,
          content:
            "سيتم تحويلك إلى أحد ممثلي خدمة العملاء في أقرب وقت ممكن. يرجى الانتظار.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Simulated response function
  const getSimulatedResponse = (
    message: string,
    context?: Record<string, any>,
  ): string => {
    const lowerMessage = message.toLowerCase();

    // Appointment related queries
    if (lowerMessage.includes("موعد") || lowerMessage.includes("حجز")) {
      return "يمكنك حجز موعد من خلال النقر على زر 'حجز موعد جديد' في صفحة المواعيد، أو الاتصال بنا على الرقم 123-456-7890. هل تريد مساعدة في اختيار التخصص المناسب؟";
    }

    // Working hours
    if (
      lowerMessage.includes("ساعات") ||
      lowerMessage.includes("العمل") ||
      lowerMessage.includes("مفتوح")
    ) {
      return "ساعات العمل لدينا هي من الاثنين إلى الجمعة من 8 صباحاً حتى 6 مساءً، والسبت من 9 صباحاً حتى 2 ظهراً. نحن مغلقون أيام الأحد والعطلات الرسمية.";
    }

    // Medical reports
    if (
      lowerMessage.includes("تقرير") ||
      lowerMessage.includes("طبي") ||
      lowerMessage.includes("نتائج")
    ) {
      return "يمكنك الحصول على تقاريرك الطبية من خلال زيارة صفحة 'السجلات الطبية' في حسابك، أو يمكنك طلب نسخة مطبوعة من مكتب الاستقبال. هل تحتاج إلى مساعدة في الوصول إلى سجلاتك؟";
    }

    // Billing and payment
    if (
      lowerMessage.includes("فاتورة") ||
      lowerMessage.includes("دفع") ||
      lowerMessage.includes("تكلفة")
    ) {
      return "يمكنك دفع فاتورتك عبر الإنترنت من خلال بوابة المرضى، أو شخصياً في مكتب الاستقبال. نحن نقبل الدفع النقدي وبطاقات الائتمان والتحويلات المصرفية. هل تحتاج إلى معلومات حول التأمين الصحي؟";
    }

    // Insurance
    if (lowerMessage.includes("تأمين") || lowerMessage.includes("تغطية")) {
      return "نحن نتعامل مع معظم شركات التأمين الصحي الرئيسية. لمعرفة ما إذا كانت شركة التأمين الخاصة بك مغطاة، يرجى الاتصال بمكتب التأمين لدينا على الرقم 123-456-7890 أو إرسال بريد إلكتروني إلى insurance@medicalcenter.com.";
    }

    // Doctors and specialists
    if (
      lowerMessage.includes("دكتور") ||
      lowerMessage.includes("طبيب") ||
      lowerMessage.includes("أخصائي")
    ) {
      return "لدينا فريق من الأطباء المتخصصين في مختلف المجالات الطبية. يمكنك الاطلاع على قائمة الأطباء وتخصصاتهم من خلال زيارة صفحة 'الأطباء' على موقعنا. هل تبحث عن تخصص معين؟";
    }

    // Default response
    return "شكراً لتواصلك معنا. هل يمكنني مساعدتك في أي استفسار آخر حول خدماتنا الطبية، المواعيد، الفواتير، أو السجلات الطبية؟";
  };

  // Get contextual suggestions based on user input
  const getSuggestionsBasedOnContext = (message: string): string[] => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("موعد") || lowerMessage.includes("حجز")) {
      return [
        "ما هي التخصصات المتاحة؟",
        "كيف يمكنني إلغاء موعد؟",
        "هل يمكنني تغيير موعدي؟",
      ];
    }

    if (lowerMessage.includes("فاتورة") || lowerMessage.includes("دفع")) {
      return [
        "ما هي طرق الدفع المتاحة؟",
        "هل تقبلون التأمين الصحي؟",
        "كيف يمكنني الحصول على نسخة من فاتورتي؟",
      ];
    }

    if (lowerMessage.includes("تقرير") || lowerMessage.includes("طبي")) {
      return [
        "كم من الوقت يستغرق الحصول على التقارير؟",
        "هل يمكنني طلب التقارير عبر الإنترنت؟",
        "هل يمكن إرسال التقارير بالبريد الإلكتروني؟",
      ];
    }

    // Default suggestions
    return [
      "ما هي خدماتكم الطبية؟",
      "كيف يمكنني التواصل مع الطبيب؟",
      "هل تقدمون استشارات عن بعد؟",
      "أين موقع العيادة؟",
    ];
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* Chat toggle button */}
      <motion.button
        className={cn(
          "flex items-center justify-center p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all",
          isOpen && "hidden",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "bg-card border rounded-lg shadow-xl overflow-hidden flex flex-col",
              isMinimized ? "w-72" : "w-80 md:w-96",
            )}
          >
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border-2 border-primary-foreground">
                  <img
                    src={botAvatar}
                    alt={botName}
                    className="h-full w-full object-cover"
                  />
                </Avatar>
                <div className="mr-2">
                  <h3 className="font-medium text-sm">{botName}</h3>
                  <p className="text-xs opacity-80">متصل الآن</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={toggleMinimize}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat messages */}
                <ScrollArea className="flex-1 p-3 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start",
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3",
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none"
                              : "bg-muted rounded-tl-none",
                          )}
                        >
                          {message.isTyping ? (
                            <div className="flex space-x-1 items-center h-6 px-2">
                              <div
                                className="w-2 h-2 rounded-full bg-current animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-current animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-current animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              />
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap text-sm">
                              {message.content}
                            </div>
                          )}

                          {/* Timestamp */}
                          <div className="text-xs opacity-70 mt-1 text-right">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>

                          {/* Feedback buttons for bot messages */}
                          {message.sender === "bot" && !message.isTyping && (
                            <div className="mt-2 flex items-center justify-end space-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 rounded-full hover:bg-primary/10"
                                      onClick={() =>
                                        handleFeedback(message.id, true)
                                      }
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>مفيد</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 rounded-full hover:bg-primary/10"
                                      onClick={() =>
                                        handleFeedback(message.id, false)
                                      }
                                    >
                                      <ThumbsDown className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>غير مفيد</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          )}

                          {/* Suggestions */}
                          {message.sender === "bot" &&
                            message.suggestions &&
                            message.suggestions.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.suggestions.map(
                                  (suggestion, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="cursor-pointer hover:bg-primary/10 transition-colors py-1 px-2 text-xs"
                                      onClick={() =>
                                        handleSuggestionClick(suggestion)
                                      }
                                    >
                                      {suggestion}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Chat input */}
                <div className="p-3 border-t">
                  <div className="flex items-center space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="اكتب رسالتك هنا..."
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Additional actions */}
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={handleHumanHandoff}
                    >
                      <User className="h-3 w-3 mr-1" />
                      تحدث مع موظف
                    </Button>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs"
                            asChild
                          >
                            <a
                              href="#"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <HelpCircle className="h-3 w-3 mr-1" />
                              مساعدة
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>فتح صفحة المساعدة</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
