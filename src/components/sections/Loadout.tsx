import { useState } from 'react';
import type { JSX } from 'react';
import { motion } from 'framer-motion';
import type { SectionId } from '../../App';
import { PixelGrid } from '../ui/PixelGrid';

type Category = 'all' | 'language' | 'framework' | 'tool' | 'design';

// Official SVG icons (simple-icons style) — 24x24 viewBox, currentColor
// Each returns a JSX node so the right-block can render it at 32px.
const Icon = {
  TypeScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h18v18H3V3zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8zM13 11.25h-2.25v6.32H9V11.25H6.75V9.75H13v1.5z" />
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7v5.74c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83zm5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8z" />
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.914 0c-.346 0-.692.02-1.029.06-1.93.234-2.279 1.428-2.279 2.213v1.743h4.554v.581H7.142c-1.323 0-2.484.795-2.846 2.307-.418 1.742-.437 2.83 0 4.654.323 1.377 1.094 2.307 2.418 2.307h1.563v-2.082c0-1.349 1.167-2.539 2.554-2.539h4.539c1.137 0 2.045-.937 2.045-2.078V2.273C17.415.97 16.342.04 14.86.014 13.886 0 12.9 0 11.914 0zM9.84 1.418c.47 0 .854.388.854.864 0 .476-.384.86-.854.86-.471 0-.85-.384-.85-.86 0-.476.379-.864.85-.864zM19.097 4.6v2.04c0 1.402-1.188 2.5-2.554 2.5h-4.539c-1.115 0-2.045.957-2.045 2.08v4.079c0 1.117.969 1.776 2.045 2.078 1.288.364 2.524.43 4.539 0 1.366-.293 2.045-1.049 2.045-2.078v-1.743h-4.539v-.58h6.84c1.323 0 1.823-.883 2.279-2.308.474-1.466.453-2.875 0-4.654-.324-1.276-1.066-2.307-2.418-2.307h-1.653zm-3.144 11.617c.471 0 .85.384.85.86 0 .476-.379.864-.85.864-.47 0-.854-.388-.854-.864 0-.476.384-.86.854-.86z" />
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.05" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  NextJS: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 16l8-10" strokeLinecap="round" />
      <path d="M16 8l-3 8-2-5-3-2z" fill="currentColor" stroke="none" />
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.998 1.85c-.263 0-.524.07-.756.205L3.36 7.107a1.515 1.515 0 0 0-.757 1.308v7.17c0 .538.288 1.034.757 1.308l7.882 5.052c.232.135.493.205.756.205.262 0 .523-.07.755-.205l7.882-5.052c.47-.274.756-.77.756-1.308v-7.17a1.515 1.515 0 0 0-.756-1.308L12.755 2.055a1.515 1.515 0 0 0-.757-.205zm.002 3.404a.563.563 0 0 1 .278.075l5.36 3.435a.563.563 0 0 1 .281.486v6.863a.563.563 0 0 1-.281.487l-5.36 3.435a.563.563 0 0 1-.557 0l-5.36-3.435a.563.563 0 0 1-.281-.487V9.25c0-.2.107-.385.281-.486l5.36-3.435a.563.563 0 0 1 .279-.075zm-.005 2.1L8.4 9.29v1.78l2.7 1.55v3.17l1.9-1.084V11.55l-2.7-1.55V8.43l3.6 2.06v5.36l1.9 1.085V9.85l-3.61-2.06a1 1 0 0 0-.99 0z" />
    </svg>
  ),
  FastAPI: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.546 10.93L13.067 0.453c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.902l2.658 2.66c.645-.223 1.387-.078 1.902.438.715.719.715 1.878 0 2.595-.719.72-1.88.72-2.598 0-.539-.541-.674-1.337-.404-1.996L12.86 8.956v6.805c.175.086.342.197.49.346.715.716.715 1.879 0 2.595-.719.72-1.879.72-2.598 0-.715-.716-.715-1.879 0-2.595.178-.18.387-.314.61-.388V8.83c-.224-.074-.434-.21-.61-.39-.543-.543-.673-1.34-.402-2.002L7.585 3.667 0.454 10.8c-.605.605-.605 1.585 0 2.19l10.48 10.477c.604.605 1.582.605 2.186 0l10.428-10.477c.605-.604.605-1.585 0-2.19" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.983 11.079h2.119a.084.084 0 0 0 .085-.083V9.039a.084.084 0 0 0-.085-.085h-2.119a.085.085 0 0 0-.085.085v1.957c0 .047.038.083.085.083m-2.95-2.249h2.118a.085.085 0 0 0 .085-.085V6.788a.085.085 0 0 0-.085-.085h-2.118a.085.085 0 0 0-.085.085v1.957c0 .047.038.085.085.085m0 2.249h2.118a.085.085 0 0 0 .085-.083V9.039a.085.085 0 0 0-.085-.085h-2.118a.085.085 0 0 0-.085.085v1.957c0 .047.038.083.085.083m-2.949-2.249h2.118a.085.085 0 0 0 .085-.085V6.788a.085.085 0 0 0-.085-.085H8.084a.085.085 0 0 0-.085.085v1.957c0 .047.038.085.085.085m0 2.249h2.118a.085.085 0 0 0 .085-.083V9.039a.085.085 0 0 0-.085-.085H8.084a.085.085 0 0 0-.085.085v1.957c0 .047.038.083.085.083m-2.95-2.249h2.118a.085.085 0 0 0 .085-.085V6.788a.085.085 0 0 0-.085-.085H5.134a.085.085 0 0 0-.085.085v1.957c0 .047.038.085.085.085m0 2.249h2.118a.085.085 0 0 0 .085-.083V9.039a.085.085 0 0 0-.085-.085H5.134a.085.085 0 0 0-.085.085v1.957c0 .047.038.083.085.083m-2.95-2.249h2.118a.085.085 0 0 0 .085-.085V6.788a.085.085 0 0 0-.085-.085H2.184a.085.085 0 0 0-.085.085v1.957c0 .047.038.085.085.085m0 2.249h2.118a.085.085 0 0 0 .085-.083V9.039a.085.085 0 0 0-.085-.085H2.184a.085.085 0 0 0-.085.085v1.957c0 .047.038.083.085.083m12.527 4.715c.434-.602.674-1.347.674-2.194 0-.085-.004-.169-.01-.252-.005-.083-.073-.139-.155-.139h-2.171a.156.156 0 0 0-.154.139c.005.083.01.167.01.252 0 .524-.122.973-.347 1.327-.211.331-.539.521-.998.521-.467 0-.812-.198-1.038-.583-.227-.387-.343-.86-.343-1.428V8.83c0-.083-.066-.151-.149-.151H9.84c-.083 0-.149.068-.149.151v6.196c0 .152.002.302.011.452l-.005.002c.046.41.139.789.281 1.122.247.581.62 1.046 1.124 1.392.502.345 1.115.518 1.84.518.911 0 1.665-.262 2.262-.784.211-.184.394-.398.539-.645l.04.054c.404.531 1.055.829 1.959.829.605 0 1.111-.13 1.527-.391.412-.26.732-.629.962-1.107.227-.474.342-1.025.342-1.654 0-.085-.004-.169-.01-.252a.156.156 0 0 0-.155-.139h-2.171a.156.156 0 0 0-.154.139c.006.083.01.167.01.252 0 .524-.122.973-.347 1.327-.211.331-.539.521-.998.521-.467 0-.812-.198-1.038-.583" />
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.128 24c.084-.025.158-.057.232-.083.057-.02.113-.04.166-.065.05-.025.097-.058.144-.087.04-.025.083-.045.12-.073.05-.04.094-.084.139-.13.034-.034.073-.066.103-.103.045-.055.082-.116.12-.176.025-.038.054-.073.077-.116.04-.08.072-.166.103-.252.013-.034.03-.066.04-.103.04-.16.066-.334.066-.527V9.066a.95.95 0 0 0-.282-.677L12.65.708a.95.95 0 0 0-1.3 0L5.766 8.39a.95.95 0 0 0-.282.677V20.49c0 .183.025.348.063.503.012.05.034.094.05.143.027.084.05.166.087.243.025.05.057.097.087.143.034.05.063.103.103.151.034.038.077.066.113.103.045.044.087.088.143.125.04.029.087.05.13.073.046.029.087.058.137.08.05.025.106.043.16.063.063.025.13.045.197.063.044.012.087.029.13.038.077.014.155.022.232.025h.025v-9.857a.95.95 0 0 1 .282-.677l3.852-3.852a.95.95 0 0 1 1.3 0l3.853 3.852a.95.95 0 0 1 .282.677v9.857h.025c.077-.003.155-.011.232-.025z" />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.193 1.047c-.363-.398-.94-.398-1.302 0L9.665 7.667a.92.92 0 0 0-.275.654v6.673c0 .246.099.481.275.654l5.957 6.591a.92.92 0 0 0 1.342 0l5.957-6.591a.92.92 0 0 0 .275-.654V8.32a.92.92 0 0 0-.275-.654zM12 21.04a.605.605 0 1 1 0-1.21.605.605 0 0 1 0 1.21zm0-3.41a.605.605 0 1 1 0-1.21.605.605 0 0 1 0 1.21zm0-3.41a.605.605 0 1 1 0-1.21.605.605 0 0 1 0 1.21zm0-3.41a.605.605 0 1 1 0-1.21.605.605 0 0 1 0 1.21zm0-3.41a.605.605 0 1 1 0-1.21.605.605 0 0 1 0 1.21z" />
    </svg>
  ),
  Vite: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.108 2.243l-7.057 7.058a1 1 0 0 0 0 1.413l11.227 11.225a1 1 0 0 0 1.414 0l7.057-7.057a1 1 0 0 0 0-1.413L9.522 2.243a1 1 0 0 0-1.414 0zM12 4.7l4.99 4.99-4.99 4.99-4.99-4.99L12 4.7z" />
    </svg>
  ),
  VSCode: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.15 2.587L18.21.21a1.495 1.495 0 0 0-1.705.29l-9.46 8.63-4.28-2.94a1 1 0 0 0-1.36.17L.39 8.6a1 1 0 0 0 .18 1.37l3.85 2.7-3.85 2.7a1 1 0 0 0-.18 1.37l1.02 1.24a1 1 0 0 0 1.36.17l4.28-2.94 9.46 8.63a1.5 1.5 0 0 0 1.71.29l4.94-2.38A1.5 1.5 0 0 0 24 20.05V3.95a1.5 1.5 0 0 0-.85-1.36zM16.85 15.6L10.4 12l6.45-3.6v7.2z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  Cursor: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3l14 9-6 1-2 7-6-17z" />
    </svg>
  ),
  npm: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.89 19.323V5.454h12.222v13.87h-3.587v-3.2H9.476v3.2z" />
    </svg>
  ),
  pnpm: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0v24h24V0zm3.6 3.6h4.8v4.8H3.6zm5.4 0h4.8v4.8H9zm5.4 0h4.8v4.8h-4.8zm-10.8 5.4h4.8v4.8H3.6zm5.4 0h4.8v4.8H9zm5.4 0h4.8v4.8h-4.8zm-10.8 5.4h4.8v4.8H3.6zm5.4 0h4.8v4.8H9zm5.4-10.8h4.8v4.8h-4.8zm0 5.4h4.8v4.8h-4.8z" />
    </svg>
  ),
};

interface Item {
  name: string;
  short: string;
  category: Exclude<Category, 'all'>;
  mark: string;
  years: string;
  icon: (props?: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const ITEMS: Item[] = [
  // Languages
  { name: 'TypeScript',  short: 'TS',  category: 'language', mark: '◆', years: '4y', icon: Icon.TypeScript },
  { name: 'JavaScript',  short: 'JS',  category: 'language', mark: '◆', years: '6y', icon: Icon.JavaScript },
  { name: 'Python',      short: 'PY',  category: 'language', mark: '◆', years: '3y', icon: Icon.Python },

  // Frameworks / runtimes
  { name: 'React',       short: 'RE',  category: 'framework', mark: '◇', years: '4y', icon: Icon.React },
  { name: 'Next.js',     short: 'NX',  category: 'framework', mark: '◇', years: '2y', icon: Icon.NextJS },
  { name: 'Node.js',     short: 'ND',  category: 'framework', mark: '◇', years: '4y', icon: Icon.NodeJS },
  { name: 'FastAPI',     short: 'FA',  category: 'framework', mark: '◇', years: '2y', icon: Icon.FastAPI },
  { name: 'Tailwind',    short: 'TW',  category: 'framework', mark: '◇', years: '3y', icon: Icon.Tailwind },

  // Tools
  { name: 'Git',         short: 'GT',  category: 'tool', mark: '◈', years: '5y', icon: Icon.Git },
  { name: 'Docker',      short: 'DK',  category: 'tool', mark: '◈', years: '2y', icon: Icon.Docker },
  { name: 'PostgreSQL',  short: 'PG',  category: 'tool', mark: '◈', years: '3y', icon: Icon.PostgreSQL },
  { name: 'MongoDB',     short: 'MG',  category: 'tool', mark: '◈', years: '2y', icon: Icon.MongoDB },
  { name: 'Vite',        short: 'VT',  category: 'tool', mark: '◈', years: '2y', icon: Icon.Vite },
  { name: 'VS Code',     short: 'VS',  category: 'tool', mark: '◈', years: '5y', icon: Icon.VSCode },
  { name: 'GitHub',      short: 'GH',  category: 'tool', mark: '◈', years: '4y', icon: Icon.GitHub },
  { name: 'Cursor',      short: 'CL',  category: 'tool', mark: '◈', years: '1y', icon: Icon.Cursor },
  { name: 'npm',         short: 'NP',  category: 'tool', mark: '◈', years: '5y', icon: Icon.npm },
  { name: 'pnpm',        short: 'PN',  category: 'tool', mark: '◈', years: '2y', icon: Icon.pnpm },
];

const FILTERS: { id: Category; label: string }[] = [
  { id: 'all',       label: 'ALL' },
  { id: 'language',  label: 'LANGUAGES' },
  { id: 'framework', label: 'FRAMEWORKS' },
  { id: 'tool',      label: 'TOOLS' },
];

const CAT_LABEL: Record<Exclude<Category, 'all'>, string> = {
  language: 'LANG',
  framework: 'FW',
  tool: 'TOOL',
  design: 'DSGN',
};

const SECTION_META: Record<Exclude<Category, 'all'>, { label: string; comment: string }> = {
  language:  { label: 'LANGUAGES',          comment: '// Core languages I think in' },
  framework: { label: 'FRAMEWORKS',         comment: '// Build faster, ship smarter' },
  tool:      { label: 'TOOLS & DATABASES',  comment: '// My everyday power-ups' },
  design:    { label: 'DESIGN',             comment: '// Design tools' },
};

const SECTION_ORDER: Exclude<Category, 'all'>[] = ['language', 'framework', 'tool', 'design'];

interface LoadoutProps { onNavigate: (id: SectionId) => void; }

export function Loadout({ onNavigate }: LoadoutProps) {
  const [filter, setFilter] = useState<Category>('all');

  const visible = filter === 'all' ? ITEMS : ITEMS.filter(i => i.category === filter);

  // Group items by category, preserving the order they appear in ITEMS
  const groups: { category: Exclude<Category, 'all'>; items: Item[] }[] = [];
  if (filter === 'all') {
    for (const cat of SECTION_ORDER) {
      const items = ITEMS.filter(i => i.category === cat);
      if (items.length > 0) groups.push({ category: cat, items });
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: '#07020a' }}>
      <PixelGrid />

      {/* Right-side decorative vertical column */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.7)' }}>◇</span>
        <span className="font-pixel text-[10px]" style={{ color: '#cc1133' }}>◆</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.7)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
        <span className="font-pixel text-[8px]" style={{ color: 'rgba(204,17,51,0.4)' }}>◇</span>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen pt-[80px] pb-12 px-5 md:px-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-pixel text-[9px] tracking-widest text-[#cc1133]/70">
              [ LOADOUT.MOD ]
            </span>
            <span className="block h-px flex-1 max-w-[120px] bg-gradient-to-r from-[#cc1133]/40 to-transparent" />
          </div>
          <h1
            className="font-pixel text-[#cc1133] tracking-widest"
            style={{
              fontSize: 'clamp(20px, 3.6vw, 36px)',
              textShadow: '0 0 18px rgba(204,17,51,0.55), 0 0 36px rgba(204,17,51,0.25)',
            }}
          >
            EQUIPPED GEAR
          </h1>
          <p className="mt-2 text-[11px] md:text-[12px] tracking-[0.22em] text-[#7a6068] max-w-[640px]">
            Tools I keep slotted for daily work. Filter by category — no filler, no badges for the sake of badges.
          </p>
        </header>

        {/* Filter row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {FILTERS.map(f => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="px-3 py-1.5 font-pixel text-[9px] tracking-[0.18em] transition-all"
                style={{
                  border: `1px solid ${active ? '#cc1133' : 'rgba(122,96,104,0.45)'}`,
                  color: active ? '#cc1133' : '#7a6068',
                  background: active ? 'rgba(204,17,51,0.08)' : 'transparent',
                  boxShadow: active ? '0 0 10px rgba(204,17,51,0.4)' : 'none',
                }}
              >
                {f.label}
              </button>
            );
          })}

          <span className="ml-auto font-pixel text-[9px] tracking-widest text-[#7a6068]">
            {String(visible.length).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')} ACTIVE
          </span>
        </div>

        {/* Grid */}
        {filter === 'all' ? (
          <div className="flex flex-col">
            {groups.map(group => {
              const meta = SECTION_META[group.category];
              return (
                <div key={group.category} className="flex flex-col">
                  {/* Section header */}
                  <div className="flex items-center gap-3 mt-6 mb-3">
                    <span
                      className="font-pixel"
                      style={{ fontSize: '10px', color: '#cc1133' }}
                    >
                      ◆
                    </span>
                    <span
                      className="font-pixel uppercase font-bold"
                      style={{ fontSize: '10px', color: '#cc1133', letterSpacing: '0.3em' }}
                    >
                      {meta.label}
                    </span>
                    <span
                      className="font-pixel"
                      style={{ fontSize: '9px', color: '#7a6068' }}
                    >
                      {meta.comment}
                    </span>
                    <span
                      className="block h-px flex-1"
                      style={{
                        background: 'linear-gradient(to right, rgba(204,17,51,0.3), transparent)',
                      }}
                    />
                  </div>

                  <motion.div
                    layout
                    className="grid gap-3"
                    style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    }}
                  >
                    {group.items.map((item, idx) => (
                      <ItemCard key={item.name} item={item} idx={idx} />
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-3"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            }}
          >
            {visible.map((item, idx) => (
              <ItemCard key={item.name} item={item} idx={idx} />
            ))}
          </motion.div>
        )}

        {/* Footer nav */}
        <div className="mt-auto pt-10 flex items-center justify-between gap-3">
          <FooterNav label="PREV" icon="◀" onClick={() => onNavigate('projects')} side="left" />
          <span className="font-pixel text-[8px] tracking-widest text-[#7a6068]">
            [ LOADOUT v1.0 ]
          </span>
          <FooterNav label="NEXT" icon="▶" onClick={() => onNavigate('contact')} side="right" />
        </div>
      </div>
    </section>
  );
}

function ItemCard({ item, idx }: { item: Item; idx: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.02, duration: 0.25 }}
      className="group relative flex flex-row"
      style={{
        height: '72px',
        background: 'rgba(13,4,8,0.75)',
        border: '1px solid rgba(61,15,26,0.9)',
        clipPath:
          'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(204,17,51,0.6)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(204,17,51,0.12)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(61,15,26,0.9)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Corner accents on hover (border-only) */}
      <span
        className="absolute top-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderTop: '2px solid #cc1133', borderLeft: '2px solid #cc1133' }}
      />
      <span
        className="absolute top-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderTop: '2px solid #cc1133', borderRight: '2px solid #cc1133' }}
      />
      <span
        className="absolute bottom-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderBottom: '2px solid #cc1133', borderLeft: '2px solid #cc1133' }}
      />
      <span
        className="absolute bottom-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderBottom: '2px solid #cc1133', borderRight: '2px solid #cc1133' }}
      />

      {/* Left block */}
      <div
        className="flex flex-col justify-center px-3 py-3 pt-4 min-w-0 flex-1"
        style={{ gap: '2px' }}
      >
        <span
          className="font-pixel leading-none"
          style={{
            fontSize: '22px',
            color: '#cc1133',
            textShadow: '0 0 8px rgba(204,17,51,0.5)',
          }}
        >
          {item.short}
        </span>
        <span
          className="font-pixel tracking-wide block min-w-0 break-words"
          style={{ fontSize: '10px', color: '#e8d8dc' }}
          title={item.name}
        >
          {item.name}
        </span>
        <div className="flex items-center justify-between mt-0.5 gap-1 min-w-0">
          <span
            className="font-pixel tracking-widest whitespace-nowrap shrink-0"
            style={{ fontSize: '8px', color: '#7a6068' }}
          >
            {item.mark} {item.years}
          </span>
          <span
            className="font-pixel px-1 pt-1 whitespace-nowrap shrink-0"
            style={{
              fontSize: '7px',
              color: '#7a6068',
              border: '1px solid rgba(122,96,104,0.35)',
            }}
          >
            {CAT_LABEL[item.category]}
          </span>
        </div>
      </div>

      {/* Right block — fixed width so the left block truly fills the rest */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: '56px' }}
      >
        <span
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            opacity: 0.12,
            color: '#cc1133',
            filter: 'sepia(1) saturate(5) hue-rotate(310deg)',
            userSelect: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <item.icon style={{ width: '100%', height: '100%' }} />
        </span>
        <span
          className="absolute left-0 top-2 bottom-2"
          style={{ width: '1px', background: 'rgba(204,17,51,0.2)' }}
        />
      </div>
    </motion.div>
  );
}

function FooterNav({ label, icon, onClick, side }: { label: string; icon: string; onClick: () => void; side: 'left' | 'right' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: side === 'left' ? -3 : 3 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 font-pixel text-[9px] tracking-widest transition-colors"
      style={{ border: '1px solid rgba(61,15,26,0.8)', color: '#7a6068' }}
    >
      {side === 'left' && <span style={{ color: '#cc1133' }}>{icon}</span>}
      <span>{label}</span>
      {side === 'right' && <span style={{ color: '#cc1133' }}>{icon}</span>}
    </motion.button>
  );
}
