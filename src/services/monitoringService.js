import mockMonitoringData from '../mocks/monitoringMock';

const monitoringService = {
  async getSnapshot() {
    return new Promise((resolve) => {
      window.setTimeout(() => resolve(mockMonitoringData), 180);
    });
  },
};

export default monitoringService;
