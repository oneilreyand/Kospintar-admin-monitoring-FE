import monitoringService from '../../services/monitoringService';
import { showSnackbar } from './snackbar';

export const loadMonitoringSnapshot = () => async (dispatch) => {
  dispatch({ type: 'MONITORING_LOAD_START' });

  try {
    const payload = await monitoringService.getSnapshot();
    dispatch({
      type: 'MONITORING_LOAD_SUCCESS',
      payload,
    });
  } catch (error) {
    dispatch({
      type: 'MONITORING_LOAD_FAILURE',
      payload: error.message,
    });
    dispatch(showSnackbar({
      title: 'Gagal memuat monitoring',
      message: error.message,
      type: 'error',
    }));
  }
};
