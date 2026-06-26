import { Link } from "react-router-dom";

export const QuestionForm = ({ question, linkTo, linkQuestion }) => {
  return (
    <div className="mt-4 text-center">
      <div className="flex flex-wrap justify-center gap-2">
        <span>{question}</span>
        <Link
          className="hover:text-purple-400 transition-colors duration-200"
          to={linkTo}
        >
          {linkQuestion}
        </Link>
      </div>
    </div>
  );
};
