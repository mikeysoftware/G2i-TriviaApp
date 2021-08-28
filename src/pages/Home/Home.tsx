// Redux
import useStoreSelector from "hooks/useStoreSelector";
import { getQuizSettings } from "store/Slices/Quiz.Slice";

export default function Home(): JSX.Element {
  const settings = useStoreSelector(getQuizSettings);
  console.log(settings);

  return <div>Home</div>;
}
