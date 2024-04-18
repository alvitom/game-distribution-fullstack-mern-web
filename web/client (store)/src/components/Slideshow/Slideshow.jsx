import { useEffect, useState } from "react";
import styled from "styled-components";

const Slideshow = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);

    return () => clearInterval(interval);
  });

  const indexState = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <>
      <CarouselContainer className="pb-5">
        <Carousel className="row mt-5 justify-content-center">
          {games.map((game, index) => {
            return index === currentIndex ? (
              <Link href={`/game/${game._id}`} className={`link-offset-2 link-underline link-underline-opacity-0 text-center mb-4`} key={game._id}>
                <Image src={game.imageHero} alt={game.title} className="rounded-4 img-fluid" />
                <h1 className="my-3">{game.title}</h1>
              </Link>
            ) : null;
          })}
        </Carousel>
        <div className="d-flex justify-content-center gap-3 gap-md-4">
          {games.map((game, index) => {
            return index === currentIndex ? (
              <SlideBtn className="border rounded bg-secondary" key={game.id}></SlideBtn>
            ) : (
              <SlideBtn className="border rounded bg-transparent" onClick={currentIndex !== index ? () => indexState(index) : null} key={game.id}></SlideBtn>
            );
          })}
        </div>
      </CarouselContainer>
    </>
  );
};

const CarouselContainer = styled.div`
  position: relative;
`;

const Carousel = styled.div`
  display: flex;
  overflow: hidden;
`;

const Link = styled.a`
  transition: transform 0.3s;
  color: #eee;
  width: 75%;

  &:hover {
    color: #ffc639;
  }

  @media screen and (min-width: 768px) {
    width: 50%;
  }

  @media screen and (min-width: 1400px) {
    width: 75%;
  }
`;

const Image = styled.img`
  transition: opacity 0.5s ease-in-out;
`;

const SlideBtn = styled.button`
  width: 14px;
  height: 14px;

  @media screen and (min-width: 576px) {
    width: 16px;
    height: 16px;
  }

  @media screen and (min-width: 768px) {
    width: 18px;
    height: 18px;
  }

  @media screen and (min-width: 1200px) {
    width: 20px;
    height: 20px;
  }
`;

export default Slideshow;
