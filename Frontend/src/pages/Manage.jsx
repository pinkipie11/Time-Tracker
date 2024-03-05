import { useParams } from "react-router-dom";

const Manage = () => {
  const { bID } = useParams();
  return <h1>Manage / {bID}</h1>;
};

export default Manage;
