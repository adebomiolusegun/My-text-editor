import { useRef } from "react";
import { LuPalette } from "react-icons/lu";
import applyInlineStyle from "@utilities/applyInlineStyle";
import useDropDownHandler from "@utilities/useDropDownHandler";
import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import type { TextFormatProps } from "@Types/types";

/*
 * Column-based palette: first column is grayscale, remaining
 * columns are hue families. Each row is a shade level, light
 * at the top to dark at the bottom — matches the standard
 * Google Docs / Slides text-color grid layout.
 */
const COLOR_GRID: (string | null)[][] = [
  ["#000000", "#dc2626", "#ea580c", "#eab308", "#16a34a", "#2563eb", "#7c3aed"],
  [null, "#fecaca", "#fed7aa", "#fef08a", "#bbf7d0", "#bfdbfe", "#ddd6fe"],
  ["#d1d5db", "#fca5a5", "#fdba74", "#fde047", "#86efac", "#93c5fd", "#c4b5fd"],
  ["#6b7280", "#b91c1c", "#c2410c", "#a16207", "#15803d", "#1d4ed8", "#6d28d9"],
  ["#374151", "#7f1d1d", "#7c2d12", "#713f12", "#14532d", "#1e3a8a", "#4c1d95"],
];

function ColorPicker({ id }: TextFormatProps) {
  const { isOpen, handleDropdown } = useDropDownHandler({ id });
  const activeBlockId = useEditorStore((s) => s.activeBlockId);
  const updateContent = useEditorStore((s) => s.updateContent);
  const customInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (content: string) => {
    if (activeBlockId) updateContent(activeBlockId, content);
  };

  function applyColor(color: string) {
    applyInlineStyle("color", color, handleUpdate);
  }

  return (
    <div className="relative">
      <button type="button" onClick={handleDropdown} className="toolsBarBtn">
        <LuPalette />
      </button>

      {isOpen && (
        <div className="dropdownContainer p-3">
          <div className="grid grid-cols-7 gap-1.5">
            {COLOR_GRID.map((row, rowIndex) =>
              row.map((color, colIndex) =>
                color ? (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    type="button"
                    title={color}
                    className="w-6 h-6 rounded-sm border border-black/10 hover:scale-110 hover:ring-2 hover:ring-offset-1 hover:ring-border-line transition-transform"
                    style={{ backgroundColor: color }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      applyColor(color);
                      handleDropdown(e);
                    }}
                  />
                ) : (
                  <div key={`${rowIndex}-${colIndex}`} className="w-6 h-6" />
                ),
              ),
            )}
          </div>

          <div className="mt-2 pt-2 border-t border-border-line">
            <button
              type="button"
              className="flex items-center gap-2 w-full text-sm rounded px-1 py-1 hover:bg-bg-hover"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                customInputRef.current?.click();
              }}
            >
              <span
                className="w-6 h-6 rounded-sm border border-black/10"
                style={{
                  background:
                    "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                }}
              />
              Custom
            </button>
            <input
              ref={customInputRef}
              type="color"
              className="hidden"
              onChange={(e) => {
                applyColor(e.target.value);
                handleDropdown(e as unknown as React.MouseEvent);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
