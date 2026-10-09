// Turns plain text into paragraphs: a blank line starts a new paragraph.
export function PostBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <div className="space-y-6 font-serif text-lg leading-8 text-slate-800">
      {paragraphs.map((text, i) => (
        <p key={i} className="whitespace-pre-line">
          {text}
        </p>
      ))}
    </div>
  );
}
