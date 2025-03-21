"use client";

import React, { RefObject, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Profession } from "./IdCardCreator";

interface UploadSectionProps {
  image: string | null;
  onImageChange: (file: File) => void;
  cardRef: RefObject<HTMLDivElement>;
  name: string;
  professions: Profession[];
  template?: "default" | "sweatshop";
  preserveImage?: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  image,
  onImageChange,
  cardRef,
  name,
  professions,
  template = "default",
  preserveImage = false,
}) => {
  // 照片调整
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 25 });

  // 文字位置和大小调整
  const [namePos, setNamePos] = useState({ bottom: '19.5%', left: '58%' });
  const [postPos, setPostPos] = useState({ bottom: '11.5%', left: '58%' });
  const [fontSize, setFontSize] = useState(18);
  const [isDraggingName, setIsDraggingName] = useState(false);
  const [isDraggingPost, setIsDraggingPost] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const nameRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [textStroke, setTextStroke] = useState(true); // 默认启用文字描边

  // 对于NAME字段的样式
  const namePosition = {
    bottom: namePos.bottom,
    left: namePos.left,
    transform: 'translateX(-50%)',
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    whiteSpace: 'nowrap' as const,
    marginBottom: '24px',
    cursor: 'move',
    userSelect: 'none' as const,
    touchAction: 'none' as const,
    color: 'black',
    textShadow: textStroke ?
      '1px 1px 0 #FFF, -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 0px 1px 0 #FFF, 1px 0px 0 #FFF, 0px -1px 0 #FFF, -1px 0px 0 #FFF' :
      'none',
  };

  // 对于POST字段的样式
  const postPosition = {
    bottom: postPos.bottom,
    left: postPos.left,
    transform: 'translateX(-50%)',
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    whiteSpace: 'nowrap' as const,
    marginBottom: '17px',
    cursor: 'move',
    userSelect: 'none' as const,
    touchAction: 'none' as const,
    color: 'black',
    textShadow: textStroke ?
      '1px 1px 0 #FFF, -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 0px 1px 0 #FFF, 1px 0px 0 #FFF, 0px -1px 0 #FFF, -1px 0px 0 #FFF' :
      'none',
  };

  // 处理鼠标/触摸事件
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingName || isDraggingPost) {
        e.preventDefault();

        const cardRect = containerRef.current?.getBoundingClientRect();
        if (!cardRect) return;

        const deltaX = e.clientX - startDragPos.x;
        const deltaY = e.clientY - startDragPos.y;

        // 计算新位置（百分比）
        if (isDraggingName) {
          const newLeft = `${parseFloat(namePos.left) + (deltaX / cardRect.width) * 100}%`;
          const newBottom = `${parseFloat(namePos.bottom) - (deltaY / cardRect.height) * 100}%`;
          setNamePos({ left: newLeft, bottom: newBottom });
        } else if (isDraggingPost) {
          const newLeft = `${parseFloat(postPos.left) + (deltaX / cardRect.width) * 100}%`;
          const newBottom = `${parseFloat(postPos.bottom) - (deltaY / cardRect.height) * 100}%`;
          setPostPos({ left: newLeft, bottom: newBottom });
        }

        setStartDragPos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingName(false);
      setIsDraggingPost(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingName || isDraggingPost) {
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        const cardRect = containerRef.current?.getBoundingClientRect();
        if (!cardRect) return;

        const deltaX = touch.clientX - startDragPos.x;
        const deltaY = touch.clientY - startDragPos.y;

        if (isDraggingName) {
          const newLeft = `${parseFloat(namePos.left) + (deltaX / cardRect.width) * 100}%`;
          const newBottom = `${parseFloat(namePos.bottom) - (deltaY / cardRect.height) * 100}%`;
          setNamePos({ left: newLeft, bottom: newBottom });
        } else if (isDraggingPost) {
          const newLeft = `${parseFloat(postPos.left) + (deltaX / cardRect.width) * 100}%`;
          const newBottom = `${parseFloat(postPos.bottom) - (deltaY / cardRect.height) * 100}%`;
          setPostPos({ left: newLeft, bottom: newBottom });
        }

        setStartDragPos({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchEnd = () => {
      setIsDraggingName(false);
      setIsDraggingPost(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDraggingName, isDraggingPost, startDragPos, namePos, postPos]);

  const handleNameMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingName(true);
    setStartDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePostMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingPost(true);
    setStartDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleNameTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDraggingName(true);
    setStartDragPos({ x: touch.clientX, y: touch.clientY });
  };

  const handlePostTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDraggingPost(true);
    setStartDragPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleFontSizeIncrease = () => {
    setFontSize(prev => Math.min(prev + 1, 30));
  };

  const handleFontSizeDecrease = () => {
    setFontSize(prev => Math.max(prev - 1, 12));
  };

  const toggleTextStroke = () => {
    setTextStroke(prev => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const handleRotateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotate(parseInt(e.target.value));
  };

  const handlePositionXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition({ ...position, x: parseInt(e.target.value) });
  };

  const handlePositionYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition({ ...position, y: parseInt(e.target.value) });
  };

  if (template === "sweatshop") {
    return (
      <div className="relative group">
        <div className="relative">
          {/* Main Card container - We'll handle layering here */}
          <div
            ref={cardRef}
            className="relative w-full max-w-[500px] mx-auto aspect-square overflow-hidden"
            style={{
              position: "relative",
            }}
          >
            {/* Photo layer - positioned behind the template */}
            {image && (
              <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center">
                <div
                  className="w-[130px] h-[130px] rounded-full overflow-hidden absolute"
                  style={{
                    top: `calc(36.5% + ${position.y}px)`,
                    left: `calc(50% + ${position.x}px)`,
                    transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}></div>
                </div>
              </div>
            )}

            {/* Template layer with transparency for the photo */}
            <div className="absolute top-0 left-0 w-full h-full z-20">
              <div className="relative w-full h-full">
                <Image
                  src="https://cdn.jsdelivr.net/gh/takahashigy/my-images/sweatshop-template.png"
                  alt="SWEATSHOP Template"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  crossOrigin="anonymous"
                />
              </div>
            </div>

            {/* Text overlay - positioned above the template */}
            <div ref={containerRef} className="absolute z-30 w-full h-full top-0 left-0">
              {/* Name text overlay - 可拖动 */}
              <div
                ref={nameRef}
                className="absolute"
                style={namePosition}
                onMouseDown={handleNameMouseDown}
                onTouchStart={handleNameTouchStart}
              >
                {name}
              </div>

              {/* Post text overlay - 可拖动 */}
              <div
                ref={postRef}
                className="absolute"
                style={postPosition}
                onMouseDown={handlePostMouseDown}
                onTouchStart={handlePostTouchStart}
              >
                {professions[0]?.text || ""}
              </div>
            </div>
          </div>

          {image && (
            <div className="mt-4 p-3 rounded-lg shadow-sm">
              <p className="text-sm font-medium mb-2">调整照片：</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">缩放</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    value={scale}
                    onChange={handleScaleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">旋转</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotate}
                    onChange={handleRotateChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">水平位置</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={position.x}
                    onChange={handlePositionXChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">垂直位置</label>
                  <input
                    type="range"
                    min="-50"
                    max="150"
                    value={position.y}
                    onChange={handlePositionYChange}
                    className="w-full"
                  />
                </div>
              </div>

              <p className="text-sm font-medium mb-2 mt-4">调整文字：</p>
              <div className="bg-yellow-100 p-3 rounded-lg mb-2 text-sm">
                提示：您可以直接拖动文字调整位置
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <label className="text-xs text-gray-600 block">字体大小:</label>
                  <div className="flex items-center">
                    <button
                      className="bg-blue-500 text-white w-8 h-8 rounded-l-md flex items-center justify-center hover:bg-blue-600"
                      onClick={handleFontSizeDecrease}
                    >-</button>
                    <div className="px-3 py-1 border-y border-gray-300 bg-white">{fontSize}px</div>
                    <button
                      className="bg-blue-500 text-white w-8 h-8 rounded-r-md flex items-center justify-center hover:bg-blue-600"
                      onClick={handleFontSizeIncrease}
                    >+</button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">白色描边:</label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={textStroke}
                      onChange={toggleTextStroke}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {!image && (
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-black/20 rounded-xl">
              <p className="text-white font-bold text-xl">上传你的照片</p>
              <label className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl cursor-pointer hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-bold shadow-lg transform hover:-translate-y-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                <span>选择照片</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}

          {image && (
            <div className="absolute top-2 right-2 z-40">
              <label className="flex items-center justify-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full cursor-pointer transition-colors">
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
                  className="w-4 h-4"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="relative">
        <div
          ref={cardRef}
          className="relative w-full max-w-[500px] mx-auto h-[300px] rounded-xl shadow-xl border-4 border-white overflow-hidden"
          style={{
            backgroundColor: "#496d87",
            backgroundImage: image ? `url(${image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
                  <div className="text-white text-xl font-bold">BNB CHAIN</div>
                </div>
              </div>
            </div>
          )}

          {image && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bnb-blue/90 to-transparent p-4">
              <div className="text-white text-xs font-bold mb-1">BNB CHAIN</div>
              {professions.map((profession) => (
                <div key={profession.id} className="text-yellow-300 text-xs font-kaiti">
                  {profession.text}
                </div>
              ))}
              <div className="text-white font-bold mt-1 font-kaiti">{name}</div>
            </div>
          )}
        </div>

        {!image && (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-black/20 rounded-xl">
            <p className="text-white font-bold text-xl">Upload Your Photo</p>
            <p className="text-white/80 text-sm max-w-[70%] text-center">
              Merge your photo with BNB card template
            </p>
            <label className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl cursor-pointer hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 font-bold shadow-lg transform hover:-translate-y-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
              <span>Choose Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}

        {image && (
          <div className="absolute top-2 right-2">
            <label className="flex items-center justify-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full cursor-pointer transition-colors">
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
                className="w-4 h-4"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
