"use client";

import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ErrorProps = {
  error?: Error & { digest?: string };
  reset?: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">
              Something went wrong
            </CardTitle>
            <CardDescription className="mt-2">
              An unexpected error occurred. Please try again.
            </CardDescription>
          </div>
        </CardHeader>

        {error?.message && (
          <CardContent>
            <div className="p-4 bg-muted rounded-lg border">
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Error Details:
              </p>
              <p className="text-sm font-mono text-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button onClick={handleReset} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
