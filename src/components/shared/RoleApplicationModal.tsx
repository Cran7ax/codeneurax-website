import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
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
      setError('Complete all fields and share at least 20 characters about your work.');
      return;
    }
    setError('');
    applyForRole(roleId, roleTitle);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      subtitle="Core & Chapter Application"
      title={roleTitle}
      maxWidthClass="max-w-lg"
    >
      {isApplied ? (
        <div className="space-y-5">
          <div className="rounded-xl cnx-popout-tile p-5 flex items-start gap-3.5">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4" strokeWidth={2.25} />
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">Application recorded</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Submitted for <strong className="text-white">{name}</strong> ({college}). Core Team
                leads review cohorts weekly.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cnx-clay-btn-white px-5 py-2 rounded-lg text-xs font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="cnx-popout-input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">Email</label>
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
                College &amp; branch
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="cnx-popout-input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                LinkedIn / GitHub
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="cnx-popout-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">
              Why do you want to lead with CodeNeuraX?
            </label>
            <textarea
              rows={3}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Share campus events, open-source work, or shipped projects..."
              className="cnx-popout-input resize-none"
            />
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
              <span>Submit application</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
