import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PosterPath = styled.img`
    width: 200px;
    height: auto;
    margin: 10px 5px;
`;

export const DetailsDiv = styled.div`
  display: flex;
  column-gap: 20px;
  border-bottom: 1px solid black;
`;

export const Side = styled.div`
  display: block;
`;

export const Line = styled.ul`
  border-bottom: 1px solid black;
`;

export const StyledBackLink = styled(Link)`
  margin-left: 5px;
  text-decoration: none;
  color: #0080ff;;
`;

export const LinkStyle = styled(Link)`
  color: #0080ff;
`;