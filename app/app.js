import Index from "@/pages/Index.jsx"; //Primary Sign in
import AdminPage from "@/pages/AdminPage.jsx"; //Admin Sign in
import SignUp from "@/pages/SignUp.jsx"; //Sign up page
import Admin from "@/pages/Admin.jsx"; //Administrator functions
import Management from "@/pages/edit.jsx"; //??
import ClientView from "@/pages/ClientView.jsx";
import UserTestPage from "@/pages/UserTestPage.jsx";
import DeveloperPage from "@/pages/DeveloperPage.jsx";


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
        <Route path="/Admin" component={Admin} />
        <Route path="/DeveloperPage" component={DeveloperPage} />
      </Switch>
    </Router>
  );
}

export default App;
