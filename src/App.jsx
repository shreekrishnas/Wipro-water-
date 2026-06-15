import { Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell.jsx';
import Overview from './pages/Overview.jsx';
import WebinarList from './pages/WebinarList.jsx';
import WebinarDetail from './pages/WebinarDetail.jsx';
import Speakers from './pages/Speakers.jsx';
import Audience from './pages/Audience.jsx';
import Insights from './pages/Insights.jsx';

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/webinars" element={<WebinarList />} />
        <Route path="/webinars/:id" element={<WebinarDetail />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Shell>
  );
}
