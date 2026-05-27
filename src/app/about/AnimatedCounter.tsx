'use client';

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
}

export default function AnimatedCounter({ end, suffix = '' }: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(end);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
