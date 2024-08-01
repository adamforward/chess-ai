import StyledLink from "./StyledLink";

const BottomNav = () => {
  return (
    <div className="flex gap-12 w-full justify-center mb-2">
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </div>
  );
};

export default BottomNav;
