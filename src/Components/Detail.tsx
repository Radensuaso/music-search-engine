import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

interface Song {
  id: number;
  title: string;
  link: string;
  artist: { id: number; name: string };
  album: { id: number; title: string; cover_big: string };
  rank: number;
  duration: number;
  preview: string;
  track_position: string;
  release_date: string;
  explicit_lyrics: string;
}

interface Data {
  song: Song | null;
  loading: boolean;
  error: boolean;
}

interface Params {
  songId: string;
}

const Detail = () => {
  const [data, setData] = useState<Data>({
    song: null,
    loading: false,
    error: false,
  });
  const { song, loading, error } = data;

  const { songId }: Params = useParams();

  const fetchSong = async () => {
    try {
      setData({ song: null, loading: true, error: false });
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/track/${songId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGRjNjA5ZmIzNTgxNzAwMTVjMjI3MGMiLCJpYXQiOjE2MjY0Mzk4MTksImV4cCI6MTYyNzY0OTQxOX0.r_G81mw3I9g934aGyIO8AZbfkWxO_W7hS9Tlz9lYZNY",
          },
        }
      );
      if (response.ok) {
        const fetchedContent = await response.json();
        console.log(fetchedContent);

        setData({ song: fetchedContent, loading: false, error: false });
      } else {
        setData({ song: null, loading: false, error: true });
        console.log("There was an error");
      }
    } catch (error) {
      setData({ song: null, loading: false, error: true });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="danger">Something went wrong.</Alert>
      ) : (
        <>
          <h2 className="text-center">{song?.title}</h2>
          <Row className="justify-content-center">
            <Col
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className="d-flex flex-column align-items-center"
            >
              <Image src={song?.album.cover_big} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Detail;
