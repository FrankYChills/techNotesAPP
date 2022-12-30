import { useGetNotesQuery } from "./NotesApiSlice";

import Note from "./Note";

const NotesList = () => {
  // trigger getUsers endpoint in the ApiSlice to fetch data
  // grab data(ids and entity) attribute from getUsers query state
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000, //refetch on every 15 secs
    refetchOnFocus: true, //referesh when user comes back to app tab
    refetchOnMountOrArgChange: true, //refetch on referesh
  });

  let content;
  if (isLoading) {
    content = <p>Loading ...</p>;
  }
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = notes;
    const tableContent = ids?.length
      ? ids.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : null;
    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Status
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default NotesList;
