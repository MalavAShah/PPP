export type UserRole = 
  | 'PUBLIC' 
  | 'CLUB_ORGANIZER' 
  | 'AUDITOR' 
  | 'SUSTAINABILITY_COMMITTEE' 
  | 'ADMIN';

export interface User {
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  club_id?: string;
  club_name?: string;
  avatar?: string;
}

export interface Club {
  club_id: string;
  club_name: string;
  coordinator: string;
  email: string;
  category?: string;
}

export type EventStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'EVIDENCE_REQUIRED' 
  | 'AUDITED' 
  | 'CERTIFIED';

export type CertificationLevel = 
  | 'PLATINUM' 
  | 'GOLD' 
  | 'SILVER' 
  | 'BELOW_CERTIFICATION';

export interface Category {
  category_id: string;
  category_name: string;
  weight: number; // Max points allocation out of 100
  icon_name: string;
  description: string;
}

export type ResponseType = 'YES_NO' | 'NUMERIC' | 'TEXT';

export interface Criterion {
  criterion_id: string;
  category_id: string;
  title: string;
  description: string;
  max_points: number;
  requirement: string;
  evidence_required: string;
  response_type: ResponseType;
}

export interface EventResponse {
  response_id: string;
  event_id: string;
  criterion_id: string;
  response_value: 'YES' | 'NO' | 'N_A' | number | string;
  comments?: string;
  evidence_ids: string[];
}

export interface Evidence {
  evidence_id: string;
  event_id: string;
  criterion_id: string;
  file_name: string;
  file_type: 'image' | 'pdf' | 'spreadsheet' | 'document';
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  rejection_reason?: string;
}

export interface AuditScore {
  score_id: string;
  audit_id: string;
  criterion_id: string;
  verified_points: number;
  status: 'VERIFIED' | 'REJECTED' | 'CLARIFICATION_REQUESTED';
  auditor_comment?: string;
}

export interface Audit {
  audit_id: string;
  event_id: string;
  auditor_id: string;
  auditor_name: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'FINALIZED';
  final_score: number;
  certification_level: CertificationLevel;
  comments?: string;
  finalized_at?: string;
  category_scores: Record<string, number>; // category_id -> points earned
}

export interface Certificate {
  certificate_id: string;
  event_id: string;
  event_name: string;
  club_name: string;
  event_date: string;
  score: number;
  certification_level: CertificationLevel;
  verification_code: string;
  issue_date: string;
  auditor_name: string;
}

export interface AuditLog {
  log_id: string;
  user_id: string;
  user_name: string;
  action: string;
  entity: string;
  entity_id: string;
  timestamp: string;
  details?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  recipient_role?: UserRole;
  recipient_user_id?: string;
}

export interface EventItem {
  event_id: string;
  event_name: string;
  club_id: string;
  club_name: string;
  event_type: string;
  date: string;
  time: string;
  venue: string;
  coordinator_name: string;
  coordinator_contact: string;
  expected_attendance: number;
  actual_attendance?: number;
  
  // Planning Details
  food_requirement: string;
  catering_vendor: string;
  decor_requirements: string;
  printing_requirements: string;
  material_requirements: string;
  waste_management_plan: string;
  water_arrangements: string;
  intended_categories: string[];
  
  status: EventStatus;
  green_score?: number;
  certification_level?: CertificationLevel;
  auditor_id?: string;
  auditor_name?: string;
  created_at: string;
  updated_at: string;
  semester: string;
  academic_year: string;
}

export interface ScoringWeights {
  waste_management: number;
  food_sustainability: number;
  paper_materials: number;
  sustainable_procurement: number;
  social_sustainability: number;
  innovation: number;
}

export interface CertificationThresholds {
  platinum: number;
  gold: number;
  silver: number;
}
