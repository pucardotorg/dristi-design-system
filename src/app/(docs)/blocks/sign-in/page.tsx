import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { PageHeader } from "@/components/docs/page-header";
import { DocsSection } from "@/components/docs/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Sign-in block",
};

export default function SignInBlockPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        title="Sign-in block"
        description="Composition pattern for authentication — Field + Input + Button. Not a single mega-component; assemble from core controls."
      />

      <Callout>
        Keep one primary action. Prefer sentence case. Pair labels with every
        field. See{" "}
        <Link href="/components/field" className="underline underline-offset-3">
          Field
        </Link>{" "}
        and{" "}
        <Link href="/components/input" className="underline underline-offset-3">
          Input
        </Link>
        .
      </Callout>

      <DocsSection
        title="Composition"
        description="Card surface, vertical fields, single primary CTA, quiet secondary path."
      >
        <div className="mx-auto w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Continue to your Pucar workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="signin-email">Email</FieldLabel>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="name@organization.gov.in"
                    autoComplete="email"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="signin-password">Password</FieldLabel>
                  <Input
                    id="signin-password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <FieldDescription>
                    Use the password issued by your court admin.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full">Sign in</Button>
              <Separator />
              {/* Outline, not ghost (owner, 2026-11-10): on the beige footer a ghost
                  button has no edge, so it read as floating far below the divider. The
                  outline's white fill and edge show it sits the same distance away as
                  Sign in. */}
              <Button variant="outline" className="w-full">
                Forgot password
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DocsSection>
    </div>
  );
}
