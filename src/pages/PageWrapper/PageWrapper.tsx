import Banner from "components/Banner";
import "./PageWrapper.css";

interface WrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: WrapperProps): JSX.Element {
  return (
    <main className="relative overflow-y-auto h-screen flex flex-col py-4 px-4 md:px-8 bg-red-50">
      <Banner message="Trivia App - React Code Challenge" buttonLabel="Michael Cowan" buttonLink="https://mikey.software" />
      <div className="page__wrapper">
        <div className="page__container">{children}</div>
      </div>
    </main>
  );
}
