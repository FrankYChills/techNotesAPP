import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./UsersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { useEffect } from "react";

import EditUserForm from "./EditUserForm";

const EditUser = () => {
  useEffect(() => {
    document.title = "Edit User | techNotes";
  });

  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));
  const content = user ? (
    <EditUserForm user={user} />
  ) : (
    <PulseLoader color={"#fff"} />
  );
  return content;
};

export default EditUser;
