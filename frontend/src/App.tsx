/* eslint-disable react/no-unescaped-entities */
import { MessagePage } from 'features/Message/MessagePage/MessagePage';
import { HomePage } from 'pages/HomePage';
import { RequireAuth } from 'react-auth-kit';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdList } from './features/Ad/AdList';
import { AdPage } from './features/Ad/AdPage';
import { Profile } from './features/User/Profile/Profile';
import { ShowListings } from './features/User/ShowListings';
import { Layout } from './layouts/Layout';
import CreateAd from './pages/CreateAd';
import EditAd from './pages/EditAd';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Mohave:ital,wght@0,400;0,500;1,400&display=swap"
        rel="stylesheet"
      ></link>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="browse" element={<AdList />} />
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
          <Route path="*" element={<NotFound />} />
          <Route
            path="messages/:userName"
            element={
              <RequireAuth loginPath="/home">
                <MessagePage />
              </RequireAuth>
            }
          />
          <Route path="404" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
