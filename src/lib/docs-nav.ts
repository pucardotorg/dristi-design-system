export type DocsNavItem = {
  title: string;
  href: string;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNav: DocsNavSection[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Getting started", href: "/getting-started" },
      { title: "Principles", href: "/principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Colors", href: "/foundations/colors" },
      { title: "Typography", href: "/foundations/typography" },
      { title: "Spacing", href: "/foundations/spacing" },
      { title: "Radius", href: "/foundations/radius" },
      { title: "Elevation", href: "/foundations/elevation" },
      { title: "Motion", href: "/foundations/motion" },
      { title: "Status & feedback", href: "/foundations/status" },
      { title: "Icons", href: "/foundations/icons" },
      { title: "Accessibility", href: "/foundations/accessibility" },
      { title: "Laws", href: "/foundations/laws" },
    ],
  },
  {
    title: "Status & feedback",
    items: [
      { title: "Badge", href: "/components/badge" },
      { title: "Alert", href: "/components/alert" },
      { title: "Banner", href: "/components/banner" },
      { title: "Progress", href: "/components/progress" },
      { title: "Spinner", href: "/components/spinner" },
      { title: "Skeleton", href: "/components/skeleton" },
      { title: "Status mark", href: "/components/status-mark" },
      { title: "Outcome", href: "/components/outcome" },
      { title: "Status line", href: "/components/status-line" },
      { title: "Confirm mark", href: "/components/confirm-mark" },
      { title: "Notify", href: "/components/notify" },
      { title: "Feedback toaster", href: "/components/feedback-toaster" },
      { title: "Toast (primitive)", href: "/components/sonner" },
      { title: "Tooltip", href: "/components/tooltip" },
    ],
  },
  {
    title: "Pucar",
    items: [
      { title: "Stepper", href: "/components/stepper" },
      { title: "Timeline", href: "/components/timeline" },
      { title: "Document slot", href: "/components/document-slot" },
      { title: "Session timeout", href: "/components/session-timeout" },
      { title: "Description list", href: "/components/description-list" },
      { title: "Sign-in block", href: "/blocks/sign-in" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/components/accordion" },
      { title: "Alert Dialog", href: "/components/alert-dialog" },
      { title: "Avatar", href: "/components/avatar" },
      { title: "Breadcrumb", href: "/components/breadcrumb" },
      { title: "Button", href: "/components/button" },
      { title: "Button Group", href: "/components/button-group" },
      { title: "Calendar", href: "/components/calendar" },
      { title: "Card", href: "/components/card" },
      { title: "Carousel", href: "/components/carousel" },
      { title: "Chart", href: "/components/chart" },
      { title: "Checkbox", href: "/components/checkbox" },
      { title: "Collapsible", href: "/components/collapsible" },
      { title: "Combobox", href: "/components/combobox" },
      { title: "Command", href: "/components/command" },
      { title: "Context Menu", href: "/components/context-menu" },
      { title: "Date Picker", href: "/components/date-picker" },
      { title: "Dialog", href: "/components/dialog" },
      { title: "Drawer", href: "/components/drawer" },
      { title: "Dropdown Menu", href: "/components/dropdown-menu" },
      { title: "Empty", href: "/components/empty" },
      { title: "Field", href: "/components/field" },
      { title: "Hover Card", href: "/components/hover-card" },
      { title: "Input", href: "/components/input" },
      { title: "Input Group", href: "/components/input-group" },
      { title: "Input OTP", href: "/components/input-otp" },
      { title: "Kbd", href: "/components/kbd" },
      { title: "Label", href: "/components/label" },
      { title: "Menubar", href: "/components/menubar" },
      { title: "Navigation Menu", href: "/components/navigation-menu" },
      { title: "Pagination", href: "/components/pagination" },
      { title: "Popover", href: "/components/popover" },
      { title: "Radio Group", href: "/components/radio-group" },
      { title: "Scroll Area", href: "/components/scroll-area" },
      { title: "Select", href: "/components/select" },
      { title: "Separator", href: "/components/separator" },
      { title: "Sheet", href: "/components/sheet" },
      { title: "Segmented Control", href: "/components/segmented-control" },
      { title: "Sidebar", href: "/components/sidebar" },
      { title: "Slider", href: "/components/slider" },
      { title: "Switch", href: "/components/switch" },
      { title: "Table", href: "/components/table" },
      { title: "Tabs", href: "/components/tabs" },
      { title: "Textarea", href: "/components/textarea" },
      { title: "Toggle", href: "/components/toggle" },
      { title: "Toggle Group", href: "/components/toggle-group" },
    ],
  },
];

export function getComponentNavItem(slug: string) {
  return docsNav
    .flatMap((section) => section.items)
    .find((item) => item.href === `/components/${slug}`);
}

export function getAllComponentSlugs() {
  return docsNav
    .flatMap((section) => section.items)
    .filter((item) => item.href.startsWith("/components/"))
    .map((item) => item.href.replace("/components/", ""));
}
