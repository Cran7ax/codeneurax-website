import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';

interface WhatsAppJoinModalProps {
  open: boolean;
  onClose: () => void;
}

const WHATSAPP_GROUPS = [
  {
    id: 'wa-general',
    name: 'Pan-India Main Lobby',
    description: 'Speaker clinics and cross-campus collaboration.',
    members: '7,000+',
    featured: true,
    href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x',
  },
  {
    id: 'wa-opportunities',
    name: 'Opportunities & Internships',
    description: 'Verified hackathons, SDE roles, and fellowships.',
    members: '2,400+',
    featured: false,
    href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x',
  },
  {
    id: 'wa-challenges',
    name: 'DSA & Weekly Coding',
    description: 'Daily threads, AlgoRush updates, and reviews.',
    members: '1,900+',
    featured: false,
    href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x',
  },
  {
    id: 'wa-ai-robotics',
    name: 'Agentic AI & Automation',
    description: 'AI Sparks labs, workflows, and LLM notes.',
    members: '1,650+',
    featured: false,
    href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x',
  },
];

export const WhatsAppJoinModal: React.FC<WhatsAppJoinModalProps> = ({ open, onClose }) => {
  const { pushToast } = useApp();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyInvite = (id: string, name: string) => {
    navigator.clipboard?.writeText('https://codeneurax.in/whatsapp').catch(() => {});
    setCopiedId(id);
    pushToast({
      title: 'Invite link copied',
      description: `Share "${name}" with campus peers.`,
      variant: 'success',
    });
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      subtitle="4 curated channels"
      title="Join CodeNeuraX on WhatsApp"
      maxWidthClass="max-w-[740px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {WHATSAPP_GROUPS.map((group) => (
          <div
            key={group.id}
            className={`rounded-[20px] p-5 flex flex-col justify-between gap-4 ${
              group.featured ? 'cnx-bento-accent' : 'cnx-bento-tile-hover'
            }`}
          >
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={`text-2xl font-extrabold tracking-tight ${
                    group.featured ? 'text-white' : 'text-[#0E111B]'
                  }`}
                >
                  {group.members}
                </p>
                <span
                  className={`text-[11px] font-medium ${
                    group.featured ? 'text-white/75' : 'text-neutral-400'
                  }`}
                >
                  builders
                </span>
              </div>
              <h4
                className={`mt-2 text-sm font-bold ${
                  group.featured ? 'text-white' : 'text-[#0E111B]'
                }`}
              >
                {group.name}
              </h4>
              <p
                className={`mt-1 text-xs leading-relaxed ${
                  group.featured ? 'text-white/80' : 'text-neutral-600'
                }`}
              >
                {group.description}
              </p>
            </div>

            <div
              className={`flex items-center justify-between gap-3 pt-3 border-t ${
                group.featured ? 'border-white/15' : 'border-black/[0.06]'
              }`}
            >
              <button
                type="button"
                onClick={() => handleCopyInvite(group.id, group.name)}
                className={`text-xs font-semibold transition-colors ${
                  group.featured
                    ? 'text-white/80 hover:text-white'
                    : 'text-neutral-500 hover:text-[#0E111B]'
                }`}
              >
                {copiedId === group.id ? 'Copied' : 'Copy link'}
              </button>

              <a
                href={group.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushToast({
                    title: `Opening ${group.name}`,
                    description: 'Redirecting to official channel.',
                  })
                }
                className={`group inline-flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-semibold ${
                  group.featured ? 'cnx-clay-btn-white' : 'cnx-clay-btn-primary'
                }`}
              >
                <span>Join</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
