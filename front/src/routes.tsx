import { Route, Routes } from 'react-router-dom';

import AppLayout from './components/pages/AppLayout';
import App from './components/pages/App';
import Home from './components/pages/Home';

export default (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/messages/:channelId" element={<App />} />
    </Route>
  </Routes>
);
