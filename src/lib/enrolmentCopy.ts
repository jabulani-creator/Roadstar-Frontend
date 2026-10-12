export const BIG_PICTURE_STEPS = [
  {
    title: "Enquire & Choose",
    body: "Find your course, ask questions, and choose the path that fits you.",
    href: "/find-your-course",
    cta: "Find Your Course",
  },
  {
    title: "Register & Pay",
    body: "Create your account, submit your documents, and pay for your package.",
    href: "/contact",
    cta: "Register Now",
  },
  {
    title: "Train with Roadstar",
    body: "Book lessons at your convenience. Train with patient instructors.",
    href: "/instructors",
    cta: "Meet Instructors",
  },
  {
    title: "RTSA Test Ready",
    body: "We prepare you. You book and pass your test with RTSA.",
    href: "/licensing",
    cta: "Learn About RTSA",
  },
] as const;

export const DOCUMENT_CHECKLIST = [
  {
    item: "NRC or Passport",
    details: "Your National Registration Card or passport for identification.",
    required: true,
  },
  {
    item: "Passport-sized photo",
    details: "A recent photo for your student file and RTSA documents.",
    required: true,
  },
  {
    item: "Phone number",
    details: "We'll use this to contact you about lessons and updates.",
    required: true,
  },
  {
    item: "Email address",
    details: "For receipts, notifications, and your student account.",
    required: true,
  },
  {
    item: "Proof of residence",
    details: "Optional, but helpful for some RTSA processes.",
    required: false,
  },
  {
    item: "Deposit or full payment",
    details: "To activate your lesson credits.",
    required: true,
  },
] as const;

export const REGISTRATION_STEPS = [
  {
    title: "Create Your Account",
    do: "Visit our registration page and fill in your basic details: name, phone number, email address, and preferred location (Emmasdale or Thornpark).",
    next: "You'll receive a confirmation message with your student account details. You can log in anytime to check your balance, book lessons, and view your progress.",
    time: "2–3 minutes",
  },
  {
    title: "Choose Your Course",
    do: "Select the course that fits your experience and goals. If you're not sure, use our Find Your Course tool or WhatsApp us for help.",
    next: "Your chosen course will be added to your account. You'll see exactly what's included, what's not, and the total cost.",
    time: "1–2 minutes",
  },
  {
    title: "Submit Your Documents",
    do: "Upload or bring your NRC/passport and passport photo. If you have proof of residence, include that too.",
    next: "We'll verify your documents and add them to your student file. This is required before you can take the RTSA theory test.",
    time: "5–10 minutes",
  },
  {
    title: "Pay for Your Package",
    do: "Pay the full amount or a deposit via mobile money, bank transfer, or cash at our office.",
    next: "You'll receive a receipt immediately. Your lesson credits will be added to your account. You're now ready to book lessons.",
    time: "5–10 minutes",
  },
  {
    title: "Book Your First Lesson",
    do: "Log in to your student account and choose a date, time, and instructor. Or WhatsApp us and we'll book it for you.",
    next: "You'll receive a confirmation with your instructor's name, vehicle details, and pickup location (if applicable).",
    time: "2–3 minutes",
  },
  {
    title: "Start Training",
    do: "Show up for your lesson (or we'll pick you up). Bring your learner's spirit and your questions.",
    next: "Your instructor will assess your current level and create a personalised plan. You'll receive progress notes after every lesson.",
    time: "Your lesson duration",
  },
] as const;

export const RTSA_JOURNEY = [
  {
    title: "Get Your Provisional Licence",
    happens:
      "Before you can take the theory test, you need a provisional licence from RTSA. This involves a medical examination and an application.",
    need: [
      "NRC or passport",
      "Passport photo",
      "Medical report (from a registered clinic)",
      "Payment for the provisional licence fee",
    ],
    roadstar: "We'll guide you through the requirements and help you prepare.",
    feeSlug: "demo-rtsa-provisional",
  },
  {
    title: "Take the Theory Test",
    happens:
      "RTSA administers a computerised theory test covering road signs, rules of the road, and safe driving practices.",
    need: ["Provisional licence", "Payment for the theory test fee (confirm with RTSA)"],
    roadstar:
      "Our courses include theory preparation. We'll help you study and practice with quizzes and mock tests.",
    feeSlug: null,
  },
  {
    title: "Complete Your Practical Training",
    happens:
      "This is where Roadstar does most of the work. You'll complete your practical lessons with our instructors, building skills and confidence.",
    need: ["Your lesson credits", "Commitment to practice"],
    roadstar:
      "We provide the vehicle, the instructor, and the structured lessons. We'll track your progress and tell you when you're ready for the test.",
    feeSlug: "included",
  },
  {
    title: "Take the Practical Test",
    happens:
      "RTSA administers the practical driving test. An examiner will assess your driving skills on a set route.",
    need: [
      "Completion of your Roadstar training",
      "Payment for the practical test fee",
      "Your instructor's assessment that you're ready",
    ],
    roadstar:
      "We'll prepare you with mock tests on RTSA routes. We'll also provide a vehicle for the test if requested.",
    feeSlug: "demo-rtsa-practical-test",
  },
  {
    title: "Get Your Licence",
    happens:
      "If you pass, RTSA will issue your licence card. You're now a licensed driver.",
    need: ["Payment for the licence card fee", "Your photo and details"],
    roadstar:
      "We'll celebrate with you! And we're here if you ever need refresher lessons or advanced training.",
    feeSlug: "demo-rtsa-licence-printing",
  },
] as const;

export const ENROLMENT_FAQS = [
  {
    q: "How long does registration take?",
    a: "If you have all your documents ready, registration takes about 10–15 minutes. You can complete it online or at our Emmasdale office.",
  },
  {
    q: "Can I register without visiting the office?",
    a: "Yes. You can register entirely online. You'll need to upload your documents, but you can do that from your phone. Full online registration is rolling out — WhatsApp us and we'll guide you today.",
  },
  {
    q: "What if I don't have all my documents yet?",
    a: "You can start your registration and submit documents later. We'll remind you what's needed before you can proceed to the RTSA theory test.",
  },
  {
    q: "Can someone else register on my behalf?",
    a: "Yes, a parent or sponsor can start the registration process. But you'll need to provide your own documents and consent.",
  },
  {
    q: "How do I pay?",
    a: "We accept mobile money (MTN, Airtel, Zamtel), bank transfer, and cash at our Emmasdale office. You'll receive a receipt immediately.",
  },
  {
    q: "What happens after I pay?",
    a: "Your lesson credits are added to your account instantly. You can then book your first lesson through your student account or via WhatsApp.",
  },
  {
    q: "Can I get a refund if I change my mind?",
    a: "Refunds are handled case by case. Contact us as soon as possible if your circumstances change. See our full terms for details.",
  },
  {
    q: "How long are my lesson credits valid?",
    a: "Your credits remain valid for a generous period from the date of purchase. We'll remind you before they expire. Confirm the current validity window when you enrol.",
  },
  {
    q: "Can I transfer my credits to someone else?",
    a: "In some cases, yes. Contact us to discuss your situation.",
  },
  {
    q: "What if I fail my RTSA test?",
    a: "It happens. If you don't pass, you can book additional lessons with Roadstar and retake the test. We'll give you honest feedback on what to improve.",
  },
] as const;
