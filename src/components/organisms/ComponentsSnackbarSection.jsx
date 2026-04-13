import { useDispatch } from 'react-redux';
import ComponentShowcaseItem from '../molecules/ComponentShowcaseItem';
import TailButton from '../atoms/TailButton';
import { showSnackbar } from '../../store/action/snackbar';

const snackbarCode = `import { useDispatch } from 'react-redux';
import TailButton from '../components/atoms/TailButton';
import { showSnackbar } from '../store/action/snackbar';

function Example() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap gap-3">
      <TailButton
        variant="primary"
        onClick={() =>
          dispatch(showSnackbar({
            title: 'Success',
            message: 'Data company berhasil diperbarui.',
            type: 'success',
            durationMs: 4200,
          }))
        }
      >
        Success
      </TailButton>
    </div>
  );
}`;

function ComponentsSnackbarSection() {
  const dispatch = useDispatch();

  const triggerSnackbar = (type) => {
    const configByType = {
      success: {
        title: 'Success',
        message: 'Aksi berhasil diproses dan disimpan.',
      },
      error: {
        title: 'Error',
        message: 'Terjadi kendala saat memproses data. Coba lagi.',
      },
      warning: {
        title: 'Warning',
        message: 'Ada data company yang butuh perhatian lanjutan.',
      },
    };

    const selected = configByType[type] || configByType.success;
    dispatch(showSnackbar({
      ...selected,
      type,
      durationMs: 4200,
    }));
  };

  return (
    <ComponentShowcaseItem
      title="Snackbar Components"
      summary="Snackbar sudah mendukung animasi slide in/out, auto dismiss, dan varian warna `success`, `error`, `warning`."
      preview={(
        <div className="flex flex-wrap items-center gap-3">
          <TailButton variant="primary" onClick={() => triggerSnackbar('success')}>
            Trigger Success
          </TailButton>
          <TailButton variant="secondary" onClick={() => triggerSnackbar('warning')}>
            Trigger Warning
          </TailButton>
          <button
            type="button"
            onClick={() => triggerSnackbar('error')}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-error-200 bg-error-50 px-4 text-sm font-semibold text-error-600 transition hover:bg-error-100"
          >
            Trigger Error
          </button>
        </div>
      )}
      code={snackbarCode}
    />
  );
}

export default ComponentsSnackbarSection;
