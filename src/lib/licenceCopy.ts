export const CLASS_COMPARISON = [
  {
    code: "B",
    what: "Motor vehicle up to 3,500 kg GVM, with trailer under 750 kg",
    examples: "Sedans, SUVs, small vans, minibuses",
    use: "Personal driving, family car",
  },
  {
    code: "C1",
    what: "Goods vehicle over 3,500 kg but under 7,500 kg GVM",
    examples: "Light trucks, delivery vans, small lorries",
    use: "Professional driving, delivery",
  },
  {
    code: "C",
    what: "Goods vehicle over 7,500 kg GVM",
    examples: "Heavy trucks, rigid lorries",
    use: "Professional heavy goods driving",
  },
] as const;

export const CLASS_DETAILS = {
  B: {
    title: "Class B — The Standard Driving Licence",
    tagline: "The licence most people start with.",
    covers:
      "A motor vehicle with a Gross Vehicle Mass (GVM) of 3,500 kg or less, with a trailer under 750 kg.",
    update: null as string | null,
    vehicles: [
      "Sedans and hatchbacks",
      "SUVs and station wagons",
      "Small vans and pickups",
      "Minibuses (under 3,500 kg GVM)",
      "Automatic and manual transmission vehicles",
    ],
    whoFor:
      "This is the standard licence for personal driving. If you want to drive a family car, your own vehicle, or a company car, this is the class you need.",
    qualify: [
      "Minimum age: 18 years",
      "Valid NRC or passport",
      "Medical certificate from a government hospital",
      "Pass the RTSA theory test",
      "Complete practical training",
      "Pass the RTSA practical test",
    ],
  },
  C1: {
    title: "Class C1 — Light Commercial Vehicle Licence",
    tagline: "For professional drivers who need more than a Class B.",
    covers:
      "A goods vehicle with a GVM greater than 3,500 kg but less than 7,500 kg, with a trailer under 750 kg.",
    update:
      "Under the TTTFP realignment, Class C1 is now exclusively for goods vehicles. The previous passenger component (omnibus/minibus) has been removed, and the GVM ceiling was reduced from 16,000 kg to 7,500 kg.",
    vehicles: [
      "Light trucks (e.g., Canter, small lorries)",
      "Delivery vans over 3,500 kg",
      "Goods vehicles under 7,500 kg GVM",
    ],
    whoFor:
      "This is for professional drivers who need to operate light commercial vehicles. If you're working in delivery, logistics, or transport, this is often the required class.",
    qualify: [
      "Hold a valid Class B licence",
      "Minimum age: 25 years (for professional driving)",
      "Medical certificate",
      "Pass the RTSA theory and practical tests for Class C1",
    ],
  },
  C: {
    title: "Class C — Heavy Goods Vehicle Licence",
    tagline: "For heavy truck and large vehicle operators.",
    covers:
      "A goods vehicle with a GVM greater than 7,500 kg, with a trailer under 750 kg.",
    update:
      "Under the TTTFP realignment, Class C is now exclusively for goods vehicles with GVM over 7,500 kg. The previous bus/passenger component has been removed.",
    vehicles: [
      "Heavy trucks and rigid lorries",
      "Large goods vehicles over 7,500 kg GVM",
    ],
    whoFor:
      "This is for experienced professional drivers who operate heavy goods vehicles. It's often required for long-haul trucking, construction transport, and heavy logistics.",
    qualify: [
      "Hold a valid Class B licence",
      "Minimum age: 25 years",
      "Medical certificate",
      "Significant professional driving experience",
      "Pass the RTSA theory and practical tests for Class C",
    ],
  },
} as const;

export const PROGRESSION_STEPS = [
  {
    title: "Get Your Class B",
    body: "The standard licence. Most drivers start here.",
  },
  {
    title: "Gain Experience",
    body: "Drive regularly. Build confidence and hours behind the wheel. Most professional paths require 2+ years of driving experience.",
  },
  {
    title: "Choose Your Path",
    body: "Class C1 → Light commercial vehicles (goods under 7,500 kg). Class C → Heavy goods vehicles (over 7,500 kg).",
  },
  {
    title: "Professional Certification",
    body: "Add endorsements as needed: PSV (public service vehicle), hazardous materials, or defensive driving certification.",
  },
] as const;

export const RTSA_CLASS_STEPS = [
  {
    title: "Medical Examination",
    body: "Visit a government hospital or registered clinic for a medical fitness test. This confirms you're physically capable of driving.",
  },
  {
    title: "Theory Test",
    body: "Apply for a provisional driving licence and sit the RTSA theory test. You need a minimum of 60% to pass for private motor vehicle classes. Study the Zambian Highway Code.",
  },
  {
    title: "Provisional Licence",
    body: "Once you pass the theory test, you'll be issued a provisional driving licence. This is valid for 3 months and allows you to learn under supervision.",
  },
  {
    title: "Practical Training",
    body: "This is where Roadstar comes in. Enrol in a course for your chosen class. Complete your practical lessons with a certified instructor.",
  },
  {
    title: "Practical Test",
    body: "Book your practical test with RTSA. You must complete it within the 3-month validity of your provisional licence.",
  },
  {
    title: "Full Licence",
    body: "After passing the practical test, apply for your full driving licence. Pay the licence printing fee and collect your card.",
  },
] as const;

export const LICENCE_FAQS = [
  {
    q: "What's the difference between Class B and Class C1?",
    a: "Class B is for passenger cars and light vehicles up to 3,500 kg. Class C1 is for goods vehicles over 3,500 kg but under 7,500 kg. You need a Class B licence before you can train for C1.",
  },
  {
    q: "Can I drive a minibus with a Class B licence?",
    a: "Yes, if the minibus has a GVM of 3,500 kg or less. If it exceeds 3,500 kg, you'll need a higher class.",
  },
  {
    q: "Do I need a Class C1 or Class C for delivery driving?",
    a: "It depends on the vehicle weight. Most delivery vans and light trucks fall under Class C1. Larger trucks require Class C. Check your vehicle's GVM.",
  },
  {
    q: "How long does it take to upgrade from Class B to C1?",
    a: "The training takes about 20 days with Roadstar. The full process — including RTSA tests — typically takes 1–3 months depending on scheduling.",
  },
  {
    q: "Can I train for Class C1 or C without owning a vehicle?",
    a: "Yes. Roadstar provides the training vehicle. You don't need to own a truck to get your licence.",
  },
  {
    q: "What is the PSV endorsement?",
    a: "PSV stands for Public Service Vehicle. It's an additional endorsement for drivers who carry passengers for hire (taxis, buses, minibuses). It requires additional training and a clean driving record. Contact us for details.",
  },
  {
    q: "Do I need defensive driving certification?",
    a: "Some employers require it. RTSA also requires defensive driving training for driving instructor licences. We can help you understand if you need it for your career goals.",
  },
] as const;

/** RTSA statutory fees shown on the licence-classes page (excludes medical). */
export const RTSA_STATUTORY_SLUGS = [
  "demo-rtsa-provisional",
  "demo-rtsa-practical-test",
  "demo-rtsa-licence-printing",
] as const;
