import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ReactNode } from 'react'

interface IDropdown {
  isModal?: boolean
  label?: string
  trigger?: ReactNode
  children: ReactNode
  alignment?: 'start' | 'center' | 'end'
  menuLabelClassName?: string
  menuContentClassName?: string
}

const Dropdown = ({
  isModal = false,
  label,
  trigger,
  alignment,
  menuContentClassName,
  menuLabelClassName,
  children,
}: IDropdown) => {
  return (
    <DropdownMenu modal={isModal}>
      {trigger && <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>}
      <DropdownMenuContent sideOffset={8} align={alignment} className={menuContentClassName}>
        {label && <DropdownMenuLabel className={menuLabelClassName}>{label}</DropdownMenuLabel>}
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
