import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { CnxEvent } from '../../types';
import { Modal } from '../ui/Modal';

interface EventRegistrationModalProps {
  event: CnxEvent | null;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  onClose,
}) => {
  const { user, registeredEvents, registerForEvent } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [college, setCollege] = useState(user.college);
  const [track, setTrack] = useState('Individual Builder Track');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [event?.id]);

  if (!event) return null;

  const alreadyRegistered = registeredEvents.includes(event.id);
  const isUpcoming = event.status === 'Upcoming';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@') || !college.trim()) {
      setError('Enter your name, valid email address, and college.');
      return;
    }
    setError('');
    registerForEvent(event.id, event.title);
  };

  const heroBanner = (
    <div
      className={`relative overflow-hidden border-b border-white/[0.08] ${
        event.image ? 'min-h-[184px]' : 'min-h-[146px] cnx-prism-hero'
      } flex flex-col justify-end p-6 sm:px-7`}
    >
      {event.image && (
        <>
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(14,14,16,0.28) 0%, rgba(14,14,16,0.72) 55%, rgba(16,17,22,0.98) 100%)',
            }}
          />
        </>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close event dialog"
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-black/55 hover:bg-black/80 text-white border border-white/[0.15] flex items-center justify-center transition-colors active:scale-[0.94]"
      >
        <X className="w-4 h-4" strokeWidth={1.85} />
      </button>

      <div className="relative z-10 pr-10">
        <p className="text-xs font-semibold text-[#818CF8]">
          {event.status} · {event.mode}
        </p>
        <h3 className="mt-1 text-2xl font-bold tracking-[-0.025em] text-white leading-tight">
          {event.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-neutral-300 line-clamp-1">{event.subtitle}</p>
      </div>
    </div>
  );

  return (
    <Modal
      open={Boolean(event)}
      onClose={onClose}
      title={event.title}
      maxWidthClass="max-w-xl"
      hero={heroBanner}
      hideDefaultHeader
      footer={
        !isUpcoming ? (
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/library"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              <span>Browse notes in Library</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="cnx-clay-btn-white px-5 py-2 rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-5">
        {/* Bento Micro-Tiles for Event Facts */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl cnx-popout-tile p-3.5">
            <p className="text-[11px] font-medium text-neutral-500">Schedule</p>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-white">{event.date}</p>
            {event.time && <p className="text-[11px] text-neutral-400 mt-0.5">{event.time}</p>}
          </div>

          <div className="rounded-xl cnx-popout-tile p-3.5">
            <p className="text-[11px] font-medium text-neutral-500">Venue / Format</p>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-white leading-snug">
              {event.venueOrPlatform}
            </p>
          </div>

          {event.prizePool && (
            <div className="col-span-2 rounded-xl cnx-popout-tile p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[11px] font-medium text-neutral-500">Prize Pool</span>
              <span className="text-xs font-semibold text-[#60A5FA]">{event.prizePool}</span>
            </div>
          )}

          {event.speaker && (
            <div className="col-span-2 rounded-xl cnx-popout-tile p-3.5">
              <p className="text-[11px] font-medium text-neutral-500">Speaker</p>
              <p className="mt-0.5 text-sm font-semibold text-white">
                {event.speaker}
                {event.speakerTitle ? (
                  <span className="font-normal text-neutral-400"> · {event.speakerTitle}</span>
                ) : null}
              </p>
            </div>
          )}
        </div>

        {/* Highlights Bento Card */}
        <div className="rounded-xl cnx-popout-tile p-4">
          <p className="text-[11px] font-medium text-neutral-500 mb-2.5">
            {isUpcoming ? 'Highlights' : 'Key takeaways'}
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {event.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 text-[#60A5FA] mt-1 shrink-0" strokeWidth={2.25} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Registration Section */}
        {alreadyRegistered ? (
          <div className="rounded-xl cnx-popout-tile p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-emerald-500/25">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" strokeWidth={2.25} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Seat confirmed</h4>
                <p className="text-xs text-neutral-400">Pass details queued for {email}.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="cnx-clay-btn-white px-4 py-2 rounded-lg text-xs font-semibold shrink-0"
            >
              Done
            </button>
          </div>
        ) : isUpcoming ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-white/[0.08]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="cnx-popout-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cnx-popout-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  College / organization
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="cnx-popout-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Track</label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="cnx-popout-input"
                >
                  <option>Individual Builder Track</option>
                  <option>Marwadi University Student</option>
                  <option>External College Participant</option>
                </select>
              </div>
            </div>

            {error && <p className="text-xs font-medium text-rose-400">{error}</p>}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cnx-clay-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                <span>Confirm registration</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </Modal>
  );
};
