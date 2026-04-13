const initialState = {
  loading: true,
  error: null,
  hero: null,
  stats: [],
  revenueOverview: null,
  trafficChannels: [],
  campaignPerformance: [],
  goalProgress: [],
  topPages: [],
  activityFeed: [],
  watchlist: [],
  timeline: [],
  companies: [],
  tenants: [],
  notificationHealth: [],
  architecture: [],
};

const monitoringReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MONITORING_LOAD_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'MONITORING_LOAD_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload,
      };
    case 'MONITORING_LOAD_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default monitoringReducer;
