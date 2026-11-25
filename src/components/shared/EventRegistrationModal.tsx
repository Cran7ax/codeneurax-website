import React, { useState } from 'react';
import { Calendar, CheckCircle2, MapPin, Trophy } from 'lucide-react';
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

  if (!event) return null;

  const alreadyRegistered = registeredEvents.includes(event.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@') || !college.trim()) {
      setError('Please enter a valid full name, email address, and college name.');
      return;
    }
    setError('');
    registerForEvent(event.id, event.title);
  };

  return (
    <Modal
      open={Boolean(event)}
      onClose={onClose}
      subtitle={`${event.status} · ${event.date}`}
      title={event.title}
      maxWidthClass="max-w-xl"
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-[#0E0E10] border border-white/[0.08] space-y-2 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Calendar className="w-3.5 h-3.5 text-[#4353FF]" strokeWidth={1.75} />
            <span className="font-medium">
              {event.date} {event.time ? `· ${event.time}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.75} />
            <span>{event.venueOrPlatform}</span>
          </div>
          {event.prizePool && (
            <div className="flex items-center gap-2 text-white font-semibold">
              <Trophy className="w-3.5 h-3.5 text-[#E1498A]" strokeWidth={1.75} />
              <span>{event.prizePool}</span>
            </div>
          )}
        </div>

        <ul className="space-y-1.5 text-xs text-neutral-300 border-l border-white/[0.12] pl-3">
          {event.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {alreadyRegistered ? (
          <div className="p-5 rounded-xl bg-[#4353FF]/15 border border-[#4353FF]/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#818CF8] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div>
              <h4 className="text-sm font-bold text-white">Seat Confirmed</h4>
              <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                You are registered for {event.title}. Reporting guidelines and problem brief
                schedule are active under {email}.
              </p>
            </div>
          </div>
        ) : event.status === 'Upcoming' ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-3 border-t border-white/[0.08]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block cnx-section-label text-neutral-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="block cnx-section-label text-neutral-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block cnx-section-label text-neutral-400 mb-1.5">
                  College / Org
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="block cnx-section-label text-neutral-400 mb-1.5">
                  Participation
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                >
                  <option>Individual Builder Track</option>
                  <option>Marwadi University Student</option>
                  <option>External College Participant</option>
                </select>
              </div>
            </div>

            {error && <p className="text-xs font-medium text-[#E1498A]">{error}</p>}

            <div className="flex justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-white/[0.1] text-xs font-medium text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold transition-colors active:scale-[0.97]"
              >
                Confirm Registration
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </Modal>
  );
};
