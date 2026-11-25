import React from 'react';
import { ArrowUpRight, Check, Copy, MessageSquare, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';

interface WhatsAppJoinModalProps {
  open: boolean;
  onClose: () => void;
}

const WHATSAPP_GROUPS = [
  {
    id: 'wa-opportunities',
    name: 'Opportunities & Internships Signal',
    description: 'Verified hackathons, off-campus SDE internships, and fellowship deadlines.',
    members: '2,400+ builders',
    href: 'https://www.whatsapp.com',
  },
  {
    id: 'wa-challenges',
    name: 'DSA & Weekly Coding Challenges',
    description: 'Daily problem threads, AlgoRush updates, and peer complexity reviews.',
    members: '1,900+ builders',
    href: 'https://www.whatsapp.com',
  },
  {
    id: 'wa-ai-robotics',
    name: 'Agentic AI, Robotics & Automation',
    description: 'AI Sparks follow-ups, n8n workflow recipes, and curated LLM engineering notes.',
    members: '1,650+ builders',
    href: 'https://www.whatsapp.com',
  },
  {
    id: 'wa-general',
    name: 'Main CodeNeuraX Pan-India Lobby',
    description: 'AMA announcements, speaker clinic links, and cross-campus project collaboration.',
    members: '7,000+ network',
    href: 'https://www.whatsapp.com',
  },
];

export const WhatsAppJoinModal: React.FC<WhatsAppJoinModalProps> = ({ open, onClose }) => {
  const { pushToast } = useApp();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyInvite = (id: string, name: string) => {
    navigator.clipboard?.writeText('https://codeneurax.in/whatsapp').catch(() => {});
    setCopiedId(id);
    pushToast({
      title: 'Community link copied',
      description: `Share "${name}" invite link with campus peers.`,
      variant: 'success',
    });
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      subtitle="WhatsApp Network · 4 Dedicated Groups"
      title="Join CodeNeuraX on WhatsApp"
      maxWidthClass="max-w-xl"
    >
      <p className="text-sm text-neutral-400 leading-relaxed mb-5">
        7,000+ student engineers across India organized into four curated channels. Pick the
        tracks relevant to your current engineering focus.
      </p>

      <div className="divide-y divide-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden bg-[#0E0E10]">
        {WHATSAPP_GROUPS.map((group) => (
          <div
            key={group.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-[#818CF8] inline-flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {group.members}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white">{group.name}</h4>
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{group.description}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleCopyInvite(group.id, group.name)}
                className="p-2 rounded-lg border border-white/[0.08] bg-[#16161A] text-neutral-400 hover:text-white hover:border-white/[0.16] transition-colors active:scale-[0.96]"
                title="Copy group link"
              >
                {copiedId === group.id ? (
                  <Check className="w-4 h-4 text-[#4353FF]" strokeWidth={1.75} />
                ) : (
                  <Copy className="w-4 h-4" strokeWidth={1.75} />
                )}
              </button>
              <a
                href={group.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushToast({
                    title: `Opening ${group.name}`,
                    description: 'Redirecting to official CodeNeuraX WhatsApp channel.',
                  })
                }
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold transition-colors active:scale-[0.97]"
              >
                <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.75} />
                Join
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
