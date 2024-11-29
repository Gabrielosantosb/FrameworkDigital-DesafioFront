export interface LeadModel {
  leadId: number;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  dateCreated: string;
  suburb: string;
  category: string;
  description: string;
  price: number;
  status: number;
}

export interface PaginatedLeads {
  totalCount: number;
  leads: LeadModel[];
}
