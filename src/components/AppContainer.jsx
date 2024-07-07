const AppContainer = ({ children, className }) => {
  return <section className={`w-full max-w-screen-lg px-2 mx-auto ${className}`}>{children}</section>;
};

export default AppContainer;
