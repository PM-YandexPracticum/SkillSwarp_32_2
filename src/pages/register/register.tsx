import type { FC } from 'react';
import { useState } from 'react';
import { RegisterMainPage } from './registerMainPage/registerMainPage';
import { RegisterAboutYouPage } from './registerAboutYouPage/registerAboutYouPage';
import { RegisterYouOfferPage } from './registerYouOfferPage/registerYouOfferPage';

export const Register: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {currentPage === 1 ? (
        <RegisterMainPage setCurrentPage={setCurrentPage} />
      ) : currentPage === 2 ? (
        <RegisterAboutYouPage setCurrentPage={setCurrentPage} />
      ) : (
        <RegisterYouOfferPage setCurrentPage={setCurrentPage} />
      )}
    </>
  );
};
