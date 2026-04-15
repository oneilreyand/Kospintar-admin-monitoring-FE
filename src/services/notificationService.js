import httpClient from './httpClient';

/**
 * Service to handle Notification Logs, Stats, and Retries
 */
const notificationService = {
  /**
   * Fetch notification logs (all channels by default, or filtered)
   * @param {Object} filters - channel, status, eventKey, limit
   * @param {string} token - Authentication token
   */
  async getLogs(filters = {}, token) {
    return httpClient.get('/notifications/logs', {
      query: {
        limit: 50,
        ...filters,
      },
      token,
    });
  },

  /**
   * Fetch notification statistics grouped by channel and status
   * @param {string} token - Authentication token
   */
  async getStats(token) {
    return httpClient.get('/notifications/stats', { token });
  },

  /**
   * Retry a failed or skipped notification
   * @param {string} logId - ID of the log to retry
   * @param {string} token - Authentication token
   */
  async retryLog(logId, token) {
    return httpClient.post(`/notifications/logs/${logId}/retry`, { token });
  },
};

export default notificationService;
