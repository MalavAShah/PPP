import { 
  Category, 
  Criterion, 
  Club, 
  User, 
  EventItem, 
  Evidence, 
  Audit, 
  Certificate, 
  AuditLog, 
  ScoringWeights, 
  CertificationThresholds,
  EventResponse
} from '../types';

export const DEFAULT_WEIGHTS: ScoringWeights = {
  waste_management: 25,
  food_sustainability: 20,
  paper_materials: 15,
  sustainable_procurement: 15,
  social_sustainability: 15,
  innovation: 10,
};

export const DEFAULT_THRESHOLDS: CertificationThresholds = {
  platinum: 90,
  gold: 75,
  silver: 60,
};

export const CATEGORIES: Category[] = [
  {
    category_id: 'cat-waste',
    category_name: 'Waste Management',
    weight: 25,
    icon_name: 'Trash2',
    description: 'Segregation, recycling, plastic elimination, and organic waste handling.'
  },
  {
    category_id: 'cat-food',
    category_name: 'Food Sustainability',
    weight: 20,
    icon_name: 'Utensils',
    description: 'Demand-based planning, eco-cutlery, and surplus redistribution.'
  },
  {
    category_id: 'cat-paper',
    category_name: 'Paper & Materials',
    weight: 15,
    icon_name: 'FileText',
    description: 'Digital passes, reduced printing, and modular reusable decor.'
  },
  {
    category_id: 'cat-procurement',
    category_name: 'Sustainable Procurement',
    weight: 15,
    icon_name: 'ShoppingBag',
    description: 'Local vendors, eco-mementos, and responsible ethical sourcing.'
  },
  {
    category_id: 'cat-social',
    category_name: 'Social Sustainability',
    weight: 15,
    icon_name: 'Users',
    description: 'Accessibility, inclusivity, vendor fairness, and participant wellbeing.'
  },
  {
    category_id: 'cat-innovation',
    category_name: 'Innovation',
    weight: 10,
    icon_name: 'Lightbulb',
    description: 'Novel sustainability initiatives and technology-based solutions.'
  }
];

export const CRITERIA: Criterion[] = [
  // Waste Management (25 points)
  {
    criterion_id: 'crit-wm-1',
    category_id: 'cat-waste',
    title: 'Waste Segregation Infrastructure',
    description: 'Provide clearly labeled wet, dry, and recyclable waste bins at all venue points.',
    max_points: 7,
    requirement: 'Set up minimum 3-bin segregation stations with bilingual signage across venue.',
    evidence_required: 'Photographs of installed waste stations during peak event hours.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-wm-2',
    category_id: 'cat-waste',
    title: 'Single-Use Plastics Elimination',
    description: 'Strict prohibition of single-use plastic bottles, cups, bags, and cutlery.',
    max_points: 10,
    requirement: '100% elimination of single-use plastics across catering, stage, and participant kits.',
    evidence_required: 'Photographs of catering setup + Vendor declarations/invoices.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-wm-3',
    category_id: 'cat-waste',
    title: 'Composting & Organic Waste Handling',
    description: 'Divert wet food waste to campus biogas or composting facility.',
    max_points: 8,
    requirement: 'Weigh food waste post-event and log campus facility transfer.',
    evidence_required: 'Compost transfer receipt or post-event food weight log photograph.',
    response_type: 'YES_NO'
  },

  // Food Sustainability (20 points)
  {
    criterion_id: 'crit-fs-1',
    category_id: 'cat-food',
    title: 'Demand-Based Meal Planning',
    description: 'Use pre-registration RSVPs to accurately calculate catering quantities.',
    max_points: 7,
    requirement: 'Keep over-ordering margin under 5% of confirmed pre-registrations.',
    evidence_required: 'Registration RSVP list vs Catering order invoice comparison.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-fs-2',
    category_id: 'cat-food',
    title: 'Reusable or Bio-based Cutlery',
    description: 'Serve food exclusively using reusable ceramics/steel or compostable palm leaf cutlery.',
    max_points: 7,
    requirement: 'Zero plastic disposable cutlery permitted.',
    evidence_required: 'Photographs of food counters and serving plates.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-fs-3',
    category_id: 'cat-food',
    title: 'Surplus Food Redistribution',
    description: 'Formal arrangement with campus canteen or local NGO for extra food.',
    max_points: 6,
    requirement: 'Pack and donate unconsumed food within 2 hours of event conclusion.',
    evidence_required: 'NGO acknowledgement receipt or transfer photo.',
    response_type: 'YES_NO'
  },

  // Paper & Materials (15 points)
  {
    criterion_id: 'crit-pm-1',
    category_id: 'cat-paper',
    title: '100% Digital Registration & Passes',
    description: 'Eliminate printed paper tickets, badges, and physical brochures.',
    max_points: 6,
    requirement: 'Use QR code scanning for participant check-ins and digital agenda links.',
    evidence_required: 'Screenshot of QR check-in system or mobile event web app.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-pm-2',
    category_id: 'cat-paper',
    title: 'Modular & Reusable Decor',
    description: 'Avoid single-use flex banners and plastic balloon arches.',
    max_points: 5,
    requirement: 'Utilize digital screens, fabric banners, or rented wooden backdrop elements.',
    evidence_required: 'Photographs of stage setup and decorative installations.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-pm-3',
    category_id: 'cat-paper',
    title: 'Paperless Collateral & Certificates',
    description: 'Distribute participant certificates, schedules, and handbooks digitally.',
    max_points: 4,
    requirement: 'Zero paper hand-outs or certificates printed.',
    evidence_required: 'Sample digital certificate link or email distribution log.',
    response_type: 'YES_NO'
  },

  // Sustainable Procurement (15 points)
  {
    criterion_id: 'crit-sp-1',
    category_id: 'cat-procurement',
    title: 'Local Vendor Sourcing',
    description: 'Procure catering, printing, and equipment from local vendors within 30km.',
    max_points: 5,
    requirement: 'Minimum 80% of vendor budget spent locally to reduce transport carbon footprint.',
    evidence_required: 'Vendor GST invoices showing local addresses.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-sp-2',
    category_id: 'cat-procurement',
    title: 'Eco-Friendly Mementos & Trophies',
    description: 'Gift plant saplings, handcrafted wooden trophies, or eco-friendly kits to guests.',
    max_points: 5,
    requirement: 'No plastic-wrapped mementos or synthetic trophy items.',
    evidence_required: 'Photographs of speaker gifts/trophies + Procurement receipts.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-sp-3',
    category_id: 'cat-procurement',
    title: 'Ethical & Fair-Trade Sourcing',
    description: 'Source tea, coffee, or snacks certified fair-trade or organic.',
    max_points: 5,
    requirement: 'Organic or fair-trade packaging proof for beverages/snacks.',
    evidence_required: 'Packaging photograph or purchase bill.',
    response_type: 'YES_NO'
  },

  // Social Sustainability (15 points)
  {
    criterion_id: 'crit-ss-1',
    category_id: 'cat-social',
    title: 'Universal Accessibility Provisions',
    description: 'Ensure wheelchair access, accessible seating, and clear event navigation.',
    max_points: 5,
    requirement: 'Ramp access verified at main entrance and designated accessible seating.',
    evidence_required: 'Photographs of ramp access and accessible seating area.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-ss-2',
    category_id: 'cat-social',
    title: 'Diversity & Gender Inclusion',
    description: 'Maintain gender-balanced speaker panels and inclusive organizing teams.',
    max_points: 5,
    requirement: 'Minimum 40% female or underrepresented background representation in panels.',
    evidence_required: 'Speaker profile brochure / panel poster screenshot.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-ss-3',
    category_id: 'cat-social',
    title: 'Participant Safety & First-Aid Setup',
    description: 'Equip venue with first-aid kit, hydration station, and emergency contacts.',
    max_points: 5,
    requirement: 'First aid box on site with trained student volunteer.',
    evidence_required: 'Photograph of medical desk / first-aid kit.',
    response_type: 'YES_NO'
  },

  // Innovation (10 points)
  {
    criterion_id: 'crit-in-1',
    category_id: 'cat-innovation',
    title: 'Technology Carbon Audit Tool',
    description: 'Deploy real-time student carbon footprint calculator or digital crowd tracker.',
    max_points: 5,
    requirement: 'Use innovative digital tool to calculate event travel carbon emissions.',
    evidence_required: 'Calculator report or screenshot of dashboard.',
    response_type: 'YES_NO'
  },
  {
    criterion_id: 'crit-in-2',
    category_id: 'cat-innovation',
    title: 'Gamified Green Engagement',
    description: 'Organize participant green challenges (e.g. Bring-Your-Own-Bottle discount).',
    max_points: 5,
    requirement: 'Engage >30% participants in eco-friendly incentive challenge.',
    evidence_required: 'Event photos / social media campaign analytics screenshot.',
    response_type: 'YES_NO'
  }
];

export const DEMO_CLUBS: Club[] = [
  { club_id: 'club-mkt', club_name: 'Marketing Club (MCA)', coordinator: 'Aarav Sharma', email: 'mca.simsr@somaiya.edu', category: 'Academic' },
  { club_id: 'club-fin', club_name: 'Finance Club (FIMC)', coordinator: 'Riya Patel', email: 'fimc.simsr@somaiya.edu', category: 'Academic' },
  { club_id: 'club-ops', club_name: 'Operations Club (OASIS)', coordinator: 'Vikram Malhotra', email: 'oasis.simsr@somaiya.edu', category: 'Academic' },
  { club_id: 'club-ecell', club_name: 'E-Cell (Center for Entrepreneurship)', coordinator: 'Ananya Verma', email: 'ecell.simsr@somaiya.edu', category: 'Entrepreneurship' },
  { club_id: 'club-read', club_name: 'READ Club', coordinator: 'Karan Mehta', email: 'read.simsr@somaiya.edu', category: 'Literary' },
  { club_id: 'club-talkies', club_name: 'Talkies Film & Media Club', coordinator: 'Neha Joshi', email: 'talkies.simsr@somaiya.edu', category: 'Cultural' },
];

export const DEMO_USERS: User[] = [
  {
    user_id: 'user-public',
    name: 'Visitor / Public User',
    email: 'guest@somaiya.edu',
    role: 'PUBLIC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    user_id: 'user-org-mkt',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@somaiya.edu',
    role: 'CLUB_ORGANIZER',
    club_id: 'club-mkt',
    club_name: 'Marketing Club (MCA)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    user_id: 'user-org-ecell',
    name: 'Ananya Verma',
    email: 'ananya.verma@somaiya.edu',
    role: 'CLUB_ORGANIZER',
    club_id: 'club-ecell',
    club_name: 'E-Cell (Center for Entrepreneurship)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    user_id: 'user-auditor-1',
    name: 'Dr. Priya Sundaram',
    email: 'priya.sundaram@somaiya.edu',
    role: 'AUDITOR',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    user_id: 'user-committee',
    name: 'Prof. Rajesh Kulkarni',
    email: 'rajesh.kulkarni@somaiya.edu',
    role: 'SUSTAINABILITY_COMMITTEE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    user_id: 'user-admin',
    name: 'System Administrator (GECF Governance)',
    email: 'gecf.admin@somaiya.edu',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    event_id: 'evt-2026-001',
    event_name: 'National Sustainability Marketing Conclave 2026',
    club_id: 'club-mkt',
    club_name: 'Marketing Club (MCA)',
    event_type: 'National Conclave',
    date: '2026-08-14',
    time: '09:30 AM - 05:30 PM',
    venue: 'SIMSR Auditorium & MDP Hall',
    coordinator_name: 'Aarav Sharma',
    coordinator_contact: '+91 98201 54321',
    expected_attendance: 450,
    actual_attendance: 432,
    food_requirement: 'Buffet lunch for 450 attendees + morning high tea.',
    catering_vendor: 'Green Leaf Gourmet Caterers',
    decor_requirements: 'Digital LED backdrops, potted plants rentals, fabric banners.',
    printing_requirements: 'Zero paper printing. All QR schedules.',
    material_requirements: 'Jute delegate bags, seed pencils, bamboo identity cards.',
    waste_management_plan: '3-stage segregation bins + KJSIM biogas plant diversion.',
    water_arrangements: '50L Glass refill dispensers with copper cups.',
    intended_categories: ['cat-waste', 'cat-food', 'cat-paper', 'cat-procurement', 'cat-social', 'cat-innovation'],
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    status: 'CERTIFIED',
    green_score: 94,
    certification_level: 'PLATINUM',
    auditor_id: 'user-auditor-1',
    auditor_name: 'Dr. Priya Sundaram',
    created_at: '2026-07-20T10:00:00Z',
    updated_at: '2026-08-16T14:30:00Z',
    semester: 'Semester 1 (2026-27)',
    academic_year: '2026-2027'
  },
  {
    event_id: 'evt-2026-002',
    event_name: 'FinTech Leadership Summit 2026',
    club_id: 'club-fin',
    club_name: 'Finance Club (FIMC)',
    event_type: 'Leadership Summit',
    date: '2026-08-28',
    time: '10:00 AM - 04:00 PM',
    venue: 'Chanakya Hall',
    coordinator_name: 'Riya Patel',
    coordinator_contact: '+91 98190 87654',
    expected_attendance: 300,
    actual_attendance: 290,
    food_requirement: 'Packaged organic snack boxes and coffee/tea station.',
    catering_vendor: 'Somaiya Campus Canteen',
    decor_requirements: 'Modular standees and reusable acrylic podium logo.',
    printing_requirements: 'Digital QR badges, 5 printed guest mementos.',
    material_requirements: 'Recycled paper notebooks and eco pens.',
    waste_management_plan: 'Standard campus wet/dry bins.',
    water_arrangements: 'Water dispensers installed.',
    intended_categories: ['cat-waste', 'cat-food', 'cat-paper', 'cat-procurement', 'cat-social'],
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    status: 'CERTIFIED',
    green_score: 83,
    certification_level: 'GOLD',
    auditor_id: 'user-auditor-1',
    auditor_name: 'Dr. Priya Sundaram',
    created_at: '2026-08-01T11:00:00Z',
    updated_at: '2026-08-30T16:00:00Z',
    semester: 'Semester 1 (2026-27)',
    academic_year: '2026-2027'
  },
  {
    event_id: 'evt-2026-003',
    event_name: 'E-Summit 2026: Sustainable Ventures',
    club_id: 'club-ecell',
    club_name: 'E-Cell (Center for Entrepreneurship)',
    event_type: 'Flagship Summit',
    date: '2026-09-15',
    time: '09:00 AM - 06:00 PM',
    venue: 'Tagore Amphitheatre',
    coordinator_name: 'Ananya Verma',
    coordinator_contact: '+91 97699 12345',
    expected_attendance: 550,
    actual_attendance: 520,
    food_requirement: 'Catering for 550 attendees using compostable palm leaf plates.',
    catering_vendor: 'Shree Krishna Caterers',
    decor_requirements: 'Bamboo structures and live vertical garden installations.',
    printing_requirements: 'Zero paper printing. Digital pitch deck distribution.',
    material_requirements: 'Plantable sapling kits for judges & speakers.',
    waste_management_plan: 'Zero waste event protocol with campus composting.',
    water_arrangements: 'Clay pot water coolers across venue.',
    intended_categories: ['cat-waste', 'cat-food', 'cat-paper', 'cat-procurement', 'cat-social', 'cat-innovation'],
    image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    status: 'CERTIFIED',
    green_score: 91,
    certification_level: 'PLATINUM',
    auditor_id: 'user-auditor-1',
    auditor_name: 'Dr. Priya Sundaram',
    created_at: '2026-08-10T09:00:00Z',
    updated_at: '2026-09-17T11:20:00Z',
    semester: 'Semester 1 (2026-27)',
    academic_year: '2026-2027'
  },
  {
    event_id: 'evt-2026-004',
    event_name: 'Supply Chain Eco-Hackathon',
    club_id: 'club-ops',
    club_name: 'Operations Club (OASIS)',
    event_type: 'Hackathon',
    date: '2026-09-22',
    time: '24 Hours Hackathon',
    venue: 'Computer Lab 3 & 4',
    coordinator_name: 'Vikram Malhotra',
    coordinator_contact: '+91 99300 45678',
    expected_attendance: 180,
    actual_attendance: 175,
    food_requirement: 'Midnight snacks + Breakfast + Lunch.',
    catering_vendor: 'Campus Mess',
    decor_requirements: 'Digital screens only.',
    printing_requirements: 'No paper used.',
    material_requirements: 'Digital submission portal.',
    waste_management_plan: 'Dry waste and electronic waste collection.',
    water_arrangements: 'Refill water stations.',
    intended_categories: ['cat-waste', 'cat-food', 'cat-paper', 'cat-procurement', 'cat-social'],
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    status: 'UNDER_REVIEW',
    auditor_id: 'user-auditor-1',
    auditor_name: 'Dr. Priya Sundaram',
    created_at: '2026-09-01T14:00:00Z',
    updated_at: '2026-09-23T18:00:00Z',
    semester: 'Semester 1 (2026-27)',
    academic_year: '2026-2027'
  },
  {
    event_id: 'evt-2026-005',
    event_name: 'LitFest: Eco-Poetry & Storytelling',
    club_id: 'club-read',
    club_name: 'READ Club',
    event_type: 'Literary Workshop',
    date: '2026-09-25',
    time: '02:00 PM - 06:00 PM',
    venue: 'Library Seminar Room',
    coordinator_name: 'Karan Mehta',
    coordinator_contact: '+91 98700 11223',
    expected_attendance: 120,
    actual_attendance: 110,
    food_requirement: 'Tea, coffee, and organic millet biscuits.',
    catering_vendor: 'Millet House Canteen',
    decor_requirements: 'Handmade recycled paper banners.',
    printing_requirements: 'Digital booklet PDF via QR code.',
    material_requirements: 'Recycled paper diaries.',
    waste_management_plan: 'Basic waste segregation.',
    water_arrangements: 'Glass dispensers.',
    intended_categories: ['cat-waste', 'cat-food', 'cat-paper', 'cat-procurement', 'cat-social'],
    image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    status: 'CERTIFIED',
    green_score: 68,
    certification_level: 'SILVER',
    auditor_id: 'user-auditor-1',
    auditor_name: 'Dr. Priya Sundaram',
    created_at: '2026-09-12T16:00:00Z',
    updated_at: '2026-09-26T12:00:00Z',
    semester: 'Semester 1 (2026-27)',
    academic_year: '2026-2027'
  },
  {
    event_id: 'evt-2026-006',
    event_name: 'Short Film Screening & Green Media Talk',
    club_id: 'club-talkies',
    club_name: 'Talkies Film & Media Club',
    event_type: 'Screening',
    date: '2026-10-10',
    time: '04:00 PM - 08:00 PM',
    venue: 'SIMSR Auditorium',
    coordinator_name: 'Neha Joshi',
    coordinator_contact: '+91 99200 33445',
    expected_attendance: 250,
    food_requirement: 'Popcorn in compostable paper buckets + Fruit juices.',
    catering_vendor: 'Talkies Refreshment Squad',
    decor_requirements: 'LED projector backdrop.',
    printing_requirements: 'Digital movie posters.',
    material_requirements: 'QR entry passes.',
    waste_management_plan: 'Paper bucket recycling bin.',
    water_arrangements: 'Water stations.',
    intended_categories: ['cat-waste', 'cat-food', 'cat-paper', 'cat-procurement'],
    image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    status: 'SUBMITTED',
    created_at: '2026-09-20T11:00:00Z',
    updated_at: '2026-09-20T11:00:00Z',
    semester: 'Semester 1 (2026-27)',
    academic_year: '2026-2027'
  }
];

export const INITIAL_EVIDENCE: Evidence[] = [
  {
    evidence_id: 'ev-001',
    event_id: 'evt-2026-001',
    criterion_id: 'crit-wm-1',
    file_name: 'waste_segregation_stations_auditorium.jpg',
    file_type: 'image',
    file_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    uploaded_by: 'Aarav Sharma',
    uploaded_at: '2026-08-14T17:00:00Z',
    status: 'VERIFIED'
  },
  {
    evidence_id: 'ev-002',
    event_id: 'evt-2026-001',
    criterion_id: 'crit-wm-2',
    file_name: 'zero_plastic_catering_declaration.pdf',
    file_type: 'pdf',
    file_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    uploaded_by: 'Aarav Sharma',
    uploaded_at: '2026-08-14T17:05:00Z',
    status: 'VERIFIED'
  },
  {
    evidence_id: 'ev-003',
    event_id: 'evt-2026-003',
    criterion_id: 'crit-fs-2',
    file_name: 'palm_leaf_cutlery_catering.jpg',
    file_type: 'image',
    file_url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80',
    uploaded_by: 'Ananya Verma',
    uploaded_at: '2026-09-15T18:30:00Z',
    status: 'VERIFIED'
  },
  {
    evidence_id: 'ev-004',
    event_id: 'evt-2026-004',
    criterion_id: 'crit-wm-1',
    file_name: 'hackathon_waste_bin_setup.jpg',
    file_type: 'image',
    file_url: 'https://images.unsplash.com/photo-1604186837056-8e7c286766f2?w=600&auto=format&fit=crop&q=80',
    uploaded_by: 'Vikram Malhotra',
    uploaded_at: '2026-09-22T20:00:00Z',
    status: 'PENDING'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    certificate_id: 'GECF-2026-001',
    event_id: 'evt-2026-001',
    event_name: 'National Sustainability Marketing Conclave 2026',
    club_name: 'Marketing Club (MCA)',
    event_date: 'August 14, 2026',
    score: 94,
    certification_level: 'PLATINUM',
    verification_code: 'VERIFY-GECF-94-PLATINUM-001',
    issue_date: 'August 16, 2026',
    auditor_name: 'Dr. Priya Sundaram'
  },
  {
    certificate_id: 'GECF-2026-002',
    event_id: 'evt-2026-002',
    event_name: 'FinTech Leadership Summit 2026',
    club_name: 'Finance Club (FIMC)',
    event_date: 'August 28, 2026',
    score: 83,
    certification_level: 'GOLD',
    verification_code: 'VERIFY-GECF-83-GOLD-002',
    issue_date: 'August 30, 2026',
    auditor_name: 'Dr. Priya Sundaram'
  },
  {
    certificate_id: 'GECF-2026-003',
    event_id: 'evt-2026-003',
    event_name: 'E-Summit 2026: Sustainable Ventures',
    club_name: 'E-Cell (Center for Entrepreneurship)',
    event_date: 'September 15, 2026',
    score: 91,
    certification_level: 'PLATINUM',
    verification_code: 'VERIFY-GECF-91-PLATINUM-003',
    issue_date: 'September 17, 2026',
    auditor_name: 'Dr. Priya Sundaram'
  },
  {
    certificate_id: 'GECF-2026-005',
    event_id: 'evt-2026-005',
    event_name: 'LitFest: Eco-Poetry & Storytelling',
    club_name: 'READ Club',
    event_date: 'September 25, 2026',
    score: 68,
    certification_level: 'SILVER',
    verification_code: 'VERIFY-GECF-68-SILVER-005',
    issue_date: 'September 26, 2026',
    auditor_name: 'Dr. Priya Sundaram'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    log_id: 'log-101',
    user_id: 'user-org-mkt',
    user_name: 'Aarav Sharma',
    action: 'REGISTER_EVENT',
    entity: 'EVENT',
    entity_id: 'evt-2026-001',
    timestamp: '2026-07-20T10:00:00Z',
    details: 'Registered National Sustainability Marketing Conclave 2026'
  },
  {
    log_id: 'log-102',
    user_id: 'user-org-mkt',
    user_name: 'Aarav Sharma',
    action: 'UPLOAD_EVIDENCE',
    entity: 'EVIDENCE',
    entity_id: 'ev-001',
    timestamp: '2026-08-14T17:00:00Z',
    details: 'Uploaded photo evidence for Waste Segregation Infrastructure'
  },
  {
    log_id: 'log-103',
    user_id: 'user-auditor-1',
    user_name: 'Dr. Priya Sundaram',
    action: 'APPROVE_EVIDENCE',
    entity: 'EVIDENCE',
    entity_id: 'ev-001',
    timestamp: '2026-08-16T13:30:00Z',
    details: 'Approved waste segregation evidence (7/7 points)'
  },
  {
    log_id: 'log-104',
    user_id: 'user-auditor-1',
    user_name: 'Dr. Priya Sundaram',
    action: 'FINALIZE_AUDIT',
    entity: 'AUDIT',
    entity_id: 'evt-2026-001',
    timestamp: '2026-08-16T14:30:00Z',
    details: 'Finalized audit for evt-2026-001. Score: 94/100 (PLATINUM)'
  },
  {
    log_id: 'log-105',
    user_id: 'system',
    user_name: 'GECF Engine',
    action: 'GENERATE_CERTIFICATE',
    entity: 'CERTIFICATE',
    entity_id: 'GECF-2026-001',
    timestamp: '2026-08-16T14:31:00Z',
    details: 'Generated Certificate GECF-2026-001 with QR Code'
  }
];
