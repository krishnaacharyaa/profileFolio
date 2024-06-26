import { SkillRef } from '../types/skillRef';

export function getSkillNameById(skills: SkillRef[], objectId: string): string | undefined {
  const skill = skills.find((s) => s.id === objectId);
  return skill ? skill.name : undefined;
}
