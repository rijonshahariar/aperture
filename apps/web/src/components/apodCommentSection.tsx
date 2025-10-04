'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { MessageCircle, Send } from 'lucide-react'
import { motion } from 'framer-motion'

const defaultReactions = [
  { emoji: '👍', label: 'Like', count: 0 },
  { emoji: '🚀', label: 'Rocket', count: 0 },
  { emoji: '🌟', label: 'Star', count: 0 },
  { emoji: '❤️', label: 'Love', count: 0 },
  { emoji: '🛸', label: 'UFO', count: 0 },
  { emoji: '🌌', label: 'Galaxy', count: 0 },
]

export function CommentSection({ apodId }: { apodId: string }) {
  const [reactions, setReactions] = useState(defaultReactions)
  const [comments, setComments] = useState<{ text: string; id: number; timestamp: string }[]>([])
  const [comment, setComment] = useState('')
  const [nextId, setNextId] = useState(1)

  const handleReact = (idx: number) => {
    setReactions(reactions => reactions.map((r, i) => i === idx ? { ...r, count: r.count + 1 } : r))
  }
  
  const handleComment = () => {
    if (comment.trim().length === 0) return
    setComments(comments => [...comments, { 
      text: comment, 
      id: nextId,
      timestamp: new Date().toLocaleString()
    }])
    setNextId(id => id + 1)
    setComment('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleComment()
    }
  }

  return (
    <Card className="mt-12 w-full max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center mt-5 gap-2 text-foreground">
          <MessageCircle className="h-5 w-5" />
          Comments & Reactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Reactions Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">React to this cosmic view:</h4>
          <div className="flex flex-wrap gap-2">
            {reactions.map((r, idx) => (
              <motion.button
                key={r.emoji}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted border border-border/50 hover:border-border transition-all duration-200 group"
                onClick={() => handleReact(idx)}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {r.emoji}
                </span>
                <span className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-xs font-medium">
                  {r.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Comment Input Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-muted-foreground">Share your thoughts:</h4>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a comment about this amazing cosmic view..."
              className="flex-1"
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              onClick={handleComment}
              disabled={comment.trim().length === 0}
              size="sm"
              className="px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                No comments yet. Be the first to share your thoughts about this cosmic wonder! 🌟
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Comments ({comments.length})
              </h4>
              {comments.map(c => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted/30 rounded-lg p-4 border border-border/30"
                >
                  <p className="text-foreground text-sm leading-relaxed mb-2">
                    {c.text}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.timestamp}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}