import { VariantProps } from 'class-variance-authority'
import { Loader2Icon } from 'lucide-react'
import * as React from 'react'
import { Button as BaseButton, buttonVariants } from '../button'

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, leftIcon, rightIcon, isLoading, asChild, ...props }, ref) => {
    return (
      <BaseButton {...props} ref={ref} asChild={asChild} disabled={isLoading || props.disabled}>
        {isLoading && (
          <span className="shrink-0 flex items-center justify-center">
            <Loader2Icon className="w-4 h-4 animate-spin text-white-100" />
          </span>
        )}
        {leftIcon && <span className="shrink-0 flex items-center justify-center">{leftIcon}</span>}
        {children && <span className="text-sm font-medium">{children}</span>}
        {rightIcon && (
          <span className="shrink-0 flex items-center justify-center">{rightIcon}</span>
        )}
      </BaseButton>
    )
  },
)
Button.displayName = 'Button'

export default Button
