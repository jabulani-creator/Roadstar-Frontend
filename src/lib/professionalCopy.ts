export const AUDIENCE_CARDS = [
  {
    title: "Bus & Minibus Operators",
    body: "Driver discipline, passenger safety, and operating risk. We help PSV operators build a culture of safe driving.",
  },
  {
    title: "Logistics & Distribution Companies",
    body: "Delivery fleets, sales teams, and field operations. Reduce downtime, claims, and avoidable costs.",
  },
  {
    title: "Schools & NGOs",
    body: "School transport and staff field travel. Protect children, passengers, and your organisation's reputation.",
  },
  {
    title: "Construction & Heavy Transport",
    body: "Heavy goods vehicle operators. We train drivers for Class C and defensive driving on Lusaka's roads.",
  },
] as const;

export const TRAINING_MODULES = [
  {
    title: "Defensive Driving",
    covers: [
      "Hazard anticipation and early response",
      "Safe following distance and overtaking risk",
      "Junction behaviour and vulnerable road users",
      "Speed choice and fatigue management",
    ],
    why: "Most crashes are preventable. Defensive driving teaches your drivers to anticipate risk before it becomes an incident.",
  },
  {
    title: "Fleet Risk Assessment",
    covers: [
      "Route risk awareness (high-risk areas, school zones, poor lighting)",
      "Driver behaviour review",
      "Vehicle check procedures",
      "Incident reporting and near-miss analysis",
    ],
    why: "You can't manage what you don't measure. We help you understand where your real risks are.",
  },
  {
    title: "Licence Class Training (C1 & C)",
    covers: [
      "Full practical training for Class C1 and Class C",
      "Preparation for RTSA theory and practical tests",
      "Vehicle-specific training (light commercial to heavy goods)",
    ],
    why: "Your drivers need the right licence for the vehicles they operate. We train them to the standard RTSA requires — and beyond.",
  },
] as const;

export const DELIVERY_PACKAGES = [
  {
    name: "Half-Day Briefing",
    bestFor: "Small teams, urgent refresher, management sensitisation",
    includes: "Short session, key recommendations, attendance list",
  },
  {
    name: "One-Day Driver Workshop",
    bestFor: "PSV, school transport, NGO, and company drivers",
    includes: "Training, pre/post assessment, certificates, summary report",
  },
  {
    name: "Fleet Safety Audit & Training",
    bestFor: "Organisations needing deeper risk review",
    includes: "Policy review, driver training, route risk notes, management briefing",
  },
  {
    name: "Annual FleetSafe Partnership",
    bestFor: "Large fleets and serious operators",
    includes: "Quarterly training, scorecard, incident review, improvement plan",
  },
] as const;

export const WHY_ROADSTAR = [
  {
    title: "Lusaka-Based",
    body: "We know Lusaka's roads. We train on the routes your drivers actually use — from Emmasdale to industrial areas, from Thornpark to the city centre.",
  },
  {
    title: "Certified Instructors",
    body: "All our instructors are RTSA-certified with professional driving experience. They understand the demands of commercial driving.",
  },
  {
    title: "Practical Focus",
    body: "We don't just teach theory. Your drivers will spend time behind the wheel, practising the skills that matter in real traffic.",
  },
] as const;

export const PROFESSIONAL_FAQS = [
  {
    q: "Do you train at our premises or yours?",
    a: "Both. We can deliver training at our Emmasdale location or at your site, depending on your needs and fleet size. Contact us to discuss.",
  },
  {
    q: "How many drivers can you train at once?",
    a: "It depends on the programme. For classroom-based sessions, we can accommodate larger groups. For practical driving, we work in smaller batches to ensure quality.",
  },
  {
    q: "Do you provide certificates?",
    a: "Yes. Drivers who complete our training receive a certificate of completion.",
  },
  {
    q: "Can you assess our current drivers' skills?",
    a: "Yes. We offer driver assessment as part of our fleet risk review. This helps you understand where your gaps are.",
  },
  {
    q: "Do you offer refresher training for existing drivers?",
    a: "Yes. Regular refresher training is recommended for all professional drivers. We can design a programme that fits your schedule.",
  },
  {
    q: "What is defensive driving, and why does it matter?",
    a: "Defensive driving is a set of techniques that help drivers anticipate and avoid hazards. It reduces crash risk, lowers insurance claims, and protects your drivers and vehicles.",
  },
  {
    q: "How much does fleet training cost?",
    a: "It depends on scope. We'll provide a quote after understanding your needs. Contact us to discuss.",
  },
] as const;

export const DRIVER_COUNT_OPTIONS = ["1–5", "6–15", "16–30", "30+"] as const;
