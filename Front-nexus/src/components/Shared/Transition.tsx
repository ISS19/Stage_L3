import { useContext } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { SwitchTransition, Transition } from "react-transition-group";

import TransitionContext from "@/contexts/TransitionContext";

interface TransitionComponentProps {
  children: React.ReactNode;
}

const TransitionComponent: React.FC<TransitionComponentProps> = ({
  children,
}) => {
  const router = useRouter();
  const { toggleCompleted } = useContext(TransitionContext);

  return (
    <SwitchTransition>
      <Transition
        key={router.pathname}
        timeout={500}
        onEnter={(node: HTMLElement) => {
          toggleCompleted(false);
          gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
          gsap
            .timeline({
              paused: true,
              onComplete: () => toggleCompleted(true),
            })
            .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
            .to(node, { scale: 1, duration: 0.25 })
            .play();
        }}
        onExit={(node: HTMLElement) => {
          gsap
            .timeline({ paused: true })
            .to(node, { scale: 0.8, duration: 0.2 })
            .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
