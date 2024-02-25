import { AuthContextProvider } from "./auth-context.js";
 
const Layout = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
 
export default Layout;