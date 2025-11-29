export interface Member {
  id: string; // short unique id e.g. "mem-01"
  name: string;
  email: string;
  rollNumber: string;
  hasAcceptedInvitation: boolean;
}

export interface Team {
  _id?: string; 
  teamId: string; // URL param
  teamName: string;
  teamSize: number;
  members: Member[];
  createdAt: Date;
}