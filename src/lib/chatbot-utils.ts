// Optimized chatbot utilities for faster response times and more comprehensive knowledge

// Function to extract entities from user messages
export function extractEntities(message: string): Record<string, any> {
  const entities: Record<string, any> = {};
  const lowerMessage = message.toLowerCase();

  // Extract dates
  const datePatterns = [
    // Arabic date formats
    /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/,
    // English date formats
    /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/,
    // Day names in Arabic
    /\b(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)\b/i,
    // Day names in English
    /\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i,
    // Relative dates in Arabic
    /\b(اليوم|غدا|بعد غد|أمس|الأسبوع القادم|الشهر القادم)\b/i,
    // Relative dates in English
    /\b(today|tomorrow|yesterday|next week|next month)\b/i,
  ];

  for (const pattern of datePatterns) {
    const match = lowerMessage.match(pattern);
    if (match) {
      entities.date = match[0];
      break;
    }
  }

  // Extract times
  const timePatterns = [
    // Arabic/English time formats
    /\b(\d{1,2}):(\d{2})\s*(ص|م|صباحا|مساء|am|pm)?\b/i,
    // Time words in Arabic
    /\b(صباحا|مساء|ظهرا|عصرا|ليلا)\b/i,
    // Time words in English
    /\b(morning|afternoon|evening|night)\b/i,
  ];

  for (const pattern of timePatterns) {
    const match = lowerMessage.match(pattern);
    if (match) {
      entities.time = match[0];
      break;
    }
  }

  // Extract doctor specialties
  const specialties = [
    "cardiology",
    "neurology",
    "pediatrics",
    "orthopedics",
    "dermatology",
    "gynecology",
    "ophthalmology",
    "urology",
    "psychiatry",
    "endocrinology",
    "قلب",
    "أعصاب",
    "أطفال",
    "عظام",
    "جلدية",
    "نساء وتوليد",
    "عيون",
    "مسالك بولية",
    "نفسية",
    "غدد صماء",
    "طب القلب",
    "طب الأعصاب",
    "طب الأطفال",
    "طب العظام",
    "طب الجلدية",
    "طب النساء والتوليد",
    "طب العيون",
  ];

  for (const specialty of specialties) {
    if (lowerMessage.includes(specialty.toLowerCase())) {
      entities.specialty = specialty;
      break;
    }
  }

  // Extract symptoms
  const symptoms = [
    "headache",
    "fever",
    "cough",
    "pain",
    "nausea",
    "dizziness",
    "fatigue",
    "صداع",
    "حمى",
    "سعال",
    "ألم",
    "غثيان",
    "دوار",
    "تعب",
    "ألم في الصدر",
    "ضيق في التنفس",
    "ألم في البطن",
    "ألم في الظهر",
    "ألم في المفاصل",
  ];

  const extractedSymptoms = [];
  for (const symptom of symptoms) {
    if (lowerMessage.includes(symptom.toLowerCase())) {
      extractedSymptoms.push(symptom);
    }
  }

  if (extractedSymptoms.length > 0) {
    entities.symptoms = extractedSymptoms;
  }

  // Extract doctor names (if mentioned)
  const doctorPattern =
    /\b(دكتور|د|د\.|الدكتور|doctor|dr|dr\.)\s+([\u0600-\u06FFa-zA-Z]+)\b/i;
  const doctorMatch = lowerMessage.match(doctorPattern);
  if (doctorMatch && doctorMatch[2]) {
    entities.doctorName = doctorMatch[2];
  }

  // Extract numbers (could be for appointment duration, cost, etc.)
  const numberPattern = /\b(\d+)\b/;
  const numberMatch = lowerMessage.match(numberPattern);
  if (numberMatch) {
    entities.number = parseInt(numberMatch[1], 10);
  }

  return entities;
}

// Function to determine user intent from message
export function determineIntent(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Define intent patterns with weights for better matching
  const intents = [
    {
      name: "booking_appointment",
      patterns: [
        { text: "book appointment", weight: 1.0 },
        { text: "schedule appointment", weight: 1.0 },
        { text: "make appointment", weight: 1.0 },
        { text: "book", weight: 0.7 },
        { text: "appointment", weight: 0.7 },
        { text: "schedule", weight: 0.6 },
        { text: "visit", weight: 0.5 },
        { text: "see doctor", weight: 0.8 },
        { text: "حجز", weight: 0.7 },
        { text: "موعد", weight: 0.7 },
        { text: "حجز موعد", weight: 1.0 },
      ],
    },
    {
      name: "cancel_appointment",
      patterns: [
        { text: "cancel appointment", weight: 1.0 },
        { text: "reschedule", weight: 0.8 },
        { text: "change appointment", weight: 0.9 },
        { text: "cancel", weight: 0.7 },
        { text: "إلغاء", weight: 0.7 },
        { text: "تغيير موعد", weight: 0.9 },
        { text: "إلغاء موعد", weight: 1.0 },
      ],
    },
    {
      name: "check_hours",
      patterns: [
        { text: "opening hours", weight: 1.0 },
        { text: "business hours", weight: 1.0 },
        { text: "hours", weight: 0.6 },
        { text: "open", weight: 0.5 },
        { text: "close", weight: 0.5 },
        { text: "schedule", weight: 0.4 },
        { text: "ساعات", weight: 0.6 },
        { text: "مفتوح", weight: 0.5 },
        { text: "مغلق", weight: 0.5 },
        { text: "جدول", weight: 0.4 },
        { text: "ساعات العمل", weight: 1.0 },
      ],
    },
    {
      name: "billing_inquiry",
      patterns: [
        { text: "billing", weight: 0.9 },
        { text: "bill", weight: 0.7 },
        { text: "payment", weight: 0.8 },
        { text: "pay", weight: 0.6 },
        { text: "insurance", weight: 0.7 },
        { text: "cost", weight: 0.6 },
        { text: "price", weight: 0.6 },
        { text: "فاتورة", weight: 0.7 },
        { text: "دفع", weight: 0.6 },
        { text: "تأمين", weight: 0.7 },
        { text: "تكلفة", weight: 0.6 },
        { text: "سعر", weight: 0.6 },
      ],
    },
    {
      name: "medical_records",
      patterns: [
        { text: "medical records", weight: 1.0 },
        { text: "health records", weight: 1.0 },
        { text: "records", weight: 0.7 },
        { text: "results", weight: 0.6 },
        { text: "test results", weight: 0.9 },
        { text: "test", weight: 0.5 },
        { text: "report", weight: 0.6 },
        { text: "سجلات", weight: 0.7 },
        { text: "نتائج", weight: 0.6 },
        { text: "تحليل", weight: 0.6 },
        { text: "تقرير", weight: 0.6 },
        { text: "سجلات طبية", weight: 1.0 },
      ],
    },
    {
      name: "symptom_inquiry",
      patterns: [
        { text: "symptom", weight: 0.8 },
        { text: "feel", weight: 0.5 },
        { text: "pain", weight: 0.7 },
        { text: "sick", weight: 0.7 },
        { text: "hurt", weight: 0.7 },
        { text: "not feeling well", weight: 0.9 },
        { text: "عرض", weight: 0.8 },
        { text: "أشعر", weight: 0.5 },
        { text: "ألم", weight: 0.7 },
        { text: "مريض", weight: 0.7 },
        { text: "وجع", weight: 0.7 },
        { text: "لا أشعر بتحسن", weight: 0.9 },
      ],
    },
    {
      name: "doctor_inquiry",
      patterns: [
        { text: "doctor", weight: 0.7 },
        { text: "specialist", weight: 0.8 },
        { text: "physician", weight: 0.8 },
        { text: "find doctor", weight: 0.9 },
        { text: "طبيب", weight: 0.7 },
        { text: "أخصائي", weight: 0.8 },
        { text: "دكتور", weight: 0.7 },
        { text: "البحث عن طبيب", weight: 0.9 },
      ],
    },
    {
      name: "insurance_inquiry",
      patterns: [
        { text: "insurance", weight: 0.8 },
        { text: "coverage", weight: 0.8 },
        { text: "covered", weight: 0.7 },
        { text: "insurance plan", weight: 0.9 },
        { text: "تأمين", weight: 0.8 },
        { text: "تغطية", weight: 0.8 },
        { text: "خطة التأمين", weight: 0.9 },
      ],
    },
    {
      name: "medication_inquiry",
      patterns: [
        { text: "medication", weight: 0.8 },
        { text: "medicine", weight: 0.8 },
        { text: "prescription", weight: 0.9 },
        { text: "refill", weight: 0.9 },
        { text: "drug", weight: 0.7 },
        { text: "دواء", weight: 0.8 },
        { text: "وصفة طبية", weight: 0.9 },
        { text: "تجديد وصفة", weight: 0.9 },
      ],
    },
    {
      name: "emergency_inquiry",
      patterns: [
        { text: "emergency", weight: 1.0 },
        { text: "urgent", weight: 0.9 },
        { text: "immediate", weight: 0.8 },
        { text: "emergency room", weight: 1.0 },
        { text: "طوارئ", weight: 1.0 },
        { text: "عاجل", weight: 0.9 },
        { text: "فوري", weight: 0.8 },
        { text: "غرفة الطوارئ", weight: 1.0 },
      ],
    },
    {
      name: "covid_inquiry",
      patterns: [
        { text: "covid", weight: 0.9 },
        { text: "coronavirus", weight: 0.9 },
        { text: "vaccine", weight: 0.8 },
        { text: "vaccination", weight: 0.8 },
        { text: "test", weight: 0.5 },
        { text: "covid test", weight: 0.9 },
        { text: "كوفيد", weight: 0.9 },
        { text: "كورونا", weight: 0.9 },
        { text: "لقاح", weight: 0.8 },
        { text: "تطعيم", weight: 0.8 },
        { text: "فحص كوفيد", weight: 0.9 },
      ],
    },
    {
      name: "telemedicine_inquiry",
      patterns: [
        { text: "telemedicine", weight: 1.0 },
        { text: "telehealth", weight: 1.0 },
        { text: "virtual", weight: 0.7 },
        { text: "online appointment", weight: 0.9 },
        { text: "video", weight: 0.6 },
        { text: "remote", weight: 0.6 },
        { text: "طب عن بعد", weight: 1.0 },
        { text: "استشارة عبر الإنترنت", weight: 0.9 },
        { text: "موعد افتراضي", weight: 0.9 },
      ],
    },
    {
      name: "lab_results_inquiry",
      patterns: [
        { text: "lab results", weight: 1.0 },
        { text: "test results", weight: 0.9 },
        { text: "laboratory", weight: 0.8 },
        { text: "blood test", weight: 0.8 },
        { text: "نتائج المختبر", weight: 1.0 },
        { text: "نتائج التحاليل", weight: 0.9 },
        { text: "مختبر", weight: 0.8 },
        { text: "تحليل دم", weight: 0.8 },
      ],
    },
    {
      name: "specialist_referral",
      patterns: [
        { text: "referral", weight: 0.9 },
        { text: "refer", weight: 0.8 },
        { text: "specialist", weight: 0.7 },
        { text: "إحالة", weight: 0.9 },
        { text: "تحويل", weight: 0.8 },
        { text: "أخصائي", weight: 0.7 },
      ],
    },
    {
      name: "authorization_inquiry",
      patterns: [
        { text: "login", weight: 0.8 },
        { text: "password", weight: 0.8 },
        { text: "account", weight: 0.7 },
        { text: "access", weight: 0.7 },
        { text: "permission", weight: 0.9 },
        { text: "authorize", weight: 0.9 },
        { text: "authentication", weight: 0.9 },
        { text: "security", weight: 0.8 },
        { text: "تسجيل الدخول", weight: 0.8 },
        { text: "كلمة المرور", weight: 0.8 },
        { text: "حساب", weight: 0.7 },
        { text: "وصول", weight: 0.7 },
        { text: "إذن", weight: 0.9 },
        { text: "تفويض", weight: 0.9 },
        { text: "مصادقة", weight: 0.9 },
        { text: "أمان", weight: 0.8 },
        { text: "صلاحية", weight: 0.9 },
      ],
    },
    {
      name: "greeting",
      patterns: [
        { text: "hello", weight: 0.8 },
        { text: "hi", weight: 0.8 },
        { text: "hey", weight: 0.8 },
        { text: "good morning", weight: 0.9 },
        { text: "good afternoon", weight: 0.9 },
        { text: "مرحبا", weight: 0.8 },
        { text: "أهلا", weight: 0.8 },
        { text: "صباح الخير", weight: 0.9 },
        { text: "مساء الخير", weight: 0.9 },
      ],
    },
    {
      name: "thanks",
      patterns: [
        { text: "thank", weight: 0.8 },
        { text: "thanks", weight: 0.8 },
        { text: "appreciate", weight: 0.7 },
        { text: "thank you", weight: 0.9 },
        { text: "شكرا", weight: 0.8 },
        { text: "شكرًا", weight: 0.8 },
        { text: "أشكرك", weight: 0.8 },
      ],
    },
    {
      name: "goodbye",
      patterns: [
        { text: "bye", weight: 0.8 },
        { text: "goodbye", weight: 0.9 },
        { text: "see you", weight: 0.7 },
        { text: "مع السلامة", weight: 0.9 },
        { text: "وداعا", weight: 0.9 },
        { text: "إلى اللقاء", weight: 0.8 },
      ],
    },
    {
      name: "help",
      patterns: [
        { text: "help", weight: 0.8 },
        { text: "assist", weight: 0.7 },
        { text: "support", weight: 0.7 },
        { text: "مساعدة", weight: 0.8 },
        { text: "دعم", weight: 0.7 },
      ],
    },
  ];

  // Calculate score for each intent
  const scores: Record<string, number> = {};

  for (const intent of intents) {
    let intentScore = 0;
    for (const pattern of intent.patterns) {
      if (lowerMessage.includes(pattern.text)) {
        intentScore += pattern.weight;
      }
    }
    scores[intent.name] = intentScore;
  }

  // Find the intent with the highest score
  let maxScore = 0;
  let bestIntent = "general_inquiry";

  for (const [intent, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  // If the score is too low, return general inquiry
  if (maxScore < 0.5) {
    return "general_inquiry";
  }

  return bestIntent;
}

// Function to maintain conversation context
export function updateConversationContext(
  currentContext: Record<string, any>,
  message: string,
  intent: string,
  entities: Record<string, any>,
): Record<string, any> {
  const updatedContext = { ...currentContext };

  // Update context based on intent
  updatedContext.lastIntent = intent;
  updatedContext.lastMessage = message;

  // Store entities in context
  if (Object.keys(entities).length > 0) {
    updatedContext.entities = { ...updatedContext.entities, ...entities };
  }

  // Track conversation flow
  if (!updatedContext.conversationFlow) {
    updatedContext.conversationFlow = [];
  }
  updatedContext.conversationFlow.push({ intent, timestamp: new Date() });

  // Special handling for specific intents
  switch (intent) {
    case "booking_appointment":
      updatedContext.bookingInProgress = true;
      if (entities.date) updatedContext.appointmentDate = entities.date;
      if (entities.time) updatedContext.appointmentTime = entities.time;
      if (entities.specialty) updatedContext.specialty = entities.specialty;
      if (entities.doctorName) updatedContext.doctorName = entities.doctorName;
      break;

    case "cancel_appointment":
      updatedContext.cancellationInProgress = true;
      break;

    case "symptom_inquiry":
      if (entities.symptoms)
        updatedContext.reportedSymptoms = entities.symptoms;
      break;

    case "authorization_inquiry":
      updatedContext.authorizationInProgress = true;
      break;

    case "goodbye":
      // Clear temporary context when conversation ends
      delete updatedContext.bookingInProgress;
      delete updatedContext.cancellationInProgress;
      delete updatedContext.authorizationInProgress;
      break;
  }

  return updatedContext;
}

// Function to generate appropriate responses based on intent and context
export function generateResponse(
  intent: string,
  context: Record<string, any> = {},
): string {
  // Add a small random delay to simulate thinking (0-100ms)
  const randomDelay = Math.floor(Math.random() * 100);
  if (randomDelay > 0) {
    // This is a non-blocking delay that just burns some CPU cycles
    const start = Date.now();
    while (Date.now() - start < randomDelay) {}
  }

  // Extract relevant context information
  const { entities = {}, lastIntent, appointment, reportedSymptoms } = context;

  switch (intent) {
    case "greeting":
      return "مرحباً! كيف يمكنني مساعدتك اليوم؟";

    case "booking_appointment":
      if (entities.date && entities.time && entities.specialty) {
        return `تم تأكيد حجز موعدك مع أخصائي ${entities.specialty} في تاريخ ${entities.date} الساعة ${entities.time}. هل هناك أي معلومات إضافية تود إضافتها؟`;
      } else if (entities.date && entities.time) {
        return `لقد حددت تاريخ ${entities.date} الساعة ${entities.time}. مع أي تخصص طبي ترغب في حجز الموعد؟`;
      } else if (entities.specialty) {
        return `لقد اخترت تخصص ${entities.specialty}. متى ترغب في حجز الموعد؟`;
      } else if (context.appointmentDate && context.appointmentTime) {
        return `لقد حددت تاريخ ${context.appointmentDate} الساعة ${context.appointmentTime}. هل ترغب في تأكيد هذا الموعد؟`;
      } else if (context.specialty) {
        return `لقد اخترت تخصص ${context.specialty}. متى ترغب في حجز الموعد؟`;
      } else {
        return "يمكنني مساعدتك في حجز موعد. هل يمكنك تحديد التخصص الطبي والتاريخ والوقت المفضل لديك؟";
      }

    case "cancel_appointment":
      if (appointment) {
        return `لإلغاء موعدك مع ${appointment.doctor} في ${appointment.date} الساعة ${appointment.time}، يرجى تأكيد رغبتك في الإلغاء.`;
      }
      return "لإلغاء موعدك، يرجى تزويدي برقم الموعد أو تاريخه ووقته. يمكنك أيضاً الاتصال بنا على الرقم 123-456-7890.";

    case "check_hours":
      return "ساعات العمل لدينا هي من الاثنين إلى الجمعة من 8 صباحاً حتى 6 مساءً، والسبت من 9 صباحاً حتى 2 ظهراً. نحن مغلقون أيام الأحد والعطلات الرسمية.";

    case "billing_inquiry":
      return "يمكنك الاطلاع على فواتيرك ودفعها من خلال بوابة المرضى على موقعنا، أو زيارة مكتب المحاسبة خلال ساعات العمل. هل تحتاج إلى معلومات محددة حول فاتورة معينة؟";

    case "medical_records":
      return "يمكنك الوصول إلى سجلاتك الطبية من خلال بوابة المرضى. إذا كنت بحاجة إلى نسخة مطبوعة، يرجى تقديم طلب في مكتب السجلات الطبية قبل 48 ساعة على الأقل.";

    case "symptom_inquiry":
      if (reportedSymptoms && reportedSymptoms.length > 0) {
        return `أفهم أنك تعاني من ${reportedSymptoms.join(", ")}. من المهم استشارة الطبيب لتقييم حالتك. هل ترغب في حجز موعد؟`;
      } else if (entities.symptoms && entities.symptoms.length > 0) {
        return `أفهم أنك تعاني من ${entities.symptoms.join(", ")}. من المهم استشارة الطبيب لتقييم حالتك. هل ترغب في حجز موعد؟`;
      } else {
        return "يرجى وصف الأعراض التي تعاني منها بمزيد من التفصيل حتى أتمكن من مساعدتك بشكل أفضل.";
      }

    case "doctor_inquiry":
      if (entities.specialty || context.specialty) {
        const specialty = entities.specialty || context.specialty;
        return `لدينا عدة أطباء متخصصين في ${specialty}. يمكنك الاطلاع على قائمة الأطباء وسيرهم الذاتية على موقعنا. هل ترغب في حجز موعد مع أحدهم؟`;
      } else {
        return "لدينا فريق من الأطباء المتخصصين في مختلف المجالات. هل هناك تخصص معين تبحث عنه؟";
      }

    case "insurance_inquiry":
      return "نحن نتعامل مع معظم شركات التأمين الرئيسية. يمكنك التحقق من تغطية التأمين الخاصة بك عن طريق الاتصال بمكتب التأمين لدينا على الرقم 123-456-7890. هل تحتاج إلى معلومات محددة حول تغطية تأمينية معينة؟";

    case "medication_inquiry":
      return "للاستفسار عن الأدوية أو تجديد الوصفات الطبية، يرجى التواصل مع طبيبك المعالج أو زيارة الصيدلية الخاصة بنا. هل تحتاج إلى معلومات حول دواء معين أو تجديد وصفة طبية؟";

    case "emergency_inquiry":
      return "إذا كنت تواجه حالة طبية طارئة، يرجى الاتصال بالرقم 911 فوراً. قسم الطوارئ لدينا مفتوح على مدار 24 ساعة في اليوم، 7 أيام في الأسبوع.";

    case "covid_inquiry":
      return "نحن نقدم خدمات فحص وتطعيم كوفيد-19. يمكنك حجز موعد للفحص أو التطعيم من خلال موقعنا الإلكتروني أو الاتصال بنا على الرقم 123-456-7890. هل ترغب في معرفة المزيد عن بروتوكولات السلامة الخاصة بنا؟";

    case "telemedicine_inquiry":
      return "نعم، نقدم خدمات الاستشارات الطبية عن بعد. يمكنك حجز موعد للاستشارة عبر الإنترنت من خلال بوابة المرضى أو الاتصال بنا. هل ترغب في معرفة المزيد عن كيفية الاستعداد للاستشارة عبر الإنترنت؟";

    case "lab_results_inquiry":
      return "يمكنك الاطلاع على نتائج المختبر الخاصة بك من خلال بوابة المرضى. عادة ما تكون النتائج متاحة في غضون 24-48 ساعة بعد إجراء الاختبار. هل تواجه صعوبة في الوصول إلى نتائجك؟";

    case "specialist_referral":
      return "للإحالة إلى أخصائي، يرجى التواصل مع طبيبك الأساسي أولاً. سيقوم بتقييم حالتك وتقديم الإحالة المناسبة إذا لزم الأمر. هل تبحث عن تخصص معين؟";

    case "authorization_inquiry":
      return "للوصول إلى معلوماتك الطبية، يجب عليك تسجيل الدخول إلى حسابك في بوابة المرضى. نحن نتبع إجراءات أمنية صارمة لحماية خصوصية المرضى وفقاً لقوانين HIPAA. هل تحتاج إلى مساعدة في تسجيل الدخول أو إعادة تعيين كلمة المرور؟";

    case "thanks":
      return "شكراً لك! يسعدني أن أكون قادراً على مساعدتك. هل هناك أي شيء آخر يمكنني مساعدتك به؟";

    case "goodbye":
      return "شكراً لتواصلك معنا. نتمنى لك يوماً سعيداً ونراك قريباً!";

    case "help":
      return "يمكنني مساعدتك في حجز المواعيد، الاستفسار عن الفواتير، الوصول إلى السجلات الطبية، معرفة ساعات العمل، أو التواصل مع الأطباء. ما الذي تحتاج المساعدة فيه؟";

    default:
      // If we have context from previous interactions, try to continue the conversation
      if (lastIntent === "booking_appointment") {
        return "هل ترغب في متابعة حجز موعدك؟ يمكنني مساعدتك في اختيار الوقت المناسب أو الطبيب المناسب.";
      } else if (lastIntent === "symptom_inquiry" && reportedSymptoms) {
        return `بناءً على الأعراض التي ذكرتها (${reportedSymptoms.join(", ")}), قد يكون من المفيد استشارة طبيب. هل ترغب في حجز موعد؟`;
      }

      return "شكراً لتواصلك معنا. هل يمكنني مساعدتك في أي استفسار آخر حول خدماتنا الطبية، المواعيد، الفواتير، أو السجلات الطبية؟";
  }
}

// Function to generate contextual suggestions based on intent and context
export function generateSuggestions(
  intent: string,
  context: Record<string, any> = {},
): string[] {
  // Extract relevant context information
  const { bookingInProgress, specialty, appointmentDate, appointmentTime } =
    context;

  switch (intent) {
    case "greeting":
      return [
        "أريد حجز موعد",
        "ما هي ساعات العمل؟",
        "كيف يمكنني الوصول إلى سجلاتي الطبية؟",
        "لدي استفسار حول الفاتورة",
        "هل تقبلون التأمين الصحي؟",
      ];

    case "booking_appointment":
      if (bookingInProgress) {
        if (!specialty) {
          return ["طب عام", "أمراض قلب", "أمراض جلدية", "أطفال", "عيون"];
        } else if (!appointmentDate) {
          return [
            "غداً",
            "الأسبوع القادم",
            "يوم الاثنين القادم",
            "بعد أسبوعين",
          ];
        } else if (!appointmentTime) {
          return [
            "صباحاً",
            "بعد الظهر",
            "9:00 صباحاً",
            "2:00 مساءً",
            "4:30 مساءً",
          ];
        }
      }
      return [
        "ما هي التخصصات المتاحة؟",
        "هل يمكنني اختيار طبيب محدد؟",
        "كيف يمكنني إلغاء موعد؟",
        "كم تكلفة الاستشارة؟",
      ];

    case "cancel_appointment":
      return [
        "نعم، أريد إلغاء موعدي",
        "أريد إعادة جدولة الموعد",
        "ما هي سياسة الإلغاء؟",
        "هل هناك رسوم للإلغاء؟",
      ];

    case "check_hours":
      return [
        "هل أنتم مفتوحون في عطلة نهاية الأسبوع؟",
        "هل أحتاج إلى موعد مسبق؟",
        "ما هو رقم الهاتف للاتصال؟",
        "ما هي ساعات العمل في رمضان؟",
      ];

    case "billing_inquiry":
      return [
        "كيف يمكنني دفع فاتورتي؟",
        "هل تقبلون التأمين الصحي؟",
        "ما هي تكلفة الاستشارة؟",
        "هل يمكنني الحصول على تقسيط للدفع؟",
      ];

    case "medical_records":
      return [
        "كيف يمكنني الوصول إلى نتائج التحاليل؟",
        "هل يمكن إرسال التقارير بالبريد الإلكتروني؟",
        "من يمكنه الاطلاع على سجلاتي الطبية؟",
        "كم من الوقت تحتفظون بالسجلات الطبية؟",
      ];

    case "symptom_inquiry":
      return [
        "هل يجب أن أرى طبيباً؟",
        "هل هذه الأعراض خطيرة؟",
        "أريد حجز موعد مع طبيب",
        "ما هي الإسعافات الأولية التي يمكنني القيام بها؟",
      ];

    case "doctor_inquiry":
      return [
        "من هم الأطباء المتخصصون لديكم؟",
        "هل يمكنني اختيار طبيب محدد؟",
        "أريد معرفة المزيد عن خبرات الأطباء",
        "هل لديكم أطباء يتحدثون لغات أخرى؟",
      ];

    case "insurance_inquiry":
      return [
        "ما هي شركات التأمين المعتمدة لديكم؟",
        "هل تغطي بوليصتي جميع الخدمات؟",
        "كيف يمكنني التحقق من تغطية التأمين الخاصة بي؟",
        "هل أحتاج إلى موافقة مسبقة من شركة التأمين؟",
      ];

    case "medication_inquiry":
      return [
        "كيف يمكنني تجديد وصفتي الطبية؟",
        "هل لديكم صيدلية في العيادة؟",
        "هل يمكنني طلب الأدوية عبر الإنترنت؟",
        "ما هي آثار هذا الدواء الجانبية؟",
      ];

    case "emergency_inquiry":
      return [
        "ما هي أعراض الحالات الطارئة؟",
        "هل يجب علي الذهاب إلى الطوارئ أم العيادة؟",
        "كم تكلفة زيارة الطوارئ؟",
        "هل تحتاجون إلى موعد مسبق للطوارئ؟",
      ];

    case "covid_inquiry":
      return [
        "ما هي أعراض كوفيد-19؟",
        "أين يمكنني الحصول على اللقاح؟",
        "هل تقدمون فحوصات كوفيد-19؟",
        "ما هي إجراءات السلامة المتبعة في العيادة؟",
      ];

    case "telemedicine_inquiry":
      return [
        "كيف تتم الاستشارة عبر الإنترنت؟",
        "ما هي المتطلبات التقنية للاستشارة عن بعد؟",
        "هل تكلفة الاستشارة عن بعد مختلفة؟",
        "هل يغطي التأمين الاستشارات عن بعد؟",
      ];

    case "lab_results_inquiry":
      return [
        "متى تظهر نتائج التحاليل؟",
        "كيف يمكنني الوصول إلى نتائج التحاليل؟",
        "هل يمكن إرسال النتائج بالبريد الإلكتروني؟",
        "هل يمكنني الحصول على نسخة مطبوعة من النتائج؟",
      ];

    case "specialist_referral":
      return [
        "كيف يمكنني الحصول على إحالة؟",
        "هل أحتاج إلى إحالة لزيارة أخصائي؟",
        "كم من الوقت تستغرق عملية الإحالة؟",
        "هل يغطي التأمين الزيارات بدون إحالة؟",
      ];

    case "authorization_inquiry":
      return [
        "كيف يمكنني إعادة تعيين كلمة المرور؟",
        "من يمكنه الوصول إلى سجلاتي الطبية؟",
        "هل يمكنني تفويض شخص آخر للوصول إلى معلوماتي؟",
        "ما هي إجراءات الأمان المتبعة لحماية بياناتي؟",
      ];

    case "help":
    case "general_inquiry":
    default:
      return [
        "كيف يمكنني حجز موعد؟",
        "ما هي ساعات العمل؟",
        "هل تقبلون التأمين الصحي؟",
        "هل تقدمون استشارات عن بعد؟",
        "كيف يمكنني الوصول إلى نتائج التحاليل؟",
      ];
  }
}
