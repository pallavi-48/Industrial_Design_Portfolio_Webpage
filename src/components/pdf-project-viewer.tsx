import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
  type PDFPageProxy,
} from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

type PdfProjectViewerProps = {
  title: string;
  url: string;
  onClose: () => void;
};

export function PdfProjectViewer({ title, url, onClose }: PdfProjectViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [hasRenderedFirstPage, setHasRenderedFirstPage] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const loadingTask = getDocument({ url });
    setPdf(null);
    setHasRenderedFirstPage(false);
    setError(false);

    loadingTask.promise.then((document) => {
      if (active) setPdf(document);
    }).catch(() => {
      if (active) setError(true);
    });

    return () => {
      active = false;
      void loadingTask.destroy();
    };
  }, [url]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] flex min-h-0 flex-col bg-[#061714] text-foreground">
      <header className="z-10 flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-highlight/15 bg-[#021C25]/95 px-4 backdrop-blur-md md:px-8">
        <button
          onClick={onClose}
          className="group inline-flex min-h-10 items-center gap-2 font-body text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:text-highlight"
          aria-label="Close PDF viewer"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
        <span className="truncate text-right font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </span>
      </header>

      <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-6 sm:px-6 md:px-10 md:py-8">
        {pdf && !error && (
          <div className="mx-auto w-full max-w-[1000px] rounded-[6px] border border-highlight/15 bg-[#0b2421] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-3">
            <div className="flex flex-col gap-3">
              {Array.from({ length: pdf.numPages }, (_, index) => (
                <PdfPage
                  key={`${url}-${index + 1}`}
                  pdf={pdf}
                  pageNumber={index + 1}
                  pageCount={pdf.numPages}
                  onFirstPageRendered={() => setHasRenderedFirstPage(true)}
                  onRenderError={() => setError(true)}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col items-center justify-center text-center">
            <p className="font-heading text-lg font-bold uppercase">Unable to load this project</p>
            <button onClick={onClose} className="mt-6 inline-flex min-h-10 items-center gap-2 border border-highlight/40 px-5 font-body text-[10px] uppercase tracking-[0.2em] text-highlight transition-colors hover:bg-highlight hover:text-[#071614]">
              <ArrowLeft size={15} /> Back
            </button>
          </div>
        )}

        {pdf && !error && !hasRenderedFirstPage && (
          <div role="status" className="absolute inset-0 z-20 grid place-items-center bg-[#061714]/75 backdrop-blur-[2px]">
            <div className="text-center">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-highlight">Loading project</p>
              <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
                <span className="size-1.5 animate-pulse rounded-full bg-highlight" />
                <span className="size-1.5 animate-pulse rounded-full bg-highlight [animation-delay:150ms]" />
                <span className="size-1.5 animate-pulse rounded-full bg-highlight [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {!pdf && !error && (
          <div role="status" className="absolute inset-0 z-20 grid place-items-center bg-[#061714]">
            <div className="text-center">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-highlight">Loading project</p>
              <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
                <span className="size-1.5 animate-pulse rounded-full bg-highlight" />
                <span className="size-1.5 animate-pulse rounded-full bg-highlight [animation-delay:150ms]" />
                <span className="size-1.5 animate-pulse rounded-full bg-highlight [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type PdfPageProps = {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  pageCount: number;
  onFirstPageRendered: () => void;
  onRenderError: () => void;
};

function PdfPage({ pdf, pageNumber, pageCount, onFirstPageRendered, onRenderError }: PdfPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nearViewport, setNearViewport] = useState(pageNumber === 1);
  const [rendered, setRendered] = useState(false);
  const [failed, setFailed] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(612 / 792);
  const onFirstPageRenderedRef = useRef(onFirstPageRendered);
  const onRenderErrorRef = useRef(onRenderError);

  useEffect(() => { onFirstPageRenderedRef.current = onFirstPageRendered; }, [onFirstPageRendered]);
  useEffect(() => { onRenderErrorRef.current = onRenderError; }, [onRenderError]);

  useEffect(() => {
    const element = pageRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = pageRef.current;
    const canvas = canvasRef.current;
    if (!nearViewport || !element || !canvas) return;

    let disposed = false;
    let pdfPage: PDFPageProxy | null = null;
    let renderTask: ReturnType<PDFPageProxy["render"]> | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let animationFrame = 0;

    const renderPage = async () => {
      if (disposed || !pdfPage || !canvas) return;
      const width = element.clientWidth;
      if (!width) return;

      renderTask?.cancel();
      const baseViewport = pdfPage.getViewport({ scale: 1 });
      const viewport = pdfPage.getViewport({ scale: width / baseViewport.width });
      const maxPixels = 12_000_000;
      const outputScale = Math.min(window.devicePixelRatio || 1, Math.sqrt(maxPixels / (viewport.width * viewport.height)));
      const context = canvas.getContext("2d");
      if (!context) {
        setFailed(true);
        onRenderErrorRef.current();
        return;
      }

      setAspectRatio(baseViewport.width / baseViewport.height);
      canvas.width = Math.ceil(viewport.width * outputScale);
      canvas.height = Math.ceil(viewport.height * outputScale);

      try {
        const nextTask = pdfPage.render({
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        });
        renderTask = nextTask;
        await nextTask.promise;
        if (disposed) return;
        setRendered(true);
        setFailed(false);
        if (pageNumber === 1) onFirstPageRenderedRef.current();
      } catch (cause) {
        if (disposed || (cause instanceof Error && cause.name === "RenderingCancelledException")) return;
        setFailed(true);
        onRenderErrorRef.current();
      }
    };

    const scheduleRender = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => { void renderPage(); });
    };

    void pdf.getPage(pageNumber).then((page) => {
      if (disposed) return;
      pdfPage = page;
      const baseViewport = page.getViewport({ scale: 1 });
      setAspectRatio(baseViewport.width / baseViewport.height);
      resizeObserver = new ResizeObserver(scheduleRender);
      resizeObserver.observe(element);
      void renderPage();
    }).catch(() => {
      if (!disposed) {
        setFailed(true);
        onRenderErrorRef.current();
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      renderTask?.cancel();
      pdfPage?.cleanup();
    };
  }, [nearViewport, pageNumber, pdf]);

  return (
    <div ref={pageRef} className="relative mx-auto w-full max-w-[940px] overflow-hidden rounded-[2px] bg-white shadow-[0_12px_34px_rgba(0,0,0,0.32)]" style={{ aspectRatio }} role="group" aria-label={`Page ${pageNumber} of ${pageCount}`}>
      <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 block h-full w-full ${rendered ? "opacity-100" : "opacity-0"}`} />
      {failed && <div role="alert" className="absolute inset-0 grid place-items-center bg-white px-5 text-center font-body text-sm text-[#102622]">Unable to render this page.</div>}
    </div>
  );
}