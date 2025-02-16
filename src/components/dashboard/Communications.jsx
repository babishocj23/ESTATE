import React, { useState, useEffect } from 'react';
import { FiLoader, FiAlertCircle, FiSend, FiUser, FiClock } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const Communications = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [user]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agent_messages')
        .select(`
          *,
          sender:sender_id(id, full_name, email),
          receiver:receiver_id(id, full_name, email)
        `)
        .or(`sender_id.eq.${user?.id},receiver_id.eq.${user?.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by contact
      const messagesByContact = {};
      data?.forEach(message => {
        const contact = message.sender_id === user?.id ? message.receiver : message.sender;
        if (!messagesByContact[contact.id]) {
          messagesByContact[contact.id] = {
            contact,
            messages: []
          };
        }
        messagesByContact[contact.id].messages.push(message);
      });

      // Sort contacts by latest message
      const sortedContacts = Object.values(messagesByContact).sort((a, b) => {
        const aLatest = a.messages[0].created_at;
        const bLatest = b.messages[0].created_at;
        return new Date(bLatest) - new Date(aLatest);
      });

      setContacts(sortedContacts);
      if (sortedContacts.length > 0 && !selectedContact) {
        setSelectedContact(sortedContacts[0].contact);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    try {
      const { data, error } = await supabase
        .from('agent_messages')
        .insert([{
          sender_id: user.id,
          receiver_id: selectedContact.id,
          content: newMessage.trim(),
        }])
        .select(`
          *,
          sender:sender_id(id, full_name, email),
          receiver:receiver_id(id, full_name, email)
        `)
        .single();

      if (error) throw error;

      // Update the messages state
      const contactIndex = contacts.findIndex(c => c.contact.id === selectedContact.id);
      if (contactIndex !== -1) {
        const updatedContacts = [...contacts];
        updatedContacts[contactIndex].messages.unshift(data);
        setContacts(updatedContacts);
      }

      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FiAlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        Communications<span className="text-primary">.</span>
      </h2>

      {contacts.length === 0 ? (
        <div className="text-center py-12 bg-dark-700 rounded-lg">
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="bg-dark-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-dark-600">
              <h3 className="text-lg font-medium text-white">Contacts</h3>
            </div>
            <div className="divide-y divide-dark-600">
              {contacts.map(({ contact, messages }) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 text-left transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'bg-dark-600'
                      : 'hover:bg-dark-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-white">
                        {contact.full_name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {messages[0].content.substring(0, 40)}
                        {messages[0].content.length > 40 ? '...' : ''}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(messages[0].created_at).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="md:col-span-2">
            {selectedContact ? (
              <div className="bg-dark-700 rounded-lg flex flex-col h-[600px]">
                <div className="p-4 border-b border-dark-600">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-dark-600 rounded-full">
                      <FiUser className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        {selectedContact.full_name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedContact.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {contacts
                    .find(c => c.contact.id === selectedContact.id)
                    ?.messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_id === user.id
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender_id === user.id
                              ? 'bg-primary text-white'
                              : 'bg-dark-600 text-gray-300'
                          }`}
                        >
                          <p>{message.content}</p>
                          <div
                            className={`flex items-center gap-2 mt-1 text-xs ${
                              message.sender_id === user.id
                                ? 'text-primary-light'
                                : 'text-gray-400'
                            }`}
                          >
                            <FiClock className="w-3 h-3" />
                            {new Date(message.created_at).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-dark-600">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-dark-600 border border-dark-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <FiSend className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-dark-700 rounded-lg p-6 text-center">
                <p className="text-gray-400">Select a contact to view messages</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Communications; 