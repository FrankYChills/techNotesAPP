import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUpdateNoteMutation, useDeleteNoteMutation } from "./NotesApiSlice";

const EditNoteForm = ({ note, users }) => {
  const [userId, setUserId] = useState(note.user);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);

  const navigate = useNavigate();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteNoteMutation();

  const canSave = userId && title && text && !isLoading;

  const onSave = async () => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDelete = async () => {
    await deleteNote({ id: note.id });
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUserId("");
      setTitle("");
      setText("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input-incomplete" : "";
  const validTextClass = !text ? "form__input-incomplete" : "";

  const errorContent = (error?.data?.message || delError?.data?.message) ?? "";

  let content = (
    <>
      <p className={errClass}>{errorContent}</p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSave}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button className="icon-button" title="Delete" onClick={onDelete}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:{" "}
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <input
          className={`form__input ${validTextClass}`}
          id="text"
          name="text"
          type="text"
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label
          className="form__label form__checkbox-container"
          htmlFor="completed"
        >
          Work Completed:
          <input
            className="form__checkbox"
            name="completed"
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted((prev) => !prev)}
          />
        </label>

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          Assigned to :
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          {userOptions}
        </select>
        <label htmlFor="createdAt" className="form__label">
          Created At :
          {new Date(note.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </label>
        <label htmlFor="updatedAt" className="form__label">
          Updated At :
          {new Date(note.updatedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </label>
        <br />
      </form>
    </>
  );

  return content;
};

export default EditNoteForm;
