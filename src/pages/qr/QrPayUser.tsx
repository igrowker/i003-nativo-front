import { useParams } from "react-router-dom";

export const QrPayUser = () => {
  const { id } = useParams();
  console.log(id);
  return <div>QrPayUser</div>;
};
