import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Main } from '@/pages/main';
import { Login } from '@/pages/login';
import { Register, RegisterAboutYou, RegisterYouOffer } from '@/pages/register';
import { Error404 } from '@/pages/404-error';
import { SkillPage } from '@/pages/skill-page';
import { Test } from '@/pages/test';
import { AppHeaderUI } from '@/shared/ui/app-headerUI/app-header';
import { Footer } from '@/shared/ui/footer';

function App() {
  // решил скопировать работу модалок из бургерной :)

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <AppHeaderUI
        onSkillsClick={() => {}}
        onToggleTheme={() => {}}
        onNotificationClick={() => {}}
        onLikeClick={() => {}}
        onClearButtonClick={() => {}}
        user={undefined}
        // user={{ name: 'Мария', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      />
      <Routes location={backgroundLocation || location}>
        {/* пока смог выдеить только эти роуты. если найду еще - добавлю */}
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/registerAboutYou' element={<RegisterAboutYou />} />
        <Route path='/registerYouOffer' element={<RegisterYouOffer />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/skill/:userId' element={<SkillPage />} />
        {/* сюда добавляйте компоненты для тестирования */}
        <Route path='/test' element={<Test />} />
      </Routes>
      {/* роуты модалок. будут добавляться по мере разрастания приложения */}
      {backgroundLocation ?? <Routes location={location}></Routes>}
      <Footer />
    </>
  );
}

export default App;
