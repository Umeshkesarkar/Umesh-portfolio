// HOW TO ADD A NEW REPORT:
// 1. Upload PDF to Notion → Share to web → copy link
// 2. Post on LinkedIn/X → copy post URL
// 3. Add one object below → git add . → git commit → git push
// Vercel auto-deploys in ~30 seconds. Done.

export interface Report {
  id: string;
  company: string;
  ticker: string;        // format: "NSE: SYMBOL"
  sector: string;
  marketCap: 'Microcap' | 'Smallcap';
  rating: 'BUY' | 'WATCH' | 'AVOID';
  targetUpside: string;  // e.g. "+60%"
  date: string;          // e.g. "July 2025"
  thesis: string;
  tags: string[];
  pdfUrl: string;
  linkedinUrl: string | null;
  twitterUrl: string | null;
}

export const reports: Report[] = [
  {
    id: '1',
    company: 'Shilchar Technologies Ltd',
    ticker: 'NSE: SHILTECH',
    sector: 'Power Transmission',
    marketCap: 'Smallcap',
    rating: 'BUY',
    targetUpside: '+60%',
    date: 'July 2025',
    thesis:
      'Strong market leadership in niche power transformer segment with upcoming capacity expansion and improving margin profile.',
    tags: ['High ROCE', 'Debt Free', 'Promoter Buying'],
    pdfUrl: 'https://www.notion.so/Shilchar-Technologies-Ltd-July-2025-327ca35690bb80f29bdae0d6636f9c09?source=copy_link#327ca35690bb8015a3b4c84cbc3622ba',
    linkedinUrl: 'https://www.linkedin.com/posts/umesh-kesarkar_shilchar-technologies-june-2025-report-activity-7349012475301785600-xGRM?utm_source=share&utm_medium=member_desktop&rcm=ACoAACH-YyIB_ZcbjrdH0EihpmDpzTROpaz5tSw',
    twitterUrl: 'https://x.com/UmeshKesarkar11/status/1963194214344220992?s=20',
  },
  {
    id: '2',
    company: 'Mahindra EPC Irrigation Ltd',
    ticker: 'NSE: MEIL',
    sector: 'Micro-irrigation',
    marketCap: 'Smallcap',
    rating: 'BUY',
    targetUpside: '+40%',
    date: 'September 2025',
    thesis:
      'Leading player in micro-irrigation with strong execution track record and significant growth runway driven by government incentives and increasing adoption of precision agriculture.',
    tags: ['High ROCE', 'Debt Free', 'Promoter Buying'],
    pdfUrl: 'https://lydian-value-ecf.notion.site/Mahindra-EPC-Irrigation-Ltd-September-2025-327ca35690bb805da9cbf7e060096be4',
    linkedinUrl: 'https://www.linkedin.com/posts/umesh-kesarkar_mahindra-epc-irrigation-ltd-research-report-activity-7369260841357012993-EW2K?utm_source=share&utm_medium=member_desktop&rcm=ACoAACH-YyIB_ZcbjrdH0EihpmDpzTROpaz5tSw',
    twitterUrl: null,
  },
];