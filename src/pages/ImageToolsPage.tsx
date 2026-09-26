import React, { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon,
  Sliders,
  RotateCw,
  Download,
  Upload,
  QrCode,
  Shield,
  FileCheck,
  Maximize2,
  Minimize2,
  Trash2,
  Eye
} from 'lucide-react';
import QRCode from 'qrcode';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';

export const ImageToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compress' | 'convert' | 'resize' | 'rotate' | 'qr'>('compress');
  
  // Image State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [processedSize, setProcessedSize] = useState<number>(0);

  // Settings
  const [quality, setQuality] = useState<number>(0.8);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [resizeWidth, setResizeWidth] = useState<number>(800);
  const [resizeHeight, setResizeHeight] = useState<number>(600);
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // QR Code State
  const [qrText, setQrText] = useState('https://blue-cross.org');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate QR Code
  useEffect(() => {
    if (qrText) {
      QRCode.toDataURL(qrText, {
        width: 360,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch(console.error);
    }
  }, [qrText]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setOriginalSize(file.size);
    setProcessedUrl(null);
    setProcessedSize(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImagePreview(src);

      const img = new Image();
      img.onload = () => {
        setResizeWidth(img.width);
        setResizeHeight(img.height);
        setAspectRatio(img.width / img.height);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!imagePreview) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle Resize / Rotate
      const targetWidth = activeTab === 'resize' ? resizeWidth : img.width;
      const targetHeight = activeTab === 'resize' ? resizeHeight : img.height;

      if (rotationAngle % 180 !== 0) {
        canvas.width = targetHeight;
        canvas.height = targetWidth;
      } else {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotationAngle * Math.PI) / 180);
      ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
      ctx.restore();

      const format = activeTab === 'convert' ? outputFormat : 'image/jpeg';
      const compressionQuality = activeTab === 'compress' ? quality : 0.92;

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setProcessedUrl(url);
          setProcessedSize(blob.size);
        },
        format,
        compressionQuality
      );
    };
    img.src = imagePreview;
  };

  const handleWidthChange = (val: number) => {
    setResizeWidth(val);
    if (maintainAspect && aspectRatio > 0) {
      setResizeHeight(Math.round(val / aspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setResizeHeight(val);
    if (maintainAspect && aspectRatio > 0) {
      setResizeWidth(Math.round(val * aspectRatio));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <SEOHead
        title="Free Browser Image Tools — Compress, Convert & Resize Locally"
        description="Process images locally in your browser. Compress photos, resize dimensions, convert between JPG/PNG/WebP, rotate, and generate QR codes without uploading to a server."
        canonicalPath="/image-tools"
        breadcrumbs={[
          { label: 'Tools', url: '/calculators' },
          { label: 'Image Tools' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Image Tools', url: '/image-tools' }]} />

        {/* Page Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ImageIcon className="w-4 h-4" />
            <span>Zero-Upload Browser Utilities</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Local Image Processing Suite
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Fast, client-side tools powered by your browser's HTML5 Canvas engine. Your photos and personal documents never leave your computer.
          </p>
        </div>

        {/* Privacy Notice Banner */}
        <div className="p-4 mb-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <p className="font-semibold">
            Privacy Notice: Files are processed locally in your browser whenever possible. No images are uploaded to any external server.
          </p>
        </div>

        {/* Tool Mode Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 mb-8 text-xs font-bold">
          {[
            { id: 'compress', label: 'Compress Image' },
            { id: 'resize', label: 'Resize Dimensions' },
            { id: 'convert', label: 'Convert Format (JPG/PNG/WebP)' },
            { id: 'rotate', label: 'Rotate Image' },
            { id: 'qr', label: 'QR Code Generator' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setProcessedUrl(null);
              }}
              className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* QR Code Tool Standalone View */}
        {activeTab === 'qr' ? (
          <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Generate Custom QR Code
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Create offline QR codes for any website URL, UPI ID, or custom text.
            </p>

            <div className="mb-6">
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                placeholder="Enter URL or text (e.g., https://blue-cross.org)..."
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
              />
            </div>

            {qrDataUrl && (
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-md mb-6 inline-block">
                  <img src={qrDataUrl} alt="Generated QR" className="w-56 h-56" />
                </div>

                <a
                  href={qrDataUrl}
                  download="blue-cross-qrcode.png"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-md shadow-blue-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download QR Code (PNG)</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          /* File-based Image Processing View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Input & Control Panel */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
              />

              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-10 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800/20"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                    Select an Image from your Device
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Supports JPG, PNG, WebP, GIF. Processed 100% locally.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                  >
                    Browse Files
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate block max-w-xs">
                        {selectedFile?.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        Original Size: {formatFileSize(originalSize)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setImagePreview(null);
                        setProcessedUrl(null);
                      }}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Clear image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dynamic Controls depending on Active Tab */}
                  {activeTab === 'compress' && (
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span>Compression Quality: {Math.round(quality * 100)}%</span>
                        <span className="text-slate-400 font-normal">Smaller size &harr; Higher quality</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>
                  )}

                  {activeTab === 'resize' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Width (px)
                          </label>
                          <input
                            type="number"
                            value={resizeWidth}
                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Height (px)
                          </label>
                          <input
                            type="number"
                            value={resizeHeight}
                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                          />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={maintainAspect}
                          onChange={(e) => setMaintainAspect(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Maintain Aspect Ratio</span>
                      </label>
                    </div>
                  )}

                  {activeTab === 'convert' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Target Output Format:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { format: 'image/jpeg', label: 'JPG / JPEG' },
                          { format: 'image/png', label: 'PNG' },
                          { format: 'image/webp', label: 'WebP (Modern)' },
                        ].map((fmt) => (
                          <button
                            key={fmt.format}
                            onClick={() => setOutputFormat(fmt.format as any)}
                            className={`p-2.5 rounded-xl text-xs font-bold transition border ${
                              outputFormat === fmt.format
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {fmt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'rotate' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Rotate Orientation:
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setRotationAngle((prev) => (prev + 90) % 360)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 transition"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Rotate 90&deg;</span>
                        </button>
                        <button
                          onClick={() => setRotationAngle((prev) => (prev + 180) % 360)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 transition"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Rotate 180&deg;</span>
                        </button>
                        <button
                          onClick={() => setRotationAngle(0)}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 hover:text-slate-700"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={processImage}
                    className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-md shadow-blue-500/20"
                  >
                    Process Image Now (Local Browser)
                  </button>
                </div>
              )}
            </div>

            {/* Preview & Download Panel */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
                Preview &amp; Results
              </h3>

              {processedUrl ? (
                <div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl mb-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500">New Size: </span>
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        {formatFileSize(processedSize)}
                      </strong>
                    </div>
                    {originalSize > 0 && processedSize > 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                        {Math.round(((originalSize - processedSize) / originalSize) * 100)}% Saved
                      </span>
                    )}
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-6 bg-slate-950 flex items-center justify-center p-2 max-h-80">
                    <img src={processedUrl} alt="Processed" className="max-h-72 object-contain rounded-xl" />
                  </div>

                  <a
                    href={processedUrl}
                    download={`bluecross-${activeTab}-image.${outputFormat.split('/')[1] || 'jpg'}`}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Processed Image</span>
                  </a>
                </div>
              ) : imagePreview ? (
                <div>
                  <p className="text-xs text-slate-500 mb-3">
                    Original Preview. Click "Process Image Now" to apply changes.
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-4 bg-slate-950 flex items-center justify-center p-2 max-h-80">
                    <img
                      src={imagePreview}
                      alt="Original"
                      className="max-h-72 object-contain rounded-xl"
                      style={{ transform: `rotate(${rotationAngle}deg)` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="py-24 text-center text-slate-400 text-xs">
                  Upload an image on the left to preview results here.
                </div>
              )}
            </div>

          </div>
        )}

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
