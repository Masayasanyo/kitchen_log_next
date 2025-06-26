export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center">
      <small>&copy; <span id="year">{currentYear}</span> Kitchen Log</small>
    </footer>
  );
}