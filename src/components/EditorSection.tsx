"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Profession } from "./IdCardCreator";

interface EditorSectionProps {
  image: string | null;
  name: string;
  setName: (name: string) => void;
  professions: Profession[];
  updateProfession: (id: string, text: string) => void;
  addProfession: () => void;
  handleExport: () => void;
  onImageChange: (file: File) => void;
  handleShareToTwitter: () => void;
}

const EditorSection: React.FC<EditorSectionProps> = ({
  image,
  name,
  setName,
  professions,
  updateProfession,
  addProfession,
  handleExport,
  onImageChange,
  handleShareToTwitter,
}) => {
  const [usageTipsOpen, setUsageTipsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-yellow-100">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-600"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <h3 className="font-medium text-yellow-700">Sweatshop Card Editor</h3>
          </div>

          <div>
            <p className="text-xs text-black/60 mb-2 font-medium">
              Upload photo to start
            </p>
            <label className="flex items-center justify-center gap-2 w-full bg-white text-black px-4 py-3 rounded-xl cursor-pointer hover:bg-yellow-50 transition-colors border border-yellow-200 shadow-sm group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m8 17 4-4 4 4" />
              </svg>
              <span className="group-hover:text-yellow-600 transition-colors">
                Select Photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div>
            <p className="text-xs text-black/60 mb-2 font-medium">
              Add position and name
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                {professions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-500 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter position"
                      className="flex-1 border border-blue-200 rounded-lg text-sm font-kaiti focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
                      value={professions[0]?.text || ""}
                      onChange={(e) => updateProfession(professions[0]?.id || "1", e.target.value)}
                      style={{fontFamily: "'Kaiti SC', serif"}}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-red-100 text-red-500 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  className="flex-1 border border-red-200 rounded-lg text-sm font-kaiti focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{fontFamily: "'Kaiti SC', serif"}}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-black/60 mb-2 font-medium">
              Save your creation when finished
            </p>
            <Button
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-3 rounded-xl shadow-md transition-all duration-300 mb-2"
              disabled={!image}
              onClick={handleExport}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>Export To Join Sweatshop</span>
            </Button>

            <Button
              className="flex items-center justify-center gap-2 w-full bg-black text-white px-4 py-3 rounded-xl shadow-md transition-all duration-300"
              disabled={!image}
              onClick={handleShareToTwitter}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span>Share to X</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border border-yellow-100">
        <button
          className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium hover:bg-yellow-50 transition-colors"
          onClick={() => setUsageTipsOpen(!usageTipsOpen)}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-yellow-500"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>Usage Tips</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${
              usageTipsOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {usageTipsOpen && (
          <div className="px-5 py-3 border-t border-yellow-100 text-sm">
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Upload a clear photo of yourself</li>
              <li>Add your position and name</li>
              <li>Click "Export To Join Sweatshop" to save as an image</li>
              <li>Share your SWEATSHOP card to X directly</li>
              <li>Welcome to the SWEATSHOP community!</li>
            </ul>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-xl p-3 text-xs text-black/60 shadow-sm border border-blue-100">
        <p className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <span>Your image is processed locally - not uploaded to our servers</span>
        </p>
      </div>
    </div>
  );
};

export default EditorSection;
