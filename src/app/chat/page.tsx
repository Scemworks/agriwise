'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Loader2
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatPage() {
  const { t } = useLanguage()
  const [isChatting, setIsChatting] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. How can I help you with your agricultural questions today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
  setIsChatting(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes('rice') || message.includes('paddy')) {
      return 'Rice is an excellent choice for your region! For optimal yield, ensure proper water management with 2-3 inches of standing water during the growing season. Use certified seeds and maintain proper spacing of 20x15 cm. Apply nitrogen fertilizer in split doses and watch for common pests like brown planthopper and stem borer.'
    }

    if (message.includes('coconut') || message.includes('coconut tree')) {
      return 'Coconut cultivation requires well-drained soil and regular irrigation. Plant seedlings 8-10 meters apart. Apply organic manure and maintain proper drainage. Common issues include root wilt disease and coconut mite. Regular pruning and proper nutrition are essential for healthy growth.'
    }

    if (message.includes('pest') || message.includes('disease')) {
      return 'For pest and disease management, I recommend integrated pest management (IPM) approach. Use resistant varieties, proper crop rotation, and biological control methods. Monitor your crops regularly and apply pesticides only when necessary. Always follow the recommended dosage and safety guidelines.'
    }

    if (message.includes('fertilizer') || message.includes('nutrient')) {
      return 'Soil testing is crucial before applying fertilizers. For most crops, NPK ratio of 4:2:1 works well. Use organic fertilizers like compost and farmyard manure along with chemical fertilizers. Apply fertilizers at the right time and in the right quantity to avoid wastage and environmental damage.'
    }

    if (message.includes('weather') || message.includes('rain')) {
      return 'Weather plays a crucial role in farming decisions. Monitor rainfall patterns and plan your activities accordingly. During heavy rains, ensure proper drainage to prevent waterlogging. Use weather forecasts to plan irrigation and harvesting schedules.'
    }

    if (message.includes('market') || message.includes('price') || message.includes('sell')) {
      return 'For better market prices, consider direct marketing through farmer producer organizations (FPOs) or online platforms. Grade your produce properly and maintain quality standards. Stay updated with market trends and government schemes that support farmers.'
    }

    if (message.includes('carbon') || message.includes('credit')) {
      return 'Carbon credits can provide additional income through sustainable farming practices. Practices like no-till farming, cover cropping, and agroforestry can help generate carbon credits. Register with certified carbon credit programs and maintain proper documentation of your sustainable practices.'
    }

    return 'Thank you for your question! I understand you\'re asking about farming practices. Could you please provide more specific details about your crop, location, or the particular issue you\'re facing? This will help me give you more accurate and helpful advice.'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input functionality would be implemented here
    // For now, it's just a visual toggle
  }

  const quickQuestions = [
    'How to increase rice yield?',
    'Best time to plant coconut?',
    'How to control pests naturally?',
    'What fertilizers to use?',
    'How to get carbon credits?',
    'Market prices for crops'
  ]

  return (
  <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.chatAssistant}
            </h1>
            <p className={`text-xl text-muted max-w-2xl mx-auto ${isChatting ? 'hidden sm:block' : ''}`}>
              Ask me anything about farming, crops, weather, market prices,
              or sustainable agriculture practices. I'm here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Quick Questions Sidebar - hidden on small screens */}
            <div className="lg:col-span-1 hidden lg:block">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Quick Questions</CardTitle>
                  <CardDescription className="text-muted">
                    Click to ask common farming questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-3 text-xs text-gray-700"
                        onClick={() => setInputMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3 col-span-4">
              {/* Use responsive heights: smaller on phones, larger on desktops */}
              <Card className="h-[480px] sm:h-[560px] lg:h-[600px] flex flex-col">
                    <CardHeader>
                        <div className="flex items-center w-full">
                          <div className="flex items-center">
                            <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                            <CardTitle className="text-gray-900">{t.askQuestion}</CardTitle>
                          </div>
                        </div>
                      <CardDescription className="text-muted">
                        Your AI farming assistant is ready to help
                      </CardDescription>
                    </CardHeader>

                <CardContent className="flex-1 flex flex-col min-h-0">
                  {/* Mobile quick questions button inside chat window (not in header) */}
                  <div className="lg:hidden mb-3 px-2">
                    <MobileQuickQuestions
                      quickQuestions={quickQuestions}
                      onSelect={(q: string) => setInputMessage(q)}
                    />
                  </div>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-24 sm:pb-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] max-w-full rounded-lg p-3 break-words whitespace-pre-wrap ${message.sender === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                            }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.sender === 'bot' && (
                              <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                            )}
                            {message.sender === 'user' && (
                              <User className="w-4 h-4 mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm">{message.text}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2 max-w-[80%] break-words whitespace-pre-wrap">
                          <Bot className="w-4 h-4" />
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm text-muted">Thinking...</span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area - stack on small screens */}
                  <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 z-10 bg-transparent">
                    <div className="flex-1 relative">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onFocus={() => setIsChatting(true)}
                        onBlur={() => {/* keep chatting state until user navigates away */}}
                        onKeyPress={handleKeyPress}
                        placeholder={t.typeMessage}
                        disabled={isLoading}
                        className="pr-20 text-gray-700"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isListening ? 'text-red-600' : 'text-gray-400'
                          }`}
                        onClick={toggleVoiceInput}
                      >
                        {isListening ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Info */}
          <div className={`mt-8 grid md:grid-cols-3 gap-6`}> 
            <Card>
              <CardContent className="p-6 text-center">
                <Bot className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                <p className="text-sm text-muted">
                  Advanced AI provides accurate and personalized farming advice
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Multilingual</h3>
                <p className="text-sm text-muted">
                  Chat in English, Hindi, or Malayalam for better understanding
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mic className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Voice Input</h3>
                <p className="text-sm text-muted">
                  Use voice commands for hands-free interaction
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile-only quick questions menu (simple controlled dropdown)
function MobileQuickQuestions({
  quickQuestions,
  onSelect
}: {
  quickQuestions: string[]
  onSelect: (q: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full inline-flex items-center justify-center px-4 py-2 rounded-full text-sm bg-white border border-gray-200"
        aria-expanded={open}
      >
        Quick Questions
      </button>

      {/* Bottom sheet for mobile */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="fixed left-0 right-0 bottom-0 bg-white rounded-t-xl shadow-xl max-h-[60vh] overflow-y-auto">
            <div className="p-4">
              <div className="mb-2 text-sm text-gray-600">Quick Questions</div>
              <div className="space-y-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelect(q)
                      setOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-800 bg-gray-50 rounded-md hover:bg-gray-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
