import { RequireAuth } from 'react-auth-kit';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdList from './AdList';
import AdPage from './AdPage';
import CreateAd from './CreateAd';
import EditAd from './EditAd';
import { Layout } from './Layout';
import Messages from './Messages';
import NoMatch from './NoMatch';
import Profile from './Profile';
import ShowListings from './ShowListings/ShowListings';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<AdList />} />
          <Route
            path="messages"
            element={
              <RequireAuth loginPath="/home">
                <Messages />
              </RequireAuth>
            }
          />
          <Route path="profile/:userName" element={<Profile />} />
          <Route
            path="create"
            element={
              <RequireAuth loginPath="/home">
                <CreateAd />
              </RequireAuth>
            }
          />
          <Route path="ad/:adId" element={<AdPage />} />
          <Route
            path="listings"
            element={
              <RequireAuth loginPath="/home">
                <ShowListings />
              </RequireAuth>
            }
          />
          <Route
            path="ad/:adId/edit"
            element={
              <RequireAuth loginPath="/home">
                <EditAd />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
