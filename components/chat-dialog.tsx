"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMessages, sendMessage, type Message } from "@/lib/storage"
import { useAuth } from "@/hooks/use-auth"

export function ChatDialog({
  open,
  onOpenChange,
  dogId,
  dogName,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  dogId: string
  dogName: string
}) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const { user } = useAuth()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      loadMessages()
    }
  }, [open, dogId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadMessages = () => {
    const msgs = getMessages(dogId)
    setMessages(msgs)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (!message.trim() || !user) return

    sendMessage({
      dogId,
      senderId: user.id,
      senderName: user.nome,
      text: message.trim(),
    })

    setMessage("")
    loadMessages()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="font-bold text-gray-800">Chat com Doador</h2>
            <p className="text-sm text-gray-600">Sobre {dogName}</p>
          </div>
          <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">Nenhuma mensagem ainda</p>
              <p className="text-gray-400 text-xs mt-1">Envie uma mensagem para começar</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isCurrentUser = msg.senderId === user?.id
              return (
                <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-2xl ${isCurrentUser ? "rounded-tr-sm" : "rounded-tl-sm"} px-4 py-3 max-w-[80%] ${
                      isCurrentUser ? "bg-orange-500 text-white" : "bg-orange-100 text-gray-800"
                    }`}
                  >
                    {!isCurrentUser && <p className="text-xs font-semibold mb-1 opacity-75">{msg.senderName}</p>}
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Envie uma mensagem"
              className="flex-1 h-11 rounded-xl"
            />
            <Button
              size="icon"
              className="h-11 w-11 bg-orange-500 hover:bg-orange-600 rounded-xl"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
