import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableEventCard } from './SortableEventCard';
import { EventDetailView } from './EventDetailView';
import { HTNHeader } from './HTNHeader';
import { HTNFooter } from './HTNFooter';
import { SpaceHero } from './SpaceHero';
import { LoginModal } from './LoginModal';
import { Event, APIEvent, transformAPIEvent } from './types';
import { useEventOrder } from '../hooks/useEventOrder';

export function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { orderedEvents, reorderEvents } = useEventOrder(events);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.hackthenorth.com/v3/events');

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data: APIEvent[] = await response.json();

        const sortedEvents = data
          .sort((a, b) => a.start_time - b.start_time)
          .map(transformAPIEvent);

        setEvents(sortedEvents);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = ['All', ...Array.from(new Set(events.map(event => event.category)))];

  const filteredEvents = orderedEvents.filter(event => {
    // private events require login
    const hasPermission = isLoggedIn || !event.permission || event.permission === 'public';
    if (!hasPermission) return false;

    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.speakers?.some(speaker => speaker.name.toLowerCase().includes(query))
    );
  });

  const handleLogin = (username: string, password: string): boolean => {
    // hardcoded for demo
    if (username === 'hacker' && password === 'htn2026') {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderEvents(active.id as number, over.id as number);
    }
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-[#a855f7] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-gray-400 text-lg">Loading events...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center">
        <motion.div
          className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-red-400 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-[#0b0e14]">
      <HTNHeader
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <SpaceHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <div className="max-w-7xl mx-auto px-6 py-4">
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Showing {filteredEvents.length} of {events.length} events
          {!isLoggedIn && (
            <span className="text-[#a855f7] ml-2">
              (Sign in to see private events)
            </span>
          )}
        </motion.p>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <motion.div
            className="bg-[#0f1117]/50 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filteredEvents.length > 0 ? (
              <SortableContext items={filteredEvents.map(e => e.id)} strategy={verticalListSortingStrategy}>
                {filteredEvents.map((event, index) => (
                  <SortableEventCard
                    key={event.id}
                    event={event}
                    onViewDetails={() => setSelectedEvent(event.id)}
                    isLast={index === filteredEvents.length - 1}
                  />
                ))}
              </SortableContext>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <p className="text-lg mb-2">No events found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        </DndContext>
      </main>

      <AnimatePresence>
        {selectedEvent !== null && selectedEventData && (
          <EventDetailView
            event={selectedEventData}
            allEvents={events}
            onClose={() => setSelectedEvent(null)}
            onEventChange={(eventId) => setSelectedEvent(eventId)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        )}
      </AnimatePresence>

      <HTNFooter />
    </div>
  );
}
