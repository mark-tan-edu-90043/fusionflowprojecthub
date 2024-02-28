import Index from "./pages/Index"; //Primary Sign in
import AdminPage from "./pages/AdminPage"; //Admin Sign in
import SignUp from "./pages/SignUp"; //Sign up page
import Admin from "./pages/Admin"; //Administrator functions
import Management from "./pages/management"; //??
import ClientView from "./pages/ClientView";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/AdminPage" component={AdminPage} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/management" component={Management} />
        <Route path="/ClientView" component={ClientView} />
      </Switch>
    </Router>
  );
}

export default App;
