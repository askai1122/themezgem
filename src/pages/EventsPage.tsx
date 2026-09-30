import React, { useState } from 'react';
import { useEventStore } from '../stores';
import { Calendar, Clock, MapPin, Download, Tag } from 'lucide-react';
import { EventItem } from '../types';

export const EventsPage: React.FC = () => {
  const { events } = useEventStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Community', 'Sports', 'Live Events', 'Car Meets', 'Special Events'];

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter((e) => e.category === selectedCategory);

  const downloadIcs = (event: EventItem) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Mez Bar & Grill//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-line)] font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>HAPPENINGS & SPECIAL GATHERINGS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
            EVENTS AT THE MEZ
          </h1>
          <p className="text-sm text-[var(--smoke)] mt-2 max-w-xl">
            From community car meets and hockey watch parties to weekend live grill sessions in Fort Erie.
          </p>

          <div className="mt-4 p-3 bg-[#2B1D14] border border-white/10 text-xs text-[var(--smoke)] max-w-2xl">
            <span className="text-[var(--ember)] font-bold mr-1">DEMO CALENDAR:</span>
            All events listed below are simulated demo events for digital platform showcase.
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 text-xs font-bold uppercase tracking-wider">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 border transition-all ${
                selectedCategory === cat
                  ? 'border-[var(--ember)] bg-[var(--ember)] text-white shadow-md'
                  : 'border-white/10 text-[var(--smoke)] hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-[#2B1D14] border border-white/10 flex flex-col justify-between overflow-hidden group hover:border-[var(--ember)] transition-colors shadow-xl"
            >
              {/* Media banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                {evt.video ? (
                  <video
                    src={evt.video}
                    poster={evt.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D14] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--flour)] bg-black/70 px-2.5 py-1 border border-white/10">
                    {evt.category}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ember)] bg-black/80 px-2 py-0.5 border border-[var(--ember)]/30">
                    DEMO EVENT
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold uppercase font-display text-[var(--flour)] group-hover:text-[var(--ember)] transition-colors mb-3 leading-tight">
                    {evt.title.replace(' [DEMO EVENT]', '')}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[var(--smoke)] mb-4">
                    <div className="flex items-center gap-2 text-[var(--flour)] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[var(--smoke)]" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[var(--ember)] flex-shrink-0 mt-0.5" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--smoke)] leading-relaxed mb-6">
                    {evt.description.replace('DEMO EVENT — ', '')}
                  </p>
                </div>

                <button
                  onClick={() => downloadIcs(evt)}
                  className="w-full py-2.5 bg-[#15100C] hover:bg-black text-[var(--flour)] border border-white/15 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-[var(--gold-line)] transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                  <span>ADD TO CALENDAR (.ICS)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
