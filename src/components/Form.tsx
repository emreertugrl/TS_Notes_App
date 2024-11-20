import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { v4 } from "uuid";
import { Tag } from "../types";
import { CreateProps } from "../pages/Create";

const CustomForm = ({
  availableTags,
  createTag,
  handleSubmit,
  title = "",
  markdown = "",
  tags = [],
}: CreateProps) => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const handleForm = (e: FormEvent) => {
    e.preventDefault();

    // inputlardaki verilere eriş
    const title = titleRef.current?.value || "";
    const markdown = textRef.current?.value || "";

    // global notlar state'ine kaydet
    handleSubmit({ title, markdown, tags: selectedTags });
    // anasayfaya yönlendir.
    navigate("/");
  };
  return (
    <Form onSubmit={handleForm}>
      {/* Başlık-Etiker Inputu */}
      <Row className="my-4">
        <Col>
          <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control ref={titleRef} defaultValue={title} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Etiketler</Form.Label>
            <ReactSelect
              options={availableTags}
              value={selectedTags} //ekrana eklenmesi için
              // etiketleri silmek istediğimizde bunu kullanırız.
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              // select kısmına yazılanları oluşturmak için
              onCreateOption={(text: string) => {
                // etiket nesnesi
                const newTag = { label: text, value: v4() };
                console.log(newTag);

                // todo global state'e aktar
                createTag(newTag);

                // seçili etiketler
                setSelectedTags([...selectedTags, newTag]);
              }}
              isMulti
              className="text-black"
            />
          </Form.Group>
        </Col>
      </Row>
      {/* içerik text area */}

      <Form.Group>
        <Form.Label>İçerik (Markdown destekler)</Form.Label>
        <Form.Control
          defaultValue={markdown}
          ref={textRef}
          as="textarea"
          style={{
            minHeight: "300px",
            maxHeight: "400px",
          }}
        />
      </Form.Group>
      {/* Butonlar */}
      <Stack
        direction="horizontal"
        className="justify-content-end mt-3 "
        gap={4}
      >
        <Link to={".."}>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Link>
        <Button type="submit">Kaydet</Button>
      </Stack>
    </Form>
  );
};

export default CustomForm;
