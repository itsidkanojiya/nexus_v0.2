const AppContainer = ({ className }) => {
  return <section className={`w-full max-w-screen-lg px-2 ${className}`}>{children}</section>;
};

export default AppContainer;
