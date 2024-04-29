import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token: any = searchParams.get("token");

  useEffect(() => {
    localStorage.setItem("token", token);

    window.location.replace("/home");
  }, []);

  return <div></div>;
};

export default Verify;
