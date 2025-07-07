import type { FC } from 'react';
import type { SkillItemProps } from './types';

import './skill-item.scss';

export const SkillItemUI: FC<SkillItemProps> = ({className, children, type}) => {
    return (
        <li className={`${className} ${type}`}>
            {children}
        </li>
    );
};
