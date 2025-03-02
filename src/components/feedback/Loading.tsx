import { TLoading } from "src/types/shared";

type propsLoading = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
};

const Loading = ({ children, error, status }: propsLoading) => {
  if (status === "pending") {
    return <h1>Loading...</h1>;
  } else if (status === "failed") {
    return <h1>{error}</h1>;
  }

  return <>{children}</>;
};

export default Loading;
