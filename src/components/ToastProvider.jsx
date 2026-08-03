import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4200,
        className: '',
        style: {
          background: 'var(--surface)',
          boxShadow: 'var(--shadow)',
          padding: 0,
        },
      }}
      containerStyle={{
        bottom: 24,
        right: 24,
        zIndex: 9999,
      }}
    />
  );
}
