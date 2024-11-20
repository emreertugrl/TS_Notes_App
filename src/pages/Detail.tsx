import { useOutletContext } from "react-router-dom";

const Detail = () => {
  const note = useOutletContext();
  console.log(note);
  return <div>Detail</div>;
};

export default Detail;
