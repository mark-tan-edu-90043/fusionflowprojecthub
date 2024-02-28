import Index from "@/pages/Index.jsx"; //Primary Sign in
import AdminPage from "@/pages/AdminPage.jsx"; //Admin Sign in
import SignUp from "@/pages/SignUp.jsx"; //Sign up page
import Admin from "@/pages/Admin.jsx"; //Administrator functions
import Management from "@/pages/edit.jsx"; //??
import ClientView from "@/pages/ClientView.jsx";
import UserTestPage from "@/pages/UserTestPage.jsx";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/AdminPage" component={AdminPage} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/management" component={Management} />
        <Route path="/ClientView" component={ClientView} />
        <Route path="/UserTestPage" component={UserTestPage} />
      </Switch>
    </Router>
  );
}

export default App;
