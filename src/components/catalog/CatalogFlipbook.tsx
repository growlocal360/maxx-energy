"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import CatalogToolbar from "./CatalogToolbar";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

interface CatalogPage {
  index: number;
  src: string;
  width: number;
  height: number;
}

interface CatalogFlipbookProps {
  pages: CatalogPage[];
  pdfUrl: string;
  basePath: string;
}

export default function CatalogFlipbook({ pages, pdfUrl, basePath }: CatalogFlipbookProps) {
  const flipRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void } } | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalPages = pages.length;

  const handlePrev = useCallback(() => {
    flipRef.current?.pageFlip()?.flipPrev();
  }, []);

  const handleNext = useCallback(() => {
    flipRef.current?.pageFlip()?.flipNext();
  }, []);

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center bg-gradient-to-br from-maxx-950 to-maxx-800 p-4 sm:p-8 md:rounded-2xl md:shadow-xl"
      >
        <div className="w-full max-w-[1100px]">
          {/* @ts-expect-error react-pageflip's prop types require many fields; Partial is fine at runtime */}
          <HTMLFlipBook
            ref={flipRef}
            width={550}
            height={711}
            size="stretch"
            minWidth={300}
            maxWidth={1100}
            minHeight={400}
            maxHeight={1422}
            maxShadowOpacity={0.5}
            showCover
            mobileScrollSupport
            usePortrait
            drawShadow
            flippingTime={700}
            className="mx-auto"
            onFlip={handleFlip}
          >
            {pages.map((page) => (
              <div key={page.index} className="overflow-hidden bg-white">
                <Image
                  src={`${basePath}/${page.src}`}
                  alt={`Catalog page ${page.index}`}
                  width={page.width}
                  height={page.height}
                  priority={page.index <= 4}
                  loading={page.index <= 4 ? undefined : "lazy"}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      <div className="px-2 sm:px-0">
        <CatalogToolbar
          currentPage={currentPage}
          totalPages={totalPages}
          pdfUrl={pdfUrl}
          isFullscreen={isFullscreen}
          onPrev={handlePrev}
          onNext={handleNext}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>
    </div>
  );
}
