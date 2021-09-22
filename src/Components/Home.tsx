import { Container, Form, FormControl, Button, Row } from "react-bootstrap";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Song {
  id: number;
  title: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: { id: number; name: string };
  album: { id: number; title: string; cover_xl: string };
}

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [query, setQuery] = useState("");
  const handleQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const fetchSongs = async (e?: FormEvent) => {
    e?.preventDefault();
    try {
      const search = query ? query : "muse";
      const url = process.env.REACT_APP_API_URL;
      const response = await fetch(url + "/search?q=" + search, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjY0Mzk4MTksImV4cCI6MTYyNzY0OTQxOX0.r_G81mw3I9g934aGyIO8AZbfkWxO_W7hS9Tlz9lYZNY",
        },
      });
      if (response.ok) {
        const fetchedContent = await response.json();
        setSongs(fetchedContent.data);
      } else {
        console.log("There was an error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <Container className="mt-5">
      <h1>Music Search Engine</h1>
      <Form className="d-flex mt-4" onSubmit={fetchSongs}>
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
          onChange={handleQuery}
          value={query}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <Row className="mt-4"></Row>
    </Container>
  );
};

export default Home;
