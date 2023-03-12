import { Navigate, Route, Routes } from 'react-router-dom';
import AdPage from './Ad';
import AdList from './AdList';
import CreateListing from './CreateListing';
import { Layout } from './Layout';
import Messages from './Messages';
import Profile from './Profile';
import Register from './Register';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<AdList />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="create" element={<CreateListing />} />
          <Route path="ad/:adId" element={<AdPage />} />
          <Route path="register" element={<Register />} />
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
