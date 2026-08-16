import React, { forwardRef } from "react"

const motionProps = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileInView",
  "whileFocus",
  "whileDrag",
  "viewport",
  "layout",
  "layoutId",
  "layoutDependency",
  "onAnimationComplete",
  "onAnimationStart",
  "onHoverStart",
  "onHoverEnd",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onPan",
  "onPanStart",
  "onPanEnd",
  "onDrag",
  "onDragStart",
  "onDragEnd",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "custom",
])

function createMotionComponent(Tag: any) {
  const Component = forwardRef((props: any, ref) => {
    const cleanProps: any = {}
    for (const key in props) {
      if (!motionProps.has(key)) {
        cleanProps[key] = props[key]
      }
    }
    return <Tag ref={ref} {...cleanProps} />
  })
  Component.displayName = `motion.${typeof Tag === "string" ? Tag : "custom"}`
  return Component
}

export const motion = new Proxy(
  (Component: any) => createMotionComponent(Component),
  {
    get(_target, prop: string) {
      return createMotionComponent(prop)
    },
  }
) as any

export function AnimatePresence({ children }: { children?: React.ReactNode; mode?: string; initial?: boolean; custom?: any }) {
  return <>{children}</>
}

export function useScroll(_opts?: any) {
  return {
    scrollY: { get: () => 0, onChange: () => () => {} },
    scrollYProgress: { get: () => 0, onChange: () => () => {} },
    scrollX: { get: () => 0, onChange: () => () => {} },
    scrollXProgress: { get: () => 0, onChange: () => () => {} },
  }
}

export function useTransform(_val: any, _from: any, to?: any) {
  return typeof to === "function" ? to : to ? to[0] : 0
}

export function useSpring(val: any, _opts?: any) {
  return val
}

export function useInView(_ref?: any, _opts?: any) {
  return true
}

export function useAnimation() {
  return {
    start: async () => {},
    stop: () => {},
    set: () => {},
  }
}

export function useMotionValue(initial: any) {
  return {
    get: () => initial,
    set: () => {},
    onChange: () => () => {},
  }
}

export type Variants = Record<string, any>
export default motion
