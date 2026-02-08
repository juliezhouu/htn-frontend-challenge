// raw api response shape
export interface APIEvent {
  id: number;
  name: string;
  event_type: string;
  permission?: string;
  start_time: number;
  end_time: number;
  description?: string;
  speakers: {
    name: string;
    profile_pic?: string;
  }[];
  public_url?: string;
  private_url?: string;
  related_events: number[];
}

// transformed for ui - add new fields here as needed
export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  thumbnail: string;
  description: string;
  category: string;
  speakers?: {
    name: string;
    title: string;
  }[];
  permission?: string;
  related_events: number[];
}

// add new event types here
const categoryMap: Record<string, string> = {
  'workshop': 'Workshop',
  'activity': 'Activity',
  'tech_talk': 'Tech Talk',
  'ceremony': 'Ceremony',
};

// thumbnails by event type
const thumbnailMap: Record<string, string> = {
  'workshop': 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=400&fit=crop',
  'activity': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop',
  'tech_talk': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop',
  'ceremony': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop',
};

export function transformAPIEvent(apiEvent: APIEvent): Event {
  const startDate = new Date(apiEvent.start_time);
  const endDate = new Date(apiEvent.end_time);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  const date = startDate.toLocaleDateString('en-US', dateOptions);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  const time = `${startDate.toLocaleTimeString('en-US', timeOptions)} - ${endDate.toLocaleTimeString('en-US', timeOptions)}`;

  return {
    id: apiEvent.id,
    title: apiEvent.name,
    date,
    time,
    location: 'Hack the North Venue',
    thumbnail: thumbnailMap[apiEvent.event_type] || thumbnailMap['activity'],
    description: apiEvent.description || 'Join us for this exciting event at Hack the North!',
    category: categoryMap[apiEvent.event_type] || apiEvent.event_type,
    speakers: apiEvent.speakers.map(s => ({
      name: s.name,
      title: 'Speaker'
    })),
    permission: apiEvent.permission,
    related_events: apiEvent.related_events,
  };
}
