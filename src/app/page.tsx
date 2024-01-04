import { Container } from "@/components/Container";
import { GPATable } from "@/components/GPATable";
import { InputForm } from "@/components/InputForm";

export default function Home() {
  return (
    <Container>
      <InputForm />
      <GPATable />
    </Container>
  );
}
