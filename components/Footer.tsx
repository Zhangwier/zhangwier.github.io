export default function Footer() {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
      <p>
        用{' '}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-slate-400 hover:text-teal-300"
        >
          Next.js
        </a>{' '}
        与{' '}
        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-slate-400 hover:text-teal-300"
        >
          Tailwind CSS
        </a>{' '}
        构建，托管在{' '}
        <a
          href="https://pages.github.com"
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-slate-400 hover:text-teal-300"
        >
          GitHub Pages
        </a>
        。字体为{' '}
        <a
          href="https://rsms.me/inter/"
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-slate-400 hover:text-teal-300"
        >
          Inter
        </a>
        。
      </p>
    </footer>
  );
}
