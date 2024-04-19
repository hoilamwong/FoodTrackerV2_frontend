import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import UsersList from './features/users/UsersList'
import FoodsList from './features/foods/FoodsList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm'
import EditFood from './features/foods/EditFood';
import NewFood from './features/foods/NewFood'
import Prefetch from './features/auth/Prefetch';
import ViewFood from './features/foods/ViewFood';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/auth/globalSlice';

function App() {
  const global = useSelector(selectTheme)
  const currentTheme = global?.theme
  return (
    // <html data-theme={currentTheme}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Public />} />
          <Route path='/login' element={<Login />} />

          <Route element={<Prefetch />}>
            <Route path='/dash' element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route path='foodLists'>
                <Route index element={<FoodsList />} />
                <Route path=':id' element={<ViewFood />} />
                <Route path=':id/edit' element={<EditFood />} />
                <Route path='new' element={<NewFood />} />
              </Route>

              <Route path='users'>
                <Route index element={<UsersList />} />
                <Route path=':id' element={<EditUser />} />
                <Route path='new' element={<NewUserForm />} />
              </Route>

            </Route>
          </Route>

        </Route>
      </Routes>
    // </html>

  );
}

export default App;
