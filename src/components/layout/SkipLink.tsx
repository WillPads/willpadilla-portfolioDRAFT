// First tab stop on every page: jumps past the header to <main id="main">.
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute left-4 top-[-100px] z-[100] inline-flex min-h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background focus:top-2"
    >
      Skip to content
    </a>
  );
}
