
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, MapPin, Coffee, Utensils, Music, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'jamito';
  timestamp: Date;
};

// Simulación de mensajes iniciales de Jamito
const initialMessages: MessageType[] = [
  {
    id: '1',
    content: '¡Hola! Soy Jamito, tu asistente personal para encontrar el lugar perfecto según tu estado de ánimo o necesidad. ¿En qué puedo ayudarte hoy?',
    sender: 'jamito',
    timestamp: new Date(),
  },
];

const ChatWithJamito = () => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Respuestas predefinidas de Jamito (esto sería reemplazado por un AI real en producción)
  const jamitoResponses = [
    {
      keywords: ['trabajo', 'estudiar', 'concentrarme', 'tranquilo'],
      response: '¿Buscas un lugar tranquilo para trabajar o estudiar? Necesito conocer un poco más. ¿Prefieres una cafetería, una biblioteca o un espacio de coworking?',
      followUp: () => setTimeout(() => {
        addJamitoMessage('También es importante saber: ¿cuál es tu presupuesto aproximado y en qué zona estás buscando?');
      }, 2000)
    },
    {
      keywords: ['cita', 'romántico', 'pareja', 'especial'],
      response: '¡Una cita romántica! Entiendo que buscas un lugar especial. ¿Prefieres un restaurante elegante, un bar con ambiente íntimo o una actividad diferente?',
      followUp: () => setTimeout(() => {
        addJamitoMessage('¿Y cuál sería tu presupuesto aproximado para esta ocasión especial?');
      }, 2000)
    },
    {
      keywords: ['familia', 'niños', 'hijos', 'familiar'],
      response: 'Un plan familiar siempre es buena idea. ¿Estás pensando en un restaurante familiar, un parque, un museo interactivo u otra actividad?',
      followUp: () => setTimeout(() => {
        addJamitoMessage('¿Los niños son pequeños o adolescentes? Esto me ayudará a recomendarte mejor.');
      }, 2000)
    },
    {
      keywords: ['amigos', 'grupo', 'divertido', 'fiesta', 'social'],
      response: '¡Salida con amigos! ¿Prefieres un bar animado, un restaurante para compartir, alguna actividad de ocio o algo al aire libre?',
      followUp: () => setTimeout(() => {
        addJamitoMessage('¿Cuántas personas son aproximadamente y qué rango de edad tienen?');
      }, 2000)
    }
  ];

  // Función para hacer scroll al último mensaje
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simular respuesta de Jamito basada en palabras clave
  const simulateJamitoResponse = (userMessage: string) => {
    setIsTyping(true);
    
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Verifica si el mensaje contiene palabras clave que coincidan con alguna respuesta predefinida
    const matchedResponse = jamitoResponses.find(response => 
      response.keywords.some(keyword => lowerCaseMessage.includes(keyword))
    );
    
    // Si hay coincidencia, usa esa respuesta, de lo contrario usa una respuesta genérica
    setTimeout(() => {
      if (matchedResponse) {
        addJamitoMessage(matchedResponse.response);
        matchedResponse.followUp();
      } else if (userMessage.length > 15) {
        addJamitoMessage('Basado en lo que me cuentas, puedo recomendarte algunos lugares. ¿Podrías darme más detalles sobre tu presupuesto y la zona que prefieres?');
        
        // Simulación de mostrar resultados después de una interacción
        setTimeout(() => {
          addJamitoMessage('He encontrado algunos lugares que podrían interesarte basados en nuestra conversación. ¿Quieres ver los resultados?');
          setTimeout(() => {
            addJamitoMessage('👇 Haz clic abajo para ver los lugares que he encontrado para ti', () => {
              navigate('/places');
            });
          }, 1500);
        }, 3000);
      } else {
        addJamitoMessage('Cuéntame un poco más sobre lo que estás buscando. ¿Es para trabajo, una cita, salir con amigos o familia?');
      }
      setIsTyping(false);
    }, 1500);
  };

  // Agrega un mensaje de Jamito
  const addJamitoMessage = (content: string, callback?: () => void) => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'jamito',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    if (callback) {
      setTimeout(callback, 500);
    }
  };

  // Manejar envío de mensaje
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
    // Agregar mensaje del usuario
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Simular respuesta de Jamito
    simulateJamitoResponse(inputMessage);
  };

  // Quickstart sugerencias
  const suggestionTopics = [
    { text: "Lugar tranquilo para trabajar", icon: <Coffee className="w-4 h-4" /> },
    { text: "Restaurante para una cita", icon: <Utensils className="w-4 h-4" /> },
    { text: "Sitio para salir con amigos", icon: <Music className="w-4 h-4" /> },
    { text: "Plan familiar para el fin de semana", icon: <MapPin className="w-4 h-4" /> },
    { text: "Lugar para leer y relajarme", icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={message.sender === 'user' ? 'user-bubble' : 'jamito-bubble'}>
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="jamito-bubble flex space-x-1">
              <div className="w-2 h-2 bg-secondary-foreground/70 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-secondary-foreground/70 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-secondary-foreground/70 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Sugerencias de temas - sólo mostrar si hay pocos mensajes */}
      {messages.length < 3 && (
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground mb-2">Sugerencias:</p>
          <div className="flex flex-wrap gap-2">
            {suggestionTopics.map((topic, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="text-xs flex items-center gap-1"
                onClick={() => {
                  setInputMessage(topic.text);
                  setTimeout(() => handleSendMessage(), 100);
                }}
              >
                {topic.icon}
                {topic.text}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Formulario de entrada */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 rounded-full"
            autoFocus
          />
          
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full"
            disabled={inputMessage.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWithJamito;
