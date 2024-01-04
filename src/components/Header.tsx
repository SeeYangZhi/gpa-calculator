import { ContainerInner, ContainerOuter } from "@/components/Container";
import ModeToggleButton from "@/components/ModeToggleButton";

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  return (
    <>
      <header>
        <ContainerOuter>
          <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
            <ContainerInner>
              <div className="z-10 flex w-full max-w-5xl flex-wrap items-center justify-between font-mono text-sm md:flex-nowrap">
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  {title}
                </p>
                <ModeToggleButton />
              </div>
            </ContainerInner>
          </div>
        </ContainerOuter>
      </header>
    </>
  );
}
