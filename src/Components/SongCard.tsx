import { Card, Button } from "react-bootstrap";

interface Props {
  song: {
    id: number;
    title: string;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    preview: string;
    artist: { id: number; name: string };
    album: { id: number; title: string; cover_xl: string };
  };
}

const SongCard = ({ song }: Props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="dark">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default SongCard;
