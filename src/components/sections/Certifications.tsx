import { certifications } from "@/data/portfolio";

// "2026-09" becomes "September 2026". Falls back to the raw text if it is not year-month.
function formatIssued(issued: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(issued);
  if (!match) return issued;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

// Hidden (no heading, no list) while the certifications list is empty.
export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="mb-3 text-sm font-medium text-foreground/65">Certifications</h3>
      <ul className="grid gap-x-10 md:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={`${cert.issuer}-${cert.name}`}
            className="border-t border-foreground/10 py-4"
          >
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="text-[15px] font-medium leading-tight text-foreground">{cert.name}</p>
              <p className="text-sm text-foreground/65">{cert.issuer}</p>
              <p className="font-mono text-xs text-foreground/65">
                {formatIssued(cert.issued)}
                {cert.credentialId && <> / ID {cert.credentialId}</>}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
