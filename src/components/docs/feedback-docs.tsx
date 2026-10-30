"use client";

import * as React from "react";
import {
  FileQuestionIcon,
  LinkIcon,
  ListChecksIcon,
  LockIcon,
  PenLineIcon,
  RotateCcwIcon,
  Trash2Icon,
  UserXIcon,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ConfirmMark, IrreversibleNote } from "@/components/ui/confirm-mark";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionRow,
  DescriptionTerm,
} from "@/components/ui/description-list";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FeedbackToaster } from "@/components/ui/feedback-toaster";
import { Field, FieldLabel } from "@/components/ui/field";
import { notify } from "@/components/ui/notify";
import {
  OutcomeAmount,
  OutcomeHeader,
  OutcomeSummary,
  OutcomeTally,
  PageOutcome,
} from "@/components/ui/outcome";
import {
  LANDING,
  StatusFieldControl,
  StatusFieldError,
  StatusLine,
  useRefusal,
} from "@/components/ui/status-line";
import { StatusMark, type MarkSize, type MarkTone } from "@/components/ui/status-mark";
import { Textarea } from "@/components/ui/textarea";

/* ──────────────────────────────── demo helpers ──────────────────────────────── */

/** Remounts its children so their entrance motion plays again. */
function Replay({ children }: { children: React.ReactNode }) {
  const [run, setRun] = React.useState(0);
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => setRun((n) => n + 1)}>
          <RotateCcwIcon data-icon="inline-start" aria-hidden />
          Replay motion
        </Button>
      </div>
      <div key={run} className="w-full">
        {children}
      </div>
    </div>
  );
}

const Row = ({ term, children }: { term: string; children: React.ReactNode }) => (
  <DescriptionRow className="border-hairline">
    <DescriptionTerm>{term}</DescriptionTerm>
    <DescriptionDetails className="tabular-nums">{children}</DescriptionDetails>
  </DescriptionRow>
);

/** A dialog laid out as an outcome: pinned header, scrolling middle, footer band. */
function OutcomeDialog({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent pinned className="sm:max-w-xl">
        {children}
      </DialogContent>
    </Dialog>
  );
}

const OutcomeFooter = ({ children }: { children: React.ReactNode }) => <DialogFooter>{children}</DialogFooter>;

const TONES: MarkTone[] = ["success", "error", "warning", "info", "neutral", "danger"];
const SIZES: MarkSize[] = [14, 16, 20, 24, 40, 56, 72];

function MarkMatrix() {
  return (
    <Replay>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] items-center gap-4">
          <span />
          {SIZES.map((s) => (
            <span key={s} className="text-caption tabular-nums text-muted-foreground">
              {s}px
            </span>
          ))}
          {TONES.map((t) => (
            <React.Fragment key={t}>
              <span className="text-body-compact font-medium">{t}</span>
              {SIZES.map((s) => (
                <StatusMark
                  key={s}
                  tone={t}
                  size={s}
                  icon={t === "neutral" ? LockIcon : t === "danger" ? Trash2Icon : undefined}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Replay>
  );
}

function RefusalDemo() {
  const { attempt, refuse } = useRefusal();
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Field data-invalid={attempt > 0}>
        <FieldLabel htmlFor="ds-order">Order text</FieldLabel>
        <StatusFieldControl attempt={attempt}>
          <Textarea id="ds-order" aria-invalid={attempt > 0} className="min-h-32" />
        </StatusFieldControl>
        {attempt > 0 ? (
          <StatusFieldError attempt={attempt}>Type the order before sending it for signing.</StatusFieldError>
        ) : null}
      </Field>
      <div className="flex justify-end">
        <Button onClick={refuse}>Send for signing</Button>
      </div>
    </div>
  );
}

/* ─────────────── live previews for the Status & feedback pages ─────────────── */


export const statusMarkPreview = <MarkMatrix />;

export const outcomePreview = (
      <div className="flex flex-wrap gap-2">
        <OutcomeDialog label="Success">
          <OutcomeHeader
            titleFrom="dialog"
            title="Bail application submitted"
            body="The court has received your application. You will be told by SMS when a decision is made."
          />
          <DialogBody>
            <DescriptionList>
              <Row term="Submitted on">24-08-2026</Row>
              <Row term="Submission ID">KL-000847-2026-AP1</Row>
              <Row term="Court fee">₹50 paid</Row>
            </DescriptionList>
          </DialogBody>
          <OutcomeFooter>
            <Button>Done</Button>
          </OutcomeFooter>
        </OutcomeDialog>
        <OutcomeDialog label="Payment, compact">
          <OutcomeHeader titleFrom="dialog" compact title="Payment successful" body="Your case file is complete.">
            <OutcomeAmount label="Amount paid" value="₹1,250" />
          </OutcomeHeader>
          <DialogBody>
            <OutcomeSummary>
              <DescriptionList>
                <Row term="Case file number">KL-000847-2026</Row>
                <Row term="Payment reference">PAY-55102</Row>
              </DescriptionList>
            </OutcomeSummary>
          </DialogBody>
          <OutcomeFooter>
            <Button>Done</Button>
          </OutcomeFooter>
        </OutcomeDialog>
        <OutcomeDialog label="Error">
          <OutcomeHeader titleFrom="dialog" tone="error" compact title="Payment failed" body="Nothing was paid. Try again." />
          <OutcomeFooter>
            <Button>Done</Button>
          </OutcomeFooter>
        </OutcomeDialog>
        <OutcomeDialog label="Info (sent, not decided)">
          <OutcomeHeader
            titleFrom="dialog"
            tone="info"
            compact
            title="Application sent to the magistrate"
            body="Signed with Aadhaar OTP. You will be told when an order is passed."
          />
          <OutcomeFooter>
            <Button>Done</Button>
          </OutcomeFooter>
        </OutcomeDialog>
        <OutcomeDialog label="Partial (tally)">
          <OutcomeHeader titleFrom="dialog" tone="neutral" icon={ListChecksIcon} compact title="3 processes signed" />
          <DialogBody>
            <OutcomeTally
              label="Sent"
              done={2}
              failed={1}
              doneLine="2 are now in Sent in Service."
              failedLine="1 could not be sent and is in Errored in Issuance."
            />
          </DialogBody>
          <OutcomeFooter>
            <Button>Done</Button>
          </OutcomeFooter>
        </OutcomeDialog>
      </div>
    );

export const statusLinePreview = (
      <Replay>
        <div className="flex w-full max-w-3xl flex-col gap-4">
          <StatusLine tone="success">Access given to Adv. Meera Nair, Rahul (clerk)</StatusLine>
          <StatusLine tone="error" action={<Button size="sm" variant="outline">Try again</Button>}>
            Cases could not be loaded. Nothing has been changed. Try again in a moment.
          </StatusLine>
          <StatusLine tone="warning" title="12 days beyond the one-month limit">
            The court can still take this on file, but it must be asked to condone the delay.
          </StatusLine>
          <StatusLine tone="info">We could not load your case. Your case number and hearing date are on your summons.</StatusLine>
          <StatusLine tone="neutral" icon={FileQuestionIcon}>
            No case matches this number. Check your summons, or the case may not be in the system yet.
          </StatusLine>
        </div>
      </Replay>
    );

export const confirmMarkPreview = (
      <div className="flex flex-wrap gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Removal</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <ConfirmMark danger icon={UserXIcon} />
              <AlertDialogTitle>Remove Rahul from your office?</AlertDialogTitle>
              <AlertDialogDescription>
                They will lose access to 14 cases immediately and leave your office. You can add them again at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Remove from office</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Irreversible</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <ConfirmMark icon={PenLineIcon} />
              <AlertDialogTitle>Sign 8 orders?</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col">
                <span>Your signature issues each order.</span>
                <IrreversibleNote>This cannot be reversed.</IrreversibleNote>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Back</AlertDialogCancel>
              <AlertDialogAction>Sign</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );

export const notifyPreview = (
      <div className="flex flex-wrap gap-2">
        <FeedbackToaster />
        <Button variant="outline" onClick={() => notify.success("Access given to Adv. Meera Nair")}>
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => notify.error("The case file could not be prepared", { description: "Try again. Nothing was downloaded." })}
        >
          Error (press twice)
        </Button>
        <Button variant="outline" onClick={() => notify.warning("2 required documents still needed")}>
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => notify.neutral("The court fee opens once every signature and oath is in.", { icon: LockIcon })}
        >
          Neutral
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            notify.neutral("Task archived", {
              description: "Pay court fee. You can find it under Take action, Archive.",
              icon: Trash2Icon,
              action: { label: "Undo", onClick: () => undefined },
            })
          }
        >
          Neutral with action
        </Button>
      </div>
    );

export const feedbackToasterPreview = (
      <div className="flex flex-col items-start gap-3">
        <FeedbackToaster />
        <p className="text-body-compact text-muted-foreground">
          Mounted on this page and on the Notify page.
        </p>
        <Button variant="outline" onClick={() => notify.success("Reminder sent to 3 people")}>
          Show a toast
        </Button>
      </div>
    );

export const outcomeVariants = [
      {
        label: "Page outcomes",
        content: (
          <Replay>
            <div className="grid w-full gap-6 md:grid-cols-3">
              <Card className="items-center p-6">
                <PageOutcome
                  tone="success"
                  scale="hero"
                  title="Your account is ready"
                  body="You can add your address and official ID from your profile."
                  action={<Button>Go to your home page</Button>}
                />
              </Card>
              <Card className="items-center p-6">
                <PageOutcome
                  tone="error"
                  title="This page could not load"
                  body="Nothing was changed. Reload to try again."
                  action={<Button>Reload</Button>}
                />
              </Card>
              <Card className="items-center p-6">
                <PageOutcome
                  tone="neutral"
                  icon={LinkIcon}
                  title="This link is no longer active"
                  body="Ask the advocate filing it to send you a new link."
                />
              </Card>
            </div>
          </Replay>
        ),
      },
    ];

export const statusLineVariants = [
      { label: "Field error (press twice)", content: <RefusalDemo /> },
      {
        label: "Badges with a mark",
        content: (
          <Replay>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success">
                <StatusMark size={14} />
                Signed
              </Badge>
              <Badge variant="destructive">
                <StatusMark size={14} tone="error" />
                Overdue
              </Badge>
              <Badge variant="warning">
                <StatusMark size={14} tone="warning" />
                Due today
              </Badge>
            </div>
          </Replay>
        ),
      },
      {
        label: "Landing highlight",
        content: (
          <Replay>
            <Card className="w-full max-w-xl gap-0 overflow-hidden py-0">
              {["Pay court fee", "Sign vakalatnama", "File bail application"].map((t, i) => (
                <div
                  key={t}
                  className={`flex items-center gap-4 border-b border-hairline px-4 py-3 last:border-0 ${i === 1 ? LANDING : ""}`}
                >
                  <span className="flex-1 text-body-compact font-medium">{t}</span>
                  {i === 1 ? <Badge variant="success">Signed</Badge> : null}
                </div>
              ))}
            </Card>
          </Replay>
        ),
      },
    ];
