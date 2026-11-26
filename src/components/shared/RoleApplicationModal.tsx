import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
      maxWidthClass="max-w-[840px]"
      footer={
        isApplied ? (
          <div className="flex justify-end">
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
              form="cnx-role-application-form"
              className="cnx-clay-btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold"
            >
              <span>Submit application</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        )
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        <div className="lg:col-span-4 rounded-[18px] cnx-bento-accent p-5 flex flex-col justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium text-white/75">CodeNeuraX Network</p>
            <p className="mt-1.5 text-base font-bold text-white leading-snug">
              Build and lead on campus.
            </p>
          </div>
          <div className="pt-3 border-t border-white/15 space-y-1.5 text-xs text-white/80">
            <p>Weekly Core Team reviews</p>
            <p>Official leadership credentials</p>
            <p>Direct speaker &amp; partner access</p>
          </div>
        </div>

        <div className="lg:col-span-8">
          {isApplied ? (
            <div className="h-full rounded-[18px] cnx-bento-tile p-6 flex flex-col justify-center gap-1.5">
              <span className="text-xs font-bold text-emerald-600">Submitted</span>
              <h4 className="text-lg font-bold text-[#0E111B]">Application recorded</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Logged for <strong className="text-[#0E111B]">{name}</strong> ({college}). Core
                Team leads review cohorts weekly.
              </p>
            </div>
          ) : (
            <form
              id="cnx-role-application-form"
              onSubmit={handleSubmit}
              className="h-full rounded-[18px] cnx-bento-tile p-4 sm:p-5 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    College &amp; branch
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
                    LinkedIn or GitHub
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="cnx-bento-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                  Why do you want to lead with CodeNeuraX?
                </label>
                <textarea
                  rows={2}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="Share campus events, open-source work, or shipped projects..."
                  className="cnx-bento-input resize-none"
                />
              </div>

              {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};
