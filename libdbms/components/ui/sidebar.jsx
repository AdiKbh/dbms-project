'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider.')
  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)

  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === 'function' ? value(open) : value

      if (onOpenChange) onOpenChange(openState)
      else _setOpen(openState)

      document.cookie =
        `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [onOpenChange, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((v) => !v)
      : setOpen((v) => !v)
  }, [isMobile, setOpen])

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const state = open ? 'expanded' : 'collapsed'

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div className={cn('bg-sidebar text-sidebar-foreground flex h-full w-[16rem] flex-col', className)} {...props}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          className="bg-sidebar text-sidebar-foreground w-[18rem] p-0 [&>button]:hidden"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Mobile sidebar</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="group peer hidden md:block" data-state={state}>
      <div className="w-[16rem] bg-transparent" />

      <div
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-[16rem] md:flex',
          side === 'left' ? 'left-0' : 'right-0',
          className
        )}
        {...props}
      >
        <div className="bg-sidebar flex h-full w-full flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(e) => {
        onClick?.(e)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
    </Button>
  )
}

/* ---------------- Remaining components (simplified JS versions) ---------------- */

function SidebarHeader(props) {
  return <div className="flex flex-col gap-2 p-2" {...props} />
}

function SidebarFooter(props) {
  return <div className="flex flex-col gap-2 p-2" {...props} />
}

function SidebarContent(props) {
  return <div className="flex flex-1 flex-col gap-2 overflow-auto" {...props} />
}

function SidebarGroup(props) {
  return <div className="flex flex-col p-2" {...props} />
}

function SidebarSeparator(props) {
  return <Separator className="mx-2" {...props} />
}

/* Simplified menu button (removed CVA typing complexity) */
function SidebarMenuButton({ className = '', isActive, ...props }) {
  return (
    <button
      data-active={isActive}
      className={cn(
        'flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-sidebar-accent',
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarSeparator,
  SidebarMenuButton,
  useSidebar,
}