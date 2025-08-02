import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const colorCommand = editor.registerCommand(
      "custom_font_color",
      (payload) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.setStyle(`color: ${payload}`);
          }
        });
        return true;
      },
      0
    );

    const fontFamilyCommand = editor.registerCommand(
      "custom_font_family",
      (payload) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.setStyle(`font-family: ${payload}`);
          }
        });
        return true;
      },
      0
    );

    const fontSizeCommand = editor.registerCommand(
      "custom_font_size",
      (payload) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.setStyle(`font-size: ${payload}px`);
          }
        });
        return true;
      },
      0
    );

    return () => {
      colorCommand();
      fontFamilyCommand();
      fontSizeCommand();
    };
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center bg-gray-800 p-2 rounded-md">
      {/* Bold Button */}
      <button
        title="Bold"
        className="px-3 py-1 border rounded bg-white text-black hover:bg-gray-200 font-bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        B
      </button>

      {/* Underline Button */}
      <button
        title="Underline"
        className="px-3 py-1 border rounded bg-white text-black hover:bg-gray-200 font-bold"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        U
      </button>

      {/* Font Color Picker (circle only) */}
      <label title="Font Color" className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer">
        <input
          type="color"
          onChange={(e) =>
            editor.dispatchCommand("custom_font_color", e.target.value)
          }
          className="opacity-0 w-full h-full cursor-pointer"
        />
      </label>

      {/* Font Family Dropdown */}
      <select
        className="border rounded px-2 py-1 bg-white text-black"
        title="Font Family"
        onChange={(e) =>
          editor.dispatchCommand("custom_font_family", e.target.value)
        }
      >
        <option value="">Font</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>

      {/* Font Size Dropdown */}
      <select
        className="border rounded px-2 py-1 bg-white text-black"
        title="Font Size"
        onChange={(e) =>
          editor.dispatchCommand("custom_font_size", e.target.value)
        }
      >
        <option value="">Size</option>
        <option value="12">12px</option>
        <option value="16">16px</option>
        <option value="20">20px</option>
        <option value="24">24px</option>
        <option value="28">28px</option>
      </select>
    </div>
  );
}
