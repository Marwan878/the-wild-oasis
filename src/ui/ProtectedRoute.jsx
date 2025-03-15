import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }
  if (isAuthenticated) {
    return children;
  }
}
