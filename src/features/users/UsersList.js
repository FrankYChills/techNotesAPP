import { useGetUsersQuery } from "./UsersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

import User from "./User";

const UsersList = () => {
  // trigger getUsers endpoint in the ApiSlice to fetch data
  // grab data(ids and entity) attribute from getNotes query state
  // query is called immediately and mutation needs to be called

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000, //refetch the data every 60 secs
    refetchOnFocus: true, //refetch thye data when someone comes back to the app tab
    refetchOnMountOrArgChange: true, //refetch on refresh
  });

  let content;
  if (isLoading) {
    content = <PulseLoader color={"#fff"} />;
  }
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;
    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
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

export default UsersList;
