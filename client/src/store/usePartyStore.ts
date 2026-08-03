import { create } from 'zustand';
import type { CharacterProgressMap, PartyMember, PartyState } from '../types/party.types';

const MAX_PARTY_SIZE = 5;
const MIN_LEVEL_TO_JOIN = 10;

const getNextRegionId = (progress: CharacterProgressMap, regionId: string) => {
  const regions = Object.keys(progress);
  const currentIndex = regions.indexOf(regionId);

  if (currentIndex >= 0 && regions[currentIndex + 1]) {
    return regions[currentIndex + 1];
  }

  const match = regionId.match(/^(.*?)(\d+)$/);

  if (match) {
    return `${match[1]}${Number(match[2]) + 1}`;
  }

  return null;
};

interface PartyStoreState extends PartyState {
  setMembers: (members: PartyMember[]) => void;
  addMember: (member: PartyMember) => boolean;
  removeMember: (memberId: string) => void;
  setActive: (memberId: string) => void;
  clearParty: () => void;
  canJoin: (memberId: string, regionId: string) => boolean;
  completeRegion: (regionId: string) => void;
  unlockRegion: (memberId: string, regionId: string) => void;
  takeDamage: (memberId: string, amount: number) => void;
  killMember: (memberId: string) => void;
  reviveAll: () => void;
  getAlive: () => PartyMember[];
  getXpMultiplier: () => number;
}

export const usePartyStore = create<PartyStoreState>((set, get) => ({
  members: [],
  activeId: null,
  maxSize: MAX_PARTY_SIZE,
  minLevelToJoin: MIN_LEVEL_TO_JOIN,
  setMembers: (members) => {
    set({
      members: members.slice(0, MAX_PARTY_SIZE),
      activeId: members[0]?.id ?? null
    });
  },
  addMember: (member) => {
    const { members, maxSize, minLevelToJoin } = get();

    if (members.length >= maxSize || member.level < minLevelToJoin || members.some((partyMember) => partyMember.id === member.id)) {
      return false;
    }

    set({
      members: [...members, member],
      activeId: get().activeId ?? member.id
    });

    return true;
  },
  removeMember: (memberId) => {
    const members = get().members.filter((member) => member.id !== memberId);
    const activeId = get().activeId === memberId ? members[0]?.id ?? null : get().activeId;

    set({ members, activeId });
  },
  setActive: (memberId) => {
    const member = get().members.find((partyMember) => partyMember.id === memberId);

    if (!member) {
      return;
    }

    set({
      activeId: memberId,
      members: get().members.map((partyMember) => ({
        ...partyMember,
        isActive: partyMember.id === memberId
      }))
    });
  },
  clearParty: () => set({ members: [], activeId: null }),
  canJoin: (memberId, regionId) => {
    const member = get().members.find((partyMember) => partyMember.id === memberId);

    if (!member || member.level < get().minLevelToJoin) {
      return false;
    }

    return Boolean(member.progress[regionId]?.unlocked || member.progress[regionId]?.completed);
  },
  completeRegion: (regionId) => {
    set((state) => ({
      members: state.members.map((member) => {
        if (!member.isAlive) {
          return member;
        }

        const nextRegionId = getNextRegionId(member.progress, regionId);
        const currentProgress = member.progress[regionId];
        const progress: CharacterProgressMap = {
          ...member.progress,
          [regionId]: {
            ...(currentProgress ?? { unlocked: false, completed: false }),
            unlocked: true,
            completed: true,
            bossKilled: true,
            completedWith: 'party'
          }
        };

        if (nextRegionId) {
          const nextProgress = progress[nextRegionId];

          progress[nextRegionId] = {
            ...(nextProgress ?? { unlocked: false, completed: false }),
            unlocked: true,
            completed: nextProgress?.completed ?? false
          };
        }

        return {
          ...member,
          progress
        };
      })
    }));
  },
  unlockRegion: (memberId, regionId) => {
    set((state) => ({
      members: state.members.map((member) => {
        if (member.id !== memberId) {
          return member;
        }

        return {
          ...member,
          progress: {
            ...member.progress,
            [regionId]: {
              ...(member.progress[regionId] ?? { unlocked: false, completed: false }),
              unlocked: true,
              completed: member.progress[regionId]?.completed ?? false
            }
          }
        };
      })
    }));
  },
  takeDamage: (memberId, amount) => {
    set((state) => ({
      members: state.members.map((member) => {
        if (member.id !== memberId) {
          return member;
        }

        const hp = Math.max(0, member.hp - Math.max(0, amount));

        return {
          ...member,
          hp,
          isAlive: hp > 0
        };
      })
    }));
  },
  killMember: (memberId) => {
    set((state) => ({
      members: state.members.map((member) => member.id === memberId
        ? { ...member, hp: 0, isAlive: false }
        : member)
    }));
  },
  reviveAll: () => {
    set((state) => ({
      members: state.members.map((member) => ({
        ...member,
        hp: member.maxHp,
        mp: member.maxMp,
        isAlive: true
      }))
    }));
  },
  getAlive: () => get().members.filter((member) => member.isAlive && member.hp > 0),
  getXpMultiplier: () => {
    const size = Math.min(Math.max(get().members.length, 1), MAX_PARTY_SIZE);
    const multipliers: Record<number, number> = {
      1: 1,
      2: 0.8,
      3: 0.7,
      4: 0.6,
      5: 0.55
    };

    return multipliers[size];
  }
}));
