import styled from "styled-components";

const GameList = ({ colVal, games }) => {
  return (
    <>
      <div className="row mt-2">
        {games?.map((game) => (
          <Link href={`/game/${game._id}`} className={`link-offset-2 link-underline link-underline-opacity-0 col-xl-${colVal ? colVal : 2} col-md-4 col-6 text-center mt-3 mb-3 mb-xl-4 mb-xxl-5`} key={game._id}>
            <Image className="my-3 rounded-4 img-fluid" src={game.image} alt={game.title} />
            <p className="fs-5">{game.title}</p>
            {game.discount ? (
              <div className="d-flex justify-content-between align-items-center px-3">
                <DiscPerc className="bg-success">
                  <span>-{game.discount.discount}%</span>
                </DiscPerc>
                <Price>
                  <OldPrice>IDR {game.price.toLocaleString()}</OldPrice>
                  <P>IDR {game.discountedPrice.toLocaleString()}</P>
                </Price>
              </div>
            ) : game.price > 0 ? (
              <P>IDR {game.price.toLocaleString()}</P>
            ) : (
              <P>Free</P>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

const Link = styled.a`
  transition: transform 0.3s;
  color: #eee;

  &:hover {
    transform: scale(1.1);
    color: #ffc639;
  }
`;

const Image = styled.img`
  transition: transform 0.3s;
  width: 75%;

  @media screen and (min-width: 1200px) {
    width: 100%;
  }
`;

const DiscPerc = styled.div`
  padding: 8px;
  border-radius: 10px;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;
`;

const OldPrice = styled.p`
  text-decoration: line-through;
  color: #aaa;
  margin-bottom: 5px;
`;

const P = styled.p`
  color: #aaa;
`;

export default GameList;
