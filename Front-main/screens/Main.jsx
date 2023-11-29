import { Provider as PaperProvider } from "react-native-paper";
import Navigation from "../Navigation";

export default function Main({ setIsSigned }) {
  return (
    <PaperProvider>
      <Navigation setIsSigned={setIsSigned} />
    </PaperProvider>
  );
}
