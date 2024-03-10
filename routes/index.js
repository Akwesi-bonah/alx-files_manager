import AppController from '../controllers/AppController';

const allRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
};

export default allRoutes;
