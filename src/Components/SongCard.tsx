import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
  song: {
    id: number;
    title: string;
    artist: { id: number; name: string };
    album: { id: number; title: string; cover_medium: string };
    rank: number;
    duration: number;
    preview: string;
  };
}

const SongCard = ({ song }: Props) => {
  return (
    <Card>
      <Card.Img variant="top" src={song.album.cover_medium} />
      <Card.Body>
        <Card.Title>{song.title}</Card.Title>
        <Card.Text>
          <strong>Artist: </strong>
          <span>{song.artist.name}</span> <br />
          <strong>Album: </strong>
          <span>{song.album.title}</span> <br />
          <strong>Rank: </strong>
          <span>{song.rank}</span> <br />
          <strong>Duration: </strong>
          <span>{song.duration}</span>
        </Card.Text>
        <Link to={`/Detail/${song.id}`} className="me-3 btn btn-dark">
          Detail
        </Link>
        <a
          className="btn btn-success"
          href={song.preview}
          target="_blank"
          rel="noreferrer"
        >
          Preview
        </a>
      </Card.Body>
    </Card>
  );
};

export default SongCard;
