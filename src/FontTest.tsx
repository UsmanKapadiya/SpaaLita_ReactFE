import React from 'react';

const FontTest: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      <h2>Font Test Page</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Default Font (should be Avenir-LT):</h3>
        <p style={{ fontSize: '24px', fontWeight: 300 }}>
          Light: The quick brown fox jumps over the lazy dog
        </p>
        <p style={{ fontSize: '24px', fontWeight: 400 }}>
          Normal: The quick brown fox jumps over the lazy dog
        </p>
        <p style={{ fontSize: '24px', fontWeight: 500 }}>
          Medium: The quick brown fox jumps over the lazy dog
        </p>
        <p style={{ fontSize: '24px', fontWeight: 300, fontStyle: 'oblique' }}>
          Light Oblique: The quick brown fox jumps over the lazy dog
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Fallback Font (Arial for comparison):</h3>
        <p style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', fontWeight: 300 }}>
          Arial Light: The quick brown fox jumps over the lazy dog
        </p>
        <p style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif', fontWeight: 500 }}>
          Arial Medium: The quick brown fox jumps over the lazy dog
        </p>
      </div>

      <div>
        <h3>System Font (for comparison):</h3>
        <p style={{ fontSize: '24px', fontFamily: 'system-ui, sans-serif' }}>
          System: The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  );
};

export default FontTest;