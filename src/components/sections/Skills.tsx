import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────
//  BRAND SVG ICONS
// ─────────────────────────────────────────────

const HTML5Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" fill="#E34F26"/>
    <path d="M12 4.5v15l5.3-1.5 1.3-13.5H12z" fill="#EF652A"/>
    <path d="M12 8.5H8.5l.3 2.5H12v2.5H9.1l.2 2.3 2.7.7 2.7-.7.3-2.8H12V8.5z" fill="white"/>
    <path d="M12 8.5v2.5h3.2l-.3 2.5-2.9.7v2.5l5.3-1.5 1.3-6.7H12z" fill="#EBEBEB"/>
  </svg>
);

const CSS3Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" fill="#1572B6"/>
    <path d="M12 4.5v15l5.3-1.5 1.3-13.5H12z" fill="#33A9DC"/>
    <path d="M12 13.5l-2.7-.7-.2-2H6.9l.5 4.5 4.6 1.2v-3z" fill="white"/>
    <path d="M14.9 8.5H12v2.5h2.7l-.3 2.5-2.4.6v2.4l4.5-1.2.3-2.8.4-4H12z" fill="white"/>
    <path d="M12 8.5H7.5l.2 2.5H12V8.5z" fill="#EBEBEB"/>
    <path d="M12 13.5v3l2.4-.7.3-2.3H12z" fill="#EBEBEB"/>
  </svg>
);

const JSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
    <path d="M7 18.5c.5.8 1.1 1.4 2.3 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.8 1.4-3.2 3.6-3.2 1.6 0 2.7.6 3.5 2l-1.9 1.2c-.4-.8-.9-1.1-1.6-1.1-.7 0-1.2.5-1.2 1.1 0 .8.5 1.1 1.6 1.5l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.2-1.7 3.4-4 3.4-2.2 0-3.7-1.1-4.4-2.5L7 18.5zM15 18.3c.4.7.8 1.3 1.7 1.3.9 0 1.4-.4 1.4-1.8V10h2.4v7.9c0 3-1.8 4.4-4.4 4.4-2.3 0-3.7-1.2-4.4-2.7L15 18.3z" fill="#000"/>
  </svg>
);

const TSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="2" fill="#3178C6"/>
    <path d="M13.5 12H11v7H9v-7H6.5v-2H13.5v2zM18 14.2c-.3-.2-.7-.4-1.2-.4-.8 0-1.3.3-1.3.8 0 .4.3.7 1 1l.5.2c1.4.5 2 1.2 2 2.3 0 1.4-1.1 2.2-2.8 2.2-1.2 0-2.2-.4-2.9-1.2l1-1.3c.4.5 1 .8 1.8.8.8 0 1.3-.3 1.3-.9 0-.5-.3-.8-1-.9l-.5-.2c-1.3-.4-2-1.1-2-2.3 0-1.4 1.1-2.2 2.7-2.2 1 0 1.9.3 2.5.8L18 14.2z" fill="white"/>
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2.1" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/>
  </svg>
);

const NextjsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#000"/>
    <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="0.5"/>
    <path d="M7.5 7.5h1.5l7.5 9.5H15L7.5 7.5z" fill="white"/>
    <path d="M14.5 7.5v9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.5 7.5v9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const VueIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5L9 9l-6.5-6H0l12 17.5L24 3h-2.5L15 9l-3-4.5z" fill="#41B883"/>
    <path d="M12 4.5L9 9l3 4.3 3-4.3-3-4.5z" fill="#35495E"/>
  </svg>
);

const NuxtIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4 4.5L8.1 14.2H14L10.6 20.3l8.1-10.3H13L16.6 4.5z" fill="#00DC82"/>
    <path d="M6.5 20.3H4.3l4.3-7.5-1.6-2.7L1 20.3h5.8l-.3-.0z" fill="#00DC82" opacity="0.7"/>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6c-2.7 0-4.4 1.4-5 4 1-1.3 2.2-1.9 3.5-1.6.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.9-3.5 1.6-.8-.2-1.3-.8-1.9-1.4C15.4 7.2 14.3 6 12 6zM7 12c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.9 3.5-1.6.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.9-3.5 1.6-.8-.2-1.3-.8-1.9-1.4C10.4 13.2 9.3 12 7 12z" fill="#06B6D4"/>
  </svg>
);

const GSAPIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#0AE448"/>
    <text x="3.5" y="16" fontSize="8.5" fontWeight="bold" fontFamily="monospace" fill="#000">GSAP</text>
  </svg>
);

const LucideIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#F97316" strokeWidth="1.5"/>
    <path d="M8 12l2.5 2.5L16 9" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.3 4.4A19.7 19.7 0 0 0 15.2 3c-.2.5-.5 1-.7 1.5a18.3 18.3 0 0 0-5.1 0C9.2 4 8.9 3.5 8.7 3A19.8 19.8 0 0 0 3.6 4.4C.5 9.1-.3 13.7.1 18.2a19.9 19.9 0 0 0 6 2.9c.5-.6.9-1.3 1.3-2a12.8 12.8 0 0 1-2-.9c.2-.1.3-.3.5-.4a14.2 14.2 0 0 0 12.1 0l.5.4c-.6.3-1.3.7-2 .9.4.7.8 1.4 1.3 2a19.8 19.8 0 0 0 6-2.9c.5-5.2-.8-9.7-3.5-13.8zM8.5 15.5c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1c1.1 0 2 .9 2 2.1 0 1.1-.9 2.1-2 2.1zm7 0c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1 2 .9 2 2.1c0 1.1-.9 2.1-2 2.1z" fill="#5865F2"/>
  </svg>
);

const VSCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 3.3L9.1 11.1 5.1 8 3 9.5l4 3-4 3L5.1 17l4-3.1 8.4 7.8 3-1.5V4.8l-3-1.5z" fill="#007ACC"/>
    <path d="M17.5 3.3L9.1 11.1 5.1 8 3 9.5l4 3-4 3L5.1 17l4-3.1 8.4 7.8 3-1.5V4.8l-3-1.5zM17.5 8.2l-6.2 3.8 6.2 3.8V8.2z" fill="white" opacity="0.3"/>
  </svg>
);

const CursorAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#1A1A1A"/>
    <path d="M5 5l9.5 9.5-4 .5 2 5-2.5 1-2-5-3 3V5z" fill="white"/>
  </svg>
);

const ViteIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5 2L13 13.5l-1.5-5L2 9l9 13L23 3l-1.5-1z" fill="#BD34FE"/>
    <path d="M13 13.5L11.5 8.5 14 6l-1 7.5z" fill="#FFD62E"/>
  </svg>
);

const NodejsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#339933"/>
    <path d="M12 4.5L5 8.5v7l7 4 7-4v-7L12 4.5z" fill="#6CC24A" opacity="0.4"/>
    <text x="7.5" y="15" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="white">JS</text>
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.3 11.3L12.7 1.7a1.2 1.2 0 0 0-1.6 0L9 3.8l2 2a1.5 1.5 0 0 1 1.8 1.9l1.9 1.9a1.5 1.5 0 0 1 1.5 2.5 1.5 1.5 0 0 1-2.5-1.5L11.8 8.7v5.3a1.5 1.5 0 0 1 .4 2.8 1.5 1.5 0 0 1-1.5-2.6V8.5A1.5 1.5 0 0 1 9.8 7L7.7 5 1.7 11a1.2 1.2 0 0 0 0 1.7l9.6 9.6a1.2 1.2 0 0 0 1.7 0l9.3-9.3a1.2 1.2 0 0 0 0-1.7z" fill="#F05032"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1 .6-1.2-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" fill="#fff"/>
  </svg>
);

const VercelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L2 21h20L12 3z" fill="white"/>
  </svg>
);

const LinuxIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 3C9 3 7 5.2 7 8c0 1.3.4 2.5 1 3.3L6 16c-.5 1 0 2.5 1.5 3 .5.2 1.8.5 2.5.5.2.5.6.8 1 .8s.8-.3 1-.8c1 0 2.3-.3 2.8-.5C16 18.5 16.5 17 16 16l-2-4.7c.7-.8 1-2 1-3.3C15 5.2 13.9 3 11.5 3z" fill="#FFD700" opacity="0.9"/>
    <circle cx="10" cy="9" r="1" fill="#000"/>
    <circle cx="13" cy="9" r="1" fill="#000"/>
    <path d="M10 12c.5.7 3 .7 3 0" fill="none" stroke="#000" strokeWidth="0.8"/>
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="white"/>
    <path d="M6 5h8l4 4v10H6V5z" fill="none" stroke="#000" strokeWidth="1.2"/>
    <path d="M14 5v4h4" fill="none" stroke="#000" strokeWidth="1.2"/>
    <path d="M9 11h6M9 14h4" stroke="#000" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const CapCutIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#000"/>
    <path d="M6 8l6 4-6 4V8z" fill="white"/>
    <path d="M14 8l6 4-6 4V8z" fill="white" opacity="0.6"/>
  </svg>
);

const CanvaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#7D2AE8"/>
    <path d="M14.5 8.5C14.5 9.9 13.4 11 12 11S9.5 9.9 9.5 8.5 10.6 6 12 6s2.5 1.1 2.5 2.5z" fill="white"/>
    <path d="M8 16.5c0-2.2 1.8-4 4-4s4 1.8 4 4H8z" fill="white"/>
  </svg>
);

const NanoBananaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 6C7.5 4 9.5 3.5 12 4.5c4 1.5 5.5 5 4.5 9.5-.5 2.5-2 4-3.5 4.5-1.5.5-3 0-3.5-1" fill="#FFE135"/>
    <path d="M6 7C5 9 5.5 12 7.5 14.5 9 16.5 10.5 17 12 16.5" fill="none" stroke="#E8C400" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="7" cy="6" r="1" fill="#8B7355"/>
  </svg>
);

const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.7 9.8a5.2 5.2 0 0 0-.4-4.3 5.4 5.4 0 0 0-5.8-2.6 5.2 5.2 0 0 0-3.9-1.7 5.4 5.4 0 0 0-5.1 3.7A5.2 5.2 0 0 0 2 8.7a5.4 5.4 0 0 0 .7 6.6 5.2 5.2 0 0 0 .4 4.3 5.4 5.4 0 0 0 5.8 2.6 5.2 5.2 0 0 0 3.9 1.7 5.4 5.4 0 0 0 5.2-3.8 5.2 5.2 0 0 0 3.4-2.6 5.4 5.4 0 0 0-.7-7.7zm-8 10.4c-.9 0-1.7-.3-2.4-.8l.1-.1 4-2.3a.7.7 0 0 0 .3-.6v-5.6l1.7 1v4.7a3.7 3.7 0 0 1-3.7 3.7zm-7.9-3.4a3.6 3.6 0 0 1-.4-2.5v-.1l4 2.3a.7.7 0 0 0 .7 0l4.9-2.8v2l-4 2.4a3.7 3.7 0 0 1-5.2-1.3zm-1-8a3.6 3.6 0 0 1 1.9-1.6V12a.7.7 0 0 0 .3.6l4.9 2.8-1.7 1L5.4 14a3.7 3.7 0 0 1-.6-5.2zm13.5 3.2L12.4 9.2l1.7-1 3.8 2.2a3.7 3.7 0 0 1-.6 6.7v-4.7a.7.7 0 0 0-.3-.7zm1.7-2.5l-.1.1-4-2.3a.7.7 0 0 0-.7 0L9.2 10V8l4-2.4a3.7 3.7 0 0 1 5.5 3.9zm-10.6 3.5L6.7 12v-4.7a3.7 3.7 0 0 1 6-2.8l-.1.1-4 2.3a.7.7 0 0 0-.3.6v5.6l-1.7-.9zm.9-2.1l2.2-1.2 2.2 1.2v2.5l-2.2 1.2-2.2-1.2V11z" fill="white"/>
  </svg>
);

const ChatGPTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#10A37F"/>
    <path d="M18.7 9.8a4.5 4.5 0 0 0-.4-3.7 4.6 4.6 0 0 0-5-2.2 4.5 4.5 0 0 0-3.4-1.5 4.6 4.6 0 0 0-4.4 3.2A4.5 4.5 0 0 0 3 8.1a4.6 4.6 0 0 0 .6 5.7 4.5 4.5 0 0 0 .4 3.7 4.6 4.6 0 0 0 5 2.2 4.5 4.5 0 0 0 3.4 1.5 4.6 4.6 0 0 0 4.4-3.2 4.5 4.5 0 0 0 2.9-6.2zM12 17.8a3.2 3.2 0 0 1-2-.7l3.5-2a.6.6 0 0 0 .3-.5v-4.8l1.5.8v4a3.2 3.2 0 0 1-3.3 3.2zM5.2 14.8a3 3 0 0 1-.4-2.2l3.5 2a.6.6 0 0 0 .6 0l4.2-2.4v1.7l-3.5 2a3.2 3.2 0 0 1-4.4-1.1zm-.8-6.9a3.1 3.1 0 0 1 1.7-1.4v4a.6.6 0 0 0 .3.5l4.2 2.4-1.5.9-3.3-1.9a3.2 3.2 0 0 1-.4-4.5zm11.6 2.8l-3.3-1.9 1.5-.8 3.3 1.9a3.2 3.2 0 0 1-.5 5.8v-4a.6.6 0 0 0-.3-.6l-.7-.4zm1.4-2.2l-3.4-2a.6.6 0 0 0-.6 0L9.2 9v-1.7l3.4-2a3.2 3.2 0 0 1 4.8 3.4zm-9.2 3l-1.5-.8V6.7a3.2 3.2 0 0 1 5.2-2.4l-3.5 2a.6.6 0 0 0-.3.5l.1 4.8zm.8-1.8l1.9-1.1 1.9 1.1v2.2L11 14.9l-1.9-1.1v-2.1z" fill="white"/>
  </svg>
);

const ClaudeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#D97757"/>
    <path d="M8.5 16.5L12 6.5 15.5 16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 13.5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemini-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4285F4"/>
        <stop offset="50%" stopColor="#9C4CF4"/>
        <stop offset="100%" stopColor="#4285F4"/>
      </linearGradient>
    </defs>
    <path d="M12 3C12 3 13.5 9 19 12c-5.5 3-7 9-7 9s-1.5-6-7-9c5.5-3 7-9 7-9z" fill="url(#gemini-grad)"/>
  </svg>
);

const GrokIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#000"/>
    <path d="M6 18L12 6l6 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 14h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="6" r="1.5" fill="white"/>
  </svg>
);

// Battle Roles – custom SVG glyphs

const ResponsiveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#ff003c" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="13" height="11" rx="1.5" strokeLinecap="round"/>
    <path d="M8 18h3" strokeLinecap="round"/>
    <rect x="17" y="8" width="4" height="9" rx="1" strokeLinecap="round"/>
    <path d="M18.5 10.5h1" strokeLinecap="round"/>
  </svg>
);

const LandingPageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#ff003c" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <path d="M4 9h16" strokeLinecap="round"/>
    <path d="M9 9v11" strokeLinecap="round"/>
  </svg>
);

const WebAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#ff003c" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="5" width="16" height="14" rx="2"/>
    <path d="M4 9h16" strokeLinecap="round"/>
    <path d="M8 13h3M13 13h3M8 16h8" strokeLinecap="round"/>
  </svg>
);

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#ff003c" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="6" height="7" rx="1"/>
    <rect x="12" y="4" width="8" height="4" rx="1"/>
    <rect x="12" y="10" width="8" height="10" rx="1"/>
    <rect x="4" y="13" width="6" height="7" rx="1"/>
  </svg>
);

const UIUXIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#ff003c" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20c4-1 7-4 8-8l8-8-4-4-8 8c-4 1-7 4-8 8l4 4z"/>
    <path d="M12 12L8 8"/>
  </svg>
);

const BotDevIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#ff003c" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="7" width="12" height="10" rx="2"/>
    <path d="M12 3v4" strokeLinecap="round"/>
    <circle cx="9" cy="12" r="1" fill="#ff003c"/>
    <circle cx="15" cy="12" r="1" fill="#ff003c"/>
    <path d="M8 17h8" strokeLinecap="round"/>
  </svg>
);

const AIIntegrationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="#ff003c" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="2"/>
    <circle cx="18" cy="6" r="2"/>
    <circle cx="12" cy="18" r="2"/>
    <path d="M7.5 7.5l3.5 3.5M16.5 7.5l-3.5 3.5M12 16V13" strokeLinecap="round"/>
  </svg>
);

const CatMascotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L5 4l4 2 3-2 3 2 4-2-1 5" stroke="#ff003c" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 8C5.7 9 5 10.6 5 12.5C5 17 8.1 20 12 20s7-3 7-7.5c0-1.9-.7-3.5-2-4.5" stroke="#ff003c" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="9.5" cy="13" r="0.8" fill="#ff003c"/>
    <circle cx="14.5" cy="13" r="0.8" fill="#ff003c"/>
    <path d="M10 16c1.3.8 2.7.8 4 0" stroke="#ff003c" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// Column header glyphs
const CodeCoreGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <polyline points="10 6 4 12 10 18"/><polyline points="14 6 20 12 14 18"/>
  </svg>
);
const FrameworkGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7 12 4l5 3-5 3-5-3Z"/><path d="M7 7v6l5 3 5-3V7"/><path d="M12 10v6"/>
  </svg>
);
const DevToolsGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 6.5a4.5 4.5 0 0 0-6 6L4 17v3h3l4.5-4.5a4.5 4.5 0 0 0 6-6l-3 3-2-2 3-3Z"/>
  </svg>
);
const DesignGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20c4-1 7-4 8-8l8-8-4-4-8 8c-4 1-7 4-8 8l4 4Z"/>
  </svg>
);
const AIGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v3M12 3v3M15 3v3M9 21v-3M12 21v-3M15 21v-3M21 9h-3M21 12h-3M21 15h-3M3 9h3M3 12h3M3 15h3"/>
  </svg>
);
const BattleGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5"/>
  </svg>
);

// ─────────────────────────────────────────────
//  DATA TYPES
// ─────────────────────────────────────────────

type SkillNode = {
  id: string;
  title: string;
  Icon: React.FC;
  x: number; // 0–100% within column
  y: number; // row index
};

type SkillEdge = { from: string; to: string };

type SkillColumn = {
  id: string;
  title: string;
  subtitle: string;
  HeaderIcon: React.FC;
  nodes: SkillNode[];
  edges: SkillEdge[];
};

// ─────────────────────────────────────────────
//  SKILL TREE DATA
// ─────────────────────────────────────────────

const COLUMNS: SkillColumn[] = [
  {
    id: 'core',
    title: 'CODE CORE',
    subtitle: 'Languages',
    HeaderIcon: CodeCoreGlyph,
    nodes: [
      { id: 'html',  title: 'HTML5',            Icon: HTML5Icon, x: 50, y: 0 },
      { id: 'css',   title: 'CSS3',             Icon: CSS3Icon,  x: 25, y: 1 },
      { id: 'js',    title: 'JavaScript\n(ES6+)', Icon: JSIcon,  x: 75, y: 1 },
      { id: 'ts',    title: 'TypeScript',       Icon: TSIcon,    x: 75, y: 2 },
    ],
    edges: [
      { from: 'html', to: 'css' },
      { from: 'html', to: 'js' },
      { from: 'js',   to: 'ts' },
    ],
  },
  {
    id: 'frameworks',
    title: 'FRAMEWORK FORGE',
    subtitle: 'Frameworks & Libraries',
    HeaderIcon: FrameworkGlyph,
    nodes: [
      { id: 'react',    title: 'React 18',      Icon: ReactIcon,    x: 50, y: 0 },
      { id: 'next',     title: 'Next.js',       Icon: NextjsIcon,   x: 30, y: 1 },
      { id: 'vue',      title: 'Vue 3',         Icon: VueIcon,      x: 70, y: 1 },
      { id: 'nuxt',     title: 'Nuxt',          Icon: NuxtIcon,     x: 15, y: 2 },
      { id: 'tailwind', title: 'Tailwind CSS',  Icon: TailwindIcon, x: 50, y: 2 },
      { id: 'gsap',     title: 'GSAP',          Icon: GSAPIcon,     x: 85, y: 2 },
      { id: 'lucide',   title: 'Lucide React',  Icon: LucideIcon,   x: 15, y: 3 },
      { id: 'discord',  title: 'Discord.js v14',Icon: DiscordIcon,  x: 85, y: 3 },
    ],
    edges: [
      { from: 'react',    to: 'next' },
      { from: 'react',    to: 'vue' },
      { from: 'next',     to: 'nuxt' },
      { from: 'next',     to: 'tailwind' },
      { from: 'vue',      to: 'tailwind' },
      { from: 'vue',      to: 'gsap' },
      { from: 'nuxt',     to: 'lucide' },
      { from: 'gsap',     to: 'discord' },
    ],
  },
  {
    id: 'devtools',
    title: 'DEV TOOLS',
    subtitle: 'Tools & Platforms',
    HeaderIcon: DevToolsGlyph,
    nodes: [
      { id: 'vscode',  title: 'VS Code',      Icon: VSCodeIcon,  x: 50, y: 0 },
      { id: 'cursor',  title: 'Cursor',       Icon: CursorAppIcon, x: 30, y: 1 },
      { id: 'vite',    title: 'Vite',         Icon: ViteIcon,    x: 70, y: 1 },
      { id: 'node',    title: 'Node.js',      Icon: NodejsIcon,  x: 15, y: 2 },
      { id: 'git',     title: 'Git',          Icon: GitIcon,     x: 50, y: 2 },
      { id: 'github',  title: 'GitHub',       Icon: GithubIcon,  x: 85, y: 2 },
      { id: 'vercel',  title: 'Vercel',       Icon: VercelIcon,  x: 10, y: 3 },
      { id: 'vps',     title: 'VPS (Linux)',  Icon: LinuxIcon,   x: 36, y: 3 },
      { id: 'notion',  title: 'Notion',       Icon: NotionIcon,  x: 63, y: 3 },
      { id: 'capcut',  title: 'CapCut',       Icon: CapCutIcon,  x: 90, y: 3 },
    ],
    edges: [
      { from: 'vscode',  to: 'cursor' },
      { from: 'vscode',  to: 'vite' },
      { from: 'cursor',  to: 'node' },
      { from: 'cursor',  to: 'git' },
      { from: 'vite',    to: 'git' },
      { from: 'vite',    to: 'github' },
      { from: 'node',    to: 'vercel' },
      { from: 'node',    to: 'vps' },
      { from: 'git',     to: 'vps' },
      { from: 'git',     to: 'notion' },
      { from: 'github',  to: 'notion' },
      { from: 'github',  to: 'capcut' },
    ],
  },
  {
    id: 'design',
    title: 'DESIGN ARMORY',
    subtitle: 'Design Tools',
    HeaderIcon: DesignGlyph,
    nodes: [
      { id: 'canva', title: 'Canva',       Icon: CanvaIcon,      x: 50, y: 0 },
      { id: 'nano',  title: 'Nano Banana', Icon: NanoBananaIcon, x: 50, y: 2 },
    ],
    edges: [
      { from: 'canva', to: 'nano' },
    ],
  },
  {
    id: 'ai',
    title: 'AI COMPANIONS',
    subtitle: 'AI Tools',
    HeaderIcon: AIGlyph,
    nodes: [
      { id: 'openai',   title: 'OpenAI API\n(integration)', Icon: OpenAIIcon,  x: 50, y: 0 },
      { id: 'chatgpt',  title: 'ChatGPT',                  Icon: ChatGPTIcon,  x: 30, y: 1 },
      { id: 'claude',   title: 'Claude',                   Icon: ClaudeIcon,   x: 70, y: 1 },
      { id: 'gemini',   title: 'Gemini',                   Icon: GeminiIcon,   x: 30, y: 2 },
      { id: 'grok',     title: 'Grok',                     Icon: GrokIcon,     x: 70, y: 2 },
    ],
    edges: [
      { from: 'openai',  to: 'chatgpt' },
      { from: 'openai',  to: 'claude' },
      { from: 'chatgpt', to: 'gemini' },
      { from: 'claude',  to: 'grok' },
    ],
  },
  {
    id: 'roles',
    title: 'BATTLE ROLES',
    subtitle: 'Focus Areas',
    HeaderIcon: BattleGlyph,
    nodes: [
      { id: 'responsive', title: 'Responsive UI',  Icon: ResponsiveIcon,    x: 50, y: 0 },
      { id: 'landing',    title: 'Landing Pages',  Icon: LandingPageIcon,   x: 30, y: 1 },
      { id: 'webapps',    title: 'Web Apps',       Icon: WebAppIcon,        x: 70, y: 1 },
      { id: 'dashboard',  title: 'Dashboard',      Icon: DashboardIcon,     x: 30, y: 2 },
      { id: 'uiux',       title: 'UI/UX Design',   Icon: UIUXIcon,          x: 70, y: 2 },
      { id: 'bot',        title: 'Bot Development', Icon: BotDevIcon,       x: 30, y: 3 },
      { id: 'aiint',      title: 'AI Integration', Icon: AIIntegrationIcon, x: 70, y: 3 },
    ],
    edges: [
      { from: 'responsive', to: 'landing' },
      { from: 'responsive', to: 'webapps' },
      { from: 'landing',    to: 'dashboard' },
      { from: 'landing',    to: 'uiux' },
      { from: 'webapps',    to: 'uiux' },
      { from: 'dashboard',  to: 'bot' },
      { from: 'dashboard',  to: 'aiint' },
      { from: 'uiux',       to: 'aiint' },
    ],
  },
];

// ─────────────────────────────────────────────
//  LAYOUT CONSTANTS
// ─────────────────────────────────────────────

const COL_W   = 260;
const ROW_H   = 128;
const NODE_W  = 76;
const NODE_H  = 88;

// ─────────────────────────────────────────────
//  GLITCH HOOK
// ─────────────────────────────────────────────

function useGlitch(active: boolean) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    if (!active) return;
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 160);
    };
    const id = setInterval(trigger, 3000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, [active]);
  return glitch;
}

// ─────────────────────────────────────────────
//  SKILL NODE
// ─────────────────────────────────────────────

interface NodeProps {
  node: SkillNode;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const chamfer = 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)';

function getGlitchShift(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }

  return hash % 2 === 0 ? 2 : -2;
}

function getIconJitter(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 33 + seed.charCodeAt(i)) | 0;
  }

  return ((Math.abs(hash) % 3) - 1) * 1.5;
}

function SkillNodeCard({ node, isHighlighted, onMouseEnter, onMouseLeave }: NodeProps) {
  const glitch = useGlitch(isHighlighted);
  const leftPx = (node.x / 100) * COL_W;
  const topPx  = node.y * ROW_H;
  const glitchShift = getGlitchShift(node.id);
  const iconJitter = getIconJitter(node.id);

  return (
    <div
      className="absolute z-10 cursor-pointer"
      style={{ left: leftPx, top: topPx, transform: 'translateX(-50%)', width: NODE_W, height: NODE_H }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Outer glow ring */}
      <div
        className="w-full h-full p-px transition-all duration-200"
        style={{
          clipPath: chamfer,
          background: isHighlighted ? '#ff003c' : 'rgba(255,0,60,0.35)',
          boxShadow: isHighlighted ? '0 0 18px rgba(255,0,60,0.9), 0 0 40px rgba(255,0,60,0.4)' : 'none',
          transform: isHighlighted ? 'scale(1.08)' : 'scale(1)',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Inner card */}
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
          style={{
            clipPath: chamfer,
            background: isHighlighted ? '#120000' : '#080000',
          }}
        >
          {/* Scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,60,0.04) 3px, rgba(255,0,60,0.04) 4px)',
            }}
          />

          {/* Glitch offset layer */}
          {glitch && (
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,60,0.15) 2px, rgba(255,0,60,0.15) 3px)',
                transform: `translateX(${glitchShift}px)`,
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Icon wrapper */}
          <div
            style={{
              filter: isHighlighted ? 'drop-shadow(0 0 6px rgba(255,0,60,0.9)) drop-shadow(0 0 12px rgba(255,0,60,0.5))' : 'none',
              transform: glitch ? `translate(${iconJitter}px, 0)` : 'none',
              transition: 'filter 0.2s',
            }}
          >
            <node.Icon />
          </div>

          {/* Label */}
          <span
            className="text-center font-bold leading-tight px-1 select-none"
            style={{
              fontSize: '8.5px',
              letterSpacing: '0.05em',
              color: isHighlighted ? '#fff' : 'rgba(255,0,60,0.85)',
              textShadow: isHighlighted ? '0 0 8px rgba(255,255,255,0.6)' : 'none',
              whiteSpace: 'pre-line',
            }}
          >
            {node.title}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  SVG EDGES
// ─────────────────────────────────────────────

interface EdgesProps {
  edges: SkillEdge[];
  nodes: SkillNode[];
  hoveredNode: string | null;
}

function TreeEdges({ edges, nodes, hoveredNode }: EdgesProps) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none z-0 overflow-visible"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <filter id="edge-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="edge-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {edges.map((edge, idx) => {
        const from = nodes.find(n => n.id === edge.from);
        const to   = nodes.find(n => n.id === edge.to);
        if (!from || !to) return null;

        const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;

        const x1   = (from.x / 100) * COL_W;
        const y1   = from.y * ROW_H + NODE_H;
        const x2   = (to.x  / 100) * COL_W;
        const y2   = to.y   * ROW_H;
        const busY = y1 + 20;

        const sameRow = Math.abs(from.y - to.y) <= 1;
        const d = sameRow && x1 !== x2
          ? `M ${x1} ${y1} L ${x1} ${busY} L ${x2} ${busY} L ${x2} ${y2}`
          : `M ${x1} ${y1} L ${x2} ${y2}`;

        const junctions = sameRow && x1 !== x2
          ? [{ cx: x1, cy: busY }, { cx: x2, cy: busY }]
          : [];

        return (
          <g key={`${edge.from}-${edge.to}-${idx}`}>
            {/* Base dim line */}
            <path
              d={d}
              fill="none"
              stroke={isHighlighted ? '#ff003c' : 'rgba(255,0,60,0.25)'}
              strokeWidth={isHighlighted ? 1.8 : 1}
              filter={isHighlighted ? 'url(#edge-glow-strong)' : undefined}
            />

            {/* Animated signal pulse on hover */}
            {isHighlighted && (
              <motion.path
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={1}
                strokeDasharray="5 10"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -60 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Junction dots */}
            {junctions.map((j, ji) => (
              <circle
                key={ji}
                cx={j.cx}
                cy={j.cy}
                r={isHighlighted ? 3 : 2}
                fill="#ff003c"
                filter={isHighlighted ? 'url(#edge-glow)' : undefined}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────
//  COLUMN
// ─────────────────────────────────────────────

interface ColumnProps {
  data: SkillColumn;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
}

const colChamfer = 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)';

function Column({ data, hoveredNode, setHoveredNode }: ColumnProps) {
  const maxRow   = Math.max(...data.nodes.map(n => n.y));
  const treeH    = maxRow * ROW_H + NODE_H + 20;

  return (
    <div className="flex-shrink-0 flex flex-col items-center" style={{ width: COL_W }}>
      {/* ── Column Header ── */}
      <div className="w-full mb-6 relative z-20 group">
        <div
          className="w-full h-[58px] p-px transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(255,0,60,0.5)]"
          style={{
            clipPath: colChamfer,
            background: 'rgba(255,0,60,0.9)',
            boxShadow: '0 0 10px rgba(255,0,60,0.2)',
          }}
        >
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-0.5 relative overflow-hidden"
            style={{ clipPath: colChamfer, background: '#050000' }}
          >
            {/* scanlines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,60,0.08) 3px, rgba(255,0,60,0.08) 4px)',
              }}
            />
            <div className="flex items-center gap-1.5 relative z-10">
              <data.HeaderIcon />
              <span className="font-bold text-[11px] tracking-widest text-[#ff003c] uppercase">{data.title}</span>
            </div>
          </div>
        </div>
        <p className="text-center text-[9px] text-[#ff003c]/55 tracking-widest uppercase mt-1.5">{data.subtitle}</p>

        {/* Vertical stem from header to first node */}
        <div className="flex justify-center mt-1">
          <div className="w-px bg-[#ff003c]/35" style={{ height: 24 }} />
        </div>
      </div>

      {/* ── Tree Canvas ── */}
      <div className="relative w-full" style={{ height: treeH }}>
        <TreeEdges edges={data.edges} nodes={data.nodes} hoveredNode={hoveredNode} />

        {data.nodes.map(node => {
          const isHovered    = hoveredNode === node.id;
          const isConnected  = hoveredNode
            ? data.edges.some(e => (e.from === node.id && e.to === hoveredNode) || (e.to === node.id && e.from === hoveredNode))
            : false;
          return (
            <SkillNodeCard
              key={node.id}
              node={node}
              isHighlighted={isHovered || isConnected}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  GLITCH TEXT
// ─────────────────────────────────────────────

function GlitchTitle({ text }: { text: string }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <h1 className="relative text-3xl md:text-4xl font-extrabold tracking-[0.18em] uppercase select-none" style={{ color: '#ff003c', textShadow: '0 0 20px rgba(255,0,60,0.8), 0 0 40px rgba(255,0,60,0.3)' }}>
      {/* Glitch layer 1 */}
      <span
        aria-hidden
        className="absolute top-0 left-0 w-full"
        style={{
          color: '#ff003c',
          clipPath: 'inset(30% 0 40% 0)',
          transform: tick % 2 === 0 ? 'translateX(-2px)' : 'translateX(2px)',
          opacity: 0.7,
          transition: 'transform 0.08s',
          textShadow: '-2px 0 #00ffff',
        }}
      >{text}</span>
      {/* Glitch layer 2 */}
      <span
        aria-hidden
        className="absolute top-0 left-0 w-full"
        style={{
          color: '#ff003c',
          clipPath: 'inset(60% 0 10% 0)',
          transform: tick % 2 === 0 ? 'translateX(2px)' : 'translateX(-2px)',
          opacity: 0.5,
          transition: 'transform 0.08s',
          textShadow: '2px 0 #ff00ff',
        }}
      >{text}</span>
      {/* Real text */}
      <span className="relative">{text}</span>
    </h1>
  );
}

// ─────────────────────────────────────────────
//  ROOT EXPORT
// ─────────────────────────────────────────────

export function Skills() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen font-mono relative overflow-hidden"
      style={{ background: '#050000', color: '#ff003c' }}
    >
      {/* ── BG: dot grid ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,0,60,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* ── BG: radial vignette ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,0,60,0.06) 0%, transparent 70%)',
        }}
      />
      {/* ── BG: corner glow ── */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 0 0, rgba(255,0,60,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 100% 100%, rgba(255,0,60,0.08) 0%, transparent 70%)' }} />

      <main className="relative z-10 max-w-[1800px] mx-auto px-4 py-8 flex flex-col min-h-screen">

        {/* ── HEADER ── */}
        <header className="flex flex-col items-center mt-10 mb-12 relative gap-2">
          {/* Decorative left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-2 text-[#ff003c]/40 text-[10px] tracking-widest">
            <div className="w-20 h-px bg-[#ff003c]/30" />
            <span>[ SYSTEM.ONLINE ]</span>
          </div>
          {/* Decorative right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-2 text-[#ff003c]/40 text-[10px] tracking-widest">
            <span>[ STATUS.OPTIMAL ]</span>
            <div className="w-20 h-px bg-[#ff003c]/30" />
          </div>

          <div className="flex items-center gap-3">
            <CatMascotIcon />
            <GlitchTitle text="// INVENTOR'S SKILL TREE" />
          </div>
          <p className="text-[#ff003c]/65 text-[11px] md:text-sm tracking-[0.25em] uppercase">
            Every skill is a weapon. Every project is a quest.
          </p>
        </header>

        {/* ── SKILL COLUMNS ── */}
        <div className="flex flex-col xl:flex-row xl:justify-center gap-10 xl:gap-4 overflow-x-auto pb-16 px-2 xl:px-0 scrollbar-hide">
          {COLUMNS.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Column
                data={col}
                hoveredNode={hoveredNode}
                setHoveredNode={setHoveredNode}
              />
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM BANNER ── */}
        <div className="mt-auto pt-8">
          <div className="relative border border-[#ff003c]/40 bg-[#ff003c]/5 p-4 text-center overflow-hidden group cursor-default">
            {/* Slide sweep on hover */}
            <div className="absolute inset-0 bg-[#ff003c]/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

            {/* Corner accents */}
            {[['top-0 left-0', 'border-t border-l'], ['top-0 right-0', 'border-t border-r'], ['bottom-0 left-0', 'border-b border-l'], ['bottom-0 right-0', 'border-b border-r']].map(([pos, brd], i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3 ${brd} border-[#ff003c]`} />
            ))}

            {/* Decorative dots */}
            <span className="text-[#ff003c]/50 mr-3">◆</span>
            <span
              className="text-base md:text-lg font-bold tracking-[0.28em] relative"
              style={{ color: '#ff003c', textShadow: '0 0 10px rgba(255,0,60,0.5)' }}
            >
              LEVEL UP YOUR SKILLS. UNLOCK NEW POSSIBILITIES.
            </span>
            <span className="text-[#ff003c]/50 ml-3">◆</span>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Skills;
