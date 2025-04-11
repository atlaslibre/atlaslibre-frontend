interface TooltipFactProps {
  label: string;
}

export default function TooltipFact(props: React.PropsWithChildren<TooltipFactProps>) {
  if (!props.children) return false;

  return (
    <div>
        {props.label}: {props.children}
    </div>
  );
}
