'use client'

import { useState } from 'react'

interface Props {
  highlights?: string[]
  overviewSections?: { title: string; content: string }[]
  includedItems?: string[]
  specs: Record<string, string>
}

export function ProductTabs({ highlights, overviewSections, includedItems, specs }: Props) {
  const [activeTab, setActiveTab] = useState<'tong-quan' | 'tinh-nang' | 'bao-gom' | 'thong-so'>('tong-quan')

  const tabs = [
    { id: 'tong-quan' as const, label: 'Tổng quan' },
    { id: 'tinh-nang' as const, label: 'Tính năng' },
    { id: 'bao-gom' as const, label: 'Bao gồm' },
    { id: 'thong-so' as const, label: 'Thông số' },
  ]

  return (
    <div className="mt-8">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            className={`shrink-0 border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-6">
        {activeTab === 'tong-quan' && (
          <div className="space-y-6">
            {highlights && highlights.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold">Điểm nổi bật</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {overviewSections && overviewSections.length > 0 ? (
              <div className="space-y-6">
                {overviewSections.map((section, i) => (
                  <div key={i}>
                    <h3 className="mb-2 text-lg font-semibold">{section.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Thông tin đang được cập nhật.
              </p>
            )}
          </div>
        )}

        {activeTab === 'tinh-nang' && (
          <div className="space-y-4">
            {highlights && highlights.length > 0 ? (
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 shrink-0 rounded-full bg-primary/10 p-1">
                      <svg className="size-3 text-primary" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Tính năng đang được cập nhật.</p>
            )}
          </div>
        )}

        {activeTab === 'bao-gom' && (
          <div>
            {includedItems && includedItems.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {includedItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Danh sách đang được cập nhật.</p>
            )}
          </div>
        )}

        {activeTab === 'thong-so' && (
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full">
              <tbody>
                {Object.entries(specs).map(([key, value], i) => (
                  <tr key={key} className={i % 2 === 0 ? 'bg-secondary/30' : ''}>
                    <td className="px-4 py-3 text-sm font-medium text-muted-foreground">{key}</td>
                    <td className="px-4 py-3 text-sm">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
