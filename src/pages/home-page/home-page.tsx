import { Calendar } from "../../components/calendar/calendar";
import { Header } from "../../components/header/header";

export function HomePage(): JSX.Element {
  
  return (
    <div>
      <Header />
      <Calendar/>
    </div>
  )
}