import { useEffect, useRef, type FC } from 'react';
import styles from './allSkills.module.css';
import { ButtonUI } from '../buttonUI';
import { BriefcaseSVG, BookSVG, HomeSVG, PaletteSVG, GlobalSVG, HealthSVG } from '@/assets/svg';
import type { SVGType } from '@/assets/svg/svg.type';
import type { AllSkillsProps } from './type';

export const AllSkills: FC<AllSkillsProps> = ({ onClose, mainFilters, headerRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        headerRef?.current &&
        !headerRef.current.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, headerRef]);

  const iconsMap: Record<string, FC<SVGType>> = {
    business: BriefcaseSVG,
    art: PaletteSVG,
    languages: GlobalSVG,
    education: BookSVG,
    home: HomeSVG,
    lifestyle: HealthSVG,
  };

  return (
    <div ref={modalRef} className={styles.allSkillsModal}>
      {mainFilters.map(({ type, title, subFilters }) => {
        const Icon = iconsMap[type];

        return (
          <div className={`${styles.allSkillsModal__skill} ${styles[type]}`} key={type}>
            <h2 className={styles.allSkillsModal__title}>
              <span className={styles.allSkillsModal__iconWrapper}>{Icon && <Icon />}</span>
              {title}
            </h2>
            <ul className={styles.allSkillsModal__group}>
              {subFilters.map(({ title: skillTitle, id }) => (
                <li key={id} className={styles.allSkillsModal__item}>
                  <ButtonUI type='button' onClick={onClose} className={styles.allSkillsModal__btn}>
                    {skillTitle}
                  </ButtonUI>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
