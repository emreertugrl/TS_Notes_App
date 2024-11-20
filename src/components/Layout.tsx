import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type Props = {
  notes: Note[];
};

const Layout = ({ notes }: Props) => {
  // urlden note'un idsini al
  const { id } = useParams();

  // id'si bilinen note'u dizide bul
  const found = notes.find((i) => i.id === id);

  // eğer yoksa anasayfaya yönlendir
  if (!found) return <Navigate to="/" replace />;
  // parent route içinde child route'u renderladık
  return <Outlet context={found} />;
};

export default Layout;
