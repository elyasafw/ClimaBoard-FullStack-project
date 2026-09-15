import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import UserProvider from "./store/UsersContext";

const App = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <AppRoutes />
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
