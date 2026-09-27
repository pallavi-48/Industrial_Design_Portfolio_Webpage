import { useId, type CSSProperties } from "react";

import "./folder-float.css";

type FolderFloatProps = {
  id: string;
  label: string;
  subtitle?: string;
  items: string[];
  layout?: "collection";
  isOpen: boolean;
  onToggle: () => void;
};

function getCollectionPosition(index: number, itemCount: number, columns: number) {
  const row = Math.floor(index / columns);
  const rowCount = Math.ceil(itemCount / columns);
  const itemsInRow = Math.min(columns, itemCount - row * columns);
  const column = index % columns;
  const inset = columns === 2 ? 26 : 16;
  const x = itemsInRow === 1
    ? 50
    : inset + (column / (itemsInRow - 1)) * (100 - inset * 2) + (row % 2 === 1 ? 2 : -2);
  const rowProgress = rowCount === 1 ? 0.5 : row / (rowCount - 1);
  const arc = Math.sin((column / Math.max(itemsInRow - 1, 1)) * Math.PI) * 4;
  const y = 10 + rowProgress * 47 + arc + (index % 2 === 0 ? -1.5 : 1.5);

  return { x, y };
}

export function FolderFloat({ id, label, subtitle, items, layout, isOpen, onToggle }: FolderFloatProps) {
  const generatedId = useId();
  const contentId = `folder-float-items-${generatedId}`;

  return (
    <div
      className={`folder-float ${layout === "collection" ? "folder-float--collection" : ""} ${isOpen ? "folder-float--open" : ""}`}
      data-folder-float-id={id}
      style={layout === "collection" ? {
        "--ff-n": items.length,
        "--ff-rows-mobile": Math.ceil(items.length / 2),
        "--ff-rows-tablet": Math.ceil(items.length / 2),
        "--ff-rows-desktop": Math.ceil(items.length / 3),
      } as CSSProperties : undefined}
    >
      <button
        type="button"
        className="folder-float__button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={`${isOpen ? "Close" : "Open"} ${label} folder${subtitle ? ` in ${subtitle}` : ""}`}
      >
        <span className="folder-float__art" aria-hidden="true">
          {items.map((item, index) => {
            const progress = items.length < 2 ? 0.5 : index / (items.length - 1);
            const angle = (-155 + progress * 130) * (Math.PI / 180);
            const x = Math.cos(angle) * 31;
            const y = Math.sin(angle) * 24;
            const mobilePosition = layout === "collection" ? getCollectionPosition(index, items.length, 2) : null;
            const tabletPosition = layout === "collection" ? getCollectionPosition(index, items.length, 2) : null;
            const desktopPosition = layout === "collection" ? getCollectionPosition(index, items.length, 3) : null;

            return (
              <span
                key={`${item}-${index}`}
                className="folder-float__item"
                style={{
                  left: layout === "collection" ? undefined : `calc(50% + ${x}%)`,
                  top: layout === "collection" ? undefined : `calc(47% + ${y}%)`,
                  "--ff-mobile-x": mobilePosition ? `${mobilePosition.x}%` : undefined,
                  "--ff-mobile-y": mobilePosition ? `${mobilePosition.y}%` : undefined,
                  "--ff-tablet-x": tabletPosition ? `${tabletPosition.x}%` : undefined,
                  "--ff-tablet-y": tabletPosition ? `${tabletPosition.y}%` : undefined,
                  "--ff-desktop-x": desktopPosition ? `${desktopPosition.x}%` : undefined,
                  "--ff-desktop-y": desktopPosition ? `${desktopPosition.y}%` : undefined,
                  "--ff-rotation": layout === "collection" ? `${[-2, 1, 2, -1][index % 4]}deg` : "0deg",
                  transitionDelay: `${index * 42}ms`,
                  animationDelay: `${index * 110}ms`,
                } as CSSProperties}
                onClick={layout === "collection" ? (event) => event.stopPropagation() : undefined}
              >
                <span className="folder-float__item-label">{item}</span>
              </span>
            );
          })}
          <span className="folder-float__back" />
          <span className="folder-float__tab" />
          <span className="folder-float__front" />
          <span className="folder-float__lid" />
        </span>
        <span className="folder-float__caption">
          <span className="folder-float__label">{label}</span>
          <span className="folder-float__subtitle">{subtitle ?? `${String(items.length).padStart(2, "0")} items`}</span>
        </span>
      </button>
      <div id={contentId} className="sr-only" aria-live="polite">
        {isOpen ? items.join(", ") : ""}
      </div>
    </div>
  );
}