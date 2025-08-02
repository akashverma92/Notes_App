// import { useEffect, useState } from "react";

// export default function SavedNotes() {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/notes");

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (Array.isArray(data)) {
//           setNotes(data);
//         } else {
//           console.error("Unexpected response structure", data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch notes from API:", error);
//       }
//     };

//     fetchNotes();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Saved Notes</h2>

//       {notes.length === 0 ? (
//         <p className="text-gray-300">No saved notes found.</p>
//       ) : (
//         notes.map((note, index) => (
//           <div
//             key={note._id || index}
//             className="bg-white text-black rounded-xl shadow p-4 mb-8"
//           >
//             <h3 className="font-semibold text-lg mb-2">
//               {note.text
//                 ? note.text.replace(/<[^>]+>/g, "").slice(0, 30) + "..."
//                 : `Note ${index + 1}`}
//             </h3>

//             {/* Render Text */}
//             <div
//               className="prose max-w-none"
//               dangerouslySetInnerHTML={{ __html: note.text }}
//             />

//             {/* Render Canvas Pages */}
//             {note.canvasPages?.length > 0 && (
//               <div className="mt-4 space-y-4">
//                 {note.canvasPages.map((page, pageIndex) => (
//                   <img
//                     key={pageIndex}
//                     src={typeof page === "string" ? page : ""}
//                     alt={`Canvas Page ${pageIndex + 1}`}
//                     className="w-full border rounded shadow"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import CanvasReplay from "./CanvasReplay";

export default function SavedNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notes");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setNotes(data);
        } else {
          console.error("Unexpected response structure", data);
        }
      } catch (error) {
        console.error("Failed to fetch notes from API:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-white">
        Saved Notes
      </h2>

      {notes.length === 0 ? (
        <p className="text-gray-300 text-center">No saved notes found.</p>
      ) : (
        notes.map((note, index) => (
          <div
            key={note._id || index}
            className="bg-white text-black rounded-xl shadow-md p-4 sm:p-6 mb-8"
          >
            <h3 className="font-semibold text-base sm:text-lg mb-2 break-words">
              {note.text?.replace(/<[^>]+>/g, "").slice(0, 30) || `Note ${index + 1}`}...
            </h3>

            {/* Render Rich Text */}
            <div
              className="prose max-w-full overflow-x-auto text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: note.text || "" }}
            />

            {/* Render Canvas Strokes */}
            {Array.isArray(note.canvasPages) && note.canvasPages.length > 0 && (
              <div className="mt-4 space-y-4">
                {note.canvasPages.map((pageData, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="border rounded p-2 overflow-x-auto"
                  >
                    <CanvasReplay pageData={pageData} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
