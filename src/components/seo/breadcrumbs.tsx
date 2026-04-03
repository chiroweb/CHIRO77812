import Link from 'next/link';
import { generateBreadcrumbSchema, JsonLd } from '@/lib/schema-helpers';
import { getBreadcrumbItems } from '@/data/site-navigation';

interface BreadcrumbsProps {
  pathname: string;
}

export default function Breadcrumbs({ pathname }: BreadcrumbsProps) {
  const items = getBreadcrumbItems(pathname);

  if (items.length <= 1) return null;

  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <nav aria-label="Breadcrumb" className="mb-6 md:mb-8 overflow-x-auto">
        <ol className="flex items-center gap-2 whitespace-nowrap font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.15em] uppercase">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-2">
                {index > 0 && <span className="text-[#9b9b9b]">/</span>}
                {isLast ? (
                  <span className="text-[#1a1a1a]">{item.name}</span>
                ) : (
                  <Link
                    href={item.url.replace('https://chiroweb.co.kr', '')}
                    className="text-[#9b9b9b] hover:text-[#6b6b6b] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
