import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface IModalProps {
  title?: string
  description?: string
  trigger?: React.ReactNode
  triggerClassName?: string
  headerClassName?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  children: React.ReactNode
}

const Modal = (props: IModalProps) => {
  const {
    title = '',
    description,
    trigger,
    children,
    triggerClassName,
    headerClassName,
    contentClassName,
    titleClassName,
    descriptionClassName,
  } = props

  return (
    <Dialog>
      {trigger && (
        <DialogTrigger asChild className={triggerClassName}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className={contentClassName}>
        <DialogHeader className={headerClassName}>
          <DialogTitle className={titleClassName}>{title}</DialogTitle>
          {description && (
            <DialogDescription className={descriptionClassName}>{description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
