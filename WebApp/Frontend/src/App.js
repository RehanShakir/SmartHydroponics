import Routes from "./Routes";
import "./App.css";
// import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./api";
import { loadProfile } from "./redux/actions/auth.actions";
import { useEffect } from "react";
function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(loadProfile());
    }
  }, [dispatch, token]);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}
export default App;
