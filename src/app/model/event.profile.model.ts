export interface EventProfile {
  title: string;
  type: string[];        // Array of tags, e.g. ['External', 'Thinking']
  date: string;          // Date and time as a string (or use Date type)
  location: string;      // Event location
  status: 'active' | 'over';  // Union type, restricts to these two options
  image: string;         // Path to the event image
}
