import { useState, useEffect, useCallback } from 'react';
import { Event } from '../components/types';

const STORAGE_KEY = 'htn-event-order';

export function useEventOrder(events: Event[]) {
  const [orderedEvents, setOrderedEvents] = useState<Event[]>(events);

  useEffect(() => {
    if (events.length === 0) return;

    const savedOrder = localStorage.getItem(STORAGE_KEY);

    if (savedOrder) {
      try {
        const orderIds: number[] = JSON.parse(savedOrder);
        const eventMap = new Map(events.map(e => [e.id, e]));

        const ordered: Event[] = [];
        const usedIds = new Set<number>();

        // restore saved order
        for (const id of orderIds) {
          const event = eventMap.get(id);
          if (event) {
            ordered.push(event);
            usedIds.add(id);
          }
        }

        // new events go at the end
        for (const event of events) {
          if (!usedIds.has(event.id)) {
            ordered.push(event);
          }
        }

        setOrderedEvents(ordered);
      } catch {
        setOrderedEvents(events);
      }
    } else {
      setOrderedEvents(events);
    }
  }, [events]);

  const saveOrder = useCallback((newOrderedEvents: Event[]) => {
    const orderIds = newOrderedEvents.map(e => e.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderIds));
    setOrderedEvents(newOrderedEvents);
  }, []);

  const reorderEvents = useCallback((activeId: number, overId: number) => {
    setOrderedEvents(prev => {
      const oldIndex = prev.findIndex(e => e.id === activeId);
      const newIndex = prev.findIndex(e => e.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;

      const newOrder = [...prev];
      const [removed] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, removed);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrder.map(e => e.id)));

      return newOrder;
    });
  }, []);

  return { orderedEvents, reorderEvents, saveOrder };
}
