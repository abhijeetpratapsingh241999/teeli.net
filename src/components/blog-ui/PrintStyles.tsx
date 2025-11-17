/**
 * Print Styles Component
 * 
 * Optimizes blog post layout for printing.
 * Include this in blog post pages.
 */
export default function PrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        /* Hide navigation and interactive elements */
        header,
        nav,
        .no-print,
        button,
        .social-share,
        .like-button,
        .bookmark-button,
        .comment-section,
        footer {
          display: none !important;
        }

        /* Reset page */
        body {
          margin: 0;
          padding: 0;
          background: white !important;
          color: black !important;
          font-size: 12pt;
          line-height: 1.6;
        }

        /* Main content */
        main {
          max-width: 100% !important;
          margin: 0 !important;
          padding: 20mm !important;
          background: white !important;
        }

        /* Typography */
        h1 {
          font-size: 24pt;
          margin-top: 0;
          page-break-after: avoid;
        }

        h2 {
          font-size: 18pt;
          margin-top: 20pt;
          page-break-after: avoid;
        }

        h3 {
          font-size: 14pt;
          margin-top: 16pt;
          page-break-after: avoid;
        }

        h4, h5, h6 {
          font-size: 12pt;
          margin-top: 12pt;
          page-break-after: avoid;
        }

        p, li {
          orphans: 3;
          widows: 3;
        }

        /* Links */
        a {
          color: black !important;
          text-decoration: underline;
        }

        a[href]:after {
          content: " (" attr(href) ")";
          font-size: 10pt;
          color: #666;
        }

        /* Don't show URL for internal links */
        a[href^="#"]:after,
        a[href^="/"]:after {
          content: "";
        }

        /* Images */
        img {
          max-width: 100% !important;
          height: auto !important;
          page-break-inside: avoid;
          border: 1px solid #ddd;
        }

        /* Code blocks */
        pre,
        code {
          background: #f5f5f5 !important;
          border: 1px solid #ddd !important;
          padding: 10pt !important;
          font-family: 'Courier New', monospace;
          font-size: 10pt;
          page-break-inside: avoid;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        /* Tables */
        table {
          border-collapse: collapse;
          width: 100%;
          page-break-inside: avoid;
          margin: 12pt 0;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 8pt;
          text-align: left;
        }

        th {
          background: #f5f5f5 !important;
          font-weight: bold;
        }

        /* Blockquotes */
        blockquote {
          border-left: 4px solid #ddd;
          padding-left: 12pt;
          margin: 12pt 0;
          page-break-inside: avoid;
          font-style: italic;
        }

        /* Lists */
        ul, ol {
          margin: 12pt 0;
          padding-left: 20pt;
        }

        /* Table of contents */
        .table-of-contents {
          page-break-after: always;
          border: 1px solid #ddd;
          padding: 12pt;
          margin-bottom: 20pt;
        }

        /* Remove shadows and gradients */
        * {
          box-shadow: none !important;
          text-shadow: none !important;
          background-image: none !important;
        }

        /* Page breaks */
        .page-break-before {
          page-break-before: always;
        }

        .page-break-after {
          page-break-after: always;
        }

        .page-break-inside-avoid {
          page-break-inside: avoid;
        }

        /* Metadata */
        .post-meta {
          font-size: 10pt;
          color: #666 !important;
          margin-bottom: 20pt;
          padding-bottom: 10pt;
          border-bottom: 1px solid #ddd;
        }

        /* Author info */
        .author-info {
          page-break-inside: avoid;
          border-top: 1px solid #ddd;
          padding-top: 12pt;
          margin-top: 20pt;
        }
      }

      /* Page setup for A4 */
      @page {
        size: A4;
        margin: 20mm;
      }

      @page :first {
        margin-top: 10mm;
      }
    `}</style>
  );
}
