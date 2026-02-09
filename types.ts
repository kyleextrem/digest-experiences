
export interface HostedEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  price: string;
  ticketLink: string;
  imageUrl: string;
}

export interface WaitlistSubmission {
  firstName: string;
  email: string;
  suburb?: string;
  notified: boolean;
}
