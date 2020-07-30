import React,{useState} from "react";
import styled from "styled-components";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const DescripDiv = styled.div`

color:gainsboro;
`
const DescripTitle = styled.h4`
font-family: 'Anton', sans-serif;

`
const Rules = props => {

  return (
  <DescripDiv className="DescDiv">
    <DescripTitle className="image-title">Rules:</DescripTitle>
    </DescripDiv>
  );
};

export default Rules;
