import styled from "styled-components";

const Slideshow = () => {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-9">
            <a href="">
              <Jumbotron src="https://cdn2.unrealengine.com/egs-ac-mirage-carousel-desktop-1920x1080-9380e8fef189.jpg?h=720&quality=medium&resize=1&w=1280" alt="" className="img-fluid" />
            </a>
          </div>
          <div class="col-md-3">
            <UnorderedList>
              <li class="list-slide">
                <Anchor href="">
                  <ListImage src="https://cdn2.unrealengine.com/egs-ac-mirage-carousel-thumb-1200x1600-5f3a4c128d10.jpg?h=128&quality=medium&resize=1&w=96" alt="" />
                  <p>Assassin's Creed Mirage</p>
                </Anchor>
              </li>
              <li class="list-slide">
                <Anchor href="">
                  <ListImage src="https://cdn2.unrealengine.com/egs-fc24-carousel-thumb-1200x1600-362396296322.jpg?h=128&quality=medium&resize=1&w=96" alt="" />
                  <p>EA SPORTS FC™ 24</p>
                </Anchor>
              </li>
              <li class="list-slide">
                <Anchor href="">
                  <ListImage src="https://cdn2.unrealengine.com/egs-lords-of-the-fallen-carousel-thumb-1200x1600-d457b5a8325e.jpg?h=128&quality=medium&resize=1&w=96" alt="" />
                  <p>Lords of the Fallen</p>
                </Anchor>
              </li>
              <li class="list-slide">
                <Anchor href="">
                  <ListImage src="https://cdn2.unrealengine.com/egs-sonic-superstars-carousel-thumb-2-1200x1600-69999f3ebb76.jpg?h=128&quality=medium&resize=1&w=96" alt="" />
                  <p>Sonic Superstars</p>
                </Anchor>
              </li>
              <li class="list-slide">
                <Anchor href="">
                  <ListImage src="https://cdn2.unrealengine.com/egs-witchfire-carousel-thumb-315x399-16d19218c241.png?h=128&quality=medium&resize=1&w=96" alt="" />
                  <p>Witchfire</p>
                </Anchor>
              </li>
              <li class="list-slide">
                <Anchor href="">
                  <ListImage src="https://cdn2.unrealengine.com/en-egs-honkai-star-rail-1-4-carousel-thumb-1200x1600-9b0a3f4752eb.jpg?h=128&quality=medium&resize=1&w=96" alt="" />
                  <p>Honkai: Star Rail</p>
                </Anchor>
              </li>
            </UnorderedList>
          </div>
        </div>
      </div>
    </>
  );
};

const Jumbotron = styled.img`
  border-radius: 10px;
`;

const UnorderedList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  gap: 10px;

  &:hover {
    background-color: #2a2a2a;
  }
`;

const ListImage = styled.img`
  width: 40px;
`;

export default Slideshow;
