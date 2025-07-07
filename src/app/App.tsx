import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Main } from '@/pages/main';
import { Login } from '@/pages/login';
import { Register } from '@/pages/register';
import { Error404 } from '@/pages/404-error';
import { SkillPage } from '@/pages/skill-page';
import { Test } from '@/pages/test';

function App() {
  // решил скопировать работу модалок из бургерной :)

  const location = useLocation();
  // const navigate = useNavigate();

  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  // const handleCloseModal = () => navigate(-1);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        {/* пока смог выдеить только эти роуты. если найду еще - добавлю */}
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error404 />} />
        <Route path='/skill/:userId' element={<SkillPage />} />
        {/* сюда добавляйте компоненты для тестирования */}
        <Route path='/test' element={<Test />} />
      </Routes>

      {/* роуты модалок. будут добавляться по мере разрастания приложения */}
      {backgroundLocation ?? <Routes location={location}></Routes>}
    </>
  );
}

export default App;
