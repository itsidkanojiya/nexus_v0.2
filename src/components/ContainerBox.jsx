export default function ContainerBox({ children, className }) {
  return <section className={`max-w-screen-xl mx-auto px-2 ${className}`}>{children}</section>;
}
