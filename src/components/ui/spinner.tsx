"use client"

import { cn } from "@/lib/utils"
import { useCopy } from "@/components/ui/copy-provider"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const words = useCopy()
  return (
    <Loader2Icon data-slot="spinner" role="status" aria-label={words.loading} className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
