import { useEffect, useState } from "react";
import "./App.css";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const sampleTodos = [
  { title: "buy groseries", done: false },
  { title: "Do laundry", done: false },
  { title: "Clean The house", done: true },
  { title: "Go for a run", done: true },
];

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const save = (o) => (localStorage["data"] = JSON.stringify(o));

  useEffect(() => {
    setTodos(
      localStorage["data"] ? JSON.parse(localStorage["data"]) : sampleTodos
    );
  }, []);

  const handleSubmit = function (e) {
    e.preventDefault();
    const newTodos = [...todos];
    const firstDoneIndex = newTodos.findIndex((x) => x.done);
    const targetIndex = firstDoneIndex < 0 ? newTodos.length : firstDoneIndex;
    newTodos.splice(targetIndex, 0, { title, done: false });
    setTodos(newTodos);
    setTitle("");
    save(newTodos);
  };

  const handleCheck = function (event, index) {
    const newTodos = [...todos];
    newTodos[index].done = event.target.checked;
    newTodos.sort((a, b) => a.done - b.done);
    setTodos(newTodos);
    save(newTodos);
  };
  const handleDelete = function (event, index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    save(newTodos);
  };
  return (
    <>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col sm={11} md={8} lg={6}>
            <h1>To - Do List {title}</h1>
            <Form onSubmit={handleSubmit}>
              <InputGroup size="lg" className="mb-3">
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="enter a new task"
                  required
                />
                <Button type="submit" variant="outline-secondary">
                  <i class="fa-solid fa-plus"></i>
                </Button>
              </InputGroup>
            </Form>
            <div>
              {todos.map((x, i) => (
                <div key={i} className="d-flex align-items-center py-2">
                  <input
                    className="me-2 todoCheck"
                    type="checkbox"
                    checked={x.done}
                    id={"todo-" + i}
                    onChange={(e) => handleCheck(e, i)}
                  />
                  <label className="lead" htmlFor={"todo-" + i}>
                    {x.title}
                  </label>
                  <Button
                    className="ms-auto"
                    onClick={(e) => handleDelete(e, i)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
