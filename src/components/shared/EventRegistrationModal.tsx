import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
    if (event) {
      setName(user.name);
      setEmail(user.email);
      setCollege(user.college);
    }
  }, [event, user.name, user.email, user.college]);

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

  return (
    <Modal
      open={Boolean(event)}
      onClose={onClose}
      subtitle={`${event.status} · ${event.mode} · ${event.category}`}
      title={event.title}
      maxWidthClass={isUpcoming ? 'max-w-[880px]' : 'max-w-[720px]'}
      footer={
        alreadyRegistered || !isUpcoming ? (
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/library"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-[#3242D6] transition-colors"
            >
              <span>Session notes in Library</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.85} />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="cnx-clay-btn-dark px-5 py-2 rounded-xl text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cnx-bento-btn-muted px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="cnx-event-reg-form"
              className="cnx-clay-btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold"
            >
              <span>Confirm seat</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        )
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left Bento Column (5 cols when upcoming so the form gets full breathing room) */}
        <div className={`${isUpcoming ? 'lg:col-span-5' : 'lg:col-span-12'} flex flex-col gap-3`}>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 sm:col-span-6 rounded-[18px] cnx-bento-accent p-4 flex flex-col justify-between">
              <p className="text-[11px] font-medium text-white/75">
                {event.prizePool ? 'Awards' : event.speaker ? 'Speaker' : 'Schedule'}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm font-bold text-white leading-snug">
                {event.prizePool
                  ? event.prizePool.split('(')[0].trim()
                  : event.speaker || event.date}
              </p>
              <p className="mt-1 text-[11px] text-white/75 truncate">
                {event.time || event.date}
              </p>
            </div>

            <div className="col-span-12 sm:col-span-6 rounded-[18px] cnx-bento-tile p-4 flex flex-col justify-between">
              <p className="text-[11px] font-semibold text-neutral-500">Venue</p>
              <p className="mt-1.5 text-xs font-bold text-[#0E111B] leading-snug">
                {event.venueOrPlatform}
              </p>
              <p className="mt-1 text-[11px] text-neutral-500 truncate">
                {event.attendeesOrTarget}
              </p>
            </div>
          </div>

          <div className="flex-1 rounded-[18px] cnx-bento-tile p-4">
            <p className="text-[11px] font-semibold text-neutral-500 mb-2">
              {isUpcoming ? 'Highlights' : 'Key takeaways'}
            </p>
            <ul className="divide-y divide-black/[0.07] text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
              {event.highlights.slice(0, 3).map((h) => (
                <li key={h} className="py-2 first:pt-0 last:pb-0">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Bento Column (7 cols — tight natural rhythm, no stretched empty gap) */}
        {isUpcoming && (
          <div className="lg:col-span-7 flex flex-col">
            {alreadyRegistered ? (
              <div className="h-full rounded-[18px] cnx-bento-tile p-6 flex flex-col justify-center items-start gap-2">
                <span className="text-xs font-bold text-emerald-700">Confirmed</span>
                <h4 className="text-lg font-bold text-[#0E111B]">Your seat is reserved</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Pass details and reporting schedule have been queued to{' '}
                  <strong className="text-[#0E111B]">{email}</strong>.
                </p>
              </div>
            ) : (
              <form
                id="cnx-event-reg-form"
                onSubmit={handleSubmit}
                className="h-full rounded-[18px] cnx-bento-tile p-5 flex flex-col justify-center space-y-4"
              >
                <div>
                  <p className="text-sm font-bold text-[#0E111B]">Reserve your spot</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{event.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="cnx-bento-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="cnx-bento-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      College
                    </label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="cnx-bento-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Track
                    </label>
                    <select
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className="cnx-bento-input"
                    >
                      <option>Individual Builder Track</option>
                      <option>Marwadi University Student</option>
                      <option>External College Participant</option>
                    </select>
                  </div>
                </div>

                {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
              </form>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
