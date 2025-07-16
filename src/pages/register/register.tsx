import type { FC } from 'react';
import { useState } from 'react';
import { RegisterMainPage } from './registerMainPage/registerMainPage';
import { RegisterAboutYou } from './registerAboutYou/registerAboutYou';
import { RegisterYouOffer } from './registerYouOffer/registerYouOffer';

export const Register: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);  

  return (
    <>
      {currentPage === 1 ? (
        <RegisterMainPage setCurrentPage={setCurrentPage} />
      ) : currentPage === 2 ? (
        <RegisterAboutYou setCurrentPage={setCurrentPage} />
      ) : (
        <RegisterYouOffer setCurrentPage={setCurrentPage} />
      )}
    </>
  );
};
