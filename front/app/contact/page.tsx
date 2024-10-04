import ContactForm from 'features/user/components/ContactForm';
import React from 'react';

const Contact = () => {
  return (
    <main className="flex grow flex-col items-center justify-center text-white">
      <div className="space-y-4">
        <h1 className="text-4xl">Contact Us</h1>
        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;