import { useParams } from "react-router-dom";

const Admin = () => {
  const { aID } = useParams();
  return <h1>Admin / {aID}</h1>;
};

export default Admin;
