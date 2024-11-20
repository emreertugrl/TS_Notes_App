import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useState } from "react";
import Card from "../components/Card";

type Props = { notes: Note[]; availableTags: Tag[] };
const Main = ({ notes, availableTags }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  return (
    <Container className="mx-auto py-5">
      {/* Üst Kısım */}
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center">
          <img width={45} src="/note_logo.png" alt="" />
          <h1>Notlar</h1>
        </div>
        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>
      {/* Form Alanı */}
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control onChange={(e) => setQuery(e.target.value)} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                isMulti
                className="text-black"
                options={availableTags}
                onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>

      {/* Not Listesi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
        {notes.map((note) => (
          <Col key={note.id}>
            <Card note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Main;
