import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
    margin: 0 auto;
    padding: 0 8px;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 16px;
    padding: 8px 0;
    margin-bottom: 16px;
    border-bottom: 1px solid black;
`;

export const StyledLink = styled(NavLink)`
  color: black;
  margin-left: 20px;
  text-decoration: none;

  &.active {
    color: red;
    margin-left: 20px;
    text-decoration: underline;
  }

  &:hover {
    text-decoration: underline;
  }
`;