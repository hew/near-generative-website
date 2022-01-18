import NearLogo from './near-logo';

export default function Footer() {
  return (
    <footer>
      <div className="px-8 py-12 flex items-center bg-gray-200">
        <p className="ml-auto mr-2">
          Made by{' '}
          <a className="underline" href="https://tahini.dev">
            tahini
          </a>
          , built on
        </p>
        <NearLogo />
      </div>
    </footer>
  );
}
