import { useParams } from "react-router";

const TodoDetail = () => {
  const params = useParams();
  return <div>TodoDetail {params.id}</div>;
};

export default TodoDetail;
