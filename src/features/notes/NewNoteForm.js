import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAddNewNoteMutation } from "./NotesApiSlice";

const NewNoteForm = ({ users }) => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  useEffect(() => {
    if (isSuccess) {
      setUserId("");
      setTitle("");
      setText("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const canSave = userId && title && text && !isLoading;

  //   define update function

  const onSave = async (e) => {
    e.preventDefault();
    if (canSave) {
      // our backend takes user name attribute as userId

      await addNewNote({ user: userId, title, text });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input-incomplete" : "";
  const validTextClass = !text ? "form__input-incomplete" : "";

  let content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form className="form" onSubmit={onSave}>
        <div className="form__title-row">
          <h2>Add a New Note</h2>

          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              {/* faSave on click submits the form */}
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label htmlFor="title" className="form__label">
          Title:
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
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
      </form>
    </>
  );

  return content;
};

export default NewNoteForm;
