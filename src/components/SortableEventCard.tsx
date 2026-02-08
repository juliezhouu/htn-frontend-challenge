import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EventCard } from './EventCard';
import { Event } from './types';

interface SortableEventCardProps {
  event: Event;
  onViewDetails: () => void;
  isLast: boolean;
}

export function SortableEventCard({ event, onViewDetails, isLast }: SortableEventCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: event.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <EventCard
        event={event}
        onViewDetails={onViewDetails}
        isLast={isLast}
        dragHandleProps={{ ...attributes, ...listeners }}
        isDragging={isDragging}
      />
    </div>
  );
}
