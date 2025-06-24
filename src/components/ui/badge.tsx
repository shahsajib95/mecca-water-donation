import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        Open: "border-transparent bg-indigo-400 text-destructive-foreground",
        Pending: "border-transparent bg-amber-400 text-destructive-foreground",
        open: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        InProgress: "border-transparent bg-purple-400 text-destructive-foreground",
        Completed: "border-transparent bg-green-400 text-destructive-foreground",
        completed: "border-transparent bg-green-400 text-destructive-foreground",
        Approve: "border-transparent bg-green-400 text-destructive-foreground",
        Verified: "border-transparent bg-green-400 text-destructive-foreground",
        Approved: "border-transparent bg-green-400 text-destructive-foreground",
        paid: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        approved: "border-transparent bg-green-400 text-destructive-foreground",
        Reject: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        rejected: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
