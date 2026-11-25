import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';

interface RoleApplicationModalProps {
  open: boolean;
  roleId: string;
  roleTitle: string;
  onClose: () => void;
}

export const RoleApplicationModal: React.FC<RoleApplicationModalProps> = ({
  open,
  roleId,
  roleTitle,
  onClose,
}) => {
  const { user, appliedRoles, applyForRole } = useApp();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [college, setCollege] = useState(user.college);
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/');
  const [statement, setStatement] = useState('');
  const [error, setError] = useState('');

  const isApplied = appliedRoles.includes(roleId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || !college.trim() || statement.trim().length < 20) {
      setError('Complete all fields and share at least 20 characters about your initiative.');
      return;
    }
    setError('');
    applyForRole(roleId, roleTitle);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      subtitle="CodeNeuraX Application"
      title={`Apply: ${roleTitle}`}
      maxWidthClass="max-w-lg"
    >
      {isApplied ? (
        <div className="p-5 rounded-xl bg-[#4353FF]/15 border border-[#4353FF]/30 space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <CheckCircle2 className="w-5 h-5 text-[#818CF8]" strokeWidth={1.75} />
            <h4 className="text-sm font-bold">Application Recorded</h4>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Your application for <strong className="text-white">{roleTitle}</strong> has been logged
            for {name} ({college}). Core Team leads review cohorts weekly.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold hover:bg-neutral-200"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block cnx-section-label text-neutral-400 mb-1.5">Email</label>
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
                College &amp; Branch
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
                LinkedIn / GitHub URL
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block cnx-section-label text-neutral-400 mb-1.5">
              Why do you want to lead with CodeNeuraX?
            </label>
            <textarea
              rows={4}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Share campus events, open-source work, or communities you have contributed to..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none resize-none"
            />
          </div>

          {error && <p className="text-xs font-medium text-[#E1498A]">{error}</p>}

          <div className="flex justify-end gap-2.5">
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
              Submit Application
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
