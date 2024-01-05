import { ContainerInner, ContainerOuter } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-20 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
              &copy; {new Date().getFullYear()} NUS GPA Calculator. All rights
              reserved.
            </p>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
