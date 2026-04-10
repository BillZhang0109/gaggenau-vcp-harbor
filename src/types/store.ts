export interface LocalizedText {
  en: string;
  zh: string;
}

export type StoreStatus = 'on_track' | 'at_risk' | 'critical' | 'not_started';

export type MilestoneKey =
  | 'site_scouting'
  | 'concept'
  | 'schematic_design'
  | 'detailed_design'
  | 'design_development'
  | 'tender'
  | 'construction'
  | 'pre_handover';

export interface Risk {
  en: string;
  zh: string;
  severity?: 'critical' | 'warning' | 'info';
}

export interface PhaseDetail {
  description: LocalizedText;
  updatedAt?: string;
}

export interface Store {
  id: string;
  name: LocalizedText;
  city: LocalizedText;
  type: 'FFS' | 'BFS';
  area_sqm: number | null;
  budget: number | null;
  unitCost: number;
  designPartner: string;
  status: StoreStatus;
  timelineStart: string | null;
  timelineEnd: string | null;
  currentPhase: MilestoneKey;
  completedMilestones: MilestoneKey[];
  currentMilestone: MilestoneKey;
  nextStep: LocalizedText;
  estimatedCompletion: string | null;
  risks: Risk[];
  budgetUsed: number;
  budgetTotal: number | null;
  phaseDetails?: Partial<Record<MilestoneKey, PhaseDetail>>;
  lastUpdated?: string;
}

export interface ProgramData {
  program: {
    name: string;
    version: string;
    lastUpdated: string;
    totalBudget: number;
    currency: string;
    exchangeRate?: number;
    risks?: Risk[];
  };
  stores: Store[];
  milestoneDefinition: MilestoneKey[];
}
