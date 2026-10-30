"use client";

import * as React from "react";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  SearchIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ButtonExamples,
  ButtonIconMatrix,
  ButtonMasterMatrix,
  ButtonWithIconsMatrix,
} from "@/components/docs/button-docs";
import {
  confirmMarkPreview,
  feedbackToasterPreview,
  notifyPreview,
  outcomePreview,
  outcomeVariants,
  statusLinePreview,
  statusLineVariants,
  statusMarkPreview,
} from "@/components/docs/feedback-docs";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Banner } from "@/components/ui/banner";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
} from "@/components/ui/description-list";
import { DocumentSlot } from "@/components/ui/document-slot";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SessionTimeout } from "@/components/ui/session-timeout";
import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import type { ComponentDoc } from "@/lib/component-doc-types";

function SessionTimeoutDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Show session timeout
      </Button>
      <SessionTimeout
        open={open}
        onOpenChange={setOpen}
        secondsRemaining={119}
        onStaySignedIn={() => setOpen(false)}
        onSignOut={() => setOpen(false)}
      />
    </div>
  );
}

export const componentRegistry: Record<string, ComponentDoc> = {
  "status-mark": {
    slug: "status-mark",
    title: "Status mark",
    description:
      "The one mark every outcome uses: a solid disc with a glyph, in six tones and nine sizes. Its motion is budgeted by size.",
    importPath: "@/components/ui/status-mark",
    whenToUse: [
      "Inside the feedback pieces (outcome header, status line, toast, tally). Screens rarely place it directly.",
      "Directly only for a 14px mark in a Badge (it fits itself) or a mark beside a tally line.",
      "Tones: success it happened · error it did not · warning it happened with a catch · info sent, not decided · neutral not news · danger the question before a removal.",
    ],
    tokens: ["success", "destructive", "warning", "info", "surface-sunken", "input", "destructive-muted", "destructive-ink"],
    usageNotes: [
      "44px and up plays the full sequence, 620 to 750ms: the disc pops, then the tick draws, the cross springs stroke by stroke, or the ! drops and sways. It waits HERO_START (160ms) and holds until painted, so the motion is not lost while the window settles.",
      "Every status component needs src/app/feedback.css imported once in the product's global stylesheet; the registry install carries it.",
      "Smaller marks pop in 250ms. A tick draws itself inside the disc (280ms, from 120ms); any other glyph scales in after it.",
      "Success rings once at hero size; warning sways with a soft ring. Never loop: a pulse that never stops reads as still going.",
      "still: no motion and no announcement. Pass it to every mark after the first on a screen, and to anything already true when the screen opens.",
      "reject: one small shake after a hero error mark lands, only when the person's own input was refused.",
      "delay moves the whole mark, glyph included, so marks that belong together play in order.",
      "Neutral and danger marks always show an icon: pass the act's own (lock, trash, user-x).",
    ],
    doItems: [
      "Keep one animated mark per screen; everything else is still.",
      "Give every neutral mark the act's icon.",
    ],
    dontItems: [
      "Draw your own disc, tick or tinted circle for an outcome.",
      "Shake on a system failure. A shake reads as you did it wrong.",
    ],
    preview: statusMarkPreview,
  },

  outcome: {
    slug: "outcome",
    title: "Outcome",
    description:
      "The takeover: an act that reaches the court, moves money or adds a signature ends with the mark, the title under it, and the facts below, in the same dialog.",
    importPath: "@/components/ui/outcome",
    whenToUse: [
      "OutcomeHeader at the top of the dialog the act happened in, when it finished or failed.",
      "OutcomeSummary for the facts under it; OutcomeAmount to label any amount (Amount paid).",
      "OutcomeTally when some went through and some did not: one marked line per outcome, the failed share striped.",
      "PageOutcome when the whole page is the outcome or a dead end (account ready, page could not load, link expired).",
    ],
    tokens: ["success-muted", "destructive-muted", "warning-muted", "info-muted", "surface-sunken", "hairline", "card"],
    usageNotes: [
      "titleFrom: dialog in a Dialog whose header the outcome replaces, alert-dialog in an AlertDialog that turns into its result, plain elsewhere.",
      "The title always sits under the mark, never in a header above it.",
      "Every outcome closes on the footer band (DialogFooter, surface-sunken), with the buttons on it.",
      "Use DialogContent pinned with DialogBody: header and footer stay put, only the middle scrolls.",
      "compact on phones: a 60px mark and a title-s title, full size from sm up.",
      "Partial result: tone neutral with a checklist icon, never the big tick (reads as all well) or the ! (reads as alarm).",
      "Payment outcomes lead with the amount. Waiting on the person (sign later, pay later) is neutral with a clock; waiting on someone else is info.",
      "focusTitle when it replaces a stage in an already-open dialog. Two outcome stages in one dialog each need their own key.",
      "The band fades from a status muted fill into the surface, and page outcomes sit on a soft radial glow of it: a blend of two opaque tokens, the one exception to rule 6 (see Status & feedback).",
    ],
    doItems: [
      "Keep the product's own words; label an unlabelled amount.",
      "Say what did not happen and what to do: Nothing was paid; try again.",
    ],
    dontItems: [
      "Add a button the flow did not have.",
      "Use it for a quick act where the page stays put. That is a toast.",
      "Retired for outcomes: the tinted disc header, the thin status strip on a card, solid green slabs, the receipt disc, and Banner, Alert or toast.success used as a confirmation.",
    ],
    preview: outcomePreview,
    variantSections: outcomeVariants,
  },

  "status-line": {
    slug: "status-line",
    title: "Status line",
    description:
      "Feedback inside a page or an open dialog: one white line with a straight rail in its tone. Also the field error, the badge mark and the landing highlight.",
    importPath: "@/components/ui/status-line",
    whenToUse: [
      "StatusLine for a note inside a page or dialog: a result that stays, a load error with Try again, a standing warning. It stays as long as what it says is true; it has no close and no timer.",
      "StatusFieldControl + StatusFieldError + useRefusal when the person's own input was refused. Missing input is never a toast.",
      "A 14px StatusMark inside a Badge for a standing state on a row (Signed, Overdue). Badge sets the inset itself. Pass still to every badge already true on load.",
      "LANDING on the row a dialog changed, once, when the dialog closes onto the list.",
    ],
    tokens: ["card", "hairline", "success", "destructive", "warning", "info", "input", "destructive-ink"],
    usageNotes: [
      "The rail is straight, full height and flush left, clipped by the corner radius. It never bends with it.",
      "An animated line is a live region (status, or alert for errors). A still line is not, so a line already true when the screen opened is not announced.",
      "Field refusal: focus moves into the field and its red ring grows in; the error line opens its own room and drops in under the field. A repeat press shakes the field once and replays the line. Call reset once the input is valid.",
      "A mark in a pill is concentric: Badge gives a 14px mark equal inset at the top, bottom and end.",
    ],
    doItems: [
      "Use it inside a dialog for a failure; a toast behind a dialog cannot be closed.",
      "Pass still when a toast on the same screen already said it.",
    ],
    dontItems: [
      "Add a close button or click-away: a line leaves when what it says stops being true.",
      "Use Banner or Alert as a success or failure confirmation.",
    ],
    preview: statusLinePreview,
    variantSections: statusLineVariants,
  },

  "confirm-mark": {
    slug: "confirm-mark",
    title: "Confirm mark",
    description:
      "The mark and the lock line for an AlertDialog that asks before a risky act: a removal, a discard, or a normal act that cannot be taken back.",
    importPath: "@/components/ui/confirm-mark",
    whenToUse: [
      "danger with the act's icon for removals and discards. The confirm button is variant destructive (soft red), never destructive-solid.",
      "Neutral with the act's icon for normal acts that cannot be taken back (sign, pay, file). Not a warning: signing is the job. The button stays primary.",
      "IrreversibleNote for This cannot be undone / reversed, as its own line with a lock.",
    ],
    tokens: ["destructive-muted", "destructive-ink", "surface-sunken", "input", "muted-foreground"],
    usageNotes: [
      "The mark fades and scales in (380ms), with no rotation.",
      "The lock line sits 12px under the description and follows its alignment: centred on a phone, left from sm.",
    ],
    doItems: ["Name the consequence in the description; the lock line only says it cannot be taken back."],
    dontItems: ["Use a warning tone for an act that is simply irreversible."],
    preview: confirmMarkPreview,
  },

  notify: {
    slug: "notify",
    title: "Notify",
    description:
      "The product's toasts for quick acts where the page stays put. White card, solid mark, a straight rail, raised in dark. Raise them through notify, never toast() directly.",
    importPath: "@/components/ui/notify",
    whenToUse: [
      "notify.success for a quick act that worked (access given, reminder sent).",
      "notify.error for an act raised from a page that did not happen.",
      "notify.warning only where the product already treats the thing as a warning.",
      "notify.neutral for news that is not news (a draft saved, a step not open yet), with the act's icon.",
    ],
    tokens: ["card", "surface-raised", "border", "success", "destructive", "warning", "input"],
    usageNotes: [
      "Success, warning and neutral last 2.75s, show a thin timer bar, pause while the pointer is over them, and leave on any press on the page outside the toasts.",
      "Error toasts stay until closed, carry a close button and ignore page presses. Before this system they left after 4s with no close, so an error could vanish unread.",
      "The same error again never stacks a copy: the old card leaves and the error comes up from the bottom afresh about 120ms later, so a retry that failed again reads as new news. Different errors still stack.",
      "notify.error while a dialog is open waits for the dialog to close; a toast behind a dialog cannot be closed. Say the failure inside the dialog instead.",
      "Mount FeedbackToaster once per area; it carries the placement, fills and click-away.",
    ],
    doItems: ["Keep a toast to one short title, with one line of detail at most."],
    dontItems: [
      "Use a toast for missing input. Point at the field.",
      "Call toast.success, toast.error or toast() from sonner directly.",
    ],
    preview: notifyPreview,
  },

  "feedback-toaster": {
    slug: "feedback-toaster",
    title: "Feedback toaster",
    description:
      "The toaster notify draws into: bottom centre, 380px wide, 56px up (64px and full width on a phone), click-away for every toast but errors, and a raised surface in dark.",
    importPath: "@/components/ui/feedback-toaster",
    whenToUse: [
      "Mount once per product area, instead of the Toaster primitive.",
      "Pair with notify; the two share the click-away list.",
    ],
    tokens: ["card", "surface-raised", "border"],
    usageNotes: [
      "Toaster in sonner.tsx stays the upgradeable registry primitive; the feedback system's decisions are composed here.",
      "In dark the toast lifts to surface-raised with a full border; on popover alone it disappears into the page.",
    ],
    dontItems: ["Mount it twice in one area: the toasts would draw twice."],
    preview: feedbackToasterPreview,
  },

  button: {
    slug: "button",
    title: "Button",
    description:
      "Actions, one press — navigation between pages is a link, not a button. Exactly one teal default per view; status solids rationed to one, only when the action IS the status. Labels: verb first, sentence case.",
    importPath: "@/components/ui/button",
    whenToUse: [
      "Trigger an action (submit, open a dialog, apply a filter) — not for page navigation.",
      "Use exactly one default (teal) button per view to preserve hierarchy.",
      "Removals and discards use soft destructive, confirmed in an Alert Dialog with a Confirm mark. Keep destructive-solid out of confirm dialogs.",
    ],
    tokens: [
      "primary",
      "primary-hover",
      "secondary",
      "secondary-hover",
      "destructive",
      "destructive-muted",
      "success",
      "warning",
      "warning-ink",
      "info",
      "accent",
      "accent-strong",
      "input",
      "ring",
      "focus-ring-destructive",
    ],
    usageNotes: [
      "Props: variant · size · asChild. State (hover / focus / disabled) is CSS/DOM — not a prop.",
      "variant: default | outline | secondary | ghost | destructive | destructive-solid | success | warning | info | destructive-ghost | link.",
      "size: xs 32 · sm 36 · default 40 · lg 44. Icon-only: icon-xs · icon-sm · icon · icon-lg.",
      "destructive is the soft/at-rest treatment; destructive-solid only for a confirmed irreversible action.",
      "success / warning / info are solid treatments — the action IS the status.",
      "warning carries a warning-ink border because the yellow fill alone is only 1.54:1 on the page.",
      "outline and ghost hover to accent; engaged (aria-expanded) uses accent-strong. Outline border is always input.",
      "Icon-only buttons need an accessible name (aria-label).",
      "Figma masters: Button + Button Icon on the Button page.",
    ],
    doItems: [
      "Use primary for the single highest-emphasis action.",
      "Use outline/ghost for secondary or tertiary actions.",
      "Use LG 44px for citizen-facing primary actions.",
    ],
    dontItems: [
      "Place multiple primary buttons side by side competing for attention.",
      "Hardcode button background colors outside the variants.",
      "Use a button for navigation between pages — use a link.",
    ],
    previewLabel: "Examples",
    variantsLabel: "Component masters",
    preview: <ButtonExamples />,
    variantSections: [
      {
        label: "Button — variant × size × state (Default · Hover · Focus · Disabled)",
        className: "items-stretch justify-start overflow-x-auto",
        content: <ButtonMasterMatrix />,
      },
      {
        label: "Button Icon — icon-only × variant × size × state",
        className: "items-stretch justify-start overflow-x-auto",
        content: <ButtonIconMatrix />,
      },
      {
        label: "With icons — icon start · icon end · both",
        className: "items-stretch justify-start overflow-x-auto",
        content: <ButtonWithIconsMatrix />,
      },
    ],
  },

  badge: {
    slug: "badge",
    title: "Badge",
    description:
      "Compact, non-interactive label for status or metadata. Not a button — it never triggers an action on its own.",
    importPath: "@/components/ui/badge",
    whenToUse: [
      "Mark a status value in a table row or card header (Paid, Pending, Draft).",
      "Show a count or category tag next to a heading.",
      "Use Alert when the status needs an explanation — a badge is a label, not a message.",
    ],
    tokens: [
      "primary",
      "secondary",
      "destructive",
      "success-muted",
      "warning-muted",
      "info-muted",
      "border",
    ],
    usageNotes: [
      "variant: default · secondary · destructive · success · warning · info · outline · ghost · link.",
      "success / warning / info / destructive render the opaque muted tint pair — badges are metadata, not an action, so they never take the solid treatment.",
      "Fixed height is h-6 (24px); widen with padding, don't override the height.",
      "asChild renders the badge as its child (e.g. a Link) for the rare case it needs to be clickable.",
    ],
    doItems: [
      "Keep label copy to one or two words.",
      "Match the variant to the status's real severity, not the closest-looking color.",
    ],
    dontItems: [
      "Nest an interactive control (button, link) inside a badge.",
      "Use the default (brand) badge for status — it's teal, reserved for counts and highlights.",
    ],
    preview: (
      <>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </>
    ),
  },

  alert: {
    slug: "alert",
    title: "Alert",
    description:
      "Inline feedback that stays on the page. Use for persistent notices, not transient toasts. Prefer Banner for page-load standing conditions.",
    importPath: "@/components/ui/alert",
    whenToUse: [
      "Surface form or page-level messages the user should not miss.",
      "Explain system state without blocking the rest of the UI.",
      "Use Banner for conditions that load with the page; Notify for quick confirmations; Status line or Outcome for results.",
    ],
    tokens: [
      "card",
      "destructive",
      "success-muted",
      "warning-muted",
      "info-muted",
      "border",
    ],
    usageNotes: [
      "variant: default | destructive | success | warning | info — status variants use the opaque muted token pairs, never alpha fills.",
      "AlertTitle + AlertDescription; an optional AlertAction slot docks a button top-right.",
      "Keep the title short — a few words. Put detail in the description.",
    ],
    doItems: [
      "Use Alert for a message tied to the current form or page state.",
      "Use Banner instead for a condition that's true for the whole page on load.",
    ],
    dontItems: [
      "Stack more than one or two alerts on the same view.",
      "Use Alert for a confirmation — that's Notify, Status line or Outcome.",
    ],
    preview: (
      <div className="flex w-full max-w-lg flex-col gap-3">
        <Alert>
          <InfoIcon />
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>
            You can add components using the shadcn CLI.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Payment failed</AlertTitle>
          <AlertDescription>
            Check the card details and try again.
          </AlertDescription>
        </Alert>
        <Alert variant="success">
          <CheckCircle2Icon />
          <AlertTitle>Synced</AlertTitle>
          <AlertDescription>
            Changes were saved to the design system.
          </AlertDescription>
        </Alert>
      </div>
    ),
  },

  input: {
    slug: "input",
    title: "Input",
    description:
      "Single-line text field at the 40px control height. Border is the input token, a boundary a step stronger than the default border.",
    importPath: "@/components/ui/input",
    whenToUse: [
      "Collect a single line of text: names, emails, search queries, IDs.",
      "Use Textarea for anything that can run past one line.",
    ],
    tokens: [
      "input",
      "border",
      "ring",
      "prefilled",
      "muted-foreground",
      "destructive",
    ],
    usageNotes: [
      "Height is fixed at h-10 (40px) — the same metric as Button default and Select trigger.",
      "Focus ring uses the ring token (teal); invalid fields switch to a destructive border and ring via aria-invalid.",
      "prefilled fills bg-prefilled, switches the border to a dashed warning-ink edge, and announces \"Machine filled, not yet verified\" to assistive tech — never colour alone.",
      "Inside Field, id / aria-describedby / aria-invalid are wired automatically from FieldDescription and FieldError.",
      "Always pair with Label or FieldLabel; a placeholder is a hint, never the accessible name.",
    ],
    doItems: [
      "Set prefilled on any value the system populated but the person hasn't confirmed.",
      "Use type=\"email\" / type=\"password\" / etc. so mobile keyboards and password managers behave correctly.",
    ],
    dontItems: [
      "Signal a prefilled or invalid state with colour alone — the dashed border and programmatic description are required.",
      "Use a placeholder as a substitute for a visible label.",
    ],
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@pucar.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cnr">CNR (prefilled)</Label>
          <Input id="cnr" defaultValue="KLEK020012342026" prefilled />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bad">Invalid</Label>
          <Input id="bad" defaultValue="not-an-email" aria-invalid />
        </div>
      </div>
    ),
  },

  textarea: {
    slug: "textarea",
    title: "Textarea",
    description: "Multi-line text entry for notes, descriptions, and free-form messages.",
    importPath: "@/components/ui/textarea",
    whenToUse: [
      "Content that can run to a paragraph or more — notes, descriptions, remarks.",
      "Use Input for anything that's really a single value on one line.",
    ],
    tokens: ["input", "border", "ring", "prefilled", "muted-foreground"],
    usageNotes: [
      "Pairs with Label the same way Input does; same focus, invalid, and prefilled behavior.",
      "Grows with its content (field-sizing-content) from a min-h-16 floor — set rows only to raise that floor for a known longer field.",
    ],
    doItems: ["Let it grow with content rather than fixing a short height and forcing an inner scrollbar."],
    dontItems: ["Use a one-line-tall Textarea where an Input would do."],
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" placeholder="Add context for the client…" />
      </div>
    ),
  },

  select: {
    slug: "select",
    title: "Select",
    description: "Choose a single option from a short, known list, presented in a dropdown.",
    importPath: "@/components/ui/select",
    whenToUse: [
      "A finite option set the user recognizes at a glance (status, role, region).",
      "Use Combobox instead once options are searchable, long, or user-generated.",
      "Use Radio Group instead when all options should be visible without opening anything (typically 2–5 options).",
    ],
    tokens: ["input", "popover", "accent", "ring"],
    usageNotes: [
      "SelectTrigger size: sm | default — default matches the 40px control height.",
      "Trigger width should match its form layout — set an explicit width (w-48, max-w-xs) rather than letting it size to the longest option.",
    ],
    doItems: ["Set a sensible defaultValue or a visible placeholder — never leave it blank with no cue."],
    dontItems: ["Use Select for a binary choice — that's Switch or Checkbox."],
    preview: (
      <Select defaultValue="paid">
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="unpaid">Unpaid</SelectItem>
        </SelectContent>
      </Select>
    ),
  },

  checkbox: {
    slug: "checkbox",
    title: "Checkbox",
    description: "Binary or multi-select control for independent, non-exclusive choices.",
    importPath: "@/components/ui/checkbox",
    whenToUse: [
      "Any option that can be toggled on its own, independent of the others in the list.",
      "Use Radio Group instead when only one of the options can be true at a time.",
      "Use Switch instead for a setting that takes effect immediately, outside a form submission.",
    ],
    tokens: ["primary", "input", "ring"],
    usageNotes: [
      "Checked state fills bg-primary (teal) with a white check icon.",
      "Always associate with a Label via htmlFor/id — the checkbox has no visible text of its own.",
    ],
    doItems: ["Give the checkbox's Label enough hit area to click — the association makes the whole label tappable."],
    dontItems: ["Use a checkbox alone to represent a single yes/no setting that should apply immediately — that's Switch."],
    preview: (
      <div className="flex items-center gap-2">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Accept terms</Label>
      </div>
    ),
  },

  "radio-group": {
    slug: "radio-group",
    title: "Radio Group",
    description: "A set of mutually exclusive options, all visible at once.",
    importPath: "@/components/ui/radio-group",
    whenToUse: [
      "Pick exactly one value from a short list (2–5 options) where seeing all choices at once helps.",
      "Use Select instead once the list gets long enough to need scrolling.",
    ],
    tokens: ["primary", "input", "ring"],
    usageNotes: [
      "Selected state fills bg-primary (teal), matching Checkbox.",
      "Wrap each RadioGroupItem with its own Label — clicking the label selects the option.",
    ],
    doItems: ["Pre-select a sensible default when one option is clearly the common case."],
    dontItems: ["Use Radio Group for more than about five options — the list stops being scannable."],
    preview: (
      <RadioGroup defaultValue="monthly" className="gap-3">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="monthly" id="r-monthly" />
          <Label htmlFor="r-monthly">Monthly</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="yearly" id="r-yearly" />
          <Label htmlFor="r-yearly">Yearly</Label>
        </div>
      </RadioGroup>
    ),
  },

  switch: {
    slug: "switch",
    title: "Switch",
    description: "Immediate on/off toggle. The state changes the moment it's pressed — there's no separate submit step.",
    importPath: "@/components/ui/switch",
    whenToUse: [
      "Preferences and settings that apply as soon as they're changed (notifications, feature flags).",
      "Use Checkbox instead for a value that's part of a form and only takes effect on submit.",
    ],
    tokens: ["primary", "input"],
    usageNotes: [
      "size: sm | default. Checked track is bg-primary (teal); unchecked is bg-input.",
      "Always pair with a Label describing the setting being controlled, not the current state (\"Email notifications,\" not \"On\").",
    ],
    doItems: ["Reflect the change immediately in the UI — don't require a separate save action."],
    dontItems: ["Use a switch inside a form that still needs an explicit submit to take effect — that's a mismatched affordance."],
    preview: (
      <div className="flex items-center gap-3">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Email notifications</Label>
      </div>
    ),
  },

  label: {
    slug: "label",
    title: "Label",
    description: "Accessible, clickable caption for a form control. Required for every Input, Checkbox, Switch, and similar control.",
    importPath: "@/components/ui/label",
    whenToUse: ["Any form control that needs a visible, associated name — which is to say, every form control."],
    tokens: ["foreground"],
    usageNotes: [
      "htmlFor must match the control's id — this is what makes clicking the label focus or toggle the control.",
      "Use FieldLabel instead inside a Field composition; it's the same primitive with layout wiring for the group.",
    ],
    doItems: ["Write the label as the field's name (\"Email\"), not an instruction (\"Enter your email\")."],
    dontItems: ["Use a placeholder instead of a Label — placeholders disappear on input and aren't a reliable accessible name."],
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" placeholder="Pucar" />
      </div>
    ),
  },

  table: {
    slug: "table",
    title: "Table",
    description:
      "Structured display for comparing the same fields across many records. Header uses muted surface; hover uses accent and selected uses accent-strong.",
    importPath: "@/components/ui/table",
    whenToUse: [
      "Rows of structured records that share the same columns — cases, invoices, filings.",
      "Use Description list instead for a single record's fields, or Card for a looser, non-tabular grouping.",
    ],
    tokens: ["border", "muted", "foreground", "card", "accent"],
    usageNotes: [
      "Wrap page-level tables in a bordered rounded container (border border-border rounded-lg overflow-hidden), not a bare Table.",
      "Right-align numeric columns; left-align everything else, including status.",
      "Selected rows: data-state=\"selected\" on TableRow, styled from muted/accent — never a custom highlight color.",
      "Put sort affordances in the header cell itself and keep header labels sentence case.",
    ],
    doItems: [
      "Pair status columns with Badge rather than color-coding the row or cell background.",
      "Give every table a visible empty state (see Empty) instead of a blank body.",
    ],
    dontItems: ["Encode meaning in row background color beyond the built-in hover/selected states."],
    preview: (
      <div className="w-full overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CNR</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Hearings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow data-state="selected">
              <TableCell>KLEK020012342026</TableCell>
              <TableCell>
                <Badge variant="success">Listed</Badge>
              </TableCell>
              <TableCell className="text-right">3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KLEK020098762026</TableCell>
              <TableCell>
                <Badge variant="warning">Pending</Badge>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KLEK020055552026</TableCell>
              <TableCell>
                <Badge variant="secondary">Draft</Badge>
              </TableCell>
              <TableCell className="text-right">0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ),
  },

  tabs: {
    slug: "tabs",
    title: "Tabs",
    description: "Switch between related views in the same context without a page navigation.",
    importPath: "@/components/ui/tabs",
    whenToUse: [
      "Alternate panels that share the same page chrome and don't need their own URL.",
      "Use Navigation Menu or plain links instead once each view is really its own route — tabs shouldn't be the only way to reach a page.",
    ],
    tokens: ["track", "card", "muted-foreground", "primary", "brand-accent"],
    usageNotes: [
      "TabsList variant: default (pill on muted, the usual choice) | line (underline, for quieter chrome).",
      "The active trigger uses text-primary. Line variant's underline is brand-accent — a non-text mark, not a second text colour.",
      "Content panels aren't unmounted by default — state inside an inactive tab is preserved when switching back.",
    ],
    doItems: ["Keep tab labels to one or two words, and keep the count low enough to fit on one line."],
    dontItems: ["Use Tabs to hide a required step in a form — a user who never opens a tab must still be able to complete it."],
    preview: (
      <Tabs defaultValue="account" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
          Manage profile and security settings.
        </TabsContent>
        <TabsContent value="billing" className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
          Invoices, payment methods, and plans.
        </TabsContent>
      </Tabs>
    ),
  },

  card: {
    slug: "card",
    title: "Card",
    description:
      "Grouped content surface with a defined border and edge. Reach for it when the group is a distinct, self-contained unit — not as a default page wrapper.",
    importPath: "@/components/ui/card",
    whenToUse: [
      "A settings panel, form section, or selectable unit that should read as its own bounded piece of the page.",
      "Avoid decorative cards that only wrap static copy with no interactive or grouped purpose — that's just a paragraph with an unnecessary border.",
    ],
    tokens: ["card", "card-foreground", "muted-foreground", "border", "muted", "accent"],
    usageNotes: [
      "size: default (24px internal spacing) | sm (16px) — sm also shrinks CardTitle to text-sm.",
      "Card fill is neutral-1; the page is surface-sunken — default Cards read by fill. Keep the border; don't add shadow-raised unless a pattern explicitly calls for lift. (Diverges from flat Rajini Card master — see CHANGELOG 2026-08-11.)",
      "Hover uses accent (same token as TableRow / Item) so selectable cards wash in light and dark. CardFooter follows via group-hover.",
      "CardHeader / CardContent / CardFooter compose in that order; CardFooter's bottom padding collapses automatically so it doesn't double up with the card's own padding.",
      "For nested soft fill inside a card, use surface-sunken or Card + bg-muted. Never unbordered muted as a Card stand-in.",
    ],
    doItems: [
      "Use size=\"sm\" for compact, densely packed cards (a sidebar widget) rather than overriding padding by hand.",
      "Leave Card on default bg-card — it shares the page white on purpose; the hairline edge and raised shadow are what say \"panel\".",
      "For a selectable / linked card, rely on the built-in hover:bg-accent — don't invent a second wash.",
    ],
    dontItems: [
      "Nest a Card inside another Card — that's the box-in-box pattern the system's flat surfaces are designed to avoid.",
      "Use bg-muted or bg-surface-raised alone when the group needs a visible edge — Card's border is required.",
    ],
    preview: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Invite teammates and manage access.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          12 members · 3 pending invites
        </CardContent>
        <CardFooter>
          <Button size="sm">Manage</Button>
        </CardFooter>
      </Card>
    ),
  },

  avatar: {
    slug: "avatar",
    title: "Avatar",
    description: "Visual identity for a person or entity, with a graceful fallback when no image loads.",
    importPath: "@/components/ui/avatar",
    whenToUse: ["People lists, comments, account menus, and anywhere else an image represents a specific person or org."],
    tokens: ["border", "muted"],
    usageNotes: [
      "size: default | sm | lg — AvatarFallback text scales down automatically at sm.",
      "AvatarGroup overlaps avatars with -space-x-2 and a background ring per item; pair with AvatarGroupCount for a \"+N\" overflow chip.",
      "AvatarBadge docks a small status dot or icon at the bottom-right corner.",
    ],
    doItems: ["Always render AvatarFallback with initials so a slow or broken image never leaves a blank circle."],
    dontItems: ["Use an avatar as a clickable button without a visible or aria-label name — an image alone isn't an accessible name."],
    preview: (
      <>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>PC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>NC</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>PU</AvatarFallback>
        </Avatar>
      </>
    ),
  },

  separator: {
    slug: "separator",
    title: "Separator",
    description: "Thin visual divider between related content groups, horizontal or vertical.",
    importPath: "@/components/ui/separator",
    whenToUse: [
      "Split sections in menus, sidebars, toolbars, and stacked layouts where a line reads more clearly than spacing alone.",
      "Prefer spacing or a semantic heading first — reach for Separator once whitespace alone isn't enough of a break.",
    ],
    tokens: ["border"],
    usageNotes: [
      "orientation: horizontal (default) | vertical — vertical needs an explicit height from its flex/grid parent.",
      "Decorative by default (aria-hidden via role=\"none\"); set decorative={false} only if the divider carries real semantic meaning.",
    ],
    doItems: ["Use FieldSeparator instead inside a Field composition — it adds the centered label slot (\"or\") for free."],
    dontItems: ["Use a Separator as a substitute for spacing between every element — most layouts need gap, not a line."],
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <p className="text-sm text-foreground">Account</p>
        <Separator />
        <p className="text-sm text-muted-foreground">Billing</p>
      </div>
    ),
  },

  progress: {
    slug: "progress",
    title: "Progress",
    description: "Determinate progress bar for uploads, onboarding, and multi-step flows with a known completion percentage.",
    importPath: "@/components/ui/progress",
    whenToUse: [
      "Completion is measurable — a file upload, a step count, a percent-complete task.",
      "Use Spinner instead when the duration or fraction complete is unknown.",
    ],
    tokens: ["primary", "track"],
    usageNotes: [
      "value is a 0–100 number; the track is bg-track and the indicator is bg-primary.",
      "Always pass aria-label (or aria-labelledby) naming what is progressing, and show the percent or step count as visible text beside the bar.",
    ],
    doItems: [
      "Update value as real progress changes; don't fake a smooth animation over a fixed duration.",
      "Show the percentage or step count as text next to the bar, and give the bar an aria-label.",
    ],
    dontItems: [
      "Use Progress for an unknown-duration wait — that reads as stalled once it stops moving.",
      "Recolor the indicator to signal status; teal always means \"in progress,\" not success or failure.",
      "Ship a bare progress bar with no accessible name and no visible percentage.",
    ],
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span id="progress-upload-label">Uploading complaint.pdf</span>
          <span className="text-muted-foreground">66%</span>
        </div>
        <Progress
          value={66}
          aria-labelledby="progress-upload-label"
          className="w-full"
        />
      </div>
    ),
  },

  spinner: {
    slug: "spinner",
    title: "Spinner",
    description: "Indeterminate loading indicator for short, in-progress operations with no measurable completion.",
    importPath: "@/components/ui/spinner",
    whenToUse: [
      "A brief wait (under a few seconds) where percentage complete can't be known.",
      "Inside a button or small region — use Skeleton for a full card or page loading in.",
    ],
    tokens: ["foreground"],
    usageNotes: [
      "role=\"status\" and aria-label=\"Loading\" are built in — don't wrap it in another live region.",
      "Default size is size-4 (16px); scale with className for standalone use.",
    ],
    doItems: ["Pair with a text label for waits longer than a couple of seconds."],
    dontItems: ["Leave a spinner running indefinitely with no timeout or fallback state."],
    preview: <Spinner className="size-6" />,
  },

  skeleton: {
    slug: "skeleton",
    title: "Skeleton",
    description: "Animated placeholder shapes that reserve layout while real content loads.",
    importPath: "@/components/ui/skeleton",
    whenToUse: [
      "Initial page, card, or list loading states where the final layout is known.",
      "Use Spinner instead for a short wait with no stable layout to preview.",
    ],
    tokens: ["track"],
    usageNotes: [
      "A single bg-track div with a pulse animation — size and shape entirely via className (rounded-full for avatars, h-3 w-3/4 for text lines).",
      "Compose several skeletons to mirror the loaded layout, including spacing.",
    ],
    doItems: ["Match skeleton geometry (count, width, radius) to the content that replaces it."],
    dontItems: ["Show a skeleton for longer than the actual fetch — swap to real content or an empty state as soon as data resolves."],
    preview: (
      <div className="flex w-full max-w-sm items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ),
  },

  tooltip: {
    slug: "tooltip",
    title: "Tooltip",
    description: "Short clarifying text on hover or keyboard focus. One concise phrase — not a place for content the user needs to act on.",
    importPath: "@/components/ui/tooltip",
    whenToUse: [
      "Name an icon-only control for sighted mouse and keyboard users.",
      "Add a short hint (a keyboard shortcut, a truncated value) to an existing label.",
      "Never put critical information only in a tooltip — hover doesn't exist on touch.",
    ],
    tokens: ["popover", "foreground"],
    usageNotes: [
      "TooltipProvider is already mounted at the app root — wrap Tooltip/TooltipTrigger/TooltipContent directly.",
      "Opens on hover and on keyboard focus automatically; no extra wiring needed for keyboard users.",
      "TooltipTrigger asChild attaches to the real control (usually a Button) instead of wrapping it in an extra element.",
    ],
    doItems: [
      "Give every icon-only button a Tooltip or an aria-label — prefer both.",
      "Keep tooltip text to a short phrase, not a paragraph.",
    ],
    dontItems: [
      "Rely on a tooltip as the only source of information needed to complete a task.",
      "Put interactive controls inside tooltip content — use Popover for anything clickable.",
    ],
    preview: (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <InfoIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>More information</TooltipContent>
      </Tooltip>
    ),
  },

  dialog: {
    slug: "dialog",
    title: "Dialog",
    description: "Modal surface that interrupts the page for a focused task, then returns control when it closes.",
    importPath: "@/components/ui/dialog",
    whenToUse: [
      "A short form, a confirmation, or a detail view that should block the rest of the page while it's open.",
      "Use Alert Dialog instead specifically for a destructive or irreversible confirmation.",
      "Use Sheet instead when the content is better anchored to an edge than centered and floating.",
    ],
    tokens: ["popover", "border", "muted-foreground"],
    usageNotes: [
      "DialogTitle is required for accessibility even if visually hidden — it's the dialog's accessible name.",
      "Focus moves into the dialog on open and returns to the trigger on close automatically; don't override this.",
      "Escape and an overlay click both close it by default — always provide those, plus an explicit action in the footer.",
    ],
    doItems: ["Keep the form inside a dialog short enough to complete without scrolling on a typical laptop screen."],
    dontItems: ["Nest a dialog inside another dialog — route to a second step instead."],
    preview: (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to the profile. Save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Neer" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },

  "alert-dialog": {
    slug: "alert-dialog",
    title: "Alert Dialog",
    description: "Interruptive confirmation for irreversible or high-impact actions. Unlike Dialog, it can't be dismissed by clicking outside.",
    importPath: "@/components/ui/alert-dialog",
    whenToUse: [
      "Delete, revoke, or otherwise destructive confirmations where an accidental dismiss would be worse than an extra click.",
      "Session-expiry warnings (see Session timeout) and other choices the user must actively make.",
    ],
    tokens: ["destructive", "popover", "muted-foreground"],
    usageNotes: [
      "AlertDialogContent size: default | sm — sm switches the footer to a stacked two-column button grid.",
      "No overlay-click or Escape dismissal by default — the user must choose Cancel or the action, which is the point.",
      "Name the action button with the consequence (\"Delete case\", not \"Confirm\") so it reads correctly on its own.",
    ],
    doItems: ["Always give Cancel equal visual weight to the destructive action — never make it the quiet option."],
    dontItems: ["Use Alert Dialog for a routine confirmation with no real consequence — that's friction Dialog or a direct action would avoid."],
    preview: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },

  sheet: {
    slug: "sheet",
    title: "Sheet",
    description: "Edge-anchored slide-over panel for secondary flows — filters, details, mobile navigation.",
    importPath: "@/components/ui/sheet",
    whenToUse: [
      "A detail or filter panel that should feel attached to the page it opened from, not centered like a Dialog.",
      "Mobile navigation drawers, right-side detail-on-row-click patterns.",
    ],
    tokens: ["popover", "border", "muted-foreground"],
    usageNotes: [
      "side: top | right | bottom | left — choose deliberately (left for nav, right for detail-on-row, bottom for mobile actions).",
      "Same focus-trap and Escape-to-close behavior as Dialog; SheetTitle is still required for accessibility.",
    ],
    doItems: ["Match side to the element that triggered it — a right-side sheet for a table row, a bottom sheet on mobile."],
    dontItems: ["Use Sheet for content that truly needs to interrupt the whole page — that's Dialog."],
    preview: (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Details</SheetTitle>
            <SheetDescription>
              Review the record without leaving the list view.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 text-sm text-muted-foreground">
            Sheet content goes here.
          </div>
        </SheetContent>
      </Sheet>
    ),
  },

  "dropdown-menu": {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Contextual list of actions anchored to a trigger — a click-to-open menu, not a hover preview.",
    importPath: "@/components/ui/dropdown-menu",
    whenToUse: [
      "Row actions, overflow ( ⋯ ) menus, account menus.",
      "Use Select instead when the menu is choosing a value, not triggering an action.",
      "Use Context Menu instead when the trigger is a right-click on content, not a visible button.",
    ],
    tokens: ["popover", "accent", "destructive"],
    usageNotes: [
      "DropdownMenuItem variant=\"destructive\" recolors just that item — pair it with a DropdownMenuSeparator above it.",
      "DropdownMenuLabel groups a cluster of items under a heading; keep related actions together rather than one long flat list.",
    ],
    doItems: ["Put the destructive action last, separated from the rest."],
    dontItems: ["Overload one menu with more than roughly seven or eight items — split into groups or move rare actions elsewhere."],
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },

  popover: {
    slug: "popover",
    title: "Popover",
    description: "Non-modal floating panel anchored to a trigger, for lightweight interactions that don't need to block the page.",
    importPath: "@/components/ui/popover",
    whenToUse: [
      "Filters, a compact form, or supplementary detail that should stay anchored near what opened it.",
      "Use Dialog instead once the task needs a real focus trap or feels important enough to interrupt the page.",
      "Use Tooltip instead for non-interactive, hover-only text.",
    ],
    tokens: ["popover", "border", "muted-foreground"],
    usageNotes: [
      "Closes on outside click or Escape, but doesn't trap focus the way Dialog does — the rest of the page stays reachable.",
      "PopoverContent takes a className for width; size it to its content rather than leaving the default.",
    ],
    doItems: ["Keep popover content to one focused task — a small form or a short block of detail."],
    dontItems: ["Put a multi-field form or a paginated list inside a popover — that belongs in a Dialog or a full page."],
    preview: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <p className="text-sm font-medium text-foreground">Dimensions</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Set width and height for the canvas.
          </p>
        </PopoverContent>
      </Popover>
    ),
  },

  breadcrumb: {
    slug: "breadcrumb",
    title: "Breadcrumb",
    description: "Shows the page's place in a hierarchy and gives a path back to its parents.",
    importPath: "@/components/ui/breadcrumb",
    whenToUse: ["Deep information architecture (three or more levels) where users benefit from a visible path back up."],
    tokens: ["muted-foreground", "foreground"],
    usageNotes: [
      "BreadcrumbPage marks the current page — plain text, not a link — while every ancestor uses BreadcrumbLink.",
      "BreadcrumbSeparator defaults to a chevron; override its children for a different glyph if a pattern needs one.",
    ],
    doItems: ["Truncate long ancestor labels rather than letting the trail wrap to a second line."],
    dontItems: ["Make the current page a clickable link — it's already where the user is."],
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components/button">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Button</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },

  pagination: {
    slug: "pagination",
    title: "Pagination",
    description: "Navigation across discrete pages of results, rendered as real links.",
    importPath: "@/components/ui/pagination",
    whenToUse: [
      "Tables and search results split into a known number of pages.",
      "Use infinite scroll or a \"Load more\" Button instead for a continuous, unbounded feed.",
    ],
    tokens: ["border", "muted", "foreground"],
    usageNotes: [
      "PaginationLink isActive marks the current page — exactly one at a time.",
      "PaginationEllipsis collapses a run of skipped pages; keep Previous/Next visible even at the first or last page (disable them, don't remove them).",
    ],
    doItems: ["Give PaginationLink a real href so pages are bookmarkable and back/forward work."],
    dontItems: ["Remove the Previous/Next controls at the boundary pages — disable them instead so the layout doesn't shift."],
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  },

  accordion: {
    slug: "accordion",
    title: "Accordion",
    description:
      "Vertically stacked disclosure sections that show one piece of content at a time — for FAQs and progressive detail, not primary navigation.",
    importPath: "@/components/ui/accordion",
    whenToUse: [
      "FAQs, help content, and optional detail the reader can choose to expand.",
      "Use Collapsible instead for a single show/hide section with no sibling items.",
    ],
    tokens: ["border", "background", "foreground", "muted-foreground"],
    usageNotes: [
      "type: single (default, one section open at a time) | multiple (several open at once); collapsible allows closing the last open item under type=\"single\".",
      "AccordionTrigger includes its own chevron and rotates it on open — don't add a second expand affordance.",
      "Inside a Card, a fully collapsed accordion reads as empty stroked rows — set defaultValue to the first section when the job is \"compare these paths\" so body copy is visible on load.",
    ],
    doItems: [
      "Write trigger text as the question or heading itself, not a generic \"Details\" label.",
      "For short compare lists (about three paths), open the first item by default so the panel doesn't look hollow.",
    ],
    dontItems: [
      "Bury a primary action or required form field inside a collapsed accordion section — closed content is easy to miss.",
      "Invent selected-row fills or a second chevron — Accordion already owns open/closed affordance; use Radio Group if the person must pick one value.",
    ],
    preview: (
      <Accordion type="single" collapsible className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Pucar DS?</AccordionTrigger>
          <AccordionContent>
            Tokens and components that keep product UI consistent.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is dark mode supported?</AccordionTrigger>
          <AccordionContent>
            Yes — every color token has light and dark values.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },

  calendar: {
    slug: "calendar",
    title: "Calendar",
    description:
      "Full grid date picker built on react-day-picker, themed with Pucar tokens. The visual engine behind Date Picker.",
    importPath: "@/components/ui/calendar",
    whenToUse: [
      "An inline, always-visible date grid — a booking screen, a filter panel.",
      "Use Date Picker instead when the calendar should stay collapsed behind a trigger until needed.",
    ],
    tokens: ["primary", "accent", "muted", "border"],
    usageNotes: [
      "mode: single | range | multiple, matching react-day-picker's selection modes.",
      "Selected day uses bg-primary; today gets an accent ring when not selected.",
      "buttonVariant controls the nav/day button styling (defaults to ghost) — keep it a low-emphasis variant so the grid stays the focal point.",
    ],
    doItems: ["Disable dates that are genuinely unselectable (past dates for a booking flow) rather than showing an error after the fact."],
    dontItems: ["Reach for Calendar directly in a form when Date Picker's trigger + popover composition already fits — it saves the layout space."],
    preview: <Calendar mode="single" className="rounded-lg border border-border" />,
  },

  carousel: {
    slug: "carousel",
    title: "Carousel",
    description:
      "Horizontally paging content region for galleries and feature strips — not a substitute for a real list when order-independent browsing matters.",
    importPath: "@/components/ui/carousel",
    whenToUse: [
      "A small set of visually similar items (images, feature cards) where paging one-at-a-time is the point.",
      "Use a plain scrollable list or grid instead when users need to scan or compare many items at once.",
    ],
    tokens: ["border", "muted", "foreground"],
    usageNotes: [
      "CarouselPrevious / CarouselNext are keyboard- and screen-reader-accessible buttons, not decoration — always render both.",
      "Built on embla-carousel; pass opts (e.g. { loop: true }) to the root for looping or multi-item-per-view behavior.",
    ],
    doItems: ["Pair with visible pagination dots or a counter when the item count isn't obvious from the viewport."],
    dontItems: ["Auto-advance a carousel without a visible pause control — moving content that can't be stopped is a WCAG failure."],
    preview: (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {["One", "Two", "Three"].map((item) => (
            <CarouselItem key={item}>
              <div className="flex h-28 items-center justify-center rounded-lg border border-border bg-muted text-sm font-medium">
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
  },

  command: {
    slug: "command",
    title: "Command",
    description:
      "Searchable, keyboard-driven action list — the engine behind a ⌘K command palette or an in-page fuzzy list.",
    importPath: "@/components/ui/command",
    whenToUse: [
      "A ⌘K-style global command palette, or any list of actions/records that benefits from type-to-filter.",
      "Use Combobox instead when the goal is picking one form value, not running a command.",
    ],
    tokens: ["popover", "accent", "muted"],
    usageNotes: [
      "Built on cmdk; CommandInput filters CommandItem children live as the user types.",
      "CommandEmpty renders only when a search yields nothing — always give it real copy.",
      "CommandGroup + heading clusters related items; combine with CommandSeparator between groups.",
    ],
    doItems: ["Support full keyboard navigation (arrow keys + Enter) as the primary interaction — typing is the point."],
    dontItems: ["Use Command for a short, static list a Select or Dropdown Menu would cover — it's built for search-first, larger sets."],
    preview: (
      <Command className="max-w-md rounded-lg border border-border">
        <CommandInput placeholder="Search components…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Button</CommandItem>
            <CommandItem>Dialog</CommandItem>
            <CommandItem>Table</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },

  drawer: {
    slug: "drawer",
    title: "Drawer",
    description:
      "Mobile-friendly bottom sheet, built on Vaul, with the same drag-to-dismiss feel as native app sheets.",
    importPath: "@/components/ui/drawer",
    whenToUse: [
      "A mobile-first action sheet or short form that should slide up from the bottom and support swipe-to-dismiss.",
      "Use Sheet instead for a side-anchored panel on desktop-oriented layouts, or Dialog for a centered modal.",
    ],
    tokens: ["popover", "border", "muted-foreground"],
    usageNotes: [
      "DrawerTitle and DrawerDescription are required for accessibility even on a visually minimal drawer.",
      "DrawerClose wraps a dismiss control the same way DialogClose does — always give the drawer an explicit close action alongside the drag gesture.",
    ],
    doItems: ["Reserve Drawer for touch/mobile contexts — it's the sheet pattern users expect there."],
    dontItems: ["Use Drawer as the desktop equivalent of Sheet — pick one component per breakpoint intent, not both for the same panel."],
    preview: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Set your daily activity target.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
  },

  "hover-card": {
    slug: "hover-card",
    title: "Hover Card",
    description:
      "Non-interactive preview that appears on hover or focus — richer than a Tooltip, but still supplementary.",
    importPath: "@/components/ui/hover-card",
    whenToUse: [
      "A preview of a user, link, or record (avatar, name, short bio) without navigating away.",
      "Use Tooltip instead for a single short phrase; use Popover instead if the content needs to be interactive.",
    ],
    tokens: ["popover", "border", "muted-foreground"],
    usageNotes: [
      "Opens on hover and on keyboard focus of the trigger, same as Tooltip, but supports richer content (avatar + text, not just a phrase).",
      "Content isn't reliably reachable on touch — never put information there that touch users must have.",
    ],
    doItems: ["Keep content to a quick preview a user can act on by then clicking through, not the full detail."],
    dontItems: ["Put form controls or primary actions inside a Hover Card — use Popover once anything needs to be clicked."],
    preview: (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@pucar</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <p className="text-sm font-medium">Pucar</p>
          <p className="text-sm text-muted-foreground">
            Design system documentation for product teams.
          </p>
        </HoverCardContent>
      </HoverCard>
    ),
  },

  menubar: {
    slug: "menubar",
    title: "Menubar",
    description:
      "Horizontal row of dropdown menus for desktop-style application chrome (File, Edit, View).",
    importPath: "@/components/ui/menubar",
    whenToUse: [
      "Dense, desktop-oriented tools that genuinely need an application-style menu bar.",
      "Use Navigation Menu instead for site/product navigation; use Dropdown Menu for a single standalone menu.",
    ],
    tokens: ["popover", "accent", "border"],
    usageNotes: [
      "Each MenubarMenu is an independent trigger + content pair; arrow-key navigation moves between them once one is open.",
      "Keep to the small set of top-level menus users expect from desktop software — this isn't a general navigation pattern.",
    ],
    doItems: ["Reserve Menubar for power-user, desktop-class surfaces — not citizen-facing product screens."],
    dontItems: ["Use Menubar as a mobile or touch-first navigation pattern — it assumes a mouse and a wide viewport."],
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Open</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
  },

  "navigation-menu": {
    slug: "navigation-menu",
    title: "Navigation Menu",
    description:
      "Top-level site or app navigation with optional rich link panels beneath each trigger.",
    importPath: "@/components/ui/navigation-menu",
    whenToUse: [
      "Primary navigation where a top-level item expands into a grouped panel of links.",
      "Use Tabs instead for switching between views within the same page, not for navigating to different routes.",
    ],
    tokens: ["popover", "accent", "border"],
    usageNotes: [
      "NavigationMenuLink renders a real anchor — pass href so it behaves as navigation, not a JS-only action.",
      "Opens on hover with a short delay on desktop and remains keyboard-navigable via arrow keys and Enter.",
    ],
    doItems: ["Group links under a trigger only when they genuinely relate — an empty-feeling one-link panel isn't worth the extra click."],
    dontItems: ["Use it for fewer than a handful of top-level sections — plain links are simpler and just as discoverable."],
    preview: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Foundations</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-56 gap-1 p-2">
                <li>
                  <NavigationMenuLink href="/foundations/colors">
                    Colors
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/foundations/typography">
                    Typography
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
  },

  slider: {
    slug: "slider",
    title: "Slider",
    description:
      "Drag-to-select a numeric value (or range) along a continuous track — visual and approximate, not for values that need typed precision.",
    importPath: "@/components/ui/slider",
    whenToUse: [
      "A value where the relative position in a range matters more than the exact number — volume, brightness, a price filter band.",
      "Use Input type=\"number\" instead when the user needs to enter an exact figure.",
    ],
    tokens: ["primary", "track"],
    usageNotes: [
      "value/defaultValue takes an array — a single-element array for one thumb, two elements for a range slider.",
      "Filled track and thumb use bg-primary (teal); unfilled track is bg-track.",
    ],
    doItems: ["Show the current value as text next to the slider — the thumb position alone is hard to read precisely."],
    dontItems: ["Use Slider as the only way to set a value that has legal or financial precision requirements — pair it with or replace it with a typed Input."],
    preview: <Slider defaultValue={[40]} max={100} step={1} className="w-full max-w-sm" />,
  },

  sonner: {
    slug: "sonner",
    title: "Toast",
    description:
      "Non-blocking confirmation of background or completed actions. Auto-dismisses — never use for validation errors or anything requiring action.",
    importPath: "@/components/ui/sonner",
    whenToUse: [
      "Product toasts go through Notify and Feedback toaster, which carry the 2.75s life, click-away and persistent errors. This page documents the primitive underneath.",
      "Product code never calls toast() directly: Notify raises every toast (a draft saved is notify.neutral).",
      "Never for validation errors — use FieldError / Alert.",
      "Never for standing page conditions — use Banner.",
      "Never for messages that require a decision — use Alert Dialog.",
    ],
    tokens: [
      "popover",
      "success-muted",
      "info-muted",
      "warning-muted",
      "destructive-muted",
    ],
    usageNotes: [
      "Variants: success, info, warning, error, loading — all use opaque muted token CSS variables on Toaster, never alpha.",
      "Products mount Feedback toaster, not this primitive, and raise toasts through Notify.",
    ],
    doItems: [
      "Use a toast to confirm an action the user just took (Draft saved, Link copied).",
      "Keep the message to a short title, with a one-line description at most.",
    ],
    dontItems: [
      "Use a toast for anything the user must read before continuing — it disappears on its own.",
      "Stack more than one or two toasts on screen at once.",
    ],
    preview: (
      <div className="flex flex-col items-center gap-3">
        <Toaster />
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Draft saved", {
                description: "Your complaint draft is saved.",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.info("Draft saved", {
                description: "Your complaint draft is saved.",
              })
            }
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.warning("Draft saved", {
                description: "Your complaint draft is saved.",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Draft saved", {
                description: "Your complaint draft is saved.",
              })
            }
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.loading("Draft saved", {
                description: "Your complaint draft is saved.",
              })
            }
          >
            Loading
          </Button>
        </div>
      </div>
    ),
  },

  banner: {
    slug: "banner",
    title: "Banner",
    description:
      "Full-width standing notice that loads with the page — information, not feedback. Not action-triggered, not dismissible by default.",
    importPath: "@/components/ui/banner",
    whenToUse: [
      "Page-load conditions that remain while true (court holiday, read-only mode).",
      "Prefer Alert for contextual form/page feedback; Notify for quick confirmations.",
      "Never as a success or failure confirmation: use Outcome, Status line or Notify.",
    ],
    tokens: [
      "info-muted",
      "warning-muted",
      "success-muted",
      "destructive-muted",
      "muted",
      "border",
    ],
    usageNotes: [
      "variant: info | warning | success | error | neutral — opaque muted fills only, each with a matching leading icon baked in.",
      "role=\"status\" is built in; icon is chosen automatically per variant.",
      "Optional action prop docks a single quiet link/button on the right (e.g. View order).",
    ],
    doItems: [
      "Reserve Banner for a condition that's true for the whole page, not one field or action.",
      "Keep to one banner per page — stacking several dilutes all of them.",
    ],
    dontItems: [
      "Use Banner for a one-time confirmation — that's Notify.",
      "Put more than one action in the action slot.",
    ],
    preview: (
      <div className="flex w-full flex-col gap-3">
        <Banner
          variant="info"
          action={
            <Button variant="link" size="sm">
              View order
            </Button>
          }
        >
          Standing notice text
        </Banner>
        <Banner variant="warning">Standing notice text</Banner>
        <Banner variant="success">Standing notice text</Banner>
        <Banner variant="neutral">Standing notice text</Banner>
      </div>
    ),
  },

  "description-list": {
    slug: "description-list",
    title: "Description list",
    description:
      "Key-value rows for preview summaries, scrutiny panels, and detail asides. A semantic dl, not a two-column table.",
    importPath: "@/components/ui/description-list",
    whenToUse: [
      "A single record's fields at a glance — case detail (CNR, court, next hearing), a profile, an order summary.",
      "Use Table instead when you're comparing the same fields across many records.",
    ],
    tokens: ["muted-foreground", "foreground", "border"],
    usageNotes: [
      "Compose DescriptionRow with a DescriptionTerm and DescriptionDetails child.",
      "Term uses muted-foreground; details use foreground — the value is always the emphasized half of the row.",
      "Put the list inside a bordered Card. Card shares the page white — the edge defines the panel, not a fill difference."
    ],
    doItems: [
      "Keep terms short (one to three words); let values wrap onto multiple lines.",
      "Order rows by what the reader looks for first.",
      "For a court case summary, include the fields the reader checks first (case number, parties, amount, identifiers, next hearing, court) — omit empty slots with a clear fallback, don't leave the panel sparse.",
    ],
    dontItems: [
      "Use it for more than one record at a time — that's a table's job.",
      "Wrap rows in bg-muted instead of Card — key-value scrutiny panels belong in a bordered Card, not a one-step grey fill.",
    ],
    preview: (
      <DescriptionList className="w-full max-w-md">
        <DescriptionRow>
          <DescriptionTerm>CNR number</DescriptionTerm>
          <DescriptionDetails>KLEK020012342026</DescriptionDetails>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Case type</DescriptionTerm>
          <DescriptionDetails>
            Section 138 — cheque dishonour
          </DescriptionDetails>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Complainant</DescriptionTerm>
          <DescriptionDetails>Prateek Agrawal</DescriptionDetails>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Next hearing</DescriptionTerm>
          <DescriptionDetails>14 August 2026</DescriptionDetails>
        </DescriptionRow>
        <DescriptionRow>
          <DescriptionTerm>Court</DescriptionTerm>
          <DescriptionDetails>Kollam magistrate court</DescriptionDetails>
        </DescriptionRow>
      </DescriptionList>
    ),
  },

  stepper: {
    slug: "stepper",
    title: "Stepper",
    description:
      "Horizontal progress indicator for a fixed sequence of steps. Complete = teal check; current = brand-muted ring; upcoming = hollow.",
    importPath: "@/components/ui/stepper",
    whenToUse: [
      "E-filing and multi-step wizards where the full sequence is known upfront (Grounds → Documents → Review).",
      "Use Progress instead when there's no discrete step count, just a percentage.",
    ],
    tokens: ["primary", "brand-muted", "border", "input", "muted-foreground"],
    usageNotes: [
      "StepperItem props: status (complete | current | upcoming), step (number shown until complete), title.",
      "The connector between items is teal only once the step it follows is complete — it never anticipates progress.",
      "Stepper is a visual indicator only; it doesn't manage navigation state — drive status from your own step index.",
    ],
    doItems: [
      "Keep step titles to a word or two; put detail in the step's own content, not the label.",
      "Advance status only as the user actually completes each step.",
    ],
    dontItems: ["Use more steps than fit on one line on the smallest supported viewport — collapse to a simpler indicator on mobile instead."],
    preview: (
      <Stepper className="w-full max-w-xl">
        <StepperItem status="complete" step={1} title="Grounds" />
        <StepperItem status="current" step={2} title="Documents" />
        <StepperItem status="upcoming" step={3} title="Review" />
      </Stepper>
    ),
  },

  timeline: {
    slug: "timeline",
    title: "Timeline",
    description:
      "Vertical record of dated events. Past = muted dot; current = brand dot with a soft halo; future = hollow.",
    importPath: "@/components/ui/timeline",
    whenToUse: [
      "Case chronologies, hearing histories, and any other append-only event log with dates.",
      "Use Stepper instead for a fixed, forward-only sequence the user is actively completing.",
    ],
    tokens: ["primary", "muted-foreground", "border", "input"],
    usageNotes: [
      "TimelineItem props: status (past | current | future), title, description (typically the date).",
      "The halo ring on the current dot is the one place alpha is allowed — it's a focus/emphasis glow, not a status fill.",
    ],
    doItems: ["Order items chronologically, oldest to newest, top to bottom."],
    dontItems: ["Use color alone to distinguish past from future — the dot fill and hollow/solid states already carry that; don't recolor titles on top."],
    preview: (
      <Timeline className="w-full max-w-sm">
        <TimelineItem
          status="past"
          title="Respondent served"
          description="2 May 2026"
        />
        <TimelineItem
          status="current"
          title="Evidence recording"
          description="14 August 2026"
        />
        <TimelineItem
          status="future"
          title="Final arguments"
          description="Scheduled"
        />
      </Timeline>
    ),
  },

  "document-slot": {
    slug: "document-slot",
    title: "Document slot",
    description:
      "One row in an e-filing document checklist. Filled, processing, empty, optional, and poor-scan states in a single slot.",
    importPath: "@/components/ui/document-slot",
    whenToUse: [
      "A checklist of expected documents where each item has its own upload state.",
      "Any required-vs-optional file upload that needs scan-quality feedback.",
    ],
    tokens: [
      "card",
      "surface-sunken",
      "muted",
      "success-muted",
      "warning-muted",
      "border",
      "input",
    ],
    usageNotes: [
      "status: filled | processing | empty | empty-optional | filled-poor — drives the surface, dashed-empty border, and \"Choose file\" affordance automatically.",
      "media: thumbnail (size-16, for image previews) | icon (size-10, default file icon).",
      "quality: \"good\" | \"poor\" renders a matching status badge under the filename — pair with the filled-poor status for a bad scan.",
      "required renders an asterisk while empty; optional (or status empty-optional) renders an \"Optional\" badge instead.",
    ],
    doItems: [
      "Show one slot per expected document so the whole checklist stays scannable at once.",
      "Move a slot to filled-poor with an explanation rather than silently accepting a bad scan.",
    ],
    dontItems: ["Mark a document required and optional at the same time — pick one."],
    preview: (
      <div className="flex w-full max-w-md flex-col gap-3">
        <DocumentSlot
          status="filled"
          media="icon"
          label="Complaint copy"
          filename="complaint-138.pdf"
          meta="1.2 MB"
          quality="good"
        />
        <DocumentSlot
          status="empty"
          media="icon"
          label="Complaint copy"
          required
        />
        <DocumentSlot
          status="empty-optional"
          media="icon"
          label="Annexure"
          optional
        />
        <DocumentSlot
          status="filled-poor"
          media="icon"
          label="Complaint copy"
          filename="scan.pdf"
          meta="890 KB"
          quality="poor"
        />
      </div>
    ),
  },

  "session-timeout": {
    slug: "session-timeout",
    title: "Session timeout",
    description:
      "WCAG 2.1 SC 2.2.1 timeout warning, built on Alert Dialog. The countdown is the information — a sunken well with mono numerals.",
    importPath: "@/components/ui/session-timeout",
    whenToUse: [
      "Any authenticated flow with an expiring session, especially one where the user could lose unsaved work.",
      "Never let a session expire silently on a draft-risking screen — this is the required warning.",
    ],
    tokens: ["surface-sunken", "popover", "muted-foreground", "primary"],
    usageNotes: [
      "Props: secondsRemaining (drives the countdown), onStaySignedIn, onSignOut, plus open/onOpenChange to control visibility.",
      "The countdown text carries aria-live=\"polite\" so it's announced without stealing focus every second.",
      "Stay signed in is the primary action (AlertDialogAction); Sign out is the cancel path — dismissing shouldn't be the same as signing out.",
    ],
    doItems: [
      "Trigger it early enough that a slow reader can react before expiry.",
      "Save draft state automatically if the session does expire, when the flow allows it.",
    ],
    dontItems: ["Let the dialog auto-dismiss on a timer without extending or ending the session — the user must make the choice."],
    preview: (
      <SessionTimeoutDemo />
    ),
  },

  field: {
    slug: "field",
    title: "Field",
    description:
      "The composition wrapper for a labeled form control — label, control, helper text, and error, in one grouped unit.",
    importPath: "@/components/ui/field",
    whenToUse: [
      "Any form control that needs a description, an error state, or horizontal label/control layout, not just a bare label.",
      "Reach for FieldGroup + Field + FieldLabel as the default shape of a form, even before you know if you'll need FieldDescription or FieldError.",
    ],
    tokens: ["destructive", "muted-foreground", "brand-muted"],
    usageNotes: [
      "orientation: vertical (default) | horizontal | responsive — responsive stacks on narrow screens and goes inline past the @container breakpoint.",
      "data-invalid on Field recolors the whole group (label included) destructive — pair it with FieldError for the message.",
      "FieldError and FieldDescription mount with stable ids; Input/Textarea inside Field receive aria-describedby and aria-invalid automatically.",
      "FieldSeparator draws a labeled divider between fields (\"or\"); FieldSet + FieldLegend group a whole cluster of fields under one heading.",
    ],
    doItems: [
      "Use FieldError to surface validation messages rather than a separate Alert per field.",
      "Keep FieldDescription to one short supporting sentence.",
      "Set data-invalid on Field whenever FieldError is shown so the control is programmatically invalid.",
    ],
    dontItems: [
      "Show FieldError and a stale FieldDescription at the same time for the same field — replace the description with the error.",
      "Hand-wire aria-invalid without FieldError — the message must be bound via aria-describedby.",
    ],
    preview: (
      <FieldGroup className="w-full max-w-sm">
        <Field>
          <FieldLabel>Party name</FieldLabel>
          <Input placeholder="Complainant name" />
          <FieldDescription>As it appears on the complaint.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel>Email</FieldLabel>
          <Input defaultValue="not-valid" />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel>CNR</FieldLabel>
          <Input defaultValue="KLEK020012342026" prefilled />
        </Field>
      </FieldGroup>
    ),
  },

  "button-group": {
    slug: "button-group",
    title: "Button Group",
    description:
      "Visually joins a short row of related actions into one segmented control, sharing borders at the seams.",
    importPath: "@/components/ui/button-group",
    whenToUse: [
      "Adjacent actions that belong to the same control — pagination steps, view toggles, a split primary/dropdown pair.",
      "Use a plain flex row with gap instead when the actions are related but not visually one control.",
    ],
    tokens: ["input", "background", "foreground", "ring"],
    usageNotes: [
      "Children are typically outline Buttons of the same size — mixed sizes or variants break the joined-border look.",
      "Works with icon-only buttons for compact toolbars as well as labeled buttons like the pagination example below.",
    ],
    doItems: ["Keep every button in the group the same size and variant."],
    dontItems: ["Put more than a handful of actions in one group — beyond that it reads as a menu, which should be a Dropdown Menu instead."],
    preview: (
      <ButtonGroup>
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Today</Button>
        <Button variant="outline">Next</Button>
      </ButtonGroup>
    ),
  },

  "date-picker": {
    slug: "date-picker",
    title: "Date Picker",
    description:
      "Popover-triggered date selection, in single-date and date-range compositions.",
    importPath: "@/components/ui/date-picker",
    whenToUse: [
      "Choose one date or a bounded date range from a visual calendar.",
      "Use a plain Input instead only when a mandated legal format requires typed entry.",
    ],
    tokens: ["input", "popover", "primary", "accent", "ring"],
    usageNotes: [
      "Exports DatePicker (single date) and DateRangePicker (from/to); both take a defaultValue or a controlled value.",
      "The trigger follows the 40px control metric at the 240px Figma specimen width — built on Calendar + Popover internally.",
    ],
    doItems: ["Show the selected date on the trigger itself, not just inside the opened calendar."],
    dontItems: ["Use DateRangePicker when only a single date is ever needed — the extra affordance adds friction."],
    preview: (
      <div className="flex flex-wrap gap-3">
        <DatePicker defaultValue={new Date(2026, 6, 31)} />
        <DateRangePicker
          defaultValue={{
            from: new Date(2026, 6, 31),
            to: new Date(2026, 7, 14),
          }}
        />
      </div>
    ),
  },

  "input-group": {
    slug: "input-group",
    title: "Input Group",
    description:
      "A single field boundary that holds a meaningful inline prefix or suffix — an icon, a shortcut hint, a unit, an inline button.",
    importPath: "@/components/ui/input-group",
    whenToUse: [
      "A search field with a leading icon, a field with a trailing unit (kg, %), or an inline action (clear, copy) inside the field border.",
      "Use a plain Input when there's nothing to add inside the field boundary — don't wrap it in a group by default.",
    ],
    tokens: ["input", "ring", "muted-foreground", "destructive"],
    usageNotes: [
      "InputGroupAddon align: inline-start | inline-end | block-start | block-end — the last two stack an addon above/below the control for a Textarea.",
      "The whole group shares one focus ring and one aria-invalid state, so it still reads as a single field to assistive tech.",
      "InputGroupButton and InputGroupText are sized to sit inside an addon without breaking the field's height.",
    ],
    doItems: ["Keep addon content short — an icon, a few characters, or one small button."],
    dontItems: ["Put more than one primary action inside a single input group — a search field with both a filter button and a submit button competes with itself."],
    preview: (
      <InputGroup className="max-w-sm">
        <InputGroupAddon>
          <SearchIcon aria-hidden />
        </InputGroupAddon>
        <InputGroupInput aria-label="Search cases" placeholder="Search cases" />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    ),
  },

  "input-otp": {
    slug: "input-otp",
    title: "Input OTP",
    description:
      "Segmented one-time-passcode entry that behaves as a single accessible text value, not separate fields.",
    importPath: "@/components/ui/input-otp",
    whenToUse: [
      "Any numeric or alphanumeric code sent for verification — SMS OTP, email codes, backup codes.",
    ],
    tokens: ["input", "ring", "foreground", "destructive"],
    usageNotes: [
      "maxLength sets the code length; group slots with InputOTPGroup and split groups with InputOTPSeparator (e.g. 3 + 3).",
      "Give the whole control an aria-label (\"One-time passcode\") — individual slots aren't separately labeled.",
      "Supports paste — pasting a full code fills every slot at once.",
    ],
    doItems: ["Auto-submit or auto-advance focus once the code reaches its full length."],
    dontItems: ["Build a passcode field from separate Input elements — this loses paste support and the single-value semantics screen readers expect."],
    preview: (
      <InputOTP maxLength={6} aria-label="One-time passcode">
        <InputOTPGroup>
          {[0, 1, 2].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {[3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    ),
  },

  combobox: {
    slug: "combobox",
    title: "Combobox",
    description:
      "Searchable single selection for option sets too long to scan in a Select dropdown.",
    importPath: "@/components/ui/combobox",
    whenToUse: [
      "Long or user-searchable option lists (courts, districts, case types across a whole state).",
      "Use Select instead once the list is short enough to scan without typing.",
    ],
    tokens: ["input", "popover", "accent", "ring"],
    usageNotes: [
      "Built on Base UI's Combobox primitive; ComboboxInput filters ComboboxList as the user types.",
      "ComboboxEmpty renders when no option matches — always give it real copy, not a blank list.",
      "ComboboxClear (via InputGroupButton) lets users reset the value without retyping.",
    ],
    doItems: ["Filter options as-you-type rather than only on submit."],
    dontItems: ["Use Combobox for a list short enough to fit in a Select — the extra typing step isn't free."],
    preview: (
      <Combobox items={["District court", "High court", "Supreme court"]}>
        <ComboboxInput className="w-60" placeholder="Select court" />
        <ComboboxContent>
          <ComboboxEmpty>No court found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    ),
  },

  empty: {
    slug: "empty",
    title: "Empty",
    description:
      "Purposeful empty state — a concise explanation of why there's nothing here, plus one recovery action.",
    importPath: "@/components/ui/empty",
    whenToUse: [
      "A table, list, or search result with zero rows, so the space doesn't just read as broken or loading.",
      "First-run states before a user has created anything yet.",
    ],
    tokens: ["border", "muted", "muted-foreground", "foreground"],
    usageNotes: [
      "Compose EmptyHeader (EmptyMedia + EmptyTitle + EmptyDescription) with an EmptyContent slot for the recovery action.",
      "EmptyMedia variant=\"icon\" centers a single icon at a consistent size — don't substitute an arbitrary illustration size.",
    ],
    doItems: ["Give the action a real next step (\"Clear filters\", \"Create case\") — never just \"OK\"."],
    dontItems: ["Show an empty state while data is still loading — that's Skeleton's job."],
    preview: (
      <Empty className="max-w-md border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon aria-hidden />
          </EmptyMedia>
          <EmptyTitle>No cases found</EmptyTitle>
          <EmptyDescription>
            Try changing the search terms or clearing filters.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Clear filters</Button>
        </EmptyContent>
      </Empty>
    ),
  },

  collapsible: {
    slug: "collapsible",
    title: "Collapsible",
    description:
      "Bare disclosure primitive for a single block of optional supporting content — the building block behind Accordion.",
    importPath: "@/components/ui/collapsible",
    whenToUse: [
      "One show/hide section with no siblings — \"Filing details,\" \"Advanced options.\"",
      "Use Accordion instead once you have multiple sibling sections that should share open/close behavior.",
    ],
    tokens: ["border", "background", "foreground", "muted-foreground"],
    usageNotes: [
      "CollapsibleTrigger asChild attaches to your own trigger element (typically a Button) instead of rendering a default one.",
      "Unlike AccordionTrigger, it ships no built-in chevron — add your own open/closed indicator.",
    ],
    doItems: ["Rotate or swap your own indicator icon on the open state so the affordance is visible, not just implied by the trigger."],
    dontItems: ["Reach for Collapsible when you actually have a list of sibling sections — that's Accordion, and it saves you from re-wiring shared state."],
    preview: (
      <Collapsible defaultOpen className="w-full max-w-sm">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Filing details
            <span aria-hidden>+</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pt-3 text-sm text-muted-foreground">
          Filed on 31 July 2026 in Kollam magistrate court.
        </CollapsibleContent>
      </Collapsible>
    ),
  },

  "scroll-area": {
    slug: "scroll-area",
    title: "Scroll Area",
    description:
      "Tokenized overflow region with a themed, cross-browser-consistent scrollbar in place of the native one.",
    importPath: "@/components/ui/scroll-area",
    whenToUse: [
      "A fixed-height region (a panel, a long list inside a card) that needs to scroll independently of the page.",
      "Skip it for full-page scrolling — let the browser's native scroll handle that.",
    ],
    tokens: ["border", "ring", "muted-foreground"],
    usageNotes: ["Set an explicit height on ScrollArea itself; content overflow beyond that height is what triggers the scrollbar."],
    doItems: ["Use it for genuinely long, homogenous content (a record list, a log) rather than wrapping arbitrary page sections."],
    dontItems: ["Nest a Scroll Area inside another scrolling region — competing scroll targets frustrate keyboard and trackpad users."],
    preview: (
      <ScrollArea className="h-48 w-full max-w-sm rounded-lg border border-border p-4">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              Hearing record {index + 1}
            </p>
          ))}
        </div>
      </ScrollArea>
    ),
  },

  kbd: {
    slug: "kbd",
    title: "Kbd",
    description:
      "Compact visual notation for a keyboard shortcut, for discoverability — not a substitute for the binding actually working.",
    importPath: "@/components/ui/kbd",
    whenToUse: [
      "Surface a keyboard shortcut next to the action it triggers (a command palette item, a menu item, a tooltip).",
    ],
    tokens: ["muted", "muted-foreground"],
    usageNotes: [
      "KbdGroup joins multiple keys (⌘, K) with consistent spacing; add a plain span with \"+\" between them if the pattern calls for it.",
      "Renders as an inline element sized to sit inside a Button, Tooltip, or InputGroupAddon without breaking their height.",
    ],
    doItems: ["Match the platform's real modifier symbols (⌘ on Mac, Ctrl on Windows) rather than a single hardcoded convention where it matters."],
    dontItems: ["Rely on Kbd alone to teach a shortcut a first-time user has no other way to discover."],
    preview: (
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span className="text-sm text-muted-foreground">+</span>
        <Kbd>K</Kbd>
      </KbdGroup>
    ),
  },

  "context-menu": {
    slug: "context-menu",
    title: "Context Menu",
    description:
      "Right-click action menu for expert, mouse-driven workflows. Every action it offers needs another discoverable route.",
    importPath: "@/components/ui/context-menu",
    whenToUse: [
      "Power-user shortcuts on a table row, canvas item, or list entry — a faster path to actions already available elsewhere.",
      "Use Dropdown Menu instead as the primary, always-visible way to reach the same actions.",
    ],
    tokens: ["popover", "accent", "destructive-muted", "border"],
    usageNotes: [
      "ContextMenuShortcut renders a right-aligned key hint (↵, ⌘C) — cosmetic only, wire the real keybinding separately.",
      "ContextMenuItem variant=\"destructive\" matches Dropdown Menu's destructive styling.",
    ],
    doItems: ["Mirror every context-menu action in a visible control (toolbar button, row menu) since right-click has no touch or keyboard equivalent."],
    dontItems: ["Ship a context menu as the only way to reach an action — that action is effectively undiscoverable for touch and keyboard users."],
    preview: (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-input text-sm text-muted-foreground">
          Right-click this area
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Open case <ContextMenuShortcut>↵</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Copy CNR</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Delete draft</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },

  chart: {
    slug: "chart",
    title: "Chart",
    description:
      "Categorical data visualization (Recharts underneath) using the chart-1 … chart-5 palette. Series identity only — chart colors never carry status meaning.",
    importPath: "@/components/ui/chart",
    whenToUse: [
      "Trends and comparisons across categories — case volume by month, a breakdown by court.",
      "Use Table or Description list instead when exact values matter more than the shape of the trend.",
    ],
    tokens: ["chart-1", "border", "muted", "muted-foreground"],
    usageNotes: [
      "ChartContainer takes a config mapping each series key to a label and a color (var(--color-chart-1) etc.) — reference the config key, not a hex, in the chart itself.",
      "accessibilityLayer on the Recharts chart adds keyboard focus and screen-reader summaries for each data point.",
      "ChartTooltipContent replaces the default Recharts tooltip with one styled from popover tokens.",
    ],
    doItems: ["Assign chart-1 through chart-5 in order as series are added, so color mapping stays stable as data changes."],
    dontItems: ["Reuse a status color (success, warning, destructive) as a chart series — chart colors mean \"different series,\" never good/bad."],
    preview: (
      <ChartContainer
        className="h-64 w-full max-w-lg"
        config={{ cases: { label: "Cases", color: "var(--color-chart-1)" } }}
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "Apr", cases: 32 },
            { month: "May", cases: 46 },
            { month: "Jun", cases: 38 },
            { month: "Jul", cases: 54 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="cases" fill="var(--color-cases)" />
        </BarChart>
      </ChartContainer>
    ),
  },

  sidebar: {
    slug: "sidebar",
    title: "Sidebar",
    description:
      "Application-level navigation shell — its own surface, active-item tint, and boundary tokens, independent of the page background.",
    importPath: "@/components/ui/sidebar",
    whenToUse: [
      "Persistent app navigation across an authenticated product surface (this docs site's own left nav is one).",
      "Not for one-off in-page navigation — use Tabs or Navigation Menu for that.",
    ],
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
    ],
    usageNotes: [
      "SidebarProvider must wrap the whole layout (sidebar + main content) — it owns the open/collapsed state.",
      "Sidebar collapsible: \"offcanvas\" | \"icon\" | \"none\" — pick per breakpoint; SidebarMenuButton isActive marks the current route.",
      "Sidebar tokens are scoped aliases of the base palette — keep them in step with their base tokens rather than picking new values.",
    ],
    doItems: ["Mark exactly one SidebarMenuButton isActive at a time, matching the current route."],
    dontItems: ["Reuse plain background/foreground tokens inside the sidebar — always go through the sidebar-* aliases so a future re-theme stays consistent."],
    preview: (
      <SidebarProvider className="min-h-64 overflow-hidden rounded-lg border border-sidebar-border">
        <Sidebar collapsible="none" className="h-64 w-56">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    ["Hearings", true],
                    ["Cases", false],
                    ["Documents", false],
                  ].map(([label, active]) => (
                    <SidebarMenuItem key={String(label)}>
                      <SidebarMenuButton isActive={Boolean(active)}>
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Content
        </div>
      </SidebarProvider>
    ),
  },

  toggle: {
    slug: "toggle",
    title: "Toggle",
    description:
      "Standalone pressed/unpressed button, typically icon-only, for a single formatting or view-mode option.",
    importPath: "@/components/ui/toggle",
    whenToUse: [
      "One independent on/off option presented as a button — bold formatting, show/hide gridlines, favorite.",
      "Use Toggle Group instead once there are several related, usually mutually exclusive options together.",
    ],
    tokens: ["accent", "accent-strong", "foreground"],
    usageNotes: [
      "variant: default | outline. size: sm | default | lg, matching Button's size ladder.",
      "Hover fills bg-accent; pressed fills bg-accent-strong via aria-pressed / data-state — give an icon-only Toggle an aria-label since it has no visible text.",
    ],
    doItems: ["Give icon-only toggles an aria-label describing what they control, not their current state."],
    dontItems: ["Use Toggle for a setting that should apply immediately and persist — that's Switch's job."],
    preview: <Toggle aria-label="Bold">B</Toggle>,
  },

  "segmented-control": {
    slug: "segmented-control",
    title: "Segmented Control",
    description:
      "A small set of mutually exclusive options shown side by side, with the choice reading as a raised chip in a recessed well.",
    importPath: "@/components/ui/segmented-control",
    whenToUse: [
      "Two to four mutually exclusive options that all fit on one line and are worth keeping visible — Yes/No, Complainant/Accused, OTP/Password.",
      "Use Radio Group instead when the options need descriptions, when there are more than about four, or when they must stack on a narrow viewport.",
      "Use Tabs instead when choosing switches the panel of content below rather than setting a value.",
    ],
    tokens: ["surface-sunken", "hairline", "card", "foreground", "muted-foreground", "accent"],
    usageNotes: [
      "size: default is the 40px form control; compact is a 32px well for secondary choices in dense chrome.",
      "compact keeps a full 40px hit target — only the visible well shrinks. Reach for it instead of ToggleGroup size=\"sm\", whose 28px target is below the 40x40 floor.",
      "The well is a well, not a track: surface-sunken with a hairline stroke. Never bg-track — track is for tiny countable marks (progress, slider, skeleton).",
      "Selection is a raised chip — bg-card with shadow-raised over its own hairline — never an accent fill.",
      "The chip measures 1.10:1 against the well in light and 1.13:1 in dark, so the fill is deliberately not the signal. shadow-raised, the hairline, the foreground text colour and the weight step to 600 all carry it. Keep every one of them when restyling.",
      "The selected label carries weight, not teal, in both sizes: a segment is a value, not an action, and a form of six toggles would scatter the rationed brand colour across all of them.",
    ],
    doItems: [
      "Keep one option selected at all times — a segmented control with nothing chosen has no way to say what the current value is.",
      "Give the group an aria-label; the options alone rarely say what is being chosen.",
    ],
    dontItems: [
      "Do not use it for more than about four options, or for options whose labels wrap.",
      "Do not use it to navigate — that is Tabs.",
    ],
    preview: (
      <div className="flex flex-col gap-4">
        <SegmentedControl type="single" defaultValue="yes" aria-label="Answer">
          <SegmentedControlItem value="yes">Yes</SegmentedControlItem>
          <SegmentedControlItem value="no">No</SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl
          type="single"
          size="compact"
          defaultValue="otp"
          aria-label="Sign-in method"
        >
          <SegmentedControlItem value="otp">OTP</SegmentedControlItem>
          <SegmentedControlItem value="password">Password</SegmentedControlItem>
        </SegmentedControl>
      </div>
    ),
  },

  "toggle-group": {
    slug: "toggle-group",
    title: "Toggle Group",
    description:
      "A row of joined toggles for mutually exclusive or multi-select mode switching, sharing borders like Button Group.",
    importPath: "@/components/ui/toggle-group",
    whenToUse: [
      "View or mode switches where every option should stay visible at once — Day/Week/Month, alignment (left/center/right).",
      "Use Select or Radio Group instead once the option set is a form value being submitted rather than a live view toggle.",
    ],
    tokens: ["muted", "foreground"],
    usageNotes: [
      "type: single (one active value) | multiple (several can be pressed at once) — matches Radix's toggle-group semantics.",
      "variant and size set on the group apply to every ToggleGroupItem inside it.",
    ],
    doItems: ["Keep the option count small enough to read as one control, typically two to five items."],
    dontItems: ["Leave a single-select toggle group with nothing pressed if one option should always represent the current state."],
    preview: (
      <ToggleGroup type="single" defaultValue="day">
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
    ),
  },
};

export function getComponentDoc(slug: string) {
  return componentRegistry[slug];
}
