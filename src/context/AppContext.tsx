import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  EventItem, 
  Category, 
  Criterion, 
  EventResponse, 
  Evidence, 
  Audit, 
  Certificate, 
  AuditLog, 
  NotificationItem, 
  ScoringWeights, 
  CertificationThresholds,
  CertificationLevel,
  EventStatus
} from '../types';
import { 
  DEMO_USERS, 
  DEMO_CLUBS, 
  CATEGORIES as INITIAL_CATEGORIES, 
  CRITERIA as INITIAL_CRITERIA, 
  INITIAL_EVENTS, 
  INITIAL_EVIDENCE, 
  INITIAL_CERTIFICATES, 
  INITIAL_AUDIT_LOGS,
  DEFAULT_WEIGHTS,
  DEFAULT_THRESHOLDS
} from '../services/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUserRole: (role: UserRole) => void;
  users: User[];
  events: EventItem[];
  categories: Category[];
  criteria: Criterion[];
  evidenceList: Evidence[];
  responses: Record<string, EventResponse>; // key = `${event_id}_${criterion_id}`
  audits: Audit[];
  certificates: Certificate[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  weights: ScoringWeights;
  thresholds: CertificationThresholds;
  
  // Actions
  createEvent: (eventData: Omit<EventItem, 'event_id' | 'created_at' | 'updated_at' | 'status' | 'semester' | 'academic_year'> & Partial<Pick<EventItem, 'semester' | 'academic_year'>>) => EventItem;
  updateEventStatus: (eventId: string, status: EventStatus) => void;
  submitEventResponse: (eventId: string, criterionId: string, value: any, comments?: string) => void;
  uploadEvidence: (eventId: string, criterionId: string, fileName: string, fileType: Evidence['file_type'], fileUrl: string) => void;
  reviewEvidence: (evidenceId: string, status: 'VERIFIED' | 'REJECTED', reason?: string) => void;
  finalizeAudit: (eventId: string, scores: Record<string, number>, auditorComment: string) => Audit;
  updateWeights: (newWeights: ScoringWeights) => void;
  updateThresholds: (newThresholds: CertificationThresholds) => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  dismissNotification: (id: string) => void;
  logAction: (action: string, entity: string, entityId: string, details?: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or initialize defaults
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('gecf_currentUser');
    return saved ? JSON.parse(saved) : DEMO_USERS[0];
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('gecf_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [criteria, setCriteria] = useState<Criterion[]>(INITIAL_CRITERIA);

  const [evidenceList, setEvidenceList] = useState<Evidence[]>(() => {
    const saved = localStorage.getItem('gecf_evidence');
    return saved ? JSON.parse(saved) : INITIAL_EVIDENCE;
  });

  const [responses, setResponses] = useState<Record<string, EventResponse>>(() => {
    const saved = localStorage.getItem('gecf_responses');
    return saved ? JSON.parse(saved) : {};
  });

  const [audits, setAudits] = useState<Audit[]>(() => {
    const saved = localStorage.getItem('gecf_audits');
    return saved ? JSON.parse(saved) : [];
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('gecf_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('gecf_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [weights, setWeights] = useState<ScoringWeights>(() => {
    const saved = localStorage.getItem('gecf_weights');
    return saved ? JSON.parse(saved) : DEFAULT_WEIGHTS;
  });

  const [thresholds, setThresholds] = useState<CertificationThresholds>(() => {
    const saved = localStorage.getItem('gecf_thresholds');
    return saved ? JSON.parse(saved) : DEFAULT_THRESHOLDS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Welcome to GECF Portal',
      message: 'Explore KJSIM Green Event Certification platform. Switch roles anytime using the top bar!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'info'
    }
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gecf_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gecf_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('gecf_evidence', JSON.stringify(evidenceList));
  }, [evidenceList]);

  useEffect(() => {
    localStorage.setItem('gecf_responses', JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem('gecf_audits', JSON.stringify(audits));
  }, [audits]);

  useEffect(() => {
    localStorage.setItem('gecf_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('gecf_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('gecf_weights', JSON.stringify(weights));
  }, [weights]);

  useEffect(() => {
    localStorage.setItem('gecf_thresholds', JSON.stringify(thresholds));
  }, [thresholds]);

  // Action helpers
  const setCurrentUserRole = (role: UserRole) => {
    const match = DEMO_USERS.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
      addNotification('Role Switched', `You are now viewing GECF as ${match.name} (${role.replace('_', ' ')})`, 'info');
    }
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const logAction = (action: string, entity: string, entityId: string, details?: string) => {
    const log: AuditLog = {
      log_id: `log-${Date.now()}`,
      user_id: currentUser.user_id,
      user_name: currentUser.name,
      action,
      entity,
      entity_id: entityId,
      timestamp: new Date().toISOString(),
      details
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const createEvent = (eventData: Omit<EventItem, 'event_id' | 'created_at' | 'updated_at' | 'status' | 'semester' | 'academic_year'> & Partial<Pick<EventItem, 'semester' | 'academic_year'>>): EventItem => {
    const newId = `evt-2026-${String(events.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    const newEvent: EventItem = {
      semester: 'Semester 1 (2026-27)',
      academic_year: '2026-2027',
      ...eventData,
      event_id: newId,
      status: 'SUBMITTED',
      created_at: now,
      updated_at: now,
    };

    setEvents(prev => [newEvent, ...prev]);
    logAction('REGISTER_EVENT', 'EVENT', newId, `Registered event: ${newEvent.event_name}`);
    addNotification('Event Registered', `Proposal for "${newEvent.event_name}" submitted successfully. Lock in checklist!`, 'success');
    return newEvent;
  };

  const updateEventStatus = (eventId: string, status: EventStatus) => {
    setEvents(prev => prev.map(e => e.event_id === eventId ? { ...e, status, updated_at: new Date().toISOString() } : e));
    logAction('UPDATE_EVENT_STATUS', 'EVENT', eventId, `Status changed to ${status}`);
  };

  const submitEventResponse = (eventId: string, criterionId: string, value: any, comments?: string) => {
    const key = `${eventId}_${criterionId}`;
    const existing = responses[key];
    const updatedResponse: EventResponse = {
      response_id: existing ? existing.response_id : `resp-${Date.now()}`,
      event_id: eventId,
      criterion_id: criterionId,
      response_value: value,
      comments: comments || '',
      evidence_ids: existing ? existing.evidence_ids : []
    };

    setResponses(prev => ({ ...prev, [key]: updatedResponse }));
    logAction('SUBMIT_CHECKLIST_ITEM', 'RESPONSE', key, `Criterion ${criterionId} set to ${value}`);
  };

  const uploadEvidence = (eventId: string, criterionId: string, fileName: string, fileType: Evidence['file_type'], fileUrl: string) => {
    const newEv: Evidence = {
      evidence_id: `ev-${Date.now()}`,
      event_id: eventId,
      criterion_id: criterionId,
      file_name: fileName,
      file_type: fileType,
      file_url: fileUrl,
      uploaded_by: currentUser.name,
      uploaded_at: new Date().toISOString(),
      status: 'PENDING'
    };

    setEvidenceList(prev => [newEv, ...prev]);

    // Attach to response
    const key = `${eventId}_${criterionId}`;
    setResponses(prev => {
      const existing = prev[key] || {
        response_id: `resp-${Date.now()}`,
        event_id: eventId,
        criterion_id: criterionId,
        response_value: 'YES',
        comments: '',
        evidence_ids: []
      };
      return {
        ...prev,
        [key]: {
          ...existing,
          evidence_ids: [...existing.evidence_ids, newEv.evidence_id]
        }
      };
    });

    logAction('UPLOAD_EVIDENCE', 'EVIDENCE', newEv.evidence_id, `Uploaded ${fileName} for ${criterionId}`);
    addNotification('Evidence Uploaded', `File ${fileName} attached. Awaiting auditor review.`, 'info');
  };

  const reviewEvidence = (evidenceId: string, status: 'VERIFIED' | 'REJECTED', reason?: string) => {
    setEvidenceList(prev => prev.map(ev => ev.evidence_id === evidenceId ? {
      ...ev,
      status,
      rejection_reason: reason
    } : ev));

    logAction('REVIEW_EVIDENCE', 'EVIDENCE', evidenceId, `Evidence ${status} ${reason ? `Reason: ${reason}` : ''}`);
  };

  const finalizeAudit = (eventId: string, scores: Record<string, number>, auditorComment: string): Audit => {
    // Calculate category totals and total score
    let totalScore = 0;
    const catScores: Record<string, number> = {};

    categories.forEach((cat: Category) => {
      const catCriteria = criteria.filter(c => c.category_id === cat.category_id);
      let catEarned = 0;
      catCriteria.forEach(crit => {
        if (scores[crit.criterion_id] !== undefined) {
          catEarned += scores[crit.criterion_id];
        }
      });
      catScores[cat.category_id] = catEarned;
      totalScore += catEarned;
    });

    totalScore = Math.min(100, Math.round(totalScore));

    // Determine certification level based on thresholds
    let level: CertificationLevel = 'BELOW_CERTIFICATION';
    if (totalScore >= thresholds.platinum) level = 'PLATINUM';
    else if (totalScore >= thresholds.gold) level = 'GOLD';
    else if (totalScore >= thresholds.silver) level = 'SILVER';

    const targetEvent = events.find(e => e.event_id === eventId);
    const eventName = targetEvent ? targetEvent.event_name : 'KJSIM Event';
    const clubName = targetEvent ? targetEvent.club_name : 'KJSIM Student Club';
    const eventDate = targetEvent ? targetEvent.date : new Date().toLocaleDateString();

    const auditId = `audit-${Date.now()}`;
    const newAudit: Audit = {
      audit_id: auditId,
      event_id: eventId,
      auditor_id: currentUser.user_id,
      auditor_name: currentUser.name,
      status: 'FINALIZED',
      final_score: totalScore,
      certification_level: level,
      comments: auditorComment,
      finalized_at: new Date().toISOString(),
      category_scores: catScores
    };

    setAudits(prev => [...prev.filter(a => a.event_id !== eventId), newAudit]);

    // Update Event status & score
    const updatedStatus: EventStatus = level === 'BELOW_CERTIFICATION' ? 'AUDITED' : 'CERTIFIED';
    setEvents(prev => prev.map(e => e.event_id === eventId ? {
      ...e,
      status: updatedStatus,
      green_score: totalScore,
      certification_level: level,
      auditor_id: currentUser.user_id,
      auditor_name: currentUser.name,
      updated_at: new Date().toISOString()
    } : e));

    // Generate Certificate if passed
    if (level !== 'BELOW_CERTIFICATION') {
      const certId = `GECF-2026-${String(certificates.length + 1).padStart(3, '0')}`;
      const newCert: Certificate = {
        certificate_id: certId,
        event_id: eventId,
        event_name: eventName,
        club_name: clubName,
        event_date: eventDate,
        score: totalScore,
        certification_level: level,
        verification_code: `VERIFY-${certId}-${totalScore}-${level}`,
        issue_date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        auditor_name: currentUser.name
      };

      setCertificates(prev => [newCert, ...prev]);
      logAction('GENERATE_CERTIFICATE', 'CERTIFICATE', certId, `Certificate generated for ${eventName} (${level})`);
    }

    logAction('FINALIZE_AUDIT', 'AUDIT', auditId, `Audit finalized for ${eventId}: ${totalScore}/100 [${level}]`);
    addNotification('Audit Finalized', `Audit complete for ${eventName}. Green Score: ${totalScore}/100 (${level})`, 'success');

    return newAudit;
  };

  const updateWeights = (newWeights: ScoringWeights) => {
    setWeights(newWeights);
    // Update categories
    setCategories(prev => prev.map(c => {
      if (c.category_id === 'cat-waste') return { ...c, weight: newWeights.waste_management };
      if (c.category_id === 'cat-food') return { ...c, weight: newWeights.food_sustainability };
      if (c.category_id === 'cat-paper') return { ...c, weight: newWeights.paper_materials };
      if (c.category_id === 'cat-procurement') return { ...c, weight: newWeights.sustainable_procurement };
      if (c.category_id === 'cat-social') return { ...c, weight: newWeights.social_sustainability };
      if (c.category_id === 'cat-innovation') return { ...c, weight: newWeights.innovation };
      return c;
    }));
    logAction('UPDATE_WEIGHTS', 'SYSTEM', 'WEIGHTS', 'Updated scoring weights configuration');
    addNotification('Configuration Updated', 'Scoring category weights have been re-calibrated.', 'info');
  };

  const updateThresholds = (newThresholds: CertificationThresholds) => {
    setThresholds(newThresholds);
    logAction('UPDATE_THRESHOLDS', 'SYSTEM', 'THRESHOLDS', 'Updated certification level thresholds');
    addNotification('Configuration Updated', 'Certification thresholds updated.', 'info');
  };

  const resetDemoData = () => {
    localStorage.clear();
    setEvents(INITIAL_EVENTS);
    setEvidenceList(INITIAL_EVIDENCE);
    setCertificates(INITIAL_CERTIFICATES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setWeights(DEFAULT_WEIGHTS);
    setThresholds(DEFAULT_THRESHOLDS);
    setCurrentUser(DEMO_USERS[0]);
    addNotification('Demo Data Reset', 'Restored original demo events, evidence and certificates.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        users: DEMO_USERS,
        events,
        categories,
        criteria,
        evidenceList,
        responses,
        audits,
        certificates,
        auditLogs,
        notifications,
        weights,
        thresholds,
        createEvent,
        updateEventStatus,
        submitEventResponse,
        uploadEvidence,
        reviewEvidence,
        finalizeAudit,
        updateWeights,
        updateThresholds,
        addNotification,
        dismissNotification,
        logAction,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
