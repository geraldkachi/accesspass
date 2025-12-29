import React, { useState, useRef, useEffect } from 'react';

// TypeScript interfaces
interface User {
  id: number;
  name: string;
  role: string;
  avatar: string;
  department: string;
  online: boolean;
}

interface Message {
  id: number;
  userId: number;
  content: string;
  timestamp: string;
  isOwn: boolean;
  read: boolean;
}

interface Chat {
  id: number;
  userId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, userId: 1, content: 'Hello, how can I help you today?', timestamp: '10:15 AM', isOwn: false, read: true },
    { id: 2, userId: 1, content: 'If this comes from your phone, you\'ll be sending it.', timestamp: '10:30 AM', isOwn: false, read: true },
    { id: 3, userId: 0, content: 'Yes, I understand. I need to configure the settings.', timestamp: '10:32 AM', isOwn: true, read: true },
    { id: 4, userId: 1, content: 'Great! Let me know if you need any assistance.', timestamp: '10:35 AM', isOwn: false, read: false },
    { id: 5, userId: 1, content: 'Also, check the reports section for analytics.', timestamp: '10:36 AM', isOwn: false, read: false },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock data
  const users: User[] = [
    { id: 1, name: 'Alex Chen', role: 'Host', avatar: 'AC', department: 'Engineering', online: true },
    { id: 2, name: 'Maria Garcia', role: 'Visitor', avatar: 'MG', department: 'HR', online: false },
    { id: 3, name: 'David Wilson', role: 'Host', avatar: 'DW', department: 'Sales', online: true },
    { id: 4, name: 'Emma Davis', role: 'Visitor', avatar: 'ED', department: 'Marketing', online: true },
    { id: 5, name: 'John Smith', role: 'Host', avatar: 'JS', department: 'Engineering', online: false },
    { id: 6, name: 'Sarah Johnson', role: 'Visitor', avatar: 'SJ', department: 'Finance', online: true },
  ];

  const chats: Chat[] = [
    { id: 1, userId: 1, lastMessage: 'If this comes from your phone, you\'ll be sending it.', lastMessageTime: '10:30 AM', unreadCount: 2 },
    { id: 2, userId: 2, lastMessage: 'We can click the user\'s file on the desktop with it.', lastMessageTime: 'Yesterday', unreadCount: 0 },
    { id: 3, userId: 3, lastMessage: 'Get a new folder to buy and run a browser.', lastMessageTime: '2 days ago', unreadCount: 1 },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage: Message = {
        id: messages.length + 1,
        userId: 0, // Current user
        content: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        read: false
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCreateNewMessage = (user: User) => {
    setSelectedRecipient(user);
    setIsNewMessageModalOpen(true);
    setMessageText(''); // Clear any existing message text
  };

  const handleSendNewMessage = () => {
    if (messageText.trim() && selectedRecipient) {
      // Create a new chat with the recipient
      const newChat: Chat = {
        id: chats.length + 1,
        userId: selectedRecipient.id,
        lastMessage: messageText,
        lastMessageTime: 'Just now',
        unreadCount: 0
      };

      // In a real app, you would send this to your backend
      console.log('Sending new message to:', selectedRecipient.name, 'Content:', messageText);
      
      // Add the message to current messages
      const newMessage: Message = {
        id: messages.length + 1,
        userId: selectedRecipient.id,
        content: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        read: false
      };
      console.log(newMessage)

      setMessageText('');
      setIsNewMessageModalOpen(false);
      setSelectedRecipient(null);
      
      // Select the new chat
      setSelectedChat(newChat.id);
      
      // In a real app, you would update chats and messages state
      alert(`Message sent to ${selectedRecipient.name}: "${messageText}"`);
    }
  };

  const getCurrentChatUser = () => {
    if (!selectedChat) return null;
    const chat = chats.find(c => c.id === selectedChat);
    return users.find(u => u.id === chat?.userId) || null;
  };

  const getChatMessages = () => {
    if (!selectedChat) return [];
    return messages;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsNewMessageModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Compose New Message
          </button>
          
          {/* Three dots menu for navigation sidebar */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg xl:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-6">Navigation</h3>
                  <nav className="space-y-4">
                    {['Hosts', 'Schedule', 'Messages', 'Reports', 'Resource Hub', 'Settings', 'Remote Status'].map((item) => (
                      <a
                        key={item}
                        href="#"
                        className={`block py-2 text-sm font-medium transition-colors ${
                          item === 'Messages'
                            ? 'text-blue-600'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
       

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {getCurrentChatUser()?.avatar}
                      </div>
                      {getCurrentChatUser()?.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{getCurrentChatUser()?.name}</h2>
                      <p className="text-sm text-gray-500">{getCurrentChatUser()?.role} • {getCurrentChatUser()?.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="max-w-3xlmx-auto space-y-4">
                  {getChatMessages().map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          message.isOwn
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-gray-200 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center gap-1 mt-2 text-xs ${
                          message.isOwn ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          <span>{message.timestamp}</span>
                          {message.isOwn && (
                            <span>
                              {message.read ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-3xlmx-auto">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={handleSendMessage}
                          disabled={!messageText.trim()}
                          className={`px-6 py-2 rounded-lg font-medium ${
                            messageText.trim()
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg">Select a conversation to start messaging</p>
                <button
                  onClick={() => setIsNewMessageModalOpen(true)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start a new conversation
                </button>
              </div>
            </div>
          )}
        </div>


         {/* Right Sidebar - Chats List */}
        <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Chat</h2>
            
            {/* Add this button to create new message from sidebar too */}
            <button
              onClick={() => setIsNewMessageModalOpen(true)}
              className="hidden w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Message
            </button>
          </div>

          {/* Chats List */}
          <div className="p-2">
            {chats.map(chat => {
              const user = users.find(u => u.id === chat.userId);
              if (!user) return null;

              return (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                    selectedChat === chat.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {user.avatar}
                      </div>
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                        <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      {chat.unreadCount > 0 && (
                        <div className="mt-1">
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-blue-600 text-white rounded-full">
                            {chat.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Sections */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">File lookup</h3>
            <p className="text-sm text-gray-600 mb-4">We can click the user's file on the desktop with it.</p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Web</h4>
                <p className="text-sm text-gray-600">Get a new folder to buy and run a browser.</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Message</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Reports</li>
                  <li>• Resource Hub</li>
                  <li>• Settings</li>
                  <li>• Remote Status</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Memory</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Addition</li>
                  <li>• Profile</li>
                  <li>• Notes</li>
                  <li>• Share</li>
                  <li>• Chat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compose New Message Modal */}
      {isNewMessageModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => {
              setIsNewMessageModalOpen(false);
              setSelectedRecipient(null);
              setMessageText('');
            }} />
            
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Compose New Message</h2>
                  <button
                    onClick={() => {
                      setIsNewMessageModalOpen(false);
                      setSelectedRecipient(null);
                      setMessageText('');
                    }}
                    className="text-gray-400 hover:text-gray-500 text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-4">
                {/* Recipient Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                  <div className="relative mb-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search host or visitor"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Selected Recipient */}
                  {selectedRecipient && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                          {selectedRecipient.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedRecipient.name}</p>
                          <p className="text-xs text-gray-500">{selectedRecipient.role} • {selectedRecipient.department}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedRecipient(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* Users List */}
                  <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                    {filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedRecipient?.id === user.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => handleCreateNewMessage(user)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm">
                                {user.avatar}
                              </div>
                              {user.online && (
                                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.role} • {user.department}</p>
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            selectedRecipient?.id === user.id ? 'bg-blue-600' : 'border border-gray-300'
                          }`}>
                            {selectedRecipient?.id === user.id && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                    rows={4}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewMessageModalOpen(false);
                      setSelectedRecipient(null);
                      setMessageText('');
                    }}
                    className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSendNewMessage}
                    disabled={!messageText.trim() || !selectedRecipient}
                    className={`px-4 py-2 font-medium rounded-md transition-colors ${
                      messageText.trim() && selectedRecipient
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sidebar (Right) - Hidden on mobile, shows dropdown instead */}
      <div className="ixed right-0 top-0 h-full w-64 bg-white border-l border-gray-200 hidden xl:bloc">
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Navigation</h3>
          <nav className="space-y-4">
            {['Hosts', 'Schedule', 'Messages', 'Reports', 'Resource Hub', 'Settings', 'Remote Status'].map((item) => (
              <a
                key={item}
                href="#"
                className={`block py-2 text-sm font-medium transition-colors ${
                  item === 'Messages'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Messages;