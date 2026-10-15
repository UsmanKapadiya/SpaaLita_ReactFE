import type { FC } from 'react';

const NotFound: FC = () => (
  <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
    <h1 style={{ color: '#667eea' }}>404 - Page Not Found</h1>
    <p style={{ fontSize: '1.2rem', color: '#666' }}>The page you're looking for doesn't exist.</p>
  </div>
);

export default NotFound;
