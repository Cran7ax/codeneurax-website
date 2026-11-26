import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { INITIAL_INCOMING_REQUESTS, INITIAL_SQUADS } from '../data/buddykid';
import type { JoinRequest, Squad, UserProfile } from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'warning';
}

interface CreateSquadInput {
  name: string;
  hackathon: string;
  maxSize: number;
  skills: string[];
  lookingFor: string;
  college: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  description: string;
}

interface AppContextValue {
  user: UserProfile;
  toggleSignIn: () => void;
  updateUserProfile: (partial: Partial<UserProfile>) => void;
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  squads: Squad[];
  incomingRequests: JoinRequest[];
  outgoingRequests: JoinRequest[];
  requestJoinSquad: (squadId: string, note: string, roleRequested: string) => boolean;
  joinWithCode: (code: string) => { ok: boolean; message: string; squad?: Squad };
  createSquad: (input: CreateSquadInput) => Squad;
  handleIncomingRequest: (requestId: string, action: 'accept' | 'decline') => void;
  withdrawOutgoingRequest: (requestId: string) => void;
  registeredEvents: string[];
  registerForEvent: (eventId: string, eventTitle: string) => void;
  appliedRoles: string[];
  applyForRole: (roleId: string, roleTitle: string) => void;
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const DEFAULT_USER: UserProfile = {
  name: 'Dev Parmar',
  handle: '@devparmar',
  college: 'Marwadi University, Rajkot',
  role: 'Full-Stack & AI Builder',
  email: 'dev.parmar@codeneurax.in',
  signedIn: true,
  skills: ['React', 'TypeScript', 'Python', 'FastAPI', 'LLM Agents'],
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() =>
    readStorage('cnx_user_v1', DEFAULT_USER),
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    readStorage('cnx_bookmarks_v1', ['opp-neuraknockout-2026']),
  );
  const [squads, setSquads] = useState<Squad[]>(() =>
    readStorage('cnx_buddykid_squads_v1', INITIAL_SQUADS),
  );
  const [incomingRequests, setIncomingRequests] = useState<JoinRequest[]>(() =>
    readStorage('cnx_buddykid_incoming_v1', INITIAL_INCOMING_REQUESTS),
  );
  const [outgoingRequests, setOutgoingRequests] = useState<JoinRequest[]>(() =>
    readStorage('cnx_buddykid_outgoing_v1', []),
  );
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(() =>
    readStorage('cnx_registered_events_v1', []),
  );
  const [appliedRoles, setAppliedRoles] = useState<string[]>(() =>
    readStorage('cnx_applied_roles_v1', []),
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const lastToastRef = useRef<{ key: string; ts: number }>({ key: '', ts: 0 });

  useEffect(() => {
    try {
      localStorage.setItem('cnx_user_v1', JSON.stringify(user));
    } catch {
      /* ignore */
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('cnx_bookmarks_v1', JSON.stringify(bookmarkedIds));
    } catch {
      /* ignore */
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('cnx_buddykid_squads_v1', JSON.stringify(squads));
    } catch {
      /* ignore */
    }
  }, [squads]);

  useEffect(() => {
    try {
      localStorage.setItem('cnx_buddykid_incoming_v1', JSON.stringify(incomingRequests));
    } catch {
      /* ignore */
    }
  }, [incomingRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('cnx_buddykid_outgoing_v1', JSON.stringify(outgoingRequests));
    } catch {
      /* ignore */
    }
  }, [outgoingRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('cnx_registered_events_v1', JSON.stringify(registeredEvents));
    } catch {
      /* ignore */
    }
  }, [registeredEvents]);

  useEffect(() => {
    try {
      localStorage.setItem('cnx_applied_roles_v1', JSON.stringify(appliedRoles));
    } catch {
      /* ignore */
    }
  }, [appliedRoles]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const dedupeKey = `${toast.title}::${toast.description ?? ''}`;
      const now = Date.now();
      if (lastToastRef.current.key === dedupeKey && now - lastToastRef.current.ts < 500) {
        return;
      }
      lastToastRef.current = { key: dedupeKey, ts: now };

      const id = `toast-${now}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [
        ...prev.filter((t) => `${t.title}::${t.description ?? ''}` !== dedupeKey).slice(-1),
        { ...toast, id },
      ]);

      window.setTimeout(() => {
        dismissToast(id);
      }, 3600);
    },
    [dismissToast],
  );

  const toggleSignIn = () => {
    const nextSignedIn = !user.signedIn;
    setUser((prev) => ({ ...prev, signedIn: nextSignedIn }));
    pushToast({
      title: nextSignedIn ? `Signed in as ${user.name}` : 'Switched to guest mode',
      description: nextSignedIn
        ? 'Squad approvals and join requests are active.'
        : 'Sign back in anytime from the header.',
    });
  };

  const updateUserProfile = (partial: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...partial }));
  };

  const toggleBookmark = (id: string) => {
    const exists = bookmarkedIds.includes(id);
    setBookmarkedIds((prev) => (exists ? prev.filter((x) => x !== id) : [...prev, id]));
    pushToast({
      title: exists ? 'Removed from saved feed' : 'Saved to Opportunity Feed',
      variant: exists ? 'default' : 'success',
    });
  };

  const requestJoinSquad = (squadId: string, note: string, roleRequested: string): boolean => {
    if (!user.signedIn) {
      pushToast({
        title: 'Sign in required',
        description: 'Activate your profile in the header to request squad membership.',
        variant: 'warning',
      });
      return false;
    }

    const squad = squads.find((s) => s.id === squadId);
    if (!squad) return false;

    if (squad.createdByMe || squad.leader === user.name) {
      pushToast({
        title: 'You already lead this squad',
        description: 'Open My Squads to review incoming builders.',
        variant: 'warning',
      });
      return false;
    }

    if (squad.currentSize >= squad.maxSize) {
      pushToast({
        title: 'Squad is already full',
        description: `${squad.name} has filled all ${squad.maxSize} seats.`,
        variant: 'warning',
      });
      return false;
    }

    const alreadyRequested = outgoingRequests.some(
      (r) => r.squadId === squadId && r.status !== 'Declined',
    );
    if (alreadyRequested) {
      pushToast({
        title: 'Request already sent',
        description: `Your request to ${squad.name} is pending review.`,
      });
      return false;
    }

    const newReq: JoinRequest = {
      id: `req-out-${Date.now()}`,
      squadId: squad.id,
      squadName: squad.name,
      hackathon: squad.hackathon,
      applicantName: user.name,
      applicantCollege: user.college,
      roleRequested: roleRequested || squad.lookingFor,
      skills: user.skills,
      note: note.trim() || `Interested in joining ${squad.name} for ${squad.lookingFor}.`,
      status: 'Pending',
      timestamp: 'Just now',
    };

    setOutgoingRequests((prev) => [newReq, ...prev]);
    pushToast({
      title: `Request sent to ${squad.name}`,
      description: `${squad.leader} has been notified.`,
      variant: 'success',
    });
    return true;
  };

  const joinWithCode = (
    rawCode: string,
  ): { ok: boolean; message: string; squad?: Squad } => {
    if (!user.signedIn) {
      return {
        ok: false,
        message: 'Sign in from the header before redeeming an invite code.',
      };
    }

    const normalized = rawCode.trim().toUpperCase();
    if (!normalized) {
      return { ok: false, message: 'Enter a valid invite code (for example CNX-ROACH).' };
    }

    const match = squads.find((s) => s.inviteCode.toUpperCase() === normalized);
    if (!match) {
      return {
        ok: false,
        message: `No active squad matched "${normalized}". Try CNX-ROACH or CNX-AI26.`,
      };
    }

    if (match.currentSize >= match.maxSize) {
      return {
        ok: false,
        message: `${match.name} is already at capacity (${match.currentSize}/${match.maxSize}).`,
        squad: match,
      };
    }

    const alreadyJoined = outgoingRequests.some(
      (r) => r.squadId === match.id && r.status === 'Accepted',
    );
    if (alreadyJoined || match.createdByMe) {
      return {
        ok: true,
        message: `You are already a member of ${match.name}.`,
        squad: match,
      };
    }

    setSquads((prev) =>
      prev.map((s) =>
        s.id === match.id ? { ...s, currentSize: Math.min(s.maxSize, s.currentSize + 1) } : s,
      ),
    );
    setOutgoingRequests((prev) => [
      {
        id: `req-code-${Date.now()}`,
        squadId: match.id,
        squadName: match.name,
        hackathon: match.hackathon,
        applicantName: user.name,
        applicantCollege: user.college,
        roleRequested: match.lookingFor,
        skills: user.skills,
        note: `Joined directly via invite code ${normalized}.`,
        status: 'Accepted',
        timestamp: 'Just now',
      },
      ...prev.filter((r) => r.squadId !== match.id),
    ]);

    pushToast({
      title: `Joined ${match.name}`,
      description: `Code ${normalized} verified.`,
      variant: 'success',
    });

    return {
      ok: true,
      message: `Joined ${match.name} (${match.hackathon}) using ${normalized}.`,
      squad: { ...match, currentSize: match.currentSize + 1 },
    };
  };

  const createSquad = (input: CreateSquadInput): Squad => {
    const codeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newSquad: Squad = {
      id: `sq-${Date.now()}`,
      name: input.name.trim(),
      hackathon: input.hackathon.trim(),
      leader: user.name,
      college: input.college.trim() || user.college,
      mode: input.mode,
      currentSize: 1,
      maxSize: input.maxSize,
      skills: input.skills.length > 0 ? input.skills : ['React', 'Backend'],
      lookingFor: input.lookingFor.trim(),
      inviteCode: `CNX-${codeSuffix}`,
      description:
        input.description.trim() ||
        `Building for ${input.hackathon.trim()} and recruiting ${input.lookingFor.trim()}.`,
      createdByMe: true,
    };

    setSquads((prev) => [newSquad, ...prev]);
    pushToast({
      title: `Squad "${newSquad.name}" created`,
      description: `Invite code: ${newSquad.inviteCode}`,
      variant: 'success',
    });
    return newSquad;
  };

  const handleIncomingRequest = (requestId: string, action: 'accept' | 'decline') => {
    const req = incomingRequests.find((r) => r.id === requestId);
    if (!req) return;

    if (action === 'accept') {
      const targetSquad = squads.find((s) => s.id === req.squadId);
      if (targetSquad && targetSquad.currentSize >= targetSquad.maxSize) {
        pushToast({
          title: 'Squad is at max capacity',
          description: `${targetSquad.name} cannot accept additional members.`,
          variant: 'warning',
        });
        return;
      }

      setSquads((prev) =>
        prev.map((s) =>
          s.id === req.squadId ? { ...s, currentSize: Math.min(s.maxSize, s.currentSize + 1) } : s,
        ),
      );
    }

    setIncomingRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: action === 'accept' ? 'Accepted' : 'Declined' } : r,
      ),
    );

    pushToast({
      title:
        action === 'accept'
          ? `Approved ${req.applicantName}`
          : `Declined ${req.applicantName}`,
      variant: action === 'accept' ? 'success' : 'default',
    });
  };

  const withdrawOutgoingRequest = (requestId: string) => {
    setOutgoingRequests((prev) => prev.filter((r) => r.id !== requestId));
    pushToast({ title: 'Join request withdrawn' });
  };

  const registerForEvent = (eventId: string, eventTitle: string) => {
    setRegisteredEvents((prev) => (prev.includes(eventId) ? prev : [...prev, eventId]));
    pushToast({
      title: `Registered for ${eventTitle}`,
      description: 'Event pass queued to your profile.',
      variant: 'success',
    });
  };

  const applyForRole = (roleId: string, roleTitle: string) => {
    setAppliedRoles((prev) => (prev.includes(roleId) ? prev : [...prev, roleId]));
    pushToast({
      title: `Applied for ${roleTitle}`,
      description: 'Core Team reviews applications weekly.',
      variant: 'success',
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        toggleSignIn,
        updateUserProfile,
        bookmarkedIds,
        toggleBookmark,
        squads,
        incomingRequests,
        outgoingRequests,
        requestJoinSquad,
        joinWithCode,
        createSquad,
        handleIncomingRequest,
        withdrawOutgoingRequest,
        registeredEvents,
        registerForEvent,
        appliedRoles,
        applyForRole,
        toasts,
        pushToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
