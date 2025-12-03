import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap border transition-all duration-200 cursor-pointer disabled:cursor-not-allowed rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-rgba10-150 text-white-100 border-rgba255-200 hover:bg-rgba182-100',
        primary: 'bg-green-100 text-darkblue-100',
        red: 'bg-red-200 text-white-100 border-rgba255-300 hover:bg-red-300',
        blue: 'bg-blue-200 text-white-100 border-rgba255-300',
        secondary: 'bg-rgba10-100 border-rgba255-200 text-white-100 hover:bg-rgba255-100',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
