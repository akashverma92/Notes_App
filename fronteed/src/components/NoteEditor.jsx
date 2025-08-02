// import {
//     LexicalComposer,
// } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import ToolbarPlugin from "./ToolbarPlugin";
// import { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { useNavigate } from "react-router-dom";
// import DrawingCanvas from "./DrawingCanvas";
// import axios from 'axios';


// export default function NoteEditor() {
//     const navigate = useNavigate();

//     const initialConfig = {
//         namespace: "MyEditor",
//         theme: {
//             paragraph: "editor-paragraph",
//         },
//         onError(error) {
//             throw error;
//         },
//     };

//     const handleSave = async () => {
//         const content = document.querySelector("[contenteditable=true]").innerHTML;
//         const canvasElements = document.querySelectorAll("canvas");

//         const canvasPages = [];

//         for (const canvas of canvasElements) {
//             const dataUrl = canvas.toDataURL("image/png");
//             canvasPages.push({
//                 content: dataUrl,
//                 id: canvas.id || `canvas-${Date.now()}`
//             });
//         }

//         try {
//             const res = await axios.post('http://localhost:5000/api/notes/createnote', {
//                 text: content,
//                 canvasPages
//             });

//             console.log("Saved to DB:", res.data);
//             alert("Note saved to database!");
//         } catch (err) {
//             console.error("Error:", err);
//             alert("Failed to save note to database.");
//         }
//     };


//     const handleExportPDF = async () => {
//         const editorContent = document.querySelector(".editor-input");
//         if (!editorContent) return;

//         const canvas = await html2canvas(editorContent);
//         const imgData = canvas.toDataURL("image/png");

//         const pdf = new jsPDF("p", "mm", "a4");
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();

//         const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
//         const width = canvas.width * ratio;
//         const height = canvas.height * ratio;

//         pdf.addImage(imgData, "PNG", 10, 10, width, height);
//         pdf.save("note.pdf");
//     };

//     useEffect(() => {
//         const savedContent = localStorage.getItem("savedNoteContent");
//         const editorDiv = document.querySelector("[contenteditable=true]");
//         if (savedContent && editorDiv) {
//             setTimeout(() => {
//                 if (editorDiv.innerHTML.trim() === "") {
//                     editorDiv.innerHTML = savedContent;
//                 }
//             }, 200);
//         }
//     }, []);

//     // Drawing settings
//     const [pages, setPages] = useState([1]);
//     const [penColor, setPenColor] = useState("#000000");
//     const [lineWidth, setLineWidth] = useState(2);
//     const [isEraser, setIsEraser] = useState(false);

//     const addNewPage = () => {
//         setPages((prev) => [...prev, prev.length + 1]);
//     };

//     return (
//         <div className="mx-auto max-w-3xl px-4 py-8">
//             <LexicalComposer initialConfig={initialConfig}>
//                 <div className="border rounded-lg overflow-hidden shadow bg-white">
//                     <div className="bg-gray-800 p-2">
//                         <ToolbarPlugin />
//                     </div>
//                     <div className="editor-container p-4 min-h-[200px]">
//                         <RichTextPlugin
//                             contentEditable={
//                                 <ContentEditable className="editor-input text-black bg-white min-h-[200px] outline-none" />
//                             }
//                             placeholder={
//                                 <div className="editor-placeholder text-gray-400">
//                                     Start writing your note...
//                                 </div>
//                             }
//                         />
//                         <HistoryPlugin />
//                         <OnChangePlugin onChange={() => { }} />
//                     </div>
//                 </div>
//             </LexicalComposer>

//             <div className="mt-4 flex justify-between gap-4 flex-wrap">
//                 <button
//                     onClick={() => navigate("/")}
//                     className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                 >
//                     ⬅ Back
//                 </button>
//                 <button
//                     onClick={handleSave}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                     💾 Save Note
//                 </button>
//                 <button
//                     onClick={handleExportPDF}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                     📄 Export PDF
//                 </button>
//             </div>

//             {/* Drawing Area */}
//             <div className="mt-8 bg-white rounded shadow p-4">
//                 <p className="font-semibold text-gray-800 mb-4">✏️ Drawing Board:</p>

//                 <div className="flex flex-wrap items-center gap-4 mb-4">
//                     <input
//                         type="color"
//                         value={penColor}
//                         onChange={(e) => {
//                             setPenColor(e.target.value);
//                             setIsEraser(false);
//                         }}
//                         className="w-10 h-10 border rounded"
//                         title="Pen Color"
//                     />
//                     <select
//                         value={lineWidth}
//                         onChange={(e) => setLineWidth(Number(e.target.value))}
//                         className="p-2 border rounded bg-white text-black"
//                     >
//                         <option value={2}>Thin</option>
//                         <option value={5}>Medium</option>
//                         <option value={10}>Thick</option>
//                     </select>
//                     <button
//                         onClick={() => setIsEraser((prev) => !prev)}
//                         className={`px-4 py-2 rounded text-white ${isEraser ? "bg-red-600" : "bg-blue-600"}`}
//                     >
//                         {isEraser ? "Eraser On" : "Eraser Off"}
//                     </button>
//                 </div>

//                 <div className="h-[400px] overflow-y-auto">
//                     {pages.map((_, index) => (
//                         <DrawingCanvas
//                             key={index}
//                             color={penColor}
//                             thickness={lineWidth}
//                             isEraser={isEraser}
//                             onOverflow={addNewPage}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $getSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import ToolbarPlugins from "./ToolbarPlugin";
import DrawingCanvas from "./DrawingCanvas";
import axios from "../utils/axiosInstance";

export default function NoteEditor({ noteId = null }) {
    const [editorState, setEditorState] = useState(null);
    const [canvasPages, setCanvasPages] = useState([[]]);
    const [currentPage, setCurrentPage] = useState(0);
    const editorRef = useRef(null);

    const editorStateRef = useRef(""); // Store serialized string
    const drawingPagesRef = useRef([[]]); // Store canvas pages globally

    // Load existing note if editing
    useEffect(() => {
        if (noteId) {
            axios
                .get(`/api/notes/${noteId}`)
                .then((res) => {
                    const { text, canvasData } = res.data;
                    editorStateRef.current = text;
                    setCanvasPages(canvasData.length ? canvasData : [[]]);
                    drawingPagesRef.current = canvasData;
                })
                .catch(console.error);
        }
    }, [noteId]);

    // This plugin updates the ref with serialized editor content
    function EditorStateTrackerPlugin() {
        const [editor] = useLexicalComposerContext();

        useEffect(() => {
            return editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    const htmlString = $getRoot().getTextContent(); // Or serialize to HTML if needed
                    editorStateRef.current = htmlString;
                });
            });
        }, [editor]);

        return null;
    }

    // Save each drawing page
    const handleSavePage = (pageData) => {
        const updatedPages = [...canvasPages];
        updatedPages[currentPage] = pageData;
        setCanvasPages(updatedPages);
        drawingPagesRef.current = updatedPages;
    };

    // Save the note
    const handleSaveNote = async () => {
        const serialized = editorStateRef.current;
        const pages = drawingPagesRef.current;

        const isTextEmpty = !serialized || serialized.trim() === "";
        const isCanvasEmpty = !pages || pages.every(page => page.length === 0);

        if (isTextEmpty && isCanvasEmpty) {
            alert("Cannot save an empty note. Please add some text or drawing.");
            return;
        }

        try {
            await axios.post("/notes/createnote", {
                text: serialized,
                canvasPages: pages,
            });
            alert("Note saved successfully!");
        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save note.");
        }
    };

    const addNewPage = () => {
        const updatedPages = [...canvasPages, []];
        setCanvasPages(updatedPages);
        setCurrentPage(updatedPages.length - 1);
        drawingPagesRef.current = updatedPages;
    };

    const initialConfig = {
        namespace: "NoteEditor",
        editorRef: editorRef,
        onError: (error) => {
            console.error("Lexical error:", error);
        },
    };

    return (
        <div className="p-4 space-y-6 max-w-7xl mx-auto">
            <LexicalComposer initialConfig={initialConfig}>
                <div className="w-full">
                    {/* Toolbar */}
                    <div className="sticky top-0 z-10 bg-white border-b">
                        <ToolbarPlugins />
                    </div>

                    {/* Text Editor */}
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable className="min-h-[150px] w-full p-2 border rounded bg-white text-black resize-y overflow-auto" />
                        }
                        placeholder={<div className="text-gray-500 p-2">Type your note here...</div>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <OnChangePlugin onChange={setEditorState} />
                    <EditorStateTrackerPlugin />
                </div>
            </LexicalComposer>

            {/* Drawing Canvas Section */}
            <div>
                <h2 className="text-lg font-bold mb-2">Drawing Page {currentPage + 1}</h2>

                <div className="w-full border rounded overflow-hidden bg-white">
                    <DrawingCanvas
                        canvasData={canvasPages[currentPage] || []}
                        onSave={handleSavePage}
                        tool="pen"
                        strokeColor="#000000"
                        strokeWidth={2}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap mt-4 gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, canvasPages.length - 1))
                        }
                        disabled={currentPage === canvasPages.length - 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                    <button
                        onClick={addNewPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        + New Page
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleSaveNote}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded shadow-lg transition"
                >
                    Save Note
                </button>
            </div>
        </div>
    );

}
