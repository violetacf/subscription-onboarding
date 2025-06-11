interface BenefitsProps {
  className?: string;
}

export default function Benefits({ className }: BenefitsProps) {
  return (
    <div className={className} style={{ textAlign: "left" }}>
      <p>Access to 100+ GAMES for FREE thanks to ads</p>
      <p>Log In Across All Your Devices</p>
      <p>Skip the Line with Customer Support</p>
    </div>
  );
}
