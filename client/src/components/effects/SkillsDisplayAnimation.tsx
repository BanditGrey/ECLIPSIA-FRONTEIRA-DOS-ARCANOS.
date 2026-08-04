import React, { useState, useEffect } from 'react';
export interface SkillInfo { id: string; name: string; icon: string; cd?: number; mp?: number; }
export interface Props { skills: SkillInfo[]; }
export const SkillsDisplayAnimation: React.FC<Props> = ({ skills }) => (
  <div className="grid gap-2">
    {skills.map((skill) => (
      <div key={skill.id} className="rounded-lg border border-game-border bg-game-card p-3 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-shadow">
        <div className="flex items-center justify-between gap-3">
          <strong className="text-game-gold">{skill.icon} {skill.name}</strong>
          <span className="font-mono text-xs text-game-muted">CD: {skill.cd ?? 0} MP: {skill.mp ?? 0}</span>
        </div>
      </div>
    ))}
  </div>
);
