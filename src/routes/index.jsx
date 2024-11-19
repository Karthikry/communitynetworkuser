import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import EcomRoutes from './EcomRoutes';
import AcademyRoutes from './AcademyRoutes';
import UpskillsRoutes from './UpSkillsRoutes';
import MarketplaceRoutes from './MarketplaceRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, AcademyRoutes, UpskillsRoutes, EcomRoutes,MarketplaceRoutes], {
  // basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
