import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { selectNoteById } from "./NotesApiSlice";
import { selectAllUsers } from "../users/UsersApiSlice";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  useEffect(() => {
    document.title = "Edit Note | techNotes";
  });

  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );
  return content;
};

export default EditNote;
