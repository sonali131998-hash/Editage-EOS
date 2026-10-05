export type UserState = 'STATE_A' | 'STATE_B' | 'STATE_C';

export interface Manuscript {
  id: string;
  fileName: string;
  fileSize: string;
  wordCount: number;
  uploadedAt: string;
  lastUpdated: string;
  subjectArea: string;
  targetJournal?: string;
  stage: PublicationStage;
  statusText: string;
}

export type PublicationStage = 
  | 'writing'
  | 'preparation'
  | 'journal_selection'
  | 'submission'
  | 'revision'
  | 'publication';

export interface StageInfo {
  id: PublicationStage;
  label: string;
  shortDescription: string;
  completed: boolean;
  current: boolean;
}

export interface AssessmentAnswers {
  stage: string;
  goals: string[];
  budget: string;
  deadline: string;
}

export interface ServiceRecommendation {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'neutral';
  reasons: string[];
  turnaround: string;
  startingPrice: number;
  pricePerWord?: number;
  features: string[];
  stageRelevance: string;
  isPrimary?: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  manuscriptTitle: string;
  fileName: string;
  serviceName: string;
  status: 'Delivered' | 'In Progress' | 'Under Review';
  orderDate: string;
  deliveryDate: string;
  downloadAvailable: boolean;
  reEditingEligible: boolean;
  reEditingExpires?: string;
  progressPercent?: number;
}

export interface QuoteConfig {
  wordCount: number;
  serviceId: string;
  deliverySpeed: 'standard' | 'express' | 'super_express';
  subjectArea: string;
  addons: {
    journalSelection: boolean;
    formatting: boolean;
    graphicalAbstract: boolean;
    similarityCheck: boolean;
  };
}
