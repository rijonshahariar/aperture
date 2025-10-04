import { useState } from 'react'

const defaultReactions = [
  { emoji: '👍', label: 'Like', count: 0 },
  { emoji: '🚀', label: 'Rocket', count: 0 },
  { emoji: '😮', label: 'Wow', count: 0 },
  { emoji: '❤️', label: 'Love', count: 0 },
]

export function CommentSection({ apodId }: { apodId: string }) {
  const [reactions, setReactions] = useState(defaultReactions)
  const [comments, setComments] = useState<{ text: string; id: number }[]>([])
  const [comment, setComment] = useState('')
  const [nextId, setNextId] = useState(1)

  const handleReact = (idx: number) => {
    setReactions(reactions => reactions.map((r, i) => i === idx ? { ...r, count: r.count + 1 } : r))
  }
  const handleComment = () => {
    if (comment.trim().length === 0) return
    setComments(comments => [...comments, { text: comment, id: nextId }])
    setNextId(id => id + 1)
    setComment('')
  }

  return (
    <div className="mt-12 w-full max-w-xl mx-auto bg-white/80 rounded-xl p-6 shadow border border-blue-100">
      <h3 className="text-lg font-bold text-blue-700 mb-4">Comments & Reactions</h3>
      <div className="flex gap-4 mb-4">
        {reactions.map((r, idx) => (
          <button key={r.emoji} className="text-2xl hover:scale-110 transition-all flex items-center gap-1 px-2 py-1 rounded bg-blue-50 border border-blue-200 font-bold"
            onClick={() => handleReact(idx)}>
            {r.emoji} <span className="text-base text-blue-700">{r.count}</span>
          </button>
        ))}
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded font-bold shadow hover:bg-blue-600 transition-all"
        onClick={handleComment}
      >
        Post
      </button>
      <div className="mt-6">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="space-y-2">
            {comments.map(c => (
              <li key={c.id} className="bg-blue-50 rounded px-4 py-2 text-gray-800 border border-blue-100">
                {c.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}