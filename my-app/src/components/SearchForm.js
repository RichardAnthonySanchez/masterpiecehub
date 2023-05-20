import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <Form onSubmit={handleSearch} className="mb-3">
      <Form.Group controlId="searchQuery">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;