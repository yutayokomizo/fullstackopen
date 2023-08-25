import { useNotificaitonValue } from '../NotificationContext';

const Notification = () => {
  const notification = useNotificaitonValue();

  return (
    <div>
      {notification && notification.type === 'success' && (
        <div
          style={{
            border: '1px solid green',
            borderRadius: '10px',
            padding: '0 10px',
          }}
        >
          <p style={{ color: 'green' }}>{notification.message}</p>
        </div>
      )}
      {notification && notification.type === 'error' && (
        <div
          style={{
            border: '1px solid red',
            borderRadius: '10px',
            padding: '0 10px',
          }}
        >
          <p style={{ color: 'red' }}>{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
