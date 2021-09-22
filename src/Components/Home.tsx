import {
  Container,
  Form,
  FormControl,
  Button,
  Row,
  Alert,
  Col,
} from "react-bootstrap";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Loading from "./Loading";
import SongCard from "./SongCard";

interface Data {
  songs: [];
  loading: boolean;
  error: boolean;
}

const Home = () => {
  const [data, setData] = useState<Data>({
    songs: [],
    loading: false,
    error: false,
  });
  const [query, setQuery] = useState("");
  const handleQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const fetchSongs = async (e?: FormEvent) => {
    e?.preventDefault();
    try {
      setData({ songs: [], loading: true, error: false });
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

        setData({ songs: fetchedContent.data, loading: false, error: false });
      } else {
        setData({ songs: [], loading: false, error: true });
        console.log("There was an error");
      }
    } catch (error) {
      setData({ songs: [], loading: false, error: true });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      <h1>Music Search Engine</h1>
      <Form className="d-flex mt-4" onSubmit={(e) => fetchSongs(e)}>
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
      <Row className="mt-4">
        {data.loading ? (
          <Loading />
        ) : data.error ? (
          <Alert variant="danger">Something went wrong.</Alert>
        ) : (
          data.songs.map((song, i) => (
            <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={i}>
              <SongCard song={song} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;
