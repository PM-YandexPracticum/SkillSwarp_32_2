import type { TSkill, parentSkillFilterType, SubFilterTypeMap } from '@/shared/global-types';
import { MAIN_FILTERS_MOCK } from '@/shared/global-types/data-filters-examples';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';

export const makeSkillsArray = (data: DropdownOption<string>[]): TSkill[] => {
  return data
    .map((skill) => {
      for (const parent of MAIN_FILTERS_MOCK) {
        const sub = parent.subFilters.find(sub => sub.id === skill.id);
        if (sub) {
          return {
            title: sub.title,
            type: parent.type as parentSkillFilterType,
            subType: sub.type as SubFilterTypeMap[parentSkillFilterType],
          };
        }
      }
      return null;
    })
    .filter((skill): skill is TSkill => skill !== null);
};
