import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Main } from '@/pages/main';
import { Login } from '@/pages/login';
import { Register, RegisterAboutYou, RegisterYouOffer } from '@/pages/register';
import { Error404 } from '@/pages/404-error';
import { SkillPage } from '@/pages/skill-page';
import { Test } from '@/pages/test';
import { Footer } from '@/shared/ui/footer';
import { ProfilePage } from '@/pages/profile-page';
import { ProfileIncoming } from '@/pages/profile-incoming-page';
import { ProfileOutgoing } from '@/pages/profile-outgoing-page';
import { ProfileFavorites } from '@/pages/profile-favorites-page';
import { AppHeader } from '@/widgets/app-header';
import { checkAuthThunk, getCards, getCategories, getCities } from '@/services/slices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { Popular } from '@/pages/popular';
import { Newest } from '@/pages/newest';
import { Recommended } from '@/pages/recommended';
import { sortByPopular, sortByNewest } from '@/shared/lib/helpers/helpers';
import type { RootState } from '@/services/store';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Загружаем основные данные приложения
    dispatch(getCategories());
    dispatch(getCities());
    dispatch(getCards());
    
    // Проверяем авторизацию только в продакшене
    // В разработке пользователь уже авторизован через initialState
    if (process.env.NODE_ENV === 'production') {
      dispatch(checkAuthThunk());
    }
  }, [dispatch]);

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;
  const cardsState = useSelector((state: RootState) => state.cards.cards);
  const cardsPopular = sortByPopular(cardsState, 20);
  const cardsNew = sortByNewest(cardsState, 20);

  return (
    <>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* пока смог выдеить только эти роуты. если найду еще - добавлю */}
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/about' element={<RegisterAboutYou setCurrentPage={() => {}} />} />
        <Route path='/register/offer' element={<RegisterYouOffer setCurrentPage={() => {}} />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/skill/:userId' element={<SkillPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile/incoming' element={<ProfileIncoming />} />
        <Route path='/profile/outgoing' element={<ProfileOutgoing />} />
        <Route path='/popular' element={<Popular cards={cardsPopular} />} />
        <Route path='/newest' element={<Newest cards={cardsNew} />} />
        <Route path='/recommended' element={<Recommended cards={cardsState} />} />
        <Route path='/profile/favorites' element={<ProfileFavorites />} />
        {/* сюда добавляйте компоненты для тестирования */}
        <Route path='/test' element={<Test />} />
      </Routes>
      {/* роуты модалок. будут добавляться по мере разрастания приложения */}
      {backgroundLocation ?? <Routes location={location}></Routes>}
      <Footer />
      {/* По макету Footer не на всех страницах - так что его нужно вставлять вручную, там где он есть */}
    </>
  );
}

export default App;
