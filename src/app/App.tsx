import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Main } from '@/pages/main';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { Error404 } from '@/pages/404-error';
import { SkillPage } from '@/pages/skill-page';
import { Test } from '@/pages/test';
import { Footer } from '@/shared/ui/footer';
import { ProfilePage } from '@/pages/profile-page';
import { ProfileIncoming } from '@/pages/profile-incoming-page';
import { ProfileOutgoing } from '@/pages/profile-outgoing-page';
import { AppHeader } from '@/widgets/app-header';
import { getCards, getCategories, getCities } from '@/services/slices';
import { useEffect } from 'react';
import { useDispatch } from '@/services/store';

function App() {
  // решил скопировать работу модалок из бургерной :)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getCities());
    dispatch(getCards());
  }, [dispatch]);

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        {/* пока смог выдеить только эти роуты. если найду еще - добавлю */}
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/skill/:userId' element={<SkillPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/profile/incoming' element={<ProfileIncoming />} />
        <Route path='/profile/outgoing' element={<ProfileOutgoing />} />
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
