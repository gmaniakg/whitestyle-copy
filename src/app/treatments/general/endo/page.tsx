'use client';

import React from 'react';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-white">
      <iframe 
        src="/legacy/12130.html" 
        className="w-full min-h-screen border-none"
        style={{ minHeight: '3000px' }}
        onLoad={(e) => {
          // Adjust iframe height dynamically if possible
          try {
            const iframe = e.target as HTMLIFrameElement;
            if (iframe.contentWindow) {
              iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            }
          } catch(err) {}
        }}
      />
    </div>
  );
}
