export const CONTACT_OPTIONS = [
  {
    id: "whatsapp",
    title: "Chat on WhatsApp",
    bestFor: "Best for quick questions and course advice.",
    body: "Send us a message and we'll respond as quickly as we can. Tell us your experience and what you're looking for — we'll recommend the right course.",
  },
  {
    id: "call",
    title: "Call Us",
    bestFor: "Best for immediate questions during office hours.",
    body: "Speak directly to our enrolment team. We'll answer your questions and help you choose the right course.",
  },
  {
    id: "visit",
    title: "Visit Us",
    bestFor: "Best for meeting the team and seeing the vehicles.",
    body: "Walk in during office hours. We're happy to show you around, introduce you to an instructor, and answer all your questions in person.",
  },
] as const;

export const OFFICE_HOURS = [
  "Monday–Friday: 08:00 – 17:00",
  "Saturday: 08:00 – 13:00",
  "Sunday: Closed",
] as const;

export const AFTER_SUBMIT_STEPS = [
  {
    title: "We Review Your Details",
    body: "Within a few hours (during office hours), we'll review your registration and confirm the right course for you.",
  },
  {
    title: "We Contact You",
    body: "We'll reach out via your preferred contact method to confirm your course recommendation, answer questions, send payment instructions, and explain what happens next.",
  },
  {
    title: "You Pay & Start",
    body: "Once you're happy with everything, you pay via mobile money, bank transfer, or cash. Your lesson credits are added instantly. You can book your first lesson right away.",
  },
] as const;

export const REGISTER_FAQS = [
  {
    q: "Do I have to pay when I register?",
    a: "No. Registration is free. You only pay when you're ready to start your course and activate your lesson credits.",
  },
  {
    q: "How long does registration take?",
    a: "The form takes about 10 minutes. After you submit, we'll contact you within a few hours (during office hours) to confirm everything.",
  },
  {
    q: "Can I register without all my documents?",
    a: "Yes. You can register now and submit your NRC, photo, and other documents later. We'll remind you what's needed before you can take the RTSA theory test.",
  },
  {
    q: "Can someone else register on my behalf?",
    a: "Yes. A parent, sponsor, or employer can start the registration process. But we'll need your own details and consent to create your student account.",
  },
  {
    q: "I'm not sure which course to choose. Can you help?",
    a: 'Absolutely. Select "Not sure — recommend a course for me" and we\'ll help you choose based on your experience and goals. Or WhatsApp us and we\'ll guide you.',
  },
  {
    q: "What if I register but change my mind?",
    a: "That's okay. Registration doesn't commit you to anything. If you decide not to proceed, just let us know. No hard feelings.",
  },
  {
    q: "Is my information safe?",
    a: "Yes. We take your privacy seriously. Your data is stored securely and never shared without your consent. We comply with Zambia's Data Protection Act.",
  },
  {
    q: "How do I pay after registering?",
    a: "We'll send you payment instructions via WhatsApp or email. We accept mobile money (MTN, Airtel, Zamtel), bank transfer, and cash at our Emmasdale office.",
  },
  {
    q: "Can I pay in instalments?",
    a: 'Yes. We offer a deposit + instalment plan. Let us know in the "Questions or comments" field and we\'ll discuss a plan that works for you.',
  },
] as const;

import { business } from "@/lib/business";

export const CONTACT_EMAIL = business.email;
export const CONTACT_PHONE_DISPLAY = business.phoneDisplay;
export const CONTACT_PHONE_TEL = business.phoneTel;
export const FACEBOOK_URL = business.facebookUrl;
