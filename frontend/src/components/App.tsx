import { RequireAuth } from 'react-auth-kit';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdList from './AdList';
import AdPage from './AdPage';
import CreateListing from './CreateListing';
import { Layout } from './Layout';
import Messages from './Messages';
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
                <CreateListing />
              </RequireAuth>
            }
          />
          <Route path="ad/:adId" element={<AdPage />} />
          <Route path="*" element={<NoMatch />} />
          <Route
            path="listings"
            element={
              <RequireAuth loginPath="/home">
                <ShowListings />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

const NoMatch = () => {
  return <p>404: There&apos;s nothing here!</p>;
};

export default App;
