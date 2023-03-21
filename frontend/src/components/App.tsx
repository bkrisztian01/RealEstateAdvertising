import { RequireAuth } from 'react-auth-kit';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdPage from './Ad';
import AdList from './AdList';
import CreateListing from './CreateListing';
import { Layout } from './Layout';
import Messages from './Messages';
import Profile from './Profile';

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
          <Route path="create" element={<CreateListing />} />
          <Route path="ad/:adId" element={<AdPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

const NoMatch = () => {
  return <p>404: There&apos;s nothing here!</p>;
};

export default App;
