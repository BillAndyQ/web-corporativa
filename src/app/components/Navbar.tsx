import React from 'react';
import Link from 'next/link';
import { Mail, Clock } from 'lucide-react';

const socialLinks = [
    {
        href: "https://www.facebook.com/overhaulmining.eirl",
        label: "Facebook",
        path: <path fill="currentColor" d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z" />,
    },
    {
        href: "https://www.youtube.com/channel/UCe22YT4KMpgPUw6-hLwVYKA?view_as=subscriber",
        label: "YouTube",
        path: <path fill="currentColor" d="M12 4c.855 0 1.732.022 2.582.058l1.004.048l.961.057l.9.061l.822.064a3.8 3.8 0 0 1 3.494 3.423l.04.425l.075.91c.07.943.122 1.971.122 2.954s-.052 2.011-.122 2.954l-.075.91l-.04.425a3.8 3.8 0 0 1-3.495 3.423l-.82.063l-.9.062l-.962.057l-1.004.048A62 62 0 0 1 12 20a62 62 0 0 1-2.582-.058l-1.004-.048l-.961-.057l-.9-.062l-.822-.063a3.8 3.8 0 0 1-3.494-3.423l-.04-.425l-.075-.91A41 41 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91l.04-.425A3.8 3.8 0 0 1 5.73 4.288l.821-.064l.9-.061l.962-.057l1.004-.048A62 62 0 0 1 12 4m-2 5.575v4.85c0 .462.5.75.9.52l4.2-2.425a.6.6 0 0 0 0-1.04l-4.2-2.424a.6.6 0 0 0-.9.52Z" />,
    },
    {
        href: "https://www.linkedin.com/in/overhaul-mining-eirl-908b04191/recent-activity/all/",
        label: "LinkedIn",
        path: <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />,
    },
    {
        href: "https://www.instagram.com/overhaulmining/?hl=es-la",
        label: "Instagram",
        path: <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />,
    },
];

function Navbar() {
    return (
        <div className="w-full bg-brand-950 px-4 text-xs text-gray-200 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-1.5">
                <div className="flex min-w-0 items-center gap-5">
                    <a
                        href="mailto:servicios@overhaulmining.com"
                        className="flex min-w-0 items-center gap-1.5 transition-colors hover:text-white"
                    >
                        <Mail className="h-4 w-4 shrink-0 text-brand-300" aria-hidden />
                        <span className="truncate">servicios@overhaulmining.com</span>
                    </a>
                    <div className="hidden items-center gap-1.5 lg:flex">
                        <Clock className="h-4 w-4 text-brand-300" aria-hidden />
                        <span>Lun - Sab: 9:00 - 18:30</span>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="rounded-md p-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                                {social.path}
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
