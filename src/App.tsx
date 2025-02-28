import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./components/home";
import routes from "tempo-routes";
import AnimatedLayout from "./components/AnimatedLayout";
import { ChatbotProvider } from "./components/ui/chatbot-provider";
import ChatbotButton from "./components/ui/chatbot-button";
import {
  determineIntent,
  extractEntities,
  generateResponse,
  generateSuggestions,
  updateConversationContext,
} from "./lib/chatbot-utils";

const PreviewPage = lazy(() => import("./routes/PreviewPage"));
const AdminPreview = lazy(() => import("./routes/AdminPreview"));
const HealthCenterDemo = lazy(() => import("./routes/HealthCenterDemo"));
const DynamicPageRoute = lazy(() => import("./routes/DynamicPageRoute"));

function App() {
  const location = useLocation();

  // Custom message handler for the chatbot with improved response time
  const handleChatbotMessage = async (
    message: string,
    contextData?: Record<string, any>,
  ) => {
    // In a real app, this would call an API
    console.log("Message received:", message);
    console.log("Context data:", contextData);

    // Use our improved intent detection and response generation
    const intent = determineIntent(message);
    const entities = extractEntities(message);

    // Update conversation context
    const updatedContext = updateConversationContext(
      contextData || {},
      message,
      intent,
      entities,
    );

    // Generate response based on intent and context
    const response = generateResponse(intent, updatedContext);

    // Generate dynamic suggestions based on the conversation context
    const suggestions = generateSuggestions(intent, updatedContext);

    // Return both the response and suggestions
    return {
      response,
      suggestions,
      updatedContext,
    };
  };

  return (
    <ChatbotProvider
      initialMessage="مرحباً! أنا المساعد الطبي الخاص بك. كيف يمكنني مساعدتك اليوم؟"
      botName="المساعد الطبي"
      botAvatar="https://api.dicebear.com/7.x/bottts/svg?seed=medical-assistant"
      onSendMessage={handleChatbotMessage}
      suggestions={[
        "كيف يمكنني حجز موعد؟",
        "ما هي ساعات العمل؟",
        "هل يمكنني الحصول على تقرير طبي؟",
        "كيف أدفع فاتورتي؟",
        "هل تقبلون التأمين الصحي؟",
        "هل تقدمون استشارات عن بعد؟",
        "كيف يمكنني الوصول إلى نتائج التحاليل؟",
      ]}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen w-full bg-white">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
              <p className="text-lg font-medium text-gray-600">Loading...</p>
            </div>
          </div>
        }
      >
        <>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <AnimatedLayout>
                    <Home />
                  </AnimatedLayout>
                }
              />
              <Route
                path="/preview"
                element={
                  <AnimatedLayout>
                    <PreviewPage />
                  </AnimatedLayout>
                }
              />
              <Route
                path="/admin-preview"
                element={
                  <AnimatedLayout>
                    <AdminPreview />
                  </AnimatedLayout>
                }
              />
              <Route
                path="/health-center-demo"
                element={
                  <AnimatedLayout>
                    <HealthCenterDemo />
                  </AnimatedLayout>
                }
              />
              {/* Dynamic pages */}
              <Route
                path="/pages/:pageId"
                element={
                  <AnimatedLayout>
                    <DynamicPageRoute />
                  </AnimatedLayout>
                }
              />
              {/* Specific routes for important pages */}
              <Route
                path="/laboratory-management"
                element={
                  <AnimatedLayout>
                    <DynamicPageRoute />
                  </AnimatedLayout>
                }
              />
              <Route
                path="/hipaa-compliance"
                element={
                  <AnimatedLayout>
                    <DynamicPageRoute />
                  </AnimatedLayout>
                }
              />
              <Route
                path="/multi-clinic-management"
                element={
                  <AnimatedLayout>
                    <DynamicPageRoute />
                  </AnimatedLayout>
                }
              />
              <Route
                path="/remote-patient-monitoring"
                element={
                  <AnimatedLayout>
                    <DynamicPageRoute />
                  </AnimatedLayout>
                }
              />
            </Routes>
          </AnimatePresence>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

          {/* Fixed Chatbot Button */}
          <ChatbotButton />
        </>
      </Suspense>
    </ChatbotProvider>
  );
}

export default App;
