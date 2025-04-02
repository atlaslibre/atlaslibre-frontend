import { Alert, Button, Container } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

export default function Whoops({ error, resetErrorBoundary }: FallbackProps) {
  function resetAll() {
    localStorage.clear();
    window.location.reload();
  }

  console.log({ o: error });

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Container maxWidth="sm">
          <Alert severity="error">The application crashed</Alert>

          <div className="overflow-scroll pt-4 pb-8">
            {error.message}

            <pre className="text-xs pt-2 pb-4">{error.stack}</pre>

            <h3 className="font-semibold">What can I do from here?</h3>

            <p className="">
              You can try clicking the button 'Try again'. If that does not
              work, the data storage of the application might have been
              corrupted. In that case, you can delete all data stored by
              pressing 'Clear all data' below.
            </p>
          </div>

          <div className="float-right">
            <Button
              onClick={resetErrorBoundary}
              color="primary"
              variant="outlined"
              size="small"
            >
              Try again
            </Button>
          </div>

          <Button
            onClick={resetAll}
            color="warning"
            variant="outlined"
            size="small"
          >
            Clear all data
          </Button>

          <div className="pt-8 text-xs">
            <div>
              Report bugs at{" "}
              <a
                href="https://github.com/atlaslibre/design/issues"
                className="text-blue-500"
                target="_blank"
              >
                https://github.com/atlaslibre/design/issues
              </a>
              <div className="pt-4 text-xs">Version: {__APP_VERSION__}</div>
              <div>
                Commit: {__COMMIT_HASH__} ({__COMMIT_DATE__.trim()})
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
