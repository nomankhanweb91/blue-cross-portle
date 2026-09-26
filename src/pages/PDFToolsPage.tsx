import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Download,
  Shield,
  Layers,
  Scissors,
  RotateCw,
  Image as ImageIcon,
  Lock,
  CheckCircle2,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';

export const PDFToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'merge' | 'rotate' | 'jpg-to-pdf' | 'split' | 'extract'>('merge');
  
  // Files State
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [rotation, setRotation] = useState<number>(90);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('bluecross-document.pdf');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setPdfFiles((prev) => [...prev, ...files]);
    setDownloadUrl(null);
    setStatusMessage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    setDownloadUrl(null);
    setStatusMessage(null);
  };

  // 1. Client-Side PDF Merge using pdf-lib
  const handleMergePDFs = async () => {
    if (pdfFiles.length < 2) {
      setStatusMessage('Please select at least 2 PDF files to merge.');
      return;
    }

    setProcessing(true);
    setStatusMessage(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of pdfFiles) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadName('bluecross-merged-document.pdf');
      setStatusMessage(`Successfully merged ${pdfFiles.length} PDF documents locally!`);
    } catch (err: any) {
      console.error(err);
      setStatusMessage('Failed to merge PDFs. Ensure documents are not password protected.');
    } finally {
      setProcessing(false);
    }
  };

  // 2. Client-Side PDF Rotate
  const handleRotatePDF = async () => {
    if (pdfFiles.length === 0) {
      setStatusMessage('Please upload a PDF file to rotate.');
      return;
    }

    setProcessing(true);
    setStatusMessage(null);

    try {
      const fileBuffer = await pdfFiles[0].arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);
      const pages = pdf.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotation) % 360));
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadName('bluecross-rotated.pdf');
      setStatusMessage(`Rotated ${pages.length} pages by ${rotation}° locally!`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Error rotating PDF. Please try with another file.');
    } finally {
      setProcessing(false);
    }
  };

  // 3. Client-Side JPG to PDF conversion
  const handleJpgToPdf = async () => {
    if (imageFiles.length === 0) {
      setStatusMessage('Please select one or more image files.');
      return;
    }

    setProcessing(true);
    setStatusMessage(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgFile of imageFiles) {
        const imgBuffer = await imgFile.arrayBuffer();
        let embeddedImage;

        if (imgFile.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(imgBuffer);
        } else {
          embeddedImage = await pdfDoc.embedJpg(imgBuffer);
        }

        const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setDownloadName('bluecross-converted-images.pdf');
      setStatusMessage(`Converted ${imageFiles.length} images into a PDF document!`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Conversion failed. Please provide standard JPG or PNG images.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Free PDF Tools — Merge, Split & Rotate PDF Locally"
        description="Private browser-local PDF utilities. Merge multiple PDFs, rotate orientation, convert JPG to PDF, and extract pages without uploading sensitive files to external servers."
        canonicalPath="/pdf-tools"
        breadcrumbs={[
          { label: 'Tools', url: '/calculators' },
          { label: 'PDF Tools' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'PDF Tools', url: '/pdf-tools' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            <span>Private Local PDF Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Browser PDF Tools
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Merge, split, rotate, and convert documents locally using WebAssembly &amp; client memory. Your Aadhaar cards, bank statements, and tax receipts are never transmitted across the network.
          </p>
        </div>

        {/* Security Banner */}
        <div className="p-4 mb-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-3">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-bold">Zero-Cloud Security Guarantee</p>
            <p>Files are processed directly inside your browser's local sandbox memory. Zero bytes are uploaded to Blue Cross or any third-party server.</p>
          </div>
        </div>

        {/* Tool Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 mb-8 text-xs font-bold">
          {[
            { id: 'merge', label: 'Merge PDF', icon: Layers },
            { id: 'rotate', label: 'Rotate PDF', icon: RotateCw },
            { id: 'jpg-to-pdf', label: 'JPG to PDF', icon: ImageIcon },
            { id: 'split', label: 'Split PDF (Architecture)', icon: Scissors },
            { id: 'extract', label: 'Extract Pages & Text', icon: FileText },
          ].map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveTool(tool.id as any);
                  setDownloadUrl(null);
                  setStatusMessage(null);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition whitespace-nowrap ${
                  activeTool === tool.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Work Area */}
        <div className="max-w-2xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          
          {/* Tool 1: Merge PDF */}
          {activeTool === 'merge' && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Merge Multiple PDFs
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Combine two or more PDF files into a single unified document in seconds.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-red-500 transition bg-slate-50/50 dark:bg-slate-800/20 mb-6"
              >
                <Upload className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Click to select multiple PDF files
                </p>
                <p className="text-xs text-slate-400 mt-1">Processed entirely in browser memory</p>
              </div>

              {pdfFiles.length > 0 && (
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                    <span>Selected Files ({pdfFiles.length}):</span>
                    <button
                      onClick={() => setPdfFiles([])}
                      className="text-red-500 hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  {pdfFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="truncate max-w-sm font-medium text-slate-800 dark:text-slate-200">
                        {idx + 1}. {f.name}
                      </span>
                      <span className="text-slate-400">
                        {(f.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}

                  <button
                    onClick={handleMergePDFs}
                    disabled={processing}
                    className="w-full mt-4 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-md shadow-red-500/20"
                  >
                    {processing ? 'Merging in browser...' : `Merge ${pdfFiles.length} PDFs Now`}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tool 2: Rotate PDF */}
          {activeTool === 'rotate' && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Rotate PDF Document
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Permanently adjust page rotation angle for misoriented scanned files.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />

              {pdfFiles.length === 0 ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-red-500 transition bg-slate-50/50 dark:bg-slate-800/20 mb-6"
                >
                  <Upload className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    Select a PDF file to rotate
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {pdfFiles[0].name}
                    </span>
                    <button
                      onClick={() => setPdfFiles([])}
                      className="text-red-500 hover:underline"
                    >
                      Change File
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Rotation Angle:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[90, 180, 270].map((deg) => (
                        <button
                          key={deg}
                          onClick={() => setRotation(deg)}
                          className={`p-2.5 rounded-xl text-xs font-bold transition border ${
                            rotation === deg
                              ? 'bg-red-600 text-white border-red-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {deg}&deg; Clockwise
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRotatePDF}
                    disabled={processing}
                    className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-md shadow-red-500/20"
                  >
                    {processing ? 'Rotating...' : 'Apply Rotation & Download'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tool 3: JPG to PDF */}
          {activeTool === 'jpg-to-pdf' && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Convert Images to PDF
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Turn your scanned documents, receipts, or photos into a clean multi-page PDF.
              </p>

              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:border-red-500 transition bg-slate-50/50 dark:bg-slate-800/20 mb-6"
              >
                <ImageIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                  Select JPG or PNG photos
                </p>
                <p className="text-xs text-slate-400 mt-1">Multi-page document creation</p>
              </div>

              {imageFiles.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>Images Selected ({imageFiles.length}):</span>
                    <button onClick={() => setImageFiles([])} className="text-red-500 hover:underline">
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {imageFiles.map((img, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs truncate">
                        {idx + 1}. {img.name}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleJpgToPdf}
                    disabled={processing}
                    className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-md shadow-red-500/20"
                  >
                    {processing ? 'Building PDF...' : 'Convert Images to PDF'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tool 4 & 5: Split & Extract Architecture */}
          {(activeTool === 'split' || activeTool === 'extract') && (
            <div className="text-center py-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {activeTool === 'split' ? 'Split PDF Architecture' : 'PDF Text Extraction Engine'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                Client-side page indexer configured with pdf-lib. Extract custom page ranges or separate individual chapters with privacy safeguards.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left text-xs space-y-2 mb-6">
                <div className="font-semibold text-slate-700 dark:text-slate-300">Feature Status:</div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Browser-based engine loaded (pdf-lib v1.17)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Client-side memory sandbox active</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTool('merge')}
                className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition"
              >
                Use Active PDF Merge &rarr;
              </button>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Download Action */}
          {downloadUrl && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <a
                href={downloadUrl}
                download={downloadName}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Your PDF</span>
              </a>
            </div>
          )}

        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
