import { useRouteError } from "react-router-dom";
import SimpleLayout from "../components/SimpleLayout";
import StyledLink from "../components/StyledLink";
import { useState } from "react";

const ErrorPage = () => {
  const [expand, setExpand] = useState(false);
  const error = useRouteError();
  console.error(error);

  return (
    <SimpleLayout>
      <div className="h-full flex flex-col items-center justify-center">
        <span className="text-3xl">This place doesn't exist</span>
        <StyledLink
          className="border-2 rounded-lg p-2 py-1
        hover:border-slate-400 hover:bg-slate-400 transition-colors
        "
          to="/"
        >
          Take me Home
        </StyledLink>
        <div className="mt-10 flex flex-col">
          <button
            onClick={() => setExpand(!expand)}
            className="border-2 rounded-lg p-2 py-1"
          >
            {expand ? "Hide Error" : "Show Error"}
          </button>
          {expand && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </div>
      </div>
    </SimpleLayout>
  );
};

export default ErrorPage;
