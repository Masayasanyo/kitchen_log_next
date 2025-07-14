export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center mt-auto">
      <small>
        &copy; <span id="year">{currentYear}</span> Kitchen Log
      </small>
    </footer>
  );
}
