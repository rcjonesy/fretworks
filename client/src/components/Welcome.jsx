import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Fretworks</h1>
      <p><Link to={'/login'}>Get Started</Link></p>
    </div>
  );
};
