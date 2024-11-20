import { Container } from "react-bootstrap";
import Form from "../components/Form";
import { useOutletContext } from "react-router-dom";

const Edit = () => {
  const note = useOutletContext();
  console.log(note);
  return (
    <Container className="py-5">
      <h2>Yeni Not Oluştur</h2>
      {/* <Form /> */}
    </Container>
  );
};

export default Edit;
