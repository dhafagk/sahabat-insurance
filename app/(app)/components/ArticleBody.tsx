// app/(app)/components/ArticleBody.tsx
'use client'

import type { SerializedEditorState } from 'lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import TagPill from './ui/TagPill'

interface TagValue {
  id: string | number
  name: string
}

interface ArticleBodyProps {
  content: SerializedEditorState
  tags: TagValue[]
}

export default function ArticleBody({ content, tags }: ArticleBodyProps) {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Rich text */}
      <div className="prose prose-slate max-w-none text-text-primary [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:leading-relaxed [&_p]:mb-4 [&_a]:text-accent [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
        <RichText data={content} />
      </div>

      {/* Tags footer */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4 mt-8">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            Tags:
          </span>
          {tags.map((tag) => (
            <TagPill key={tag.id} name={tag.name} />
          ))}
        </div>
      )}
    </div>
  )
}
