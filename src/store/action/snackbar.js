export const showSnackbar = ({
  title,
  message,
  type = 'info',
  durationMs = 4200,
}) => ({
  type: 'SNACKBAR_SHOW',
  payload: {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    message,
    type,
    durationMs,
  },
});

export const dismissSnackbar = (id) => ({
  type: 'SNACKBAR_DISMISS',
  payload: id,
});
