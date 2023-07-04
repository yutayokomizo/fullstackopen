const Notification = ({ successMessage, errorMessage }) => {
  return (
    <div>
      {successMessage && (
        <div
          style={{
            border: '1px solid green',
            borderRadius: '10px',
            padding: '0 10px',
          }}
        >
          <p style={{ color: 'green' }}>{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div
          style={{
            border: '1px solid red',
            borderRadius: '10px',
            padding: '0 10px',
          }}
        >
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
