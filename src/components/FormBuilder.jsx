import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import FormElement from './FormElement';
import SettingsPanel from './SettingsPanel';
import Image from '../assets/logo.png'

const FormBuilder = () => {
  const [elements, setElements] = useState([]);
  const [elementId, setElementId] = useState(1);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleAddElement = (type) => {
    const newElement = { id: `element-${elementId}`, type, value: '', label: type.charAt(0).toUpperCase() + type.slice(1), required: false };
    setElements([...elements, newElement]);
    setElementId(elementId + 1);
  };

  const handleRemoveElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
  };

  const handleChange = (id, value) => {
    const updatedElements = elements.map(element =>
      element.id === id ? { ...element, value } : element
    );
    setElements(updatedElements);
  };

  const handleDragStart = (index) => {
    const dragItem = elements[index];
    window.localStorage.setItem('dragItem', JSON.stringify(dragItem));
    window.localStorage.setItem('dragIndex', index);
  };

  const handleDrop = (index) => {
    const dragItem = JSON.parse(window.localStorage.getItem('dragItem'));
    const dragIndex = parseInt(window.localStorage.getItem('dragIndex'), 10);

    const updatedElements = [...elements];
    updatedElements.splice(dragIndex, 1);
    updatedElements.splice(index, 0, dragItem);

    setElements(updatedElements);
  };

  const handleSettingsOpen = (id) => {
    const element = elements.find(el => el.id === id);
    setSelectedElement(element);
  };

  const handleSettingsSave = (updatedElement) => {
    const updatedElements = elements.map(el => (el.id === updatedElement.id ? updatedElement : el));
    setElements(updatedElements);
    setSelectedElement(null);
  };

  const handleSettingsClose = () => {
    setSelectedElement(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = elements.reduce((data, element) => {
      data[element.id] = element.value;
      return data;
    }, {});
    console.log(formData);
  };

  return (
    <div>
      <div className="sidebar">
        <h3 className="p-3 border-bottom">Form Elements</h3>
        <a href="#" onClick={() => handleAddElement('email')}>
          <i className="btn btn-light mx-2 fas fa-envelope"></i> Email
        </a>
        <a href="#" onClick={() => handleAddElement('text')}>
          <i className="btn btn-light mx-2 fas fa-user"></i> Full Name
        </a>
        <a href="#" onClick={() => handleAddElement('address')}>
          <i className="btn btn-light mx-2 fas fa-address-card"></i> Address
        </a>
        <a href="#" onClick={() => handleAddElement('phone')}>
          <i className="btn btn-light mx-2 fas fa-phone"></i> Phone
        </a>
        <a href="#" onClick={() => handleAddElement('date')}>
          <i className="btn btn-light mx-2 fas fa-calendar-alt"></i> Date Picker
        </a>
        <a href="#" onClick={() => handleAddElement('datetime')}>
          <i className="btn btn-light mx-2 fas fa-clock"></i> Appointment
        </a>
      </div>

      <div className="top-header">
        <img src="src/assets/logo.png" alt="Logo" />
        <div className="btn-group">
          <button className="btn text-light">
            <i className="fas fa-globe"></i>
          </button>
          <button className="btn text-light"> Help</button>
          <button className="btn text-light"> About</button>
          <button className="btn btn-primary rounded">Sign in</button>
        </div>
      </div>

      <div className="second-header">
        |<button className="btn text-light">Build</button>
        |<button className="btn text-light">View</button>
        |<button className="btn text-light">Save</button>|
      </div>

      <div className="content">
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card>
                <Card.Header className="text-center">
                  <h3><span contentEditable='true'>Form Name</span></h3>
                  <p>Fill out the form carefully for registration</p>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    {elements.map((element, index) => (
                      <FormElement
                        key={element.id}
                        element={element}
                        index={index}
                        onDelete={handleRemoveElement}
                        onSettingsOpen={handleSettingsOpen}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onChange={handleChange}
                      />
                    ))}
                    <div className="text-center m-auto border-0">
                      <Button type="submit" className="btn m-auto btn-primary">
                        <i className="fas fa-paper-plane"></i> Submit
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {selectedElement && (
        <SettingsPanel
          element={selectedElement}
          onSave={handleSettingsSave}
          onClose={handleSettingsClose}
        />
      )}
    </div>
  );
};

export default FormBuilder;

