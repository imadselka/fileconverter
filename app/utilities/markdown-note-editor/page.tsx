"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function MarkdownNoteEditor() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({ id: "", title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("markdown-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("markdown-notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = { id: Date.now().toString(), title: "Untitled", content: "" };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  const saveNote = () => {
    setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
    setIsEditing(false);
    toast.success("Note saved successfully");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (currentNote.id === id) {
      setCurrentNote({ id: "", title: "", content: "" });
    }
    toast.success("Note deleted successfully");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Markdown Note Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button onClick={createNewNote}>New Note</Button>
          {isEditing && (
            <Button onClick={saveNote}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 border-r pr-4">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <ul className="space-y-2">
              {notes.map((note) => (
                <li key={note.id} className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="text-left"
                    onClick={() => {
                      setCurrentNote(note);
                      setIsEditing(false);
                    }}
                  >
                    {note.title}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            {currentNote.id && (
              <>
                <Input
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  className="mb-2"
                  placeholder="Note title"
                />
                {isEditing ? (
                  <Textarea
                    value={currentNote.content}
                    onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                    className="min-h-[300px]"
                    placeholder="Write your markdown here..."
                  />
                ) : (
                  <div className="border rounded-md p-4 min-h-[300px] prose dark:prose-invert">
                    <ReactMarkdown>{currentNote.content}</ReactMarkdown>
                  </div>
                )}
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} className="mt-2">
                    Edit
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}