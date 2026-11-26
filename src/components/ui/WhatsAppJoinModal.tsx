import React from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';

interface WhatsAppJoinModalProps {
  open: boolean;
  onClose: () => void;
}

const WHATSAPP_GROUPS = [
  {
    id: 'wa-opportunities',
    name: 'Opportunities & Internships',
    description: 'Verified hackathons, SDE roles, and fellowships.',
    members: '2,400+',
    href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x',
  },
  {
    id: 'wa-challenges',
    name: 'DSA & Coding Challenges',
    description: 'Daily threads, AlgoRush updates, and complexity reviews.',
    members: '1,900+',
    href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x',
  },
  {
    id: 'wa-ai-robotics',
    name: 'Agentic AI & Automation',
    description: 'AI Sparks labs, n8n workflows, and practical LLM notes.',
    members: '1,650+',
    href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x',
  },
  {
    id: 'wa-general',
    name: 'Pan-India Main Lobby',
    description: 'Speaker clinic links and cross-campus collaboration.',
    members: '7,000+',
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
      subtitle="4 dedicated channels"
      title="Join CodeNeuraX on WhatsApp"
      maxWidthClass="max-w-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {WHATSAPP_GROUPS.map((group) => (
          <div
            key={group.id}
            className="rounded-xl cnx-popout-tile p-5 flex flex-col justify-between gap-5 hover:border-white/[0.16] transition-colors"
          >
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-2xl font-extrabold tracking-tight text-white">
                  {group.members}
                </p>
                <span className="text-[11px] font-medium text-neutral-500">builders</span>
              </div>
              <h4 className="mt-2.5 text-sm font-bold text-white leading-snug">{group.name}</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{group.description}</p>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.07]">
              <button
                type="button"
                onClick={() => handleCopyInvite(group.id, group.name)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                {copiedId === group.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.25} />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>Copy link</span>
                  </>
                )}
              </button>

              <a
                href={group.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushToast({
                    title: `Opening ${group.name}`,
                    description: 'Redirecting to official WhatsApp channel.',
                  })
                }
                className="group cnx-clay-btn-primary inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold"
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
