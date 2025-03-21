"use client";

import React, { useState } from "react";

const DonationBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0xc4D7e888A2e1745eD4af49f864eAA99f9A36D218";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 bg-white/80 p-3 rounded-lg shadow-sm max-w-[500px] w-full">
      <div
        className="flex items-center relative cursor-pointer group"
        onClick={handleCopy}
      >
        <div className="flex-1 text-center py-2 px-4">
          <p className="text-sm text-gray-700">
            If you enjoyed this, consider buying me a coffee ☕️
          </p>
          <p className="text-xs text-gray-500 mt-1 font-mono">
            {walletAddress}
          </p>
        </div>
        <div className={`absolute right-2 text-blue-500 text-xs transition-opacity ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          {copied ? 'Copied!' : 'Click to copy'}
        </div>
      </div>
    </div>
  );
};

export default DonationBanner;
