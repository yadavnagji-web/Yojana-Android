"use client";

import React, { useEffect } from 'react';

interface AdSenseAdProps {
  slot: string; // The specific ad slot ID
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({ slot }) => {
  useEffect(() => {
    // Push ad to AdSense array only in production environment
    // In Vite, use import.meta.env.MODE
    if (import.meta.env.MODE === 'production') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    } else {
      console.log("AdSense ad placeholder (development mode)");
    }
  }, []);

  const client = "ca-app-pub-6423718618240244"; // Publisher ID from user's input

  return (
    <div className="my-8 flex justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
      {import.meta.env.MODE === 'production' ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <div className="text-center text-gray-500 italic">
          AdSense Ad Placeholder (Slot: {slot})
        </div>
      )}
    </div>
  );
};

export default AdSenseAd;