import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>404</h1>
            <h1> הדף לא קיים ...</h1>
            <br />
            <button onClick={() => navigate(-1)}>חזור</button>
        </>
    );
};

export default NotFoundPage;
