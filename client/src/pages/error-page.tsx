import SimpleLayout from "../components/SimpleLayout";
import StyledLink from "../components/StyledLink";

const ErrorPage = () => {
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
      </div>
    </SimpleLayout>
  );
};

export default ErrorPage;
