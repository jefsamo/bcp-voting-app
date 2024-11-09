import { Title, Text, Container, Button, rem } from "@mantine/core";
import classes from "./HeroImageBackground.module.css";
import { IconArrowRight } from "@tabler/icons-react";

import { Dots } from "./Dots";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container className={classes.wrapper} size={1400} h="100vh">
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={classes.inner}>
          <Title className={classes.title}>
            Welcome to Sail Innovation Lab
            <br />
            <Text component="span" className={classes.highlight} inherit>
              Voting Platform
            </Text>{" "}
          </Title>
          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" className={classes.description}>
              A platform that enables sail tracks participants make consensus
              decisions.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              size="lg"
              w="200px"
              rightSection={
                <IconArrowRight style={{ width: rem(18), marginTop: "2px" }} />
              }
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Enter
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
