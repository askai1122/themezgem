import React, { useState, useEffect } from 'react';
import { useEventStore, useUIStore } from '../../stores';
import { EventItem } from '../../types';
import { Plus, Edit2, Trash2, Calendar, MapPin, X } from 'lucide-react';

export const AdminEventsPage: React.FC = () => {
  const { events, loadEvents, saveEvent, deleteEvent } = useEventStore();
  const { addToast } = useUIStore();

  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleOpenNew = () => {
    setEditingEvent({
      id: `evt-${Date.now()}`,
      title: 'New Community Gathering [DEMO EVENT]',
      category: 'Community',
      date: new Date().toISOString().split('T')[0],
      time: '6:00 PM – 9:00 PM',
      location: '#9 – 1267 Garrison Road, Fort Erie',
      description: 'DEMO EVENT — Join us at The Mez for an evening of food and fellowship.',
      image: '/images/gallery/gallery-04.jpg',
      video: '',
      isDemo: true,
      status: 'Published',
    });
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    await saveEvent(editingEvent);
    setIsOpen(false);
    setEditingEvent(null);
    addToast({
      type: 'success',
      title: 'EVENT SAVED',
      message: `"${editingEvent.title}" updated.`,
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this event?')) {
      await deleteEvent(id);
      addToast({
        type: 'info',
        title: 'EVENT DELETED',
        message: 'The event was removed.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--gold-line)]">
            COMMUNITY & SPORTS GATHERINGS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-[var(--flour)]">
            EVENTS CMS ({events.length})
          </h1>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE EVENT</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-[#1C140F] border border-white/10 p-5 flex flex-col justify-between space-y-4 hover:border-white/25 transition-colors shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[var(--smoke)] mb-2">
                <span className="text-[var(--ember)]">{evt.category}</span>
                <span className="px-2 py-0.5 border border-white/20">{evt.status}</span>
              </div>

              <h3 className="text-base font-bold uppercase font-display text-[var(--flour)] leading-snug mb-2">
                {evt.title}
              </h3>

              <div className="space-y-1 text-xs text-[var(--smoke)] mb-3">
                <div className="flex items-center gap-2 text-[var(--flour)]">
                  <Calendar className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                  <span>{evt.date} · {evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--ember)]" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>

              <p className="text-xs text-[var(--smoke)] line-clamp-3">
                {evt.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditingEvent({ ...evt });
                  setIsOpen(true);
                }}
                className="p-1.5 text-[var(--smoke)] hover:text-white"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(evt.id)}
                className="p-1.5 text-[var(--smoke)] hover:text-red-400"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Event Form Modal */}
      {isOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#1C140F] border border-white/15 w-full max-w-lg p-6 sm:p-8 space-y-4 text-[#F3ECDD] shadow-2xl relative my-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--smoke)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold uppercase font-display">
              EVENT DETAILS
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Category
                  </label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        category: e.target.value as EventItem['category'],
                      })
                    }
                    className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  >
                    <option value="Community">Community</option>
                    <option value="Sports">Sports</option>
                    <option value="Live Events">Live Events</option>
                    <option value="Car Meets">Car Meets</option>
                    <option value="Special Events">Special Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Time
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.time}
                  onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[var(--smoke)] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  className="w-full bg-[#15100C] border border-white/15 p-2.5 text-xs text-[var(--flour)] focus:outline-none focus:border-[var(--ember)] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs uppercase font-bold text-[var(--smoke)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--ember)] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
