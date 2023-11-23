import { Link } from "react-router-dom";

const DetailActivity = () => {
    return (
        <div>
            <h2>Your activity was created successfully</h2>
            <Link to="/home">
                ↩Go home
            </Link>
        </div>
    );
};

export default DetailActivity;