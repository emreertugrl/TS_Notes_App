import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { useState } from "react";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  // yeni etiket oluşturma
  const createTag = (newTag: Tag): void => {
    setTags((prev) => [...prev, newTag]);
  };

  // yeni note oluşturma
  const createNote = (data: NoteData): void => {
    // formdan gelen data'ya id ekle
    const newNote: Note = { id: v4(), ...data };
    // state'i güncelle
    setNotes((prev) => [...prev, newNote]);
  };
  console.log(notes);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/new"
          element={
            <Create
              createTag={createTag}
              handleSubmit={createNote}
              availableTags={tags}
            />
          }
        />
        <Route path="/note/:id" element={<Detail />} />
        <Route path="/note/:id/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
