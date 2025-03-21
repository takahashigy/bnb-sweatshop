"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import UploadSection from "./UploadSection";
import { toPng } from 'html-to-image';

export interface Profession {
  id: string;
  text: string;
}

const IdCardCreator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [professions, setProfessions] = useState<Profession[]>([
    { id: "1", text: "" },
  ]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<"default" | "sweatshop">("sweatshop");
  const [cardImage, setCardImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProfessionChange = (text: string) => {
    setProfessions([{ id: "1", text }]);
  };

  // 生成卡片图片
  const generateCardImage = async (): Promise<string | null> => {
    if (cardRef.current) {
      try {
        return await toPng(cardRef.current, { cacheBust: true });
      } catch (error) {
        console.error("生成卡片图片时出错:", error);
        return null;
      }
    }
    return null;
  };

  const handleExport = async () => {
    if (cardRef.current) {
      setIsLoading(true);
      try {
        const dataUrl = await generateCardImage();
        if (dataUrl) {
          setCardImage(dataUrl); // 保存生成的卡片图片
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "bnb-sweatshop-card.png";
          link.click();
        }
      } catch (error) {
        console.error("导出卡片时出错:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleShareToTwitter = async () => {
    setIsLoading(true);
    try {
      // 如果没有生成过卡片图片，先生成
      let imageUrl = cardImage;
      if (!imageUrl) {
        imageUrl = await generateCardImage();
        if (imageUrl) {
          setCardImage(imageUrl);
        }
      }

      // 构建分享文本
      const shareText = "Welcome to BNB Sweatshop!\nCA:0xae64edf818fa29522dc7ff8506efb44c5eb625f6";
      const hashtags = "BNBCHAIN,SWEATSHOP";

      // 注意：由于Twitter API和Web客户端限制，我们无法直接上传图片
      // 这里只能分享文本，用户需要手动上传导出的图片
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&hashtags=${hashtags}`;
      window.open(twitterUrl, "_blank");

      // 提示用户如何添加图片
      alert("Twitter网页版无法自动附加图片。请先下载卡片图片，然后在打开的Twitter页面中手动添加图片。");

    } catch (error) {
      console.error("分享到Twitter时出错:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-yellow-800 mb-4">
        Create Your BNB Sweatshop Card
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Upload your photo, adjust size and position to join BNB sweatshop
      </p>

      <div className="image-editor grid md:grid-cols-2 gap-6 items-start">
        <div>
          <div className="grid grid-cols-1 gap-6">
            <UploadSection
              image={image}
              onImageChange={handleImageChange}
              cardRef={cardRef}
              name={name}
              professions={professions}
              template={template}
            />
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold flex items-center mb-4">
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
                className="mr-2 text-yellow-600"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 17h.01" />
                <path d="M17 17h.01" />
              </svg>
              Sweatshop Card Editor
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload photo to start
                </label>
                <Button
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-black flex items-center justify-center gap-2 py-6 rounded-lg"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        handleImageChange(file);
                      }
                    };
                    input.click();
                  }}
                >
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
                    className="mr-2"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Select Photo
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add position and name
                </label>
                <div className="space-y-2">
                  {/* 仅在UI中交换位置，名称和职位的顺序不变 */}
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
                      className="text-red-400"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <Input
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-red-100 focus:border-red-200 bg-red-50/50"
                    />
                  </div>
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
                      className="text-blue-400"
                    >
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                    <Input
                      placeholder="Enter position"
                      value={professions[0]?.text || ""}
                      onChange={(e) => handleProfessionChange(e.target.value)}
                      className="border-blue-100 focus:border-blue-200 bg-blue-50/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="block text-sm font-medium text-gray-700 mb-2">
                  Save your creation when finished
                </h3>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-5 rounded-lg relative"
                    onClick={handleExport}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-black border-opacity-20 border-t-black rounded-full mx-auto"></div>
                    ) : (
                      <>
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
                          className="mr-2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                        Export To Join Sweatshop
                      </>
                    )}
                  </Button>
                  <Button
                    className="w-full bg-black hover:bg-gray-800 text-white py-5 rounded-lg relative"
                    onClick={handleShareToTwitter}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-opacity-20 border-t-white rounded-full mx-auto"></div>
                    ) : (
                      <>
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
                          className="mr-2"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                        Share to X
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="collapse">
                <input type="checkbox" />
                <div className="collapse-title text-sm font-medium text-gray-700 flex items-center gap-2">
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
                    className="text-yellow-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  Usage Tips
                </div>
                <div className="collapse-content">
                  <p className="text-sm text-gray-600">
                    1. Upload your photo first<br />
                    2. Enter your name and position<br />
                    3. Adjust image size and position using the sliders<br />
                    4. Export the image to download your card<br />
                    5. Share to X to post your card
                  </p>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-600 flex items-center gap-2">
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
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Your image is processed locally - not uploaded to our servers
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdCardCreator;
