
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWithJamito from '@/components/ChatWithJamito';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="container px-4 py-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Chat con Jamito</h1>
            <p className="text-muted-foreground">
              Cuéntale a Jamito lo que buscas y te recomendará los mejores lugares.
            </p>
          </div>
          
          <div className="flex-1 bg-card rounded-lg shadow overflow-hidden flex flex-col">
            <ChatWithJamito />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
