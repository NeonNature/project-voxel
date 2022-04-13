import * as React from "react";
import "../styles/global.scss";
import { Helmet } from "react-helmet";
import Three from "../components/three";

const IndexPage = () => (
  <>
    <Helmet>
      <html lang="en" />
      <title>Min Maung Maung - Fullstack Developer</title>
      <meta name="description" content="Portfolio Website of Min Maung Maung" />
    </Helmet>
    <Three />
  </>
);

export default IndexPage;
