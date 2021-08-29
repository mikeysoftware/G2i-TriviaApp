import Banner from "components/Banner";
import { useHistory } from "react-router-dom";

import "./PageWrapper.css";

interface WrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: WrapperProps): JSX.Element {
  const history = useHistory();

  function goToAboutPage() {
    history.push("/about");
  }

  return (
    <main className="relative overflow-y-auto h-screen flex flex-col py-4 px-4 md:px-8 bg-red-50">
      <Banner message="Trivia App - React Code Challenge" buttonLabel="Michael Cowan" buttonCallback={goToAboutPage} />
      <div className="page__wrapper">
        <div className="page__container">{children}</div>
      </div>
    </main>
  );
}
