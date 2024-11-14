import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { v4 } from "uuid";
import { Tag } from "../types";

const CustomForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // inputlardaki verilere eriş
    const title = titleRef.current?.value;
    const markdown = textRef.current?.value;

    // todo global notlar state'ine kaydet
    console.log(title, markdown, selectedTags);
  };
  return (
    <Form onSubmit={handleSubmit}>
      {/* Başlık-Etiker Inputu */}
      <Row className="my-4">
        <Col>
          <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control ref={titleRef} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Etiketler</Form.Label>
            <ReactSelect
              options={selectedTags} //ekrana eklenmesi için
              // etiketleri silmek istediğimizde bunu kullanırız.
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              // select kısmına yazılanları oluşturmak için
              onCreateOption={(text: string) => {
                // etiket nesnesi
                const newTag = { label: text, value: v4() };
                console.log(newTag);

                // todo global state'e aktar

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
